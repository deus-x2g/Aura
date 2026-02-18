import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuraProvider, useAura } from "@/context/AuraContext";
import BottomNav from "@/components/BottomNav";
import Welcome from "@/components/Welcome";
import Index from "./pages/Index";
import EmotionCheck from "./pages/EmotionCheck";
import IncidentReport from "./pages/IncidentReport";
import FatigueAnalysis from "./pages/FatigueAnalysis";
import EmergencySupport from "./pages/EmergencySupport";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const AppContent = () => {
  const { data } = useAura();

  if (!data.hasSeenWelcome) {
    return <Welcome />;
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/emotion-check" element={<EmotionCheck />} />
        <Route path="/incident" element={<IncidentReport />} />
        <Route path="/fatigue" element={<FatigueAnalysis />} />
        <Route path="/support" element={<EmergencySupport />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <BottomNav />
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuraProvider>
          <AppContent />
        </AuraProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
