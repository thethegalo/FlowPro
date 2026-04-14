
"use client";

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
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
  Sparkles
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

const CHECKOUT_MENSAL = "https://checkout.flowproia.shop/pay/PPU38CQ9FQU";
const CHECKOUT_TRIMESTRAL = "https://checkout.flowproia.shop/pay/PPU38CQ9N8O";
const CHECKOUT_VITALICIO = "https://checkout.flowproia.shop/pay/PPU38CQ9FCP";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] }
};

const staggerContainer = {
  initial: {},
  whileInView: {
    transition: {
      staggerChildren: 0.1
    }
  },
  viewport: { once: true }
};

const cardIn = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: "easeOut" }
};

export default function Home() {
  const scrollToPricing = () => {
    document.getElementById('precos')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="flex flex-col min-h-screen text-white bg-transparent overflow-x-hidden relative">
      
      {/* BACKGROUND ORBS OPTIMIZED */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[100px] animate-pulse" style={{ willChange: 'transform' }}></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent/5 rounded-full blur-[80px]"></div>
      </div>

      {/* NAVBAR */}
      <nav className="fixed top-0 w-full h-[60px] bg-[#05050f]/70 backdrop-blur-[20px] border-b border-white/5 z-50 px-6 md:px-12 flex items-center justify-between">
        <div className="flex items-center gap-12">
          <Link href="/" className="flex items-center gap-2">
            <div className="relative h-5 w-20">
              <Image src={LOGO_URL} alt="FlowPro" fill className="object-contain" priority />
            </div>
          </Link>
          
          <div className="hidden md:flex items-center gap-8">
            <Link href="#arsenal" className="text-[13px] text-white/50 hover:text-white transition-colors">Arsenal</Link>
            <button onClick={scrollToPricing} className="text-[13px] text-white/50 hover:text-white transition-colors">Preços</button>
            <Link href="#faq" className="text-[13px] text-white/50 hover:text-white transition-colors">Dúvidas</Link>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <Link href="/auth" className="text-[13px] text-white/40 hover:text-white transition-colors font-medium">Fazer login</Link>
          <Button onClick={scrollToPricing} className="bg-[#6d28d9] hover:bg-[#7c3aed] text-white font-medium text-[13px] h-9 px-5 rounded-lg border-none shadow-none">
            Acessar agora
          </Button>
        </div>
      </nav>

      <main className="pt-[60px] relative z-10">
        
        {/* HERO SECTION */}
        <section className="max-w-[1200px] mx-auto px-6 md:px-12 py-12 md:py-32 overflow-visible">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8">
            <motion.div 
              className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-6 md:space-y-8 flex-1 max-w-2xl z-20"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <Badge className="bg-[#6d28d9]/15 border border-[#7c3aed]/30 text-[#c4b5fd] text-[10px] md:text-[12px] font-medium px-3 md:px-4 py-1 md:py-1.5 rounded-full flex items-center gap-2 shadow-none">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                ✦ 1.800+ consultores ativos
              </Badge>

              <h1 className="text-[34px] sm:text-[44px] md:text-[64px] lg:text-[72px] font-extrabold tracking-[-0.02em] font-headline leading-[1.1] text-white">
                Seu primeiro cliente<br className="hidden sm:block" />
                <span className="bg-gradient-to-r from-[#a855f7] to-[#6366f1] bg-clip-text text-transparent italic inline-block pb-4">começa com um script.</span>
              </h1>

              <p className="text-[14px] md:text-[18px] text-white/45 leading-[1.6] max-w-[480px]">
                Encontre leads qualificados, gere abordagens com IA e realize sua primeira venda em tempo recorde.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-6 md:gap-8 pt-4 w-full sm:w-auto">
                <Button onClick={scrollToPricing} size="lg" className="w-full sm:w-auto bg-[#7c3aed] hover:bg-[#6d28d9] text-white font-medium text-[14px] h-[48px] px-8 rounded-[10px] transition-all hover:-translate-y-0.5 shadow-[0_8px_24px_rgba(124,58,237,0.4)] border-none">
                  Acessar agora
                </Button>

                <div className="flex items-center gap-3">
                  <div className="flex -space-x-2">
                    {['A', 'B', 'J', 'L'].map((initial, i) => (
                      <div key={i} className="h-7 w-7 rounded-full border-2 border-[#05050f] bg-primary/20 flex items-center justify-center text-[10px] font-black text-primary relative">
                        {initial}
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-col items-start">
                    <span className="text-[12px] font-semibold text-white">4.9 ★</span>
                    <span className="text-[11px] text-white/40 font-medium">847 avaliações</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* OPTIMIZED GLOBE SECTION */}
            <div className="hidden lg:flex flex-1 items-center justify-center relative min-h-[600px] overflow-visible">
              <div className="absolute inset-0 bg-primary/5 blur-[100px] rounded-full animate-pulse pointer-events-none scale-110" style={{ willChange: 'transform' }} />
              <div className="relative w-full max-w-[420px] aspect-square mx-auto lg:mx-0 z-10">
                <Globe 
                  className="w-full h-full"
                  speed={0.005}
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

        {/* METRICS SECTION */}
        <section className="border-y border-white/5 py-12 md:py-24">
          <div className="max-w-[1100px] mx-auto px-6 md:px-12">
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              {[
                { val: "1.817+", label: "Ativos no Flow" },
                { val: "R$ 2,6M", label: "Gerado pela base" },
                { val: "3,8 dias", label: "Para primeira venda" }
              ].map((m, i) => (
                <div key={i} className={`flex flex-col items-center md:items-start md:px-12 ${i !== 0 ? 'md:border-l border-white/5' : ''}`}>
                  <span className="text-[36px] md:text-[52px] font-extrabold text-white tracking-[-1px] md:tracking-[-1.5px] leading-none">{m.val}</span>
                  <span className="text-[11px] md:text-[12px] text-white/30 font-medium uppercase tracking-widest mt-2">{m.label}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ARSENAL SECTION */}
        <section id="arsenal" className="max-w-[1100px] mx-auto px-6 md:px-12 py-20 md:py-32">
          <motion.div className="space-y-4 mb-16 text-center md:text-left" {...fadeInUp}>
            <h2 className="text-[28px] md:text-[36px] font-bold tracking-[-0.5px] text-white">O seu arsenal.</h2>
            <p className="text-[14px] text-white/35">As ferramentas que transformam um "não" em um fechamento.</p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
          >
            {[
              { 
                icon: MessageSquare, 
                title: "Script IA pronto", 
                desc: "Cole o nome do lead, a IA escreve a mensagem de abordagem personalizada no WhatsApp para você." 
              },
              { 
                icon: Target, 
                title: "Radar de leads", 
                desc: "Encontre donos de negócio em qualquer nicho e região do mundo com nosso motor de busca neural." 
              },
              { 
                icon: Route, 
                title: "Jornada de 7 dias", 
                desc: "Processo que já fechou mais de 479 vendas. Com missões guiadas e memória automática." 
              }
            ].map((f, i) => (
              <motion.div key={i} variants={cardIn}>
                <Card className="bg-white/[0.03] border-white/[0.07] rounded-2xl p-8 group transition-all duration-300 hover:border-primary/25 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,0,0,0.3)] min-h-[200px] relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
                  <div className="h-9 w-9 rounded-lg bg-primary/15 border border-primary/20 flex items-center justify-center text-primary mb-8">
                    <f.icon className="h-[18px] w-[18px] text-[#a78bfa]" />
                  </div>
                  <h3 className="text-[15px] font-semibold text-white/90 mb-3">{f.title}</h3>
                  <p className="text-[13px] text-white/40 leading-[1.7]">{f.desc}</p>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* PRICING SECTION */}
        <section id="precos" className="max-w-[1200px] mx-auto px-6 md:px-12 py-24 md:py-48">
          <div className="text-center space-y-6 mb-20">
            <Badge className="bg-primary/20 text-primary border border-primary/30 uppercase tracking-[0.3em] text-[10px] px-4 py-1.5">Escolha sua Rota de Escala</Badge>
            <h2 className="text-[36px] md:text-[64px] font-black italic uppercase tracking-tighter leading-tight">
              Domine o mercado <br /><span className="text-primary shimmer-text">com poder IA.</span>
            </h2>
            <p className="text-white/40 text-sm md:text-lg max-w-2xl mx-auto font-medium">
              Libere o arsenal completo e comece a faturar em escala agora mesmo.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            
            {/* PLANO MENSAL */}
            <motion.div {...fadeInUp} transition={{ delay: 0.1 }}>
              <Card className="h-full glass-card p-8 flex flex-col justify-between border-amber-500/40 relative overflow-hidden bg-white/[0.02]">
                <div className="space-y-8 relative z-10">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 px-3 py-1 bg-amber-500/20 border border-amber-500/30 rounded-full w-fit">
                      <AlertCircle className="h-3 w-3 text-amber-500" />
                      <span className="text-[8px] font-black uppercase tracking-widest text-amber-500">Uso Diário Limitado</span>
                    </div>
                    <h3 className="text-[12px] font-black uppercase tracking-[0.2em] text-white/70 flex items-center gap-2">
                      <Zap className="h-4 w-4 text-amber-500 fill-amber-500" /> Flow Mensal
                    </h3>
                    <div className="flex items-baseline gap-1">
                      <p className="text-5xl md:text-6xl font-black italic text-white tracking-tighter">R$ 97</p>
                      <span className="text-sm font-bold opacity-50 uppercase tracking-widest">/mês</span>
                    </div>
                    <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center gap-3">
                      <CreditCard className="h-4 w-4 text-amber-500" />
                      <p className="text-[10px] font-black uppercase text-amber-500 tracking-widest">OU 12x DE R$ 9,74</p>
                    </div>
                  </div>

                  <ul className="space-y-4">
                    {[
                      'Radar: 20 Buscas/Dia', 
                      'IA Mentor: 10 Perguntas/Dia', 
                      'IA Prospecção: 10 Mensagens/Dia', 
                      'Scripts de Elite', 
                      'Acesso à Fase de Escala'
                    ].map((f, i) => (
                      <li key={i} className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-white/80">
                        <CheckCircle2 className="h-3.5 w-3.5 text-amber-500" /> {f}
                      </li>
                    ))}
                  </ul>
                </div>
                <Button asChild className="w-full h-16 mt-10 rounded-2xl bg-amber-500 text-black hover:bg-amber-400 font-black uppercase tracking-widest shadow-lg shadow-amber-500/20">
                  <a href={CHECKOUT_MENSAL} target="_blank" rel="noopener noreferrer">Acessar agora</a>
                </Button>
              </Card>
            </motion.div>

            {/* PLANO TRIMESTRAL */}
            <motion.div {...fadeInUp} transition={{ delay: 0.2 }}>
              <Card className="h-full glass-card p-8 flex flex-col justify-between border-cyan-500/50 relative overflow-hidden bg-white/[0.02]">
                <div className="absolute top-0 right-0 p-4">
                  <Badge className="bg-cyan-500 text-black font-black text-[8px] uppercase px-3 py-1">POPULAR</Badge>
                </div>
                <div className="space-y-8 relative z-10">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 px-3 py-1 bg-cyan-500/20 border border-cyan-500/30 rounded-full w-fit">
                      <Timer className="h-3 w-3 text-cyan-500" />
                      <span className="text-[8px] font-black uppercase tracking-widest text-cyan-500">Melhor Custo-Benefício</span>
                    </div>
                    <h3 className="text-[12px] font-black uppercase tracking-[0.2em] text-white/70 flex items-center gap-2">
                      <Zap className="h-4 w-4 text-cyan-500 fill-cyan-500" /> Flow Trimestral
                    </h3>
                    <div className="flex items-baseline gap-1">
                      <p className="text-5xl md:text-6xl font-black italic text-white tracking-tighter">R$ 197</p>
                      <span className="text-sm font-bold opacity-50 uppercase tracking-widest">/tri</span>
                    </div>
                    <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center gap-3">
                      <CreditCard className="h-4 w-4 text-cyan-500" />
                      <p className="text-[10px] font-black uppercase text-cyan-500 tracking-widest">OU 12x DE R$ 19,78</p>
                    </div>
                  </div>

                  <ul className="space-y-4">
                    {[
                      'Radar: 20 Buscas/Dia', 
                      'IA Mentor: 10 Perguntas/Dia', 
                      'IA Prospecção: 10 Mensagens/Dia', 
                      'Scripts de Elite (Volume)', 
                      'Acesso à Fase de Escala',
                      '3 Meses de Acesso Pro'
                    ].map((f, i) => (
                      <li key={i} className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-white">
                        <CheckCircle2 className="h-3.5 w-3.5 text-cyan-500" /> {f}
                      </li>
                    ))}
                  </ul>
                </div>
                <Button asChild className="w-full h-16 mt-10 rounded-2xl bg-cyan-500 text-black hover:bg-cyan-400 font-black uppercase tracking-widest shadow-lg shadow-cyan-500/20">
                  <a href={CHECKOUT_TRIMESTRAL} target="_blank" rel="noopener noreferrer">Acessar agora</a>
                </Button>
              </Card>
            </motion.div>

            {/* PLANO VITALÍCIO */}
            <motion.div {...fadeInUp} transition={{ delay: 0.3 }} className="relative p-[2px] rounded-[2rem] overflow-hidden shadow-[0_0_100px_rgba(139,92,246,0.4)]">
              <div className="absolute inset-0 bg-gradient-to-br from-primary via-accent to-primary animate-pulse" style={{ willChange: 'transform' }}></div>
              <Card className="h-full relative bg-[#050508] p-8 flex flex-col justify-between border-none rounded-[calc(2.5rem-2px)]">
                <div className="absolute top-5 right-5 bg-primary text-white text-[8px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest shadow-lg flex items-center gap-1">
                  <Star className="h-2.5 w-2.5 fill-white" /> RECOMENDADO
                </div>
                
                <div className="space-y-8 relative z-10">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 px-3 py-1 bg-primary/20 border border-primary/30 rounded-full w-fit">
                      <Sparkles className="h-3 w-3 text-primary" />
                      <span className="text-[8px] font-black uppercase tracking-widest text-primary">Acesso Vitalício Ilimitado</span>
                    </div>
                    <h3 className="text-[12px] font-black uppercase tracking-[0.2em] text-primary flex items-center gap-2">
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

                  <ul className="space-y-4">
                    {[
                      'Radar de Leads ILIMITADO', 
                      'IA Mentor 24h ILIMITADO', 
                      'IA de Prospecção ILIMITADA', 
                      'Jornada de 7 Dias Vitalícia',
                      'Sem Mensalidades ou Taxas',
                      'Garantia Blindada de 7 Dias'
                    ].map((f, i) => (
                      <li key={i} className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-white">
                        <CheckCircle2 className="h-4 w-4 text-primary fill-primary" /> {f}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <Button asChild className="w-full h-16 mt-10 rounded-2xl bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-widest shadow-[0_15px_40px_rgba(139,92,246,0.5)] transition-all hover:scale-[1.02] group text-sm md:text-base">
                  <a href={CHECKOUT_VITALICIO} target="_blank" rel="noopener noreferrer">
                    Acessar agora <ArrowRight className="ml-2 h-5 w-5 md:h-6 md:w-6 group-hover:translate-x-1 transition-transform" />
                  </a>
                </Button>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* DEPOIMENTOS */}
        <section className="max-w-[1100px] mx-auto px-6 md:px-12 py-20 md:py-32">
          <motion.h2 className="text-[28px] md:text-[36px] font-bold tracking-[-0.5px] text-white mb-16" {...fadeInUp}>
            Quem já está na jornada.
          </motion.h2>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
          >
            {TESTIMONIALS.map((t, i) => (
              <motion.div key={i} variants={cardIn}>
                <Card className="bg-white/[0.03] border-white/[0.07] rounded-2xl p-8 space-y-6 hover:-translate-y-1.5 transition-all hover:border-primary/30 hover:shadow-[0_16px_48px_rgba(0,0,0,0.3)] h-full flex flex-col">
                  <div className="text-[48px] text-primary/30 font-serif leading-none h-6">“</div>
                  <div className="flex gap-1 mb-2">
                    {[1,2,3,4,5].map(s => <Star key={s} className="h-3.5 w-3.5 fill-[#f59e0b] text-[#f59e0b]" />)}
                  </div>
                  <p className="text-[15px] text-white/65 leading-[1.8] italic flex-1">"{t.text}"</p>
                  <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                    <div className="h-10 w-10 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center font-black text-primary text-xs shrink-0 relative overflow-hidden">
                      {t.author.charAt(0)}
                    </div>
                    <div>
                      <p className="text-[13px] font-bold text-white">{t.author}</p>
                      <p className="text-[11px] text-white/30 font-medium">{t.context}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* FAQ */}
        <section id="faq" className="max-w-[1100px] mx-auto px-6 md:px-12 py-20 md:py-32">
          <motion.h2 className="text-[28px] md:text-[36px] font-bold tracking-[-0.5px] text-white mb-12" {...fadeInUp}>
            Dúvidas frequentes.
          </motion.h2>
          
          <motion.div {...fadeInUp}>
            <Accordion type="single" collapsible className="w-full">
              {[
                { q: "O sistema funciona para quem não tem experiência?", a: "Sim. O FlowPro foi desenhado como uma jornada guiada passo a passo. Você só precisa seguir as missões diárias e copiar os scripts gerados." },
                { q: "Como a IA ajuda no processo de vendas?", a: "Nossa IA analisa o nicho do lead e gera um script de abordagem que não parece spam, aumentando drasticamente suas chances de resposta." },
                { q: "Em quanto tempo vejo os primeiros resultados?", a: "Nossa jornada foi feita para você realizar sua primeira venda em até 7 dias, desde que execute todas as tarefas propostas." },
                { q: "Preciso aparecer nas redes sociais?", a: "Não. Ensinamos estratégias de bastidores onde você pode prospectar e vender sem nunca mostrar o rosto." }
              ].map((item, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="border-b border-white/[0.07] py-4">
                  <AccordionTrigger className="text-[14px] font-medium text-white/80 hover:no-underline hover:text-white transition-colors py-4 text-left">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-[13px] text-white/45 leading-[1.7] pt-2 pb-4 max-w-2xl">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </section>

        {/* CTA FINAL */}
        <section className="max-w-[1100px] mx-auto px-6 md:px-12 py-24 md:py-32 flex flex-col items-center text-center space-y-10">
          <motion.div 
            className="space-y-10 flex flex-col items-center"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-[32px] md:text-[52px] font-extrabold tracking-[-1px] md:tracking-[-1.5px] text-white leading-tight max-w-[600px]">
              A escala não espera por você.
            </h2>
            <p className="text-[15px] text-white/40 max-w-[400px]">
              Garanta sua posição no ecossistema e comece a faturar hoje.
            </p>
            <Button onClick={scrollToPricing} size="lg" className="bg-[#7c3aed] hover:bg-[#6d28d9] text-white font-medium text-[14px] h-[48px] px-8 rounded-[10px] shadow-[0_8px_24px_rgba(124,58,237,0.4)] transition-all hover:-translate-y-0.5 border-none">
              Acessar agora
            </Button>
          </motion.div>
        </section>

        {/* FOOTER */}
        <footer className="max-w-[1100px] mx-auto px-6 md:px-12 py-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="relative h-4 w-16 opacity-50 grayscale contrast-200">
              <Image src={LOGO_URL} alt="FlowPro" fill className="object-contain" />
            </div>
            <span className="text-[12px] text-white/20 font-medium">© 2025 FlowPro. Todos os direitos reservados.</span>
          </div>
          
          <div className="flex items-center gap-8">
            <Link href="#" className="text-[12px] text-white/25 hover:text-white transition-colors">Termos</Link>
            <Link href="#" className="text-[12px] text-white/25 hover:text-white transition-colors">Privacidade</Link>
          </div>
        </footer>

      </main>
    </div>
  );
}
