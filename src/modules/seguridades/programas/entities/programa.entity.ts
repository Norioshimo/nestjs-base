import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name: "programas"
})
export class Programa {
    @PrimaryGeneratedColumn('increment')
    id_programa: number;

    @Column({
        nullable: false,
        type: 'character varying',
        name: 'nombre',
        length: 100
    })
    nombre: string

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
}
