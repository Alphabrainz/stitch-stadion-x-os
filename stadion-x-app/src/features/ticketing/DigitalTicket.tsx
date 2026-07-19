import React, { useState } from 'react';
import { GlassCard } from '../../components/ui/GlassCard';
import { Badge } from '../../components/ui/Badge';
import { ticketService } from '../../services/ticketService';
import { useToastStore } from '../../store/useToastStore';

export const DigitalTicket: React.FC = () => {
  const [ticketStatus, setTicketStatus] = useState<'valid' | 'cancelled'>('valid');
  const [useBiometricPass, setUseBiometricPass] = useState(false);
  const [biometricState, setBiometricState] = useState<'unscanned' | 'scanning' | 'authenticated'>('unscanned');
  const [isCancelling, setIsCancelling] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const { addToast } = useToastStore();

  const handleScanBiometrics = () => {
    setBiometricState('scanning');
    setTimeout(() => {
      setBiometricState('authenticated');
      addToast('Biometrics Verified. Smart Pass Activated.', 'success');
    }, 2000);
  };

  const handleCancelTicket = async () => {
    setIsCancelling(true);
    try {
      const response = await ticketService.cancelTicket("TKT-8291");
      setTicketStatus('cancelled');
      setShowConfirm(false);
      addToast(`Refund of ₹${response.refundAmount * 100} processed.`, 'success');
    } catch (error) {
      console.error('Ticket cancellation failed:', error);
      addToast('Failed to cancel ticket. Please try again.', 'error');
    } finally {
      setIsCancelling(false);
    }
  };
  return (
    <div className="min-h-[calc(100vh-120px)] flex flex-col justify-center p-4 sm:p-8 max-w-md mx-auto space-y-8 animate-in slide-in-from-bottom-8 duration-500">
      <h2 className="font-display text-2xl font-black uppercase tracking-widest text-primary text-center">Digital Pass</h2>
      
      <GlassCard variant="liquid" className="p-0 overflow-hidden rounded-[32px] border-primary/30">
        <div className="bg-cover bg-center p-8 text-center border-b border-primary/20 relative" style={{ backgroundImage: 'linear-gradient(to right, rgba(0,0,0,0.8), rgba(0,0,0,0.6)), url("https://images.unsplash.com/photo-1518091043644-c1d44570d221?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80")' }}>
          <p className="text-white/80 font-bold text-[10px] tracking-widest uppercase mb-2">Double Header Ticket</p>
          <h3 className="font-black text-2xl uppercase tracking-widest text-white drop-shadow-lg mb-1">INDIA <span className="text-primary text-lg">VS</span> AUSTRALIA 🏏</h3>
          <p className="text-white/60 font-bold text-xs tracking-wider mt-2">Stadion X Arena</p>
        </div>
        
        <div className="p-8 bg-black/40 flex flex-col items-center gap-6 relative">
          
          {/* Cancel Confirmation Overlay */}
          {showConfirm && ticketStatus === 'valid' && (
            <div className="absolute inset-0 z-20 bg-black/90 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center animate-in fade-in duration-300">
              <span className="material-symbols-outlined text-[48px] text-brand-red mb-4">warning</span>
              <h4 className="text-xl font-bold text-white mb-2 uppercase tracking-widest">Cancel Ticket?</h4>
              <p className="text-secondary mb-6 text-sm">You will receive a full refund of <span className="text-white font-bold">₹15,000</span> to your original payment method.</p>
              
              <div className="flex gap-4 w-full">
                <button 
                  onClick={() => setShowConfirm(false)}
                  disabled={isCancelling}
                  className="flex-1 py-3 rounded-full border border-white/20 text-white font-bold hover:bg-white/10 transition disabled:opacity-50"
                >
                  Keep It
                </button>
                <button 
                  onClick={handleCancelTicket}
                  disabled={isCancelling}
                  className="flex-1 py-3 rounded-full bg-brand-red text-white font-bold hover:bg-red-600 shadow-[0_0_20px_rgba(255,0,0,0.4)] transition flex items-center justify-center disabled:opacity-50"
                >
                  {isCancelling ? <span className="material-symbols-outlined animate-spin">refresh</span> : 'Confirm Cancel'}
                </button>
              </div>
            </div>
          )}

          {/* Ticket Display Area */}
          {!useBiometricPass ? (
            <div className={`w-48 h-48 bg-white p-4 rounded-2xl shadow-[0_0_40px_rgba(212,175,55,0.2)] relative transition-all duration-500 ${ticketStatus === 'cancelled' ? 'opacity-30 grayscale blur-[2px]' : ''}`}>
              {ticketStatus === 'cancelled' && (
                <div className="absolute inset-0 flex items-center justify-center z-10">
                  <div className="bg-brand-red text-white font-bold px-4 py-2 rounded uppercase tracking-widest rotate-[-15deg] border-2 border-white/20 shadow-2xl">
                    VOID
                  </div>
                </div>
              )}
              <img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=StadionX-Ticket-12345" alt="Ticket QR" className="w-full h-full object-contain" />
            </div>
          ) : (
            <div className={`w-48 h-48 relative transition-all duration-500 ${ticketStatus === 'cancelled' ? 'opacity-30 grayscale blur-[2px]' : ''}`}>
              
              {/* Background glowing rings for NFC */}
              {biometricState === 'authenticated' && ticketStatus === 'valid' && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="absolute w-full h-full border-2 border-primary rounded-full animate-ping opacity-20"></div>
                  <div className="absolute w-40 h-40 border-2 border-primary rounded-full animate-ping opacity-40" style={{animationDelay: '0.3s'}}></div>
                  <div className="absolute w-32 h-32 border-2 border-primary rounded-full animate-ping opacity-60" style={{animationDelay: '0.6s'}}></div>
                </div>
              )}

              <div className={`absolute inset-0 p-4 rounded-3xl flex items-center justify-center shadow-[0_0_40px_rgba(212,175,55,0.2)] overflow-hidden transition-all duration-700 z-10 ${
                biometricState === 'authenticated' ? 'bg-black/60 border-2 border-primary/50 backdrop-blur-md' : 'bg-white'
              }`}>
                
                {ticketStatus === 'cancelled' && (
                  <div className="absolute inset-0 flex items-center justify-center z-20">
                    <div className="bg-brand-red text-white font-bold px-4 py-2 rounded uppercase tracking-widest rotate-[-15deg] border-2 border-white/20 shadow-2xl">
                      VOID
                    </div>
                  </div>
                )}

                {biometricState === 'unscanned' && (
                  <img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=StadionX-Ticket-12345" alt="Ticket QR" className="w-full h-full object-contain mix-blend-multiply" />
                )}

                {biometricState === 'scanning' && (
                  <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-black">
                     <span className="material-symbols-outlined text-[48px] animate-pulse">face</span>
                     <div className="w-full h-1 bg-gray-200 mt-2 overflow-hidden rounded-full">
                       <div className="w-1/2 h-full bg-blue-500 animate-[bounce_1s_infinite_alternate]"></div>
                     </div>
                  </div>
                )}

                {biometricState === 'authenticated' && (
                  <div className="flex flex-col items-center justify-center gap-2 animate-in zoom-in duration-500">
                    <span className="material-symbols-outlined text-[64px] text-primary drop-shadow-[0_0_15px_rgba(212,175,55,0.8)]">contactless</span>
                    <span className="text-[10px] text-primary uppercase font-bold tracking-widest">Hold near reader</span>
                  </div>
                )}
                
              </div>
            </div>
          )}
          
          {useBiometricPass && biometricState === 'unscanned' && ticketStatus === 'valid' && (
             <button onClick={handleScanBiometrics} className="w-full mt-2 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold tracking-widest uppercase flex items-center justify-center gap-2 hover:from-blue-500 hover:to-indigo-500 transition-all shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:scale-[1.02] active:scale-95">
               <span className="material-symbols-outlined text-[20px]">face</span>
               Scan Face ID to Activate
             </button>
          )}

          {(!useBiometricPass || biometricState !== 'authenticated') && ticketStatus === 'valid' && (
            <Badge variant="success" className="text-sm px-6 py-2">
              Valid Pass
            </Badge>
          )}

          {useBiometricPass && biometricState === 'authenticated' && ticketStatus === 'valid' && (
            <Badge variant="success" className="text-sm px-6 py-2 shadow-[0_0_15px_rgba(34,197,94,0.4)] animate-pulse">
              Identity Verified - Pass Active
            </Badge>
          )}
          
          {ticketStatus === 'cancelled' && (
            <Badge variant="danger" className="text-sm px-6 py-2">
              Ticket Cancelled & Refunded
            </Badge>
          )}
          
          <div className="w-full grid grid-cols-2 gap-4 mt-4">
            <div className="bg-white/5 p-4 rounded-xl text-center">
              <p className="text-secondary text-[10px] uppercase tracking-widest">Gate</p>
              <p className="font-bold text-xl text-white">B4</p>
            </div>
            <div className="bg-white/5 p-4 rounded-xl text-center">
              <p className="text-secondary text-[10px] uppercase tracking-widest">Sector</p>
              <p className="font-bold text-xl text-white">204</p>
            </div>
            <div className="bg-white/5 p-4 rounded-xl text-center col-span-2">
              <p className="text-secondary text-[10px] uppercase tracking-widest">Seat</p>
              <p className={`font-bold text-3xl ${ticketStatus === 'cancelled' ? 'text-secondary line-through' : 'text-primary'}`}>Row F, Seat 12</p>
            </div>
          </div>

          {ticketStatus === 'valid' && (
             <div className="w-full flex flex-col gap-3 mt-2">
               {/* Optional Feature Toggle */}
               <button 
                 onClick={() => setUseBiometricPass(!useBiometricPass)}
                 className={`w-full py-2.5 rounded-xl border text-xs font-bold tracking-widest uppercase flex items-center justify-center gap-2 transition-colors ${
                   useBiometricPass 
                     ? 'bg-primary/20 border-primary text-primary hover:bg-primary/30' 
                     : 'bg-white/5 border-white/20 text-white/70 hover:bg-white/10 hover:text-white'
                 }`}
               >
                 <span className="material-symbols-outlined text-[16px]">{useBiometricPass ? 'contactless_off' : 'contactless'}</span>
                 {useBiometricPass ? 'Revert to QR Code' : 'Enable Smart Biometric Pass'}
               </button>
               
               <button onClick={() => addToast('Added to Apple Wallet', 'success')} className="w-full py-3 rounded-xl bg-black border border-white/20 text-white font-bold tracking-widest flex items-center justify-center gap-2 hover:bg-white/10 transition-colors shadow-lg hover:scale-[1.02] active:scale-95">
                 <span className="material-symbols-outlined text-[20px]">account_balance_wallet</span>
                 Add to Apple Wallet
               </button>
               <button onClick={() => addToast('Saved to Google Pay', 'success')} className="w-full py-3 rounded-xl bg-white border border-white/20 text-black font-bold tracking-widest flex items-center justify-center gap-2 hover:bg-gray-200 transition-colors shadow-lg hover:scale-[1.02] active:scale-95">
                 <span className="material-symbols-outlined text-[20px]">wallet</span>
                 Save to GPay
               </button>
               <button onClick={() => addToast('Ticket Saved to Photos', 'success')} className="w-full py-3 rounded-xl bg-blue-600 border border-white/20 text-white font-bold tracking-widest flex items-center justify-center gap-2 hover:bg-blue-500 transition-colors shadow-lg hover:scale-[1.02] active:scale-95">
                 <span className="material-symbols-outlined text-[20px]">photo_library</span>
                 Save to Photos
               </button>
               <button 
                 onClick={() => setShowConfirm(true)}
                 className="w-full mt-2 py-2 text-xs rounded-xl text-brand-red/70 font-bold tracking-widest uppercase hover:text-brand-red transition-colors"
               >
                 Cancel & Refund Ticket
               </button>
             </div>
          )}
        </div>
      </GlassCard>
    </div>
  );
};
