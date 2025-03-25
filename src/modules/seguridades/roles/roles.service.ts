import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { Usuario } from '../usuarios/entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Rol } from './entities/rol.entity';
import { ConfigService } from '@nestjs/config';
import { Repository } from 'typeorm';
import { CreateRoleDto, UpdateRoleDto } from './dto';

@Injectable()
export class RolesService {

  private readonly log = new Logger('ConfiguracionesService')
  private defaultLimit: number;

  constructor(
    @InjectRepository(Rol)
    private readonly rolRepository: Repository<Rol>,
    private readonly configService: ConfigService
  ) {
    this.defaultLimit = this.configService.get<number>('defaultLimit');
  }


  async create(createRoleDto: CreateRoleDto, user: Usuario) {

    try {

      const rol = await this.rolRepository.create({
        ...createRoleDto,
        usuario_insercion: user.id_usuario,
        fecha_insercion: new Date()
      })

      await this.rolRepository.save(rol)
      return rol;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit = this.defaultLimit, offset = 0 } = paginationDto;

    const rol = await this.rolRepository.find({
      take: limit,
      skip: offset,
      select: ["id_rol", "nombre", "descripcion"],
      order: {
        id_rol: "DESC" // Ordenar por id_configuracion en orden descendente
      }
    })

    return rol;
  }

  async findOne(id: number) {
    const configuracion = await this.rolRepository.findOneBy({
      id_rol: id
    })

    if (!configuracion) {
      throw new NotFoundException(`No existe rol con el id ${id}`)
    }

    return { ...configuracion };
  }

  async update(id: number, updateRoleDto: UpdateRoleDto, user: Usuario) {
    console.log(id)
    const rol = await this.rolRepository.preload({
      id_rol: id,
      usuario_modificacion: user.id_usuario,//Actualizar con el usuario logueado
      fecha_modificacion: new Date(),
      ...updateRoleDto
    })


    try {

      await this.rolRepository.save(rol);
      return rol;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async remove(id: number) {
    const rol = await this.findOne(id);
    try {
      const rolDelete = await this.rolRepository.remove(rol);
      return `Configuracion con el id ${id} fue eliminado con exito.`;
    } catch (error) {
      this.handleDBExceptions(error);
    }
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
