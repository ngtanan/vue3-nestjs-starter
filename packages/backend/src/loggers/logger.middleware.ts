import { Injectable, NestMiddleware } from '@nestjs/common'
import { Request, Response, NextFunction } from 'express'
import { LoggerService } from './logger.service'

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private loggerService: LoggerService) {
    this.loggerService.setContext('HTTP')
  }

  use(request: Request, response: Response, next: NextFunction) {
    response.on('finish', () => {
      const { method, originalUrl } = request
      const { statusCode, statusMessage } = response

      const message = `${method} ${originalUrl} ${statusCode} ${statusMessage}`

      if (statusCode >= 500) {
        return this.loggerService.error(message)
      }

      if (statusCode >= 400) {
        return this.loggerService.warn(message)
      }

      if (originalUrl.includes('health')) {
        return this.loggerService.verbose(message)
      }

      return this.loggerService.log(message)
    })

    next()
  }
}
