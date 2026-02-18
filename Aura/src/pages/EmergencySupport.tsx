import { Phone, MessageCircle, Globe, Heart, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

const helplines = [
  {
    name: "iCall (India)",
    number: "9152987821",
    description: "Free mental health counseling for workers",
    hours: "Mon-Sat, 8AM-10PM IST",
    icon: "🇮🇳",
  },
  {
    name: "Vandrevala Foundation",
    number: "1860-2662-345",
    description: "24/7 mental health helpline",
    hours: "24 hours, 7 days",
    icon: "💚",
  },
  {
    name: "NIMHANS Helpline",
    number: "080-46110007",
    description: "National mental health support",
    hours: "24 hours, 7 days",
    icon: "🏥",
  },
  {
    name: "Crisis Text Line",
    number: "Text HOME to 741741",
    description: "Free 24/7 text-based crisis support",
    hours: "24 hours, 7 days",
    icon: "💬",
  },
];

const groundingSteps = [
  "5 things you can SEE",
  "4 things you can TOUCH",
  "3 things you can HEAR",
  "2 things you can SMELL",
  "1 thing you can TASTE",
];

const EmergencySupport = () => {
  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="mx-auto max-w-lg px-4 pt-6">
        <div className="text-center mb-6">
          <div className="mx-auto h-14 w-14 rounded-2xl bg-destructive/10 flex items-center justify-center mb-3">
            <Heart className="h-7 w-7 text-destructive" />
          </div>
          <h1 className="font-display text-2xl mb-1">Emergency Support</h1>
          <p className="text-sm text-muted-foreground">You're not alone. Help is available.</p>
        </div>

        {/* Quick call */}
        <a href="tel:9152987821" className="block mb-4">
          <div className="rounded-2xl bg-destructive text-destructive-foreground p-5 text-center transition-all hover:opacity-90 active:scale-[0.98]">
            <Phone className="h-6 w-6 mx-auto mb-2" />
            <p className="font-display text-lg">Call Now</p>
            <p className="text-xs opacity-80">iCall Mental Health Helpline</p>
          </div>
        </a>

        {/* All helplines */}
        <div className="rounded-2xl bg-card border border-border p-4 aura-card-glow mb-4">
          <h3 className="font-display text-base mb-3">Helplines</h3>
          <div className="space-y-3">
            {helplines.map((h) => (
              <div key={h.name} className="flex items-start gap-3 pb-3 border-b border-border last:border-0 last:pb-0">
                <span className="text-xl mt-0.5">{h.icon}</span>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm">{h.name}</p>
                  <p className="text-xs text-muted-foreground">{h.description}</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">{h.hours}</p>
                </div>
                <a href={`tel:${h.number.replace(/\D/g, "")}`}>
                  <Button size="sm" variant="soft" className="rounded-lg text-xs shrink-0">
                    <Phone className="h-3 w-3 mr-1" />
                    Call
                  </Button>
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Grounding exercise */}
        <div className="rounded-2xl bg-card border border-border p-5 aura-card-glow mb-4">
          <h3 className="font-display text-base mb-1">5-4-3-2-1 Grounding</h3>
          <p className="text-xs text-muted-foreground mb-4">If you're feeling overwhelmed, try this:</p>
          <div className="space-y-2.5">
            {groundingSteps.map((step, i) => (
              <div key={i} className="flex items-center gap-3 text-sm">
                <span className="h-7 w-7 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary shrink-0">
                  {5 - i}
                </span>
                <span className="text-muted-foreground">{step}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Privacy */}
        <div className="flex items-center justify-center gap-2 mt-4">
          <Shield className="h-4 w-4 text-primary" />
          <span className="text-xs text-muted-foreground">Calls are anonymous · No data shared with employer</span>
        </div>
      </div>
    </div>
  );
};

export default EmergencySupport;
