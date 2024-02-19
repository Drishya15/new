const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();

// Serve static files from the 'data' folder
app.use("/api/data", express.static(path.join(__dirname, "data")));

app.get("/api/cities", (req, res) => {
  const citiesPath = path.join(__dirname, "data", "cities.json");
  fs.readFile(citiesPath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading cities file:", err);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }

    try {
      const cities = JSON.parse(data);
      res.json({ cities });
    } catch (parseError) {
      console.error("Error parsing cities JSON:", parseError);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
});

app.get("/api/buses", (req, res) => {
  const busesPath = path.join(__dirname, "data", "buses.json");
  fs.readFile(busesPath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading buses file:", err);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }

    try {
      const buses = JSON.parse(data);
      res.json({ buses });
    } catch (parseError) {
      console.error("Error parsing buses JSON:", parseError);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
