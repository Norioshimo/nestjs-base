
/* Crear tabla  de usuarios*/
CREATE TABLE public.usuarios (
    id_usuario serial,
    nombre_completo varchar(50) NOT NULL,
    usuario varchar(20) NOT NULL,
    clave varchar(255) NOT NULL,
    usuario_tipo varchar(1) NOT NULL,
    usuario_estado varchar(1) NOT NULL,
    fecha_insercion timestamp NOT NULL,
    usuario_insercion int4 NOT NULL,
    fecha_modificacion timestamp,
    usuario_modificacion int4,
    email text,
    PRIMARY KEY (id_usuario)
);

/* Crear tabla de configuraciones*/
CREATE TABLE public.configuraciones (
    id_configuracion serial,
    parametro varchar(50) NOT NULL,
    valor varchar(3000) NOT NULL,
    descripcion varchar(1000),
    fecha_insercion timestamp NOT NULL,
    usuario_insercion int4 NOT NULL,
    fecha_modificacion timestamp,
    usuario_modificacion int4,
    PRIMARY KEY (id_configuracion)
);

/* Crear tabla de programas*/
CREATE TABLE public.programas(
    id_programa serial,
    nombre character varying(100),
    fecha_insercion timestamp NOT NULL,
    usuario_insercion int4 NOT null,
    fecha_modificarion timestamp,
    usuario_modificacion int4,
    PRIMARY KEY(id_programa)
);