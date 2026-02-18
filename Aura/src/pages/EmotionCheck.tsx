import { useState } from "react";
import { useAura } from "@/context/AuraContext";
import { Shield, ShieldCheck, Camera, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

type Phase = "consent" | "scanning" | "result";

const emotionResults = [
  { result: "calm" as const, emoji: "😌", message: "You seem calm and focused. Great state for riding!", color: "aura-safe-gradient" },
  { result: "neutral" as const, emoji: "😐", message: "Looking neutral. Stay hydrated and take breaks.", color: "aura-safe-gradient" },
  { result: "stressed" as const, emoji: "😓", message: "Signs of stress detected. Consider a short break.", color: "aura-alert-gradient" },
  { result: "fatigued" as const, emoji: "😴", message: "You appear fatigued. Rest is important for safety.", color: "aura-alert-gradient" },
];

const EmotionCheck = () => {
  const { addEmotionScan, data } = useAura();
  const [phase, setPhase] = useState<Phase>("consent");
  const [resultIdx, setResultIdx] = useState(0);

  const startScan = () => {
    setPhase("scanning");
    // Simulate on-device scanning (in real app: TensorFlow Lite)
    setTimeout(() => {
      const idx = Math.floor(Math.random() * emotionResults.length);
      setResultIdx(idx);
      addEmotionScan(emotionResults[idx].result);
      setPhase("result");
    }, 3000);
  };

  const recentScans = data.emotionScans.slice(-5).reverse();

  if (phase === "consent") {
    return (
      <div className="min-h-screen bg-background pb-24">
        <div className="mx-auto max-w-lg px-4 pt-6">
          <div className="text-center mb-6">
            <div className="mx-auto h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
              <Camera className="h-8 w-8 text-primary" />
            </div>
            <h1 className="font-display text-2xl mb-2">Emotion Check</h1>
            <p className="text-sm text-muted-foreground">Quick wellbeing check · 10 seconds</p>
          </div>

          <div className="rounded-2xl bg-card border border-border p-5 aura-card-glow mb-4">
            <div className="flex items-start gap-3 mb-4">
              <Shield className="h-5 w-5 text-primary mt-0.5 shrink-0" />
              <div>
                <h3 className="font-semibold text-sm mb-1">Privacy-First Design</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Your camera image is processed <strong>entirely on your device</strong>. 
                  No photo is ever stored, uploaded, or sent anywhere. The image is 
                  immediately deleted after analysis.
                </p>
              </div>
            </div>

            <div className="space-y-2 mb-5">
              {[
                "✅ 100% on-device processing",
                "✅ No image stored or uploaded",
                "✅ Completely optional",
                "✅ Results only visible to you",
              ].map((item) => (
                <p key={item} className="text-xs text-muted-foreground">{item}</p>
              ))}
            </div>

            <Button onClick={startScan} className="w-full rounded-xl" size="lg">
              <Camera className="h-4 w-4 mr-2" />
              Start Wellbeing Check
            </Button>
            <p className="text-[10px] text-center text-muted-foreground mt-2">
              By tapping Start, you consent to a one-time camera scan
            </p>
          </div>

          {/* Recent scans */}
          {recentScans.length > 0 && (
            <div className="rounded-2xl bg-card border border-border p-4 aura-card-glow">
              <h3 className="font-display text-sm mb-3">Recent Scans</h3>
              <div className="space-y-2">
                {recentScans.map((scan, i) => (
                  <div key={i} className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">{new Date(scan.timestamp).toLocaleDateString()}</span>
                    <span className="capitalize font-medium">{scan.result}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (phase === "scanning") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center pb-24">
        <div className="text-center px-4">
          <div className="relative mx-auto h-40 w-40 mb-6">
            <div className="absolute inset-0 rounded-full bg-primary/10 animate-breathe" />
            <div className="absolute inset-4 rounded-full bg-primary/15 animate-breathe [animation-delay:0.5s]" />
            <div className="absolute inset-8 rounded-full bg-primary/20 animate-breathe [animation-delay:1s]" />
            <div className="absolute inset-0 flex items-center justify-center">
              <Camera className="h-10 w-10 text-primary" />
            </div>
          </div>
          <h2 className="font-display text-xl mb-2">Analyzing...</h2>
          <p className="text-sm text-muted-foreground">Processing on your device only</p>
          <div className="flex items-center justify-center gap-2 mt-3">
            <ShieldCheck className="h-4 w-4 text-primary" />
            <span className="text-xs text-primary font-medium">No data leaves your device</span>
          </div>
        </div>
      </div>
    );
  }

  const result = emotionResults[resultIdx];
  const isHighStress = result.result === "stressed" || result.result === "fatigued";

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="mx-auto max-w-lg px-4 pt-10">
        <div className="text-center animate-fade-in">
          <span className="text-6xl mb-4 block">{result.emoji}</span>
          <h2 className="font-display text-2xl mb-2">Result: {result.result}</h2>
          <div className={`rounded-2xl ${result.color} p-5 mt-4 border border-border/50`}>
            <p className="text-sm">{result.message}</p>
          </div>

          {isHighStress && (
            <div className="mt-4 rounded-2xl bg-card border border-border p-4 aura-card-glow animate-fade-in [animation-delay:200ms] opacity-0">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="h-4 w-4 text-accent" />
                <h3 className="font-semibold text-sm">Suggestions for you</h3>
              </div>
              <ul className="text-xs text-muted-foreground space-y-1.5 text-left">
                <li>• Try the breathing exercise on the home page</li>
                <li>• Take a 10-minute break if possible</li>
                <li>• Drink some water and stretch</li>
                <li>• Consider a lighter shift schedule</li>
              </ul>
            </div>
          )}

          <div className="flex items-center justify-center gap-2 mt-5">
            <ShieldCheck className="h-4 w-4 text-primary" />
            <span className="text-xs text-muted-foreground">Image was deleted immediately after scan</span>
          </div>

          <Button
            onClick={() => setPhase("consent")}
            variant="soft"
            className="mt-5 rounded-xl"
          >
            Done
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EmotionCheck;
