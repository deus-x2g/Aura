import { useAura } from "@/context/AuraContext";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

const defaultWeek = [
  { day: "Mon", emoji: "😊", label: "Low", level: 1 },
  { day: "Tue", emoji: "😐", label: "Moderate", level: 3 },
  { day: "Wed", emoji: "😣", label: "High", level: 5 },
  { day: "Thu", emoji: "😊", label: "Low", level: 1 },
  { day: "Fri", emoji: "😰", label: "High", level: 5 },
  { day: "Sat", emoji: "🙂", label: "Moderate", level: 3 },
  { day: "Sun", emoji: "😊", label: "Low", level: 1 },
];

const levelToColor = (level: number) => {
  if (level <= 2) return "bg-primary/60";
  if (level === 3) return "bg-accent/70";
  return "bg-destructive/50";
};

const WeeklySummary = () => {
  const { getRecentStress } = useAura();
  const recent = getRecentStress();

  // If we don't have a full week of recent data, show the friendly default week with emojis
  const useDefaults = recent.length < 7;
  const week = useDefaults
    ? defaultWeek
    : // normalize recent entries into { day, emoji, label, level }
      recent.slice(0, 7).map((r, i) => ({
        day: defaultWeek[i].day,
        emoji: (r as any).emoji ?? defaultWeek[i].emoji,
        label: r.level <= 2 ? "Low" : r.level === 3 ? "Moderate" : "High",
        level: r.level,
      }));

  const avg = (week.reduce((a, b) => a + b.level, 0) / week.length) || 0;
  const trend = week.length >= 2 ? week[week.length - 1].level - week[0].level : 0;

  return (
    <div className="rounded-2xl bg-card p-5 aura-card-glow border border-border">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-display text-base">Weekly Trends</h3>
        <div
          className={`flex items-center gap-1 text-xs font-medium rounded-full px-2 py-0.5
          ${trend > 0 ? "bg-destructive/10 text-destructive" : trend < 0 ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"}`}>
          {trend > 0 ? <TrendingUp className="h-3 w-3" /> : trend < 0 ? <TrendingDown className="h-3 w-3" /> : <Minus className="h-3 w-3" />}
          {trend > 0 ? "Rising" : trend < 0 ? "Improving" : "Stable"}
        </div>
      </div>

      {/* Area trend graph (SVG) */}
      <div className="mb-3">
        <TrendArea week={week} />
      </div>

      {/* Emoji + bar chart */}
      <div className="flex items-end gap-1.5 h-20 mb-2">
        {week.map((w) => {
          const h = (w.level / 5) * 100;
          const color = levelToColor(w.level);
          return (
            <div key={w.day} className="flex-1 flex flex-col items-center gap-1">
              <div
                className={`w-full rounded-t-md transition-all duration-500 ${color}`}
                style={{ height: `${Math.max(h, 8)}%` }}
              />
              <div className="flex flex-col items-center">
                <span className="text-sm leading-none">{w.emoji}</span>
                <span className="text-[10px] text-muted-foreground">{w.day} · {w.label}</span>
              </div>
            </div>
          );
        })}
      </div>

      <p className="text-xs text-muted-foreground">
        Avg stress: <span className="font-medium text-foreground">{avg.toFixed(1)}/5</span>
        {" · "}{week.length} days shown — Check in daily to see your stress trends here.
      </p>
    </div>
  );
};

// Small inline trend area component using SVG to mimic the attached red area graph
const TrendArea = ({ week }: { week: Array<{ day: string; emoji: string; label: string; level: number }> }) => {
  const width = 300;
  const height = 100;
  const pad = 8;
  const usableW = width - pad * 2;
  const usableH = height - pad * 2;

  const points = week.map((w, i) => {
    const x = pad + (i / (week.length - 1)) * usableW;
    const y = pad + (1 - w.level / 5) * usableH;
    return [x, y];
  });

  const pathD = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(' ');
  const areaD = `${pathD} L ${pad + usableW} ${pad + usableH} L ${pad} ${pad + usableH} Z`;

  return (
    <div className="w-full overflow-hidden rounded-md" style={{ maxWidth: width }}>
      <svg viewBox={`0 0 ${width} ${height}`} width="100%" height="80" preserveAspectRatio="xMidYMid meet">
        <defs>
          <linearGradient id="g1" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#ff6b6b" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#8b0000" stopOpacity="0.6" />
          </linearGradient>
          <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#000" floodOpacity="0.15" />
          </filter>
        </defs>

        {/* grid */}
        <g stroke="#ffffff22" strokeWidth={0.5}>
          {[0, 0.25, 0.5, 0.75, 1].map((t) => {
            const y = pad + t * usableH;
            return <line key={t} x1={pad} x2={pad + usableW} y1={y} y2={y} />;
          })}
        </g>

        {/* filled area */}
        <path d={areaD} fill="url(#g1)" filter="url(#shadow)" stroke="none" />

        {/* white stroke line */}
        <path d={pathD} fill="none" stroke="#fff" strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" />

        {/* small markers */}
        <g>
          {points.map((p, i) => (
            <circle key={i} cx={p[0]} cy={p[1]} r={3} fill="#fff" stroke="#ff4d4d" strokeWidth={1} />
          ))}
        </g>
      </svg>
    </div>
  );
};

export default WeeklySummary;
