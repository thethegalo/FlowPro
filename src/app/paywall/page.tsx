
"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Zap, 
  Star, 
  ShieldCheck, 
  CheckCircle2, 
  CreditCard,
  Infinity,
  ArrowRight,
  Quote,
  Sparkles,
  AlertCircle,
  Timer
} from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const TESTIMONIAL_IMAGES = [
  "https://media.inlead.cloud/uploads/44422/2026-01-05/md-vOR05-design-sem-nome-36.png",
  "https://media.inlead.cloud/uploads/44422/2026-01-03/md-soixE-design-sem-nome-31.png",
  "https://media.inlead.cloud/uploads/44422/2026-01-03/md-jztVV-design-sem-nome-30.png",
  "https://media.inlead.cloud/uploads/44422/2026-01-05/md-flBj3-design-sem-nome-38.png"
];

const TESTIMONIALS = [
  {
    name: "Ricardo Mendes",
    role: "Gestor de Tráfego",
    text: "O Radar de Leads mudou meu jogo. Consegui fechar 3 contratos de R$ 1.500 logo na primeira semana seguindo a jornada.",
    avatar: TESTIMONIAL_IMAGES[0]
  },
  {
    name: "Juliana Costa",
    role: "Social Media",
    text: "As IAs do FlowPro geram abordagens que não parecem robóticas. Minha taxa de resposta no Direct subiu de 5% para 22%.",
    avatar: TESTIMONIAL_IMAGES[1]
  },
  {
    name: "Marcos Paulo",
    role: "Vendedor Digital",
    text: "O Plano Vitalício foi o melhor investimento que fiz. Ter o Mentor IA 24h para tirar dúvidas de scripts é bizarro!",
    avatar: TESTIMONIAL_IMAGES[2]
  }
];

const PAYWALL_FAQ = [
  { q: "O acesso ao Vitalício é para sempre?", a: "Sim! Você paga uma única vez e tem acesso vitalício à Fase 1, Jornada de 7 Dias e todas as ferramentas base do ecossistema." },
  { q: "Como funciona a garantia?", a: "Oferecemos 7 dias de garantia incondicional. Se você não gostar do método ou das ferramentas, devolvemos 100% do seu dinheiro." },
  { q: "Quais as formas de pagamento?", a: "Aceitamos Cartão de Crédito (com parcelamento em até 12x), PIX e Boleto Bancário." },
  { q: "Recebo suporte após a compra?", a: "Com certeza. Além do Mentor IA treinado no método, você terá acesso à nossa equipe de suporte para qualquer dúvida técnica." }
];

export default function PaywallPage() {
  const CHECKOUT_MENSAL = "https://checkout.flowproia.shop/pay/PPU38CQ9FQU";
  const CHECKOUT_TRIMESTRAL = "https://checkout.flowproia.shop/pay/PPU38CQ9N8O";
  const CHECKOUT_VITALICIO = "https://checkout.flowproia.shop/pay/PPU38CQ9FCP";

  return (
    <div className="min-h-screen bg-transparent text-white overflow-x-hidden relative">
      <header className="h-20 flex items-center px-8 border-b border-white/5 relative z-20 backdrop-blur-md">
        <Link href="/dashboard" className="text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-white transition-colors">
          Voltar ao Painel
        </Link>
      </header>

      <section className="py-12 md:py-20 px-4 relative z-10 bg-transparent">
        <div className="container max-w-6xl mx-auto space-y-16 md:space-y-24 bg-transparent">
          
          <div className="text-center space-y-6 max-w-4xl mx-auto bg-transparent">
            <Badge className="bg-primary/20 text-primary border border-primary/30 uppercase tracking-[0.3em] text-[10px] px-4 py-1.5">Escolha sua Rota de Escala</Badge>
            <h1 className="text-4xl md:text-7xl lg:text-8xl font-black italic uppercase tracking-tighter leading-[0.85]">
              DOMINE O MERCADO <br /><span className="text-primary shimmer-text">COM PODER IA.</span>
            </h1>
            <p className="text-muted-foreground text-base md:text-xl max-w-2xl mx-auto font-medium uppercase tracking-tight">
              Libere o arsenal completo e comece a faturar em escala agora mesmo.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch bg-transparent">
            
            {/* PLANO MENSAL */}
            <Card className="glass-card p-8 flex flex-col justify-between border-amber-500/40 relative overflow-hidden bg-transparent group shadow-[0_0_30px_rgba(245,158,11,0.1)]">
              <div className="space-y-8 relative z-10 bg-transparent">
                <div className="space-y-3 bg-transparent">
                  <div className="flex items-center gap-2 px-3 py-1 bg-amber-500/20 border border-amber-500/30 rounded-full w-fit">
                    <Zap className="h-3 w-3 text-amber-500" />
                    <span className="text-[8px] font-black uppercase tracking-widest text-amber-500">Uso Ilimitado</span>
                  </div>
                  <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-white/70 flex items-center gap-2">
                    <Zap className="h-4 w-4 text-amber-500 fill-amber-500" /> Flow Mensal
                  </h3>
                  <div className="flex items-baseline gap-1 bg-transparent">
                    <p className="text-5xl md:text-6xl font-black italic text-white tracking-tighter">R$ 97</p>
                    <span className="text-sm font-bold opacity-50 uppercase tracking-widest">/mês</span>
                  </div>
                </div>

                <ul className="space-y-4 bg-transparent">
                  {[
                    'Radar: Buscas ILIMITADAS', 
                    'IA Mentor: Perguntas ILIMITADAS', 
                    'IA Prospecção: Mensagens ILIMITADAS', 
                    'Scripts de Elite', 
                    'Acesso à Fase de Escala'
                  ].map((f, i) => (
                    <li key={i} className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-white/80">
                      <CheckCircle2 className="h-3.5 w-3.5 text-amber-500" /> {f}
                    </li>
                  ))}
                </ul>
              </div>
              <Button 
                asChild
                className="w-full h-16 mt-10 rounded-2xl bg-amber-500 text-black hover:bg-amber-400 font-black uppercase tracking-widest transition-all shadow-lg shadow-amber-500/20"
              >
                <a href={CHECKOUT_MENSAL} target="_blank" rel="noopener noreferrer">
                  ATIVAR MENSAL
                </a>
              </Button>
            </Card>

            {/* PLANO TRIMESTRAL */}
            <Card className="glass-card p-8 flex flex-col justify-between border-cyan-500/50 relative overflow-hidden bg-transparent group shadow-[0_0_50px_rgba(6,182,212,0.15)]">
              <div className="absolute top-0 right-0 p-4">
                <Badge className="bg-cyan-500 text-black font-black text-[8px] uppercase px-3 py-1">POPULAR</Badge>
              </div>
              <div className="space-y-8 relative z-10 bg-transparent">
                <div className="space-y-3 bg-transparent">
                  <div className="flex items-center gap-2 px-3 py-1 bg-cyan-500/20 border border-cyan-500/30 rounded-full w-fit">
                    <Timer className="h-3 w-3 text-cyan-500" />
                    <span className="text-[8px] font-black uppercase tracking-widest text-cyan-500">Acesso Ilimitado</span>
                  </div>
                  <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-white/70 flex items-center gap-2">
                    <Zap className="h-4 w-4 text-cyan-500 fill-cyan-500" /> Flow Trimestral
                  </h3>
                  <div className="flex items-baseline gap-1 bg-transparent">
                    <p className="text-5xl md:text-6xl font-black italic text-white tracking-tighter">R$ 197</p>
                    <span className="text-sm font-bold opacity-50 uppercase tracking-widest">/tri</span>
                  </div>
                </div>

                <ul className="space-y-4 bg-transparent">
                  {[
                    'Radar de Leads ILIMITADO', 
                    'IA Mentor ILIMITADO', 
                    'IA Prospecção ILIMITADA', 
                    'Scripts de Elite (Volume)', 
                    'Acesso à Fase de Escala',
                    '3 Meses de Acesso Total'
                  ].map((f, i) => (
                    <li key={i} className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-white">
                      <CheckCircle2 className="h-3.5 w-3.5 text-cyan-500" /> {f}
                    </li>
                  ))}
                </ul>
              </div>
              <Button 
                asChild
                className="w-full h-16 mt-10 rounded-2xl bg-cyan-500 text-black hover:bg-cyan-400 font-black uppercase tracking-widest transition-all shadow-lg shadow-cyan-500/20"
              >
                <a href={CHECKOUT_TRIMESTRAL} target="_blank" rel="noopener noreferrer">
                  ATIVAR TRIMESTRAL
                </a>
              </Button>
            </Card>

            {/* PLANO VITALÍCIO */}
            <div className="relative p-[2px] rounded-2xl overflow-hidden shadow-[0_0_100px_rgba(139,92,246,0.4)] z-20">
              <div className="absolute inset-0 bg-gradient-to-br from-primary via-accent to-primary animate-pulse" style={{ willChange: 'transform' }}></div>
              <Card className="glass-card p-8 flex flex-col justify-between h-full border-none bg-transparent">
                <div className="absolute top-5 right-5 bg-primary text-white text-[8px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest shadow-lg flex items-center gap-1">
                  <Star className="h-2.5 w-2.5 fill-white" /> RECOMENDADO
                </div>
                
                <div className="space-y-8 relative z-10 bg-transparent">
                  <div className="space-y-3 bg-transparent">
                    <div className="flex items-center gap-2 px-3 py-1 bg-primary/20 border border-primary/30 rounded-full w-fit">
                      <Sparkles className="h-3 w-3 text-primary" style={{ willChange: 'transform' }} />
                      <span className="text-[8px] font-black uppercase tracking-widest text-primary">Acesso Vitalício Ilimitado</span>
                    </div>
                    <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-primary flex items-center gap-2">
                      <Infinity className="h-4 w-4 fill-primary text-black" /> Pagamento Único
                    </h3>
                    
                    <div className="flex items-baseline gap-1 bg-transparent">
                      <p className="text-6xl md:text-7xl font-black italic text-white tracking-tighter">R$ 287</p>
                    </div>
                  </div>

                  <ul className="space-y-4 bg-transparent">
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
                
                <Button 
                  asChild
                  className="w-full h-16 md:h-20 mt-10 rounded-2xl bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-widest shadow-[0_15px_40px_rgba(139,92,246,0.5)] transition-all hover:scale-[1.02] group text-sm md:text-base"
                >
                  <a href={CHECKOUT_VITALICIO} target="_blank" rel="noopener noreferrer">
                    GARANTIR ILIMITADO <ArrowRight className="ml-2 h-5 w-5 md:h-6 md:w-6 group-hover:translate-x-1 transition-transform" />
                  </a>
                </Button>
              </Card>
            </div>
          </div>

          <div className="flex flex-col items-center gap-8 pt-8 bg-transparent">
            <div className="flex flex-col md:flex-row items-center gap-6 md:gap-12 px-10 py-5 bg-white/5 border border-white/10 rounded-[2rem] backdrop-blur-md">
              <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-white/60">
                <ShieldCheck className="h-5 w-5 text-green-500" /> 7 Dias de Garantia
              </div>
              <div className="hidden md:block w-px h-6 bg-white/10"></div>
              <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-white/60">
                <Sparkles className="h-5 w-5 text-primary" /> Pagamento Seguro
              </div>
              <div className="hidden md:block w-px h-6 bg-white/10"></div>
              <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-white/60">
                <CreditCard className="h-5 w-5 text-accent" /> Até 12x no Cartão
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-20 border-t border-white/5 text-center relative z-10 bg-transparent">
        <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.5em]">
          © 2026 FLOWPRO NEURAL SYSTEMS • TODOS OS DIREITOS RESERVADOS
        </p>
      </footer>
    </div>
  );
}
