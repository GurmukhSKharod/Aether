// src/components/InventoryPanel/InventoryPanel.js
import React from "react";
import { resourceColors } from "../../utils/ResourceGenerator";
import "./InventoryPanel.css";

// map resource‐rarity → label color
const rarityColors = {
  common:   "#fff",
  uncommon: "#0f0", // bright green
  rare:     "#a0f", // purple
  unique:   "#f44", // red
};

export default function InventoryPanel({ open, items = {}, onClose }) {
  const entries = Object.entries(items);

  return (
    <div className={`inventory-panel ${open ? "open" : ""}`}>
      <button className="inventory-close" onClick={onClose}>×</button>
      <h2 className="inventory-title">Inventory</h2>

      <div className="inventory-grid">
        {entries.length === 0
          ? <div className="empty">No items collected yet</div>
          : entries.map(([name, { pickups, totalWeight, rarity }]) => (
              <div key={name} className="inventory-item">
                {/* ITEM ICON */}
                <div
                  className="item-icon"
                  style={{
                    backgroundColor: resourceColors[name] || "#888",
                    boxShadow: `0 0 8px ${resourceColors[name] || "#888"}`
                  }}
                />

                {/* NAME */}
                <div className="item-name">{name}</div>

                {/* RARITY LABEL */}
                <div
                  className="item-rarity"
                  style={{
                    color: rarityColors[rarity],
                    textShadow: `0 0 6px ${rarityColors[rarity]}`
                  }}
                >
                  {rarity}
                </div>

                {/* COUNT + WEIGHT */}
                <div className="item-stats">
                  <span className="label">Count:</span>
                  <span className="value">{pickups}</span>
                </div>
                <div className="item-stats">
                  <span className="label">Weight:</span>
                  <span className="value">{totalWeight}</span>
                </div>
              </div>
        ))}
      </div>
    </div>
  );
}
