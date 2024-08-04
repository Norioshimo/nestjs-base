import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from 'src/usuarios/entities';
import { Repository } from 'typeorm';
import { HashAdapter } from '../auth/adapters/sha1.adapters';

@Injectable()
export class SeedService {


    constructor(
        @InjectRepository(Usuario)
        private readonly usuarioRepository: Repository<Usuario>,

        private readonly hashAdapter: HashAdapter
    ) { }

    async ejecutarSeed() {

        const usuario = await this.usuarioRepository.findOne({
            where: {
                usuario: 'superAdmin'
            }
        });

        if (usuario) {
            throw new BadRequestException(`El seed ya fue ejecutado en ${usuario.fecha_inserccion}`)
        }


        const userIns = {
            nombre_completo: 'Super Admin',
            usuario: 'superAdmin',
            usuario_estado: 'A',
            usuario_inserccion: 1,
            fecha_inserccion: new Date(),
            usuario_tipo: 'A',
            clave: this.hashAdapter.sha1('123')
        }

        try {

            await this.usuarioRepository.create(userIns )
            await this.usuarioRepository.save(userIns)
            return 'Seed ejecutado con exito';

        } catch (error) {
            console.log(error)
            return error;
        }
    }
}
