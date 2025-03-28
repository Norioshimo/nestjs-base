import { IsNotEmpty, IsNumber } from "class-validator";

export class RolprogramaDto {

    @IsNumber()
    @IsNotEmpty({message: 'El id del rol programa es requerido'})
    id_rolprograma: number;

    @IsNumber()
    @IsNotEmpty({message: 'El id del programa es requerido'})
    id_programa: number;

}
