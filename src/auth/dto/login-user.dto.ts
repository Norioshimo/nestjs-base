import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";



export class LoginUserDto {

    @ApiProperty()
    @IsString()
    @IsNotEmpty({message:"Usuario no puede ser vacio"})
    usuario: string;


    @ApiProperty()
    @IsString()
    @IsNotEmpty({message:"Clave no puede ser vacio"})
    clave: string;
}