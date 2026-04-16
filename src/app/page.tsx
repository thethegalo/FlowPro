
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
  MapPin,
  TrendingUp,
  ChevronRight
} from 'lucide-react';
import Image from 'next/image';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from '@/lib/utils';

const LOGO_URL = "https://s3.typebot.io/public/workspaces/cmml2oniw000g04l7gwmqelu1/typebots/cmn1vyjog000104la10d6sdzu/blocks/ywpf1hja4q4bxg9gzqobiz93?v=1774307470623";

const TESTIMONIALS = [
  { 
    text: "Eu nunca tinha vendido nada online. Usei o script de IA para falar com uma pizzaria e fechei meu primeiro contrato de ",
    highlight: "R$ 1.500",
    textEnd: " em menos de uma semana.",
    author: "Ana Oliveira", context: "Especialista em Escala", initial: "A"
  },
  { 
    text: "O Radar de Leads é bizarro. Achei 50 dentistas na minha cidade e a IA gerou abordagens que todos responderam. Já faturei ",
    highlight: "R$ 3.500",
    textEnd: ".",
    author: "Bruno Silva", context: "Consultor Fase 1", initial: "B"
  },
  { 
    text: "A barreira de não saber o que falar sumiu. Copiei o script da IA, mandei no WhatsApp e o cliente fechou um contrato de ",
    highlight: "R$ 2.000",
    textEnd: " na hora. Simples assim.",
    author: "Juliana Reus", context: "Venda em 48h", initial: "J"
  }
];

const CHECKOUT_MENSAL = "https://checkout.flowproia.shop/pay/PPU38CQ9FQU";
const CHECKOUT_TRIMESTRAL = "https://checkout.flowproia.shop/pay/PPU38CQ9N8O";
const CHECKOUT_VITALICIO = "https://checkout.flowproia.shop/pay/PPU38CQ9FCP";

const fadeInUp = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.4, ease: "easeOut" }
};

const staggerContainer = {
  initial: {},
  whileInView: {
    transition: {
      staggerChildren: 0.05
    }
  },
  viewport: { once: true }
};

export default function Home() {
  const scrollToPricing = () => {
    document.getElementById('precos')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="flex flex-col min-h-screen text-white bg-[#05050f] overflow-x-hidden relative">
      {/* BACKGROUND ORB OPTIMIZED */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[100px]"></div>
      </div>

      <nav className="fixed top-0 w-full h-[60px] bg-[#05050f]/70 backdrop-blur-[20px] border-b border-white/5 z-50 px-6 md:px-12 flex items-center justify-between">
        <div className="flex items-center gap-12">
          <Link href="/" className="flex items-center gap-2" prefetch={false}>
            <div className="relative h-5 w-20">
              <Image src={LOGO_URL} alt="FlowPro" fill className="object-contain" sizes="80px" priority />
            </div>
          </Link>
          
          <div className="hidden md:flex items-center gap-8">
            <Link href="#arsenal" prefetch={false} className="text-[13px] text-white/50 hover:text-white transition-colors">Arsenal</Link>
            <button onClick={scrollToPricing} className="text-[13px] text-white/50 hover:text-white transition-colors">Preços</button>
            <Link href="#faq" prefetch={false} className="text-[13px] text-white/50 hover:text-white transition-colors">Dúvidas</Link>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <Link href="/auth" prefetch={false} className="text-[13px] text-white/40 hover:text-white transition-colors font-medium">Fazer login</Link>
          <Button onClick={scrollToPricing} className="bg-primary hover:bg-primary/90 text-white font-medium text-[13px] h-9 px-5 rounded-lg border-none shadow-none">
            Acessar agora
          </Button>
        </div>
      </nav>

      <main className="pt-[60px] relative z-10">
        {/* HERO SECTION */}
        <section className="max-w-[1200px] mx-auto px-6 md:px-12 py-12 md:py-32 overflow-visible">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">
            <motion.div 
              className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-6 md:space-y-8 flex-1 max-w-2xl z-20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <Badge className="bg-primary/15 border border-primary/30 text-[#c4b5fd] text-[10px] md:text-[12px] font-medium px-3 md:px-4 py-1 md:py-1.5 rounded-full flex items-center gap-2 shadow-none">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                ✦ 1.817+ consultores ativos
              </Badge>

              <h1 className="text-[34px] sm:text-[44px] md:text-[64px] lg:text-[72px] font-extrabold tracking-[-0.02em] font-headline leading-[1.1] text-white">
                Seu primeiro cliente<br className="hidden sm:block" />
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent italic inline-block pb-4">começa com um script.</span>
              </h1>

              <p className="text-[14px] md:text-[18px] text-white/45 leading-[1.6] max-w-[480px]">
                Encontre leads qualificados, gere abordagens com IA e realize sua primeira venda em tempo recorde.
              </p>

              <div className="flex flex-col items-center lg:items-start gap-4 pt-4 w-full">
                <Button onClick={scrollToPricing} size="lg" className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-widest text-[14px] h-[56px] px-10 rounded-xl transition-all hover:-translate-y-0.5 shadow-[0_15px_40px_rgba(139,92,246,0.4)] border-none">
                  INICIAR MINHA JORNADA <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                
                <p className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] flex items-center gap-4">
                  <span>Sem cartão de crédito</span>
                  <span className="h-1 w-1 rounded-full bg-white/10" />
                  <span>Resultado em até 7 dias</span>
                  <span className="h-1 w-1 rounded-full bg-white/10" />
                  <span>Suporte no grupo</span>
                </p>
              </div>
            </motion.div>

            {/* AI PREVIEW MOCKUP */}
            <div className="flex-1 w-full max-w-[500px] relative">
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-[100px] animate-pulse"></div>
              <Card className="relative bg-[#0a0a14] border-white/10 rounded-[2rem] overflow-hidden shadow-2xl">
                <div className="h-10 bg-white/5 border-b border-white/5 flex items-center px-6 gap-2">
                  <div className="h-2.5 w-2.5 rounded-full bg-red-500/50" />
                  <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/50" />
                  <div className="h-2.5 w-2.5 rounded-full bg-green-500/50" />
                  <div className="ml-4 h-4 w-32 bg-white/5 rounded-full" />
                </div>
                <div className="p-8 space-y-6 font-mono text-[12px] md:text-[13px]">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-lg bg-primary/20 flex items-center justify-center">
                      <Zap className="h-4 w-4 text-primary" />
                    </div>
                    <span className="text-white/40 uppercase tracking-widest text-[10px] font-bold">Gerador de Script IA</span>
                  </div>
                  
                  <div className="space-y-4">
                    <p className="text-primary/60"># Processando contexto do lead...</p>
                    <div className="p-5 rounded-xl bg-white/[0.03] border border-white/5 text-white/80 leading-relaxed italic relative">
                      "Olá <span className="text-primary font-bold">[Nome do Alvo]</span>! Notei que a <span className="text-primary font-bold">[Empresa]</span> ainda não usa automação IA no atendimento. Isso faz vocês perderem clientes para quem responde mais rápido. Posso te mandar uma demo de como recuperar 30% das vendas?"
                      <motion.span 
                        animate={{ opacity: [1, 0, 1] }} 
                        transition={{ duration: 0.8, repeat: Infinity }}
                        className="inline-block w-1.5 h-4 bg-primary ml-1 translate-y-0.5" 
                      />
                    </div>
                    <div className="flex gap-2">
                      <div className="h-8 w-24 bg-primary/20 rounded-lg animate-pulse" />
                      <div className="h-8 w-20 bg-white/5 rounded-lg animate-pulse" />
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* METRICS SECTION */}
        <section className="border-y border-white/5 py-12 md:py-24 bg-white/[0.01]">
          <div className="max-w-[1100px] mx-auto px-6 md:px-12">
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0"
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              {[
                { val: "1.817+", label: "Operadores Ativos" },
                { val: "R$ 2,6M", label: "Gerado pela Base" },
                { val: "3,8 dias", label: "Média para 1ª Venda" }
              ].map((m, i) => (
                <div key={m.label} className={`flex flex-col items-center md:items-start md:px-12 ${i !== 0 ? 'md:border-l border-white/5' : ''}`}>
                  <span className="text-[36px] md:text-[52px] font-extrabold text-white tracking-[-1px] md:tracking-[-1.5px] leading-none">{m.val}</span>
                  <span className="text-[11px] md:text-[12px] text-white/30 font-black uppercase tracking-widest mt-2">{m.label}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ARSENAL SECTION */}
        <section id="arsenal" className="max-w-[1100px] mx-auto px-6 md:px-12 py-20 md:py-32">
          <motion.div className="space-y-4 mb-16 text-center md:text-left" {...fadeInUp}>
            <Badge className="bg-primary/10 text-primary border-none text-[10px] font-black uppercase px-3 py-1">FERRAMENTAS DE ELITE</Badge>
            <h2 className="text-[32px] md:text-[48px] font-extrabold tracking-[-0.5px] text-white uppercase italic">O seu arsenal tático.</h2>
            <p className="text-[14px] md:text-[16px] text-white/35 max-w-xl leading-relaxed">As ferramentas que transformam um lead frio em um fechamento no PIX em poucos minutos.</p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
          >
            {/* FEATURE 1: SCRIPT IA */}
            <motion.div variants={fadeInUp}>
              <Card className="bg-white/[0.03] border-white/[0.07] rounded-3xl p-8 group transition-all duration-500 hover:border-primary/40 hover:-translate-y-2 h-full flex flex-col space-y-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4">
                  <Badge className="bg-primary text-white text-[8px] font-black px-2 py-0.5 rounded-md">MAIS USADO</Badge>
                </div>
                <div className="h-12 w-12 rounded-2xl bg-primary/15 border border-primary/20 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                  <MessageSquare className="h-6 w-6 text-primary" />
                </div>
                <div className="space-y-3">
                  <h3 className="text-lg font-bold text-white uppercase italic">Script IA Pronto</h3>
                  <p className="text-[13px] text-white/40 leading-relaxed">A IA escreve a abordagem personalizada no WhatsApp para você com base no nicho do lead.</p>
                </div>
                
                {/* PREVIEW INTERNO */}
                <div className="mt-auto pt-6 border-t border-white/5 space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-[9px] font-black text-white/20 uppercase tracking-widest">Output Simulado</span>
                  </div>
                  <div className="bg-black/40 rounded-xl p-4 border border-white/5 text-[10px] text-white/60 font-mono leading-relaxed italic">
                    "Olá <span className="text-primary font-bold">@cliente</span>, vi que sua <span className="text-primary font-bold">@loja</span> está sem..."
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* FEATURE 2: RADAR DE LEADS */}
            <motion.div variants={fadeInUp}>
              <Card className="bg-white/[0.03] border-white/[0.07] rounded-3xl p-8 group transition-all duration-500 hover:border-accent/40 hover:-translate-y-2 h-full flex flex-col space-y-6">
                <div className="h-12 w-12 rounded-2xl bg-accent/15 border border-accent/20 flex items-center justify-center text-accent group-hover:scale-110 transition-transform">
                  <Target className="h-6 w-6" />
                </div>
                <div className="space-y-3">
                  <h3 className="text-lg font-bold text-white uppercase italic">Radar de Leads</h3>
                  <p className="text-[13px] text-white/40 leading-relaxed">Encontre donos de negócio em qualquer nicho e região com nosso motor de busca neural.</p>
                </div>

                {/* PREVIEW INTERNO */}
                <div className="mt-auto pt-6 border-t border-white/5 space-y-3">
                  <div className="space-y-2">
                    {[
                      { name: "Padaria Silva", city: "São Paulo", status: "Novo" },
                      { name: "Clínica Sorriso", city: "Curitiba", status: "Novo" }
                    ].map((l, i) => (
                      <div key={i} className="flex items-center justify-between p-2 rounded-lg bg-white/5 border border-white/5">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-3 w-3 text-accent opacity-40" />
                          <span className="text-[9px] font-bold text-white/60 uppercase">{l.name}</span>
                        </div>
                        <Badge className="bg-accent/20 text-accent text-[7px] font-black px-1.5 py-0">NOVO</Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* FEATURE 3: JORNADA 7 DIAS */}
            <motion.div variants={fadeInUp}>
              <Card className="bg-white/[0.03] border-white/[0.07] rounded-3xl p-8 group transition-all duration-500 hover:border-primary/40 hover:-translate-y-2 h-full flex flex-col space-y-6">
                <div className="h-12 w-12 rounded-2xl bg-primary/15 border border-primary/20 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                  <Route className="h-6 w-6" />
                </div>
                <div className="space-y-3">
                  <h3 className="text-lg font-bold text-white uppercase italic">Jornada de 7 Dias</h3>
                  <p className="text-[13px] text-white/40 leading-relaxed">Processo guiado que já fechou mais de 479 vendas. Com missões diárias obrigatórias.</p>
                </div>

                {/* PREVIEW INTERNO */}
                <div className="mt-auto pt-6 border-t border-white/5 space-y-4">
                  <div className="flex items-center justify-between px-2">
                    {[1, 2, 3, 4, 5].map((d) => (
                      <div key={d} className="flex flex-col items-center gap-1.5">
                        <div className={cn(
                          "h-5 w-5 rounded-full flex items-center justify-center text-[8px] font-black border",
                          d <= 3 ? "bg-green-500 border-green-500 text-white" : "bg-white/5 border-white/10 text-white/20"
                        )}>
                          {d <= 3 ? <Check className="h-2.5 w-2.5" /> : d}
                        </div>
                        <span className="text-[7px] font-bold text-white/20 uppercase tracking-widest">Dia {d}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </motion.div>
          </motion.div>
        </section>

        {/* PRICING SECTION */}
        <section id="precos" className="max-w-[1200px] mx-auto px-6 md:px-12 py-24 md:py-48 relative">
          <div className="text-center space-y-6 mb-20">
            <Badge className="bg-primary/20 text-primary border border-primary/30 uppercase tracking-[0.3em] text-[10px] px-4 py-1.5">Sua Rota de Escala</Badge>
            <h2 className="text-[36px] md:text-[64px] font-black italic uppercase tracking-tighter leading-tight">
              Domine o mercado <br /><span className="text-primary shimmer-text">com poder IA.</span>
            </h2>
            <p className="text-white/40 text-sm md:text-lg max-w-2xl mx-auto font-medium leading-relaxed">
              Libere o arsenal completo e comece a faturar em escala agora mesmo.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto">
            {/* PLANO MENSAL */}
            <motion.div {...fadeInUp} transition={{ delay: 0.05 }}>
              <Card className="h-full bg-white/[0.02] border-white/10 p-8 flex flex-col justify-between relative rounded-3xl">
                <div className="space-y-8">
                  <p className="text-[10px] font-black text-primary uppercase tracking-[0.2em] italic">Ideal para: quem quer testar sem compromisso</p>
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
                  </div>

                  <ul className="space-y-4 pt-6 border-t border-white/5">
                    {['Radar: 20 Buscas/Dia', 'IA Mentor: 10 Perguntas/Dia', 'IA Prospecção: 10 Mensagens/Dia', 'Scripts de Elite'].map((f) => (
                      <li key={f} className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-white/80">
                        <CheckCircle2 className="h-3.5 w-3.5 text-amber-500" /> {f}
                      </li>
                    ))}
                  </ul>
                </div>
                <Button asChild className="w-full h-14 mt-10 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 font-black uppercase tracking-widest text-[11px]">
                  <a href={CHECKOUT_MENSAL} target="_blank" rel="noopener noreferrer">Acessar agora</a>
                </Button>
              </Card>
            </motion.div>

            {/* PLANO TRIMESTRAL */}
            <motion.div {...fadeInUp} transition={{ delay: 0.1 }}>
              <Card className="h-full bg-white/[0.03] border-primary/50 p-8 flex flex-col justify-between relative rounded-3xl shadow-[0_0_50px_rgba(139,92,246,0.15)] ring-2 ring-primary/20">
                <div className="absolute top-0 right-0 p-4">
                  <Badge className="bg-primary text-white font-black text-[8px] uppercase px-3 py-1">MAIS ESCOLHIDO</Badge>
                </div>
                <div className="space-y-8">
                  <p className="text-[10px] font-black text-primary uppercase tracking-[0.2em] italic">Ideal para: quem já validou e quer economia</p>
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 px-3 py-1 bg-primary/20 border border-primary/30 rounded-full w-fit">
                      <Timer className="h-3 w-3 text-primary" />
                      <span className="text-[8px] font-black uppercase tracking-widest text-primary">Melhor Custo-Benefício</span>
                    </div>
                    <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-white/70 flex items-center gap-2">
                      <Zap className="h-4 w-4 text-primary fill-primary" /> Flow Trimestral
                    </h3>
                    <div className="flex items-baseline gap-1">
                      <p className="text-5xl md:text-6xl font-black italic text-white tracking-tighter">R$ 197</p>
                      <span className="text-sm font-bold opacity-50 uppercase tracking-widest">/tri</span>
                    </div>
                  </div>

                  <ul className="space-y-4 pt-6 border-t border-white/5">
                    {['Radar de Leads PRO', 'IA Mentor Treinado', 'Scripts de Volume', 'Acesso à Fase de Escala', '3 Meses de Acesso'].map((f) => (
                      <li key={f} className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-white">
                        <CheckCircle2 className="h-3.5 w-3.5 text-primary" /> {f}
                      </li>
                    ))}
                  </ul>
                </div>
                <Button asChild className="w-full h-14 mt-10 rounded-xl bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-widest text-[11px] shadow-xl">
                  <a href={CHECKOUT_TRIMESTRAL} target="_blank" rel="noopener noreferrer">Acessar agora</a>
                </Button>
              </Card>
            </motion.div>

            {/* PLANO VITALÍCIO */}
            <motion.div {...fadeInUp} transition={{ delay: 0.15 }}>
              <Card className="h-full bg-white/[0.02] border-accent/40 p-8 flex flex-col justify-between relative rounded-3xl">
                <div className="space-y-8">
                  <p className="text-[10px] font-black text-accent uppercase tracking-[0.2em] italic">Ideal para: quem veio pra ficar e escalar</p>
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 px-3 py-1 bg-accent/20 border border-accent/30 rounded-full w-fit">
                      <Infinity className="h-3 w-3 text-accent" />
                      <span className="text-[8px] font-black uppercase tracking-widest text-accent">Pagamento Único</span>
                    </div>
                    <h3 className="text-[12px] font-black uppercase tracking-[0.2em] text-white/70 flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-accent fill-accent" /> Flow Vitalício
                    </h3>
                    <div className="flex items-baseline gap-1">
                      <p className="text-5xl md:text-6xl font-black italic text-white tracking-tighter">R$ 287</p>
                    </div>
                  </div>

                  <ul className="space-y-4 pt-6 border-t border-white/5">
                    {['Radar ILIMITADO', 'IA Mentor 24h ILIMITADO', 'IA de Prospecção ILIMITADA', 'Jornada Vitalícia', 'Sem Mensalidades'].map((f) => (
                      <li key={f} className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-white">
                        <CheckCircle2 className="h-3.5 w-3.5 text-accent" /> {f}
                      </li>
                    ))}
                  </ul>
                </div>
                <Button asChild className="w-full h-14 mt-10 rounded-xl bg-accent hover:bg-accent/90 text-white font-black uppercase tracking-widest text-[11px] shadow-xl shadow-accent/20">
                  <a href={CHECKOUT_VITALICIO} target="_blank" rel="noopener noreferrer">Acessar agora</a>
                </Button>
              </Card>
            </motion.div>
          </div>

          {/* GARANTIA BLOCK */}
          <div className="mt-12 flex justify-center">
            <div className="flex flex-col md:flex-row items-center gap-6 px-10 py-6 bg-white/[0.03] border border-white/5 rounded-3xl backdrop-blur-md max-w-3xl">
              <div className="h-16 w-16 rounded-2xl bg-green-500/10 flex items-center justify-center border border-green-500/20 shrink-0">
                <ShieldCheck className="h-10 w-10 text-green-500" />
              </div>
              <div className="space-y-1 text-center md:text-left">
                <h4 className="text-sm font-black uppercase tracking-widest text-white italic">Garantia Incondicional de 7 Dias</h4>
                <p className="text-[11px] text-white/40 leading-relaxed uppercase font-medium">Você tem 7 dias inteiros para testar o arsenal. Se não ver o Flow acontecer, devolvemos 100% do seu dinheiro. Sem perguntas.</p>
              </div>
            </div>
          </div>
        </section>

        {/* DEPOIMENTOS */}
        <section className="max-w-[1100px] mx-auto px-6 md:px-12 py-20 md:py-32">
          <motion.div className="text-center md:text-left mb-16" {...fadeInUp}>
            <Badge className="bg-primary/10 text-primary border-none text-[10px] font-black uppercase px-3 py-1 mb-4">RESULTADOS REAIS</Badge>
            <h2 className="text-[28px] md:text-[48px] font-extrabold tracking-[-0.5px] text-white uppercase italic">Quem já está na jornada.</h2>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
          >
            {TESTIMONIALS.map((t) => (
              <motion.div key={t.author} variants={fadeInUp}>
                <Card className="bg-white/[0.03] border-white/[0.07] rounded-3xl p-10 space-y-6 hover:-translate-y-2 transition-all duration-500 h-full flex flex-col">
                  <div className="text-[48px] text-primary/30 font-serif leading-none h-6">“</div>
                  <div className="flex gap-1 mb-2">
                    {[1,2,3,4,5].map(s => <Star key={s} className="h-3.5 w-3.5 fill-[#f59e0b] text-[#f59e0b]" />)}
                  </div>
                  <p className="text-[15px] md:text-[16px] text-white/65 leading-[1.8] italic flex-1">
                    {t.text} <span className="text-primary font-black not-italic text-lg">{t.highlight}</span> {t.textEnd}
                  </p>
                  <div className="flex items-center gap-4 pt-6 border-t border-white/5">
                    <div className="h-12 w-12 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center font-black text-primary text-sm shrink-0">
                      {t.initial}
                    </div>
                    <div>
                      <p className="text-[14px] font-bold text-white">{t.author}</p>
                      <p className="text-[11px] text-white/30 font-black uppercase tracking-widest">{t.context}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          <div className="mt-16 text-center space-y-6">
            <p className="text-[11px] font-black text-white/20 uppercase tracking-[0.4em]">Mais de 1.817 profissionais já começaram</p>
            <div className="flex justify-center -space-x-3 opacity-40 grayscale">
              {[1,2,3,4,5,6].map(i => (
                <div key={i} className="h-10 w-10 rounded-full bg-white/10 border-2 border-[#05050f] flex items-center justify-center font-black text-[10px]">
                  {String.fromCharCode(64 + i)}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="max-w-[1100px] mx-auto px-6 md:px-12 py-20 md:py-32">
          <motion.h2 className="text-[28px] md:text-[36px] font-extrabold tracking-[-0.5px] text-white uppercase italic mb-12" {...fadeInUp}>
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
                <AccordionItem key={item.q} value={`item-${i}`} className="border-b border-white/[0.07] py-4">
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

        {/* CTA FINAL SECTION */}
        <section className="max-w-[1100px] mx-auto px-6 md:px-12 py-24 md:py-48 flex flex-col items-center text-center space-y-12">
          <motion.div 
            className="space-y-12 flex flex-col items-center"
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <div className="space-y-4">
              <Badge className="bg-accent/20 text-accent border border-accent/30 uppercase tracking-[0.3em] text-[10px] px-4 py-1.5 animate-pulse">Oferta de Tempo Limitado</Badge>
              <h2 className="text-[36px] md:text-[64px] font-extrabold tracking-[-1px] md:tracking-[-1.5px] text-white leading-tight max-w-[800px] uppercase italic">
                Últimas vagas com o preço atual.
              </h2>
            </div>

            {/* COUNTDOWN VISUAL */}
            <div className="flex gap-4 md:gap-8">
              {[
                { val: "23", label: "HORAS" },
                { val: "59", label: "MIN" },
                { val: "42", label: "SEG" }
              ].map((c, i) => (
                <div key={i} className="flex flex-col items-center gap-2">
                  <div className="h-16 w-16 md:h-24 md:w-24 bg-white/[0.03] border border-white/5 rounded-2xl flex items-center justify-center text-2xl md:text-4xl font-black italic font-mono text-primary shadow-2xl">
                    {c.val}
                  </div>
                  <span className="text-[8px] md:text-[10px] font-black text-white/20 tracking-widest">{c.label}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col items-center gap-4 w-full">
              <Button onClick={scrollToPricing} size="lg" className="group bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-widest text-[16px] h-[72px] px-12 rounded-2xl shadow-[0_20px_60px_rgba(139,92,246,0.5)] transition-all hover:scale-105 active:scale-95 border-none w-full sm:w-auto">
                QUERO MEU ACESSO AGORA 
                <motion.div 
                  animate={{ x: [0, 5, 0] }} 
                  transition={{ duration: 1, repeat: Infinity }}
                  className="ml-3"
                >
                  <ArrowRight className="h-6 w-6" />
                </motion.div>
              </Button>
              <div className="space-y-2">
                <p className="text-[11px] font-bold text-white/30 uppercase tracking-widest">Acesso imediato após o pagamento</p>
                <div className="flex items-center justify-center gap-4 opacity-30 grayscale contrast-200 scale-75">
                  <CreditCard className="h-5 w-5" />
                  <Zap className="h-5 w-5" />
                  <Infinity className="h-5 w-5" />
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        <footer className="max-w-[1100px] mx-auto px-6 md:px-12 py-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="relative h-4 w-16 opacity-50 grayscale contrast-200">
              <Image src={LOGO_URL} alt="FlowPro" fill className="object-contain" loading="lazy" sizes="64px" />
            </div>
            <span className="text-[12px] text-white/20 font-medium tracking-tight">© 2025 FlowPro Systems. Todos os direitos reservados.</span>
          </div>
          
          <div className="flex items-center gap-8">
            <Link href="#" prefetch={false} className="text-[12px] text-white/25 hover:text-white transition-colors uppercase font-bold tracking-widest">Termos</Link>
            <Link href="#" prefetch={false} className="text-[12px] text-white/25 hover:text-white transition-colors uppercase font-bold tracking-widest">Privacidade</Link>
          </div>
        </footer>
      </main>
    </div>
  );
}
