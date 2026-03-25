"use client";

import React from 'react';

export function MacbookShowcase() {
  return (
    <div className="flex items-center justify-center w-full py-12 md:py-32 overflow-visible bg-transparent pointer-events-none">
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');

        .showcase-wrapper { 
          display: flex; 
          justify-content: center; 
          align-items: center; 
          font-family: 'Sora', sans-serif;
          width: 100%;
          min-height: 400px;
          perspective: 1400px;
        }

        .scene {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 40px;
          position: relative;
          transform: scale(0.4);
          transform-origin: center;
          pointer-events: none;
        }

        @media (min-width: 480px) { 
          .scene { 
            transform: scale(0.5); 
            gap: 50px;
          } 
        }

        @media (min-width: 768px) { 
          .scene { 
            flex-direction: row;
            align-items: flex-end;
            transform: scale(0.7); 
            gap: 80px; 
          } 
        }

        @media (min-width: 1024px) { 
          .scene { 
            transform: scale(0.85); 
          } 
        }

        @media (min-width: 1280px) { 
          .scene { 
            transform: scale(1); 
          } 
        }

        /* NOTEBOOK 3D */
        .notebook-wrap {
          position: relative;
          transform-style: preserve-3d;
          animation: floatNB 6s ease-in-out infinite;
        }

        @keyframes floatNB {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-10px); }
        }

        .nb-shadow {
          position: absolute;
          bottom: -40px;
          left: 50%;
          transform: translateX(-50%);
          width: 560px;
          height: 30px;
          background: radial-gradient(ellipse, rgba(109,40,217,0.35) 0%, transparent 70%);
          filter: blur(8px);
          animation: shadowNB 6s ease-in-out infinite;
        }

        @keyframes shadowNB {
          0%, 100% { opacity: 0.5; transform: translateX(-50%) scaleX(1); }
          50%       { opacity: 0.25; transform: translateX(-50%) scaleX(0.85); }
        }

        .nb-lid {
          width: 580px;
          height: 370px;
          background: linear-gradient(135deg, #2d2250 0%, #1a1535 50%, #110d28 100%);
          border-radius: 16px 16px 3px 3px;
          border: 1.5px solid rgba(255,255,255,0.09);
          border-bottom: none;
          padding: 14px;
          transform: rotateX(-8deg);
          transform-origin: bottom center;
          transform-style: preserve-3d;
          position: relative;
          box-shadow:
            inset 0 1px 0 rgba(255,255,255,0.06),
            0 -4px 30px rgba(109,40,217,0.15),
            -20px 0 40px rgba(0,0,0,0.3),
            20px 0 40px rgba(0,0,0,0.2);
        }

        .nb-screen {
          width: 100%;
          height: 100%;
          background: #07050f;
          border-radius: 8px;
          overflow: hidden;
          position: relative;
          border: 1px solid rgba(255,255,255,0.04);
        }

        .sc-bar {
          height: 32px;
          background: #0f0b22;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 14px;
          border-bottom: 1px solid rgba(255,255,255,0.04);
          flex-shrink: 0;
        }
        .sc-dots { display: flex; gap: 5px; }
        .sc-dot { width: 8px; height: 8px; border-radius: 50%; }
        .sc-brand {
          font-size: 10px; font-weight: 600; color: #a78bfa;
          letter-spacing: 2px; text-transform: uppercase;
        }
        .sc-clock {
          font-family: 'JetBrains Mono', monospace;
          font-size: 10px; color: rgba(255,255,255,0.3);
        }

        .sc-inner {
          padding: 12px 14px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          height: calc(100% - 32px);
        }

        .sc-head { display: flex; justify-content: space-between; align-items: baseline; }
        .sc-title { font-size: 12px; font-weight: 600; color: rgba(255,255,255,0.85); }
        .sc-sub   { font-family: 'JetBrains Mono', monospace; font-size: 9px; color: rgba(255,255,255,0.25); }

        .sc-kpis { display: flex; gap: 7px; }
        .sc-kpi {
          flex: 1; background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 7px; padding: 7px 9px;
        }
        .sc-kpi-lbl { font-size: 8px; color: rgba(255,255,255,0.28); text-transform: uppercase; letter-spacing: 0.7px; margin-bottom: 3px; }
        .sc-kpi-val { font-size: 14px; font-weight: 700; font-family: 'JetBrains Mono', monospace; }
        .sc-kpi-chg { font-size: 8px; margin-top: 2px; font-weight: 500; }
        .kv-p { color: #c4b5fd; } .kv-b { color: #93c5fd; } .kv-g { color: #6ee7b7; }
        .up { color: #6ee7b7; } .dn { color: #f87171; }

        .sc-chart {
          flex: 1; background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.05);
          border-radius: 9px; padding: 9px 11px; min-height: 0;
        }
        .sc-chart-lbl { font-size: 8px; color: rgba(255,255,255,0.22); text-transform: uppercase; letter-spacing: 0.8px; margin-bottom: 5px; }
        .chart-svg { width: 100%; height: 80px; display: block; }
        .chart-mos { display: flex; justify-content: space-between; margin-top: 3px; }
        .chart-mo { font-size: 7px; color: rgba(255,255,255,0.18); font-family: 'JetBrains Mono', monospace; }

        .sc-notifs { display: flex; flex-direction: column; gap: 5px; }

        .sc-notif {
          display: flex; align-items: center; gap: 8px;
          background: rgba(255,255,255,0.025);
          border: 1px solid rgba(255,255,255,0.05);
          border-radius: 7px; padding: 6px 10px;
        }
        .sc-notif:nth-child(1) { border-left: 2px solid #7c3aed; }
        .sc-notif:nth-child(2) { border-left: 2px solid #059669; }
        .sc-notif:nth-child(3) { border-left: 2px solid #2563eb; }

        .ni {
          width: 22px; height: 22px; border-radius: 6px;
          display: flex; align-items: center; justify-content: center;
          font-size: 11px; flex-shrink: 0;
        }
        .ni-p { background: rgba(124,58,237,0.25); }
        .ni-g { background: rgba(5,150,105,0.2); }
        .ni-b { background: rgba(37,99,235,0.2); }

        .ni-txt { flex: 1; }
        .ni-title { font-size: 10px; font-weight: 600; color: rgba(255,255,255,0.8); }
        .ni-desc  { font-size: 8px; color: rgba(255,255,255,0.3); margin-top: 1px; }
        .ni-time  { font-size: 8px; color: rgba(255,255,255,0.18); font-family: 'JetBrains Mono', monospace; flex-shrink: 0; }

        .nb-base-wrap {
          transform: rotateX(72deg);
          transform-origin: top center;
          margin-top: -2px;
        }
        .nb-base {
          width: 580px; height: 18px;
          background: linear-gradient(180deg, #201a40 0%, #150f30 100%);
          border-radius: 0 0 14px 14px;
          border: 1.5px solid rgba(255,255,255,0.06);
          border-top: none;
          display: flex; align-items: center; justify-content: center;
        }
        .nb-trackpad {
          width: 120px; height: 7px;
          background: rgba(0,0,0,0.4);
          border-radius: 3px;
          border: 1px solid rgba(255,255,255,0.04);
        }

        /* PHONE 3D */
        .phone-wrap {
          position: relative;
          transform-style: preserve-3d;
          margin-bottom: 18px;
          animation: floatPH 6s ease-in-out infinite;
          animation-delay: -3s;
        }

        @keyframes floatPH {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-12px); }
        }

        .ph-shadow {
          position: absolute;
          bottom: -35px; left: 50%;
          transform: translateX(-50%);
          width: 140px; height: 24px;
          background: radial-gradient(ellipse, rgba(109,40,217,0.4) 0%, transparent 70%);
          filter: blur(8px);
          animation: shadowPH 6s ease-in-out infinite;
          animation-delay: -3s;
        }
        @keyframes shadowPH {
          0%, 100% { opacity: 0.5; }
          50%       { opacity: 0.2; }
        }

        .ph-body {
          width: 188px; height: 390px;
          background: linear-gradient(145deg, #24203e 0%, #161228 60%, #0f0c22 100%);
          border-radius: 40px;
          padding: 10px;
          border: 1.5px solid rgba(255,255,255,0.1);
          transform: rotateY(-14deg) rotateX(4deg);
          transform-style: preserve-3d;
          position: relative;
          box-shadow:
            inset 0 1px 0 rgba(255,255,255,0.07),
            14px 0 35px rgba(0,0,0,0.5),
            -6px 0 20px rgba(109,40,217,0.1),
            0 30px 50px rgba(0,0,0,0.4);
        }

        .ph-screen {
          width: 100%; height: 100%;
          background: #080614;
          border-radius: 32px;
          overflow: hidden;
          position: relative;
        }

        .ph-bg { position: absolute; inset: 0; overflow: hidden; }
        .ph-blob {
          position: absolute; border-radius: 50%;
          filter: blur(35px); opacity: 0.3;
        }
        .pb1 { width: 180px; height: 180px; background: #6d28d9; top: -50px; left: -50px; }
        .pb2 { width: 140px; height: 140px; background: #1d4ed8; bottom: 80px; right: -30px; }
        .pb3 { width: 110px; height: 110px; background: #065f46; top: 160px; left: -20px; }

        .ph-island {
          width: 82px; height: 26px; background: #000;
          border-radius: 20px; margin: 12px auto 0;
          position: relative; z-index: 10;
        }

        .ph-clock-block {
          position: relative; z-index: 5;
          text-align: center; padding-top: 18px;
        }
        .ph-clock {
          font-size: 44px; font-weight: 200;
          color: rgba(255,255,255,0.92);
          letter-spacing: -2px; line-height: 1;
        }
        .ph-date { font-size: 10px; color: rgba(255,255,255,0.38); margin-top: 4px; }

        .ph-notifs {
          position: relative; z-index: 5;
          padding: 12px 8px 0;
          display: flex; flex-direction: column; gap: 5px;
        }

        .ph-notif-lbl {
          font-size: 8px; color: rgba(255,255,255,0.22);
          text-transform: uppercase; letter-spacing: 1px;
          padding-left: 2px; margin-bottom: 1px;
        }

        .ph-notif {
          background: rgba(20,16,40,0.78);
          border: 1px solid rgba(255,255,255,0.09);
          border-radius: 14px; padding: 8px 10px;
        }

        .ph-notif-top {
          display: flex; align-items: center; gap: 5px; margin-bottom: 3px;
        }
        .ph-ni {
          width: 16px; height: 16px; border-radius: 4px;
          display: flex; align-items: center; justify-content: center;
          font-size: 9px; flex-shrink: 0;
        }
        .pn-p { background: rgba(124,58,237,0.45); }
        .pn-g { background: rgba(5,150,105,0.35); }
        .pn-b { background: rgba(37,99,235,0.35); }

        .ph-notif-app  { font-size: 8px; font-weight: 600; color: rgba(255,255,255,0.32); text-transform: uppercase; letter-spacing: 0.7px; flex: 1; }
        .ph-notif-time { font-size: 7px; color: rgba(255,255,255,0.2); font-family: 'JetBrains Mono', monospace; }
        .ph-notif-title { font-size: 10px; font-weight: 600; color: rgba(255,255,255,0.88); line-height: 1.3; }
        .ph-notif-body  { font-size: 8px; color: rgba(255,255,255,0.38); margin-top: 1px; line-height: 1.3; }

        .ph-dock {
          position: absolute; bottom: 12px; left: 8px; right: 8px;
          background: rgba(255,255,255,0.07);
          border: 1px solid rgba(255,255,255,0.09);
          border-radius: 20px; padding: 8px 12px;
          display: flex; justify-content: space-around; z-index: 5;
        }
        .ph-dock-icon {
          width: 28px; height: 28px; border-radius: 8px;
          display: flex; align-items: center; justify-content: center; font-size: 14px;
        }
        .di1 { background: rgba(124,58,237,0.55); }
        .di2 { background: rgba(5,150,105,0.45); }
        .di3 { background: rgba(37,99,235,0.45); }
        .di4 { background: rgba(217,119,6,0.45); }
      `}} />

      <div className="showcase-wrapper">
        <div className="scene">
          {/* NOTEBOOK */}
          <div className="notebook-wrap">
            <div className="nb-shadow"></div>

            <div className="nb-lid">
              <div className="nb-screen">

                <div className="sc-bar">
                  <div className="sc-dots">
                    <div className="sc-dot" style={{background:'#ff5f57'}}></div>
                    <div className="sc-dot" style={{background:'#febc2e'}}></div>
                    <div className="sc-dot" style={{background:'#28c840'}}></div>
                  </div>
                  <div className="sc-brand">FlowPro</div>
                  <div className="sc-clock">14:32</div>
                </div>

                <div className="sc-inner">
                  <div className="sc-head">
                    <span className="sc-title">Painel de Vendas</span>
                    <span className="sc-sub">Mar 2026 · ao vivo</span>
                  </div>

                  <div className="sc-kpis">
                    <div className="sc-kpi">
                      <div className="sc-kpi-lbl">Receita</div>
                      <div className="sc-kpi-val kv-p">R$84,2K</div>
                      <div className="sc-kpi-chg up">↑ 12,4%</div>
                    </div>
                    <div className="sc-kpi">
                      <div className="sc-kpi-lbl">Pedidos</div>
                      <div className="sc-kpi-val kv-b">1.348</div>
                      <div className="sc-kpi-chg up">↑ 8,1%</div>
                    </div>
                    <div className="sc-kpi">
                      <div className="sc-kpi-lbl">Ticket Médio</div>
                      <div className="sc-kpi-val kv-g">R$62,5</div>
                      <div className="sc-kpi-chg dn">↓ 1,3%</div>
                    </div>
                    <div className="sc-kpi">
                      <div className="sc-kpi-lbl">Conversão</div>
                      <div className="sc-kpi-val kv-p">3,7%</div>
                      <div className="sc-kpi-chg up">↑ 0,4%</div>
                    </div>
                  </div>

                  <div className="sc-chart">
                    <div className="sc-chart-lbl">Vendas mensais · 2026</div>
                    <svg className="chart-svg" viewBox="0 0 520 80" preserveAspectRatio="none">
                      <defs>
                        <linearGradient id="aGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.45"/>
                          <stop offset="100%" stopColor="#7c3aed" stopOpacity="0"/>
                        </linearGradient>
                        <linearGradient id="lGrad" x1="0" y1="0" x2="1" y2="0">
                          <stop offset="0%" stopColor="#4c1d95"/>
                          <stop offset="60%" stopColor="#7c3aed"/>
                          <stop offset="100%" stopColor="#c4b5fd"/>
                        </linearGradient>
                      </defs>
                      <line x1="0" y1="20" x2="520" y2="20" stroke="rgba(255,255,255,0.04)" strokeWidth="1"/>
                      <line x1="0" y1="40" x2="520" y2="40" stroke="rgba(255,255,255,0.04)" strokeWidth="1"/>
                      <line x1="0" y1="60" x2="520" y2="60" stroke="rgba(255,255,255,0.04)" strokeWidth="1"/>
                      <path d="M0,68 C40,68 60,54 104,50 C148,46 148,36 173,32 C198,28 230,44 260,42 C290,40 310,22 347,18 C384,14 400,28 433,22 C466,16 480,10 520,6 L520,80 L0,80 Z" fill="url(#aGrad)"/>
                      <path d="M0,68 C40,68 60,54 104,50 C148,46 148,36 173,32 C198,28 230,44 260,42 C290,40 310,22 347,18 C384,14 400,28 433,22 C466,16 480,10 520,6" fill="none" stroke="url(#lGrad)" strokeWidth="2" strokeLinecap="round"/>
                      <circle cx="104" cy="50" r="2.5" fill="#7c3aed"/>
                      <circle cx="173" cy="32" r="2.5" fill="#7c3aed"/>
                      <circle cx="260" cy="42" r="2.5" fill="#7c3aed"/>
                      <circle cx="347" cy="18" r="2.5" fill="#a78bfa"/>
                      <circle cx="433" cy="22" r="2.5" fill="#7c3aed"/>
                      <circle cx="520" cy="6"  r="3.5" fill="#fff" stroke="#8b5cf6" strokeWidth="2"/>
                      <rect x="436" y="0" width="80" height="16" rx="4" fill="rgba(109,40,217,0.85)"/>
                      <text x="476" y="11" fill="#fff" fontSize="8" fontFamily="JetBrains Mono, monospace" textAnchor="middle" fontWeight="500">R$84.2K ▲</text>
                    </svg>
                    <div className="chart-mos">
                      <span className="chart-mo">Out</span>
                      <span className="chart-mo">Nov</span>
                      <span className="chart-mo">Dez</span>
                      <span className="chart-mo">Jan</span>
                      <span className="chart-mo">Fev</span>
                      <span className="chart-mo">Mar</span>
                    </div>
                  </div>

                  <div className="sc-notifs">
                    <div className="sc-notif">
                      <div className="ni ni-p">🛒</div>
                      <div className="ni-txt">
                        <div className="ni-title">Nova venda · R$349,00</div>
                        <div className="ni-desc">Plano Anual Pro · João Martins</div>
                      </div>
                      <div className="ni-time">agora</div>
                    </div>
                    <div className="sc-notif">
                      <div className="ni ni-g">🎯</div>
                      <div className="ni-txt">
                        <div className="ni-title">Meta diária atingida!</div>
                        <div className="ni-desc">102% da meta · R$8.420 hoje</div>
                      </div>
                      <div className="ni-time">2 min</div>
                    </div>
                    <div className="sc-notif">
                      <div className="ni ni-b">📦</div>
                      <div className="ni-txt">
                        <div className="ni-title">Pedido #4821 confirmado</div>
                        <div className="ni-desc">3 itens · Pagamento aprovado</div>
                      </div>
                      <div className="ni-time">5 min</div>
                    </div>
                  </div>

                </div>
              </div>
            </div>

            <div className="nb-base-wrap">
              <div className="nb-base">
                <div className="nb-trackpad"></div>
              </div>
            </div>
          </div>

          {/* PHONE */}
          <div className="phone-wrap">
            <div className="ph-shadow"></div>

            <div className="ph-body">
              <div className="ph-screen">
                <div className="ph-bg">
                  <div className="ph-blob pb1"></div>
                  <div className="ph-blob pb2"></div>
                  <div className="ph-blob pb3"></div>
                </div>

                <div className="ph-island"></div>

                <div className="ph-clock-block">
                  <div className="ph-clock">14:32</div>
                  <div className="ph-date">Segunda, 24 de Março</div>
                </div>

                <div className="ph-notifs">
                  <div className="ph-notif-lbl">FlowPro · Vendas</div>

                  <div className="ph-notif">
                    <div className="ph-notif-top">
                      <div className="ph-ni pn-p">🛒</div>
                      <span className="ph-notif-app">FlowPro</span>
                      <span className="ph-notif-time">agora</span>
                    </div>
                    <div className="ph-notif-title">Nova venda · R$349</div>
                    <div className="ph-notif-body">Plano Anual Pro · João Martins</div>
                  </div>

                  <div className="ph-notif">
                    <div className="ph-notif-top">
                      <div className="ph-ni pn-g">🎯</div>
                      <span className="ph-notif-app">FlowPro</span>
                      <span className="ph-notif-time">2 min</span>
                    </div>
                    <div className="ph-notif-title">Meta diária atingida!</div>
                    <div className="ph-notif-body">102% da meta · R$8.420 hoje</div>
                  </div>

                  <div className="ph-notif">
                    <div className="ph-notif-top">
                      <div className="ph-ni pn-b">📦</div>
                      <span className="ph-notif-app">FlowPro</span>
                      <span className="ph-notif-time">5 min</span>
                    </div>
                    <div className="ph-notif-title">Pedido #4821 confirmado</div>
                    <div className="ph-notif-body">3 itens · Pagamento aprovado</div>
                  </div>
                </div>

                <div className="ph-dock">
                  <div className="ph-dock-icon di1">📊</div>
                  <div className="ph-dock-icon di2">💬</div>
                  <div className="ph-dock-icon di3">📧</div>
                  <div className="ph-dock-icon di4">⚙️</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
