import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Rol } from "../../roles/entities/rol.entity";

@Entity({
    name: 'usuarios'
})
export class Usuario {

    @PrimaryGeneratedColumn('increment')
    id_usuario: number;

    @Column({
        nullable: false,
        type: 'character varying',
        name: 'nombre_completo',
        length: 50
    })
    nombre_completo: string;

    @Column({
        nullable: false,
        type: 'character varying',
        name: 'usuario',
        length: 20
    })
    usuario: string;

    @Column({
        nullable: false,
        type: 'character varying',
        name: 'clave',
        select: true,
        length: 255
    })
    clave: string;

    @Column({
        nullable: false,
        type: 'character varying',
        name: 'usuario_tipo',
        length: 1
    })
    usuario_tipo: string;

    @Column({
        nullable: false,
        type: 'character varying',
        name: 'usuario_estado',
        length: 1
    })
    usuario_estado: string;

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

    @Column({
        nullable: true,
        type: 'text',
        name: 'email'
    })
    email: string;

    @ManyToOne(() => Rol, (rol) => rol.usuarios, { nullable: false })
    @JoinColumn({
        name: "id_rol"
    })
    rol: Rol;
}
