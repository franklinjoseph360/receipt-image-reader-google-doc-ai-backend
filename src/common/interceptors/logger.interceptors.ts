import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
  } from '@nestjs/common';
  import { Observable, tap } from 'rxjs';
  
  @Injectable()
  export class LoggerInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
      const request = context.switchToHttp().getRequest();
      const { method, originalUrl } = request;
      const now = Date.now();
  
      return next.handle().pipe(
        tap((_data) => {
          const response = context.switchToHttp().getResponse();
          const { statusCode } = response;
  
          console.log(
            `[${method}] ${originalUrl} ${statusCode} - ${Date.now() - now}ms`,
          );
        }),
      );
    }
  }
  