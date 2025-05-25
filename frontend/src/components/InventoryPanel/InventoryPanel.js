import React from "react";
import { resourceColors } from "../../utils/ResourceGenerator";
import "./InventoryPanel.css";

export default function InventoryPanel({ open, items = {}, onClose }) {
  // safe: items is always at least {}
  const entries = Object.entries(items);

  return (
    <div className={`inventory-panel ${open ? "open" : ""}`}>
      <button className="inventory-close" onClick={onClose}>
        ×
      </button>
      <h2>Inventory</h2>
      <div className="inventory-grid">
        {entries.length === 0 ? (
          <div className="empty">No items collected yet</div>
        ) : (
          entries.map(([name, count]) => (
            <div key={name} className="inventory-item">
              <div
                className="item-icon"
                style={{
                  backgroundColor: resourceColors[name] || "#888",
                  boxShadow: `0 0 8px ${resourceColors[name] || "#888"}`,
                }}
              />
              <div className="item-name">{name}</div>
              <div className="item-count">×{count}</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
