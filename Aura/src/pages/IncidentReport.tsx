import { useState } from "react";
import { useAura } from "@/context/AuraContext";
import { FileWarning, Upload, CheckCircle, Clock, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const injuryTypes = ["Minor scrape", "Road rash", "Vehicle damage", "Collision", "Fall", "Other"];

const IncidentReport = () => {
  const { addIncident, data } = useAura();
  const [description, setDescription] = useState("");
  const [injuryType, setInjuryType] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!description.trim() || !injuryType) return;
    addIncident({
      date: new Date().toISOString().split("T")[0],
      description: description.trim(),
      injuryType,
    });
    setSubmitted(true);
  };

  const recentIncidents = data.incidents.slice(-5).reverse();
  const statusIcon = {
    pending: <Clock className="h-3.5 w-3.5 text-accent" />,
    reviewing: <AlertCircle className="h-3.5 w-3.5 text-aura-sky" />,
    approved: <CheckCircle className="h-3.5 w-3.5 text-primary" />,
    denied: <AlertCircle className="h-3.5 w-3.5 text-destructive" />,
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-background pb-24">
        <div className="mx-auto max-w-lg px-4 pt-10 text-center animate-fade-in">
          <div className="mx-auto h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <CheckCircle className="h-8 w-8 text-primary" />
          </div>
          <h2 className="font-display text-2xl mb-2">Report Submitted</h2>
          <p className="text-sm text-muted-foreground mb-4">
            Your incident has been securely documented and sent for HR review. 
            You'll be notified when it's processed.
          </p>
          <div className="rounded-xl bg-card border border-border p-4 text-xs text-left space-y-1.5 text-muted-foreground aura-card-glow">
            <p>🔒 Data encrypted and stored securely</p>
            <p>📋 Sent to employer HR dashboard</p>
            <p>⏰ Typical review: 24-48 hours</p>
            <p>💰 May qualify for paid leave / insurance</p>
          </div>
          <Button onClick={() => { setSubmitted(false); setDescription(""); setInjuryType(""); }} variant="soft" className="mt-5 rounded-xl">
            Submit Another Report
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="mx-auto max-w-lg px-4 pt-6">
        <div className="text-center mb-6">
          <div className="mx-auto h-14 w-14 rounded-2xl bg-destructive/10 flex items-center justify-center mb-3">
            <FileWarning className="h-7 w-7 text-destructive" />
          </div>
          <h1 className="font-display text-2xl mb-1">Report Incident</h1>
          <p className="text-sm text-muted-foreground">Document for paid leave & insurance claims</p>
        </div>

        <div className="rounded-2xl bg-card border border-border p-5 aura-card-glow space-y-4">
          {/* Injury type */}
          <div>
            <label className="text-sm font-medium mb-2 block">Type of Incident</label>
            <div className="flex flex-wrap gap-2">
              {injuryTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => setInjuryType(type)}
                  className={`text-xs px-3 py-1.5 rounded-full border transition-all
                    ${injuryType === type
                      ? "bg-primary text-primary-foreground border-primary"
                      : "border-border text-muted-foreground hover:border-primary/30"
                    }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="text-sm font-medium mb-2 block">What happened?</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value.slice(0, 500))}
              placeholder="Describe the incident, location, and any injuries..."
              className="w-full rounded-xl border border-input bg-background p-3 text-sm min-h-[100px] resize-none focus:outline-none focus:ring-2 focus:ring-ring"
              maxLength={500}
            />
            <p className="text-[10px] text-muted-foreground mt-1">{description.length}/500 characters</p>
          </div>

          {/* Photo upload placeholder */}
          <div>
            <label className="text-sm font-medium mb-2 block">Evidence Photos (Optional)</label>
            <div className="border-2 border-dashed border-border rounded-xl p-6 text-center">
              <Upload className="h-6 w-6 mx-auto text-muted-foreground mb-2" />
              <p className="text-xs text-muted-foreground">Tap to upload accident photos</p>
              <p className="text-[10px] text-muted-foreground mt-1">🔒 Encrypted & visible only to HR</p>
            </div>
          </div>

          <Button
            onClick={handleSubmit}
            disabled={!description.trim() || !injuryType}
            className="w-full rounded-xl"
            size="lg"
          >
            Submit Report
          </Button>
        </div>

        {/* Past reports */}
        {recentIncidents.length > 0 && (
          <div className="rounded-2xl bg-card border border-border p-4 aura-card-glow mt-4">
            <h3 className="font-display text-sm mb-3">Past Reports</h3>
            <div className="space-y-3">
              {recentIncidents.map((inc) => (
                <div key={inc.id} className="flex items-center justify-between text-xs">
                  <div>
                    <p className="font-medium">{inc.injuryType}</p>
                    <p className="text-muted-foreground">{inc.date}</p>
                  </div>
                  <div className="flex items-center gap-1.5 capitalize">
                    {statusIcon[inc.status]}
                    <span className="text-muted-foreground">{inc.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default IncidentReport;
