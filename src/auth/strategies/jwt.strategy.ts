import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from '../interfaces/jwt-payload.interfaces';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Usuario } from 'src/modules/seguridades/usuarios/entities';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(Usuario)
    private readonly userRepository: Repository<Usuario>,
    configService: ConfigService,
  ) {
    super({
      secretOrKey: configService.get('JWT_SECRET'),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: JwtPayload): Promise<Usuario> {
    const { id } = payload; 
    const user = await this.userRepository.findOne({
      where: {
        id_usuario: id
      }
    });

    if (!user) {//Validar si el usuario existe
      throw new UnauthorizedException('Token invalido.');
    }

    if (user.usuario_estado !== 'A') {//Validar si el usuario NO está activo
      throw new UnauthorizedException('Usuario no está activo.');
    }

    return user;
  }
}
