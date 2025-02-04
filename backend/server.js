const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { fetchAsteroids, fetchExoplanets, fetchEarthImages } = require("./services/nasaService");

dotenv.config();
const app = express();
const supabase = require("./supabaseClient");

// Fix: Use Proper CORS Configuration
const allowedOrigins = [
    "http://localhost:3000",  // Development Frontend
    "https://aether-exploration.netlify.app"  // Your Deployed Frontend
];

app.use(cors({
    origin: allowedOrigins,  // Allows frontend to access backend
    methods: "GET,POST",
    allowedHeaders: "Content-Type,Authorization"
}));

// Ensure all routes get CORS Headers
app.use((req, res, next) => {
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.header("Access-Control-Allow-Origin", origin);
    }
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});

// Debugging: Log Incoming Requests
app.use((req, res, next) => {
    console.log(`Received request: ${req.method} ${req.url}`);
    console.log("Origin:", req.headers.origin);
    next();
});

app.use(express.json());

// API Routes
app.get("/api/celestial", async (req, res) => {
    try {
        const { data, error } = await supabase.from("celestial_bodies").select("*");
        if (error) throw new Error(error.message);
        res.json(data);
    } catch (err) {
        console.error("Error fetching celestial data:", err);
        res.status(500).json({ error: err.message });
    }
});

// Fetch NASA Data
app.get("/api/fetch-nasa", async (req, res) => {
    try {
        await fetchAsteroids();
        await fetchExoplanets();
        await fetchEarthImages();
        res.json({ message: "NASA data fetched successfully!" });
    } catch (err) {
        console.error("Error fetching NASA data:", err);
        res.status(500).json({ error: err.message });
    }
});

// Start Server
const PORT = process.env.PORT || 5050;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
