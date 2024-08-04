import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const log = new Logger('Main')
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );


  const config = new DocumentBuilder()
    .setTitle('Proyecto de NESTJS BASE')
    .setDescription('Documentación de uso de api del proyecto NESTJS BASE')
    .setVersion('1.0')
    .addTag('versión 1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);


  await app.listen(process.env.PORT);
  log.log(`App corriendo en el puerto ${process.env.PORT}`)


}
bootstrap();
