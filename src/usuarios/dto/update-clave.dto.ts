import { IsString, MinLength } from "class-validator";


export class UpdateClaveDto {

    @IsString()
    @MinLength(1)
    clave: string;
}