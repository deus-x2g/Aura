import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import lovable from "@/lib/lovableApi";

export interface StressEntry {
  date: string;
  level: number; // 1-5
  timestamp: number;
}

export interface IncidentReport {
  id: string;
  date: string;
  description: string;
  injuryType: string;
  status: "pending" | "reviewing" | "approved" | "denied";
  timestamp: number;
}

export interface EmotionScan {
  date: string;
  result: "calm" | "neutral" | "stressed" | "fatigued";
  timestamp: number;
}

interface AuraData {
  stressHistory: StressEntry[];
  incidents: IncidentReport[];
  emotionScans: EmotionScan[];
  habits: Record<string, boolean>;
  hasSeenWelcome: boolean;
  waterIntake: number;
  sleepHours: number;
  stepsCount: number;
  mindfulMinutes: number;
}

interface AuraContextType {
  data: AuraData;
  addStressEntry: (level: number) => void;
  addIncident: (report: Omit<IncidentReport, "id" | "timestamp" | "status">) => void;
  addEmotionScan: (result: EmotionScan["result"]) => void;
  toggleHabit: (habit: string) => void;
  setWelcomeSeen: () => void;
  updateWellness: (field: "waterIntake" | "sleepHours" | "stepsCount" | "mindfulMinutes", value: number) => void;
  getRecentStress: () => StressEntry[];
  getStressStreak: () => number;
  clearData: () => void;
}

const defaultData: AuraData = {
  stressHistory: [],
  incidents: [],
  emotionScans: [],
  habits: {},
  hasSeenWelcome: false,
  waterIntake: 5,
  sleepHours: 7,
  stepsCount: 6200,
  mindfulMinutes: 15,
};

const AuraContext = createContext<AuraContextType | null>(null);

export const useAura = () => {
  const ctx = useContext(AuraContext);
  if (!ctx) throw new Error("useAura must be used within AuraProvider");
  return ctx;
};

const STORAGE_KEY = "aura_data";

const loadData = (): AuraData => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return { ...defaultData, ...JSON.parse(stored) };
  } catch {}
  return defaultData;
};

export const AuraProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<AuraData>(loadData);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [data]);

  const today = () => new Date().toISOString().split("T")[0];

  const addStressEntry = (level: number) => {
    const entry = { date: today(), level, timestamp: Date.now() };
    setData((d) => ({ ...d, stressHistory: [...d.stressHistory, entry] }));
    // fire-and-forget persist
    lovable.saveStressEntry({ level, ts: entry.timestamp }).catch(() => {});
  };

  const addIncident = (report: Omit<IncidentReport, "id" | "timestamp" | "status">) => {
    const newReport = { ...report, id: crypto.randomUUID(), timestamp: Date.now(), status: "pending" as const };
    setData((d) => ({ ...d, incidents: [...d.incidents, newReport] }));
    // upload to backend stub
    try {
      const form = new FormData();
      form.append("id", newReport.id);
      form.append("description", newReport.description);
      form.append("injuryType", newReport.injuryType);
      lovable.uploadIncident(form).catch(() => {});
    } catch (e) {
      // ignore
    }
  };

  const addEmotionScan = (result: EmotionScan["result"]) => {
    setData((d) => ({
      ...d,
      emotionScans: [...d.emotionScans, { date: today(), result, timestamp: Date.now() }],
    }));
  };

  const toggleHabit = (habit: string) => {
    setData((d) => ({
      ...d,
      habits: { ...d.habits, [habit]: !d.habits[habit] },
    }));
  };

  const setWelcomeSeen = () => setData((d) => ({ ...d, hasSeenWelcome: true }));

  const updateWellness = (field: "waterIntake" | "sleepHours" | "stepsCount" | "mindfulMinutes", value: number) => {
    setData((d) => ({ ...d, [field]: value }));
  };

  const getRecentStress = (): StressEntry[] => {
    const sevenDaysAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
    return data.stressHistory.filter((e) => e.timestamp > sevenDaysAgo);
  };

  const getStressStreak = (): number => {
    const recent = getRecentStress();
    let streak = 0;
    for (let i = recent.length - 1; i >= 0; i--) {
      if (recent[i].level >= 4) streak++;
      else break;
    }
    return streak;
  };

  const clearData = () => {
    localStorage.removeItem(STORAGE_KEY);
    setData(defaultData);
  };

  return (
    <AuraContext.Provider
      value={{
        data,
        addStressEntry,
        addIncident,
        addEmotionScan,
        toggleHabit,
        setWelcomeSeen,
        updateWellness,
        getRecentStress,
        getStressStreak,
        clearData,
      }}
    >
      {children}
    </AuraContext.Provider>
  );
};
