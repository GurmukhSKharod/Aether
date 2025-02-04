import { useState, useEffect } from "react";

const API_URL = process.env.REACT_APP_BACKEND_URL;

const useCelestialData = () => {
    const [celestialBodies, setCelestialBodies] = useState([]);

    useEffect(() => {
        console.log("Fetching celestial data from:", API_URL);  // Debug log

        const fetchCelestialData = async () => {
            try {
                const response = await fetch(`${API_URL}/api/celestial`);

                // Check if response is valid JSON
                const contentType = response.headers.get("content-type");
                if (!response.ok || !contentType.includes("application/json")) {
                    throw new Error(`Unexpected response (not JSON): ${await response.text()}`);
                }

                const data = await response.json();
                console.log("Fetched celestial bodies:", data);
                setCelestialBodies(data);
            } catch (error) {
                console.error("Error fetching celestial data:", error);
            }
        };

        fetchCelestialData();
    }, []);

    return celestialBodies;
};

export default useCelestialData;
