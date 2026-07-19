import { useEffect } from 'react';
import { useAuthStore } from '../store/useAuthStore';

/**
 * Custom hook to manage user session inactivity timeouts.
 * Automatically logs out the user after 30 minutes of inactivity.
 * @param timeoutMs - The timeout duration in milliseconds (default: 30 minutes)
 */
export const useInactivityTimeout = (timeoutMs: number = 1800000) => {
  const { user, logout } = useAuthStore();

  useEffect(() => {
    if (!user) return; // Only track if logged in
    
    let timeoutId: ReturnType<typeof setTimeout>;
    
    const resetTimer = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        logout();
        window.location.href = '/'; // Force redirect to login
      }, timeoutMs);
    };

    // Events to track activity
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];
    
    events.forEach(event => {
      document.addEventListener(event, resetTimer, { passive: true });
    });

    // Initialize timer
    resetTimer();

    return () => {
      clearTimeout(timeoutId);
      events.forEach(event => {
        document.removeEventListener(event, resetTimer);
      });
    };
  }, [user, logout, timeoutMs]);
};
