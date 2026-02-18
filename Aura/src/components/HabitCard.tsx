import { useState } from "react";
import { Check } from "lucide-react";

interface HabitCardProps {
  icon: string;
  title: string;
  streak: number;
  colorClass: string;
}

const HabitCard = ({ icon, title, streak, colorClass }: HabitCardProps) => {
  const [done, setDone] = useState(false);

  return (
    <button
      onClick={() => setDone(!done)}
      className={`relative rounded-2xl border border-border bg-card p-5 text-left transition-all duration-300 aura-card-glow
        ${done ? `${colorClass} border-primary/20 scale-[1.02]` : "hover:border-primary/20 hover:shadow-lg"}`}
    >
      {done && (
        <div className="absolute top-3 right-3 rounded-full bg-primary p-1 animate-scale-in">
          <Check className="h-3 w-3 text-primary-foreground" />
        </div>
      )}
      <span className="text-2xl">{icon}</span>
      <h4 className="mt-2 font-display text-base">{title}</h4>
      <p className="text-xs text-muted-foreground mt-1">{streak} day streak</p>
    </button>
  );
};

export default HabitCard;
