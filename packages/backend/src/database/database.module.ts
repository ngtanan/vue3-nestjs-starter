import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { LoggerDatabase } from '../loggers/logger.database'
import dbConfig from './database.config'

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [LoggerDatabase],
      useFactory: (loggerDatabase: LoggerDatabase) => Object.assign(dbConfig, { logger: loggerDatabase })
    })
  ]
})
export class DatabaseModule {}
