import { NestFactory } from '@nestjs/core';
import { AppModule } from 'src/app.module';
import { HttpExceptionFilter } from 'src/common/filters/exception.filter';
import { LoggerInterceptor } from 'src/common/interceptors/logger.interceptors';
import { VersioningType } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new LoggerInterceptor());

  app.enableCors({
    origin: '*', // For dev/demo purposes only.
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type,Authorization,x-api-key',
    credentials: true,
  });

  app.enableVersioning({
    type: VersioningType.URI,
  });

  // Swagger setup
  const config = new DocumentBuilder()
    .setTitle('Receipt Reader API')
    .setDescription('API for uploading and processing receipt images')
    .setVersion('1.0')
    .addApiKey(
      {
        type: 'apiKey',
        name: 'x-api-key',
        in: 'header',
      },
      'x-api-key',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
