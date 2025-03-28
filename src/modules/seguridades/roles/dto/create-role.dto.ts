import { IsArray, IsNumber, IsObject, IsOptional, IsString, MaxLength, ValidateNested } from "class-validator";
import { RolprogramaDto } from "./rolprogramas.dto";
import { Type } from "class-transformer";

export class CreateRolDto {
    @IsString()
    @MaxLength(100)
    nombre: string;

    @IsString()
    @MaxLength(1000)
    @IsOptional()
    descripcion?: string;


    @IsArray()
    @IsOptional()
    @ValidateNested({ each: true }) // Valida cada elemento del array
    @Type(() => RolprogramaDto) // Convierte cada elemento en una instancia de RolprogramaDto
    rolprogramas?: RolprogramaDto[];

}
