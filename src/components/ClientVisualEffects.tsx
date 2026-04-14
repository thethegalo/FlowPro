
"use client";

import dynamic from 'next/dynamic';

const FloatingMentor = dynamic(() => import('@/components/FloatingMentor').then(mod => ({ default: mod.FloatingMentor })), { ssr: false });
const EtheralShadow = dynamic(() => import('@/components/ui/etheral-shadow').then(mod => ({ default: mod.EtheralShadow })), { ssr: false });

export function ClientVisualEffects() {
  return (
    <>
      <div className="fixed inset-0 z-0 pointer-events-none">
        <EtheralShadow
          color="rgba(109, 40, 217, 0.9)"
          animation={{ scale: 45, speed: 55 }}
          noise={{ opacity: 0.35, scale: 1.5 }}
          sizing="fill"
        />
      </div>
      <FloatingMentor />
    </>
  );
}
