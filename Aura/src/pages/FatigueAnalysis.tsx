import { useAura } from "@/context/AuraContext";
import { Brain, AlertTriangle, TrendingDown, Shield, Lightbulb } from "lucide-react";

const FatigueAnalysis = () => {
  const { getRecentStress, getStressStreak, data } = useAura();
  const recent = getRecentStress();
  const streak = getStressStreak();
  const scans = data.emotionScans.filter((s) => s.result === "stressed" || s.result === "fatigued");
  const totalCheckIns = data.stressHistory.length;

  const avgStress = recent.length > 0
    ? recent.reduce((a, b) => a + b.level, 0) / recent.length
    : 0;

  const riskLevel = streak >= 5 ? "high" : streak >= 3 ? "moderate" : avgStress >= 3.5 ? "elevated" : "low";

  const riskConfig = {
    high: { color: "bg-destructive/10 border-destructive/20 text-destructive", label: "High Risk", icon: "🔴" },
    moderate: { color: "bg-accent/15 border-accent/30 text-accent-foreground", label: "Moderate", icon: "🟡" },
    elevated: { color: "bg-aura-sky/15 border-aura-sky/30 text-foreground", label: "Elevated", icon: "🟠" },
    low: { color: "bg-primary/10 border-primary/20 text-primary", label: "Low Risk", icon: "🟢" },
  };

  const risk = riskConfig[riskLevel];

  const recommendations = riskLevel === "high"
    ? [
        "Strongly recommend taking a rest day",
        "Consider speaking with your supervisor about shift adjustment",
        "Use the emergency support helpline if needed",
        "Try the breathing exercise before each shift",
      ]
    : riskLevel === "moderate"
    ? [
        "Take regular 10-minute breaks between deliveries",
        "Stay hydrated — aim for 8 glasses today",
        "Try a breathing exercise before your next shift",
        "Consider a lighter shift tomorrow",
      ]
    : [
        "Keep up the great work! You're managing well",
        "Continue regular check-ins to track patterns",
        "Stay hydrated and stretch between deliveries",
        "Rest well tonight — aim for 7-8 hours",
      ];

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="mx-auto max-w-lg px-4 pt-6">
        <div className="text-center mb-6">
          <div className="mx-auto h-14 w-14 rounded-2xl bg-aura-lavender/20 flex items-center justify-center mb-3">
            <Brain className="h-7 w-7 text-aura-lavender" />
          </div>
          <h1 className="font-display text-2xl mb-1">Fatigue Analysis</h1>
          <p className="text-sm text-muted-foreground">Pattern detection & recommendations</p>
        </div>

        {/* Risk level */}
        <div className={`rounded-2xl border p-5 mb-4 ${risk.color}`}>
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-display text-lg">Fatigue Risk</h3>
            <span className="text-2xl">{risk.icon}</span>
          </div>
          <p className="text-xl font-display">{risk.label}</p>
          <p className="text-xs mt-1 opacity-80">
            Based on {recent.length} check-ins & {scans.length} emotion scans
          </p>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="rounded-xl bg-card border border-border p-3 text-center aura-card-glow">
            <p className="font-display text-lg">{totalCheckIns}</p>
            <p className="text-[10px] text-muted-foreground">Total Check-ins</p>
          </div>
          <div className="rounded-xl bg-card border border-border p-3 text-center aura-card-glow">
            <p className="font-display text-lg">{avgStress > 0 ? avgStress.toFixed(1) : "—"}</p>
            <p className="text-[10px] text-muted-foreground">Avg Stress</p>
          </div>
          <div className="rounded-xl bg-card border border-border p-3 text-center aura-card-glow">
            <p className="font-display text-lg">{streak}</p>
            <p className="text-[10px] text-muted-foreground">High-Stress Days</p>
          </div>
        </div>

        {/* Recommendations */}
        <div className="rounded-2xl bg-card border border-border p-5 aura-card-glow mb-4">
          <div className="flex items-center gap-2 mb-3">
            <Lightbulb className="h-4 w-4 text-accent" />
            <h3 className="font-display text-base">Recommendations</h3>
          </div>
          <ul className="space-y-2.5">
            {recommendations.map((rec, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className="text-xs mt-0.5">•</span>
                <span>{rec}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* High stress warning */}
        {streak >= 3 && (
          <div className="rounded-2xl aura-alert-gradient border border-destructive/10 p-5 animate-fade-in">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-sm mb-1">Pattern Detected</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  You've had {streak} consecutive high-stress days. This pattern increases accident risk. 
                  <strong> We strongly suggest a voluntary rest day or lighter shift. </strong>
                  Remember: we never force — this is your choice. 💛
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Privacy note */}
        <div className="flex items-center justify-center gap-2 mt-5">
          <Shield className="h-4 w-4 text-primary" />
          <span className="text-xs text-muted-foreground">All analysis runs locally on your device</span>
        </div>
      </div>
    </div>
  );
};

export default FatigueAnalysis;
