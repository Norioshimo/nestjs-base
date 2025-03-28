import { forwardRef, Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from 'src/auth/auth.module';
import { Rol, Rolprograma } from './entities';
import { Usuario } from '../usuarios/entities';
import { UsuariosModule } from '../usuarios/usuarios.module';

@Module({
  controllers: [RolesController],
  providers: [RolesService],
  imports: [
    TypeOrmModule.forFeature([Rol, Rolprograma, Usuario]),
    ConfigModule,
    forwardRef(() => AuthModule),
  ],
  exports: [
    TypeOrmModule,
    RolesService, //Exportar el servicio
  ]
})
export class RolesModule { }
