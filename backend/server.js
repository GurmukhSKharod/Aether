const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { fetchAsteroids, fetchExoplanets, fetchEarthImages } = require("./services/nasaService");

dotenv.config();
const app = express();
const supabase = require("./supabaseClient");

// Enable CORS with Specific Allowed Origins
app.use(cors({
    origin: ["http://localhost:3000", "https://aether-exploration.netlify.app"], // Replace with frontend URLs
    methods: "GET,POST",
    allowedHeaders: "Content-Type,Authorization"
}));

app.use(express.json());

// Debugging Middleware 
app.use((req, res, next) => {
    console.log(`Received request: ${req.method} ${req.url}`);
    console.log("Headers:", req.headers);
    next();
});

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
const PORT = process.env.PORT || 5050;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
