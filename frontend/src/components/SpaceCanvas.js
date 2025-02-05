import React, { useRef, useEffect, useState, useCallback } from "react";
import useCelestialData from "../hooks/useCelestialData";
import Player from "../components/Player";
import Hud from "../components/Hud";  
import IntroMessage from "../components/IntroMessage";  
import "../styles/SpaceCanvas.css";

const randomColor = () => {
    const colors = [
        "#ff5733", "#33ff57", "#3357ff", "#ff33ff", "#f4a261", "#2a9d8f",
        "#ffcc00", "#800080", "#00ffcc", "#ff99ff", "#ff6600", "#ff0066"
    ];
    return colors[Math.floor(Math.random() * colors.length)];
};

const generatePlanetPositions = (celestialBodies) => {
    const positions = [];
    const minDistance = 2000; // 🚀 Increased from 600 to 2000 for vast space
    const maxAttempts = 200;

    celestialBodies.forEach((body) => {
        let planet = {};
        let attempts = 0;

        do {
            planet.x = Math.random() * (window.innerWidth * 10) - window.innerWidth * 5;
            planet.y = Math.random() * (window.innerHeight * 10) - window.innerHeight * 5;
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
    const [player, setPlayer] = useState({ x: 0, y: 0, size: 16 });
    const [planetColors, setPlanetColors] = useState({});
    const [clickedPlanets, setClickedPlanets] = useState(new Set());
    const [planetPositions, setPlanetPositions] = useState([]);
    const [showIntro, setShowIntro] = useState(true);

    const handleIntroComplete = useCallback(() => {
        setShowIntro(false);
    }, []);

    // Generate planets when data loads
    useEffect(() => {
        setPlanetPositions(generatePlanetPositions(celestialBodies)); 
    }, [celestialBodies]);

    // Set a random spawn for player
    useEffect(() => {
        setPlayer({ 
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            size: 16
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

    // Handle Key Press to Move Player a Fixed Distance
    useEffect(() => {
        const movePlayer = (e) => {
            setPlayer((prev) => {
                let { x, y, size } = prev;
                const moveDistance = size;

                switch (e.key) {
                    case "ArrowUp":
                    case "w":
                        return { ...prev, y: y - moveDistance };
                    case "ArrowDown":
                    case "s":
                        return { ...prev, y: y + moveDistance };
                    case "ArrowLeft":
                    case "a":
                        return { ...prev, x: x - moveDistance };
                    case "ArrowRight":
                    case "d":
                        return { ...prev, x: x + moveDistance };
                    default:
                        return prev;
                }
            });
        };

        window.addEventListener("keydown", movePlayer);
        return () => {
            window.removeEventListener("keydown", movePlayer);
        };
    }, []);

    // Filter planets in the viewport
    useEffect(() => {
        setPlanetPositions((prevPlanets) =>
            prevPlanets.map((planet) => {
                const centerX = window.innerWidth / 2;
                const centerY = window.innerHeight / 2;
                const planetX = centerX + (planet.x - player.x);
                const planetY = centerY + (planet.y - player.y);

                const inView =
                    planetX > -50 &&
                    planetX < window.innerWidth + 50 &&
                    planetY > -50 &&
                    planetY < window.innerHeight + 50;

                if (inView && !planet.visible) {
                    return { ...planet, visible: true, scale: 0 }; // Appear when in view
                } else if (!inView && planet.visible) {
                    return { ...planet, visible: false }; // Remove when out of view
                }

                return planet;
            })
        );
    }, [player]);

    // Animate planets appearing
    useEffect(() => {
        let animationFrame;
        const animatePlanets = () => {
            setPlanetPositions((prevPlanets) =>
                prevPlanets.map((planet) => {
                    if (planet.visible && planet.scale < 1) {
                        return { ...planet, scale: Math.min(planet.scale + 0.05, 1) }; // Grow smoothly
                    }
                    return planet;
                })
            );
            animationFrame = requestAnimationFrame(animatePlanets);
        };

        animatePlanets();
        return () => cancelAnimationFrame(animationFrame);
    }, []);

    // Handle planet click to update score
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
                    return { ...planet, isBouncing: true };
                }
                return planet;
            })
        );

        setTimeout(() => {
            setPlanetPositions((prevPlanets) =>
                prevPlanets.map((planet) => ({ ...planet, isBouncing: false }))
            );
        }, 400);
    };

    // Draw planets dynamically
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            const centerX = canvas.width / 2;
            const centerY = canvas.height / 2;

            planetPositions.forEach((planet) => {
                if (!planet.visible) return;

                const planetX = centerX + (planet.x - player.x);
                const planetY = centerY + (planet.y - player.y);

                ctx.save();
                ctx.translate(planetX, planetY);
                ctx.scale(planet.scale, planet.scale);
                ctx.translate(-planetX, -planetY);

                ctx.beginPath();
                ctx.arc(planetX, planetY, planet.size, 0, 2 * Math.PI);
                ctx.fillStyle = planetColors[planet.name] || "#ffffff";
                ctx.fill();
                ctx.strokeStyle = "#ffffff";
                ctx.stroke();
                
                ctx.restore();

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

    return (
        <>
            {showIntro && <IntroMessage onComplete={handleIntroComplete} />}
            <Hud score={score} />
            <canvas ref={canvasRef} onClick={handleCanvasClick} />
        </>
    );
};

export default SpaceCanvas;
