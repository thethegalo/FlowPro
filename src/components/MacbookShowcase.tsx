"use client";

import React from 'react';

export function MacbookShowcase() {
  return (
    <div className="flex items-center justify-center w-full py-20 overflow-hidden bg-transparent">
      <div className="animate-sceneIn origin-center scale-[0.4] sm:scale-[0.55] md:scale-[0.75] lg:scale-100 transition-transform">
        <div className="w-[900px] relative filter drop-shadow-[0_80px_60px_rgba(0,0,0,0.85)] drop-shadow-[0_0_80px_rgba(100,40,220,0.2)]">
          
          {/* ── LID ── */}
          <div className="bg-gradient-to-b from-[#2e2e2e] via-[#1f1f1f] to-[#191919] rounded-t-[18px] p-[2px] relative">
            <div className="bg-gradient-to-b from-[#282828] to-[#1c1c1c] rounded-t-[16px] p-[12px] pb-0 relative overflow-hidden">
              {/* top edge shine */}
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-20"></div>
              {/* Apple-style logo notch center */}
              <div className="absolute top-[7px] left-1/2 -translate-x-1/2 w-[50px] h-[4px] bg-[#141414] rounded-b-[6px]"></div>

              {/* ── SCREEN ── */}
              <div className="bg-[#0d0d14] rounded-[10px] p-[3px] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04)]">
                <div className="bg-[#07070e] rounded-[8px] h-[520px] overflow-hidden relative">
                  {/* glass glare */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent pointer-events-none z-[200] rounded-[8px]"></div>

                  {/* DASHBOARD CONTENT */}
                  <div className="w-full h-full bg-[#07070e] flex flex-col overflow-hidden relative z-0">
                    {/* ambient blobs */}
                    <div className="absolute w-[350px] h-[250px] bg-primary/10 rounded-full blur-[70px] -top-[80px] -right-[60px] animate-blobMove"></div>
                    <div className="absolute w-[250px] h-[200px] bg-accent/10 rounded-full blur-[70px] bottom-[20px] -left-[50px] animate-blobMoveRev"></div>

                    {/* TOPBAR */}
                    <div className="flex items-center justify-between px-[22px] py-[10px] border-b border-white/[0.04] flex-shrink-0 relative z-[2] animate-fadeD">
                      <div className="flex items-center gap-[9px]">
                        <svg className="w-[28px] h-[34px] flex-shrink-0" viewBox="0 0 56 68" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <defs>
                            <linearGradient id="sGrad" x1="56" y1="0" x2="0" y2="68" gradientUnits="userSpaceOnUse">
                              <stop offset="0%" stopColor="#00AAFF" />
                              <stop offset="45%" stopColor="#5533EE" />
                              <stop offset="100%" stopColor="#8822CC" />
                            </linearGradient>
                            <linearGradient id="sGrad2" x1="56" y1="0" x2="0" y2="68" gradientUnits="userSpaceOnUse">
                              <stop offset="0%" stopColor="#22CCFF" />
                              <stop offset="100%" stopColor="#AA33FF" />
                            </linearGradient>
                          </defs>
                          <path
                            d="M 42 8 C 48 8 52 12 52 18 C 52 24 47 28 40 30 L 16 38 C 9 40 4 45 6 53 C 8 61 15 64 22 64 L 42 64 C 48 64 52 60 50 56"
                            stroke="url(#sGrad2)" strokeWidth="9" strokeLinecap="round" fill="none"
                            style={{ strokeDasharray: 320, strokeDashoffset: 320, animation: 'drawPath 1.4s cubic-bezier(0.65,0,0.35,1) 0.2s forwards' }}
                          />
                          <path
                            d="M 6 12 C 8 5 15 4 22 4 L 38 4 C 46 4 52 8 52 16 C 52 24 46 29 38 32 L 12 40 C 5 43 2 49 4 56 C 6 62 12 64 18 64 L 36 64 C 42 64 46 60 46 58"
                            stroke="url(#sGrad2)" strokeWidth="9" strokeLinecap="round" fill="none" opacity="0.35"
                            style={{ strokeDasharray: 300, strokeDashoffset: 300, animation: 'drawPath 1.4s cubic-bezier(0.65,0,0.35,1) 0.4s forwards' }}
                          />
                          <path
                            d="M 42 8 C 48 8 52 12 52 18 C 52 24 47 28 40 30 L 16 38 C 9 40 4 45 6 53 C 8 61 15 64 22 64 L 42 64 C 49 64 53 59 51 54 L 46 54 C 47 58 44 60 40 60 L 22 60 C 16 60 13 56 12 52 C 11 47 14 43 21 41 L 45 33 C 52 30 56 25 55 18 C 54 10 48 4 40 4 L 20 4 C 13 4 8 8 7 13 L 12 13 C 13 10 16 8 20 8 Z"
                            fill="url(#sGrad)" opacity="0"
                            style={{ animation: 'mac-fadeIn 0.6s ease 1.4s forwards' }}
                          />
                        </svg>
                        <div className="font-['Space_Grotesk'] text-[17px] font-bold leading-none tracking-[-0.3px]">
                          <span className="text-[#d0d8f0]">Flow</span>
                          <span className="text-[#7b2ff7]">Pro</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-[8px]">
                        <div className="flex items-center gap-[5px] rounded-[20px] px-[11px] py-[4px] text-[9px] font-bold tracking-[0.5px] uppercase border border-primary/35 bg-primary/10 text-primary">
                          <div className="w-[5px] h-[5px] rounded-full bg-primary animate-pulse"></div>
                          Flow Pro Activated
                        </div>
                        <div className="flex items-center gap-[5px] rounded-[20px] px-[11px] py-[4px] text-[9px] font-bold tracking-[0.5px] uppercase border border-accent/25 bg-accent/10 text-accent">
                          <div className="w-[5px] h-[5px] rounded-full bg-accent"></div>
                          10 Streak
                        </div>
                        <div className="text-white/25 text-[16px] cursor-pointer px-[4px]">⎋</div>
                      </div>
                    </div>

                    {/* MAIN */}
                    <div className="flex-1 overflow-hidden px-[22px] py-[18px] pb-[14px] flex flex-col gap-[13px] relative z-[2]">
                      
                      {/* HERO */}
                      <div className="flex items-start justify-between flex-shrink-0 animate-fadeU">
                        <div>
                          <div className="font-['Space_Grotesk'] text-[28px] font-extrabold italic text-white tracking-[-0.5px] leading-[1.05]">OLÁ, ADMIN MASTER</div>
                          <div className="mt-[5px] flex items-center gap-[5px] text-[9px] font-semibold text-white/35 tracking-[1.2px] uppercase">
                            <span className="text-[#7b2ff7] text-[11px]">⊕</span>
                            OBJETIVO: PRIMEIRA VENDA EM 7 DIAS
                          </div>
                        </div>
                        <div className="flex gap-[8px]">
                          <div className="bg-white/5 border border-white/10 rounded-[12px] px-[18px] py-[11px] min-w-[105px]">
                            <div className="text-[8px] color-white/30 tracking-[1px] uppercase mb-[4px]">Status</div>
                            <div className="text-[14px] font-extrabold italic text-[#9b6fff]">EXECUÇÃO</div>
                          </div>
                          <div className="bg-white/5 border border-white/10 rounded-[12px] px-[18px] py-[11px] min-w-[105px]">
                            <div className="text-[8px] color-white/30 tracking-[1px] uppercase mb-[4px]">Ganhos Flow</div>
                            <div className="text-[14px] font-extrabold italic text-white">$ 0</div>
                          </div>
                        </div>
                      </div>

                      {/* PROGRESS */}
                      <div className="bg-white/[0.025] border border-white/10 rounded-[14px] px-[18px] py-[14px] flex-shrink-0 relative overflow-hidden animate-fadeU">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent"></div>
                        <div className="text-[9px] text-[#7b2ff7] font-bold tracking-[1.2px] uppercase mb-[4px]">Nível de Execução</div>
                        <div className="font-['Space_Grotesk'] text-[20px] font-extrabold italic text-white mb-[12px]">0% CONCLUÍDO</div>
                        <div className="h-[5px] bg-white/10 rounded-[3px] overflow-hidden mb-[9px]">
                          <div className="h-full bg-gradient-to-r from-[#4a10e8] via-[#8b35ff] to-[#bf65ff] rounded-[3px] animate-grow relative">
                            <div className="absolute right-0 top-0 bottom-0 w-[40px] bg-gradient-to-r from-transparent via-white/50 to-transparent animate-mac-shim"></div>
                          </div>
                        </div>
                        <div className="flex justify-between text-[8px] font-semibold tracking-[0.8px] uppercase text-white/30">
                          <span className="text-white/60">FASE 1: PRIMEIRA VENDA</span>
                          <span>FASE 2: ESCALA</span>
                        </div>
                        <div className="absolute right-[18px] top-1/2 -translate-y-1/2 text-[26px] opacity-10">🏆</div>
                      </div>

                      {/* NAV */}
                      <div className="grid grid-cols-4 gap-[8px] flex-shrink-0 animate-fadeU">
                        {['🔍 Captar Leads', '🤖 IA Mentor', '📜 Scripts', '👤 Perfil'].map((item, i) => (
                          <div key={i} className="bg-white/5 border border-white/10 rounded-[11px] px-[8px] py-[12px] pb-[10px] flex flex-col items-center gap-[6px] cursor-pointer hover:border-primary/45 hover:bg-primary/10 hover:-translate-y-[2px] transition-all">
                            <div className="text-[17px]">{item.split(' ')[0]}</div>
                            <div className="text-[8px] font-semibold text-white/40 tracking-[1px] uppercase whitespace-nowrap">{item.split(' ').slice(1).join(' ')}</div>
                          </div>
                        ))}
                      </div>

                      {/* JOURNEY */}
                      <div className="flex-1 overflow-hidden flex flex-col gap-[8px] animate-fadeU">
                        <div className="flex justify-between items-center flex-shrink-0">
                          <div className="flex items-center gap-[7px] font-['Space_Grotesk'] text-[14px] font-extrabold italic text-white">
                            <span className="text-[#7b2ff7]">⚡</span>JORNADA DE 7 DIAS
                          </div>
                          <div className="bg-white/5 border border-white/10 rounded-[6px] px-[9px] py-[3px] text-[8px] font-semibold text-white/40 tracking-[0.8px] uppercase">Status: Ativo</div>
                        </div>
                        {[
                          { day: 1, title: 'DIA 1: CRIAR OFERTA', sub: 'Defina o que vender e seu primeiro script.' },
                          { day: 2, title: 'DIA 2: AJUSTAR PERFIL', sub: 'Prepare suas redes para converter visitas em vendas.' },
                          { day: 3, title: 'DIA 3: ENCONTRAR LEADS', sub: 'Identifique os clientes ideais com nossa ferramenta.' }
                        ].map((d, i) => (
                          <div key={i} className={`bg-white/5 border border-white/10 rounded-[11px] px-[14px] py-[11px] flex items-center gap-[13px] cursor-pointer hover:border-primary/40 hover:bg-primary/5 transition-all animate-slideIn-${i+1}`}>
                            <div className="w-[32px] h-[32px] rounded-[9px] bg-gradient-to-br from-[#4a10e8] to-[#8b35ff] flex items-center justify-center text-[14px] font-extrabold text-white shadow-[0_4px_14px_rgba(90,20,220,0.45)] flex-shrink-0">
                              {d.day}
                            </div>
                            <div className="flex-1">
                              <div className="font-['Space_Grotesk'] text-[11px] font-bold italic text-white tracking-[0.2px] mb-[2px]">{d.title}</div>
                              <div className="text-[9px] text-white/35 leading-[1.45]">{d.sub}</div>
                            </div>
                            <button className="bg-gradient-to-br from-[#4a10e8] to-[#8535f5] border-none rounded-[8px] px-[14px] py-[7px] text-[9px] font-bold text-white tracking-[0.8px] uppercase cursor-pointer flex-shrink-0 flex items-center gap-[4px] shadow-[0_4px_16px_rgba(80,20,220,0.4)] hover:shadow-[0_6px_24px_rgba(80,20,220,0.65)] hover:-translate-y-[1px] transition-all">
                              EXECUTAR ↗
                            </button>
                          </div>
                        ))}
                      </div>

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── HINGE ── */}
          <div className="h-[7px] bg-gradient-to-b from-[#111] via-[#1a1a1a] to-[#111] border-x border-[#252525] relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100px] h-[3px] bg-gradient-to-r from-[#141414] via-[#242424] to-[#141414] rounded-[2px]"></div>
          </div>

          {/* ── BASE ── */}
          <div className="bg-gradient-to-b from-[#1e1e1e] via-[#181818] to-[#131313] rounded-b-[16px] border border-[#222] border-t-0 pt-[6px] relative">
            {/* base top sheen */}
            <div className="absolute top-0 left-[5%] right-[5%] h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
            <div className="flex flex-col items-center gap-[5px] px-0 py-[10px] pb-[10px]">
              <div className="w-[160px] h-[32px] bg-gradient-to-b from-[#181818] to-[#141414] border border-[#252525] rounded-[8px] shadow-[inset_0_1px_4px_rgba(0,0,0,0.5),0_1px_0_rgba(255,255,255,0.03)]"></div>
              <div className="flex flex-col items-center gap-[3px]">
                <div className="flex gap-[2px]">
                  <div className="w-[16px] h-[10px] bg-gradient-to-b from-[#1f1f1f] to-[#191919] border border-[#2a2a2a] border-b-2 border-b-black rounded-[3px]"></div>
                  {[...Array(11)].map((_, i) => (
                    <div key={i} className="w-[12px] h-[10px] bg-gradient-to-b from-[#1f1f1f] to-[#191919] border border-[#2a2a2a] border-b-2 border-b-black rounded-[3px]"></div>
                  ))}
                  <div className="w-[16px] h-[10px] bg-gradient-to-b from-[#1f1f1f] to-[#191919] border border-[#2a2a2a] border-b-2 border-b-black rounded-[3px]"></div>
                </div>
                <div className="flex gap-[2px]">
                  <div className="w-[20px] h-[10px] bg-gradient-to-b from-[#1f1f1f] to-[#191919] border border-[#2a2a2a] border-b-2 border-b-black rounded-[3px]"></div>
                  {[...Array(10)].map((_, i) => (
                    <div key={i} className="w-[12px] h-[10px] bg-gradient-to-b from-[#1f1f1f] to-[#191919] border border-[#2a2a2a] border-b-2 border-b-black rounded-[3px]"></div>
                  ))}
                  <div className="w-[20px] h-[10px] bg-gradient-to-b from-[#1f1f1f] to-[#191919] border border-[#2a2a2a] border-b-2 border-b-black rounded-[3px]"></div>
                </div>
                <div className="flex gap-[2px]">
                  <div className="w-[28px] h-[10px] bg-gradient-to-b from-[#1f1f1f] to-[#191919] border border-[#2a2a2a] border-b-2 border-b-black rounded-[3px]"></div>
                  {[...Array(8)].map((_, i) => (
                    <div key={i} className="w-[12px] h-[10px] bg-gradient-to-b from-[#1f1f1f] to-[#191919] border border-[#2a2a2a] border-b-2 border-b-black rounded-[3px]"></div>
                  ))}
                  <div className="w-[28px] h-[10px] bg-gradient-to-b from-[#1f1f1f] to-[#191919] border border-[#2a2a2a] border-b-2 border-b-black rounded-[3px]"></div>
                </div>
                <div className="flex gap-[2px]">
                  <div className="w-[16px] h-[10px] bg-gradient-to-b from-[#1f1f1f] to-[#191919] border border-[#2a2a2a] border-b-2 border-b-black rounded-[3px]"></div>
                  <div className="w-[100px] h-[10px] bg-gradient-to-b from-[#1f1f1f] to-[#191919] border border-[#2a2a2a] border-b-2 border-b-black rounded-[3px]"></div>
                  <div className="w-[16px] h-[10px] bg-gradient-to-b from-[#1f1f1f] to-[#191919] border border-[#2a2a2a] border-b-2 border-b-black rounded-[3px]"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
