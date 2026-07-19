import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, Html, useProgress } from '@react-three/drei';
import { GlassCard } from '../../components/ui/GlassCard';

function Loader() {
  const { progress } = useProgress();
  return <Html center>{progress.toFixed(1)} % loaded</Html>;
}

// A simple abstract representation of a stadium
function StadiumPlaceholder() {
  return (
    <group>
      {/* Field */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
        <planeGeometry args={[10, 6]} />
        <meshStandardMaterial color="#2d5a27" />
      </mesh>
      
      {/* Stands */}
      <mesh position={[0, 0, -3.5]}>
        <boxGeometry args={[12, 2, 1]} />
        <meshStandardMaterial color="#444" />
      </mesh>
      <mesh position={[0, 0, 3.5]}>
        <boxGeometry args={[12, 2, 1]} />
        <meshStandardMaterial color="#444" />
      </mesh>
      <mesh position={[-5.5, 0, 0]}>
        <boxGeometry args={[1, 2, 6]} />
        <meshStandardMaterial color="#444" />
      </mesh>
      <mesh position={[5.5, 0, 0]}>
        <boxGeometry args={[1, 2, 6]} />
        <meshStandardMaterial color="#444" />
      </mesh>
    </group>
  );
}

export const DigitalTwinViewer: React.FC = () => {
  return (
    <div className="w-full h-[600px] relative rounded-xl overflow-hidden border border-white/10">
      <GlassCard className="absolute top-4 left-4 z-10 !p-4 flex flex-col gap-3 pointer-events-auto w-64">
        <div>
          <h3 className="text-white font-bold text-sm tracking-widest uppercase">Smart Overlays</h3>
          <p className="text-white/60 text-[10px] uppercase mt-1">Live Operational Data</p>
        </div>
        
        <div className="flex flex-col gap-2 mt-2">
          {['Live Crowd Density', 'Gate Status', 'Parking Occupancy', 'Staff Locations', 'Incident Locations', 'Navigation Routes'].map((layer) => (
            <label key={layer} className="flex items-center gap-2 cursor-pointer group">
              <input type="checkbox" className="accent-primary w-3 h-3" defaultChecked={layer === 'Live Crowd Density'} />
              <span className="text-xs text-white/80 group-hover:text-white transition-colors">{layer}</span>
            </label>
          ))}
          
          <div className="border-t border-white/10 my-1"></div>
          
          <button className="w-full py-2 bg-brand-red/20 border border-brand-red/50 text-brand-red text-[10px] font-bold uppercase tracking-widest rounded hover:bg-brand-red/40 transition flex items-center justify-center gap-2">
            <span className="material-symbols-outlined text-[14px]">warning</span>
            Evacuation Paths
          </button>
        </div>
      </GlassCard>

      <Canvas camera={{ position: [0, 8, 10], fov: 50 }}>
        <color attach="background" args={['#0a0a0a']} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
        
        <Suspense fallback={<Loader />}>
          <StadiumPlaceholder />
          <Environment preset="city" />
          <ContactShadows position={[0, -0.6, 0]} opacity={0.4} scale={20} blur={2} far={4.5} />
        </Suspense>
        
        <OrbitControls 
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          minPolarAngle={0}
          maxPolarAngle={Math.PI / 2.1} // don't go below ground
        />
      </Canvas>
    </div>
  );
};
