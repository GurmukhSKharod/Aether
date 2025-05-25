// XpBar.js
import React, { useEffect, useState } from "react";
import "./XpBar.css";
import { levelThresholds } from "../../utils/XpTable";

export default function XpBar({ xp, level }) {
  const [gain, setGain] = useState(false);

  // compute progress as before…
  const currentThreshold = levelThresholds[level];
  const nextThreshold    = levelThresholds[level+1] ?? currentThreshold;
  const progress = nextThreshold > currentThreshold
    ? ((xp - currentThreshold)/(nextThreshold-currentThreshold))*100
    : 100;

  // whenever xp changes, flash the glow
  useEffect(() => {
    if (xp > 0) {
      setGain(true);
      const id = setTimeout(()=> setGain(false), 600);
      return ()=> clearTimeout(id);
    }
  }, [xp]);

  return (
    <div className="xpbar-wrapper">
      <div className={`xpbar-info ${gain ? "gain" : ""}`}>
        <span>Level {level}</span>
        <span>{xp} XP</span>
      </div>
      <div className="xpbar-container">
        <div
          className="xpbar-track"
        >
          <div
            className="xpbar-fill"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
