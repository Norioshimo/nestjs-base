import { PartialType } from '@nestjs/mapped-types';
import { CreateRolDto } from './create-role.dto';
import { IsArray, IsNumber, IsOptional } from 'class-validator';

export class UpdateRolDto extends PartialType(CreateRolDto) {

    @IsArray()
    @IsOptional()
    @IsNumber({ allowNaN: false, maxDecimalPlaces: 0 }, { each: true })
    rolprogramasEliminar?: number[];
}
