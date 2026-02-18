interface WellnessRingProps {
  label: string;
  value: number;
  max: number;
  unit: string;
  color: string;
  icon: string;
}

const WellnessRing = ({ label, value, max, unit, color, icon }: WellnessRingProps) => {
  const percentage = Math.min((value / max) * 100, 100);
  const circumference = 2 * Math.PI * 40;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-2 rounded-2xl bg-card border border-border p-5 aura-card-glow">
      <div className="relative h-24 w-24">
        <svg className="h-24 w-24 -rotate-90" viewBox="0 0 96 96">
          <circle
            cx="48" cy="48" r="40"
            stroke="hsl(var(--muted))"
            strokeWidth="6"
            fill="none"
          />
          <circle
            cx="48" cy="48" r="40"
            stroke={color}
            strokeWidth="6"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xl">{icon}</span>
        </div>
      </div>
      <div className="text-center">
        <p className="font-display text-lg">
          {value}<span className="text-xs text-muted-foreground ml-0.5">/{max}{unit}</span>
        </p>
        <p className="text-xs text-muted-foreground">{label}</p>
      </div>
    </div>
  );
};

export default WellnessRing;
