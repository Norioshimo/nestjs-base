import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateConfiguracioneDto, UpdateConfiguracioneDto } from './dto';
import { Usuario } from 'src/modules/seguridades/usuarios/entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Configuracion } from './entities/configuracion.entity';
import { ConfigService } from '@nestjs/config';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

@Injectable()
export class ConfiguracionesService {

  private readonly log = new Logger('ConfiguracionesService')
  private defaultLimit: number;

  constructor(
    @InjectRepository(Configuracion)
    private readonly configuracionRepository: Repository<Configuracion>,
    private readonly configService: ConfigService
  ) {
    this.defaultLimit = this.configService.get<number>('defaultLimit');
  }

  async create(createConfiguracioneDto: CreateConfiguracioneDto, user: Usuario) {

    try {

      const configuracion = await this.configuracionRepository.create({
        ...createConfiguracioneDto,
        usuario_insercion: user.id_usuario,
        fecha_insercion: new Date()
      })

      await this.configuracionRepository.save(configuracion)
      return configuracion;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async findAll(paginationDto: PaginationDto) {

    const { limit = this.defaultLimit, offset = 0 } = paginationDto;

    const configuraciones = await this.configuracionRepository.find({
      take: limit,
      skip: offset,
      select: ["id_configuracion", "parametro", "valor"],
      order: {
        id_configuracion: "DESC" // Ordenar por id_configuracion en orden descendente
      }
    })

    return configuraciones;
  }

  async findOne(id: number) {
    const configuracion = await this.configuracionRepository.findOneBy({
      id_configuracion: id
    })

    if (!configuracion) {
      throw new NotFoundException(`No existe la configuración con el id ${id}`)
    }

    return { ...configuracion };
  }

  async update(id: number, updateConfiguracioneDto: UpdateConfiguracioneDto, user: Usuario) {
    console.log(id)
    const configuracion = await this.configuracionRepository.preload({
      id_configuracion: id,
      usuario_modificacion: user.id_usuario,//Actualizar con el usuario logueado
      fecha_modificacion: new Date(),
      ...updateConfiguracioneDto
    })


    try {

      await this.configuracionRepository.save(configuracion);
      return configuracion;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async remove(id: number) {
    const configuracion = await this.findOne(id);
    try {
      const configuracionDelete = await this.configuracionRepository.remove(configuracion);
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
