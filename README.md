# Proyecto Base NestJS

Este proyecto se ha creado con el propósito de servir como una plantilla base para el desarrollo de aplicaciones con NestJS.

## Tecnologías

- TypeORM
- PostgreSQL 9.3
- NestJS
- JWT
- Docker

## Módulos

- Autenticación
- Usuario
- Roles y Permisos (En desarrollo)
- Reportes (En desarrollo)

## Pasos para Levantar el Proyecto

1. Levantar el contenedor Docker con la base de datos: `docker compose up -d`
2. Instalar las dependencias: `yarn install`
3. Clonar el archivo `.env.template` y renombrarlo a `.env`. Cambiar los valores de las variables de entorno según sea necesario.
4. Iniciar el proyecto en modo desarrollo: `yarn start:dev`
5. Ejecutar `localhost:3000/api/seed` para crear un superAdmin con la clave `123`.
6. La documentación Swagger se encuentra en `localhost:3000/api`.



## Documentación

- [NestJS Framework](https://docs.nestjs.com/)
- [Base de Datos - TypeORM](https://docs.nestjs.com/techniques/database)
- [Autenticaciones usando JWT](https://docs.nestjs.com/security/authentication)
- [Passport](https://docs.nestjs.com/recipes/passport)
- [Funcionalidad JWT en Passport](https://docs.nestjs.com/recipes/passport#jwt-functionality)
- [Documentación en Swagger](https://docs.nestjs.com/openapi/introduction)
- [Validaciones de Variables de Entorno - Joi](https://www.npmjs.com/package/joi)
- [Transformaciones de Datos en los Servicios - Class Transformer Validator](https://www.npmjs.com/package/class-transformer-validator)
- [TypeORM](https://typeorm.io/)
- [JWT](https://jwt.io/)


## Autor
Este proyecto fue desarrollado por Norio Shimomoto.