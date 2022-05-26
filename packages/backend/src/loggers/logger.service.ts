import {
  ConsoleLogger, LoggerService as NestLoggerService,
  Injectable, Scope
} from '@nestjs/common'
import type { LogLevel } from '@nestjs/common'
import { ApiConfigService } from '../shared/services/api-config.service'

@Injectable({ scope: Scope.TRANSIENT })
export class LoggerService extends ConsoleLogger implements NestLoggerService {
  constructor(private appConfigService: ApiConfigService) {
    super()
    if (this.appConfigService.isProduction) {
      const lvs: LogLevel[] = ['error', 'warn', 'log']
      super.warn(`get rid of "verbose" and "debug" logs on production, only ${lvs} logs will be shown`)
      super.setLogLevels(lvs)
    }
    if (this.appConfigService.isTest) {
      super.setLogLevels([])
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private loggingSaving(...allTheArgs): void {
    // TO DO: save logs to database
    // console.log(allTheArgs)
  }

  error(...allTheArgs): void {
    this.loggingSaving(allTheArgs)
    super.error(allTheArgs)
  }

  warn(...allTheArgs): void {
    this.loggingSaving(allTheArgs)
    super.warn(allTheArgs)
  }

  log(...allTheArgs): void {
    this.loggingSaving(allTheArgs)
    super.log(allTheArgs)
  }

  debug(...allTheArgs): void {
    this.loggingSaving(allTheArgs)
    super.debug(allTheArgs)
  }

  verbose(...allTheArgs): void {
    this.loggingSaving(allTheArgs)
    super.verbose(allTheArgs)
  }
}
