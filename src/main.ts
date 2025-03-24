import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as morgan from 'morgan';
import { NotFoundExceptionFilter } from './common/filters/http-exception.filter';



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

    // Usar filtro de excepciones para manejar 404
    //app.useGlobalFilters(new NotFoundExceptionFilter());

   // Usa Morgan en modo 'dev' (puedes cambiarlo según la necesidad)
   app.use(morgan(':method :url :status :response-time ms'));

   // Documentacion en swagger
  const config = new DocumentBuilder()
    .setTitle('Proyecto de NESTJS BASE')
    .setDescription('Documentación de uso de api del proyecto NESTJS BASE')
    .setVersion('1.0')
    .addTag('versión 1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);


  // Levantar el proyecto
  await app.listen(process.env.PORT);
  log.log(`App corriendo en el puerto ${process.env.PORT}`)


}
bootstrap();
