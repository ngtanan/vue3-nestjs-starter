import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { APP_GUARD, APP_FILTER } from '@nestjs/core'
import { MulterModule } from '@nestjs/platform-express'
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler'
import * as Joi from 'joi'

import { AppController } from './app.controller'

// #region Import everything outside modules
import { DatabaseModule } from './database/database.module'
import { LoggerModule } from './loggers/logger.module'
import { SharedModule } from './shared/shared.module'

import { LoggerMiddleware } from './loggers/logger.middleware'
import { JwtAuthGuard } from './guards/jwt-auth.guard'
import { AllExceptionFilter } from './exception-filters/all-exception.filter'
// #endregion Import everything outside modules

// #region Import everything inside modules
import { AuthModule } from './modules/auth/auth.module'
import { HealthModule } from './modules/health/health.module'
import { UserModule } from './modules/user/user.module'
// #endregion Import everything inside modules

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        NODE_ENV: Joi.string().valid('DEV', 'PROD', 'TEST').default('DEV'),
        PORT: Joi.number().default(3000),
        API_VERSION: Joi.string().default('1.0'),
        API_PREFIX: Joi.string().default('api'),
        POSTGRES_HOST: Joi.string().required(),
        POSTGRES_PORT: Joi.number().required(),
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string().required(),
        POSTGRES_DB: Joi.string().required(),
        RUN_MIGRATIONS: Joi.boolean().default(false),
        VERBOSE: Joi.boolean().default(false),
        SHOW_HEALTH_LOGS: Joi.boolean().default(false),
        CLIENT_URL: Joi.string().required(),
        JWT_SECRET: Joi.string().required()
      })
    }),
    MulterModule.register(),
    ThrottlerModule.forRoot({
      ttl: 60, // retry after 60 seconds
      limit: 3 // limit to 3 requests per 60 seconds
    }),

    DatabaseModule,
    LoggerModule,
    SharedModule,

    // Inside modules
    AuthModule,
    HealthModule,
    UserModule
  ],
  controllers: [AppController],
  providers: [
    { provide: APP_GUARD, useClass: ThrottlerGuard },
    { provide: APP_GUARD, useClass: JwtAuthGuard },
    { provide: APP_FILTER, useClass: AllExceptionFilter }
  ]
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .exclude({ path: 'health', method: RequestMethod.GET })
      .forRoutes('*')
  }
}
