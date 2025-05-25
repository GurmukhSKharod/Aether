import React, { useState, useEffect, useCallback } from "react";
import "../styles/IntroMessage.css";

const IntroMessage = ({ onComplete }) => {
    const [countdown, setCountdown] = useState(10);

    //Wrap onComplete in useCallback to prevent unnecessary re-renders
    const handleComplete = useCallback(() => {
        onComplete();
    }, [onComplete]);

    useEffect(() => {
        const interval = setInterval(() => {
            setCountdown((prev) => prev - 1);
        }, 1000);

        // Auto-hide after 10s
        const timeout = setTimeout(() => {
            handleComplete();
        }, 10000);

        return () => {
            clearInterval(interval);
            clearTimeout(timeout);
        };
    }, [handleComplete]);

    return (
        <div className="intro-container">
            <p><strong><div className="title-in-intro">🌌Welcome to Aether!🌌</div></strong></p>
            <p>🚀 <strong>Move</strong> using Arrow Keys or W/A/S/D to reveal the planets!</p>
            <p>🪐 <strong>Click planets</strong> to collect their resources in your inventory!</p>
            <p className="real-nasa-data-text">📡 These planets are <strong>real NASA data!</strong></p>
            <p className="countdown">Message disappears in <strong>{countdown}</strong>...</p>
        </div>
    );
};

export default IntroMessage;
