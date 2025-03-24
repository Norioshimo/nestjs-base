import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe, UseGuards, Put } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/decorators';
import { Usuario } from './entities';
import { ApiTags } from '@nestjs/swagger';
import { UpdateClaveDto } from './dto/update-clave.dto';

@ApiTags("Usuario")
@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) { }

  @Post()
  @UseGuards(AuthGuard())
  create(@Body() createUsuarioDto: CreateUsuarioDto, @GetUser() user: Usuario) {
    return this.usuariosService.create(createUsuarioDto, user);
  }

  @Get()
  @UseGuards(AuthGuard())
  findAll(@Query() paginationDto: PaginationDto) {
    return this.usuariosService.findAll(paginationDto);
  }

  @Get(':id')
  @UseGuards(AuthGuard())
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usuariosService.findOne(id);
  }

  
  @Patch('update-clave') 
  @UseGuards(AuthGuard())
  updateClave(  
    @Body() updateClaveDto: UpdateClaveDto, @GetUser() user: Usuario
  ) {
    return this.usuariosService.updateClave(user,updateClaveDto);
  }

  @Patch(':id')
  @UseGuards(AuthGuard())
  update(@Param('id', ParseIntPipe) id: number, @Body() updateUsuarioDto: UpdateUsuarioDto, @GetUser() user: Usuario) {
    return this.usuariosService.update(id, updateUsuarioDto, user);
  }

  @Delete(':id')
  @UseGuards(AuthGuard())
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.usuariosService.remove(id);
  }

}
