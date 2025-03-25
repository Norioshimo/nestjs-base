import { IsOptional, IsString, Length, MaxLength } from "class-validator";

export class CreateRoleDto {
    @IsString()
    @MaxLength(100)
    nombre: string;

    @IsString()
    @MaxLength(1000)
    @IsOptional()
    descripcion?: string;

}
