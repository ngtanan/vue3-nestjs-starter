import { VersioningType } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import * as compression from 'compression'
import * as cookieParser from 'cookie-parser'

import { AppModule } from './app.module'
import { LoggerService } from './loggers/logger.service'
import { ApiConfigService } from './shared/services/api-config.service'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true })
  const configService = app.get<ApiConfigService>(ApiConfigService)

  const loggerService = new LoggerService(configService)
  loggerService.setContext('BOOTSTRAP')
  app.useLogger(configService.isVerbose ? loggerService : false)

  app.setGlobalPrefix(configService.getGlobalPrefix)
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: configService.getApiVersion
  })

  loggerService.debug(`isProduction: ${configService.isProduction} --- isVerbose: ${configService.isVerbose} --- showHealthLogs: ${configService.showHealthLogs}`)
  if (!configService.isProduction) {
    const document = SwaggerModule.createDocument(app, new DocumentBuilder()
      .setTitle('Mazi API')
      .setDescription('Mazi API\'s documentation')
      .setVersion(configService.getApiVersion)
      .addBearerAuth()
      .build())
    SwaggerModule.setup('documentation', app, document) // NOTE: access the Swagger documentation at "/documentation"
  }

  app.enableCors({
    origin: configService.getClientUrl,
    credentials: true
  })
  app.use(compression())
  app.use(cookieParser())

  await app.listen(configService.getPort)
  loggerService.debug(`Application is running on: ${await app.getUrl()}`)
}

bootstrap()
