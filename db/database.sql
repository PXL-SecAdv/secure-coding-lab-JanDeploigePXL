create database pxldb;
\c pxldb

create user secadv with password '${SECADV_PASSWORD}';
grant all privileges on database pxldb to secadv;
BEGIN;

create table users (id serial primary key, user_name text not null unique, password text not null);
grant all privileges on table users to secadv;

insert into users (user_name, password) values ('pxl-admin', crypt('${PXL_ADMIN_PASSWORD}', gen_salt('bf')));
insert into users (user_name, password) values ('george', crypt('${GEORGE_PASSWORD}', gen_salt('bf')));

COMMIT;