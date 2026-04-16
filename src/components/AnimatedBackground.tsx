
"use client";

import { useEffect, useRef } from 'react';

/**
 * AnimatedBackground Simplificado (Ultra-Light)
 * Focado em performance zero-lag para dispositivos móveis e desktops.
 */
export function AnimatedBackground() {
  return (
    <div className="fixed inset-0 z-0 bg-[#05050f] overflow-hidden pointer-events-none">
      {/* Grade Sutil */}
      <div 
        className="absolute inset-0 opacity-[0.04]" 
        style={{ 
          backgroundImage: `linear-gradient(#8b5cf6 1px, transparent 1px), linear-gradient(90deg, #8b5cf6 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }} 
      />

      {/* Brilho Atmosférico Estático (Muito mais leve que animações) */}
      <div className="absolute top-[-20%] left-[-10%] w-[80%] h-[80%] bg-primary/10 rounded-full blur-[140px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-violet-600/5 rounded-full blur-[120px]" />
    </div>
  );
}
