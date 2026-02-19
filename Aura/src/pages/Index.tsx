import heroImage from "@/assets/hero-wellness.jpg";
import HeroIllustration from "@/components/HeroIllustration";
import RiderBanner from "@/components/RiderBanner";
import RiderSupport from "@/components/RiderSupport";
import StressCheckIn from "@/components/StressCheckIn";
import HabitCard from "@/components/HabitCard";
import WellnessRing from "@/components/WellnessRing";
import BreathingExercise from "@/components/BreathingExercise";
import WeeklySummary from "@/components/WeeklySummary";
import DailyQuote from "@/components/DailyQuote";
import { useAura } from "@/context/AuraContext";
import { Leaf, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";

const habits = [
  { icon: "💧", title: "Hydrate", streak: 12, colorClass: "bg-aura-sky/10" },
  { icon: "🧘", title: "Breathe", streak: 7, colorClass: "bg-aura-sage-light/50" },
  { icon: "🚶", title: "Stretch", streak: 5, colorClass: "bg-aura-gold-light/50" },
  { icon: "😴", title: "Rest Well", streak: 3, colorClass: "bg-aura-lavender/10" },
];

const Index = () => {
  const { getStressStreak, data } = useAura();
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";
  const streak = getStressStreak();

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Hero */}
      <div className="relative h-52 overflow-hidden sm:h-64">
        <img src={heroImage} alt="Serene landscape" className="h-full w-full object-cover" />
        <div className="absolute right-4 top-4 hidden md:block w-48 h-28">
          <HeroIllustration className="w-full h-full" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/50 to-background" />
        <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
          <div className="flex items-center gap-2 mb-1">
            <Leaf className="h-4 w-4 text-primary" />
            <span className="text-xs font-semibold text-primary tracking-widest uppercase">Aura</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-display">{greeting}, Rider</h1>
          <p className="text-xs text-muted-foreground mt-0.5">Your wellbeing matters most</p>
        </div>
      </div>

      <div className="mx-auto max-w-lg px-4 -mt-1">
        <div className="mb-3">
          <RiderBanner />
        </div>
        {/* High stress alert */}
        {streak >= 3 && (
          <Link to="/support" className="block mb-4 animate-fade-in">
            <div className="rounded-2xl aura-alert-gradient border border-destructive/10 p-4 flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold">{streak} high-stress days in a row</p>
                <p className="text-xs text-muted-foreground">Consider a rest day. Tap for support resources →</p>
              </div>
            </div>
          </Link>
        )}

        {/* Stress check-in */}
        <section className="mt-4 animate-fade-in">
          <StressCheckIn />
        </section>

        {/* Wellness Rings */}
        <section className="mt-5 animate-fade-in [animation-delay:100ms] opacity-0">
          <h2 className="font-display text-lg mb-3">Today's Progress</h2>
          <div className="grid grid-cols-2 gap-3">
            <WellnessRing label="Water" value={data.waterIntake} max={8} unit="gl" color="hsl(var(--aura-sky))" icon="💧" />
            <WellnessRing label="Sleep" value={data.sleepHours} max={8} unit="hr" color="hsl(var(--aura-lavender))" icon="🌙" />
            <WellnessRing label="Steps" value={data.stepsCount} max={10000} unit="" color="hsl(var(--aura-sage))" icon="👟" />
            <WellnessRing label="Mindful" value={data.mindfulMinutes} max={20} unit="m" color="hsl(var(--aura-gold))" icon="🧠" />
          </div>
        </section>

        {/* Habits */}
        <section className="mt-5 animate-fade-in [animation-delay:200ms] opacity-0">
          <h2 className="font-display text-lg mb-3">Daily Habits</h2>
          <div className="grid grid-cols-2 gap-3">
            {habits.map((h) => (
              <HabitCard key={h.title} {...h} />
            ))}
          </div>
        </section>

        {/* Weekly summary */}
        <section className="mt-5 animate-fade-in [animation-delay:250ms] opacity-0">
          <WeeklySummary />
        </section>

        <section className="mt-4 animate-fade-in [animation-delay:270ms] opacity-0">
          <RiderSupport />
        </section>

        {/* Breathing + Quote */}
        <div className="mt-5 grid gap-4 animate-fade-in [animation-delay:300ms] opacity-0">
          <BreathingExercise />
          <DailyQuote />
        </div>
      </div>
    </div>
  );
};

export default Index;
