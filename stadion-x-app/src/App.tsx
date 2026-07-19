
import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Auth } from './components/Auth';
import { ProtectedRoute } from './components/ProtectedRoute';
import { LayoutShell } from './components/layout/LayoutShell';
import { ToastProvider } from './components/ui/ToastProvider';
import { useAuthStore } from './store/useAuthStore';
import { AuthProvider } from './components/AuthProvider';

// Lazy-loaded components (code splitting - only load when needed)
const RoleSelection = lazy(() => import('./components/RoleSelection').then(m => ({ default: m.RoleSelection })));
const ArcChatInterface = lazy(() => import('./components/arc/ArcChatInterface').then(m => ({ default: m.ArcChatInterface })));

// Fan Components - lazy loaded
const FanDashboard = lazy(() => import('./components/fan/FanDashboard').then(m => ({ default: m.FanDashboard })));
const DigitalTicket = lazy(() => import('./components/fan/DigitalTicket').then(m => ({ default: m.DigitalTicket })));
const InteractiveMap = lazy(() => import('./components/fan/InteractiveMap').then(m => ({ default: m.InteractiveMap })));
const FoodOrdering = lazy(() => import('./components/fan/FoodOrdering').then(m => ({ default: m.FoodOrdering })));
const PointsTable = lazy(() => import('./components/fan/PointsTable').then(m => ({ default: m.PointsTable })));

// Ops Components - lazy loaded
const OpsDashboard = lazy(() => import('./components/ops/OpsDashboard').then(m => ({ default: m.OpsDashboard })));
const IncidentFeeds = lazy(() => import('./components/ops/IncidentFeeds').then(m => ({ default: m.IncidentFeeds })));
const AnalyticsView = lazy(() => import('./components/ops/AnalyticsView').then(m => ({ default: m.AnalyticsView })));

// Loading fallback
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen bg-black">
    <div className="flex flex-col items-center gap-4">
      <div className="w-10 h-10 border-2 border-transparent border-t-yellow-500 rounded-full animate-spin" />
      <p className="text-white/40 text-sm tracking-widest uppercase">Loading...</p>
    </div>
  </div>
);

import { ErrorBoundary } from './components/ErrorBoundary';

function App() {
  const { user } = useAuthStore();

  return (
    <ErrorBoundary>
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
          
          <Suspense fallback={<PageLoader />}>
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
          </Suspense>
          </div>
        </Router>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
