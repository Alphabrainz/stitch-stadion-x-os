// ARC AI Engine - Advanced Simulated Streaming Engine
import { useStadionStore } from '../store/useStadionStore';

export const aiService = {
  getSuggestedPrompts: (role: string | undefined, currentPath: string) => {
    if (role === 'employee') {
      if (currentPath.includes('/incidents')) return ["Filter active incidents", "Deploy Alpha Team", "Escalate to Police", "Show high-risk zones"];
      if (currentPath.includes('/analytics')) return ["Predict exit bottlenecks", "Concession restock needed?", "Show attendance drop-off"];
      return ["Status Report", "Show Crowd Density", "System Diagnostics", "Summarize current alerts"];
    } else {
      if (currentPath.includes('/tickets')) return ["Upgrade my seat!", "Where is my gate?", "Transfer ticket", "Cancel ticket"];
      if (currentPath.includes('/food')) return ["Find Washroom", "Find Exit", "Order me a burger", "What food is nearby?"];
      if (currentPath.includes('/map')) return ["Find my Seat", "Find Parking", "Find Food", "Where is the merch store?"];
      if (currentPath.includes('/leaderboard')) return ["Who is the best player?", "Who is winning?", "When does India play next?"];
      return ["Upgrade my seat!", "Tell me a joke", "Order a burger", "Where is the bathroom?"];
    }
  },

  // Generates the full response string based on robust fuzzy matching
  _generateResponse: (query: string, role: string | undefined): string => {
    const q = query.toLowerCase();
    
    if (role === 'employee') {
      if (q.includes('status') || q.includes('density') || q.includes('report')) {
        return "Sector 204 is currently operating at 95% capacity. Minor congestion detected at Gate 3. All other sectors are nominal. No critical incidents active.";
      }
      if (q.includes('incident') || q.includes('deploy') || q.includes('alpha') || q.includes('security')) {
        return "Security Team Alpha deployed to Sector 204. ETA 2 minutes. I have locked the adjacent turnstiles to prevent further crowding. Local camera feeds have been pinned to your dashboard.";
      }
      if (q.includes('predict') || q.includes('analytics') || q.includes('bottleneck')) {
        return "Predictive model indicates a 40% surge at the South Concessions in 10 minutes due to the halftime whistle. Recommending proactive staff reallocation from North side.";
      }
      if (q.includes('police') || q.includes('escalate')) {
        return "WARNING: Initiating escalation protocol to local law enforcement. Please confirm authorization code on your secondary device to finalize dispatch.";
      }
      return "Acknowledged. Logging query to Mission Control. My predictive models are running in the background.";
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

  // Simulated Streaming Engine
  streamARC: async (
    query: string, 
    role: string | undefined, 
    onProgress: (text: string) => void
  ): Promise<string> => {
    
    // Simulate network latency (thinking...)
    await new Promise(resolve => setTimeout(resolve, 600));
    
    const fullResponse = aiService._generateResponse(query, role);
    
    // Side effects logic for the smart assistant!
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
    
    let currentText = "";
    
    // Split into words for a more natural LLM streaming feel
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
