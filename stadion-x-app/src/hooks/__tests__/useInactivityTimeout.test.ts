import { renderHook } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { useInactivityTimeout } from '../useInactivityTimeout';
import { useAuthStore } from '../../store/useAuthStore';

describe('useInactivityTimeout', () => {
  const mockLogout = vi.fn();
  let originalLocation: Location;

  beforeEach(() => {
    vi.useFakeTimers();
    vi.clearAllMocks();
    useAuthStore.setState({ user: { uid: '123' } as any, logout: mockLogout } as any);
    
    originalLocation = window.location;
    // Mock window.location
    delete (window as any).location;
    window.location = { ...originalLocation, href: '' };
  });

  afterEach(() => {
    vi.useRealTimers();
    window.location = originalLocation;
  });

  it('does nothing if user is not logged in', () => {
    useAuthStore.setState({ user: null });
    renderHook(() => useInactivityTimeout(1000));
    
    vi.advanceTimersByTime(2000);
    expect(mockLogout).not.toHaveBeenCalled();
  });

  it('logs out user after timeout', () => {
    renderHook(() => useInactivityTimeout(1000));
    
    vi.advanceTimersByTime(1000);
    expect(mockLogout).toHaveBeenCalled();
    expect(window.location.href).toBe('/');
  });

  it('resets timer on activity', () => {
    renderHook(() => useInactivityTimeout(1000));
    
    vi.advanceTimersByTime(500); // Wait half time
    
    // Trigger activity
    document.dispatchEvent(new Event('mousemove'));
    
    vi.advanceTimersByTime(500); // This would have triggered it if not reset
    expect(mockLogout).not.toHaveBeenCalled();
    
    vi.advanceTimersByTime(500); // Now it should trigger
    expect(mockLogout).toHaveBeenCalled();
  });
});
