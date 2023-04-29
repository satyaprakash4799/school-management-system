import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const logger = new Logger();
    const { method, originalUrl } = req;
    const start = Date.now();
    res.on('finish', () => {
      const end = Date.now();
      const duration = end - start;
      const { statusCode } = res;
      const contentLength = res.get('content-length');
      logger.log(
        `${method} ${originalUrl} ${statusCode} ${contentLength} - ${duration}ms`,
      );
    });
    next();
  }
}
