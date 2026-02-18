import { useState } from "react";

const moods = [
  { emoji: "😔", label: "Low", color: "bg-aura-lavender/20 border-aura-lavender/40" },
  { emoji: "😐", label: "Okay", color: "bg-aura-sky/20 border-aura-sky/40" },
  { emoji: "🙂", label: "Good", color: "bg-aura-gold/20 border-aura-gold/40" },
  { emoji: "😊", label: "Great", color: "bg-aura-sage/20 border-aura-sage/40" },
  { emoji: "✨", label: "Amazing", color: "bg-primary/10 border-primary/30" },
];

const MoodTracker = () => {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div className="rounded-2xl bg-card p-6 aura-card-glow border border-border">
      <h3 className="text-lg font-display mb-1">How are you feeling?</h3>
      <p className="text-sm text-muted-foreground mb-5">Track your daily mood</p>
      <div className="flex gap-3 justify-between">
        {moods.map((mood, i) => (
          <button
            key={mood.label}
            onClick={() => setSelected(i)}
            className={`flex flex-col items-center gap-1.5 rounded-xl border-2 px-3 py-3 transition-all duration-300 flex-1
              ${selected === i
                ? `${mood.color} scale-105 shadow-md`
                : "border-transparent hover:border-border hover:bg-muted/50"
              }`}
          >
            <span className="text-2xl">{mood.emoji}</span>
            <span className="text-xs font-medium text-muted-foreground">{mood.label}</span>
          </button>
        ))}
      </div>
      {selected !== null && (
        <p className="mt-4 text-sm text-center text-primary animate-fade-in font-medium">
          Feeling {moods[selected].label.toLowerCase()} — noted! 💚
        </p>
      )}
    </div>
  );
};

export default MoodTracker;
