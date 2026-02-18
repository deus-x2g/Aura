import { useAura } from "@/context/AuraContext";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

const WeeklySummary = () => {
  const { getRecentStress } = useAura();
  const recent = getRecentStress();

  if (recent.length === 0) {
    return (
      <div className="rounded-2xl bg-card p-5 aura-card-glow border border-border">
        <h3 className="font-display text-base mb-1">Weekly Trends</h3>
        <p className="text-xs text-muted-foreground">Check in daily to see your stress trends here.</p>
      </div>
    );
  }

  const avg = recent.reduce((a, b) => a + b.level, 0) / recent.length;
  const trend = recent.length >= 2
    ? recent[recent.length - 1].level - recent[0].level
    : 0;

  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return (
    <div className="rounded-2xl bg-card p-5 aura-card-glow border border-border">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-display text-base">Weekly Trends</h3>
        <div className={`flex items-center gap-1 text-xs font-medium rounded-full px-2 py-0.5
          ${trend > 0 ? "bg-destructive/10 text-destructive" : trend < 0 ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"}`}>
          {trend > 0 ? <TrendingUp className="h-3 w-3" /> : trend < 0 ? <TrendingDown className="h-3 w-3" /> : <Minus className="h-3 w-3" />}
          {trend > 0 ? "Rising" : trend < 0 ? "Improving" : "Stable"}
        </div>
      </div>

      {/* Simple bar chart */}
      <div className="flex items-end gap-1.5 h-20 mb-2">
        {days.map((day, i) => {
          const entry = recent.find((_, idx) => idx === i);
          const h = entry ? (entry.level / 5) * 100 : 0;
          const color = !entry ? "bg-muted" :
            entry.level <= 2 ? "bg-primary/60" :
            entry.level === 3 ? "bg-accent/70" : "bg-destructive/50";
          return (
            <div key={day} className="flex-1 flex flex-col items-center gap-1">
              <div
                className={`w-full rounded-t-md transition-all duration-500 ${color}`}
                style={{ height: `${Math.max(h, 8)}%` }}
              />
              <span className="text-[9px] text-muted-foreground">{day}</span>
            </div>
          );
        })}
      </div>

      <p className="text-xs text-muted-foreground">
        Avg stress: <span className="font-medium text-foreground">{avg.toFixed(1)}/5</span>
        {" · "}{recent.length} check-ins this week
      </p>
    </div>
  );
};

export default WeeklySummary;
