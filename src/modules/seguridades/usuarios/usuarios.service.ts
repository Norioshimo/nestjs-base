import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateUsuarioDto, UpdateUsuarioDto } from './dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { Usuario } from './entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { HashAdapter } from 'src/auth/adapters/sha1.adapters';
import { UpdateClaveDto } from './dto/update-clave.dto';
import { Rol } from '../roles/entities';
import { RolesService } from '../roles/roles.service';

@Injectable()
export class UsuariosService {

  private readonly log = new Logger('UsuariosService')
  private defaultLimit: number;

  constructor(
    @InjectRepository(Usuario)
    private readonly usuariosRepository: Repository<Usuario>,
    private readonly configService: ConfigService,
    private readonly hashAdapter: HashAdapter,
    private readonly rolesService: RolesService
  ) {
    this.defaultLimit = this.configService.get<number>('defaultLimit');
  }

  async create(createUsuarioDto: CreateUsuarioDto, user: Usuario) {


    const { clave, id_rol, ...rest } = createUsuarioDto;
    // Buscar rol
    const rolRecibido = await this.rolesService.findOne(id_rol);

    // Validar si existe el usuario
    const usuarioExiste = await this.usuariosRepository.findOneBy({ usuario: createUsuarioDto.usuario });
    if (usuarioExiste) {
      throw new BadRequestException(`Ya existe el usuario ${createUsuarioDto.usuario}`)
    }



    // Encriptar clave
    const claveEncripted = this.hashAdapter.sha1(clave);

    try {


      const usuario = await this.usuariosRepository.create({
        clave: claveEncripted,
        ...rest,
        idRol: rolRecibido,
        fecha_insercion: new Date(),
        usuario_insercion: user.id_usuario // Dato del usuario autenticado.
      });


      // Persistir en la base de datos
      await this.usuariosRepository.save(usuario);
      delete usuario.clave;
      delete usuario.idRol;


      return { ...usuario, id_rol };
    } catch (error) {
      this.handleDBExceptions(error);
    }

  }

  async findAll(paginationDto: PaginationDto) {

    const { limit = this.defaultLimit, offset = 0 } = paginationDto;

    const usuarios = await this.usuariosRepository.find({
      take: limit,
      skip: offset,
      order: {
        id_usuario: "DESC" // Ordenar por id_usuario en orden descendente
      },
      relations: ["idRol"],
      select: {
        id_usuario: true,
        usuario: true,
        nombre_completo: true,
        usuario_tipo: true,
        usuario_estado: true,
        idRol: {
          id_rol: true,
          nombre: true,
        }
      }
    })

    return usuarios;
  }

  async findOne(id: number) {
    const usuario = await this.usuariosRepository.findOne({
      where: { id_usuario: id },
      relations: ["idRol"],
      select: {
        idRol: {
          id_rol: true,
          nombre: true,
        },
      },
    })

    if (!usuario) {
      throw new NotFoundException(`No existe usuario con el id ${id}`)
    }

    delete usuario.clave;//Eliminar la clave del objeto de retorno.

    return { ...usuario };
  }

  async update(id: number, updateUsuarioDto: UpdateUsuarioDto, user: Usuario) {

    const { clave, id_rol, ...rest } = updateUsuarioDto;// Buscar rol
    const rolRecibido = await this.rolesService.findOne(id_rol);

    const userUpdate = {
      id_usuario: id,
      usuario_modificacion: user.id_usuario,//Actualizar con el usuario logueado
      fecha_modificacion: new Date(),
      clave,
      ...rest,
      idRol: rolRecibido,
    }

    if (clave) {
      userUpdate.clave = this.hashAdapter.sha1(clave);
    } else {
      delete userUpdate.clave;
    }

    const usuario = await this.usuariosRepository.preload(userUpdate)


    try {

      await this.usuariosRepository.save(usuario);

      delete usuario.clave;
      return {...usuario,id_rol};
    } catch (error) {
      this.handleDBExceptions(error);
    }


  }

  async remove(id: number) {

    const usuario = await this.findOne(id);
    try {
      const usuarioDelete = await this.usuariosRepository.remove(usuario);
      return `Usuario con el id ${id} fue eliminado con exito.`;
    } catch (error) {
      this.handleDBExceptions(error);
    }

  }

  async updateClave(user: Usuario, updateClaveDto: UpdateClaveDto) {
    const { id_usuario } = user;

    await this.findOne(id_usuario);//Validar si existe el usuario con el id_usuario

    updateClaveDto.clave = this.hashAdapter.sha1(updateClaveDto.clave);

    const usuario = await this.usuariosRepository.preload({ id_usuario, ...updateClaveDto });

    try {
      await this.usuariosRepository.save(usuario);
    } catch (error) {
      this.handleDBExceptions(error);
    }


    return `Se ha actuliazado la clave con éxito.`
  }

  //Funciones adicionales
  private handleDBExceptions(error: any) {
    if (error.code === '23505') {
      throw new BadRequestException(error.detail);
    }
    this.log.error(error);
    throw new InternalServerErrorException(
      'Error inesperado, verificar el log'
    );
  }


}
