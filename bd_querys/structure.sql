CREATE TABLE account(
 user_id serial PRIMARY KEY,
 username VARCHAR (50) UNIQUE NOT NULL,
 password VARCHAR (50) NOT NULL,
 email VARCHAR (355) UNIQUE NOT NULL,
 phone_number varchar(20),
 state VARCHAR (20),
 avatar_url VARCHAR (355),
 created_on TIMESTAMP NOT NULL,
 updated_on TIMESTAMP,
 user_register_id int,
 last_login TIMESTAMP
);
CREATE TABLE role(
 role_id serial PRIMARY KEY,
 role_name VARCHAR (255) UNIQUE NOT NULL
);
CREATE TABLE account_role
(
  user_id integer NOT NULL,
  role_id integer NOT NULL,
  grant_date timestamp without time zone,
  PRIMARY KEY (user_id, role_id),
  CONSTRAINT account_role_role_id_fkey FOREIGN KEY (role_id)
      REFERENCES role (role_id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION,
  CONSTRAINT account_role_user_id_fkey FOREIGN KEY (user_id)
      REFERENCES account (user_id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION
);
--Insercion de account default
INSERT INTO account(username,password,email,phone_number,state,avatar_url,created_on,updated_on,user_register_id,last_login) 
values('ADMIN','708f0ce9e8d98c9a0722d50287d6397c','josuesf94@gmail.com','962215459','ON',null,now(),null,null,null)
