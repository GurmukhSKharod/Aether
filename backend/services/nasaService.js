const axios = require("axios");
const supabase = require("../supabaseClient");

const NASA_API_KEY = process.env.NASA_API_KEY;

// Fetch Near-Earth Objects (Asteroids)
const fetchAsteroids = async () => {
    try {
        const res = await axios.get(`https://api.nasa.gov/neo/rest/v1/feed?api_key=${NASA_API_KEY}`);
        const asteroids = res.data.near_earth_objects;

        for (const date in asteroids) {
            for (const asteroid of asteroids[date]) {
                await supabase.from("celestial_bodies").upsert({
                    name: asteroid.name,
                    type: "Asteroid",
                    mass: asteroid.estimated_diameter.kilometers.estimated_diameter_max,
                    radius: asteroid.estimated_diameter.kilometers.estimated_diameter_max / 2,
                    distance: asteroid.close_approach_data[0]?.miss_distance.kilometers,
                    position_x: Math.random() * 1000,
                    position_y: Math.random() * 1000,
                });
            }
        }

        console.log("Asteroids Data Synced!");
    } catch (error) {
        console.error("Asteroid Fetch Error:", error);
    }
};

// Fetch Exoplanets
const fetchExoplanets = async () => {
    try {
        const res = await axios.get("https://exoplanetarchive.ipac.caltech.edu/TAP/sync?query=SELECT+*+FROM+pscomppars&format=json");
        const planets = res.data;

        for (const planet of planets) {
            await supabase.from("celestial_bodies").upsert({
                name: planet.pl_name,
                type: "Exoplanet",
                mass: planet.pl_bmassj,
                radius: planet.pl_radj,
                distance: planet.st_dist,
                position_x: Math.random() * 1000,
                position_y: Math.random() * 1000,
            });
        }

        console.log("Exoplanets Data Synced!");
    } catch (error) {
        console.error("Exoplanet Fetch Error:", error);
    }
};

// Fetch EPIC Earth Images
const fetchEarthImages = async () => {
    try {
        const res = await axios.get(`https://api.nasa.gov/EPIC/api/natural/images?api_key=${NASA_API_KEY}`);
        const images = res.data;

        for (const image of images) {
            console.log(`Earth Image Available: https://epic.gsfc.nasa.gov/archive/natural/${image.date.replaceAll("-", "/")}/png/${image.image}.png`);
        }
    } catch (error) {
        console.error("EPIC Fetch Error:", error);
    }
};

module.exports = { fetchAsteroids, fetchExoplanets, fetchEarthImages };
