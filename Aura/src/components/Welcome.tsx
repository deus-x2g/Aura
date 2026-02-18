import { Leaf, Shield, Heart, Bike } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAura } from "@/context/AuraContext";

const Welcome = () => {
  const { setWelcomeSeen } = useAura();

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6 text-center">
      <div className="max-w-sm animate-fade-in">
        <div className="mx-auto h-20 w-20 rounded-3xl bg-primary/10 flex items-center justify-center mb-6">
          <Leaf className="h-10 w-10 text-primary" />
        </div>

        <h1 className="font-display text-3xl mb-2">Welcome to Aura</h1>
        <p className="text-muted-foreground text-sm mb-8">
          Your privacy-first mental wellbeing companion,
          built for delivery riders like you.
        </p>

        <div className="space-y-4 text-left mb-8">
          {[
            { icon: Bike, text: "Designed for delivery riders' unique challenges" },
            { icon: Shield, text: "100% private — all data stays on your device" },
            { icon: Heart, text: "Track stress, document incidents, get support" },
          ].map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-start gap-3">
              <div className="h-9 w-9 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <Icon className="h-4 w-4 text-primary" />
              </div>
              <p className="text-sm text-muted-foreground pt-1.5">{text}</p>
            </div>
          ))}
        </div>

        <Button onClick={setWelcomeSeen} className="w-full rounded-xl" size="lg">
          Get Started
        </Button>

        <p className="text-[10px] text-muted-foreground mt-4">
          No account needed · No data collected · Fully optional features
        </p>
      </div>
    </div>
  );
};

export default Welcome;
