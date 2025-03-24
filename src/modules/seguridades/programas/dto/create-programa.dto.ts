import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateProgramaDto {

    @IsString()
    @MaxLength(50)
    @IsNotEmpty()
    nombre:string;

}
