import { forwardRef, Module } from '@nestjs/common';
import { ProgramasService } from './programas.service';
import { ProgramasController } from './programas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Programa } from './entities/programa.entity';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [ProgramasController],
  providers: [ProgramasService],
  imports: [
    TypeOrmModule.forFeature([Programa]),
    ConfigModule,
    forwardRef(() => AuthModule),
  ],
  exports: [
    TypeOrmModule
  ]
})
export class ProgramasModule { }
