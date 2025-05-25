// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// A small pool of 25 resources, each with a rarity & base color.
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const resources = [
  { name: "Iron",      rarity: "common",   color: "#b7410e" },
  { name: "Nickel",    rarity: "common",   color: "#c0c0c0" },
  { name: "Silicon",   rarity: "common",   color: "#ecec9e" },
  { name: "Magnesium", rarity: "common",   color: "#aaffaa" },
  { name: "Sulfur",    rarity: "common",   color: "#ffff55" },

  { name: "Copper",    rarity: "uncommon", color: "#b87333" },
  { name: "Cobalt",    rarity: "uncommon", color: "#0047ab" },
  { name: "Zinc",      rarity: "uncommon", color: "#7f7f7f" },
  { name: "Phosphorus",rarity: "uncommon", color: "#ffcc00" },

  { name: "Gold",      rarity: "rare",     color: "#ffd700" },
  { name: "Silver",    rarity: "rare",     color: "#c0c0c0" },
  { name: "Platinum",  rarity: "rare",     color: "#e5e4e2" },
  { name: "Palladium", rarity: "rare",     color: "#cee3f8" },

  { name: "Uranium",   rarity: "unique",   color: "#00ff00" },
  { name: "Plutonium", rarity: "unique",   color: "#ff00ff" },

  { name: "Hydrogen",  rarity: "common",   color: "#ffffff" },
  { name: "Helium",    rarity: "common",   color: "#f0f8ff" },
  { name: "Carbon",    rarity: "uncommon", color: "#333333" },
  { name: "Nitrogen",  rarity: "uncommon", color: "#b0e0e6" },
  { name: "Oxygen",    rarity: "uncommon", color: "#ff3333" },
  { name: "Chlorine",  rarity: "rare",     color: "#00ff00" },
  { name: "Argon",     rarity: "rare",     color: "#66cdaa" },
  { name: "Xenon",     rarity: "unique",   color: "#dda0dd" },
  { name: "Krypton",   rarity: "unique",   color: "#afeeee" },
];

// weights for the rarities
const weights = { common:5, uncommon:10, rare:25, unique:100 };

function weightedRandom(items) {
  const total = items.reduce((sum,i)=>sum+weights[i.rarity],0);
  let r = Math.random()*total;
  for(const i of items){
    r -= weights[i.rarity];
    if(r<=0) return i;
  }
  return items[items.length-1];
}

/** returns a random resource object */
export function getRandomResource(){
  return weightedRandom(resources);
}

/** lookup name→color for inventory rendering */
export const resourceColors = resources.reduce((m,r)=>{
  m[r.name]=r.color; return m;
},{});
