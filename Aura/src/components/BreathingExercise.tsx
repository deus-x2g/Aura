import { useState, useEffect, useRef } from "react";

const BreathingExercise = () => {
  const [active, setActive] = useState(false);
  const [phase, setPhase] = useState<"inhale" | "hold" | "exhale">("inhale");
  const [seconds, setSeconds] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval>>();

  useEffect(() => {
    if (!active) return;

    intervalRef.current = setInterval(() => {
      setSeconds((s) => {
        const next = s + 1;
        if (phase === "inhale" && next >= 4) {
          setPhase("hold");
          return 0;
        }
        if (phase === "hold" && next >= 4) {
          setPhase("exhale");
          return 0;
        }
        if (phase === "exhale" && next >= 6) {
          setPhase("inhale");
          return 0;
        }
        return next;
      });
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, [active, phase]);

  const handleToggle = () => {
    if (active) {
      clearInterval(intervalRef.current);
      setPhase("inhale");
      setSeconds(0);
    }
    setActive(!active);
  };

  return (
    <div className="rounded-2xl bg-card border border-border p-6 aura-card-glow text-center">
      <h3 className="font-display text-lg mb-1">Breathe</h3>
      <p className="text-sm text-muted-foreground mb-5">4-4-6 breathing exercise</p>

      <div className="relative mx-auto mb-5 flex h-32 w-32 items-center justify-center">
        <div
          className={`absolute inset-0 rounded-full bg-primary/10 transition-all duration-1000 ease-in-out
            ${active ? "animate-breathe" : ""}`}
        />
        <div
          className={`absolute inset-3 rounded-full bg-primary/15 transition-all duration-1000 ease-in-out
            ${active ? "animate-breathe [animation-delay:0.5s]" : ""}`}
        />
        <span className="relative z-10 font-display text-lg text-primary">
          {active ? phase : "Ready"}
        </span>
      </div>

      {active && (
        <p className="text-sm text-muted-foreground mb-4 animate-fade-in">
          {phase === "inhale" && `Breathe in... ${4 - seconds}`}
          {phase === "hold" && `Hold... ${4 - seconds}`}
          {phase === "exhale" && `Breathe out... ${6 - seconds}`}
        </p>
      )}

      <button
        onClick={handleToggle}
        className="rounded-full bg-primary px-6 py-2 text-sm font-medium text-primary-foreground transition-all hover:opacity-90"
      >
        {active ? "Stop" : "Start"}
      </button>
    </div>
  );
};

export default BreathingExercise;
