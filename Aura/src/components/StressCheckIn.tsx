import { useState } from "react";
import { useAura } from "@/context/AuraContext";

const stressLevels = [
  { level: 1, emoji: "😌", label: "Very Calm", color: "bg-aura-sage-light border-primary/30" },
  { level: 2, emoji: "🙂", label: "Good", color: "bg-aura-gold-light border-accent/30" },
  { level: 3, emoji: "😐", label: "Okay", color: "bg-aura-sky/15 border-aura-sky/30" },
  { level: 4, emoji: "😓", label: "Stressed", color: "bg-aura-coral/15 border-aura-coral/30" },
  { level: 5, emoji: "😰", label: "Very Stressed", color: "bg-destructive/10 border-destructive/30" },
];

const StressCheckIn = () => {
  const { addStressEntry, getStressStreak } = useAura();
  const [selected, setSelected] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const streak = getStressStreak();

  const handleSubmit = () => {
    if (selected === null) return;
    addStressEntry(selected);
    setSubmitted(true);
  };

  if (submitted) {
    const isHigh = selected !== null && selected >= 4;
    return (
      <div className="rounded-2xl bg-card p-6 aura-card-glow border border-border animate-fade-in">
        <div className="text-center">
          <span className="text-4xl mb-3 block">{isHigh ? "💚" : "✨"}</span>
          <h3 className="font-display text-lg mb-2">Check-in recorded</h3>
          {isHigh ? (
            <div className="aura-alert-gradient rounded-xl p-4 mt-3">
              <p className="text-sm font-medium">We notice you're feeling stressed.</p>
              <p className="text-xs text-muted-foreground mt-1">
                {streak >= 3
                  ? `You've had ${streak} high-stress days. Consider taking a lighter shift or a rest day. 💛`
                  : "Try the breathing exercise or take a short break. You deserve it."}
              </p>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">Keep going, you're doing great! 🌿</p>
          )}
          <button
            onClick={() => { setSubmitted(false); setSelected(null); }}
            className="mt-4 text-sm text-primary font-medium"
          >
            Check in again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-card p-6 aura-card-glow border border-border">
      <h3 className="text-lg font-display mb-1">How's your shift going?</h3>
      <p className="text-sm text-muted-foreground mb-4">Quick 5-second stress check</p>
      <div className="flex gap-2 justify-between mb-4">
        {stressLevels.map((s) => (
          <button
            key={s.level}
            onClick={() => setSelected(s.level)}
            className={`flex flex-col items-center gap-1 rounded-xl border-2 px-2 py-3 transition-all duration-300 flex-1
              ${selected === s.level
                ? `${s.color} scale-105 shadow-md`
                : "border-transparent hover:border-border hover:bg-muted/50"
              }`}
          >
            <span className="text-xl sm:text-2xl">{s.emoji}</span>
            <span className="text-[10px] sm:text-xs font-medium text-muted-foreground">{s.label}</span>
          </button>
        ))}
      </div>
      {selected !== null && (
        <button
          onClick={handleSubmit}
          className="w-full rounded-xl bg-primary py-2.5 text-sm font-medium text-primary-foreground transition-all hover:opacity-90 animate-fade-in"
        >
          Log Check-in
        </button>
      )}
    </div>
  );
};

export default StressCheckIn;
