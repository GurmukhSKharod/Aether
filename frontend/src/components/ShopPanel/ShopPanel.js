// src/components/ShopPanel/ShopPanel.js
import React from "react";
import "./ShopPanel.css";

const shopUpgrades = [
  {
    id: "resource-2x",
    name: "2x Resource Collection",
    description: "Double all resource pickups.",
    requiredLevel: 2,
    type: "resource",
    value: 2,
  },
  {
    id: "speed-2x",
    name: "2x Rocket Speed",
    description: "Move through space faster.",
    requiredLevel: 5,
    type: "speed",
    value: 2,
  },
  {
    id: "resource-3x",
    name: "3x Resource Collection",
    description: "Triple all resource pickups.",
    requiredLevel: 10,
    type: "resource",
    value: 3,
  },
  {
    id: "speed-3x",
    name: "3x Rocket Speed",
    description: "Maximum exploration speed.",
    requiredLevel: 20,
    type: "speed",
    value: 3,
  },
];

export default function ShopPanel({
  open,
  level,
  claimedUpgrades,
  onClaimUpgrade,
  onClose,
}) {
  return (
    <div className={`shop-panel ${open ? "open" : ""}`}>
      <button className="shop-close" onClick={onClose}>×</button>
      <h2 className="shop-title">Shop</h2>

      <div className="shop-grid">
        {shopUpgrades.map((upgrade) => {
          const unlocked = level >= upgrade.requiredLevel;
          const claimed = claimedUpgrades.includes(upgrade.id);

          return (
            <div key={upgrade.id} className="shop-item">
              <div className="shop-icon">
                {upgrade.type === "speed" ? "🚀" : "💎"}
              </div>

              <div className="shop-name">{upgrade.name}</div>
              <div className="shop-description">{upgrade.description}</div>

              {claimed ? (
                <button className="shop-btn claimed" disabled>
                  Claimed
                </button>
              ) : unlocked ? (
                <button
                  className="shop-btn claim"
                  onClick={() => onClaimUpgrade(upgrade)}
                >
                  Claim
                </button>
              ) : (
                <button className="shop-btn locked" disabled>
                  Required Level: {upgrade.requiredLevel}
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}