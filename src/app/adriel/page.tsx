
"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  MessageSquare, 
  Target, 
  Route, 
  Star,
  Zap,
  CheckCircle2,
  Infinity,
  ArrowRight,
  ShieldCheck,
  Check,
  TrendingUp,
  Timer
} from 'lucide-react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from '@/lib/utils';

// Carregamento dinâmico do Globo para performance
const Globe = dynamic(() => import('@/components/ui/cobe-globe').then(m => ({ default: m.Globe })), { 
  ssr: false, 
  loading: () => <div className="w-full h-full bg-primary/5 rounded-full blur-xl animate-pulse" /> 
});

const LOGO_URL = "https://s3.typebot.io/public/workspaces/cmml2oniw000g04l7gwmqelu1/typebots/cmn1vyjog000104la10d6sdzu/blocks/ywpf1hja4q4bxg9gzqobiz93?v=1774307470623";

const TESTIMONIALS = [
  { 
    text: "Eu nunca tinha vendido nada online. Usei o script de IA para falar com uma pizzaria e fechei meu primeiro contrato em menos de uma semana.",
    author: "Ana Oliveira", context: "Especialista em Escala"
  },
  { 
    text: "O Radar de Leads é bizarro. Achei 50 dentistas na minha cidade e a IA gerou abordagens que todos responderam. Já faturei R$ 3.500.",
    author: "Bruno Silva", context: "Consultor Fase 1"
  },
  { 
    text: "A barreira de não saber o que falar sumiu. Copiei o script da IA, mandei no WhatsApp e o cliente fechou na hora. Simples assim.",
    author: "Juliana Reus", context: "Venda em 48h"
  }
];

const CHECKOUT_MENSAL = "https://go.flowproia.shop/PPU38CQAPQM";
const CHECKOUT_TRIMESTRAL = "https://go.flowproia.shop/PPU38CQAPQR";
const CHECKOUT_VITALICIO = "https://go.flowproia.shop/PPU38CQAPQL";

export default function AdrielLandingPage() {
  const [timeLeft, setTimeLeft] = useState({ h: '23', m: '59', s: '59' });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const midnight = new Date();
      midnight.setHours(24, 0, 0, 0);
      const diff = midnight.getTime() - now.getTime();

      if (diff <= 0) {
        setTimeLeft({ h: '00', m: '00', s: '00' });
        return;
      }

      const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const m = Math.floor((diff / (1000 * 60)) % 60);
      const s = Math.floor((diff / 1000) % 60);

      setTimeLeft({
        h: h.toString().padStart(2, '0'),
        m: m.toString().padStart(2, '0'),
        s: s.toString().padStart(2, '0')
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const scrollToPricing = () => {
    document.getElementById('precos')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="flex flex-col min-h-screen text-white bg-[#05050f] overflow-x-hidden relative">
      <nav className="fixed top-0 w-full h-[64px] bg-[#05050f]/80 backdrop-blur-xl border-b border-white/5 z-50 px-6 md:px-12 flex items-center justify-between">
        <div className="flex items-center gap-12">
          <Link href="/" className="flex items-center gap-2" prefetch={false}>
            <div className="relative h-6 w-24">
              <Image src={LOGO_URL} alt="FlowPro" fill className="object-contain" sizes="96px" priority />
            </div>
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <Link href="#arsenal" className="text-[13px] font-medium text-white/50 hover:text-white transition-colors">Arsenal</Link>
            <button onClick={scrollToPricing} className="text-[13px] font-medium text-white/50 hover:text-white transition-colors">Preços</button>
            <Link href="#faq" className="text-[13px] font-medium text-white/50 hover:text-white transition-colors">Dúvidas</Link>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/auth" className="text-[13px] text-white/50 hover:text-white transition-colors font-medium px-2">Entrar</Link>
          <Button onClick={scrollToPricing} className="bg-[#6d28d9] hover:bg-[#7c3aed] text-white font-bold text-[12px] h-10 px-6 rounded-xl border-none shadow-lg shadow-primary/20">
            Acessar Agora
          </Button>
        </div>
      </nav>

      <main className="relative z-10 pt-[64px]">
        <section className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-32">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
            <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-8 flex-1 max-w-2xl">
              <Badge className="bg-primary/15 border border-primary/30 text-primary text-[10px] md:text-[12px] font-medium px-4 py-1.5 rounded-full flex items-center gap-2 shadow-none">
                ✦ 1.800+ consultores ativos
              </Badge>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.1] text-white">
                Seu primeiro cliente<br className="hidden sm:block" />
                <span className="text-primary italic">começa com um script.</span>
              </h1>
              <p className="text-lg text-white/60 max-w-xl leading-relaxed">
                Encontre leads qualificados, gere abordagens com IA e realize sua primeira venda em tempo recorde com o método exclusivo.
              </p>
              <Button 
                onClick={scrollToPricing} 
                size="lg" 
                className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-widest text-[14px] h-[64px] px-12 rounded-2xl shadow-lg transition-all"
              >
                Acessar agora
              </Button>
            </div>
            <div className="hidden lg:flex flex-1 items-center justify-center relative min-h-[500px]">
              <div className="relative w-full max-w-[440px] aspect-square z-10">
                <Globe className="w-full h-full" dark={1} speed={0.004} diffuse={1.2} />
              </div>
            </div>
          </div>
        </section>

        <section id="precos" className="max-w-7xl mx-auto px-6 md:px-12 py-24 md:py-32 relative">
          <div className="text-center space-y-6 mb-20">
            <Badge className="bg-primary/20 text-primary border border-primary/30 uppercase tracking-[0.3em] text-[10px] px-6 py-2 rounded-full">ROTA DE ESCALA</Badge>
            <h2 className="text-4xl md:text-7xl font-black italic uppercase tracking-tighter leading-tight text-white">
              Domine o mercado <br /><span className="text-primary shimmer-text">com poder IA.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            {/* PLANO MENSAL */}
            <Card className="bg-white/[0.02] border-amber-500/40 p-10 flex flex-col justify-between rounded-[2.5rem] border shadow-sm">
              <div className="space-y-8">
                <h3 className="text-xs font-black uppercase tracking-widest text-white/70 flex items-center gap-2">
                  <Zap className="h-4 w-4 text-amber-500 fill-amber-500" /> Flow Mensal
                </h3>
                <p className="text-6xl font-black italic text-white tracking-tighter">R$ 97</p>
                <ul className="space-y-4 pt-8 border-t border-white/5">
                  {['Radar de Leads ILIMITADO', 'IA Mentor ILIMITADO', 'IA Prospecção ILIMITADA', 'Scripts de Elite', 'Acesso à Fase de Escala'].map((f) => (
                    <li key={f} className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-white/80">
                      <CheckCircle2 className="h-4 w-4 text-amber-500" /> {f}
                    </li>
                  ))}
                </ul>
              </div>
              <Button asChild className="w-full h-16 mt-12 rounded-2xl bg-amber-500 text-black hover:bg-amber-400 font-black uppercase tracking-widest">
                <a href={CHECKOUT_MENSAL} target="_blank" rel="noopener noreferrer">Acessar agora</a>
              </Button>
            </Card>

            {/* PLANO TRIMESTRAL */}
            <Card className="bg-white/[0.03] border-cyan-500/50 p-10 flex flex-col justify-between rounded-[2.5rem] border shadow-2xl">
              <div className="space-y-8">
                <h3 className="text-xs font-black uppercase tracking-widest text-white/70 flex items-center gap-2">
                  <Timer className="h-4 w-4 text-cyan-500 fill-cyan-500" /> Flow Trimestral
                </h3>
                <p className="text-6xl font-black italic text-white tracking-tighter">R$ 197</p>
                <ul className="space-y-4 pt-8 border-t border-white/5">
                  {['Radar de Leads ILIMITADO', 'IA Mentor ILIMITADO', 'IA Prospecção ILIMITADA', 'Scripts de Elite', 'Acesso à Fase de Escala', '3 Meses Total'].map((f) => (
                    <li key={f} className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-white">
                      <CheckCircle2 className="h-4 w-4 text-cyan-500" /> {f}
                    </li>
                  ))}
                </ul>
              </div>
              <Button asChild className="w-full h-16 mt-12 rounded-2xl bg-cyan-500 text-black hover:bg-cyan-400 font-black uppercase tracking-widest">
                <a href={CHECKOUT_TRIMESTRAL} target="_blank" rel="noopener noreferrer">Acessar agora</a>
              </Button>
            </Card>

            {/* PLANO VITALÍCIO */}
            <Card className="bg-[#050508] p-10 flex flex-col justify-between border-primary/40 border-2 rounded-[2.5rem] relative overflow-hidden shadow-2xl">
              <div className="space-y-8 relative z-10">
                <h3 className="text-xs font-black uppercase tracking-[0.2em] text-primary flex items-center gap-2">
                  <Infinity className="h-4 w-4 fill-primary text-black" /> Flow Vitalício
                </h3>
                <p className="text-6xl md:text-7xl font-black italic text-white tracking-tighter">R$ 287</p>
                <ul className="space-y-4 pt-4 border-t border-white/5">
                  {['Radar ILIMITADO', 'IA Mentor 24h ILIMITADO', 'IA Prospecção ILIMITADA', 'Jornada Vitalícia', 'Sem Taxas Mensais'].map((f) => (
                    <li key={f} className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-white">
                      <CheckCircle2 className="h-4 w-4 text-primary fill-primary" /> {f}
                    </li>
                  ))}
                </ul>
              </div>
              <Button asChild className="w-full h-16 mt-12 rounded-2xl bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-widest shadow-xl">
                <a href={CHECKOUT_VITALICIO} target="_blank" rel="noopener noreferrer">GARANTIR VITALÍCIO</a>
              </Button>
            </Card>
          </div>
        </section>
      </main>
    </div>
  );
}
