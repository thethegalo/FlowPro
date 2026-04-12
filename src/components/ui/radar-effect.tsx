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
      style={style}
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
          width: "210px",
          left: "50%",
          top: "50%"
        }}
        className="animate-radar-spin absolute z-40 flex h-[2px] items-center justify-center overflow-hidden bg-transparent"
      >
        <div className="relative z-40 h-[1.5px] w-full bg-gradient-to-r from-purple-400 via-purple-400/40 to-transparent" />
      </div>

      {/* Concentric circles */}
      {circles.map((_, idx) => (
        <Circle
          style={{
            height: `${(idx + 1) * 52}px`,
            width: `${(idx + 1) * 52}px`,
            borderColor: `rgba(139, 92, 246, ${0.15 - idx * 0.015})`,
          }}
          key={`circle-${idx}`}
          idx={idx}
        />
      ))}

      {/* Central Point */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50">
        <div className="h-2 w-2 bg-[#7c3aed] rounded-full shadow-[0_0_12px_#7c3aed,0_0_24px_rgba(124,58,237,0.5)]" />
      </div>
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
