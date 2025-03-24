import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString, Length, MaxLength } from "class-validator";

export class CreateConfiguracioneDto {

    @ApiProperty()
    @IsString()
    @MaxLength(50)
    parametro: string;

    @ApiProperty()
    @IsString()
    @MaxLength(3000)
    valor: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    @MaxLength(1000)
    descripcion: string;

}
