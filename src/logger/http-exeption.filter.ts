import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { MyLogger } from './logger.service';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new MyLogger();

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    let errorResponse: Record<string, string | number>;
    if (status !== 500) {
      errorResponse = {
        code: status,
        timestamp: new Date().toLocaleDateString(),
        path: request.url,
        method: request.method,
        message: exception.message || null,
      };
    } else {
      errorResponse = {
        code: status,
        message: 'Internal server error',
      };
    }

    response.status(status).json(errorResponse);

    const message = `Method: ${request.method} - URL: ${
      request.url
    } - message: ${JSON.stringify(errorResponse.message)}`;

    this.logger.error(message, `filter: ExceptionFilter`);
  }
}
