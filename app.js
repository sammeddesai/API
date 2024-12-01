const express = require("express");
// const db = require("./db.js");
const haversine = require("haversine");

const app = express();
app.use(express.json()); // TO HANDLE JSON

// Automatically create table if it does not exist
const createTable = () => {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS schools (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        address VARCHAR(255) NOT NULL,
        latitude DECIMAL(9, 6) NOT NULL,
        longitude DECIMAL(9, 6) NOT NULL
    );
    `;

  db.query(createTableQuery, (err, result) => {
    if (err) {
      console.error("Error creating table:", err);
    } else {
      console.log("Schools table created or already exists");
    }
  });
};
// Call the function to create table when starting the app
createTable();

// Add School
app.post("/addSchool", (req, res) => {
  const { name, address, latitude, longitude } = req.body;

  // Validate input data
  if (
    !name ||
    !address ||
    typeof latitude !== "number" ||
    typeof longitude !== "number"
  ) {
    return res
      .status(400)
      .send(
        "Invalid input data. Please provide valid name, address, latitude, and longitude."
      );
  }
  res.status(200).send("School added successfully");

  // Insert into the database
  const sql =
    "INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)";
  db.query(sql, [name, address, latitude, longitude], (err, result) => {
    if (err) {
      return res
        .status(500)
        .send("Database error occurred.Cannot insert School");
    }
    res.status(200).send("School added successfully");
  });
});

// List Schools
app.get("/listSchools", (req, res) => {
  const userLat = parseFloat(req.query.latitude);
  const userLon = parseFloat(req.query.longitude);
  const schools = req.body;

  // Validate query parameters
  if (isNaN(userLat) || isNaN(userLon)) {
    return res.status(400).send("Invalid latitude or longitude");
  }

  // Fetch all schools from the database
  const sql = "SELECT * FROM schools";
  db.query(sql, (err, schools) => {
    if (err) {
      return res
        .status(500)
        .send("Database error occurred.Cannot retrieve school");
    }
    // Calculate distances and sort schools by proximity
    // Proximity means nearness in space, time, or relationship.
    const userLocation = { latitude: userLat, longitude: userLon };
    schools.forEach((school) => {
      // The distance calculated using the Haversine formula is typically in kilometers
      school.distance = haversine(userLocation, {
        latitude: school.latitude,
        longitude: school.longitude,
      });
    });
    schools.sort((a, b) => a.distance - b.distance);

    res.send(schools);
  });
});

// Start the server
const PORT = 3000;
app.listen(PORT);
