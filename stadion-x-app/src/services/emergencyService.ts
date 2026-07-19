

export interface LocationData {
  lat: number;
  lng: number;
}

export const emergencyService = {
  dispatchSOS: async (userId: string, location: LocationData | null, type: string = 'medical') => {
    try {
      console.log(`Dispatching ${type.toUpperCase()} SOS for user ${userId} at`, location);
      
      // Future: Real Supabase write to an 'incidents' table
      /*
      const { error } = await supabase.from('incidents').insert({
        user_id: userId,
        location,
        type,
        status: 'active',
        created_at: new Date().toISOString()
      });
      if (error) throw error;
      */
      
      return { success: true, incidentId: `SOS-${Math.floor(Math.random() * 10000)}` };
    } catch (error) {
      console.error("SOS Dispatch Failed", error);
      throw error;
    }
  },

  updateIncidentStatus: async (incidentId: string, status: 'resolved' | 'escalated') => {
    // Ops dashboard will use this to resolve emergencies
    console.log(`Incident ${incidentId} marked as ${status}`);
    return true;
  }
};
