
import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Auth } from './auth/Auth';
import { ProtectedRoute } from './auth/ProtectedRoute';
import { LayoutShell } from './layouts/LayoutShell';
import { ToastProvider } from './components/ui/ToastProvider';
import { useAuthStore } from './store/useAuthStore';
import { AuthProvider } from './auth/AuthProvider';

// Lazy-loaded components (code splitting - only load when needed)
const RoleSelection = lazy(() => import('./auth/RoleSelection').then(m => ({ default: m.RoleSelection })));
const ArcChatInterface = lazy(() => import('./features/ai/ArcChatInterface').then(m => ({ default: m.ArcChatInterface })));

// Fan Components - lazy loaded
const FanDashboard = lazy(() => import('./features/fan/FanDashboard').then(m => ({ default: m.FanDashboard })));
const DigitalTicket = lazy(() => import('./features/ticketing/DigitalTicket').then(m => ({ default: m.DigitalTicket })));
const InteractiveMap = lazy(() => import('./features/navigation/InteractiveMap').then(m => ({ default: m.InteractiveMap })));
const FoodOrdering = lazy(() => import('./features/fan/FoodOrdering').then(m => ({ default: m.FoodOrdering })));
const PointsTable = lazy(() => import('./features/tournament/PointsTable').then(m => ({ default: m.PointsTable })));

// Ops Components - lazy loaded
const OpsDashboard = lazy(() => import('./features/employee/OpsDashboard').then(m => ({ default: m.OpsDashboard })));
const IncidentFeeds = lazy(() => import('./features/employee/IncidentFeeds').then(m => ({ default: m.IncidentFeeds })));
const AnalyticsView = lazy(() => import('./features/analytics/AnalyticsView').then(m => ({ default: m.AnalyticsView })));

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
            
            {/* Fan Routes wrapped in LayoutShell */}
            <Route path="/fan/*" element={
              <ProtectedRoute allowedRole="fan">
                <LayoutShell>
                  <Routes>
                    <Route path="/" element={<FanDashboard />} />
                    <Route path="/tickets" element={<DigitalTicket />} />
                    <Route path="/map" element={<InteractiveMap />} />
                    <Route path="/food" element={<FoodOrdering />} />
                    <Route path="/leaderboard" element={<PointsTable />} />
                  </Routes>
                  {user && <ArcChatInterface />}
                </LayoutShell>
              </ProtectedRoute>
            } />

            {/* Employee Routes wrapped in LayoutShell */}
            <Route path="/ops/*" element={
              <ProtectedRoute allowedRole="employee">
                <LayoutShell>
                  <Routes>
                    <Route path="/" element={<OpsDashboard />} />
                    <Route path="/incidents" element={<IncidentFeeds />} />
                    <Route path="/analytics" element={<AnalyticsView />} />
                  </Routes>
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
