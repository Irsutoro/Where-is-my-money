DROP DATABASE IF EXISTS wmm;

CREATE DATABASE wmm;
\connect wmm

CREATE TABLE users (
    id serial PRIMARY KEY,
    login varchar(20) UNIQUE NOT NULL,
    password varchar(64) NOT NULL,
    email varchar(254) UNIQUE NOT NULL,
    username varchar(40) NOT NULL
);

CREATE TABLE subaccounts (
    id serial PRIMARY KEY,
    user_id int NOT NULL REFERENCES users(id),
    name varchar(30) NOT NULL
);

CREATE TABLE categories (
    id serial PRIMARY KEY,
    user_id int NOT NULL REFERENCES users(id),
    name varchar(30) NOT NULL
);

CREATE TABLE currencies (
    id serial PRIMARY KEY,
    fullname varchar(40) UNIQUE NOT NULL,
    code varchar(3) UNIQUE NOT NULL
);

CREATE TABLE title_to_category_map (
    id serial PRIMARY KEY,
    user_id int NOT NULL REFERENCES users(id),
    category_id int NOT NULL REFERENCES categories(id),
    pattern varchar(50) NOT NULL
);

CREATE TABLE csv_formats (
    id serial PRIMARY KEY,
    user_id int REFERENCES users(id),
    name varchar(30) NOT NULL,
    title_index int NOT NULL,
    date_index int NOT NULL,
    amount_index int NOT NULL,
    starting_row int NOT NULL,
    separator varchar(2) NOT NULL
);

CREATE TABLE entries (
    id serial PRIMARY KEY,
    user_id int NOT NULL REFERENCES users(id),
    category_id int NOT NULL REFERENCES categories(id),
    subaccount_id int NOT NULL REFERENCES subaccounts(id),
    currency_id int NOT NULL REFERENCES currencies(id),
    date bigint NOT NULL,
    amount int NOT NULL,
    comment varchar(200)
);