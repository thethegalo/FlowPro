"use client";
import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";
import React from "react";

export const Circle = ({ className, idx, ...rest }: any) => {
  return (
    <motion.div
      {...rest}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: idx * 0.1, duration: 0.2 }}
      className={twMerge(
        "absolute inset-0 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform rounded-full border",
        className
      )}
    />
  );
};

export const Radar = ({ className }: { className?: string }) => {
  const circles = new Array(8).fill(1);
  return (
    <div
      className={twMerge(
        "relative flex h-20 w-20 items-center justify-center rounded-full",
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
        style={{ transformOrigin: "right center" }}
        className="animate-radar-spin absolute right-1/2 top-1/2 z-40 flex h-[2px] w-[200px] items-end justify-center overflow-hidden bg-transparent"
      >
        <div className="relative z-40 h-[1px] w-full bg-gradient-to-r from-transparent via-purple-500 to-transparent" />
      </div>
      {/* Concentric circles */}
      {circles.map((_, idx) => (
        <Circle
          style={{
            height: `${(idx + 1) * 4}rem`,
            width: `${(idx + 1) * 4}rem`,
            borderColor: `rgba(139, 92, 246, ${1 - (idx + 1) * 0.12})`,
          }}
          key={`circle-${idx}`}
          idx={idx}
        />
      ))}
    </div>
  );
};

export const IconContainer = ({
  icon,
  text,
  delay,
  className
}: {
  icon?: React.ReactNode;
  text?: string;
  delay?: number;
  className?: string;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay: delay ?? 0 }}
      className={twMerge("relative z-50 flex flex-col items-center justify-center space-y-1.5", className)}
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-purple-500/20 bg-white/5 shadow-inner backdrop-blur-md">
        <div className="text-purple-400">
          {icon}
        </div>
      </div>
      <div className="rounded-md px-2 py-0.5">
        <div className="text-center text-[10px] font-bold text-white/40 uppercase tracking-tighter">
          {text}
        </div>
      </div>
    </motion.div>
  );
};
