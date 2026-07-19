// Mocked service for live stadium data (WebSockets / Polling)

export interface CrowdDensity {
  sector: string;
  capacityPercent: number;
  status: 'normal' | 'warning' | 'critical';
}

export const stadiumDataService = {
  // In the future, this will establish a WebSocket connection
  subscribeToCrowdDensity: (callback: (data: CrowdDensity[]) => void) => {
    console.log("Subscribed to live crowd density stream.");
    // Mocking initial data
    callback([
      { sector: '204', capacityPercent: 95, status: 'warning' },
      { sector: '101', capacityPercent: 40, status: 'normal' }
    ]);
    return () => console.log("Unsubscribed from crowd density stream.");
  },

  getLiveScore: async () => {
    // Return default operations data
    return {
      matchId: "WC-42",
      teams: ["IND", "AUS"],
      score: { IND: 210, AUS: 180 },
      status: "In Progress"
    };
  }
};
