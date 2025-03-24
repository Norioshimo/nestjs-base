import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsuariosModule } from './modules/seguridades/usuarios/usuarios.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from './common/common.module';
import { JoiValidationSchema, EnvConfigutarion } from './config';
import { SeedModule } from './seed/seed.module';
import { ConfiguracionesModule } from './modules/seguridades/configuraciones/configuraciones.module';
import { ProgramasModule } from './modules/seguridades/programas/programas.module';

@Module({
  imports: [AuthModule, UsuariosModule,

    ConfigModule.forRoot({
      load: [EnvConfigutarion],
      validationSchema: JoiValidationSchema,
    }),

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      database: process.env.BD_NAME,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      autoLoadEntities: true,
      synchronize: process.env.SYNCHRONIZE_TYPEORM==='true',//Dejar false para no sincronizar con la base de datos.
    }),

    CommonModule,
    UsuariosModule,

    SeedModule,

    ConfiguracionesModule,

    ProgramasModule

  ]
})
export class AppModule { }
