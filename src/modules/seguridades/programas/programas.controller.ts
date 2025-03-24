import { Controller, Get, Post, Body, Patch, Param, Delete, Logger, UseGuards, Query, ParseIntPipe } from '@nestjs/common';
import { ProgramasService } from './programas.service';
import { CreateProgramaDto } from './dto/create-programa.dto';
import { UpdateProgramaDto } from './dto/update-programa.dto';
import { AuthGuard } from '@nestjs/passport';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { Usuario } from '../usuarios/entities';
import { GetUser } from 'src/auth/decorators';

@Controller('programas')
export class ProgramasController {

  private log = new Logger('ProgramasController')
  constructor(private readonly programasService: ProgramasService) { }

  @Post()
  @UseGuards(AuthGuard())
  create(@Body() createProgramaDto: CreateProgramaDto, @GetUser() user: Usuario) {
    return this.programasService.create(createProgramaDto, user);
  }

  @Get()
  @UseGuards(AuthGuard())
  findAll(@Query() paginationDto: PaginationDto) {
    return this.programasService.findAll(paginationDto);
  }

  @Get(':id')
  @UseGuards(AuthGuard())
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.programasService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard())
  update(@Param('id', ParseIntPipe) id: number, @Body() updateProgramaDto: UpdateProgramaDto, @GetUser() user: Usuario) {
    return this.programasService.update(id, updateProgramaDto, user);
  }

  @Delete(':id')
  @UseGuards(AuthGuard())
  remove(@Param('id') id: string) {
    return this.programasService.remove(+id);
  }
}
