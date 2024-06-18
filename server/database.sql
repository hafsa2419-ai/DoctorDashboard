CREATE DATABASE medecin;



CREATE TABLE patient (
    n_dossier SERIAL PRIMARY KEY,
    nom VARCHAR(255),
    prenom VARCHAR(255),
    date_naissance DATE,
    age INTEGER,
    sexe VARCHAR(10),
    telephone VARCHAR(20)
);

CREATE TABLE consultation (
    consultation_id SERIAL PRIMARY KEY,
    patient_id INT REFERENCES patient(n_dossier),
    date_consultation DATE
);


CREATE TABLE waiting_list (
    id SERIAL PRIMARY KEY,
    n_dossier INTEGER REFERENCES patient(n_dossier),
    added_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE users (
    id SERIAL PRIMARY KEY ,
    username VARCHAR(255) NOT NULL,
    passworduser VARCHAR(255) NOT NULL,
    UNIQUE (username)
  );

CREATE TABLE medicaments (
    id SERIAL PRIMARY KEY,
    designation VARCHAR(255),
    dosage VARCHAR(100),
    forme VARCHAR(100),
    description TEXT
);


CREATE TABLE bilan (
       n_dossir INT,
    id SERIAL PRIMARY KEY,
  
    FOREIGN KEY (n_dossir) REFERENCES Patient(n_dossir),
);



SELECT * FROM bilan;


CREATE TYPE type_antecedent AS ENUM ('Familiaux', 'Chirurgicaux', 'Medicaux');
CREATE TABLE Antecedents (
    antecedent_id SERIAL PRIMARY KEY,
    nom_antecedent VARCHAR(255) NOT NULL,
    type_antecedent type_antecedent NOT NULL
);


CREATE TABLE avoir_antecedents (
    n_dossier INT ,
    antecedent_id INT ,
    FOREIGN KEY (n_dossier) REFERENCES Patient(n_dossier),
    FOREIGN KEY (antecedent_id) REFERENCES Antecedents(antecedent_id)
    );


INSERT INTO Antecedents (nom_antecedent, type_antecedent)
VALUES 
('Cancer', 'Familiaux'),
('Diabète de type 2', 'Familiaux'),
('Hypertension artérielle', 'Familiaux'),
('Maladie cardiaque', 'Familiaux'),
('Maladie Alzheimer', 'Familiaux'),
('Asthme', 'Familiaux'),
('Obésité', 'Familiaux'),
('Maladie de Parkinson', 'Familiaux');

INSERT INTO Antecedents (nom_antecedent, type_antecedent)
VALUES 
('Fracture du col du fémur', 'Chirurgicaux'),
('Fracture de la rotule', 'Chirurgicaux'),
('Fracture de la hanche', 'Chirurgicaux'),
('Fracture de la clavicule', 'Chirurgicaux'),
('Fracture du poignet', 'Chirurgicaux'),
('Fracture du bras', 'Chirurgicaux'),
('Fracture de la cheville', 'Chirurgicaux'),
('Fracture de la jambe', 'Chirurgicaux'),
('Luxation de épaule', 'Chirurgicaux'),
('Luxation du genou', 'Chirurgicaux');




 CREATE TABLE ordonnance_medicaments (
    ordonnance_id INT REFERENCES ordonnance(id_ordonnance) ON DELETE CASCADE,
    medicament_id INT REFERENCES medicaments(id) ON DELETE CASCADE,
    PRIMARY KEY (ordonnance_id, medicament_id)
);
CREATE TABLE ordonnance (
    id_ordonnance SERIAL PRIMARY KEY,
    consultation_id INT REFERENCES consultation(consultation_id) ON DELETE CASCADE
);