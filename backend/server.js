const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { fetchAsteroids, fetchExoplanets, fetchEarthImages } = require("./services/nasaService");

dotenv.config();
const app = express();
const supabase = require("./supabaseClient");

// Properly Configure CORS with Allowed Origins
const allowedOrigins = [
    "http://localhost:3000", // For local testing
    "https://aether-exploration.netlify.app"
];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("CORS policy blocked this request."));
        }
    },
    methods: "GET,POST",
    allowedHeaders: "Content-Type,Authorization"
}));

app.use(express.json());

// CORS Middleware
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});


// Debugging Middleware 
app.use((req, res, next) => {
    console.log(`Received request: ${req.method} ${req.url}`);
    console.log("Origin:", req.headers.origin);
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
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
