
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
  Sparkles,
  Users,
  Layout,
  Terminal,
  MousePointerClick,
  Smartphone,
  Search,
  Building2,
  Scissors,
  Stethoscope,
  Utensils,
  Dumbbell,
  ShoppingBag,
  Circle,
  DollarSign
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
    author: "Ana Oliveira", context: "Especialista em Escala", initial: "A",
    proof: "Pix recebido R$ 1.500,00 — 14:32"
  },
  { 
    text: "O Radar de Leads é bizarro. Achei 50 dentistas na minha cidade e a IA gerou abordagens que todos responderam. Já faturei ",
    highlight: "R$ 3.500",
    textEnd: ".",
    author: "Bruno Silva", context: "Consultor Fase 1", initial: "B",
    proof: "Pix recebido R$ 3.500,00 — 09:15"
  },
  { 
    text: "A barreira de não saber o que falar sumiu. Copiei o script da IA, mandei no WhatsApp e o cliente fechou um contrato de ",
    highlight: "R$ 2.000",
    textEnd: " na hora. Simples assim.",
    author: "Juliana Reus", context: "Venda em 48h", initial: "J",
    proof: "Pix recebido R$ 2.000,00 — 16:40"
  }
];

const CHECKOUT_VITALICIO = "https://checkout.flowproia.shop/pay/PPU38CQ9FCP";

export default function Home() {
  const [timeLeft, setTimeLeft] = useState({ h: '23', m: '59', s: '42' });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const midnight = new Date();
      midnight.setHours(24, 0, 0, 0);
      const diff = midnight.getTime() - now.getTime();
      if (diff <= 0) return;
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
    <div className="flex flex-col min-h-screen text-white bg-[#05050f] overflow-x-hidden relative font-body">
      <nav className="fixed top-0 w-full h-[64px] bg-[#05050f]/80 backdrop-blur-xl border-b border-white/5 z-50 px-6 md:px-12 flex items-center justify-between">
        <div className="flex items-center gap-12">
          <Link href="/" className="flex items-center gap-2">
            <div className="relative h-6 w-24">
              <Image src={LOGO_URL} alt="FlowPro" fill className="object-contain" sizes="96px" priority />
            </div>
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <Link href="#como-funciona" className="text-[13px] font-medium text-white/50 hover:text-white transition-colors">Como funciona</Link>
            <Link href="#arsenal" className="text-[13px] font-medium text-white/50 hover:text-white transition-colors">Arsenal</Link>
            <button onClick={scrollToPricing} className="text-[13px] font-medium text-white/50 hover:text-white transition-colors">Preços</button>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/auth" className="text-[13px] text-white/50 hover:text-white transition-colors font-medium px-2">Entrar</Link>
          <Button onClick={scrollToPricing} className="bg-primary hover:bg-primary/90 text-white font-bold text-[12px] h-10 px-6 rounded-xl border-none shadow-lg shadow-primary/20">
            Começar Agora
          </Button>
        </div>
      </nav>

      <main className="relative z-10">
        {/* HERO SECTION */}
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

                <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.1] text-white italic uppercase">
                  Sua primeira venda <br className="hidden md:block" />
                  <span className="text-primary">começa com um script.</span>
                </h1>

                <p className="text-lg md:text-xl text-white/60 max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
                  Acesse o Radar de Leads, deixe a IA escrever sua abordagem e feche seu primeiro cliente no WhatsApp — em até 7 dias.
                </p>

                <div className="flex flex-col items-center lg:items-start gap-6 pt-4">
                  <Button 
                    onClick={scrollToPricing} 
                    size="lg" 
                    className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-widest text-[14px] h-[72px] px-12 rounded-2xl shadow-[0_20px_50px_rgba(139,92,246,0.4)] transition-all hover:scale-105"
                  >
                    INICIAR JORNADA AGORA <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  <p className="text-[11px] font-bold text-white/30 uppercase tracking-[0.2em]">
                    Usado por iniciantes e consultores que vendem serviços digitais via WhatsApp.
                  </p>
                </div>
              </div>

              <div className="relative hidden lg:block">
                <div className="absolute inset-0 bg-primary/20 rounded-full blur-[120px] animate-pulse pointer-events-none" />
                <Card className="relative bg-[#0a0a14] border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl border">
                  <div className="h-12 bg-white/5 border-b border-white/5 flex items-center px-6 gap-2">
                    <div className="h-3 w-3 rounded-full bg-red-500/50" />
                    <div className="h-3 w-3 rounded-full bg-yellow-500/50" />
                    <div className="h-3 w-3 rounded-full bg-green-500/50" />
                    <div className="ml-auto text-[10px] font-bold text-white/20 tracking-widest">SISTEMA_FLOW_V2.0</div>
                  </div>
                  <div className="p-10 space-y-8 font-mono text-[14px]">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="h-2 w-2 rounded-full bg-primary animate-ping" />
                        <span className="text-white/40 uppercase tracking-widest text-[11px] font-bold">Radar Neural Ativo</span>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-2">
                          <div className="h-1.5 w-12 bg-primary/40 rounded-full" />
                          <div className="h-2 w-24 bg-white/10 rounded-full" />
                        </div>
                        <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-2">
                          <div className="h-1.5 w-12 bg-primary/40 rounded-full" />
                          <div className="h-2 w-24 bg-white/10 rounded-full" />
                        </div>
                      </div>
                    </div>
                    <div className="p-6 rounded-2xl bg-primary/5 border border-primary/20 text-white/90 leading-relaxed italic relative">
                      "Olá @cliente, identifiquei que sua @empresa ainda não tem um site otimizado para o Google. Isso faz vocês perderem 40% das vendas locais..."
                      <span className="inline-block w-2 h-5 bg-primary ml-1 translate-y-1 animate-blink" />
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* COMO FUNCIONA */}
        <section id="como-funciona" className="py-24 bg-white/[0.02] border-y border-white/5">
          <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-16">
            <div className="text-center space-y-4">
              <Badge className="bg-primary/20 text-primary uppercase font-black tracking-widest text-[10px] px-4 py-1">Processo de Elite</Badge>
              <h2 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter">Como funciona o FlowPro</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                { id: "01", title: "Acesse a plataforma", desc: "Crie sua conta e entre no painel FlowPro em segundos.", icon: Layout },
                { id: "02", title: "Encontre leads com o Radar", desc: "Busque donos de negócio por nicho e cidade usando nosso motor neural.", icon: Search },
                { id: "03", title: "A IA escreve sua abordagem", desc: "Selecione o lead e receba um script personalizado para WhatsApp.", icon: Zap },
                { id: "04", title: "Mande e feche", desc: "Envie a mensagem, responda com confiança e receba seu primeiro PIX.", icon: DollarSign }
              ].map((step, i) => (
                <div key={i} className="relative group p-8 rounded-[2rem] bg-[#0a0a14] border border-white/5 hover:border-primary/40 transition-all">
                  <div className="text-5xl font-black italic text-primary/10 absolute top-6 right-8 group-hover:text-primary/20 transition-colors">{step.id}</div>
                  <div className="space-y-6 relative z-10">
                    <div className="h-12 w-12 rounded-xl bg-primary/20 border border-primary/30 flex items-center justify-center text-primary">
                      <step.icon className="h-6 w-6" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-lg font-bold uppercase italic text-white">{step.title}</h3>
                      <p className="text-sm text-white/40 leading-relaxed font-medium">{step.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ARSENAL EXPANDIDO */}
        <section id="arsenal" className="py-24 bg-[#030308]">
          <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-16">
            <div className="max-w-3xl space-y-4">
              <Badge className="bg-primary/20 text-primary uppercase font-black tracking-widest text-[10px] px-4 py-1">Arsenal de Elite</Badge>
              <h2 className="text-4xl md:text-6xl font-black text-white italic uppercase leading-none">Ferramentas de <br />Alta Densidade.</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* SCRIPT IA */}
              <Card className="bg-white/[0.02] border-white/10 rounded-[2.5rem] p-8 space-y-8 flex flex-col border shadow-sm group">
                <div className="h-14 w-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                  <MessageSquare className="h-7 w-7" />
                </div>
                <div className="space-y-3">
                  <h3 className="text-xl font-bold text-white uppercase italic">Script IA Pronto</h3>
                  <p className="text-sm text-white/40 leading-relaxed">O motor de IA compõe a abordagem perfeita baseada no nicho do lead em segundos.</p>
                </div>
                <div className="mt-auto bg-black/60 rounded-2xl border border-white/5 overflow-hidden">
                  <div className="h-8 bg-white/5 border-b border-white/5 flex items-center px-4 gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-white/20" />
                    <span className="text-[8px] font-bold text-white/20 uppercase tracking-widest">Output_Generator</span>
                  </div>
                  <div className="p-5 space-y-4">
                    <div className="flex items-center justify-between text-[9px] font-bold uppercase text-white/20">
                      <span>Nicho: Barbearia</span>
                      <span className="text-primary">Processando...</span>
                    </div>
                    <div className="h-px bg-white/5" />
                    <p className="text-[11px] text-white/60 font-mono italic leading-relaxed">
                      "Olá @cliente, notei que vocês ainda não usam reserva online. Isso faz vocês perderem 30%..."
                    </p>
                    <div className="h-8 w-full bg-primary rounded-lg flex items-center justify-center text-[9px] font-black uppercase text-white shadow-lg">Copiar Script</div>
                  </div>
                </div>
              </Card>

              {/* RADAR DE LEADS */}
              <Card className="bg-white/[0.02] border-white/10 rounded-[2.5rem] p-8 space-y-8 flex flex-col border shadow-sm">
                <div className="h-14 w-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                  <Target className="h-7 w-7" />
                </div>
                <div className="space-y-3">
                  <h3 className="text-xl font-bold text-white uppercase italic">Radar de Leads</h3>
                  <p className="text-sm text-white/40 leading-relaxed">Escaneie o mercado e encontre donos de negócio em qualquer região do Brasil.</p>
                </div>
                <div className="mt-auto space-y-2">
                  <div className="flex items-center gap-2 mb-4 bg-white/5 p-2 rounded-xl border border-white/5">
                    <Search className="h-3 w-3 text-white/20" />
                    <div className="h-2 w-full bg-white/10 rounded-full" />
                  </div>
                  {[
                    { n: "Padaria Belas Artes", t: "NOVO", i: Utensils, c: "São Paulo" },
                    { n: "Clínica Sorriso", t: "HOT", i: Stethoscope, c: "Curitiba" },
                    { n: "Academia Iron", t: "NOVO", i: Dumbbell, c: "Belo Horizonte" },
                    { n: "Barbearia Roots", t: "NOVO", i: Scissors, c: "Fortaleza" }
                  ].map((l, i) => (
                    <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] border border-white/5">
                      <div className="flex items-center gap-3">
                        <l.i className="h-3.5 w-3.5 text-primary/40" />
                        <span className="text-[10px] font-bold text-white uppercase truncate max-w-[80px]">{l.n}</span>
                      </div>
                      <Badge className={cn("text-[7px] font-black px-1.5 py-0.5", l.t === 'HOT' ? 'bg-orange-500/20 text-orange-500' : 'bg-green-500/20 text-green-500')}>{l.t}</Badge>
                    </div>
                  ))}
                </div>
              </Card>

              {/* JORNADA 7 DIAS */}
              <Card className="bg-white/[0.02] border-white/10 rounded-[2.5rem] p-8 space-y-8 flex flex-col border shadow-sm">
                <div className="h-14 w-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                  <Route className="h-7 w-7" />
                </div>
                <div className="space-y-3">
                  <h3 className="text-xl font-bold text-white uppercase italic">Jornada de 7 Dias</h3>
                  <p className="text-sm text-white/40 leading-relaxed">Um plano guiado passo a passo para você não se perder e vender rápido.</p>
                </div>
                <div className="mt-auto space-y-2">
                  {[
                    { d: 1, t: "Configurar Perfil", c: true },
                    { d: 2, t: "Primeiro Radar", c: true },
                    { d: 3, t: "Script Inicial", c: true },
                    { d: 4, t: "Primeira Abordagem", c: false },
                    { d: 5, t: "Follow-up", c: false },
                    { d: 6, t: "Objeções", c: false },
                    { d: 7, t: "Fechamento", c: false }
                  ].map((day, i) => (
                    <div key={i} className="flex items-center justify-between px-3 py-2 rounded-xl bg-white/5 border border-white/5">
                      <div className="flex items-center gap-3">
                        <span className="text-[9px] font-black text-white/20 uppercase">Dia {day.d}</span>
                        <span className={cn("text-[9px] font-bold uppercase", day.c ? 'text-white/60' : 'text-primary')}>{day.t}</span>
                      </div>
                      {day.c ? <Check className="h-3 w-3 text-green-500" /> : <div className="h-1.5 w-1.5 rounded-full bg-primary/20" />}
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* DEPOIMENTOS COM PROVA VISUAL */}
        <section className="py-24 px-6">
          <div className="max-w-7xl mx-auto space-y-16">
            <div className="text-center md:text-left space-y-4">
              <Badge className="bg-primary/10 text-primary uppercase font-black text-[10px] px-4 py-1">Resultados Reais</Badge>
              <h2 className="text-4xl md:text-6xl font-black text-white uppercase italic leading-none">Quem já está faturando.</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {TESTIMONIALS.map((t) => (
                <div key={t.author}>
                  <Card className="bg-white/[0.02] border-white/10 rounded-[2.5rem] p-10 space-y-8 h-full flex flex-col border shadow-sm group hover:border-primary/40 transition-all">
                    <div className="flex gap-1">
                      {[1,2,3,4,5].map(s => <Star key={s} className="h-4 w-4 fill-amber-500 text-amber-500" />)}
                    </div>
                    <p className="text-lg text-white/80 leading-relaxed italic flex-1">
                      "{t.text} <span className="text-primary font-black not-italic text-2xl">{t.highlight}</span> {t.textEnd}"
                    </p>
                    
                    {/* Visual Proof Mockup */}
                    <div className="p-4 rounded-2xl bg-[#0a0a0f] border border-green-500/20 flex items-center gap-4 shadow-xl">
                      <div className="h-10 w-10 bg-green-500/20 rounded-xl flex items-center justify-center text-green-500">
                        <Smartphone className="h-5 w-5" />
                      </div>
                      <div className="space-y-0.5">
                        <p className="text-[10px] font-black uppercase text-green-500 tracking-widest">Notificação de Banco</p>
                        <p className="text-[11px] font-bold text-white/90">{t.proof}</p>
                      </div>
                    </div>

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

        {/* FAQ FIXADO */}
        <section id="faq" className="py-24">
          <div className="max-w-4xl mx-auto px-6 md:px-12 space-y-16">
            <h2 className="text-4xl md:text-5xl font-black text-white uppercase italic text-center tracking-tighter">Dúvidas Frequentes</h2>
            
            <Accordion type="single" collapsible className="w-full space-y-4">
              {[
                { 
                  q: "O sistema funciona para quem não tem experiência?", 
                  a: "Sim. A Jornada de 7 Dias foi construída do zero para iniciantes. Você não precisa saber vender, apenas seguir o processo diário de missões." 
                },
                { 
                  q: "Como a IA ajuda no processo de vendas?", 
                  a: "Você informa o nicho do lead e a IA analisa o contexto para gerar uma abordagem personalizada e direta, aumentando as chances de resposta no WhatsApp em até 300%." 
                },
                { 
                  q: "Em quanto tempo vejo os primeiros resultados?", 
                  a: "Nossa média de base é de 3,8 dias para a primeira venda. Muitos usuários fecham contratos de R$ 500 a R$ 2.000 ainda na primeira semana de operação." 
                },
                { 
                  q: "Preciso aparecer nas redes sociais?", 
                  a: "Não. O método FlowPro é focado em prospecção ativa de bastidores via WhatsApp. Você não precisa de seguidores, nem de postar conteúdo para fechar clientes." 
                },
                { 
                  q: "O que exatamente eu recebo ao assinar?", 
                  a: "Você recebe acesso imediato à plataforma web com: Radar de Leads ilimitado, IA Geradora de Scripts, IA Sales Mentor para tirar dúvidas e a Jornada de 7 Dias guiada." 
                }
              ].map((item, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="border border-white/5 bg-white/[0.01] rounded-2xl px-6">
                  <AccordionTrigger className="text-base font-bold text-white/90 hover:no-underline py-6 text-left">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-white/50 leading-relaxed pb-6 italic">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* PRICING CALL TO ACTION */}
        <section id="precos" className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-primary/10 blur-[150px] rounded-full pointer-events-none" />
          <div className="max-w-4xl mx-auto px-6 text-center space-y-12 relative z-10">
            <div className="space-y-6">
              <Badge className="bg-amber-500/20 text-amber-500 border border-amber-500/30 uppercase tracking-[0.3em] text-[10px] px-6 py-2 rounded-full animate-pulse">Oferta de Tempo Limitado</Badge>
              <h2 className="text-5xl md:text-8xl font-black text-white leading-tight uppercase italic tracking-tighter">
                Últimas vagas com o preço atual.
              </h2>
            </div>

            <div className="flex justify-center gap-4 md:gap-8">
              {[
                { val: timeLeft.h, label: "HORAS" },
                { val: timeLeft.m, label: "MINUTOS" },
                { val: timeLeft.s, label: "SEGUNDOS" }
              ].map((c, i) => (
                <div key={i} className="flex flex-col items-center gap-3">
                  <div className="h-20 w-20 md:h-32 md:w-32 bg-[#0a0a14] border border-white/10 rounded-[2rem] flex items-center justify-center text-3xl md:text-6xl font-black italic font-mono text-primary shadow-2xl">
                    {c.val}
                  </div>
                  <span className="text-[10px] font-black text-white/30 tracking-widest">{c.label}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col items-center gap-8 w-full max-w-lg mx-auto">
              <div className="w-full relative p-[2px] rounded-[2rem] overflow-hidden bg-gradient-to-br from-primary via-accent to-primary animate-pulse">
                <Button 
                  asChild
                  size="lg" 
                  className="w-full h-24 rounded-[calc(2rem-2px)] bg-[#050508] hover:bg-black text-white font-black uppercase tracking-widest text-xl shadow-2xl transition-all hover:scale-[1.02]"
                >
                  <a href={CHECKOUT_VITALICIO} target="_blank" rel="noopener noreferrer">
                    GARANTIR ACESSO VITALÍCIO <ArrowRight className="ml-3 h-8 w-8" />
                  </a>
                </Button>
              </div>
              <div className="space-y-2">
                <p className="text-[12px] font-bold text-white/40 uppercase tracking-widest">Acesso imediato e vitalício após o pagamento</p>
                <div className="flex items-center justify-center gap-4 text-[10px] font-black text-green-500 uppercase tracking-widest">
                  <Check className="h-4 w-4" /> Pagamento 100% Seguro • 7 Dias de Garantia
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
              <Link href="#" className="text-[11px] text-white/40 hover:text-white transition-colors uppercase font-black tracking-widest">Termos de Uso</Link>
              <Link href="#" className="text-[11px] text-white/40 hover:text-white transition-colors uppercase font-black tracking-widest">Privacidade</Link>
              <div className="h-10 w-px bg-white/5 hidden md:block" />
              <div className="flex items-center gap-3 opacity-20">
                <ShieldCheck className="h-5 w-5" />
                <TrendingUp className="h-5 w-5" />
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
