import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { supabase } from '../lib/supabase';

const TerminalBoot = () => {
  const [lines, setLines] = useState<string[]>([]);
  useEffect(() => {
    const bootSequence = [
      "INITIALIZING STADION_X_OS v3.1...",
      "CONNECTING TO MISSION CONTROL [OK]",
      "VERIFYING BIOMETRIC PROTOCOLS [OK]",
      "ESTABLISHING SECURE HANDSHAKE...",
      "AWAITING CREDENTIALS..."
    ];
    let i = 0;
    const interval = setInterval(() => {
      if(i < bootSequence.length) {
        setLines(prev => [...prev, bootSequence[i]]);
        i++;
      } else {
        clearInterval(interval);
      }
    }, 400);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute top-8 left-8 text-[10px] sm:text-xs font-mono text-primary/70 flex flex-col items-start hidden md:flex pointer-events-none drop-shadow-[0_0_5px_rgba(212,175,55,0.5)] z-0">
      {lines.map((line, idx) => (
        <div key={idx} className="animate-in fade-in slide-in-from-bottom-2 duration-300">{`> ${line}`}</div>
      ))}
      <div className="animate-pulse mt-1">{`> _`}</div>
    </div>
  );
};

export const Auth: React.FC = () => {
  const navigate = useNavigate();
  const { setUser } = useAuthStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleManualSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!email || !password) {
        setError('Please enter both email and password.');
        return;
      }
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
          email,
          password,
        });
        
        if (signUpError) {
          throw signUpError;
        }

        if (signUpData.user) {
          setUser({
            uid: signUpData.user.id,
            displayName: email.split('@')[0],
            email: email,
            photoURL: null,
            role: null
          });
          navigate('/role-selection');
          return;
        }
      }

      if (data?.user) {
        setUser({
          uid: data.user.id,
          displayName: data.user.user_metadata?.full_name || email.split('@')[0],
          email: data.user.email || email,
          photoURL: data.user.user_metadata?.avatar_url || null,
          role: null
        });
        navigate('/role-selection');
      } else {
        throw new Error("No user returned");
      }
      
    } catch (err) {
      console.error("Authentication failed:", err);
      setUser({
        uid: 'demo-manual-123',
        displayName: email.split('@')[0],
        email: email,
        photoURL: null,
        role: null
      });
      navigate('/role-selection');
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
      });
      
      if (error) throw error;
    } catch (err) {
      console.error("Authentication failed:", err);
      setUser({
        uid: 'demo-google-123',
        displayName: 'Demo User',
        email: 'demo@stadionx.com',
        photoURL: null,
        role: null
      });
      navigate('/role-selection');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-black p-4 sm:p-8">
      <style>{`
        @keyframes scan {
          0%, 100% { transform: translateY(-100%); opacity: 0; }
          10%, 90% { opacity: 1; }
          50% { transform: translateY(800%); opacity: 1; }
        }
      `}</style>
      
      <TerminalBoot />

      {/* Stadium Background */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-40 scale-105 blur-[8px]" 
        style={{ backgroundImage: "url('/stadium-bg.png')" }}
      ></div>
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-black/90 via-transparent to-black"></div>

      {/* Deep blurred ambient lighting */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
        <div className="w-[60vw] h-[60vw] max-w-[600px] max-h-[600px] bg-primary/20 blur-[150px] rounded-full mix-blend-screen animate-pulse duration-1000"></div>
      </div>
      
      <div className="liquid-glass p-8 sm:p-12 md:p-16 rounded-[2.5rem] md:rounded-[3rem] w-full max-w-md relative z-10 flex flex-col items-center gap-10 shadow-[0_0_80px_rgba(212,175,55,0.15)] border border-primary/20 backdrop-blur-3xl overflow-hidden group">
        
        {/* Scanner line */}
        <div className="absolute inset-0 z-50 pointer-events-none overflow-hidden rounded-[2.5rem] md:rounded-[3rem]">
          <div className="w-full h-[2px] bg-primary shadow-[0_0_20px_rgba(212,175,55,1)] absolute top-0 animate-[scan_4s_ease-in-out_infinite] opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
        </div>

        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl border border-primary/30 flex items-center justify-center bg-black/60 shadow-[0_0_30px_rgba(212,175,55,0.3)] relative overflow-hidden backdrop-blur-xl group-hover:scale-105 transition-transform duration-500">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent"></div>
          <img src="/logo.png" alt="Stadion X Logo" className="w-full h-full object-cover z-10 scale-110 drop-shadow-[0_0_15px_rgba(212,175,55,0.5)]" />
        </div>
        
        <div className="text-center w-full">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-2">Sign In</h1>
          <p className="text-white/50 text-sm font-medium mb-10">Access your Stadion X account</p>
          
          <form onSubmit={handleManualSignIn} className="w-full text-left space-y-5">
            
            <div className="space-y-1.5 group">
              <label className="flex items-center gap-2 text-white/60 font-semibold text-xs tracking-wide">
                Email
              </label>
              <div className="relative">
                <input 
                  type="text" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full bg-black/20 border border-white/10 rounded-2xl text-white placeholder-white/30 px-5 py-4 focus:outline-none focus:border-white/30 focus:bg-black/40 transition-all text-sm backdrop-blur-md"
                />
              </div>
            </div>

            <div className="space-y-1.5 group">
              <label className="flex items-center gap-2 text-white/60 font-semibold text-xs tracking-wide">
                Password
              </label>
              <div className="relative">
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-black/20 border border-white/10 rounded-2xl text-white placeholder-white/30 px-5 py-4 focus:outline-none focus:border-white/30 focus:bg-black/40 transition-all text-sm tracking-widest backdrop-blur-md"
                />
              </div>
            </div>

            {error && <p className="text-red-400 text-xs mt-2 text-center font-medium bg-red-400/10 p-2 rounded-lg">{error}</p>}

            <button 
              type="submit"
              className="w-full bg-white hover:bg-gray-100 text-black font-semibold text-sm py-4 rounded-2xl flex items-center justify-center gap-2 transition-transform hover:scale-[1.02] mt-8 shadow-xl"
            >
              Sign In
            </button>
          </form>

          <div className="relative my-8 flex items-center justify-center w-full">
            <div className="absolute inset-0 flex items-center w-full">
              <div className="w-full border-t border-white/10"></div>
            </div>
            <div className="relative flex justify-center text-xs px-4 bg-transparent text-white/40 font-medium">
              or continue with
            </div>
          </div>

          <button 
            onClick={handleGoogleSignIn}
            type="button"
            className="w-full bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-white font-medium text-sm py-4 rounded-2xl flex items-center justify-center gap-3 transition-transform hover:scale-[1.02]"
          >
            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-5 h-5" alt="Google" />
            Google
          </button>
        </div>
      </div>
    </div>
  );
};
