import { describe, it, expect, beforeEach } from 'vitest';
import { useAuthStore } from '../useAuthStore';

describe('useAuthStore', () => {
  beforeEach(() => {
    useAuthStore.setState({ user: null, loading: true });
  });

  it('should initialize with null user and loading true', () => {
    const state = useAuthStore.getState();
    expect(state.user).toBeNull();
    expect(state.loading).toBe(true);
  });

  it('should set user and loading false', () => {
    const mockUser = {
      uid: '123',
      displayName: 'Test User',
      email: 'test@example.com',
      photoURL: null,
      role: null
    };

    useAuthStore.getState().setUser(mockUser);
    
    const state = useAuthStore.getState();
    expect(state.user).toEqual(mockUser);
    expect(state.loading).toBe(false);
  });

  it('should set role if user exists', () => {
    const mockUser = {
      uid: '123',
      displayName: 'Test User',
      email: 'test@example.com',
      photoURL: null,
      role: null
    };
    
    useAuthStore.getState().setUser(mockUser);
    useAuthStore.getState().setRole('fan');
    
    const state = useAuthStore.getState();
    expect(state.user?.role).toBe('fan');
  });

  it('should not set role if user is null', () => {
    useAuthStore.getState().setRole('fan');
    
    const state = useAuthStore.getState();
    expect(state.user).toBeNull();
  });

  it('should clear user on logout', () => {
    const mockUser = {
      uid: '123',
      displayName: 'Test User',
      email: 'test@example.com',
      photoURL: null,
      role: null
    };
    
    useAuthStore.getState().setUser(mockUser);
    useAuthStore.getState().logout();
    
    const state = useAuthStore.getState();
    expect(state.user).toBeNull();
    expect(state.loading).toBe(false);
  });
});
