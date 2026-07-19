import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRole?: 'fan' | 'employee';
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRole }) => {
  const { user, loading } = useAuthStore();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }

  // If user hasn't selected a role, and they are NOT on the role-selection page
  if (!user.role && window.location.pathname !== '/role-selection') {
    return <Navigate to="/role-selection" replace />;
  }

  // If specific role is required and doesn't match
  if (allowedRole && user.role && user.role !== allowedRole) {
    // Redirect to their respective dashboard
    return <Navigate to={user.role === 'fan' ? '/fan' : '/ops'} replace />;
  }

  return <>{children}</>;
};
