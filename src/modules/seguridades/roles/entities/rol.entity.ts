import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Usuario } from "../../usuarios/entities";
import { Rolprograma } from "./rolprograma.entity";


@Entity({
    name: 'roles'
})
export class Rol {

    @PrimaryGeneratedColumn('increment')
    id_rol: number;

    @Column({
        nullable: false,
        type: 'character varying',
        name: 'nombre',
        length: 100
    })
    nombre: string;

    @Column({
        nullable: true,
        type: 'character varying',
        name: 'descripcion',
        length: 1000
    })
    descripcion: string;

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

    @OneToMany(() => Usuario, (usuario) => usuario.idRol)
    usuarios: Usuario[];

    @OneToMany(() => Rolprograma, (rolprograma) => rolprograma.idRol )
    rolprogramas: Rolprograma[];
}
