import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { Programa } from './entities/programa.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { Usuario } from '../usuarios/entities';
import { CreateProgramaDto, UpdateProgramaDto } from './dto';

@Injectable()
export class ProgramasService {
  private readonly log = new Logger('ProgramasService')
  private defaultLimit: number;

  constructor(
    @InjectRepository(Programa)
    private readonly programaRespository: Repository<Programa>,
    private readonly configService: ConfigService
  ) {
    this.defaultLimit = this.configService.get<number>('defaultLimit');
  }

  async create(createProgramaDto: CreateProgramaDto, user: Usuario) {
    try {
      const programa = await this.programaRespository.create({
        ...createProgramaDto,
        usuario_insercion: user.id_usuario,
        fecha_insercion: new Date()
      })
      await this.programaRespository.save(programa)
      return programa;
    } catch (error) {
      this.handleDBExceptions(error)
    }
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit = this.defaultLimit, offset = 0 } = paginationDto;

    const programa = await this.programaRespository.find({
      take: limit,
      skip: offset,
      select: ["id_programa", "nombre"],
      order: {
        id_programa: "DESC" // Ordenar por id_programa en orden descendente
      }
    })

    return programa;
  }

  async findOne(id: number) {
    const programa = await this.programaRespository.findOneBy({
      id_programa: id
    });

    if (!programa) {
      throw new NotFoundException(`No existe el programa con el id ${id}`)
    }

    return { ...programa }
  }

  async update(id: number, updateProgramaDto: UpdateProgramaDto, user: Usuario) {
    const programa = await this.programaRespository.preload({
      id_programa: id,
      usuario_modificacion: user.id_usuario,
      fecha_modificacion: new Date(),
      ...updateProgramaDto
    })

    try {

      await this.programaRespository.save(programa);
      return programa;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async remove(id: number) {
    const programa = await this.findOne(id);
    try {
      const programaDelete = await this.programaRespository.remove(programa);

      return `Programa eliminado con exito. Id ${id}`
    } catch (error) {
      this.handleDBExceptions(error)
    }

    return `This action removes a #${id} programa`;
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
