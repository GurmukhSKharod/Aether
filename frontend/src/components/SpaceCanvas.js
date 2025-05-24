import React, { useRef, useEffect, useState, useCallback } from "react";
import useCelestialData from "../hooks/useCelestialData";
import Player from "../components/Player";
import Hud from "../components/Hud";  
import IntroMessage from "../components/IntroMessage";  
import "../styles/SpaceCanvas.css";

const randomColor = () => {
    const colors = ["#ff5733", "#33ff57", "#3357ff", "#ff33ff", "#f4a261", "#2a9d8f",
        "#ffcc00", "#800080", "#00ffcc", "#ff99ff", "#ff6600", "#ff0066"
    ];
    return colors[Math.floor(Math.random() * colors.length)];
};

const generatePlanetPositions = (celestialBodies) => {
    const positions = [];
    const minDistance = 2000;
    const maxAttempts = 200;

    celestialBodies.forEach((body) => {
        let planet = {};
        let attempts = 0;

        do {
            planet.x = Math.random() * (window.innerWidth * 10) - window.innerWidth * 5;
            planet.y = Math.random() * (window.innerHeight * 10) - window.innerHeight * 5;
            planet.size = Math.sqrt(body.radius) * 2 + 30;
            planet.name = body.name;
            planet.mass = body.mass ? (body.mass * 5.972e24).toExponential(2) + " kg" : "Unknown";
            planet.distance = body.distance || "Unknown";
            planet.type = body.type || "Unknown";
            planet.visible = false;
            planet.scale = 0;
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
    const [player, setPlayer] = useState({ x: window.innerWidth / 2, y: window.innerHeight / 2, size: 16 });
    const [planetColors, setPlanetColors] = useState({});
    const [clickedPlanets, setClickedPlanets] = useState(new Set());
    const [planetPositions, setPlanetPositions] = useState([]);
    const [hoveredPlanet, setHoveredPlanet] = useState(null);
    const [hoverPosition, setHoverPosition] = useState(null);
    const [showIntro, setShowIntro] = useState(true);

    // Block browser zoom (Ctrl + +/- and Ctrl + wheel)
    useEffect(() => {
        const onKeyDown = (e) => {
          if (e.ctrlKey && ['=', '+', '-', '0'].includes(e.key)) {
            e.preventDefault();
          }
        };
        const onWheel = (e) => {
          if (e.ctrlKey) e.preventDefault();
        };
        
        window.addEventListener('keydown', onKeyDown, { passive: false });
        window.addEventListener('wheel', onWheel, { passive: false });
        return () => {
          window.removeEventListener('keydown', onKeyDown);
          window.removeEventListener('wheel', onWheel);
        };
    }, []);

    const handleIntroComplete = useCallback(() => {
        setShowIntro(false);
    }, []);

    useEffect(() => {
        setPlanetPositions(generatePlanetPositions(celestialBodies));
    }, [celestialBodies]);

    useEffect(() => {
        const resizeCanvas = () => {
            if (canvasRef.current) {
                canvasRef.current.width = window.innerWidth;
                canvasRef.current.height = window.innerHeight;
            }
            document.body.style.overflow = "hidden";
            document.body.style.backgroundColor = "black";
        };

        resizeCanvas();
        window.addEventListener("resize", resizeCanvas);
        return () => window.removeEventListener("resize", resizeCanvas);
    }, []);

    useEffect(() => {
        const colors = {};
        celestialBodies.forEach((body) => {
            colors[body.name] = randomColor();
        });
        setPlanetColors(colors);
    }, [celestialBodies]);

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

    useEffect(() => {
        setPlanetPositions((prevPlanets) =>
            prevPlanets.map((planet) => {
                const centerX = window.innerWidth / 2;
                const centerY = window.innerHeight / 2;
                const planetX = centerX + (planet.x - player.x);
                const planetY = centerY + (planet.y - player.y);

                const inView =
                    planetX > -100 &&
                    planetX < window.innerWidth + 100 &&
                    planetY > -100 &&
                    planetY < window.innerHeight + 100;

                return {
                    ...planet,
                    visible: inView,
                    scale: inView ? Math.min(planet.scale + 0.05, 1) : 0 // Smoothly grow planets when they appear
                };
            })
        );
    }, [player]);

    const handleCanvasMouseMove = (e) => {
        const rect = canvasRef.current.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const hovered = planetPositions.find((planet) => {
            if (!planet.visible) return false;
            const planetX = window.innerWidth / 2 + (planet.x - player.x);
            const planetY = window.innerHeight / 2 + (planet.y - player.y);
            const distance = Math.sqrt((mouseX - planetX) ** 2 + (mouseY - planetY) ** 2);
            return distance <= planet.size;
        });

        if (hovered) {
            setHoveredPlanet(hovered);
            setHoverPosition({ x: mouseX + 20, y: mouseY - 50 });
        } else {
            setHoveredPlanet(null);
            setHoverPosition(null);
        }
    };

    const handleCanvasClick = () => {
        if (hoveredPlanet && !clickedPlanets.has(hoveredPlanet.name)) {
            setClickedPlanets((prev) => new Set(prev).add(hoveredPlanet.name));
            setScore((prev) => prev + 1);
        }
    };

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

                ctx.fillStyle = "white";
                ctx.font = "14px Arial";
                ctx.textAlign = "center";
                ctx.fillText(planet.name, planetX, planetY + planet.size + 20);

                ctx.restore();
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
            <canvas ref={canvasRef} onClick={handleCanvasClick} onMouseMove={handleCanvasMouseMove} />

            {hoveredPlanet && hoverPosition && (
            <div className="hover-card"
                style={{
                    position: "absolute",
                    left: `${hoverPosition.x}px`,
                    top: `${hoverPosition.y}px`,
                    backgroundColor: "black",
                    color: "white",
                    padding: "10px",
                    borderRadius: "5px",
                    border: "1px solid white",
                    transform: "scale(0.8)", // Start small
                    transition: "transform 0.3s ease-out" // Smooth scaling effect
                }}
                >
                <h3 style={{ color: "purple", marginBottom: "5px" }}>{hoveredPlanet.name}</h3>
                <p><strong>Type:</strong> {hoveredPlanet.type}</p>
                <p><strong>Mass:</strong> {hoveredPlanet.mass}</p>
                <p><strong>Size:</strong> {hoveredPlanet.size.toFixed(2)} km</p>
                <p><strong>Coordinates:</strong> X: {hoveredPlanet.x.toFixed(1)}, Y: {hoveredPlanet.y.toFixed(1)}</p>
            </div>
            )}
        </>
    );
};

export default SpaceCanvas;
