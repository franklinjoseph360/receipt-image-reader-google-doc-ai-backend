import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus,
    Logger,
  } from '@nestjs/common';
import { ERROR_MESSAGES } from '../constants/error-messages.constants';
  
  @Catch()
  export class HttpExceptionFilter implements ExceptionFilter {
    private readonly logger = new Logger(HttpExceptionFilter.name);
  
    catch(exception: unknown, host: ArgumentsHost) {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse();
      const request = ctx.getRequest();
  
      let status = HttpStatus.INTERNAL_SERVER_ERROR;
      let message = ERROR_MESSAGES.INTERNAL_SERVER_ERROR;
  
      if (exception instanceof HttpException) {
        status = exception.getStatus();
        const exceptionResponse = exception.getResponse();
        message =
          (typeof exceptionResponse === 'string'
            ? exceptionResponse
            : (exceptionResponse as any).message) || message;
      }
  
      const errorResponse = {
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
        method: request.method,
        message,
      };
  
      this.logger.error(
        `[${request.method}] ${request.url} ${status} - ${message}`,
      );
  
      response.status(status).json(errorResponse);
    }
  }
  