CREATE DATABASE medecin;



CREATE TABLE patient (
    n_dossier SERIAL PRIMARY KEY,
    nom VARCHAR(255),
    prenom VARCHAR(255),
    date_naissance DATE
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
