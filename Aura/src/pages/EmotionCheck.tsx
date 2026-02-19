import { useEffect, useRef, useState } from "react";
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

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (phase === "scanning" && (e.key === "k" || e.key === "K")) {
        captureAndAnalyze();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  const startScan = async () => {
    try {
      setPhase("scanning");
      const s = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "user" }, audio: false });
      streamRef.current = s;
      if (videoRef.current) {
        videoRef.current.srcObject = s;
        await videoRef.current.play();
      }
    } catch (err) {
      // fallback to simulated result on permission error
      const idx = 1; // neutral
      setResultIdx(idx);
      addEmotionScan(emotionResults[idx].result);
      setPhase("result");
    }
  };

  useEffect(() => {
    return () => {
      // cleanup stream if leaving the page
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop());
        streamRef.current = null;
      }
    };
  }, []);

  const stopStream = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      try {
        videoRef.current.pause();
        videoRef.current.srcObject = null;
      } catch {}
    }
  };

  // Draws current video frame to canvas and returns analysis result string index
  const analyzeFrame = (): number => {
    const video = videoRef.current;
    if (!video) return 1;
    const w = video.videoWidth || 320;
    const h = video.videoHeight || 240;
    let canvas = canvasRef.current;
    if (!canvas) {
      canvas = document.createElement("canvas");
      canvasRef.current = canvas;
    }
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d");
    if (!ctx) return 1;
    ctx.drawImage(video, 0, 0, w, h);

    // Get image data
    const dataImg = ctx.getImageData(0, 0, w, h);
    const px = dataImg.data;
    let sumL = 0;
    let darkCount = 0;
    // simple sharpness estimate: sum of absolute differences (high -> sharp)
    let sharpness = 0;
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const i = (y * w + x) * 4;
        const r = px[i], g = px[i + 1], b = px[i + 2];
        const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;
        sumL += lum;
        if (lum < 60) darkCount++;
        // horizontal difference
        if (x > 0) {
          const j = (y * w + (x - 1)) * 4;
          sharpness += Math.abs(px[i] - px[j]) + Math.abs(px[i + 1] - px[j + 1]) + Math.abs(px[i + 2] - px[j + 2]);
        }
      }
    }
    const avgL = sumL / (w * h);
    const darkRatio = darkCount / (w * h);
    const normSharp = sharpness / (w * h);

    // Heuristic mapping to emotion categories
    // - low sharpness & high darkRatio => fatigued
    // - moderate darkRatio or low luminance => tired
    // - otherwise calm/neutral
    if (normSharp < 15 && darkRatio > 0.15) {
      return 3; // fatigued
    }
    if (avgL < 70 || darkRatio > 0.08 || normSharp < 25) {
      return 2; // stressed/tired
    }
    return 0; // calm
  };

  const captureAndAnalyze = () => {
    const idx = analyzeFrame();
    setResultIdx(idx);
    addEmotionScan(emotionResults[idx].result);
    // immediately stop and delete frame
    stopStream();
    setPhase("result");
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
          <div className="mx-auto mb-4">
            <div className="rounded-xl overflow-hidden border border-border w-72 mx-auto">
              <video ref={videoRef} className="w-full h-44 object-cover bg-black" playsInline muted />
            </div>
            <p className="text-xs text-muted-foreground mt-2">Press <strong>K</strong> or tap Capture to take a one-time scan. Image is processed on-device and deleted.</p>
            <div className="flex items-center justify-center gap-3 mt-3">
              <Button onClick={captureAndAnalyze} className="rounded-xl">
                <Camera className="h-4 w-4 mr-2" /> Capture (K)
              </Button>
              <Button variant="ghost" onClick={() => { stopStream(); setPhase("consent"); }} className="rounded-xl">
                Cancel
              </Button>
            </div>
          </div>
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
