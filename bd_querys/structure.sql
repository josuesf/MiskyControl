CREATE TABLE sucursal
( 
cod_sucursal         varchar(30)  NOT NULL ,
nombre               varchar(100)  NULL ,
direccion            varchar(120)  NULL ,
telefono             varchar(12)  NULL ,
fax                  varchar(12)  NULL ,
correo               varchar(40)  NULL ,
tipo_sistema         varchar(10)  NULL ,
fecha_inicio         TIMESTAMP  NULL ,
latitud              numeric(18,2)  NULL ,
longitud             numeric(18,2)  NULL ,
departamento         char(4)  NULL ,
provincia         char(4)  NULL ,
distrito           char(4)  NULL ,
estado      smallint default 1,
creado_en TIMESTAMP NOT NULL,
usuario_creacion varchar(50),
actualizado_en TIMESTAMP,
usuario_actualizo varchar(50),
 PRIMARY KEY (cod_sucursal)
)
CREATE TABLE persona
( 
cod_persona          varchar(12)  NOT NULL ,
tipo_persona         varchar(8)  NULL ,
razon_social         varchar(120)  NULL ,
nombres              varchar(40)  NULL ,
a_paterno             varchar(30)  NULL ,
a_materno             varchar(30)  NULL ,
tipo_doc_ident       varchar(11)  NULL ,
doc_ident            varchar(15)  NULL ,
fecha_nacimiento     timestamp  NULL ,
sexo                 char(1)  NULL ,
direccion            varchar(70)  NULL ,
tel_fijo             varchar(10)  NULL ,
telf_movil            varchar(10)  NULL ,
correo               varchar(38)  NULL ,
estado      smallint default 1,
creado_en TIMESTAMP NOT NULL,
usuario_creacion varchar(50),
actualizado_en TIMESTAMP,
usuario_actualizo varchar(50),
 PRIMARY KEY (cod_persona)
)
-- Tabla Almacen
CREATE TABLE almacen(
 almacen_id serial PRIMARY KEY,
 almacen_cod VARCHAR (50) UNIQUE NOT NULL,
 descripcion VARCHAR (200) NOT NULL,
 tipo VARCHAR (100) NOT NULL,
 estado      smallint default 1,
 creado_en TIMESTAMP NOT NULL,
 usuario_creacion varchar(50),
 actualizado_en TIMESTAMP,
 usuario_actualizo varchar(50)
);

CREATE TABLE modulo
( 
 cod_modulo          varchar(30)  NOT NULL PRIMARY KEY,
 nombre               varchar(50) not NULL ,
 descripcion          varchar(70)  NULL ,
 nivel                smallint  NULL ,
 ruta_modulo          varchar(110)  NULL ,
 tipo_modulo          varchar(20)  NULL ,
 imagen_url           varchar(110)  NULL ,
 estado      smallint default 1,
 creado_en TIMESTAMP NOT NULL,
 usuario_creacion varchar(50),
 actualizado_en TIMESTAMP,
 usuario_actualizo varchar(50)	
)
CREATE TABLE perfil
( 
cod_perfil           varchar(30)  NOT NULL PRIMARY KEY ,
nombre               varchar(30)  NULL ,
descripcion          varchar(70)  NULL ,
url_icono            varchar(70)  NULL ,
estado      smallint default 1,
creado_en TIMESTAMP NOT NULL,
usuario_creacion varchar(50),
actualizado_en TIMESTAMP,
usuario_actualizo varchar(50)
)
CREATE TABLE perfil_modulo
( 
cod_modulo  varchar(30)  NOT NULL ,
cod_perfil  varchar(30)  NOT NULL ,
nivel_acceso         smallint  NULL ,
 PRIMARY KEY (cod_modulo,cod_perfil),
 FOREIGN KEY (cod_modulo) REFERENCES modulo(cod_modulo)
	ON UPDATE NO ACTION ON DELETE NO ACTION,
 FOREIGN KEY (cod_perfil) REFERENCES perfil(cod_perfil)
	ON DELETE NO ACTION
)
CREATE TABLE cuenta(
 usuario_id serial PRIMARY KEY,
 usuario VARCHAR (50) UNIQUE NOT NULL,
 contrasena VARCHAR (50) NOT NULL,
 email VARCHAR (355) UNIQUE NOT NULL,
 telefono varchar(20),
 foto_url VARCHAR (355),
 cod_perfil varchar(30),
 cod_sucursal varchar(30),
 estado      smallint default 1,
 creado_en TIMESTAMP NOT NULL,
 usuario_creacion varchar(50),
 actualizado_en TIMESTAMP,
 usuario_actualizo varchar(50),
 ultimo_ingreso TIMESTAMP,
 FOREIGN KEY (cod_perfil) REFERENCES perfil(cod_perfil)
	ON DELETE NO ACTION
);
--Insercion de account default
INSERT INTO cuenta(usuario,contrasena,email,telefono,estado,foto_url,cod_perfil,cod_sucursal,
creado_en,usuario_creacion,actualizado_en,usuario_actualizo,ultimo_ingreso) 
values('ADMIN','708f0ce9e8d98c9a0722d50287d6397c','josuesf94@gmail.com','962215459',null,null,null,1,now(),null,null,null,null)
