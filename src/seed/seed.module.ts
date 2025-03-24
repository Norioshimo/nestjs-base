import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { AuthModule } from 'src/auth/auth.module';
import { UsuariosModule } from 'src/modules/seguridades/usuarios/usuarios.module';

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports:[UsuariosModule,AuthModule]
})
export class SeedModule {}
