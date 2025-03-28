import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from 'src/modules/seguridades/usuarios/entities';
import { Repository } from 'typeorm';
import { HashAdapter } from '../auth/adapters/sha1.adapters';
import { Rol } from 'src/modules/seguridades/roles/entities/rol.entity';

@Injectable()
export class SeedService {

    private log = new Logger('SeedService');

    constructor(
        @InjectRepository(Usuario)
        private readonly usuarioRepository: Repository<Usuario>,
        @InjectRepository(Rol)
        private readonly rolRepository: Repository<Rol>,

        private readonly hashAdapter: HashAdapter
    ) { }

    async ejecutarSeed() {

        const usuario = await this.usuarioRepository.findOne({
            where: {
                usuario: 'superAdmin'
            }
        });

        if (usuario) {
            throw new BadRequestException(`El seed ya fue ejecutado en ${usuario.fecha_insercion}`)
        }

        // Datos de super rol
        const rolIns = {
            nombre: 'Super Rol',
            descripcion: 'Rol con todos los permisos',
            usuario_insercion: 1,
            fecha_insercion: new Date()
        }

        // Datos de usuario super admin
        const userIns = {
            nombre_completo: 'Super Admin',
            usuario: 'superAdmin',
            usuario_estado: 'A',
            usuario_insercion: 1,
            fecha_insercion: new Date(),
            usuario_tipo: 'A',
            clave: this.hashAdapter.sha1('123')
        }

        try {
            // Insertar rol
            const rol = await this.rolRepository.create(rolIns);
            const rolNew = await this.rolRepository.save(rol);
            this.log.log(`Rol creado con exito: ${JSON.stringify(rolNew)}`)


            // Insertar usuario
            const usuario = await this.usuarioRepository.create({
                ...userIns,
                idRol: rolNew
            })

            const usuarioNew = await this.usuarioRepository.save(usuario)//Guardar en la base de datos.
            this.log.log(`Usuario creado con exito: ${JSON.stringify(usuarioNew)}`)


            return 'Seed ejecutado con exito';

        } catch (error) {
            this.log.log(error)
            return error;
        }
    }
}
