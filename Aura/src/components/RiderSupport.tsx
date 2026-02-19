import React from "react";
import { Phone, MessageSquare } from "lucide-react";

const supportList = [
  { name: "iCall", contact: "022-2552-1234" },
  { name: "Vandrevala", contact: "1860-266-2345" },
  { name: "NIMHANS", contact: "080-2699-5000" },
];

const RiderSupport: React.FC = () => {
  return (
    <div className="rounded-2xl bg-card p-5 aura-card-glow border border-border">
      <h3 className="font-display text-lg mb-2">Emergency & Support</h3>
      <p className="text-sm text-muted-foreground mb-4">Quick helplines and grounding exercises for immediate support.</p>

      <div className="grid gap-3">
        {supportList.map((s) => (
          <div key={s.name} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
            <div>
              <div className="text-sm font-medium">{s.name}</div>
              <div className="text-[12px] text-muted-foreground">{s.contact}</div>
            </div>
            <div className="flex gap-2">
              <a href={`tel:${s.contact}`} className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-primary text-primary-foreground text-xs">
                <Phone className="w-4 h-4" /> Call
              </a>
              <a href="#" className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-secondary text-secondary-foreground text-xs">
                <MessageSquare className="w-4 h-4" /> SMS
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RiderSupport;
