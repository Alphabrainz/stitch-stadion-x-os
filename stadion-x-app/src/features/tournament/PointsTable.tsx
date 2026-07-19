import React from 'react';
import { GlassCard } from '../../components/ui/GlassCard';
import { useStadionStore } from '../../store/useStadionStore';

export const PointsTable: React.FC = () => {
  const { leaderboard } = useStadionStore();
  
  return (
    <div className="p-8 max-w-4xl mx-auto space-y-8 animate-in slide-in-from-bottom-8 duration-500">
      
      <div className="text-center mb-8">
        <h2 className="font-display text-4xl font-black uppercase tracking-widest text-primary mb-2 drop-shadow-lg">Tournament Leaderboard</h2>
        <p className="text-secondary text-lg font-light tracking-wide">Live standings for the ICC World Cup.</p>
      </div>
      
      <GlassCard className="p-0 overflow-hidden rounded-[32px] border-primary/20 shadow-[0_20px_60px_rgba(0,0,0,0.8)]">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-black/60 border-b border-white/10 text-secondary uppercase tracking-[0.2em] text-[10px]">
              <tr>
                <th className="p-6 font-bold">Pos</th>
                <th className="p-6 font-bold">Team</th>
                <th className="p-6 font-bold text-center">Played</th>
                <th className="p-6 font-bold text-center">Won</th>
                <th className="p-6 font-bold text-right text-primary">Pts</th>
                <th className="p-6 font-bold text-right">NRR</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {leaderboard.map((team) => (
                <tr key={team.code} className="hover:bg-white/5 transition-colors group">
                  <td className="p-6 font-mono text-white/50">{team.rank}</td>
                  <td className="p-6">
                    <div className="flex items-center gap-4">
                      {/* Using placehold.co for generic flag styling fallback */}
                      <div className="w-10 h-10 rounded-full overflow-hidden border border-white/20 shadow-lg">
                        <img src={`https://flagcdn.com/w80/${team.flag}.png`} alt={team.country} loading="lazy" className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <p className="font-black text-xl text-white uppercase tracking-wider">{team.code}</p>
                        <p className="text-secondary text-xs">{team.country}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-6 text-center text-white/70 font-mono">{team.played}</td>
                  <td className="p-6 text-center text-white/70 font-mono">{team.won}</td>
                  <td className="p-6 text-right font-black text-2xl text-primary drop-shadow-md">{team.points}</td>
                  <td className={`p-6 text-right font-mono ${team.nrr.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>{team.nrr}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>

    </div>
  );
};
