import React, { useRef, useEffect, useState, useCallback } from "react";
import useCelestialData from "../hooks/useCelestialData";
import Player from "../components/Player";
import Hud from "../components/Hud";  
import IntroMessage from "../components/IntroMessage";  
import "../styles/SpaceCanvas.css";

const randomColor = () => {
    const colors = [
        "#ff5733", "#33ff57", "#3357ff", "#ff33ff", "#f4a261", "#2a9d8f",
        "#ffcc00", "#800080", "#00ffcc", "#ff99ff", "#ff6600", "#ff0066",
        "#ff0000", "#ff4500", "#ff6347", "#ff7f50", "#ffa07a", "#ff8c00",
        "#ffb6c1", "#ff69b4", "#ff1493", "#db7093", "#ff00ff", "#ba55d3",
        "#8a2be2", "#9370db", "#7b68ee", "#6a5acd", "#483d8b", "#4b0082",
        "#9400d3", "#8b0000", "#b22222", "#cd5c5c", "#dc143c", "#e9967a",
        "#f08080", "#fa8072", "#ff4500", "#ff6347", "#ff7f50", "#ff8c00",
        "#ffb6c1", "#ff69b4", "#ff1493", "#db7093", "#ff00ff", "#ba55d3",
        "#8a2be2", "#9370db", "#7b68ee", "#6a5acd", "#483d8b", "#4b0082",
        "#9400d3", "#8b0000", "#b22222", "#cd5c5c", "#dc143c", "#e9967a",
        "#f08080", "#fa8072", "#ff6347", "#ff7f50", "#ffa500", "#ffd700",
        "#ffff00", "#9acd32", "#32cd32", "#00ff00", "#00fa9a", "#20b2aa",
        "#5f9ea0", "#4682b4", "#1e90ff", "#0000ff", "#0000cd", "#00008b",
        "#000080", "#191970", "#708090", "#778899", "#2f4f4f", "#696969",
        "#808080", "#a9a9a9", "#c0c0c0", "#d3d3d3", "#dcdcdc", "#f5f5f5",
        "#ffffff", "#ffdead", "#f0e68c", "#bdb76b", "#e6e6fa", "#d8bfd8",
        "#dda0dd", "#ffebcd", "#f5deb3", "#ffe4b5", "#ffdab9", "#ffa07a"
    ];
    return colors[Math.floor(Math.random() * colors.length)];
};


const generatePlanetPositions = (celestialBodies) => {
    const positions = [];
    const minDistance = 600;
    const maxAttempts = 100;

    celestialBodies.forEach((body) => {
        let planet = {};
        let attempts = 0;

        do {
            planet.x = Math.random() * (window.innerWidth * 6) - window.innerWidth * 3;
            planet.y = Math.random() * (window.innerHeight * 6) - window.innerHeight * 3;
            planet.size = Math.sqrt(body.radius) * 2 + 30;
            planet.name = body.name;
            attempts++;
        } while (positions.some(p => Math.hypot(planet.x - p.x, planet.y - p.y) < minDistance) && attempts < maxAttempts);

        positions.push(planet);
    });

    return positions;
};

const SpaceCanvas = () => {
    const canvasRef = useRef(null);
    const celestialBodies = useCelestialData();
    const [score, setScore] = useState(0);
    const [player, setPlayer] = useState({ x: 0, y: 0, size: 16, speed: 4 });
    const [keys, setKeys] = useState({});
    const [planetColors, setPlanetColors] = useState({});
    const [clickedPlanets, setClickedPlanets] = useState(new Set());
    const [planetPositions, setPlanetPositions] = useState([]);
    const [showIntro, setShowIntro] = useState(true);

    // Wrap onComplete in useCallback to avoid re-renders
    const handleIntroComplete = useCallback(() => {
        setShowIntro(false);
    }, []);

    const moveRef = useRef(null);

    // Generate planets when data loads
    useEffect(() => {
        setPlanetPositions(generatePlanetPositions(celestialBodies)); 
    }, [celestialBodies]);

    // Set a random spawn for player
    useEffect(() => {
        setPlayer({ 
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            size: 16,
            speed: 4
        });
    }, []);

    // Resize Canvas
    useEffect(() => {
        const resizeCanvas = () => {
            canvasRef.current.width = window.innerWidth;
            canvasRef.current.height = window.innerHeight;
            document.body.style.overflow = "hidden";
            document.body.style.backgroundColor = "black";
        };

        resizeCanvas();
        window.addEventListener("resize", resizeCanvas);
        return () => window.removeEventListener("resize", resizeCanvas);
    }, []);

    // Assign planet colors once
    useEffect(() => {
        const colors = {};
        celestialBodies.forEach((body) => {
            colors[body.name] = randomColor();
        });
        setPlanetColors(colors);
    }, [celestialBodies]);

    // Handle Key Press & Release
    useEffect(() => {
        const handleKeyDown = (e) => {
            setKeys((prev) => ({ ...prev, [e.key]: true }));
        };

        const handleKeyUp = (e) => {
            setKeys((prev) => ({ ...prev, [e.key]: false }));
        };

        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("keyup", handleKeyUp);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("keyup", handleKeyUp);
        };
    }, []);

    // Move Player only while holding a key
    useEffect(() => {
        const movePlayer = () => {
            setPlayer((prev) => {
                let { x, y, speed } = prev;
                let moved = false;

                if (keys["ArrowUp"] || keys["w"]) { y -= speed; moved = true; }
                if (keys["ArrowDown"] || keys["s"]) { y += speed; moved = true; }
                if (keys["ArrowLeft"] || keys["a"]) { x -= speed; moved = true; }
                if (keys["ArrowRight"] || keys["d"]) { x += speed; moved = true; }

                return moved ? { ...prev, x, y } : prev;
            });

            if (Object.values(keys).some(Boolean)) {
                moveRef.current = requestAnimationFrame(movePlayer);
            } else {
                cancelAnimationFrame(moveRef.current);
                moveRef.current = null;
            }
        };

        if (Object.values(keys).some(Boolean)) {
            movePlayer();
        } else {
            cancelAnimationFrame(moveRef.current);
            moveRef.current = null;
        }
    }, [keys]);

    // Draw everything
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            const centerX = canvas.width / 2;
            const centerY = canvas.height / 2;

            planetPositions.forEach((planet) => {
                const planetX = centerX + (planet.x - player.x);
                const planetY = centerY + (planet.y - player.y);
                
                ctx.save();
                
                // Apply scale effect if bouncing
                if (planet.isBouncing) {
                    ctx.translate(planetX, planetY);
                    ctx.scale(1.3, 1.3);
                    ctx.translate(-planetX, -planetY);
                }
            
                ctx.beginPath();
                ctx.arc(planetX, planetY, planet.size, 0, 2 * Math.PI);
                ctx.fillStyle = planetColors[planet.name] || "#ffffff";
                ctx.fill();
                ctx.strokeStyle = "#ffffff";
                ctx.stroke();
                
                ctx.restore(); // Restore context after transformations

                ctx.fillStyle = "black";
                ctx.fillRect(planetX - 40, planetY + planet.size + 10, 80, 20); // Black box behind text

                // Draw text below the planet
                ctx.fillStyle = "white";
                ctx.font = "14px Arial";
                ctx.textAlign = "center";
                ctx.fillText(planet.name, planetX, planetY + planet.size + 20);
            });
            

            Player(ctx, centerX, centerY, player.size);
            requestAnimationFrame(draw);
        };

        draw();
    }, [planetPositions, player, planetColors]);

    // Fix Score Not Updating on Click
    const handleCanvasClick = (e) => {
        const rect = canvasRef.current.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const clickY = e.clientY - rect.top;
    
        setPlanetPositions((prevPlanets) =>
            prevPlanets.map((planet) => {
                const planetX = window.innerWidth / 2 + (planet.x - player.x);
                const planetY = window.innerHeight / 2 + (planet.y - player.y);
                const distance = Math.sqrt((clickX - planetX) ** 2 + (clickY - planetY) ** 2);
    
                if (distance <= planet.size && !clickedPlanets.has(planet.name)) {
                    setClickedPlanets((prev) => new Set(prev).add(planet.name));
                    setScore((prev) => prev + 1);
    
                    // Apply bounce animation when clicked
                    return { ...planet, isBouncing: true };
                }
                return planet;
            })
        );
    
        // Remove bounce effect after animation duration
        setTimeout(() => {
            setPlanetPositions((prevPlanets) =>
                prevPlanets.map((planet) => ({ ...planet, isBouncing: false }))
            );
        }, 400); // Matches bounce duration
    };
    

    return (
        <>
             {showIntro && <IntroMessage onComplete={handleIntroComplete} />}
            <Hud score={score} />
            <canvas ref={canvasRef} onClick={handleCanvasClick} />
        </>
    );
};

export default SpaceCanvas;
