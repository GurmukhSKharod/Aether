import React from "react";
import { resourceColors } from "../../utils/ResourceGenerator";
import "./InventoryPanel.css";

export default function InventoryPanel({ open, items = {}, onClose }) {
  // safe: items is always at least {}
  const entries = Object.entries(items);  // [ [name, { pickups, totalWeight }], … ]

  return (
    <div className={`inventory-panel ${open ? "open" : ""}`}>
      <button className="inventory-close" onClick={onClose}>
        ×
      </button>
      <h2 style={{textAlign: "center"}}>Inventory</h2>
      <div className="inventory-grid">
        {entries.length === 0 ? (
          <div className="empty">No items collected yet</div>
        ) : entries.map(([name, { pickups, totalWeight }]) => (
          <div key={name} className="inventory-item">
            <div
              className="item-icon"
              style={{
                backgroundColor: resourceColors[name] || "#888",
                boxShadow: `0 0 8px ${resourceColors[name] || "#888"}`,
              }}
            />
            <div className="item-name">{name}</div>
            <div className="item-count">
                <span className="label">Count:</span>
                <span className="value">{pickups}</span>
            </div>
              <div className="item-weight">
                <span className="label">Weight:</span>
                <span className="value">{totalWeight}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
