/*const express = require("express");
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


*/

const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const bcrypt = require('bcrypt');


app.use(cors());
app.use(express.json());

// Add a patientso 

app.post("/patient", async (req, res) => {
  try {
      const { nom, prenom, age, telephone } = req.body; // Include telephone
      const newPatient = await pool.query(
          "INSERT INTO patient (nom, prenom, age, telephone) VALUES ($1, $2, $3, $4) RETURNING *",
          [nom, prenom, age, telephone] // Include telephone
      );
      
      res.json(newPatient.rows[0]); 
  } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
  }
});



app.post('/login', async (req, res) => {
  const { username, passworduser } = req.body;

  // Validate user input
  if (!username || !passworduser) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  try {
    // Query the database to retrieve the hashed password
    const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const user = result.rows[0];

    // Compare passwords
    const passwordMatch = await bcrypt.compare(passworduser, user.passworduser);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    // Passwords match, login successful
    res.status(200).json({ message: 'Login successful', user: { id: user.id, username: user.username } });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});



//Login endpoint
/*app.post('/users/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if the user exists in the database
    const user = await pool.query('SELECT * FROM users WHERE username = $1', [username]);

    if (user.rows.length === 0) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Retrieve the hashed password from the database
    const hashedPassword = user.rows[0].password;

    // Compare the provided password with the hashed password
    const passwordMatch = await bcrypt.compare(password, hashedPassword);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    // If username and password match, login is successful
    res.json({ message: 'Login successful' });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Server error' });
  }
});*/






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
      const { n_dossier } = req.params; // Patient n_dossier
      const { nom, prenom, age } = req.body; // New values

      const updatedPatient = await pool.query(
          "UPDATE patient SET nom = $1, prenom = $2, age = $3 WHERE n_dossier = $4 RETURNING *",
          [nom, prenom, age, n_dossier]
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



// Assuming you have a route like '/patients/search' to handle the search functionality
app.get('/patients/search', async (req, res) => {
  try {
    const { nom } = req.query; // Assuming 'nom' is the parameter for the patient's name
    // Perform a database query to find patients with matching names
    const patients = await Patient.find({ nom: { $regex: new RegExp(nom, "i") } }); // Case-insensitive search
    res.json(patients);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.listen(5000, () =>{
    console.log("server has started on port 5000");
});


