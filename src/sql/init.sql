DROP DATABASE IF EXISTS wmm;

CREATE DATABASE wmm;
\connect wmm

CREATE TABLE users (
    id serial PRIMARY KEY,
    login varchar(20) UNIQUE NOT NULL,
    password varchar(64) NOT NULL,
    email varchar(254) UNIQUE NOT NULL,
    username varchar(50) NOT NULL,
    is_activated boolean DEFAULT FALSE NOT NULL,
    registration_date date NOT NULL
);

CREATE TABLE currencies (
    id serial PRIMARY KEY,
    fullname varchar(40) UNIQUE NOT NULL,
    code varchar(3) UNIQUE NOT NULL
);

CREATE TABLE subaccounts (
    id serial PRIMARY KEY,
    user_id int NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    name varchar(30) NOT NULL,
    currency_id int NOT NULL REFERENCES currencies(id) ON DELETE CASCADE,
    description varchar(100)
);

CREATE TABLE categories (
    id serial PRIMARY KEY,
    user_id int NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    name varchar(30) NOT NULL
);

CREATE TABLE title_to_category_map (
    id serial PRIMARY KEY,
    user_id int NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    category_id int NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
    pattern varchar(50) NOT NULL
);

CREATE TABLE csv_formats (
    id serial PRIMARY KEY,
    user_id int REFERENCES users(id) ON DELETE CASCADE,
    name varchar(30) NOT NULL,
    title_index int NOT NULL,
    date_index int NOT NULL,
    amount_index int NOT NULL,
    starting_row int NOT NULL,
    separator varchar(2) NOT NULL
);

CREATE TABLE entries (
    id serial PRIMARY KEY,
    user_id int NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    category_id int NOT NULL REFERENCES categories(id) ON DELETE RESTRICT,
    subaccount_id int NOT NULL REFERENCES subaccounts(id) ON DELETE RESTRICT,
    date bigint NOT NULL,
    amount double precision NOT NULL,
    comment varchar(200)
);

CREATE TABLE token_categories (
    id serial PRIMARY KEY,
    name varchar(50) NOT NULL
);

CREATE TABLE tokens (
    user_id int NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    token_category_id int NOT NULL REFERENCES token_categories(id),
    expiration_date date NOT NULL,
    value varchar(30) NOT NULL
);

INSERT INTO token_categories (name) VALUES ('activation'), ('reset_password');
INSERT INTO currencies (fullname, code) VALUES ('Polski Złoty', 'PLN'), ('Dollar', 'USD');
INSERT INTO csv_formats (id, user_id, name, title_index, date_index, amount_index, starting_row, separator) VALUES(1, NULL, 'mbank', 3, 1, 7, 39, ';');



