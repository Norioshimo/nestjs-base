import { forwardRef, Module } from '@nestjs/common';
import { ConfiguracionesService } from './configuraciones.service';
import { ConfiguracionesController } from './configuraciones.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Configuracion } from './entities/configuracion.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [ConfiguracionesController],
  providers: [ConfiguracionesService],
  imports: [
    TypeOrmModule.forFeature([Configuracion]),
    ConfigModule , 
    forwardRef(() => AuthModule),
  ],
  exports:[
    TypeOrmModule
  ]
})
export class ConfiguracionesModule {}
