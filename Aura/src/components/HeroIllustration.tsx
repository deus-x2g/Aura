import React from "react";

const HeroIllustration: React.FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <svg
      viewBox="0 0 800 300"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <defs>
        <linearGradient id="g1" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="hsl(var(--aura-sage-light))" stopOpacity="0.95" />
          <stop offset="60%" stopColor="hsl(var(--aura-gold-light))" stopOpacity="0.95" />
          <stop offset="100%" stopColor="hsl(var(--aura-warm))" stopOpacity="0.95" />
        </linearGradient>
        <filter id="f1" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="18" result="b" />
          <feBlend in="SourceGraphic" in2="b" mode="normal" />
        </filter>
      </defs>

      <rect width="100%" height="100%" fill="url(#g1)" rx="18" />

      <g transform="translate(40,30)">
        <circle cx="120" cy="130" r="72" fill="hsl(var(--aura-sage) / 0.12)" />
        <circle cx="240" cy="90" r="46" fill="hsl(var(--aura-gold) / 0.14)" />
        <path d="M360 200 C 420 140, 520 160, 620 120 L 620 240 L 360 240 Z" fill="hsl(var(--aura-lavender) / 0.08)" />

        <g transform="translate(60,40)">
          <ellipse cx="320" cy="90" rx="80" ry="32" fill="hsl(var(--aura-sky) / 0.12)" />
          <rect x="40" y="30" width="160" height="110" rx="18" fill="white" opacity="0.06" />
        </g>
      </g>

      <g transform="translate(36,18)" filter="url(#f1)">
        <path d="M140 220 C 220 180, 320 200, 420 160" stroke="hsl(var(--aura-sage))" strokeWidth="6" fill="none" strokeLinecap="round" strokeOpacity="0.12" />
      </g>
    </svg>
  );
};

export default HeroIllustration;
