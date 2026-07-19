import { createClient } from '@supabase/supabase-js';

// Get environment variables or provide fallback development values so the app won't crash
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://stadion-x-operations.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'stadion-x-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
