
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Auth } from './components/Auth';
import { RoleSelection } from './components/RoleSelection';
import { ProtectedRoute } from './components/ProtectedRoute';
import { LayoutShell } from './components/layout/LayoutShell';
import { ToastProvider } from './components/ui/ToastProvider';
import { ArcChatInterface } from './components/arc/ArcChatInterface';
import { useAuthStore } from './store/useAuthStore';

// Fan Components
import { FanDashboard } from './components/fan/FanDashboard';
import { DigitalTicket } from './components/fan/DigitalTicket';
import { InteractiveMap } from './components/fan/InteractiveMap';
import { FoodOrdering } from './components/fan/FoodOrdering';
import { PointsTable } from './components/fan/PointsTable';
import { AuthProvider } from './components/AuthProvider';
import { supabase } from './lib/supabase';
// Ops Components
import { OpsDashboard } from './components/ops/OpsDashboard';
import { IncidentFeeds } from './components/ops/IncidentFeeds';
import { AnalyticsView } from './components/ops/AnalyticsView';



function App() {
  const { user } = useAuthStore();

  return (
    <AuthProvider>
      <Router>
        <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none bg-black">
        {/* Deep, rich, soft background */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30 scale-105 blur-sm" 
          style={{ backgroundImage: "url('/stadium-bg.png')" }}
        ></div>
        
        {/* Premium Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_#000000_80%)] opacity-90"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black"></div>
        
        {/* Extremely soft, dispersed ambient lighting */}
        <div className="absolute top-[-30%] left-[-20%] w-[80%] h-[80%] bg-primary/10 blur-[150px] rounded-full mix-blend-screen animate-float pointer-events-none"></div>
      </div>
      
      <div className="relative z-0 min-h-screen">
        <ToastProvider />
        
        <Routes>
        <Route path="/" element={<Auth />} />
        
        {/* Protected Routes */}
        <Route path="/role-selection" element={
          <ProtectedRoute>
            <RoleSelection />
          </ProtectedRoute>
        } />
        
        {/* App Routes wrapped in LayoutShell */}
        <Route path="/*" element={
          <ProtectedRoute>
            <LayoutShell>
              <Routes>
                {/* Fan Routes */}
                <Route path="/fan" element={<FanDashboard />} />
                <Route path="/fan/tickets" element={<DigitalTicket />} />
                <Route path="/fan/map" element={<InteractiveMap />} />
                <Route path="/fan/food" element={<FoodOrdering />} />
                <Route path="/fan/leaderboard" element={<PointsTable />} />

                {/* Employee Routes */}
                <Route path="/ops" element={<OpsDashboard />} />
                <Route path="/ops/incidents" element={<IncidentFeeds />} />
                <Route path="/ops/analytics" element={<AnalyticsView />} />
              </Routes>
              
              {/* Universal ARC AI Assistant */}
              {user && <ArcChatInterface />}
            </LayoutShell>
          </ProtectedRoute>
        } />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
