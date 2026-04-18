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
  CreditCard,
  Infinity,
  ArrowRight,
  AlertCircle,
  Timer,
  Sparkles,
  ShieldCheck,
  Check,
  TrendingUp
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

// LINKS EXCLUSIVOS DO FELIPE
const CHECKOUT_MENSAL = "https://go.flowproia.shop/PPU38CQA295";
const CHECKOUT_TRIMESTRAL = "https://go.flowproia.shop/PPU38CQA29A";
const CHECKOUT_VITALICIO = "https://go.flowproia.shop/PPU38CQA294";

const fadeInUp = {
  initial: { opacity: 1, y: 0 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.01 },
  transition: { duration: 0.4, ease: "easeOut" }
};

const staggerContainer = {
  initial: { opacity: 1 },
  whileInView: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  },
  viewport: { once: true, amount: 0.01 }
};

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
      
      {/* BACKGROUND ORBS */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/10 rounded-full blur-[140px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent/5 rounded-full blur-[100px]" />
      </div>

      {/* NAVBAR */}
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
        
        {/* HERO SECTION */}
        <section className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-32">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
            <motion.div 
              className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-8 flex-1 max-w-2xl"
              initial={{ opacity: 1, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Badge className="bg-primary/15 border border-primary/30 text-primary text-[10px] md:text-[12px] font-medium px-4 py-1.5 rounded-full flex items-center gap-2 shadow-none">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                ✦ 1.800+ consultores ativos
              </Badge>

              <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.1] text-white">
                Seu primeiro cliente<br className="hidden sm:block" />
                <span className="text-primary italic">começa com um script.</span>
              </h1>

              <p className="text-lg text-white/60 max-w-xl leading-relaxed">
                Encontre leads qualificados, gere abordagens com IA e realize sua primeira venda em tempo recorde com o método exclusivo.
              </p>

              <div className="flex flex-col sm:flex-row items-center lg:items-start gap-8 pt-4 w-full">
                <Button 
                  onClick={scrollToPricing} 
                  size="lg" 
                  className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-widest text-[14px] h-[64px] px-12 rounded-2xl shadow-[0_20px_50px_rgba(139,92,246,0.4)] transition-all hover:scale-105"
                >
                  Acessar agora
                </Button>

                <div className="flex items-center gap-4">
                  <div className="flex -space-x-3">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="h-10 w-10 rounded-full border-2 border-[#05050f] bg-zinc-800 flex items-center justify-center text-[10px] font-black text-white/40">
                        {String.fromCharCode(64 + i)}
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-black text-white">4.9 ★</span>
                    <span className="text-[10px] text-white/40 font-bold uppercase tracking-widest">847 avaliações</span>
                  </div>
                </div>
              </div>
            </motion.div>

            <div className="hidden lg:flex flex-1 items-center justify-center relative min-h-[500px]">
              <div className="absolute inset-0 bg-primary/10 blur-[120px] rounded-full animate-pulse" />
              <div className="relative w-full max-w-[440px] aspect-square z-10">
                <Globe 
                  className="w-full h-full"
                  speed={0.004}
                  dark={1}
                  diffuse={1.2}
                  mapSamples={6000}
                  markerSize={0.05}
                  baseColor={[0.1, 0.1, 0.2]}
                  markerColor={[124/255, 58/255, 237/255]}
                  glowColor={[0.1, 0.1, 0.2]}
                />
              </div>
            </div>
          </div>
        </section>

        {/* METRICS */}
        <section className="border-y border-white/5 bg-white/[0.01] py-16">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {[
                { val: "1.817+", label: "Operadores Ativos" },
                { val: "R$ 2,6M", label: "Gerado pela Base" },
                { val: "3,8 dias", label: "Média para 1ª Venda" }
              ].map((m, i) => (
                <div key={i} className={cn("flex flex-col items-center md:items-start text-center md:text-left", i !== 0 && "md:pl-12 md:border-l border-white/5")}>
                  <span className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-none">{m.val}</span>
                  <span className="text-sm font-bold text-primary uppercase tracking-widest mt-3">{m.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ARSENAL */}
        <section id="arsenal" className="max-w-7xl mx-auto px-6 md:px-12 py-24 md:py-32">
          <div className="max-w-3xl mb-16 space-y-4">
            <Badge className="bg-primary/20 text-primary border-none text-xs font-black uppercase px-4 py-1.5 rounded-lg">FERRAMENTAS DE ELITE</Badge>
            <h2 className="text-4xl md:text-6xl font-black text-white uppercase italic leading-none">O seu arsenal.</h2>
            <p className="text-lg text-white/40 leading-relaxed">As ferramentas que transformam um "não" em um fechamento.</p>
          </div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
          >
            {[
              { 
                icon: MessageSquare, 
                title: "Script IA Pronto", 
                desc: "Cole o nome do lead, a IA escreve a abordagem personalizada no WhatsApp para você." 
              },
              { 
                icon: Target, 
                title: "Radar de Leads", 
                desc: "Encontre donos de negócio em qualquer nicho e região do mundo com nosso motor de busca neural." 
              },
              { 
                icon: Route, 
                title: "Jornada de 7 Dias", 
                desc: "Processo validado que já fechou mais de 479 vendas. Com missões guiadas e suporte total." 
              }
            ].map((f, i) => (
              <motion.div key={i} variants={fadeInUp}>
                <Card className="bg-white/[0.02] border-white/10 rounded-[2.5rem] p-8 group transition-all duration-500 hover:border-primary/30 h-full flex flex-col space-y-8 relative overflow-hidden border shadow-sm">
                  <div className="h-12 w-12 rounded-xl bg-primary/15 border border-primary/20 flex items-center justify-center text-primary">
                    <f.icon className="h-6 w-6" />
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-xl font-bold text-white uppercase italic">{f.title}</h3>
                    <p className="text-sm text-white/40 leading-relaxed">{f.desc}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* PRICING */}
        <section id="precos" className="max-w-7xl mx-auto px-6 md:px-12 py-24 md:py-32 relative">
          <div className="text-center space-y-6 mb-20">
            <Badge className="bg-primary/20 text-primary border border-primary/30 uppercase tracking-[0.3em] text-[10px] px-6 py-2 rounded-full">ROTA DE ESCALA</Badge>
            <h2 className="text-4xl md:text-7xl font-black italic uppercase tracking-tighter leading-tight text-white">
              Domine o mercado <br /><span className="text-primary shimmer-text">com poder IA.</span>
            </h2>
            <p className="text-white/40 text-lg max-w-2xl mx-auto font-medium">
              Libere o arsenal completo e comece a faturar em escala agora mesmo com o método do Felipe.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            
            {/* PLANO MENSAL */}
            <motion.div variants={fadeInUp} initial="initial" whileInView="whileInView">
              <Card className="h-full bg-white/[0.02] border-amber-500/40 p-10 flex flex-col justify-between relative rounded-[2.5rem] border shadow-sm">
                <div className="space-y-8">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 px-3 py-1 bg-amber-500/20 border border-amber-500/30 rounded-full w-fit">
                      <AlertCircle className="h-3 w-3 text-amber-500" />
                      <span className="text-[8px] font-black uppercase tracking-widest text-amber-500">Uso Diário Limitado</span>
                    </div>
                    <h3 className="text-xs font-black uppercase tracking-widest text-white/70 flex items-center gap-2">
                      <Zap className="h-4 w-4 text-amber-500 fill-amber-500" /> Flow Mensal
                    </h3>
                    <div className="flex items-baseline gap-1">
                      <p className="text-6xl font-black italic text-white tracking-tighter">R$ 97</p>
                      <span className="text-sm font-bold opacity-50 uppercase tracking-widest">/mês</span>
                    </div>
                  </div>

                  <ul className="space-y-4 pt-8 border-t border-white/5">
                    {[
                      'Radar: 20 Buscas/Dia', 
                      'IA Mentor: 10 Perguntas/Dia', 
                      'IA Prospecção: 10 Mensagens/Dia', 
                      'Scripts de Elite', 
                      'Acesso à Fase de Escala'
                    ].map((f, i) => (
                      <li key={i} className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-white/80">
                        <CheckCircle2 className="h-4 w-4 text-amber-500" /> {f}
                      </li>
                    ))}
                  </ul>
                </div>
                <Button asChild className="w-full h-16 mt-12 rounded-2xl bg-amber-500 text-black hover:bg-amber-400 font-black uppercase tracking-widest shadow-lg shadow-amber-500/20">
                  <a href={CHECKOUT_MENSAL} target="_blank" rel="noopener noreferrer">Acessar agora</a>
                </Button>
              </Card>
            </motion.div>

            {/* PLANO TRIMESTRAL */}
            <motion.div variants={fadeInUp} initial="initial" whileInView="whileInView" className="relative">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20">
                <Badge className="bg-cyan-500 text-black font-black text-[10px] uppercase px-6 py-2 rounded-full shadow-xl">MAIS ESCOLHIDO</Badge>
              </div>
              <Card className="h-full bg-white/[0.03] border-cyan-500/50 p-10 flex flex-col justify-between relative rounded-[2.5rem] border shadow-2xl ring-2 ring-cyan-500/10">
                <div className="space-y-8">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 px-3 py-1 bg-cyan-500/20 border border-cyan-500/30 rounded-full w-fit">
                      <Timer className="h-3 w-3 text-cyan-500" />
                      <span className="text-[8px] font-black uppercase tracking-widest text-cyan-500">Melhor Custo-Benefício</span>
                    </div>
                    <h3 className="text-xs font-black uppercase tracking-widest text-white/70 flex items-center gap-2">
                      <Zap className="h-4 w-4 text-cyan-500 fill-cyan-500" /> Flow Trimestral
                    </h3>
                    <div className="flex items-baseline gap-1">
                      <p className="text-6xl font-black italic text-white tracking-tighter">R$ 197</p>
                      <span className="text-sm font-bold opacity-50 uppercase tracking-widest">/tri</span>
                    </div>
                  </div>

                  <ul className="space-y-4 pt-8 border-t border-white/5">
                    {[
                      'Radar: 20 Buscas/Dia', 
                      'IA Mentor: 10 Perguntas/Dia', 
                      'IA Prospecção: 10 Mensagens/Dia', 
                      'Scripts de Elite (Volume)', 
                      'Acesso à Fase de Escala',
                      '3 Meses de Acesso Pro'
                    ].map((f, i) => (
                      <li key={i} className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-white">
                        <CheckCircle2 className="h-4 w-4 text-cyan-500" /> {f}
                      </li>
                    ))}
                  </ul>
                </div>
                <Button asChild className="w-full h-16 mt-12 rounded-2xl bg-cyan-500 text-black hover:bg-cyan-400 font-black uppercase tracking-widest shadow-lg shadow-cyan-500/20">
                  <a href={CHECKOUT_TRIMESTRAL} target="_blank" rel="noopener noreferrer">Acessar agora</a>
                </Button>
              </Card>
            </motion.div>

            {/* PLANO VITALÍCIO */}
            <motion.div variants={fadeInUp} initial="initial" whileInView="whileInView" className="relative h-full">
              <div className="relative p-[2px] rounded-[2.5rem] overflow-hidden shadow-[0_0_100px_rgba(139,92,246,0.3)] h-full">
                <div className="absolute inset-0 bg-gradient-to-br from-primary via-accent to-primary animate-pulse" />
                <Card className="h-full relative bg-[#050508] p-10 flex flex-col justify-between border-none rounded-[calc(2.5rem-2px)]">
                  <div className="absolute top-6 right-6 bg-primary text-white text-[9px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest shadow-lg flex items-center gap-1.5">
                    <Star className="h-3 w-3 fill-white" /> RECOMENDADO
                  </div>
                  
                  <div className="space-y-8">
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 px-3 py-1 bg-primary/20 border border-primary/30 rounded-full w-fit">
                        <Sparkles className="h-3 w-3 text-primary" />
                        <span className="text-[8px] font-black uppercase tracking-widest text-primary">Acesso Vitalício Ilimitado</span>
                      </div>
                      <h3 className="text-xs font-black uppercase tracking-[0.2em] text-primary flex items-center gap-2">
                        <Infinity className="h-4 w-4 fill-primary text-black" /> Pagamento Único
                      </h3>
                      <div className="flex items-baseline gap-1">
                        <p className="text-6xl md:text-7xl font-black italic text-white tracking-tighter">R$ 287</p>
                      </div>
                      
                      <div className="bg-primary/10 border border-primary/20 rounded-xl px-4 py-4 border-dashed relative overflow-hidden group">
                        <div className="absolute inset-0 bg-primary/5 group-hover:bg-primary/10 transition-colors"></div>
                        <div className="relative flex items-center gap-3">
                          <CreditCard className="h-5 w-5 text-primary" /> 
                          <div>
                            <p className="text-[10px] font-black uppercase text-primary tracking-widest leading-none mb-1">Parcelamento no Cartão</p>
                            <p className="text-[14px] font-black text-white italic tracking-tight">Até 12x de R$ 28,82</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <ul className="space-y-4 pt-4 border-t border-white/5">
                      {[
                        'Radar de Leads ILIMITADO', 
                        'IA Mentor 24h ILIMITADO', 
                        'IA de Prospecção ILIMITADA', 
                        'Jornada Vitalícia', 
                        'Sem Mensalidades ou Taxas'
                      ].map((f, i) => (
                        <li key={i} className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-white">
                          <CheckCircle2 className="h-4 w-4 text-primary fill-primary" /> {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <Button asChild className="w-full h-16 mt-12 rounded-2xl bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-widest shadow-[0_15px_40px_rgba(139,92,246,0.5)] transition-all hover:scale-[1.02] group">
                    <a href={CHECKOUT_VITALICIO} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
                      GARANTIR VITALÍCIO <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </Button>
                </Card>
              </div>
            </motion.div>
          </div>
        </section>

        {/* DEPOIMENTOS */}
        <section className="max-w-7xl mx-auto px-6 md:px-12 py-24 bg-white/[0.01] rounded-[3rem]">
          <h2 className="text-4xl md:text-5xl font-black text-white uppercase italic mb-16 text-center md:text-left">
            Quem já está na jornada.
          </h2>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
          >
            {TESTIMONIALS.map((t, i) => (
              <motion.div key={i} variants={fadeInUp}>
                <Card className="bg-white/[0.02] border-white/10 rounded-[2.5rem] p-10 space-y-8 h-full flex flex-col border shadow-sm">
                  <div className="flex gap-1 mb-2">
                    {[1,2,3,4,5].map(s => <Star key={s} className="h-4 w-4 fill-amber-500 text-amber-500" />)}
                  </div>
                  <p className="text-lg text-white/80 leading-relaxed italic flex-1">"{t.text}"</p>
                  <div className="flex items-center gap-4 pt-8 border-t border-white/5">
                    <div className="h-12 w-12 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center font-black text-primary text-sm shrink-0">
                      {t.author.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white uppercase">{t.author}</p>
                      <p className="text-[10px] font-black text-white/30 uppercase tracking-widest">{t.context}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* FAQ */}
        <section id="faq" className="max-w-4xl mx-auto px-6 md:px-12 py-24">
          <h2 className="text-4xl md:text-5xl font-black text-white uppercase italic mb-16 text-center">Dúvidas frequentes.</h2>
          
          <div className="space-y-4">
            <Accordion type="single" collapsible className="w-full">
              {[
                { q: "O sistema funciona para quem não tem experiência?", a: "Sim. O FlowPro foi desenhado como uma jornada guiada passo a passo. Você só precisa seguir as missões diárias e copiar os scripts gerados." },
                { q: "Como a IA ajuda no processo de vendas?", a: "Nossa IA analisa o nicho do lead e gera um script de abordagem que não parece spam, aumentando drasticamente suas chances de resposta." },
                { q: "Em quanto tempo vejo os primeiros resultados?", a: "Nossa jornada foi feita para você realizar sua primeira venda em até 7 dias, desde que execute todas as tarefas propostas." },
                { q: "Preciso aparecer nas redes sociais?", a: "Não. Ensinamos estratégias de bastidores onde você pode prospectar e vender sem nunca mostrar o rosto." }
              ].map((item, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="border-b border-white/5 py-4">
                  <AccordionTrigger className="text-base font-bold text-white/90 hover:no-underline transition-colors py-4 text-left">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-white/50 leading-relaxed pt-2 pb-4 italic">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* CTA FINAL COM TIMER */}
        <section className="py-24 md:py-32 flex flex-col items-center text-center px-6">
          <div className="space-y-12 flex flex-col items-center">
            <div className="space-y-6">
              <Badge className="bg-amber-500/20 text-amber-500 border border-amber-500/30 uppercase tracking-[0.3em] text-[10px] px-6 py-2 rounded-full animate-pulse">Oferta de Tempo Limitado</Badge>
              <h2 className="text-5xl md:text-8xl font-black text-white leading-tight max-w-4xl uppercase italic tracking-tighter">
                Últimas vagas com o preço atual.
              </h2>
            </div>

            <div className="flex gap-4 md:gap-8">
              {[
                { val: timeLeft.h, label: "HORAS" },
                { val: timeLeft.m, label: "MINUTOS" },
                { val: timeLeft.s, label: "SEGUNDOS" }
              ].map((c, i) => (
                <div key={i} className="flex flex-col items-center gap-3">
                  <div className="h-20 w-20 md:h-32 md:w-32 bg-white/[0.03] border border-white/10 rounded-[2rem] flex items-center justify-center text-3xl md:text-6xl font-black italic font-mono text-primary shadow-2xl">
                    {c.val}
                  </div>
                  <span className="text-[10px] font-black text-white/30 tracking-widest">{c.label}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col items-center gap-6 w-full max-w-lg">
              <Button 
                onClick={scrollToPricing} 
                size="lg" 
                className="group bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-widest text-lg h-20 px-16 rounded-[2rem] shadow-[0_20px_60px_rgba(139,92,246,0.6)] transition-all hover:scale-105 active:scale-95 border-none w-full"
              >
                QUERO MEU ACESSO AGORA <ArrowRight className="ml-3 h-7 w-7 group-hover:translate-x-2 transition-transform" />
              </Button>
              <div className="space-y-1">
                <p className="text-[12px] font-bold text-white/40 uppercase tracking-widest">Acesso imediato após o pagamento</p>
                <div className="flex items-center justify-center gap-4 text-[10px] font-black text-green-500 uppercase tracking-widest">
                  <Check className="h-4 w-4" /> Pagamento 100% Seguro
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="max-w-7xl mx-auto px-6 md:px-12 py-16 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="flex flex-col items-center md:items-start gap-4">
            <div className="relative h-4 w-20 opacity-40 grayscale contrast-200">
              <Image src={LOGO_URL} alt="FlowPro" fill className="object-contain" />
            </div>
            <span className="text-[12px] text-white/20 font-medium">© 2025 FlowPro Systems. Todos os direitos reservados.</span>
          </div>
          
          <div className="flex items-center gap-8">
            <Link href="#" className="text-[11px] text-white/40 hover:text-white transition-colors uppercase font-black tracking-widest">Termos</Link>
            <Link href="#" className="text-[11px] text-white/40 hover:text-white transition-colors uppercase font-black tracking-widest">Privacidade</Link>
            <div className="flex items-center gap-4">
              <ShieldCheck className="h-5 w-5 text-white/20" />
              <TrendingUp className="h-5 w-5 text-white/20" />
            </div>
          </div>
        </footer>

      </main>
    </div>
  );
}
