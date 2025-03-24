import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity({
    name: 'configuraciones'
})
export class Configuracion {
    @PrimaryGeneratedColumn('increment')
    id_configuracion: number;

    @Column({
        nullable: false,
        type: 'character varying',
        name: 'parametro',
        length: 50
    })
    parametro: string;

    @Column({
        nullable: false,
        type: 'character varying',
        name: 'valor',
        length: 3000
    })
    valor: string;

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



}
