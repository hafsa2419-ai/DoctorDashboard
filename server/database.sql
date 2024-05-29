CREATE DATABASE medecin;



CREATE TABLE patient (
    n_dossier SERIAL PRIMARY KEY,
    nom VARCHAR(255),
    prenom VARCHAR(255),
    age INTEGER,
    telephone VARCHAR(20)
);

CREATE TABLE users (
    id SERIAL PRIMARY KEY ,
    username VARCHAR(255) NOT NULL,
    passworduser VARCHAR(255) NOT NULL,
    UNIQUE (username)
  );

  CREATE TABLE type_antecedents (
    id_type_antecedents SERIAL PRIMARY KEY,
    Familiaux TEXT,
    Chirurgicaux TEXT,
    Medicaux TEXT

);

CREATE TABLE medicaments (
    id SERIAL PRIMARY KEY,
    designation VARCHAR(255),
    dosage VARCHAR(100),
    forme VARCHAR(100),
    conditionnement VARCHAR(100),
    laboratoire VARCHAR(100),
    pays_laboratoire VARCHAR(100)
);



CREATE TABLE bilan (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(255) NOT NULL
);



SELECT * FROM bilan;
