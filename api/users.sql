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
INSERT INTO users
    (username, pword, email)
VALUES
    ('csl503', 'crypto123', 'csl503@email.com');