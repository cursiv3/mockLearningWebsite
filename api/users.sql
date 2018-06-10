DROP DATABASE IF EXISTS smockusers;
CREATE DATABASE smockusers;
\c smockusers;
CREATE TABLE users
(
    ID SERIAL PRIMARY KEY,
    username VARCHAR,
    pword VARCHAR,
    email VARCHAR
);

