
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
  DollarSign,
  Globe,
  Cpu
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
const CHECKOUT_MENSAL = "https://checkout.flowproia.shop/pay/PPU38CQ9FQU";

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
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-8 text-center lg:text-left"
              >
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold">
                  <Cpu className="h-3 w-3 animate-pulse" />
                  ✦ Inteligência Neural Ativa
                </div>

                <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.1] text-white italic uppercase">
                  A IA faz tudo por você. <br className="hidden md:block" />
                  <span className="text-primary">Venda sites em minutos.</span>
                </h1>

                <p className="text-lg md:text-xl text-white/60 max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
                  Radar de Leads + IA que cria sites e scripts em questões de minutos. Feche seu primeiro cliente no WhatsApp em tempo recorde — mesmo sem experiência.
                </p>

                <div className="flex flex-col items-center lg:items-start gap-6 pt-4">
                  <Button 
                    onClick={scrollToPricing} 
                    size="lg" 
                    className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-widest text-[14px] h-[72px] px-12 rounded-2xl shadow-[0_20px_50px_rgba(139,92,246,0.4)] transition-all hover:scale-105"
                  >
                    INICIAR JORNADA AGORA <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  <p className="text-[11px] font-bold text-white/40 uppercase tracking-[0.2em]">
                    Criação de sites e prospecção automatizada em um só lugar.
                  </p>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative hidden lg:block"
              >
                <div className="absolute inset-0 bg-primary/20 rounded-full blur-[120px] animate-pulse pointer-events-none" />
                <Card className="relative bg-[#0a0a14]/80 backdrop-blur-xl border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl border">
                  <div className="h-12 bg-white/5 border-b border-white/5 flex items-center px-6 gap-2">
                    <div className="h-3 w-3 rounded-full bg-red-500/50" />
                    <div className="h-3 w-3 rounded-full bg-yellow-500/50" />
                    <div className="h-3 w-3 rounded-full bg-green-500/50" />
                    <div className="ml-auto text-[10px] font-bold text-white/20 tracking-widest uppercase">Motor_Neural_V3</div>
                  </div>
                  <div className="p-10 space-y-8 font-mono text-[14px]">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="h-2 w-2 rounded-full bg-primary animate-ping" />
                        <span className="text-primary uppercase tracking-widest text-[11px] font-black">Gerando Site Automático...</span>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-2">
                          <div className="h-1.5 w-12 bg-primary/40 rounded-full animate-pulse" />
                          <div className="h-2 w-24 bg-white/10 rounded-full" />
                        </div>
                        <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-2">
                          <div className="h-1.5 w-12 bg-primary/40 rounded-full animate-pulse" />
                          <div className="h-2 w-24 bg-white/10 rounded-full" />
                        </div>
                      </div>
                    </div>
                    <div className="p-6 rounded-2xl bg-primary/5 border border-primary/20 text-white/90 leading-relaxed italic relative">
                      "Criando landing page de alta conversão para @lead... Estrutura pronta. SEO otimizado. Botão de WhatsApp injetado. Tempo decorrido: 42 segundos."
                      <span className="inline-block w-2 h-5 bg-primary ml-1 translate-y-1 animate-blink" />
                    </div>
                  </div>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>

        {/* COMO FUNCIONA - 4 PASSOS */}
        <section id="como-funciona" className="py-24 bg-white/[0.02] border-y border-white/5">
          <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-16">
            <div className="text-center space-y-4">
              <Badge className="bg-primary/20 text-primary uppercase font-black tracking-widest text-[10px] px-4 py-1">Processo de Escala</Badge>
              <h2 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter">Como o FlowPro trabalha por você</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                { id: "01", title: "Acesse o Painel", desc: "Crie sua conta e entre no centro de comando em segundos.", icon: Layout },
                { id: "02", title: "Radar de Alvos", desc: "IA escaneia o mercado e encontra donos de negócios locais.", icon: Search },
                { id: "03", title: "Criação Express", desc: "A IA cria o site e o script de vendas em questões de minutos.", icon: Zap },
                { id: "04", title: "Lucro no PIX", desc: "Envie a oferta pronta, feche o contrato e receba seu pagamento.", icon: DollarSign }
              ].map((step, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="relative group p-8 rounded-[2rem] bg-[#0a0a14] border border-white/5 hover:border-primary/40 transition-all"
                >
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
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* PRICING CALL TO ACTION - NOVO DESIGN */}
        <section id="precos" className="py-24 relative overflow-hidden bg-[#030308]">
          <div className="absolute inset-0 bg-primary/5 blur-[150px] rounded-full pointer-events-none" />
          <div className="container max-w-6xl mx-auto px-6 space-y-16 relative z-10">
            <div className="text-center space-y-6">
              <Badge className="bg-amber-500/20 text-amber-500 border border-amber-500/30 uppercase tracking-[0.3em] text-[10px] px-6 py-2 rounded-full animate-pulse">Oferta de Lançamento — Encerrando em Breve</Badge>
              <h2 className="text-4xl md:text-7xl font-black text-white italic uppercase tracking-tighter leading-tight">
                Domine o mercado <br /><span className="text-primary shimmer-text">com poder IA.</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto items-stretch">
              {/* PLANO MENSAL */}
              <motion.div 
                whileHover={{ y: -10 }}
                className="glass-card p-10 flex flex-col justify-between border-white/10 bg-white/[0.02] rounded-[2.5rem] relative overflow-hidden group transition-all duration-500"
              >
                <div className="space-y-8">
                  <div className="space-y-2">
                    <h3 className="text-xl font-black uppercase text-white/90">Plano Mensal</h3>
                    <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Para quem quer começar com baixo investimento</p>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-bold text-white/40">R$</span>
                    <p className="text-7xl font-black italic text-white tracking-tighter">147</p>
                    <span className="text-sm font-bold opacity-30 uppercase tracking-widest">/mês</span>
                  </div>
                  <div className="space-y-4 pt-6 border-t border-white/5">
                    {[
                      'Radar de Leads Ilimitado', 
                      'IA que cria sites em minutos', 
                      'IA Sales Mentor 24h', 
                      'IA Geradora de Scripts', 
                      'Jornada de 7 Dias', 
                      'Dashboard de Métricas'
                    ].map((f, i) => (
                      <div key={i} className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-widest text-white/70">
                        <Check className="h-4 w-4 text-primary" /> {f}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mt-10 space-y-4">
                   <Button asChild className="w-full h-16 rounded-2xl bg-white/5 border border-white/10 text-white hover:bg-white/10 font-black uppercase tracking-widest">
                     <a href={CHECKOUT_MENSAL}>COMEÇAR AGORA</a>
                   </Button>
                   <p className="text-[9px] text-center text-white/20 uppercase font-bold tracking-widest">Cancelamento a qualquer momento</p>
                </div>
              </motion.div>

              {/* PLANO VITALÍCIO - DESTAQUE */}
              <motion.div 
                whileHover={{ y: -10 }}
                className="relative p-[2px] rounded-[2.5rem] overflow-hidden group shadow-[0_0_80px_rgba(124,58,237,0.3)]"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary via-accent to-primary animate-pulse" />
                <Card className="relative bg-[#050508] p-10 flex flex-col justify-between h-full border-none rounded-[calc(2.5rem-2px)]">
                  <div className="absolute top-6 right-6 bg-primary text-white text-[8px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest shadow-lg flex items-center gap-1">
                    <Star className="h-2.5 w-2.5 fill-white" /> MAIS POPULAR
                  </div>
                  
                  <div className="space-y-8">
                    <div className="space-y-2">
                      <h3 className="text-2xl font-black uppercase italic text-white">Acesso Vitalício</h3>
                      <p className="text-[10px] font-bold text-primary uppercase tracking-widest">Garantia antes do preço voltar para R$697</p>
                    </div>
                    
                    <div className="space-y-1">
                      <p className="text-sm font-bold text-white/30 line-through">R$ 697</p>
                      <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-bold text-primary">R$</span>
                        <p className="text-8xl font-black italic text-white tracking-tighter">247</p>
                      </div>
                      <p className="text-[10px] font-black text-primary uppercase tracking-widest">Pagamento único — acesso para sempre</p>
                    </div>

                    <div className="bg-primary/10 border border-primary/20 rounded-2xl p-4 border-dashed">
                      <div className="flex items-center gap-3">
                        <CreditCard className="h-5 w-5 text-primary" />
                        <div>
                          <p className="text-[9px] font-black uppercase text-primary tracking-widest">Parcelamento disponível</p>
                          <p className="text-sm font-black text-white italic">Até 12x de R$ 24,70</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4 pt-4">
                      {[
                        'Tudo do Plano Mensal', 
                        'Acesso Vitalício Ilimitado', 
                        'Zero Mensalidades', 
                        'Masterclass: Escala Infinitos', 
                        'Suporte Prioritário VIP',
                        'Atualizações Neural V4 Inclusas'
                      ].map((f, i) => (
                        <div key={i} className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-widest text-white">
                          <CheckCircle2 className="h-4 w-4 text-primary fill-primary" /> {f}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mt-10">
                    <Button asChild className="w-full h-20 rounded-2xl bg-gradient-to-r from-primary to-accent hover:opacity-90 text-white font-black uppercase tracking-widest text-lg shadow-xl shadow-primary/20 transition-all group">
                      <a href={CHECKOUT_VITALICIO}>
                        QUERO ESCALAR AGORA <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-2 transition-transform" />
                      </a>
                    </Button>
                    <div className="mt-4 flex items-center justify-center gap-4">
                      <div className="flex items-center gap-1.5">
                        <ShieldCheck className="h-3 w-3 text-green-500" />
                        <span className="text-[8px] font-black text-white/40 uppercase">Garantia 7 Dias</span>
                      </div>
                      <div className="h-1 w-1 rounded-full bg-white/10" />
                      <div className="flex items-center gap-1.5">
                        <Sparkles className="h-3 w-3 text-amber-500" />
                        <span className="text-[8px] font-black text-white/40 uppercase">Acesso Imediato</span>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </div>

            <div className="max-w-xl mx-auto text-center pt-12 space-y-4">
               <div className="flex justify-center gap-8 text-white/20">
                 <Image src="https://media.inlead.cloud/uploads/44422/2026-01-05/md-flBj3-design-sem-nome-38.png" alt="Seguro" width={80} height={40} className="grayscale opacity-50" />
                 <Image src="https://media.inlead.cloud/uploads/44422/2026-01-03/md-soixE-design-sem-nome-31.png" alt="Seguro" width={80} height={40} className="grayscale opacity-50" />
               </div>
               <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.4em]">Pagamento processado por plataformas seguras</p>
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
                  a: "Sim. A Jornada de 7 Dias foi construída do zero para iniciantes. Além disso, a IA cria os sites e scripts para você, eliminando a necessidade de saber programar ou vender." 
                },
                { 
                  q: "Como a IA cria os sites tão rápido?", 
                  a: "Nossa IA utiliza blocos pré-configurados de alta conversão e os personaliza de acordo com o nicho do seu lead em menos de 2 minutos. Você só precisa revisar e enviar." 
                },
                { 
                  q: "Em quanto tempo vejo os primeiros resultados?", 
                  a: "Nossa média de base é de 3,8 dias para a primeira venda. Com o sistema de criação automática, você pode prospectar e entregar o serviço no mesmo dia." 
                },
                { 
                  q: "O pagamento é único mesmo?", 
                  a: "No Plano Vitalício, sim. Você paga uma única vez R$ 247 e nunca mais precisa pagar mensalidades para utilizar as ferramentas base da FlowPro." 
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
