"use client";
import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";
import React from "react";

export const Circle = ({ className, idx, ...rest }: any) => {
  return (
    <div
      {...rest}
      className={twMerge(
        "absolute inset-0 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform rounded-full border",
        className
      )}
    />
  );
};

export const Radar = ({ className, style }: { className?: string; style?: React.CSSProperties }) => {
  const circles = new Array(8).fill(1);
  return (
    <div
      style={{
        width: '480px',
        height: '480px',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        ...style
      }}
      className={twMerge(
        "relative flex items-center justify-center rounded-full overflow-hidden",
        className
      )}
    >
      <style>{`
        @keyframes radar-spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        .animate-radar-spin {
          animation: radar-spin 4s linear infinite;
        }
      `}</style>
      
      {/* Rotating sweep line */}
      <div
        style={{ 
          transformOrigin: "left center",
          width: "240px",
          left: "50%",
          top: "50%",
          position: "absolute",
          zIndex: 40
        }}
        className="animate-radar-spin flex h-[2px] items-center justify-center overflow-hidden bg-transparent"
      >
        <div className="relative z-40 h-[1.5px] w-full bg-gradient-to-r from-purple-400 via-purple-400/40 to-transparent" />
      </div>

      {/* Concentric circles */}
      {circles.map((_, idx) => (
        <div
          key={`circle-${idx}`}
          style={{
            height: `${(idx + 1) * 56}px`,
            width: `${(idx + 1) * 56}px`,
            border: `1px solid rgba(139, 92, 246, ${0.5 - idx * 0.05})`,
            background: 'transparent',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            borderRadius: '50%',
          }}
        />
      ))}

      {/* Central Point */}
      <div style={{
        position: 'absolute',
        width: 10,
        height: 10,
        background: '#7c3aed',
        borderRadius: '50%',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        boxShadow: '0 0 16px #7c3aed, 0 0 32px rgba(124,58,237,0.6)',
        zIndex: 50
      }} />
    </div>
  );
};

export const IconContainer = ({
  icon,
  text,
  className
}: {
  icon?: React.ReactNode;
  text?: string;
  className?: string;
}) => {
  return (
    <div
      className={twMerge("absolute z-50 flex flex-col items-center justify-center space-y-1.5", className)}
    >
      <div className="flex h-[44px] w-[44px] items-center justify-center rounded-[10px] border border-purple-500/25 bg-[#0f0a23]/80 shadow-inner backdrop-blur-md">
        <div className="text-[#a78bfa]">
          {icon}
        </div>
      </div>
      <div className="px-2">
        <div className="text-center text-[9px] font-bold text-white/40 uppercase tracking-[0.5px]">
          {text}
        </div>
      </div>
    </div>
  );
};
