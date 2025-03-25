import { forwardRef, Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rol } from './entities/rol.entity';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [RolesController],
  providers: [RolesService],
  imports: [
    TypeOrmModule.forFeature([Rol]),
    ConfigModule,
    forwardRef(() => AuthModule),
  ],
  exports: [
    TypeOrmModule
  ]
})
export class RolesModule { }
