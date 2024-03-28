const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

app.use(cors());
app.use(express.json());

//ajouter un patient 

app.post("/patient", async (req, res) => {
    try {
        const { nom, prenom, date_naissance } = req.body;
        const newPatient = await pool.query(
          "INSERT INTO patient (Nom, Prenom, Date_naissance) VALUES ($1, $2, $3) RETURNING *", 
        [nom, prenom, date_naissance]);
        
        res.json(newPatient.rows[0]); 
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
  });


  // rechercher un patient par le nom
app.get("/patient/:nom", async (req, res) => {
    try {
      const { nom } = req.params;
      const patient = await pool.query("SELECT * FROM patient WHERE nom = $1", [
        nom,
      ]);
  
      if (patient.rows.length === 0) {
        return res.status(404).json({ message: "Pas de résultat" });
      }
   
      res.json(patient.rows); 
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  });

  
  //donner tout la liste de patient
app.get("/patient", async (req, res) => {
    try {
      const allPatients = await pool.query("SELECT * FROM patient");  
      res.json(allPatients.rows);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  })
  

  //modifier un patient avec le nom

app.put("/patient/:oldNom", async (req, res) => {
    try {
        const { oldNom } = req.params; // Old name
        const { nom, prenom, date_naissance } = req.body; // New values

        // Update patient record in the database
        const updatedPatient = await pool.query(
            "UPDATE patient SET nom = $1, prenom = $2, date_naissance = $3 WHERE nom = $4 RETURNING *",
            [nom, prenom, date_naissance, oldNom]
        );

        if (updatedPatient.rows.length === 0) {
            return res.status(404).json({ message: "Patient not found" });
        }

        res.json(updatedPatient.rows[0]); // Respond with the updated patient record
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

  //suprimer un patient 

app.delete("/patient/:nom", async (req, res) => {
    try {
      const { nom } = req.params;
  
      const deletedPatient = await pool.query(
        "DELETE FROM patient WHERE nom = $1 RETURNING *",
        [nom]
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
  
  

app.listen(5000, () =>{
    console.log("server has started on port 5000");
    });


