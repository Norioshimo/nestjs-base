import { BadRequestException, Body, Get, Injectable, Post, UnauthorizedException } from '@nestjs/common';
import { LoginUserDto } from './dto';
import { Repository } from 'typeorm';
import { Usuario } from 'src/modules/seguridades/usuarios/entities';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtPayload } from './interfaces';
import { JwtService } from '@nestjs/jwt';
import { HashAdapter } from './adapters/sha1.adapters';

@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(Usuario)
        private readonly usuarioRepository: Repository<Usuario>,

        private readonly jwtService: JwtService,
        private readonly hashAdapter: HashAdapter
    ) { }

    async LoginUserDto(loginUserDto: LoginUserDto) {

        const { clave, usuario } = loginUserDto;

        const usuarioEx = await this.usuarioRepository.findOne({
            where: {
                usuario
            },
            select: { id_usuario: true, usuario: true, clave: true, usuario_estado: true }
        })

        if (!usuarioEx) {
            throw new UnauthorizedException(`No existe el usuario ${usuario}`);
        }

        if (usuarioEx.usuario_estado !== 'A') {
            throw new UnauthorizedException(`El usuario ${usuario} no está activo`)
        }

        if (usuarioEx.clave !== this.hashAdapter.sha1(clave)) {
            throw new UnauthorizedException(`La clave del usuario ${usuario} incorrecto`)
        }

        delete usuarioEx.usuario_estado;
        delete usuarioEx.clave;
        // const { password, ...result } = user; //alter tanativa para eliminar... en el result está todo menos el password



        return { ...usuarioEx, token: this.getJwtToken({ id: usuarioEx.id_usuario }) }
    }

    //Generar el token.
    private getJwtToken(payload: JwtPayload) {
        const token = this.jwtService.sign(payload);
        return token;
    }
}
