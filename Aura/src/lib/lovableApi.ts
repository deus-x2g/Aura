// Minimal Lovable Cloud API stub for local development
// This file provides placeholder functions to be replaced with real API calls.

export const lovable = {
  async init() {
    // pretend to initialize SDK
    return Promise.resolve({ status: "ok" });
  },

  async saveStressEntry(entry: { level: number; ts: number }) {
    // send to backend; here we just log
    console.debug("lovable.saveStressEntry", entry);
    return Promise.resolve({ id: `${Date.now()}`, ...entry });
  },

  async uploadIncident(data: FormData) {
    console.debug("lovable.uploadIncident", Array.from(data.entries()).slice(0, 5));
    return Promise.resolve({ id: `${Date.now()}`, status: "received" });
  },
};

export default lovable;
