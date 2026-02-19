import React from "react";
import { AlertTriangle, LifeBuoy } from "lucide-react";
import { Link } from "react-router-dom";

const RiderBanner: React.FC = () => {
  return (
    <div className="rounded-2xl bg-card p-4 aura-card-glow border border-border flex items-center gap-4">
      <div className="flex-1">
        <h3 className="font-display text-base">Rider Mode — Privacy first</h3>
        <p className="text-xs text-muted-foreground mt-1">Personalized wellbeing tools for delivery riders — no surveillance, fully optional.</p>
      </div>
      <div className="flex items-center gap-3">
        <Link to="/support" className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-aura-safe-gradient text-xs font-medium">
          <LifeBuoy className="w-4 h-4" /> Support
        </Link>
        <Link to="/incident" className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-destructive/10 text-xs font-medium border border-destructive/10">
          <AlertTriangle className="w-4 h-4 text-destructive" /> Report
        </Link>
      </div>
    </div>
  );
};

export default RiderBanner;
