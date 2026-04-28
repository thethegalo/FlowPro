
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
  Timer,
  Check
} from 'lucide-react';
import { motion } from 'framer-motion';
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
  { q: "A IA cria o site para mim?", a: "Exatamente. O Gerador de Blueprint cria a estrutura completa de texto, design e funcionalidades para você apresentar ao seu cliente." }
];

export default function PaywallPage() {
  const CHECKOUT_MENSAL = "https://checkout.flowproia.shop/pay/PPU38CQ9FQU";
  const CHECKOUT_VITALICIO = "https://checkout.flowproia.shop/pay/PPU38CQ9FCP";

  return (
    <div className="min-h-screen bg-[#05050f] text-white overflow-x-hidden relative">
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent/5 rounded-full blur-[120px]"></div>
      </div>

      <header className="h-20 flex items-center px-8 border-b border-white/5 relative z-20 backdrop-blur-md">
        <Link href="/dashboard" className="text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-white transition-colors">
          Voltar ao Painel
        </Link>
      </header>

      <section className="py-12 md:py-20 px-4 relative z-10">
        <div className="container max-w-6xl mx-auto space-y-16 md:space-y-24">
          
          <div className="text-center space-y-6 max-w-4xl mx-auto">
            <Badge className="bg-primary/20 text-primary border border-primary/30 uppercase tracking-[0.3em] text-[10px] px-4 py-1.5">Escolha sua Rota de Escala</Badge>
            <h1 className="text-4xl md:text-7xl lg:text-8xl font-black italic uppercase tracking-tighter leading-[0.85]">
              DOMINE O MERCADO <br /><span className="text-primary shimmer-text">COM PODER IA.</span>
            </h1>
            <p className="text-muted-foreground text-base md:text-xl max-w-2xl mx-auto font-medium uppercase tracking-tight">
              Libere o arsenal completo e deixe a IA criar tudo para você faturar.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto items-stretch">
            
            {/* PLANO MENSAL */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="glass-card p-10 flex flex-col justify-between border-white/10 bg-white/[0.02] rounded-[2.5rem] relative overflow-hidden group shadow-[0_0_30px_rgba(245,158,11,0.05)]"
            >
              <div className="space-y-8 relative z-10">
                <div className="space-y-3">
                  <h3 className="text-xl font-black uppercase text-white/70 flex items-center gap-2 italic">
                    <Zap className="h-4 w-4 text-primary" /> Plano Mensal
                  </h3>
                  <div className="flex items-baseline gap-1">
                    <p className="text-6xl font-black italic text-white tracking-tighter">R$ 147</p>
                    <span className="text-sm font-bold opacity-50 uppercase tracking-widest">/mês</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center gap-3">
                    <CreditCard className="h-4 w-4 text-primary" />
                    <p className="text-[10px] font-black uppercase text-primary tracking-widest">
                      OU 12x DE R$ 14,70
                    </p>
                  </div>
                </div>

                <ul className="space-y-4">
                  {[
                    'Radar de Leads Ilimitado', 
                    'IA de Criação de Sites', 
                    'IA de Prospecção Ilimitada', 
                    'Scripts de Elite Ativos', 
                    'Acesso à Fase de Escala',
                    'Dashboard de Lucros Real-time'
                  ].map((f, i) => (
                    <li key={i} className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-white/80">
                      <Check className="h-3.5 w-3.5 text-primary" /> {f}
                    </li>
                  ))}
                </ul>
              </div>
              <Button 
                asChild
                className="w-full h-16 mt-10 rounded-2xl bg-white/5 border border-white/10 text-white hover:bg-white/10 font-black uppercase tracking-widest transition-all"
              >
                <a href={CHECKOUT_MENSAL}>
                  ATIVAR MENSAL
                </a>
              </Button>
            </motion.div>

            {/* PLANO VITALÍCIO */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="relative p-[2px] rounded-[2.5rem] overflow-hidden shadow-[0_0_100px_rgba(139,92,246,0.4)] z-20"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary via-accent to-primary animate-pulse"></div>
              <Card className="relative bg-[#050508] p-10 flex flex-col justify-between h-full border-none rounded-[calc(2.5rem-2px)]">
                <div className="absolute top-6 right-6 bg-primary text-white text-[8px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest shadow-lg flex items-center gap-1">
                  <Star className="h-2.5 w-2.5 fill-white" /> RECOMENDADO
                </div>
                
                <div className="space-y-8 relative z-10">
                  <div className="space-y-4">
                    <h3 className="text-xl font-black uppercase tracking-[0.2em] text-primary flex items-center gap-2 italic">
                      <Infinity className="h-4 w-4 fill-primary text-black" /> Acesso Vitalício
                    </h3>
                    
                    <div className="space-y-1">
                      <p className="text-sm font-bold text-white/30 line-through">R$ 697</p>
                      <div className="flex items-baseline gap-1">
                        <p className="text-7xl font-black italic text-white tracking-tighter">R$ 247</p>
                      </div>
                      <p className="text-[10px] font-black text-primary uppercase tracking-widest">Garantia antes do preço subir</p>
                    </div>
                    
                    <div className="bg-primary/10 border border-primary/20 rounded-xl px-4 py-4 border-dashed relative overflow-hidden group">
                      <div className="absolute inset-0 bg-primary/5 group-hover:bg-primary/10 transition-colors"></div>
                      <div className="relative flex items-center gap-3">
                        <CreditCard className="h-5 w-5 text-primary" /> 
                        <div>
                          <p className="text-[10px] font-black uppercase text-primary tracking-widest leading-none mb-1">
                            Parcelamento no Cartão
                          </p>
                          <p className="text-[14px] font-black text-white italic tracking-tight">
                            Até 12x de R$ 24,70
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <ul className="space-y-4">
                    {[
                      'Radar de Leads ILIMITADO', 
                      'IA Mentor 24h ILIMITADO', 
                      'IA que cria sites (Blueprint)', 
                      'Jornada de 7 Dias Vitalícia',
                      'Zero Mensalidades ou Taxas',
                      'Apenas 27 vagas neste preço'
                    ].map((f, i) => (
                      <li key={i} className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-white">
                        <CheckCircle2 className="h-4 w-4 text-primary fill-primary" /> {f}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <Button 
                  asChild
                  className="w-full h-20 mt-10 rounded-2xl bg-gradient-to-r from-primary to-accent hover:opacity-90 text-white font-black uppercase tracking-widest shadow-[0_15px_40px_rgba(139,92,246,0.5)] transition-all hover:scale-[1.02] group text-sm md:text-base"
                >
                  <a href={CHECKOUT_VITALICIO}>
                    QUERO ESCALAR AGORA <ArrowRight className="ml-2 h-5 w-5 md:h-6 md:w-6 group-hover:translate-x-1 transition-transform" />
                  </a>
                </Button>
              </Card>
            </motion.div>
          </div>

          <div className="flex flex-col items-center gap-8 pt-8">
            <div className="flex flex-col md:flex-row items-center gap-6 md:gap-12 px-10 py-5 bg-white/5 border border-white/10 rounded-[2rem] backdrop-blur-md">
              <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-white/60">
                <ShieldCheck className="h-5 w-5 text-green-500" /> 7 Dias de Garantia
              </div>
              <div className="hidden md:block w-px h-6 bg-white/10"></div>
              <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-white/60">
                <Sparkles className="h-5 w-5 text-primary" /> PAGAMENTO SEGURO
              </div>
              <div className="hidden md:block w-px h-6 bg-white/10"></div>
              <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-white/60">
                <CreditCard className="h-5 w-5 text-accent" /> Até 12x no Cartão
              </div>
            </div>
          </div>
          
          <div className="max-w-3xl mx-auto space-y-12 pt-20 pb-32">
            <Accordion type="single" collapsible className="w-full space-y-4">
              {PAYWALL_FAQ.map((item, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="glass-card border-none rounded-2xl px-8">
                  <AccordionTrigger className="font-black hover:no-underline py-6 uppercase tracking-widest text-[10px] text-left text-white">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-sm leading-relaxed pb-6 font-medium italic">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      <footer className="py-20 border-t border-white/5 bg-[#030305] text-center relative z-10">
        <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.5em]">
          © 2026 FLOWPRO NEURAL SYSTEMS • TODOS OS DIREITOS RESERVADOS
        </p>
      </footer>
    </div>
  );
}
