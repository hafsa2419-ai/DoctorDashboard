const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const bcrypt = require('bcrypt');

app.use(cors());
app.use(express.json());



// Add a patient
app.post("/patient", async (req, res) => {
  try {
      let { nom, prenom, date_naissance, age, sexe, telephone } = req.body;
      
      // Vérifier si la date de naissance est uniquement une année
      if (/^\d{4}$/.test(date_naissance)) {
          date_naissance = `${date_naissance}-01-01`; // Complétez avec le 1er janvier
      }

      const newPatient = await pool.query(
          "INSERT INTO patient (nom, prenom, date_naissance, age, sexe, telephone) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
          [nom, prenom, date_naissance, age, sexe, telephone]
      );

      res.json(newPatient.rows[0]); 
  } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
  }
});


//  search 
app.get("/patient", async (req, res) => {
  try {
      let query = "SELECT * FROM patient";
      const { nom } = req.query;
      if (nom) {
          query += `WHERE nom LIKE '%${nom}%'` ;
      }
      const allPatients = await pool.query(query);  
      res.json(allPatients.rows);
  } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
  }
});

// Get the list of all patients
app.get("/patient", async (req, res) => {
    try {
        const allPatients = await pool.query("SELECT * FROM patient");  
        res.json(allPatients.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

// Get a patient for searching

app.get("/patient/:nom", async (req, res) => {
  try {
      const { nom } =req.params;
      const patient = await pool.query("SELECT * FROM patient WHERE nom = $1" , [nom]);  
      res.json(patient.rows[0]);
  } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
  }
});

// Update a patient by n_dossier
app.put("/patient/:n_dossier", async (req, res) => {
  try {
      const { n_dossier } = req.params;
      let { nom, prenom, date_naissance, age, sexe, telephone } = req.body;

      // Vérifier si la date de naissance est uniquement une année
      if (/^\d{4}$/.test(date_naissance)) {
          date_naissance = `${date_naissance}-01-01`; // Complétez avec le 1er janvier
      }

      const updatedPatient = await pool.query(
          "UPDATE patient SET nom = $1, prenom = $2, date_naissance = $3, age = $4, sexe = $5, telephone = $6 WHERE n_dossier = $7 RETURNING *",
          [nom, prenom, date_naissance, age, sexe, telephone, n_dossier]
      );

      if (updatedPatient.rows.length === 0) {
          return res.status(404).json({ message: "Patient not found" });
      }

      res.json(updatedPatient.rows[0]);
  } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
  }
});


// Delete a patient by name
app.delete("/patient/:n_dossier", async (req, res) => {
    try {
        const { n_dossier } = req.params;
  
        const deletedPatient = await pool.query(
            "DELETE FROM patient WHERE n_dossier = $1 RETURNING *",
            [n_dossier]
        );
  
        if (deletedPatient.rows.length === 0) {
            return res.status(404).json({ message: "pas de résultat" });
        }
  
        res.json(deletedPatient.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});


// Add patient to waiting list
app.post("/waiting-list", async (req, res) => {
  try {
      const { n_dossier } = req.body;
      const newEntry = await pool.query(
          "INSERT INTO waiting_list (n_dossier) VALUES ($1) RETURNING *",
          [n_dossier]
      );
      res.json(newEntry.rows[0]);
  } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
  }
});

// Get waiting list
app.get("/waiting-list", async (req, res) => {
  try {
      const waitingList = await pool.query(
          "SELECT wl.id, p.n_dossier, p.nom, p.prenom, p.date_naissance, p.sexe, p.telephone, wl.added_date " +
          "FROM waiting_list wl " +
          "JOIN patient p ON wl.n_dossier = p.n_dossier " +
          "ORDER BY wl.added_date ASC"
      );
      res.json(waitingList.rows);
  } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
  }
});

// Remove patient from waiting list
app.delete("/waiting-list/:id", async (req, res) => {
  try {
      const { id } = req.params;
      const deletedEntry = await pool.query(
          "DELETE FROM waiting_list WHERE id = $1 RETURNING *",
          [id]
      );
      if (deletedEntry.rows.length === 0) {
          return res.status(404).json({ message: "Entry not found" });
      }
      res.json(deletedEntry.rows[0]);
  } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
  }
});



app.get('/patients/search', async (req, res) => {
  try {
    const { nom } = req.query; 
    const patients = await Patient.find({ nom: { $regex: new RegExp(nom, "i") } });
    res.json(patients);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Add a new medicament
app.post("/medicament", async (req, res) => {
  try {
      const { designation, dosage, forme, description } = req.body;
      const newMedicament = await pool.query(
          "INSERT INTO medicaments (designation, dosage, forme, description) VALUES ($1, $2, $3, $4) RETURNING *",
          [designation, dosage, forme, description]
      );
      res.json(newMedicament.rows[0]);
  } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
  }
});

// Get all medicaments
app.get("/medicament", async (req, res) => {
  try {
      const allMedicaments = await pool.query("SELECT * FROM medicaments");
      res.json(allMedicaments.rows);
  } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
  }
});

// Update a medicament
app.put("/medicament/:id", async (req, res) => {
  try {
      const { id } = req.params;
      const { designation, dosage, forme, description } = req.body;
      const updatedMedicament = await pool.query(
          "UPDATE medicaments SET designation = $1, dosage = $2, forme = $3, description = $4 WHERE id = $5 RETURNING *",
          [designation, dosage, forme, description, id]
      );
      if (updatedMedicament.rows.length === 0) {
          return res.status(404).json({ message: "Medicament not found" });
      }
      res.json(updatedMedicament.rows[0]);
  } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
  }
});

// Delete a medicament
app.delete("/medicament/:id", async (req, res) => {
  try {
      const { id } = req.params;
      const deletedMedicament = await pool.query(
          "DELETE FROM medicaments WHERE id = $1 RETURNING *",
          [id]
      );
      if (deletedMedicament.rows.length === 0) {
          return res.status(404).json({ message: "Medicament not found" });
      }
      res.json(deletedMedicament.rows[0]);
  } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
  }
});

/////////////////////////////////
app.get('/familiaux', async (req, res) => {
  try {
      const result = await pool.query("SELECT antecedent_id, nom_antecedent FROM Antecedents WHERE type_antecedent = 'Familiaux'");
      res.json(result.rows);
  } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
  }
});

app.get('/chirurgicaux', async (req, res) => {
  try {
      const result = await pool.query("SELECT antecedent_id, nom_antecedent FROM Antecedents WHERE type_antecedent = 'Chirurgicaux'");
      res.json(result.rows);
  } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
  }
});

app.get('/medicaux', async (req, res) => {
  try {
      const result = await pool.query("SELECT antecedent_id, nom_antecedent FROM Antecedents WHERE type_antecedent = 'Medicaux'");
      res.json(result.rows);
  } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
  }
});

app.post('/antecedents', async (req, res) => {
  const { n_dossier, antecedent_ids } = req.body; // Change antecedent_id to antecedent_ids

  if (!Array.isArray(antecedent_ids) || !n_dossier) {
      return res.status(400).send('Bad request');
  }

  try {
      const queries = antecedent_ids.map(antecedent_id => {
          return pool.query(
              "INSERT INTO avoir_antecedents (antecedent_id, n_dossier) VALUES ($1, $2)",
              [antecedent_id, n_dossier]
          );
      });

      await Promise.all(queries);
      res.status(201).send('Antecedents added');
  } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
  }
});
////////////////////////////


// Route pour créer une consultation
app.post('/consultation', async (req, res) => {
    const {
        n_dossier,
        motif_consultation,
        etat_general,
        taille,
        poids,
        pression_arterielle,
        abdominal,
        glycemie,
        uree,
        crea,
        fns,
        crp,
        echographie,
        tdm,
        irm,
        autres,
    } = req.body;
  
    try {
        const result = await pool.query(
            `INSERT INTO consultation (patient_id, date_consultation, motif_consultation, etat_general, taille, poids, pression_arterielle, urogenital, abdominal, glycemie, uree, crea, fns, crp, echographie, tdm, irm, autres) 
             VALUES ($1, NOW(), $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17) RETURNING *`,
            [
                n_dossier,
                motif_consultation || null,
                etat_general || null,
                taille || null,
                poids || null,
                pression_arterielle || null,
                abdominal || null,
                glycemie || null,
                uree || null,
                crea || null,
                fns || null,
                crp || null,
                echographie || null,
                tdm || null,
                irm || null,
                autres || null,
            ]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Erreur lors de l\'enregistrement de la consultation:', error.message);
        res.status(500).send('Erreur serveur');
    }
  });
  

////////////////////////////////////


app.post('/bilan', async (req, res) => {
  const {
    n_dossier,
    groupage,
    fns,
    glycemie,
    creatininemie,
    uree,
    serologie,
    tck_tp_inr,
    fibrinogene,
    ionogramme_sanguin,
    bilan_hepatite,
    ldh,
    bilan_lipidique,
    lipasemie,
    calcemie,
    phosphoremie,
    tsh,
    t3_t4,
    thyrocalcitonine,
    ac_anti_thyroglobuline,
    psa,
    marqueur_tumoral,
    crp_vs,
    fer_serique,
    ferritine,
    troponines,
    bilan_protidine,
    fsh_lh,
    taux_de_prolactine,
    progesterone,
    oestrogenes,
    testosterone,
    beta_hcg,
    vitamine_d,
    chimie_des_urines,
    ecbu,
    bilan_inflammatoire,
    hbaic,
    d_dimetres,
    acide_urique,
    autre,
  } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO bilan (n_dossier, groupage, fns, glycemie, creatininemie, uree, serologie, tck_tp_inr, fibrinogene, ionogramme_sanguin, bilan_hepatite, ldh, bilan_lipidique, lipasemie, calcemie, phosphoremie, tsh, t3_t4, thyrocalcitonine, ac_anti_thyroglobuline, psa, marqueur_tumoral, crp_vs, fer_serique, ferritine, troponines, bilan_protidine, fsh_lh, taux_de_prolactine, progesterone, oestrogenes, testosterone, beta_hcg, vitamine_d, chimie_des_urines, ecbu, bilan_inflammatoire, hbaic, d_dimetres, acide_urique, autre)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28, $29, $30, $31, $32, $33, $34, $35, $36, $37, $38, $39, $40, $41)
       RETURNING *`,
      [
        n_dossier,
        groupage || false,
        fns || false,
        glycemie || false,
        creatininemie || false,
        uree || false,
        serologie || false,
        tck_tp_inr || false,
        fibrinogene || false,
        ionogramme_sanguin || false,
        bilan_hepatite || false,
        ldh || false,
        bilan_lipidique || false,
        lipasemie || false,
        calcemie || false,
        phosphoremie || false,
        tsh || false,
        t3_t4 || false,
        thyrocalcitonine || false,
        ac_anti_thyroglobuline || false,
        psa || false,
        marqueur_tumoral || false,
        crp_vs || false,
        fer_serique || false,
        ferritine || false,
        troponines || false,
        bilan_protidine || false,
        fsh_lh || false,
        taux_de_prolactine || false,
        progesterone || false,
        oestrogenes || false,
        testosterone || false,
        beta_hcg || false,
        vitamine_d || false,
        chimie_des_urines || false,
        ecbu || false,
        bilan_inflammatoire || false,
        hbaic || false,
        d_dimetres || false,
        acide_urique || false,
        autre || '',
      ]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Erreur lors de l\'enregistrement du bilan:', error.message);
    res.status(500).send('Erreur serveur');
  }
});


app.listen(5000, () =>{
  console.log("server has started on port 5000");
});