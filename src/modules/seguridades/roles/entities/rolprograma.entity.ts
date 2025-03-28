import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Rol } from "./rol.entity";
import { Programa } from "../../programas/entities/programa.entity";


@Entity({
    name: 'rolesprogramas'
})
export class Rolprograma {

    @PrimaryGeneratedColumn('increment')
    id_rolprograma: number;


    @Column({
        nullable: false,
        name: 'fecha_insercion'
    })
    fecha_insercion: Date;

    @Column({
        nullable: false,
        type: 'int',
        name: 'usuario_insercion'
    })
    usuario_insercion: number;

    @Column({
        nullable: true,
        name: 'fecha_modificacion'
    })
    fecha_modificacion: Date;

    @Column({
        nullable: true,
        type: 'int',
        name: 'usuario_modificacion'
    })
    usuario_modificacion: number;

    @ManyToOne(() => Rol,
        (rol) => rol.rolprogramas,
        { nullable: false })
    @JoinColumn({
        name: "id_rol"
    })
    idRol: Rol;

    @ManyToOne(() => Programa,
        (programa) => programa.id_programa,
        { nullable: false })
    @JoinColumn({
        name: "id_programa"
    })
    idPrograma: Programa;

}