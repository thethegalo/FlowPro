
"use client";

import React from 'react';
import { motion } from 'framer-motion';

export function MacbookShowcase() {
  return (
    <div className="w-full h-full flex flex-col bg-[#0d0d1a] relative group">
      {/* Browser Bar */}
      <div className="h-7 bg-white/[0.04] border-b border-white/[0.08] flex items-center px-4 gap-1.5 shrink-0">
        <div className="flex gap-1.5">
          <div className="h-2 w-2 rounded-full bg-[#ff5f57]" />
          <div className="h-2 w-2 rounded-full bg-[#febc2e]" />
          <div className="h-2 w-2 rounded-full bg-[#28c840]" />
        </div>
        <div className="flex-1 flex justify-center">
          <div className="px-3 py-0.5 rounded-md bg-white/5 border border-white/5 text-[9px] text-white/20 font-medium">
            flowpro.app/dashboard
          </div>
        </div>
      </div>

      {/* Mockup Dashboard Content */}
      <div className="flex-1 flex overflow-hidden origin-top-left transform scale-[0.85] md:scale-100">
        {/* Mini Sidebar */}
        <div className="w-12 border-r border-white/5 bg-black/20 p-2 flex flex-col gap-3 shrink-0">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-6 w-full rounded-md bg-white/5" />
          ))}
        </div>

        {/* Content Area */}
        <div className="flex-1 p-4 space-y-4">
          <div className="flex justify-between items-center">
            <div className="h-3 w-24 bg-white/10 rounded-full" />
            <div className="h-5 w-5 rounded-full bg-primary/20 border border-primary/30" />
          </div>

          {/* Mini KPI Cards */}
          <div className="grid grid-cols-3 gap-2">
            {[
              { val: "R$ 14.2k", label: "Caixa" },
              { val: "8 / 10", label: "Ação" },
              { val: "Dia 1", label: "Fase" }
            ].map((k, i) => (
              <div key={i} className="bg-white/5 border border-white/5 rounded-lg p-2.5 space-y-1">
                <div className="h-1.5 w-8 bg-white/10 rounded-full" />
                <div className="text-[11px] font-bold text-white/80">{k.val}</div>
              </div>
            ))}
          </div>

          {/* Fake Graph */}
          <div className="flex-1 bg-white/[0.02] border border-white/5 rounded-xl p-4 flex flex-col justify-end h-32 relative overflow-hidden">
            <div className="absolute inset-0 flex items-end">
              <svg className="w-full h-full" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="purpleGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#7c3aed" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path 
                  d="M0,80 C50,75 80,40 120,45 C160,50 200,20 250,25 C300,30 350,10 400,15 L400,100 L0,100 Z" 
                  fill="url(#purpleGrad)" 
                />
                <path 
                  d="M0,80 C50,75 80,40 120,45 C160,50 200,20 250,25 C300,30 350,10 400,15" 
                  fill="none" 
                  stroke="#7c3aed" 
                  strokeWidth="2" 
                />
              </svg>
            </div>
            <div className="relative z-10 flex justify-between">
              <div className="h-1 w-6 bg-white/10 rounded-full" />
              <div className="h-1 w-6 bg-white/10 rounded-full" />
              <div className="h-1 w-6 bg-white/10 rounded-full" />
            </div>
          </div>
        </div>
      </div>

      {/* Gloss Effect */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-white/[0.02] to-transparent" />
    </div>
  );
}
