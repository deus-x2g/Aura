import React, { useEffect, useState } from "react";

const stages = [
  { key: "seed", label: "Seed" },
  { key: "sprout", label: "Sprout" },
  { key: "plant", label: "Young" },
  { key: "sapling", label: "Sapling" },
  { key: "tree", label: "Tree" },
];

const TreeGrowth: React.FC<{ level?: number; animate?: boolean; className?: string }> = ({ level = 3, animate = false, className = "" }) => {
  const active = Math.max(1, Math.min(5, Math.round(level)));
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    if (animate) {
      setPulse(true);
      const t = setTimeout(() => setPulse(false), 1400);
      return () => clearTimeout(t);
    }
  }, [animate]);

  return (
    <div className={`flex flex-col items-center ${className}`} aria-hidden>
      <div className="w-24 h-24 relative">
        {/* seed */}
        <div className={`absolute inset-0 flex items-end justify-center transition-all duration-700 ${active >= 1 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}>
          <div className={`w-3 h-3 rounded-full bg-[hsl(var(--aura-gold))] shadow-sm ${pulse ? "animate-bloom" : ""}`} />
        </div>

        {/* sprout */}
        <div className={`absolute inset-0 flex items-end justify-center transition-all duration-700 ${active >= 2 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}>
          <div className={`w-1.5 h-8 bg-[hsl(var(--aura-sage))] rounded-full origin-bottom animate-grow-delay ${pulse ? "animate-bloom" : ""}`} style={{ borderRadius: 8 }} />
        </div>

        {/* small leaves / plant */}
        <div className={`absolute inset-0 flex items-end justify-center transition-all duration-700 ${active >= 3 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}>
          <svg width="96" height="96" viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg" className={pulse ? "animate-bloom" : ""}>
            <g transform="translate(32,28)">
              <ellipse cx="16" cy="34" rx="6" ry="3.2" fill="hsl(var(--aura-sage) / 0.95)" />
              <path d="M8 34 C 8 18, 24 18, 24 34" stroke="hsl(var(--aura-sage))" strokeWidth="3" strokeLinecap="round" fill="none" />
              <path d="M2 24 C 12 10, 26 10, 34 24" stroke="hsl(var(--aura-sky))" strokeWidth="2.2" strokeLinecap="round" strokeOpacity="0.6" fill="none" />
            </g>
          </svg>
        </div>

        {/* sapling */}
        <div className={`absolute inset-0 flex items-center justify-center transition-all duration-700 ${active >= 4 ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}>
          <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className={`animate-sway ${pulse ? "animate-bloom" : ""}`}>
            <g transform="translate(26,20)">
              <path d="M14 60 C14 40, 44 40, 44 60" stroke="hsl(var(--aura-sage))" strokeWidth="4" strokeLinecap="round" fill="none" />
              <circle cx="8" cy="30" r="8" fill="hsl(var(--aura-sky) / 0.95)" />
              <circle cx="40" cy="22" r="10" fill="hsl(var(--aura-sage) / 0.95)" />
            </g>
          </svg>
        </div>

        {/* full tree */}
        <div className={`absolute inset-0 flex items-center justify-center transition-all duration-1000 ${active >= 5 ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}>
          <svg width="140" height="140" viewBox="0 0 140 140" fill="none" xmlns="http://www.w3.org/2000/svg" className={`animate-sway ${pulse ? "animate-bloom" : ""}`}>
            <g transform="translate(10,8)">
              <rect x="56" y="72" width="12" height="30" rx="3" fill="hsl(var(--aura-gold))" />
              <ellipse cx="62" cy="46" rx="34" ry="30" fill="hsl(var(--aura-sage))" />
              <ellipse cx="36" cy="56" rx="20" ry="14" fill="hsl(var(--aura-sky))" opacity="0.12" />
              <ellipse cx="88" cy="56" rx="20" ry="14" fill="hsl(var(--aura-gold))" opacity="0.08" />
            </g>
          </svg>
        </div>
      </div>

      <div className="text-xs text-muted-foreground mt-2">{stages[active - 1].label}</div>
    </div>
  );
};

export default TreeGrowth;
