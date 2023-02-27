import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { MyLogger } from './logger.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private readonly logger = new MyLogger();

  use(request: Request, response: Response, next: NextFunction): void {
    const { ip, method, originalUrl, query, body, headers } = request;
    const userAgent = request.get('user-agent') || '';
    let time = Date.now();

    response.on('finish', () => {
      time = Date.now() - time;
      const message = `Agent: ${userAgent} - Method: ${method} - URL: ${originalUrl} - Parametres: ${JSON.stringify(
        query,
      )} - Body: ${JSON.stringify(body)} - Status code:${
        response.statusCode
      } - Time: ${time}ms`;

      if (response.statusCode < 400) {
        this.logger.log(message);
      }

      this.logger.verbose(
        `${ip} - ${userAgent} - ${
          headers['authorization'] ?? '<authorization-not-set>'
        }`,
      );
    });

    next();
  }
}
