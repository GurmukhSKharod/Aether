import { useState, useCallback } from "react";
import { levelThresholds, xpAward } from "../utils/XpTable";

// returns [xp, level, addXp]
export default function useXp() {
  const [xp, setXp] = useState(0);

  // compute level from xp
  const level = levelThresholds
    .map((threshold, i) => ({ threshold, level: i }))
    .filter(({ threshold }) => xp >= threshold)
    .pop().level;

  const addXp = useCallback((rarity) => {
    setXp((current) => current + (xpAward[rarity] || 0));
  }, []);

  return [xp, level, addXp];
}
