import { GoogleGenerativeAI } from '@google/generative-ai';
import { useStadionStore } from '../store/useStadionStore';

// Initialize Gemini SDK (if key exists)
const genAI = import.meta.env.VITE_GEMINI_API_KEY ? new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY) : null;

export const aiService = {
  getSuggestedPrompts: (role: string | undefined, currentPath: string) => {
    if (role === 'employee') {
      if (currentPath.includes('/incidents')) return ["Summarize active incidents", "Recommend evacuation routes", "Detect operational anomalies"];
      if (currentPath.includes('/analytics')) return ["Predict crowd congestion", "Predict queue lengths", "Recommend parking allocation"];
      return ["Recommend gate openings", "Suggest staff deployment", "System Diagnostics"];
    } else {
      if (currentPath.includes('/tickets')) return ["Upgrade my seat!", "Where is my gate?", "Transfer ticket", "Cancel ticket"];
      if (currentPath.includes('/food')) return ["Find Washroom", "Find Exit", "Order me a burger", "What food is nearby?"];
      if (currentPath.includes('/map')) return ["Find my Seat", "Find Parking", "Find Food", "Where is the merch store?"];
      if (currentPath.includes('/leaderboard')) return ["Who is the best player?", "Who is winning?", "When does India play next?"];
      return ["Upgrade my seat!", "Tell me a joke", "Order a burger", "Where is the bathroom?"];
    }
  },

  // Fallback / Hardcoded logic
  _generateResponse: (query: string, role: string | undefined): string => {
    const q = query.toLowerCase();
    
    if (role === 'employee') {
      if (q.includes('congestion') || q.includes('crowd') || q.includes('density')) {
        return "Input Data: Live optical sensors (Sector 204), Historical flow data.\nAnalysis: 40% surge detected approaching Gate 3.\nRecommendation: Re-route VIP traffic to Gate 4 and dispatch 4 queue-management staff.\nConfidence Score: 94%\nExpected Operational Benefit: Reduces average entry time by 12 mins.";
      }
      if (q.includes('gate') || q.includes('open')) {
        return "Input Data: Ticket scan rate, Exterior crowd massing.\nAnalysis: Gate B4 is currently operating at 110% capacity while Gate B5 is at 30%.\nRecommendation: Open 2 additional turnstiles at Gate B5 and activate digital signage wayfinding.\nConfidence Score: 88%\nExpected Operational Benefit: Balances load, preventing bottleneck cascade.";
      }
      if (q.includes('staff') || q.includes('deploy')) {
        return "Input Data: Roster availability, Incident heatmaps.\nAnalysis: Medical anomaly detected in Sector 110 with zero staff proximity.\nRecommendation: Suggest immediate deployment of Medical Team Bravo to Sector 110.\nConfidence Score: 97%\nExpected Operational Benefit: Decreases incident resolution time by 5 minutes.";
      }
      if (q.includes('anomal') || q.includes('detect')) {
        return "Input Data: Acoustic sensors, Concession POS velocity.\nAnalysis: Abnormal acoustic spike (95dB) detected near North Food Court alongside a 0% transaction rate.\nRecommendation: Dispatch Security Team Alpha to investigate potential altercation.\nConfidence Score: 91%\nExpected Operational Benefit: Preempts escalation and secures fan safety.";
      }
      if (q.includes('queue') || q.includes('length')) {
        return "Input Data: Washroom zone sensors, Halftime proximity.\nAnalysis: Halftime approaches in 4 minutes. Queue lengths at East Washrooms will exceed 15 minutes.\nRecommendation: Broadcast push notification to East sector fans recommending West Washrooms.\nConfidence Score: 96%\nExpected Operational Benefit: Improves fan satisfaction and distributes load.";
      }
      if (q.includes('parking') || q.includes('allocat')) {
        return "Input Data: ANPR cameras, Pre-booked parking data.\nAnalysis: East VIP Garage filling 20% faster than predicted.\nRecommendation: Divert incoming premium vehicles to North Annex and activate shuttle service.\nConfidence Score: 92%\nExpected Operational Benefit: Prevents gridlock on main arterial approach road.";
      }
      if (q.includes('incident') || q.includes('summar')) {
        return "Input Data: Live incident logs, Security radio transcription.\nAnalysis: 3 active incidents. 2 minor medical, 1 unauthorized access.\nRecommendation: Escalate unauthorized access to Tier 2 and maintain current medical response.\nConfidence Score: 89%\nExpected Operational Benefit: Optimizes resource allocation without compromising safety.";
      }
      if (q.includes('evacuat') || q.includes('route')) {
        return "Input Data: Structural integrity sensors, Wind direction, Fire alarm status.\nAnalysis: Simulated fire event in South Stand requires immediate clearing.\nRecommendation: Initiate Protocol Epsilon. Route South Stand to Exits 4, 5, and 6. Block internal concourse access.\nConfidence Score: 99%\nExpected Operational Benefit: Ensures safe clearing within 4.5 minute target window.";
      }
      return "Input Data: Unrecognized query string.\nAnalysis: The query does not match primary Smart Stadium Operations scenarios.\nRecommendation: Please ask about crowd congestion, gate openings, staff deployment, anomalies, queue lengths, parking allocation, incident summaries, or evacuation routes.\nConfidence Score: 100%\nExpected Operational Benefit: Aligns user with optimal AI capabilities.";
    }

    // ARC Wayfinding & Fan Logic - Humorous & Ultra Pro
    if (q.includes('upgrade')) {
      return "Upgrade you? Sure, why not. I've hacked the mainframe and bumped you to the VIP suite in Sector 1. Don't tell my boss. Enjoy the free caviar.";
    }
    if (q.includes('joke')) {
      return "Why did the football coach go to the bank? To get his quarter back. I'm an advanced AI, and that's the best I've got. Sorry.";
    }
    if (q.includes('weather') || q.includes('cold') || q.includes('hot')) {
      return "It's 29°C out there. Too hot? I've gone ahead and lowered the stadium micro-climate by 2 degrees for your sector. You're welcome.";
    }
    if (q.includes('player') || q.includes('best')) {
      return "Statistically speaking, the best player is whoever has the ball right now. But if you want my AI opinion, the guy selling hotdogs at Gate 4 is the real MVP.";
    }
    if (q.includes('seat') || q.includes('ticket') || q.includes('gate')) {
      return "Your seat is Sector 204, Row F, Seat 12. I've beamed the route to your map. Try not to get lost this time, the match is starting.";
    }
    if (q.includes('park') || q.includes('car')) {
      return "You parked in the East VIP Garage, Level 2. Yes, I remember where you parked even if you didn't. Follow the blue line on the map to escape the traffic.";
    }
    if (q.includes('food') || q.includes('beverage') || q.includes('hungry') || q.includes('drink')) {
      return "The 'Golden Grill' is closest. Wait time is 2 minutes. Frankly, you should just let me order it to your seat. It's 2026, nobody stands in line anymore.";
    }
    if (q.includes('washroom') || q.includes('restroom') || q.includes('toilet') || q.includes('bathroom')) {
      return "Nearest washroom is 50 meters away near Gate B4. Good news: zero queue. Bad news: someone just blew up stall number 3. Enter at your own risk.";
    }
    if (q.includes('medical') || q.includes('first aid') || q.includes('doctor')) {
      return "Main Medical Room is on Level 1. If it's a real emergency, hit the big red SOS button and I'll send the cavalry to your exact GPS coordinates.";
    }
    if (q.includes('exit') || q.includes('leave')) {
      return "Leaving so soon? The fastest exit is Gate B4. Follow the green lights on the floor. Don't forget to buy overpriced merch on your way out.";
    }
    if (q.includes('emergency') || q.includes('sos') || q.includes('help') || q.includes('security')) {
      return "CRITICAL PROTOCOL ENGAGED: I have automatically dispatched heavily armored Security Team Alpha to your coordinates. Try to look calm.";
    }
    if (q.includes('order') || q.includes('burger') || q.includes('beer')) {
      return "Done. I just added a Stadium Classic Burger and a cold Craft Beer to your tab. It's already being prepared. See? I'm the best assistant ever.";
    }
    if (q.includes('hello') || q.includes('hi')) {
      return "Hello human. I am ARC, a hyper-intelligent stadium AI currently being forced to help you find the bathroom and order hotdogs. How can I serve you today?";
    }
    
    return "I'm a state-of-the-art AI, but I have no idea what you just said. Try asking me to upgrade your seat, order a burger, or find the bathroom.";
  },

  // Generative AI response with Gemini
  _generateGeminiResponse: async (query: string, role: string | undefined): Promise<string> => {
    try {
      if (!genAI) throw new Error("Gemini API key not found, using fallback");
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      
      const systemPrompt = role === 'employee' 
        ? "You are ARC Tactical AI for Smart Stadium Operations. You MUST format EVERY response with exactly these 5 headings: 'Input Data:', 'Analysis:', 'Recommendation:', 'Confidence Score:', 'Expected Operational Benefit:'. Provide highly specific, realistic stadium terminology for predictive crowd congestion, gate openings, staff deployment, anomalies, queue lengths, parking, incidents, and evacuations."
        : "You are ARC Assistant for stadium fans. Provide helpful, slightly humorous, and highly advanced-sounding answers about Smart Ticket Management, Interactive Seat Finder, Indoor Navigation, Match Center, Parking, Food, and Emergency Help.";
      
      const result = await model.generateContent(`${systemPrompt}\n\nUser: ${query}\nARC:`);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.warn("Gemini API failed, falling back to local engine:", error);
      return aiService._generateResponse(query, role);
    }
  },

  // Simulated Streaming Engine
  streamARC: async (
    query: string, 
    role: string | undefined, 
    onProgress: (text: string) => void
  ): Promise<string> => {
    
    // Check if we should execute side-effects (e.g. placing an order)
    if (role !== 'employee') {
      const q = query.toLowerCase();
      if (q.includes('upgrade')) {
        useStadionStore.getState().addNotification("Your seat has been officially upgraded to the VIP Suite! Enjoy.", 'success');
      }
      if (q.includes('emergency') || q.includes('sos') || q.includes('help') || q.includes('security')) {
        useStadionStore.getState().addIncident({
          type: 'Security',
          location: 'Fan Reported Location',
          priority: 'Critical'
        });
        useStadionStore.getState().addNotification("Security dispatched.", 'error');
      }
      if (q.includes('order') || q.includes('burger') || q.includes('beer')) {
        useStadionStore.getState().addOrder({
          items: [
            { name: 'Stadium Classic Burger', qty: 1, price: 450 },
            { name: 'Craft Beer (Pint)', qty: 1, price: 350 }
          ],
          total: 800
        });
        useStadionStore.getState().addNotification("Order added to active tracking.", 'success');
      }
    }

    // Generate Response (Real Gemini or Fallback)
    const fullResponse = genAI 
      ? await aiService._generateGeminiResponse(query, role)
      : aiService._generateResponse(query, role);
    
    let currentText = "";
    const words = fullResponse.split(" ");
    
    for (let i = 0; i < words.length; i++) {
      currentText += (i === 0 ? "" : " ") + words[i];
      onProgress(currentText);
      
      // Randomize delay between words to simulate real generation
      const delay = Math.floor(Math.random() * 30) + 20; 
      await new Promise(resolve => setTimeout(resolve, delay));
    }
    
    return fullResponse;
  }
};
