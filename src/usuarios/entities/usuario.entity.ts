import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name:'usuarios'
})
export class Usuario {

    @PrimaryGeneratedColumn('increment')
  id_usuario: number;

    @Column({
        nullable: false,
        type: 'text',
        name:'nombre_completo'
    })
    nombre_completo: string;

    @Column({
        nullable: false,
        type: 'text',
        name:'usuario'
    })
    usuario: string;

    @Column({
        nullable: false,
        type: 'text',
        name:'clave',
        select:true
    })
    clave: string;

    @Column({
        nullable: false,
        type: 'text',
        name:'usuario_tipo'
    })
    usuario_tipo: string;

    @Column({
        nullable: false,
        type: 'text',
        name:'usuario_estado'
    })
    usuario_estado: string;

    @Column({
        nullable: false,
        name:'fecha_inserccion'
    })
    fecha_inserccion: Date;

    @Column({
        nullable: false,
        type: 'int',
        name:'usuario_inserccion'
    })
    usuario_inserccion: number;

    @Column({
        nullable: true,
        name:'fecha_modificacion'
    })
    fecha_modificacion: Date;

    @Column({
        nullable: true,
        type: 'int',
        name:'usuario_modificacion'
    })
    usuario_modificacion: number;

    @Column({
        nullable: true,
        type: 'text',
        name:'email'
    })
    email: string;

}
