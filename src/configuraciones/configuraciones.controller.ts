import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query, ParseIntPipe } from '@nestjs/common';
import { ConfiguracionesService } from './configuraciones.service';
import { CreateConfiguracioneDto } from './dto/create-configuracion.dto';
import { UpdateConfiguracioneDto } from './dto/update-configuracion.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/decorators';
import { Usuario } from 'src/usuarios/entities';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

@ApiTags("Configuraciones")
@Controller('configuraciones')
export class ConfiguracionesController {
  constructor(private readonly configuracionesService: ConfiguracionesService) { }

  @Post()
  @UseGuards(AuthGuard())
  create(@Body() createConfiguracioneDto: CreateConfiguracioneDto, @GetUser() user: Usuario) {
    return this.configuracionesService.create(createConfiguracioneDto, user);
  }

  @Get()
  @UseGuards(AuthGuard())
  findAll(@Query() paginationDto: PaginationDto) {
    return this.configuracionesService.findAll(paginationDto);
  }

  @Get(':id')
  @UseGuards(AuthGuard())
  findOne(@Param('id', ParseIntPipe) id: number) {
    console.log('cofniguraion y id : '+id)
    return this.configuracionesService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard())
  update(@Param('id',ParseIntPipe) id: number, @Body() updateConfiguracioneDto: UpdateConfiguracioneDto, @GetUser() user: Usuario) {
    return this.configuracionesService.update(id, updateConfiguracioneDto,user);
  }

  @Delete(':id')
  @UseGuards(AuthGuard())
  remove(@Param('id',ParseIntPipe) id: number) {
    return this.configuracionesService.remove(id);
  }
}
