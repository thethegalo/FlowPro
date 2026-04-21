
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
  MapPin,
  TrendingUp,
  Timer,
  CreditCard,
  Sparkles
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

export default function Home() {
  const [timeLeft, setTimeLeft] = useState({ h: '23', m: '59', s: '42' });

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
    const el = document.getElementById('precos');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
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
            <Link href="#arsenal" prefetch={false} className="text-[13px] font-medium text-white/50 hover:text-white transition-colors">Arsenal</Link>
            <button onClick={scrollToPricing} className="text-[13px] font-medium text-white/50 hover:text-white transition-colors">Preços</button>
            <Link href="#faq" prefetch={false} className="text-[13px] font-medium text-white/50 hover:text-white transition-colors">Dúvidas</Link>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Link href="/auth" prefetch={false} className="text-[13px] text-white/50 hover:text-white transition-colors font-medium px-2">Entrar</Link>
          <Button onClick={scrollToPricing} className="bg-primary hover:bg-primary/90 text-white font-bold text-[12px] h-10 px-6 rounded-xl border-none shadow-lg shadow-primary/20">
            Começar Agora
          </Button>
        </div>
      </nav>

      <main className="relative z-10">
        <section className="relative pt-32 pb-16 md:pt-48 md:pb-24 overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                  </span>
                  ✦ 1.817+ Operadores Ativos
                </div>

                <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.1] text-white">
                  Sua primeira venda <br className="hidden md:block" />
                  <span className="text-primary italic">começa com um script.</span>
                </h1>

                <p className="text-lg text-white/60 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                  Encontre leads qualificados, gere abordagens com IA e realize sua primeira venda em tempo recorde usando o arsenal FlowPro.
                </p>

                <div className="flex flex-col items-center lg:items-start gap-6 pt-4">
                  <Button 
                    onClick={scrollToPricing} 
                    size="lg" 
                    className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-widest text-[14px] h-[64px] px-12 rounded-2xl shadow-[0_20px_50px_rgba(139,92,246,0.4)] transition-all hover:scale-105"
                  >
                    INICIAR JORNADA <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  
                  <div className="flex flex-wrap justify-center lg:justify-start gap-x-6 gap-y-2">
                    <div className="flex items-center gap-2 text-[10px] font-bold text-white/40 uppercase tracking-widest">
                      <ShieldCheck className="h-3 w-3 text-green-500" /> Sem cartão de crédito
                    </div>
                    <div className="flex items-center gap-2 text-[10px] font-bold text-white/40 uppercase tracking-widest">
                      <Zap className="h-3 w-3 text-primary" /> Resultado em 7 dias
                    </div>
                    <div className="flex items-center gap-2 text-[10px] font-bold text-white/40 uppercase tracking-widest">
                      <CheckCircle2 className="h-3 w-3 text-primary" /> Suporte no grupo
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative hidden lg:block">
                <div className="absolute inset-0 bg-primary/20 rounded-full blur-[120px] animate-pulse pointer-events-none" />
                <Card className="relative bg-[#0a0a14] border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl border">
                  <div className="h-12 bg-white/5 border-b border-white/5 flex items-center px-6 gap-2">
                    <div className="h-3 w-3 rounded-full bg-red-500/50" />
                    <div className="h-3 w-3 rounded-full bg-yellow-500/50" />
                    <div className="h-3 w-3 rounded-full bg-green-500/50" />
                    <div className="ml-auto text-[10px] font-bold text-white/20 tracking-widest">FLOW_NEURAL_V2.exe</div>
                  </div>
                  <div className="p-10 space-y-8 font-mono text-[14px]">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-xl bg-primary/20 border border-primary/30 flex items-center justify-center">
                        <Zap className="h-5 w-5 text-primary" />
                      </div>
                      <span className="text-white/40 uppercase tracking-widest text-[11px] font-bold">Gerando Script de Conversão...</span>
                    </div>
                    
                    <div className="space-y-6">
                      <div className="flex items-center gap-2 text-primary/60 text-xs">
                        <span className="animate-pulse">●</span> Analisando nicho: [ODONTOLOGIA]
                      </div>
                      <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/5 text-white/90 leading-relaxed italic relative">
                        "Olá <span className="text-primary font-bold">@doutor</span>, notei que sua clínica ainda não usa automação IA para agendamentos. Isso faz vocês perderem pacientes para quem responde em segundos. Posso te mandar como resolvemos isso hoje?"
                        <span className="inline-block w-2 h-5 bg-primary ml-1 translate-y-1 animate-blink" />
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 border-y border-white/5 bg-white/[0.01]">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {[
                { val: "1.817+", label: "Operadores Ativos", sub: "Comunidade em escala" },
                { val: "R$ 2,6M", label: "Gerado pela Base", sub: "Faturamento acumulado" },
                { val: "3,8 dias", label: "Média para 1ª Venda", sub: "Velocidade de execução" }
              ].map((m, i) => (
                <div 
                  key={m.label} 
                  className={cn("flex flex-col items-center md:items-start text-center md:text-left", i !== 0 && "md:pl-12 md:border-l border-white/5")}
                >
                  <span className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tighter leading-none">{m.val}</span>
                  <span className="text-sm font-bold text-primary uppercase tracking-widest mt-3">{m.label}</span>
                  <span className="text-xs text-white/30 uppercase mt-1">{m.sub}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="arsenal" className="py-12 md:py-20">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="max-w-3xl mb-16 space-y-4">
              <Badge className="bg-primary/20 text-primary border-none text-xs font-black uppercase px-4 py-1.5 rounded-lg">FERRAMENTAS DE ELITE</Badge>
              <h2 className="text-4xl md:text-6xl font-black text-white uppercase italic leading-none">O seu arsenal tático.</h2>
              <p className="text-lg text-white/40 leading-relaxed">As ferramentas que transformam um lead frio em um fechamento no PIX em poucos minutos.</p>
            </div>

            <motion.div 
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
              variants={staggerContainer}
              initial="initial"
              whileInView="whileInView"
            >
              <motion.div variants={fadeInUp}>
                <Card className="bg-white/[0.02] border-white/10 rounded-[2.5rem] p-8 group transition-all duration-500 hover:border-primary/40 h-full flex flex-col space-y-8 border shadow-sm">
                  <div className="h-14 w-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                    <MessageSquare className="h-7 w-7" />
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-bold text-white uppercase italic">Script IA Pronto</h3>
                      <Badge className="bg-primary text-white text-[8px] font-black uppercase">Mais Usado</Badge>
                    </div>
                    <p className="text-sm text-white/40 leading-relaxed">A IA escreve a abordagem personalizada no WhatsApp para você com base no nicho do lead.</p>
                  </div>
                  
                  <div className="mt-auto pt-8 border-t border-white/5 space-y-4">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                      <span className="text-[10px] font-black text-white/20 uppercase tracking-widest">Output Simulado</span>
                    </div>
                    <div className="bg-black/40 rounded-2xl p-5 border border-white/5 text-[11px] text-white/70 font-mono leading-relaxed italic">
                      "Olá <span className="text-primary font-bold">@cliente</span>, vi que sua <span className="text-primary font-bold">@empresa</span> está sem presença digital estratégica..."
                    </div>
                  </div>
                </Card>
              </motion.div>

              <motion.div variants={fadeInUp}>
                <Card className="bg-white/[0.02] border-white/10 rounded-[2.5rem] p-8 h-full flex flex-col space-y-8 border shadow-sm">
                  <div className="h-14 w-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                    <Target className="h-7 w-7" />
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-xl font-bold text-white uppercase italic">Radar de Leads</h3>
                    <p className="text-sm text-white/40 leading-relaxed">Encontre donos de negócio em qualquer nicho e região com nosso motor de busca neural integrado.</p>
                  </div>

                  <div className="mt-auto pt-8 border-t border-white/5 space-y-3">
                    <div className="space-y-2">
                      {[
                        { name: "Padaria do João", city: "São Paulo", color: "text-green-500" },
                        { name: "Dentista Silva", city: "Curitiba", color: "text-primary" }
                      ].map((l, i) => (
                        <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5">
                          <div className="flex items-center gap-3">
                            <MapPin className="h-3 w-3 text-primary opacity-50" />
                            <span className="text-[10px] font-bold text-white uppercase">{l.name}</span>
                          </div>
                          <Badge className="bg-green-500/20 text-green-500 text-[8px] font-black px-2 py-0.5">NOVO</Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>
              </motion.div>

              <motion.div variants={fadeInUp}>
                <Card className="bg-white/[0.02] border-white/10 rounded-[2.5rem] p-8 h-full flex flex-col space-y-8 border shadow-sm">
                  <div className="h-14 w-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                    <Route className="h-7 w-7" />
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-xl font-bold text-white uppercase italic">Jornada de 7 Dias</h3>
                    <p className="text-sm text-white/40 leading-relaxed">Processo guiado passo a passo que já fechou mais de 479 vendas reais para iniciantes.</p>
                  </div>

                  <div className="mt-auto pt-8 border-t border-white/5">
                    <div className="flex items-center justify-between px-2">
                      {[1, 2, 3, 4, 5].map((d) => (
                        <div key={d} className="flex flex-col items-center gap-2">
                          <div className={cn(
                            "h-6 w-6 rounded-full flex items-center justify-center text-[10px] font-black border",
                            d <= 3 ? "bg-green-500 border-green-500 text-white" : "bg-white/5 border-white/10 text-white/20"
                          )}>
                            {d <= 3 ? <Check className="h-3 w-3" /> : d}
                          </div>
                          <span className="text-[8px] font-bold text-white/20 uppercase">Dia {d}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>
              </motion.div>
            </motion.div>
          </div>
        </section>

        <section id="precos" className="py-12 md:py-20 relative">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="text-center space-y-6 mb-16">
              <Badge className="bg-primary/20 text-primary border border-primary/30 uppercase tracking-[0.3em] text-[10px] px-6 py-2 rounded-full">ROTA DE ESCALA</Badge>
              <h2 className="text-4xl md:text-7xl font-black italic uppercase tracking-tighter leading-tight text-white">
                Domine o mercado <br /><span className="text-primary">com poder IA.</span>
              </h2>
              <p className="text-white/50 text-lg max-w-2xl mx-auto">
                Libere o arsenal completo e comece a faturar em escala agora mesmo com o método validado.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
              <motion.div variants={fadeInUp} initial="initial" whileInView="whileInView">
                <Card className="h-full bg-white/[0.02] border-white/10 p-10 flex flex-col justify-between relative rounded-[2.5rem] border shadow-sm">
                  <div className="space-y-8">
                    <p className="text-[10px] font-black text-primary uppercase tracking-widest italic">Iniciante</p>
                    <div className="space-y-4">
                      <h3 className="text-xs font-black uppercase tracking-widest text-white/80 flex items-center gap-2">
                        <Zap className="h-4 w-4 text-amber-500" /> Flow Mensal
                      </h3>
                      <div className="flex items-baseline gap-1">
                        <p className="text-6xl font-black italic text-white tracking-tighter">R$ 97</p>
                        <span className="text-sm font-bold opacity-50 uppercase tracking-widest">/mês</span>
                      </div>
                    </div>

                    <ul className="space-y-4 pt-8 border-t border-white/5">
                      {['Radar de Leads ILIMITADO', 'IA Mentor ILIMITADO', 'IA Prospecção ILIMITADA', 'Scripts de Elite'].map((f) => (
                        <li key={f} className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-white/90">
                          <CheckCircle2 className="h-4 w-4 text-primary" /> {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Button asChild className="w-full h-14 mt-12 rounded-2xl bg-white/5 border border-white/10 text-white hover:bg-white/10 font-black uppercase tracking-widest text-xs">
                    <a href={CHECKOUT_MENSAL} target="_blank" rel="noopener noreferrer">Assinar Agora</a>
                  </Button>
                </Card>
              </motion.div>

              <motion.div variants={fadeInUp} initial="initial" whileInView="whileInView" className="relative">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20">
                  <Badge className="bg-primary text-white font-black text-[10px] uppercase px-6 py-2 rounded-full shadow-xl">MAIS ESCOLHIDO</Badge>
                </div>
                <Card className="h-full bg-white/[0.03] border-primary/50 p-10 flex flex-col justify-between relative rounded-[2.5rem] border shadow-2xl ring-2 ring-primary/20">
                  <div className="space-y-8">
                    <p className="text-[10px] font-black text-primary uppercase tracking-widest italic">Custo Benefício</p>
                    <div className="space-y-4">
                      <h3 className="text-xs font-black uppercase tracking-widest text-white/80 flex items-center gap-2">
                        <Timer className="h-4 w-4 text-primary" /> Flow Trimestral
                      </h3>
                      <div className="flex items-baseline gap-1">
                        <p className="text-6xl font-black italic text-white tracking-tighter">R$ 197</p>
                        <span className="text-sm font-bold opacity-50 uppercase tracking-widest">/tri</span>
                      </div>
                    </div>

                    <ul className="space-y-4 pt-8 border-t border-white/5">
                      {['Radar de Leads ILIMITADO', 'IA Mentor ILIMITADO', 'Scripts de Volume', 'Acesso à Fase de Escala', '3 Meses de Acesso Total'].map((f) => (
                        <li key={f} className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-white">
                          <CheckCircle2 className="h-4 w-4 text-primary" /> {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Button asChild className="w-full h-14 mt-12 rounded-2xl bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-widest text-xs shadow-xl shadow-primary/20">
                    <a href={CHECKOUT_TRIMESTRAL} target="_blank" rel="noopener noreferrer">Garantir Desconto</a>
                  </Button>
                </Card>
              </motion.div>

              <motion.div variants={fadeInUp} initial="initial" whileInView="whileInView" className="relative">
                <div className="relative p-[2px] rounded-[2.5rem] overflow-hidden shadow-[0_0_100px_rgba(139,92,246,0.3)] h-full">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary via-accent to-primary animate-pulse" style={{ willChange: 'transform' }}></div>
                  <Card className="h-full relative bg-[#050508] p-10 flex flex-col justify-between border-none rounded-[calc(2.5rem-2px)]">
                    <div className="absolute top-6 right-6 bg-primary text-white text-[9px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest shadow-lg flex items-center gap-1.5">
                      <Star className="h-3 w-3 fill-white" /> RECOMENDADO
                    </div>
                    
                    <div className="space-y-8">
                      <p className="text-[10px] font-black text-primary uppercase tracking-widest italic">Acesso Vitalício</p>
                      <div className="space-y-4">
                        <h3 className="text-xs font-black uppercase tracking-widest text-white/80 flex items-center gap-2">
                          <Infinity className="h-4 w-4 text-primary" /> Flow Vitalício
                        </h3>
                        <div className="flex items-baseline gap-1">
                          <p className="text-6xl md:text-7xl font-black italic text-white tracking-tighter">R$ 287</p>
                        </div>
                      </div>

                      <ul className="space-y-4 pt-4 border-t border-white/5">
                        {[
                          'Radar de Leads ILIMITADO', 
                          'IA Mentor 24h ILIMITADO', 
                          'IA de Prospecção ILIMITADA', 
                          'Jornada Vitalícia', 
                          'Sem Mensalidades ou Taxas'
                        ].map((f) => (
                          <li key={f} className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-white">
                            <CheckCircle2 className="h-4 w-4 text-primary" /> {f}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <Button asChild className="w-full h-16 mt-12 rounded-2xl bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-widest text-sm shadow-[0_15px_30px_rgba(139,92,246,0.4)] transition-all hover:scale-[1.02]">
                      <a href={CHECKOUT_VITALICIO} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
                        GARANTIR VITALÍCIO <Sparkles className="h-4 w-4" />
                      </a>
                    </Button>
                  </Card>
                </div>
              </motion.div>
            </div>

            <div className="mt-16 flex justify-center">
              <div className="flex flex-col md:flex-row items-center gap-8 px-12 py-8 bg-white/[0.03] border border-white/10 rounded-[3rem] max-w-4xl shadow-sm">
                <div className="h-20 w-20 rounded-2xl bg-green-500/10 flex items-center justify-center border border-green-500/20 shrink-0">
                  <ShieldCheck className="h-12 w-12 text-green-500" />
                </div>
                <div className="space-y-2 text-center md:text-left">
                  <h4 className="text-lg font-black uppercase tracking-widest text-white italic">Garantia Incondicional de 7 Dias</h4>
                  <p className="text-sm text-white/50 leading-relaxed font-medium">Você tem 7 dias inteiros para testar o arsenal. Se não ver o Flow acontecer, devolvemos 100% do seu dinheiro. Sem burocracia.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-20 bg-white/[0.01]">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="text-center md:text-left mb-16 space-y-4">
              <Badge className="bg-primary/10 text-primary border-none text-xs font-black uppercase px-4 py-1.5 rounded-lg">RESULTADOS REAIS</Badge>
              <h2 className="text-4xl md:text-6xl font-black text-white uppercase italic leading-none">Quem já está na jornada.</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {TESTIMONIALS.map((t) => (
                <div key={t.author}>
                  <Card className="bg-white/[0.02] border-white/10 rounded-[2.5rem] p-10 space-y-8 h-full flex flex-col border shadow-sm">
                    <div className="flex gap-1">
                      {[1,2,3,4,5].map(s => <Star key={s} className="h-4 w-4 fill-amber-500 text-amber-500" />)}
                    </div>
                    <p className="text-lg text-white/80 leading-relaxed italic flex-1">
                      {t.text} <span className="text-primary font-black not-italic text-2xl">{t.highlight}</span> {t.textEnd}
                    </p>
                    <div className="flex items-center gap-4 pt-8 border-t border-white/5">
                      <div className="h-12 w-12 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center font-black text-primary text-sm shrink-0">
                        {t.initial}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-white uppercase">{t.author}</p>
                        <p className="text-[10px] font-black text-white/30 uppercase tracking-widest">{t.context}</p>
                      </div>
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="faq" className="py-12 md:py-20">
          <div className="max-w-4xl mx-auto px-6 md:px-12">
            <h2 className="text-4xl md:text-5xl font-black text-white uppercase italic mb-16 text-center">Dúvidas frequentes.</h2>
            
            <div className="space-y-4">
              <Accordion type="single" collapsible className="w-full">
                {[
                  { q: "O sistema funciona para quem não tem experiência?", a: "Sim. O FlowPro foi desenhado como uma jornada guiada passo a passo. Você só precisa seguir as missões diárias e usar os scripts gerados pela nossa IA." },
                  { q: "Como a IA ajuda no processo de vendas?", a: "Nossa IA analisa o nicho do lead e gera uma abordagem personalizada que não parece spam, aumentando as chances de resposta no WhatsApp em até 300%." },
                  { q: "Em quanto tempo vejo os primeiros resultados?", a: "Nossa jornada foi feita para você realizar sua primeira venda em até 7 dias, desde que execute todas as tarefas propostas diariamente." },
                  { q: "Preciso aparecer nas redes sociais?", a: "Não. Ensinamos estratégias de bastidores onde você pode prospectar e fechar contratos sem nunca precisar mostrar o rosto." }
                ].map((item, i) => (
                  <AccordionItem key={item.q} value={`item-${i}`} className="border-b border-white/5 py-4">
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
          </div>
        </section>

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

        <footer className="py-16 border-t border-white/5 bg-[#030305]">
          <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="flex flex-col items-center md:items-start gap-4">
              <div className="relative h-6 w-24 opacity-40 grayscale contrast-200">
                <Image src={LOGO_URL} alt="FlowPro" fill className="object-contain" loading="lazy" sizes="96px" />
              </div>
              <p className="text-[11px] text-white/20 font-medium tracking-tight">© 2025 FlowPro Systems • Todos os direitos reservados.</p>
            </div>
            
            <div className="flex items-center gap-12">
              <Link href="#" prefetch={false} className="text-[11px] text-white/40 hover:text-white transition-colors uppercase font-black tracking-widest">Termos de Uso</Link>
              <Link href="#" prefetch={false} className="text-[11px] text-white/40 hover:text-white transition-colors uppercase font-black tracking-widest">Privacidade</Link>
              <div className="h-10 w-px bg-white/5 hidden md:block" />
              <div className="flex items-center gap-3">
                <ShieldCheck className="h-5 w-5 text-white/20" />
                <TrendingUp className="h-5 w-5 text-white/20" />
              </div>
            </div>
          </div>
        </footer>
      </main>

      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/10 rounded-full blur-[160px]"></div>
      </div>
    </div>
  );
}
