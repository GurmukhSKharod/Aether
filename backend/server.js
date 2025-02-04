const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { fetchAsteroids, fetchExoplanets, fetchEarthImages } = require("./services/nasaService");

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const supabase = require("./supabaseClient");

// API Routes
app.get("/api/celestial", async (req, res) => {
    const { data, error } = await supabase.from("celestial_bodies").select("*");
    if (error) return res.status(500).json({ error: error.message });
    res.json(data);
});

// Fetch NASA Data
app.get("/api/fetch-nasa", async (req, res) => {
    await fetchAsteroids();
    await fetchExoplanets();
    await fetchEarthImages();
    res.json({ message: "NASA data fetched successfully" });
});

// Start Server
app.listen(5050, () => console.log(`Server running on port 5050`));
