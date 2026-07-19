import React, { useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { User } from '@supabase/supabase-js';
import { useAuthStore, type Role } from '../store/useAuthStore';

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const { setUser, setLoading, logout } = useAuthStore();

  useEffect(() => {
    let mounted = true;

    const fetchSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error("Error fetching session:", error);
          logout();
          return;
        }

        if (session?.user) {
          await handleUser(session.user);
        } else {
          logout();
        }
      } catch (err) {
        console.error("Session check failed:", err);
        logout();
      }
    };

    const handleUser = async (supabaseUser: User | null) => {
      if (!supabaseUser) return;
      setLoading(true);
      try {
        // Fetch role from Supabase 'users' table
        const { data, error } = await supabase
          .from('users')
          .select('role')
          .eq('id', supabaseUser.id)
          .single();
        
        let role: Role = null;
        if (data && !error) {
          role = data.role as Role;
        }

        if (mounted) {
          setUser({
            uid: supabaseUser.id,
            displayName: supabaseUser.user_metadata?.full_name || supabaseUser.email?.split('@')[0] || null,
            email: supabaseUser.email || null,
            photoURL: supabaseUser.user_metadata?.avatar_url || null,
            role: role
          });
        }
      } catch (error) {
        console.error("Error fetching user data from Supabase", error);
        if (mounted) {
          // Still set user, but without a role so they go to Role Selection
          setUser({
            uid: supabaseUser.id,
            displayName: supabaseUser.user_metadata?.full_name || supabaseUser.email?.split('@')[0] || null,
            email: supabaseUser.email || null,
            photoURL: supabaseUser.user_metadata?.avatar_url || null,
            role: null
          });
        }
      }
    };

    fetchSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        if (session?.user) {
          await handleUser(session.user);
        } else {
          logout();
        }
      }
    );

    return () => {
      mounted = false;
      authListener.subscription.unsubscribe();
    };
  }, [setUser, setLoading, logout]);

  return <>{children}</>;
};
