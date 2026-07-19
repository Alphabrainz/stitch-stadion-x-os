import React, { Suspense, useEffect } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, Html, useProgress } from '@react-three/drei';
import { GlassCard } from '../../components/ui/GlassCard';


function Loader() {
  const { progress } = useProgress();
  return <Html center>{progress.toFixed(1)} % loaded</Html>;
}

function StadiumModelWireframe() {
  return (
    <mesh>
      <boxGeometry args={[10, 2, 8]} />
      <meshStandardMaterial color="#222" wireframe />
    </mesh>
  );
}

// Ensure the component handles resizing gracefully
function ResizeHandler() {
  const { camera, gl } = useThree();
  useEffect(() => {
    const handleResize = () => {
      camera.updateProjectionMatrix();
      gl.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [camera, gl]);
  return null;
}

export const DigitalTwinViewer: React.FC = () => {
  
  return (
    <GlassCard className="h-full w-full relative overflow-hidden flex flex-col p-0 border-white/5 rounded-3xl bg-black">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-black to-black pointer-events-none z-0"></div>
      
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
          <StadiumModelWireframe />
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
        <ResizeHandler />
      </Canvas>
    </GlassCard>
  );
};
