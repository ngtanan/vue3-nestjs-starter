import { Global, Module } from '@nestjs/common'
import { ApiConfigService } from '../shared/services/api-config.service'
import { LoggerService } from './logger.service'
import { LoggerDatabase } from './logger.database'

@Global()
@Module({
  providers: [LoggerService, LoggerDatabase, ApiConfigService],
  exports: [LoggerService, LoggerDatabase]
})
export class LoggerModule {}
