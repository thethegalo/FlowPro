
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

// Carregamento dinâmico do Globo para performance
const Globe = dynamic(() => import('@/components/ui/cobe-globe').then(m => ({ default: m.Globe })), { 
  ssr: false, 
  loading: () => <div className="w-full h-full bg-primary/5 rounded-full blur-xl animate-pulse" /> 
});

const LOGO_URL = "https://s3.typebot.io/public/workspaces/cmml2oniw000g04l7gwmqelu1/typebots/cmn1vyjog000104la10d6sdzu/blocks/ywpf1hja4q4bxg9gzqobiz93?v=1774307470623";

const CHECKOUT_MENSAL = "https://go.flowproiasystems.shop/PPU38CQB6QN";
const CHECKOUT_VITALICIO = "https://go.flowproiasystems.shop/PPU38CQB6R3";

export default function FelipeLandingPage() {
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
        </div>
        <div className="flex items-center gap-4">
          <Link href="/auth" className="text-[13px] text-white/50 hover:text-white transition-colors font-medium px-2">Entrar</Link>
          <Button onClick={scrollToPricing} className="bg-primary hover:bg-primary/90 text-white font-bold text-[12px] h-10 px-6 rounded-xl shadow-lg">
            Começar Agora
          </Button>
        </div>
      </nav>

      <main className="relative z-10 pt-[64px]">
        <section className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-32 flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1 text-center lg:text-left space-y-8 max-w-2xl">
            <Badge className="bg-primary/20 border-primary/30 text-primary px-4 py-1.5 rounded-full">✦ 1.800+ ATIVOS</Badge>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black leading-[1.1]">
              Sua primeira venda<br />
              <span className="text-primary italic">começa com um script.</span>
            </h1>
            <p className="text-lg text-white/60 leading-relaxed">
              Use o método do Felipe para encontrar leads, gerar abordagens com IA e vender em tempo recorde.
            </p>
            <Button onClick={scrollToPricing} size="lg" className="w-full sm:w-auto h-16 bg-primary rounded-2xl font-black uppercase text-xs shadow-xl">Acessar agora</Button>
          </div>
          <div className="hidden lg:block flex-1">
            <Globe dark={1} speed={0.003} />
          </div>
        </section>

        <section id="precos" className="max-w-7xl mx-auto px-6 md:px-12 py-24 md:py-32">
          <div className="text-center mb-16 space-y-4">
            <Badge className="bg-primary/20 text-primary px-6 py-2 rounded-full uppercase font-black text-[10px]">Planos Ilimitados</Badge>
            <h2 className="text-4xl md:text-7xl font-black text-white italic uppercase tracking-tighter leading-tight">Escala sem Limites.</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto items-stretch">
            {/* MENSAL */}
            <Card className="bg-white/[0.02] border-amber-500/30 border p-10 flex flex-col justify-between rounded-[2.5rem]">
              <div className="space-y-8">
                <h3 className="text-xs font-black uppercase tracking-widest text-white/70">Flow Mensal</h3>
                <p className="text-6xl font-black italic text-white tracking-tighter">R$ 147</p>
                <ul className="space-y-4 pt-8 border-t border-white/5">
                  {['Radar ILIMITADO', 'IA Mentor ILIMITADO', 'IA Prospecção ILIMITADA', 'Scripts de Elite'].map((f) => (
                    <li key={f} className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-white/80">
                      <CheckCircle2 className="h-4 w-4 text-amber-500" /> {f}
                    </li>
                  ))}
                </ul>
              </div>
              <Button asChild className="w-full h-16 mt-12 bg-amber-500 rounded-2xl text-black font-black uppercase">
                <a href={CHECKOUT_MENSAL} target="_blank">Acessar agora</a>
              </Button>
            </Card>

            {/* VITALÍCIO */}
            <Card className="bg-[#050508] border-primary border-2 p-10 flex flex-col justify-between rounded-[2.5rem] shadow-[0_0_80px_rgba(124,58,237,0.3)]">
              <div className="space-y-8">
                <h3 className="text-xs font-black uppercase tracking-widest text-primary">Flow Vitalício</h3>
                <p className="text-6xl font-black italic text-white tracking-tighter">R$ 247</p>
                <ul className="space-y-4 pt-8 border-t border-white/5">
                  {['Radar ILIMITADO', 'IA Mentor ILIMITADO', 'IA Prospecção ILIMITADA', 'Sem Mensalidades'].map((f) => (
                    <li key={f} className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-white">
                      <CheckCircle2 className="h-4 w-4 text-primary fill-primary" /> {f}
                    </li>
                  ))}
                </ul>
              </div>
              <Button asChild className="w-full h-16 mt-12 bg-primary rounded-2xl text-white font-black uppercase shadow-xl">
                <a href={CHECKOUT_VITALICIO} target="_blank">GARANTIR VITALÍCIO</a>
              </Button>
            </Card>
          </div>
        </section>
      </main>
    </div>
  );
}
