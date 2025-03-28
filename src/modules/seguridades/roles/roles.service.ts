import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { Usuario } from '../usuarios/entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Rol } from './entities/rol.entity';
import { ConfigService } from '@nestjs/config';
import { Repository } from 'typeorm';
import { CreateRolDto, RolprogramaDto, UpdateRolDto } from './dto';
import { Rolprograma } from './entities';

@Injectable()
export class RolesService {

  private readonly log = new Logger('ConfiguracionesService')
  private defaultLimit: number;

  constructor(
    @InjectRepository(Rol)
    private readonly rolRepository: Repository<Rol>,
    @InjectRepository(Rolprograma)
    private readonly rolprogramasRepository: Repository<Rolprograma>,
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,

    private readonly configService: ConfigService,
  ) {
    this.defaultLimit = this.configService.get<number>('defaultLimit');
  }


  async create(createRoleDto: CreateRolDto, user: Usuario) {

    // Usamos un queryRunner para envolver todas las operaciones en una transacción
    const queryRunner = this.rolRepository.manager.connection.createQueryRunner();

    try {
      // Iniciamos la transacción
      await queryRunner.startTransaction();

      const { rolprogramas = [], ...rolDetails } = createRoleDto;

      // Primero crear el rol
      const rol = await this.rolRepository.create({
        ...rolDetails,
        usuario_insercion: user.id_usuario,
        fecha_insercion: new Date()
      });

      // Guardamos el rol para obtener su id_rol
      const rolNew = await queryRunner.manager.save(rol);


      // Insertar los programas si hay 
      const rolProgramas = rolprogramas.map((rolprograma) =>
        this.rolprogramasRepository.create({
          idPrograma: { id_programa: rolprograma.id_programa },// Validar si los id de programa son validos o exitente en la base de atos.
          idRol: rolNew,
          usuario_insercion: user.id_usuario,
          fecha_insercion: new Date(),
        }),
      );

      // Guardamos las relaciones en la tabla intermedia
      await queryRunner.manager.save(rolProgramas);


      // Si todo sale bien, confirmamos los cambios (commit)
      await queryRunner.commitTransaction();

      return rolNew;
    } catch (error) {
      // Si ocurre un error, hacemos rollback de la transacción
      await queryRunner.rollbackTransaction();
      this.handleDBExceptions(error);
    } finally {
      // Finalmente, liberamos el queryRunner
      await queryRunner.release();
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
    const rol = await this.rolRepository.findOne({
      where: { id_rol: id },
      relations: ["rolprogramas", "rolprogramas.idPrograma"],
      select: {
        rolprogramas: {
          id_rolprograma: true,
          idPrograma: {
            id_programa: true,
            nombre: true
          }
        }
      }
    })

    if (!rol) {
      throw new NotFoundException(`No existe rol con el id ${id}`)
    }

    return { ...rol };
  }

  async update(id: number, updateRoleDto: UpdateRolDto, user: Usuario) {

    await this.findOne(id); // Validar si existe el rol con el id proporcionado


    const queryRunner = this.rolRepository.manager.connection.createQueryRunner();

    try {
      // Iniciamos la transacción
      await queryRunner.startTransaction();

      const { rolprogramas = [], rolprogramasEliminar = [], ...rolDetails } = updateRoleDto;

      const rol = await this.rolRepository.preload({
        id_rol: id,
        usuario_modificacion: user.id_usuario,//Actualizar con el usuario logueado
        fecha_modificacion: new Date(),
        ...rolDetails
      })


      await queryRunner.manager.save(rol);// Actualizar el rol

      // Eliminar programas
      await rolprogramasEliminar?.forEach(async (id_rolprograma) => {
        await this.rolprogramasRepository.delete({ id_rolprograma, idRol: { id_rol: id } });
      })


      const rolProgramas = await Promise.all(
        rolprogramas.map(async (rolprograma: RolprogramaDto) => {
          if (rolprograma.id_rolprograma < 0) {
            return this.rolprogramasRepository.create({
              idPrograma: { id_programa: rolprograma.id_programa },
              idRol: { id_rol: id },
              usuario_insercion: user.id_usuario,
              fecha_insercion: new Date(),
            });
          } else {
            return await this.rolprogramasRepository.preload({
              id_rolprograma: rolprograma.id_rolprograma, // Asegurar que se pase el ID del registro
              idRol: { id_rol: id }, // Pasar solo el ID en vez de un objeto
              idPrograma: { id_programa: rolprograma.id_programa },
            });
          }
        })
      );

 
      // Guardamos las relaciones en la tabla intermedia
      await queryRunner.manager.save(rolProgramas);



      await queryRunner.commitTransaction();

      return rol;
    } catch (error) {
      // Si ocurre un error, hacemos rollback de la transacción
      await queryRunner.rollbackTransaction();
      this.handleDBExceptions(error);
    } finally {
      // Finalmente, liberamos el queryRunner
      await queryRunner.release();
    }
  }

  async remove(id: number) {
    const rol = await this.findOne(id);
    const user = await this.usuarioRepository.findOne({
      where: { idRol: { id_rol: id } }
    });
    console.log(user)
    if (user) {// Si exise el usuario omitir el borrado del usuario.
      throw new BadRequestException("No se puede eliminar el rol, existen usuarios asociados a este rol.")
    }

    try {

      await rol.rolprogramas.forEach(async (rolprograma) => {
        await this.rolprogramasRepository.remove(rolprograma);
      })


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
    } else if (error.code === '23503') {
      throw new BadRequestException("No existe rol con el id proporcionado. ", error.detail);
    }

    this.log.error(`Codigo de error: ${error.code}`);
    this.log.error(error);
    throw new InternalServerErrorException(
      'Error inesperado, verificar el log'
    );
  }
}
