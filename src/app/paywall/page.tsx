
"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Zap, 
  Star, 
  ShieldCheck, 
  CheckCircle2, 
  Clock, 
  ShieldAlert, 
  CreditCard,
  Infinity,
  ArrowRight,
  Target,
  TrendingUp,
  Lock,
  CalendarCheck,
  MessageSquare,
  Quote,
  Sparkles
} from 'lucide-react';
import { useUser, useFirestore } from '@/firebase';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const TESTIMONIALS = [
  {
    name: "Ricardo Mendes",
    role: "Gestor de Tráfego",
    text: "O Radar de Leads mudou meu jogo. Consegui fechar 3 contratos de R$ 1.500 logo na primeira semana seguindo a jornada.",
    avatar: "https://picsum.photos/seed/user1/100/100"
  },
  {
    name: "Juliana Costa",
    role: "Social Media",
    text: "As IAs do FlowPro geram abordagens que não parecem robóticas. Minha taxa de resposta no Direct subiu de 5% para 22%.",
    avatar: "https://picsum.photos/seed/user2/100/100"
  },
  {
    name: "Marcos Paulo",
    role: "Vendedor Digital",
    text: "O Plano Vitalício foi o melhor investimento que fiz. Ter o Mentor IA 24h para tirar dúvidas de scripts é bizarro!",
    avatar: "https://picsum.photos/seed/user3/100/100"
  }
];

const PAYWALL_FAQ = [
  { q: "O acesso ao Vitalício é para sempre?", a: "Sim! Você paga uma única vez e tem acesso vitalício à Fase 1, Jornada de 7 Dias e todas as ferramentas base do ecossistema." },
  { q: "Como funciona a garantia?", a: "Oferecemos 7 dias de garantia incondicional. Se você não gostar do método ou das ferramentas, devolvemos 100% do seu dinheiro." },
  { q: "Quais as formas de pagamento?", a: "Aceitamos Cartão de Crédito (com parcelamento em até 12x), PIX e Boleto Bancário." },
  { q: "Recebo suporte após a compra?", a: "Com certeza. Além do Mentor IA treinado no método, você terá acesso à nossa equipe de suporte para qualquer dúvida técnica." }
];

export default function PaywallPage() {
  const { user } = useUser();
  const db = useFirestore();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubscription = async (plan: string) => {
    if (!user || !db) return;
    setIsLoading(true);
    try {
      const subRef = doc(db, 'users', user.uid, 'subscriptions', 'active');
      await setDoc(subRef, {
        userId: user.uid,
        planType: plan,
        status: 'active',
        startDate: serverTimestamp()
      }, { merge: true });

      router.push('/dashboard');
    } catch (error) {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050508] text-white overflow-x-hidden">
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent/5 rounded-full blur-[120px]"></div>
      </div>

      <header className="h-20 flex items-center px-8 border-b border-white/5 relative z-20 backdrop-blur-md">
        <Link href="/dashboard" className="text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-white transition-colors">
          Voltar ao Painel
        </Link>
      </header>

      <section className="py-20 px-4 relative z-10">
        <div className="container max-w-6xl mx-auto space-y-24">
          
          {/* Hero Section */}
          <div className="text-center space-y-6 max-w-4xl mx-auto">
            <Badge className="bg-primary/20 text-primary border border-primary/30 uppercase tracking-[0.3em] text-[10px] px-4 py-1.5">Escolha sua Rota de Escala</Badge>
            <h1 className="text-5xl md:text-8xl font-black italic uppercase tracking-tighter leading-[0.85]">
              DOMINE O MERCADO <br /><span className="text-primary shimmer-text">COM PODER IA.</span>
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto font-medium uppercase tracking-tight">
              A jornada de 7 dias foi apenas o começo. Libere o arsenal completo e comece a faturar em escala.
            </p>
          </div>

          {/* Pricing Grid */}
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto items-stretch">
            
            {/* PLANO PRO (MENSAL) - AGORA À ESQUERDA */}
            <Card className="glass-card p-10 flex flex-col justify-between border-white/10 relative overflow-hidden rounded-[2.5rem] bg-white/[0.04] hover:bg-white/[0.06] transition-all duration-500">
              <div className="space-y-8 relative z-10">
                <div className="space-y-3">
                  <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-white/50 flex items-center gap-2">
                    <Zap className="h-4 w-4" /> Flow Pro (Mensal)
                  </h3>
                  <div className="flex items-baseline gap-1">
                    <p className="text-6xl font-black italic text-white tracking-tighter">R$ 147</p>
                    <span className="text-sm font-bold opacity-50 uppercase tracking-widest">/mês</span>
                  </div>
                  <p className="text-[10px] font-black uppercase text-white/40 tracking-widest flex items-center gap-2">
                    <TrendingUp className="h-3.5 w-3.5" /> RECORRÊNCIA E ESCALA
                  </p>
                </div>

                <ul className="space-y-5">
                  {[
                    'Radar de Leads Ilimitado', 
                    'IA de Prospecção Avançada', 
                    'Scripts de Elite (Volume)', 
                    'Atualizações Semanais', 
                    'Comunidade de Alunos'
                  ].map((f, i) => (
                    <li key={i} className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-white/80">
                      <CheckCircle2 className="h-4 w-4 text-white/20" /> {f}
                    </li>
                  ))}
                </ul>
              </div>
              <Button 
                onClick={() => handleSubscription('monthly')}
                disabled={isLoading}
                variant="outline"
                className="w-full h-16 mt-10 rounded-2xl border-white/10 text-white hover:bg-white/5 font-black uppercase tracking-widest transition-all"
              >
                ATIVAR ASSINATURA PRO
              </Button>
            </Card>

            {/* PLANO VITALÍCIO - AGORA À DIREITA E DESTACADO */}
            <div className="relative p-[2px] rounded-[2.5rem] overflow-hidden shadow-[0_0_80px_rgba(139,92,246,0.4)]">
              <div className="absolute inset-0 bg-gradient-to-br from-primary via-accent to-primary animate-pulse"></div>
              <Card className="relative bg-[#050508] p-10 flex flex-col justify-between h-full border-none rounded-[calc(2.5rem-2px)]">
                <div className="absolute top-5 right-5 bg-primary text-white text-[8px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest shadow-lg flex items-center gap-1">
                  <Star className="h-2.5 w-2.5 fill-white" /> OFERTA RECOMENDADA
                </div>
                
                <div className="space-y-8 relative z-10">
                  <div className="space-y-3">
                    <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-primary flex items-center gap-2">
                      <Infinity className="h-4 w-4 fill-primary" /> Acesso Vitalício (Único)
                    </h3>
                    <div className="flex items-baseline gap-1">
                      <p className="text-7xl font-black italic text-white tracking-tighter">R$ 267</p>
                    </div>
                    <p className="text-[10px] font-black uppercase text-primary tracking-widest flex items-center gap-2">
                      <CalendarCheck className="h-3.5 w-3.5" /> EM ATÉ 12X NO CARTÃO
                    </p>
                  </div>

                  <ul className="space-y-5">
                    {[
                      'Jornada de 7 Dias Vitalícia', 
                      'Radar de Leads (Acesso Base)', 
                      'Biblioteca de Scripts de Elite', 
                      'IA Mentor 24h Ilimitado',
                      'Sem Taxas de Renovação',
                      'Garantia Blindada de 7 Dias'
                    ].map((f, i) => (
                      <li key={i} className="flex items-center gap-3 text-xs font-black uppercase tracking-widest text-white">
                        <CheckCircle2 className="h-4 w-4 text-primary fill-primary" /> {f}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <Button 
                  onClick={() => handleSubscription('lifetime')}
                  disabled={isLoading}
                  className="w-full h-20 mt-10 rounded-2xl bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-widest shadow-[0_15px_40px_rgba(139,92,246,0.5)] transition-all hover:scale-[1.02] group"
                >
                  GARANTIR ACESSO VITALÍCIO <ArrowRight className="ml-2 h-6 w-6 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Card>
            </div>

          </div>

          {/* Trust Badges */}
          <div className="flex flex-col items-center gap-8 pt-8">
            <div className="flex flex-col md:flex-row items-center gap-6 md:gap-12 px-10 py-5 bg-white/5 border border-white/10 rounded-[2rem] backdrop-blur-md">
              <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-white/60">
                <ShieldCheck className="h-5 w-5 text-green-500" /> 7 Dias de Garantia
              </div>
              <div className="hidden md:block w-px h-6 bg-white/10"></div>
              <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-white/60">
                <ShieldAlert className="h-5 w-5 text-primary" /> Pagamento 100% Seguro
              </div>
              <div className="hidden md:block w-px h-6 bg-white/10"></div>
              <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-white/60">
                <CreditCard className="h-5 w-5 text-accent" /> Parcelamento em 12x
              </div>
            </div>
          </div>

          {/* Testimonials Section */}
          <div className="space-y-12 pt-20">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-black italic uppercase tracking-tighter">Provas de Execução</h2>
              <p className="text-muted-foreground text-[10px] uppercase font-bold tracking-widest">Guerreiros que já estão operando no Flow.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {TESTIMONIALS.map((t, i) => (
                <Card key={i} className="glass-card border-white/5 p-8 rounded-[2rem] space-y-6">
                  <Quote className="h-8 w-8 text-primary opacity-30" />
                  <p className="text-sm font-medium leading-relaxed italic text-white/80">"{t.text}"</p>
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-white/10 border border-white/10 overflow-hidden">
                      <img src={t.avatar} alt={t.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <p className="text-xs font-black uppercase text-white">{t.name}</p>
                      <p className="text-[10px] font-bold text-primary uppercase tracking-widest">{t.role}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* FAQ Section */}
          <div className="max-w-3xl mx-auto space-y-12 pt-20 pb-32">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-black italic uppercase tracking-tighter">Dúvidas Frequentes</h2>
              <p className="text-muted-foreground text-[10px] uppercase font-bold tracking-widest">Tudo o que você precisa saber antes de entrar.</p>
            </div>
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
