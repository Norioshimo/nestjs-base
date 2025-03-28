import { Controller, Get, Post, Body, Patch, Param, Delete, Logger, UseGuards, Query, ParseIntPipe } from '@nestjs/common';
import { RolesService } from './roles.service';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/decorators';
import { Usuario } from '../usuarios/entities';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { CreateRolDto, UpdateRolDto } from './dto';

@Controller('roles')
export class RolesController {

  private log = new Logger('RolesController');
  constructor(private readonly rolesService: RolesService) { }

  @Post()
  @UseGuards(AuthGuard())
  create(@Body() createRoleDto: CreateRolDto, @GetUser() user: Usuario) {
    return this.rolesService.create(createRoleDto, user);
  }

  @Get()
  @UseGuards(AuthGuard())
  findAll(@Query() paginationDto: PaginationDto) {
    return this.rolesService.findAll(paginationDto);
  }

  @Get(':id')
  @UseGuards(AuthGuard())
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.rolesService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard())
  update(@Param('id', ParseIntPipe) id: number, @Body() updateRoleDto: UpdateRolDto, @GetUser() user: Usuario) {
    return this.rolesService.update(id, updateRoleDto, user);
  }

  @Delete(':id')
  @UseGuards(AuthGuard())
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.rolesService.remove(id);
  }
}
