import React from "react";
import XpBar from "./XPBar/XpBar";
import "../styles/HUD.css";

const Hud = ({ floatingResource, onInventoryToggle, onShopToggle, xp, level }) => {
//   const [animate, setAnimate] = useState(false);
//   const [floatingText, setFloatingText] = useState(null);

//   useEffect(() => {
//     if (score > 0) {
//       setAnimate(true);
//       setFloatingText(`+${score}`);
//       setTimeout(() => setAnimate(false), 400);
//       setTimeout(() => setFloatingText(null), 600);
//     }
//   }, [score]);

  return (
    <div className="hud-wrapper">
        <div className="hud-container">
        <div className="hud-item hud-left">
            <button className="hud-btn shop-btn" onClick={onShopToggle}>
            Shop
            </button>
        </div>

        <div className="hud-item hud-center">Aether</div>

        <div className="hud-item hud-right">
            {/* FLOATING +X RESOURCE in its rarity color */}
            {floatingResource && (
                <span
                    className="hud-floating"
                    style={{ color: floatingResource.color }}
                >
                    +{floatingResource.amount} {floatingResource.name}
                </span>
            )}
            <button
            className="hud-btn inventory-btn"
            onClick={onInventoryToggle}
            >
            Inventory
            </button>
        </div>
        </div>
        <XpBar xp={xp} level={level} />
    </div>
    
  );
};

export default Hud;
