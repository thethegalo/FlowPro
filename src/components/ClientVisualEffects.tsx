
"use client";

import dynamic from 'next/dynamic';

const FloatingMentor = dynamic(() => import('@/components/FloatingMentor').then(mod => ({ default: mod.FloatingMentor })), { ssr: false });

export function ClientVisualEffects() {
  return (
    <>
      {/* Background Ultra-Leve (Performance Mode) */}
      <div className="fixed inset-0 z-0 pointer-events-none bg-[#05050f]">
        {/* Orb Principal no Topo */}
        <div 
          className="absolute top-[-10%] left-[-10%] w-[70%] h-[60%] rounded-full opacity-[0.15] blur-[120px] pointer-events-none"
          style={{ 
            background: 'radial-gradient(circle, rgba(124,58,237,1) 0%, rgba(124,58,237,0) 70%)',
            willChange: 'transform'
          }}
        />
        
        {/* Orb de Acento no Canto Inferior */}
        <div 
          className="absolute bottom-[-5%] right-[-5%] w-[50%] h-[50%] rounded-full opacity-[0.08] blur-[100px] pointer-events-none"
          style={{ 
            background: 'radial-gradient(circle, rgba(109,40,217,1) 0%, rgba(109,40,217,0) 70%)',
            willChange: 'transform'
          }}
        />

        {/* Grade de Malha Sutil (CSS Puro) */}
        <div 
          className="absolute inset-0 opacity-[0.03]" 
          style={{ 
            backgroundImage: `linear-gradient(rgba(139, 92, 246, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(139, 92, 246, 0.2) 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }} 
        />
      </div>
      
      <FloatingMentor />
    </>
  );
}
