import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller'; 
import { UsuariosModule } from 'src/modules/seguridades/usuarios/usuarios.module'; 
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './strategies';
import { HashAdapter } from './adapters/sha1.adapters';

@Module({
  controllers: [AuthController],
  providers: [AuthService,JwtStrategy,HashAdapter],
  imports:[ 
    UsuariosModule,
    ConfigModule,

    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => { 
        return {
          secret: configService.get('JWT_SECRET'),
          signOptions: {
            expiresIn: '1h',
          },
        };
      },
    }),
  ],
  exports:[JwtStrategy,PassportModule,JwtModule,HashAdapter]
})
export class AuthModule {}
