import React, { useState, useEffect } from "react";
import "../styles/HUD.css";

const Hud = ({ score }) => {
    const [animate, setAnimate] = useState(false);
    const [floatingText, setFloatingText] = useState(null);

    useEffect(() => {
        if (score > 0) {
            setAnimate(true);
            setFloatingText("+1");

            setTimeout(() => setAnimate(false), 400);
            setTimeout(() => setFloatingText(null), 600);
        }
    }, [score]);

    return (
        <div className="hud-container">
            {/* Player Info - Left Aligned */}
            <div className="hud-item hud-left">
                <span className="player-icon">🚀</span> Player
            </div>

            {/* Game Title - Centered */}
            <div className="hud-item hud-center">Aether</div>

            {/* Score - Right Aligned */}
            <div className="hud-item hud-right">
            🪐 Score: <span className={`score ${animate ? "bounce" : ""}`}>{score}</span>
                {floatingText && <span className="plus-one">+1 🪐</span>}
            </div>
        </div>
    );
};

export default Hud;
