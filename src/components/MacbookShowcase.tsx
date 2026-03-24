
"use client";

import React from 'react';

export function MacbookShowcase() {
  return (
    <div className="flex items-center justify-center w-full py-20 overflow-hidden bg-transparent">
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=DM+Mono:wght@400;500&display=swap');

        .showcase-wrapper { 
          display: flex; 
          justify-content: center; 
          align-items: center; 
          font-family: 'DM Sans', sans-serif;
        }

        .scene {
          display: flex;
          align-items: flex-end;
          gap: 60px;
          position: relative;
          transform: scale(0.35);
          transform-origin: center;
        }

        @media (min-width: 640px) { .scene { transform: scale(0.5); } }
        @media (min-width: 768px) { .scene { transform: scale(0.7); } }
        @media (min-width: 1024px) { .scene { transform: scale(1); } }

        /* ========== NOTEBOOK ========== */
        .notebook {
          position: relative;
          filter: drop-shadow(0 40px 80px rgba(80,50,180,0.22)) drop-shadow(0 10px 30px rgba(0,0,0,0.18));
        }

        .nb-lid {
          width: 620px;
          height: 390px;
          background: linear-gradient(145deg, #2a2040 0%, #1a1530 60%, #130f25 100%);
          border-radius: 18px 18px 4px 4px;
          padding: 16px;
          position: relative;
          border: 1.5px solid rgba(255,255,255,0.07);
        }

        .nb-screen {
          width: 100%;
          height: 100%;
          background: #0d0a1e;
          border-radius: 10px;
          overflow: hidden;
          position: relative;
        }

        .sc-topbar {
          background: #130f28;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 16px;
          border-bottom: 1px solid rgba(255,255,255,0.05);
        }

        .sc-topbar-logo {
          font-size: 11px;
          font-weight: 600;
          color: #9d8fff;
          letter-spacing: 1.5px;
          text-transform: uppercase;
        }

        .sc-topbar-time {
          font-family: 'DM Mono', monospace;
          font-size: 11px;
          color: rgba(255,255,255,0.35);
        }

        .sc-topbar-dots {
          display: flex;
          gap: 5px;
        }

        .sc-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
        }

        .sc-content {
          padding: 14px 16px;
          height: calc(100% - 36px);
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .sc-title-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .sc-title {
          font-size: 13px;
          font-weight: 600;
          color: rgba(255,255,255,0.85);
          letter-spacing: 0.3px;
        }

        .sc-subtitle {
          font-size: 10px;
          color: rgba(255,255,255,0.3);
          font-family: 'DM Mono', monospace;
        }

        .sc-metrics {
          display: flex;
          gap: 8px;
        }

        .sc-metric {
          flex: 1;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 8px;
          padding: 8px 10px;
        }

        .sc-metric-label {
          font-size: 9px;
          color: rgba(255,255,255,0.3);
          text-transform: uppercase;
          letter-spacing: 0.8px;
          margin-bottom: 4px;
        }

        .sc-metric-value {
          font-size: 16px;
          font-weight: 700;
          font-family: 'DM Mono', monospace;
        }

        .sc-metric-change {
          font-size: 9px;
          margin-top: 2px;
          font-weight: 500;
        }

        .up { color: #6ee7b7; }
        .down { color: #f87171; }
        .v-purple { color: #c4b5fd; }
        .v-blue   { color: #93c5fd; }
        .v-green  { color: #6ee7b7; }

        .sc-chart-wrap {
          flex: 1;
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.05);
          border-radius: 10px;
          padding: 10px 12px;
          position: relative;
          overflow: hidden;
        }

        .sc-chart-label {
          font-size: 9px;
          color: rgba(255,255,255,0.25);
          text-transform: uppercase;
          letter-spacing: 0.8px;
          margin-bottom: 6px;
        }

        .chart-svg {
          width: 100%;
          height: 90px;
        }

        .chart-months {
          display: flex;
          justify-content: space-between;
          padding: 0 2px;
          margin-top: 4px;
        }

        .chart-month {
          font-size: 8px;
          color: rgba(255,255,255,0.2);
          font-family: 'DM Mono', monospace;
        }

        .sc-notifs {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }

        .sc-notif {
          display: flex;
          align-items: center;
          gap: 8px;
          background: rgba(255,255,255,0.025);
          border: 1px solid rgba(255,255,255,0.05);
          border-radius: 7px;
          padding: 6px 10px;
          animation: slideIn 0.4s ease both;
        }

        @keyframes slideIn {
          from { opacity: 0; transform: translateX(8px); }
          to { opacity: 1; transform: translateX(0); }
        }

        .sc-notif:nth-child(1) { animation-delay: 0.1s; border-left: 2px solid #7c3aed; }
        .sc-notif:nth-child(2) { animation-delay: 0.2s; border-left: 2px solid #6ee7b7; }
        .sc-notif:nth-child(3) { animation-delay: 0.3s; border-left: 2px solid #93c5fd; }

        .notif-icon {
          width: 22px;
          height: 22px;
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 11px;
          flex-shrink: 0;
        }

        .ni-purple { background: rgba(124,58,237,0.25); color: #c4b5fd; }
        .ni-green  { background: rgba(110,231,183,0.15); color: #6ee7b7; }
        .ni-blue   { background: rgba(147,197,253,0.15); color: #93c5fd; }

        .notif-text { flex: 1; }
        .notif-title {
          font-size: 10px;
          font-weight: 600;
          color: rgba(255,255,255,0.8);
        }
        .notif-desc {
          font-size: 9px;
          color: rgba(255,255,255,0.3);
          margin-top: 1px;
        }
        .notif-time {
          font-size: 8px;
          color: rgba(255,255,255,0.2);
          font-family: 'DM Mono', monospace;
          flex-shrink: 0;
        }

        .nb-base {
          width: 680px;
          height: 22px;
          background: linear-gradient(180deg, #2e2448 0%, #1e1738 100%);
          border-radius: 0 0 16px 16px;
          margin: 0 auto;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1.5px solid rgba(255,255,255,0.06);
          border-top: none;
        }

        .nb-trackpad-area {
          width: 140px;
          height: 8px;
          background: rgba(0,0,0,0.3);
          border-radius: 3px;
          border: 1px solid rgba(255,255,255,0.05);
        }

        .nb-feet {
          display: flex;
          justify-content: space-between;
          padding: 0 30px;
          width: 680px;
          margin-top: 2px;
        }

        .nb-foot {
          width: 60px;
          height: 5px;
          background: #12102a;
          border-radius: 0 0 4px 4px;
        }

        /* ========== PHONE ========== */
        .phone {
          position: relative;
          filter: drop-shadow(0 30px 60px rgba(0,0,0,0.35)) drop-shadow(0 8px 20px rgba(80,50,180,0.15));
          margin-bottom: 22px;
        }

        .ph-body {
          width: 190px;
          height: 380px;
          background: linear-gradient(160deg, #1e1a38 0%, #130f25 100%);
          border-radius: 36px;
          padding: 10px;
          border: 1.5px solid rgba(255,255,255,0.1);
          position: relative;
        }

        .ph-body::before {
          content: '';
          position: absolute;
          right: -4px;
          top: 80px;
          width: 4px;
          height: 55px;
          background: #1a1630;
          border-radius: 0 4px 4px 0;
        }

        .ph-body::after {
          content: '';
          position: absolute;
          left: -4px;
          top: 70px;
          width: 4px;
          height: 35px;
          background: #1a1630;
          border-radius: 4px 0 0 4px;
          box-shadow: 0 44px 0 #1a1630;
        }

        .ph-screen {
          width: 100%;
          height: 100%;
          background: #0a0818;
          border-radius: 28px;
          overflow: hidden;
          position: relative;
        }

        .ph-island {
          width: 80px;
          height: 26px;
          background: #000;
          border-radius: 20px;
          margin: 10px auto 0;
          position: relative;
          z-index: 10;
        }

        .ph-wallpaper {
          position: absolute;
          inset: 0;
          overflow: hidden;
        }

        .ph-wallpaper-circle {
          position: absolute;
          border-radius: 50%;
          filter: blur(28px);
          opacity: 0.35;
        }

        .pwc1 { width: 160px; height: 160px; background: #6d28d9; top: -40px; left: -40px; }
        .pwc2 { width: 120px; height: 120px; background: #2563eb; bottom: 60px; right: -20px; }
        .pwc3 { width: 100px; height: 100px; background: #059669; top: 180px; left: -20px; }

        .ph-top {
          position: relative;
          z-index: 5;
          text-align: center;
          padding-top: 44px;
        }

        .ph-clock {
          font-size: 38px;
          font-weight: 300;
          color: rgba(255,255,255,0.9);
          letter-spacing: -1px;
          line-height: 1;
        }

        .ph-date {
          font-size: 11px;
          color: rgba(255,255,255,0.45);
          margin-top: 4px;
          letter-spacing: 0.3px;
        }

        .ph-notifs {
          position: relative;
          z-index: 5;
          padding: 16px 10px 0;
          display: flex;
          flex-direction: column;
          gap: 7px;
        }

        .ph-notif-group-label {
          font-size: 9px;
          color: rgba(255,255,255,0.25);
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 2px;
          padding-left: 2px;
        }

        .ph-notif {
          background: rgba(255,255,255,0.07);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 14px;
          padding: 9px 11px;
          animation: fadeUp 0.5s ease both;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .ph-notif:nth-child(2) { animation-delay: 0.15s; }
        .ph-notif:nth-child(3) { animation-delay: 0.3s; }

        .ph-notif-header {
          display: flex;
          align-items: center;
          gap: 6px;
          margin-bottom: 4px;
        }

        .ph-notif-icon {
          width: 16px;
          height: 16px;
          border-radius: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 9px;
          flex-shrink: 0;
        }

        .pni-p { background: rgba(139,92,246,0.4); color: #ddd6fe; }
        .pni-g { background: rgba(16,185,129,0.3); color: #6ee7b7; }
        .pni-b { background: rgba(59,130,246,0.3); color: #93c5fd; }

        .ph-notif-app {
          font-size: 9px;
          font-weight: 600;
          color: rgba(255,255,255,0.4);
          text-transform: uppercase;
          letter-spacing: 0.8px;
          flex: 1;
        }

        .ph-notif-time {
          font-size: 8px;
          color: rgba(255,255,255,0.2);
          font-family: 'DM Mono', monospace;
        }

        .ph-notif-title {
          font-size: 11px;
          font-weight: 600;
          color: rgba(255,255,255,0.85);
          margin-bottom: 1px;
        }

        .ph-notif-body {
          font-size: 9px;
          color: rgba(255,255,255,0.4);
          line-height: 1.4;
        }

        .ph-dock {
          position: absolute;
          bottom: 14px;
          left: 10px;
          right: 10px;
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 20px;
          padding: 8px 14px;
          display: flex;
          justify-content: space-around;
          align-items: center;
          z-index: 5;
        }

        .dock-icon {
          width: 28px;
          height: 28px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
        }

        .di-1 { background: rgba(124,58,237,0.5); }
        .di-2 { background: rgba(16,185,129,0.4); }
        .di-3 { background: rgba(59,130,246,0.4); }
        .di-4 { background: rgba(245,158,11,0.4); }

        .nb-glow {
          position: absolute;
          bottom: -30px;
          left: 50%;
          transform: translateX(-50%);
          width: 500px;
          height: 60px;
          background: radial-gradient(ellipse, rgba(124,58,237,0.25) 0%, transparent 70%);
          pointer-events: none;
        }

        .ph-glow {
          position: absolute;
          bottom: -20px;
          left: 50%;
          transform: translateX(-50%);
          width: 160px;
          height: 40px;
          background: radial-gradient(ellipse, rgba(124,58,237,0.2) 0%, transparent 70%);
          pointer-events: none;
        }
      `}} />

      <div className="showcase-wrapper">
        <div className="scene">
          {/* NOTEBOOK */}
          <div className="notebook">
            <div className="nb-lid">
              <div className="nb-screen">
                {/* Top bar */}
                <div className="sc-topbar">
                  <div className="sc-topbar-dots">
                    <div className="sc-dot" style={{background:'#ff5f57'}}></div>
                    <div className="sc-dot" style={{background:'#febc2e'}}></div>
                    <div className="sc-dot" style={{background:'#28c840'}}></div>
                  </div>
                  <div className="sc-topbar-logo">FlowPro</div>
                  <div className="sc-topbar-time">14:32</div>
                </div>

                {/* Main content */}
                <div className="sc-content">
                  <div className="sc-title-row">
                    <div className="sc-title">Painel de Vendas</div>
                    <div className="sc-subtitle">Mar 2026 · Tempo real</div>
                  </div>

                  <div className="sc-metrics">
                    <div className="sc-metric">
                      <div className="sc-metric-label">Receita</div>
                      <div className="sc-metric-value v-purple">R$84,2K</div>
                      <div className="sc-metric-change up">↑ 12,4%</div>
                    </div>
                    <div className="sc-metric">
                      <div className="sc-metric-label">Pedidos</div>
                      <div className="sc-metric-value v-blue">1.348</div>
                      <div className="sc-metric-change up">↑ 8,1%</div>
                    </div>
                    <div className="sc-metric">
                      <div className="sc-metric-label">Ticket Médio</div>
                      <div className="sc-metric-value v-green">R$62,5</div>
                      <div className="sc-metric-change down">↓ 1,3%</div>
                    </div>
                    <div className="sc-metric">
                      <div className="sc-metric-label">Conversão</div>
                      <div className="sc-metric-value v-purple">3,7%</div>
                      <div className="sc-metric-change up">↑ 0,4%</div>
                    </div>
                  </div>

                  <div className="sc-chart-wrap">
                    <div className="sc-chart-label">Vendas mensais · 2026</div>
                    <svg className="chart-svg" viewBox="0 0 540 90" preserveAspectRatio="none">
                      <defs>
                        <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.4"/>
                          <stop offset="100%" stopColor="#7c3aed" stopOpacity="0"/>
                        </linearGradient>
                        <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
                          <stop offset="0%" stopColor="#6d28d9"/>
                          <stop offset="50%" stopColor="#8b5cf6"/>
                          <stop offset="100%" stopColor="#c4b5fd"/>
                        </linearGradient>
                      </defs>
                      <line x1="0" y1="22" x2="540" y2="22" stroke="rgba(255,255,255,0.04)" strokeWidth="1"/>
                      <line x1="0" y1="44" x2="540" y2="44" stroke="rgba(255,255,255,0.04)" strokeWidth="1"/>
                      <line x1="0" y1="66" x2="540" y2="66" stroke="rgba(255,255,255,0.04)" strokeWidth="1"/>
                      <path d="M 0,72 C 54,72 54,60 90,58 C 126,56 126,42 180,38 C 234,34 234,50 270,48 C 306,46 306,28 360,22 C 414,16 414,30 450,26 C 486,22 486,15 540,10 L 540,90 L 0,90 Z" fill="url(#chartGrad)"/>
                      <path d="M 0,72 C 54,72 54,60 90,58 C 126,56 126,42 180,38 C 234,34 234,50 270,48 C 306,46 306,28 360,22 C 414,16 414,30 450,26 C 486,22 486,15 540,10" fill="none" stroke="url(#lineGrad)" strokeWidth="2" strokeLinecap="round"/>
                      <circle cx="90" cy="58" r="3" fill="#8b5cf6"/>
                      <circle cx="180" cy="38" r="3" fill="#8b5cf6"/>
                      <circle cx="270" cy="48" r="3" fill="#8b5cf6"/>
                      <circle cx="360" cy="22" r="3" fill="#c4b5fd"/>
                      <circle cx="450" cy="26" r="3" fill="#8b5cf6"/>
                      <circle cx="540" cy="10" r="4" fill="#fff" stroke="#8b5cf6" strokeWidth="2"/>
                      <rect x="460" y="0" width="76" height="18" rx="4" fill="rgba(124,58,237,0.8)"/>
                      <text x="498" y="12" fill="#fff" fontSize="9" fontFamily="DM Mono, monospace" textAnchor="middle" fontWeight="500">R$84.2K ▲</text>
                    </svg>
                    <div className="chart-months">
                      <span className="chart-month">Out</span>
                      <span className="chart-month">Nov</span>
                      <span className="chart-month">Dez</span>
                      <span className="chart-month">Jan</span>
                      <span className="chart-month">Fev</span>
                      <span className="chart-month">Mar</span>
                    </div>
                  </div>

                  <div className="sc-notifs">
                    <div className="sc-notif">
                      <div className="notif-icon ni-purple">🛒</div>
                      <div className="notif-text">
                        <div className="notif-title">Nova venda · R$349,00</div>
                        <div className="notif-desc">Plano Anual Pro · João Martins</div>
                      </div>
                      <div className="notif-time">agora</div>
                    </div>
                    <div className="sc-notif">
                      <div className="notif-icon ni-green">🎯</div>
                      <div className="notif-text">
                        <div className="notif-title">Meta diária atingida!</div>
                        <div className="notif-desc">102% da meta · R$8.420 hoje</div>
                      </div>
                      <div className="notif-time">2 min</div>
                    </div>
                    <div className="sc-notif">
                      <div className="notif-icon ni-blue">📦</div>
                      <div className="notif-text">
                        <div className="notif-title">Pedido #4821 confirmado</div>
                        <div className="notif-desc">3 itens · Pagamento aprovado</div>
                      </div>
                      <div className="notif-time">5 min</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="nb-base">
              <div className="nb-trackpad-area"></div>
            </div>
            <div className="nb-feet">
              <div className="nb-foot"></div>
              <div className="nb-foot"></div>
            </div>
            <div className="nb-glow"></div>
          </div>

          {/* PHONE */}
          <div className="phone">
            <div className="ph-body">
              <div className="ph-screen">
                <div className="ph-wallpaper">
                  <div className="ph-wallpaper-circle pwc1"></div>
                  <div className="ph-wallpaper-circle pwc2"></div>
                  <div className="ph-wallpaper-circle pwc3"></div>
                </div>
                <div className="ph-island"></div>
                <div className="ph-top">
                  <div className="ph-clock">14:32</div>
                  <div className="ph-date">Segunda-feira, 23 de Março</div>
                </div>
                <div className="ph-notifs">
                  <div className="ph-notif-group-label">Notificações de Vendas</div>
                  <div className="ph-notif">
                    <div className="ph-notif-header">
                      <div className="ph-notif-icon pni-p">💜</div>
                      <span className="ph-notif-app">FlowPro</span>
                      <span className="ph-notif-time">agora</span>
                    </div>
                    <div className="ph-notif-title">🛒 Nova venda · R$349</div>
                    <div className="ph-notif-body">Plano Anual Pro — João Martins</div>
                  </div>
                  <div className="ph-notif">
                    <div className="ph-notif-header">
                      <div className="ph-notif-icon pni-g">🎯</div>
                      <span className="ph-notif-app">FlowPro</span>
                      <span className="ph-notif-time">2 min</span>
                    </div>
                    <div className="ph-notif-title">Meta diária atingida!</div>
                    <div className="ph-notif-body">102% · R$8.420 hoje</div>
                  </div>
                  <div className="ph-notif">
                    <div className="ph-notif-header">
                      <div className="ph-notif-icon pni-b">📦</div>
                      <span className="ph-notif-app">FlowPro</span>
                      <span className="ph-notif-time">5 min</span>
                    </div>
                    <div className="ph-notif-title">Pedido #4821 confirmado</div>
                    <div className="ph-notif-body">3 itens · Pagamento aprovado</div>
                  </div>
                </div>
                <div className="ph-dock">
                  <div className="dock-icon di-1">📊</div>
                  <div className="dock-icon di-2">💬</div>
                  <div className="dock-icon di-3">📧</div>
                  <div className="dock-icon di-4">⚙️</div>
                </div>
              </div>
            </div>
            <div className="ph-glow"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
