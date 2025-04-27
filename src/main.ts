import { NestFactory } from '@nestjs/core';
import { AppModule } from 'src/app.module';
import { HttpExceptionFilter } from 'src/common/filters/exception.filter';
import { LoggerInterceptor } from 'src/common/interceptors/logger.interceptors';
import { VersioningType } from '@nestjs/common';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new LoggerInterceptor());

  app.enableVersioning({
    type: VersioningType.URI,
  });
  
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
