import { ApiProperty } from "@nestjs/swagger";
import { IsIn, IsOptional, IsString, Length, MaxLength, MinLength } from "class-validator";

export class CreateUsuarioDto {

    @ApiProperty()
    @IsString()
    @MinLength(1)
    nombre_completo: string;

    @ApiProperty()
    @IsString()
    @MinLength(1)
    usuario: string;

    @ApiProperty()
    @IsString()
    @MinLength(1)
    clave: string;

    @ApiProperty()
    @IsString()
    @MaxLength(1)
    @MinLength(1)
    @IsIn(['A', 'C', 'O', 'R'])
    usuario_tipo: string;

    @ApiProperty()
    @IsString()
    @MaxLength(1)
    @MinLength(1)
    @IsIn(['I', 'A'])
    usuario_estado: string;

    @ApiProperty({ required: false })
    @IsString()
    @IsOptional()
    email?: string;

}
