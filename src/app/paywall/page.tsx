
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
  Quote,
  Flame
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
import Image from 'next/image';

const LOGO_ICON = "https://s3.typebot.io/public/workspaces/cmml2oniw000g04l7gwmqelu1/typebots/cmn1vyjog000104la10d6sdzu/blocks/d5tqr6czngeukjb8r6whrs5s?v=1774318273085";

const TESTIMONIALS = [
  {
    name: "João Pedro",
    role: "Guerreiro Flow",
    text: "Em 4 dias seguindo a jornada, fechei minha primeira automação de R$ 800. O roteiro de ataque é bizarro.",
    avatar: "https://picsum.photos/seed/jp/100/100"
  },
  {
    name: "Maria Vitória",
    role: "Agência Digital",
    text: "O radar de leads é bruxaria pura. O que eu levava horas pra achar, o sistema entrega em segundos com telefone real.",
    avatar: "https://picsum.photos/seed/mv/100/100"
  },
  {
    name: "Ricardo Torres",
    role: "Estrategista",
    text: "Saí de R$ 0 para R$ 4.500 em menos de um mês. O segredo está no Flow constante de abordagens que a IA gera.",
    avatar: "https://picsum.photos/seed/rt/100/100"
  }
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

  const faqs = [
    { q: "Qual a diferença dos planos?", a: "O plano Vitalício libera a Fase 1 (Jornada de 7 Dias) e as ferramentas básicas para sua primeira venda. O plano Flow Pro (Assinatura) é focado em escala brutal, com leads ilimitados, IA avançada e estratégias de Fase 2." },
    { q: "Posso parcelar o Vitalício?", a: "Sim! O plano Vitalício pode ser parcelado em até 12x no cartão de crédito através do nosso checkout seguro." },
    { q: "Preciso investir dinheiro em anúncios?", a: "Não. O Método Flow foca 100% em prospecção ativa e tráfego orgânico para que você lucre sem depender de Facebook ou Google Ads." },
    { q: "Como funciona o suporte?", a: "Você terá acesso ao nosso Mentor IA 24h por dia, além de acesso à comunidade de guerreiros Flow no plano Pro." }
  ];

  return (
    <div className="min-h-screen bg-[#050508] text-white">
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px]"></div>
      </div>

      <section className="py-20 px-4 relative z-10">
        <div className="container max-w-5xl mx-auto space-y-16">
          <div className="text-center space-y-6">
            <Badge className="bg-primary/20 text-primary border border-primary/30 uppercase tracking-[0.3em] text-[10px] px-4 py-1.5">Evolução Contínua</Badge>
            <h1 className="text-5xl md:text-8xl font-black italic uppercase tracking-tighter leading-[0.85]">
              DOMINE O MERCADO <br /><span className="text-primary shimmer-text">COM PODER IA.</span>
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto font-medium uppercase tracking-tight">
              A jornada de 7 dias foi apenas o começo. Escolha como você quer escalar a partir de agora.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-10 max-w-4xl mx-auto items-stretch">
            
            {/* PLANO VITALÍCIO (ESQUERDA) */}
            <Card className="glass-card p-10 flex flex-col justify-between border-white/10 relative overflow-hidden rounded-[2.5rem] bg-white/[0.04] hover:bg-white/[0.06] transition-all duration-500">
              <div className="space-y-8 relative z-10">
                <div className="space-y-3">
                  <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-white/50 flex items-center gap-2">
                    <Infinity className="h-4 w-4 text-white/30" /> Plano Vitalício (Base)
                  </h3>
                  <div className="space-y-1">
                    <div className="flex items-baseline gap-2">
                      <span className="text-muted-foreground line-through text-sm decoration-primary/50 opacity-50">R$ 497</span>
                      <p className="text-6xl font-black italic text-white tracking-tighter">R$ 267</p>
                    </div>
                    <p className="text-primary text-[11px] font-black uppercase tracking-widest flex items-center gap-2">
                      <CalendarCheck className="h-3.5 w-3.5" /> EM ATÉ 12X NO CARTÃO
                    </p>
                  </div>
                  <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest bg-white/5 inline-block px-3 py-1 rounded-full">Acesso Único • Sem mensalidade</p>
                </div>

                <ul className="space-y-5">
                  {[
                    'Jornada de 7 Dias Completa', 
                    'Metodologia de Primeira Venda',
                    'Scripts de Abordagem Flow', 
                    'Radar de Leads (Acesso Base)', 
                    'IA Mentor 24h Disponível'
                  ].map((f, i) => (
                    <li key={i} className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-white/80">
                      <CheckCircle2 className="h-4 w-4 text-primary" /> {f}
                    </li>
                  ))}
                </ul>
              </div>
              <Button 
                onClick={() => handleSubscription('lifetime')}
                disabled={isLoading}
                className="w-full h-16 mt-10 rounded-2xl bg-white text-black hover:bg-primary hover:text-white font-black uppercase tracking-widest transition-all shadow-xl hover:scale-[1.02]"
              >
                ATIVAR MEU VITALÍCIO
              </Button>
            </Card>

            {/* PLANO PRO (DIREITA - DESTAQUE MAIOR) */}
            <div className="relative p-[2px] rounded-[2.5rem] overflow-hidden shadow-[0_0_60px_rgba(139,92,246,0.35)] group">
              <div className="absolute inset-0 bg-gradient-to-br from-primary via-accent to-primary animate-marquee bg-[length:200%_200%]"></div>
              <Card className="relative bg-[#050508] p-10 flex flex-col justify-between h-full border-none rounded-[calc(2.5rem-2px)]">
                <div className="absolute top-5 right-5 bg-primary text-white text-[8px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest shadow-lg animate-pulse z-20">RECOMENDADO PARA ESCALA</div>
                
                <div className="space-y-8 relative z-10">
                  <div className="space-y-3">
                    <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-primary flex items-center gap-2">
                      <Zap className="h-4 w-4 fill-primary" /> Flow Pro (Assinatura)
                    </h3>
                    <div className="flex items-baseline gap-1">
                      <p className="text-7xl font-black italic text-white tracking-tighter">R$ 147</p>
                      <span className="text-sm font-bold opacity-50 uppercase tracking-widest">/mês</span>
                    </div>
                    <p className="text-[10px] font-black uppercase text-primary tracking-widest flex items-center gap-2">
                      <TrendingUp className="h-3.5 w-3.5" /> FASE 2: ESCALA ILIMITADA
                    </p>
                  </div>

                  <ul className="space-y-5">
                    {[
                      'Fase 2: Escala Flow Ativada',
                      'Radar de Leads Ilimitado', 
                      'IA de Prospecção Avançada', 
                      'Metodologias de Elite (Fase 2)',
                      'Scripts de Fechamento Brutal',
                      'Acesso ao Mentor IA Premium'
                    ].map((f, i) => (
                      <li key={i} className="flex items-center gap-3 text-xs font-black uppercase tracking-widest text-white">
                        <Star className="h-4 w-4 text-primary fill-primary" /> {f}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <Button 
                  onClick={() => handleSubscription('monthly')}
                  disabled={isLoading}
                  className="w-full h-20 mt-10 rounded-2xl bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-widest shadow-[0_15px_40px_rgba(139,92,246,0.5)] transition-all hover:scale-[1.02]"
                >
                  DESBLOQUEAR FLOW PRO <ArrowRight className="ml-2 h-6 w-6" />
                </Button>
              </Card>
            </div>

          </div>

          {/* DEPOIMENTOS */}
          <div className="pt-32 space-y-16">
            <div className="text-center space-y-4">
              <h2 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter">Guerreiros no <span className="text-primary">Flow</span></h2>
              <p className="text-muted-foreground text-[10px] font-black uppercase tracking-[0.3em]">Resultados reais de quem já executa o método</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              {TESTIMONIALS.map((t, i) => (
                <Card key={i} className="glass-card p-8 border-white/5 rounded-[2rem] flex flex-col gap-6 relative group hover:border-primary/40">
                  <Quote className="absolute top-6 right-8 h-8 w-8 text-primary/10 group-hover:text-primary/20 transition-colors" />
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full overflow-hidden border-2 border-primary/20">
                      <img src={t.avatar} alt={t.name} className="h-full w-full object-cover" />
                    </div>
                    <div>
                      <h4 className="text-sm font-black italic uppercase text-white">{t.name}</h4>
                      <p className="text-[9px] font-bold uppercase text-primary tracking-widest">{t.role}</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground italic leading-relaxed font-medium">"{t.text}"</p>
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, j) => <Star key={j} className="h-3 w-3 fill-primary text-primary" />)}
                  </div>
                </Card>
              ))}
            </div>
          </div>

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
        </div>
      </section>

      <section className="py-32 bg-white/[0.02] border-y border-white/5">
        <div className="container max-w-4xl mx-auto px-4">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter">Fases da Jornada Flow</h2>
            <p className="text-muted-foreground text-xs font-black uppercase tracking-[0.3em]">O caminho exato do zero ao faturamento de elite</p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-2 mb-16">
             <div className="p-8 rounded-[2rem] bg-white/5 border border-white/10 space-y-6 group hover:border-primary/30 transition-all">
                <Badge className="bg-white/10 text-white border-white/10 font-black uppercase text-[9px]">FASE 1</Badge>
                <h4 className="text-white font-black uppercase text-xl italic tracking-tight">PRIMEIRA VENDA</h4>
                <p className="text-sm text-muted-foreground leading-relaxed font-medium">Focada em quem quer sair do zero. Em 7 dias você aprende a estruturar sua oferta, encontrar seus primeiros 25 leads e fechar seu primeiro contrato de R$ 497+.</p>
             </div>
             <div className="p-8 rounded-[2rem] bg-primary/5 border border-primary/20 space-y-6 group hover:border-primary/50 transition-all">
                <Badge className="bg-primary/20 text-primary border-primary/30 font-black uppercase text-[9px]">FASE 2</Badge>
                <h4 className="text-primary font-black uppercase text-xl italic tracking-tight">ESCALA FLOW</h4>
                <p className="text-sm text-muted-foreground leading-relaxed font-medium">Para quem já validou o processo e quer faturar R$ 5k a R$ 15k por mês. IA de prospecção ilimitada, volume agressivo de leads e automação de fechamento.</p>
             </div>
          </div>

          <div className="space-y-4 max-w-3xl mx-auto">
            <h3 className="text-center text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground mb-8">Sincronia de Dúvidas</h3>
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, i) => (
                <AccordionItem key={i} value={`faq-${i}`} className="glass-card border-none rounded-2xl px-8 bg-white/[0.03]">
                  <AccordionTrigger className="font-black uppercase tracking-widest text-xs hover:no-underline text-left py-6">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-sm leading-relaxed pb-8 font-medium italic">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          <div className="text-center mt-20 space-y-8">
            <div className="flex items-center justify-center gap-4 opacity-50">
              <Image src={LOGO_ICON} alt="Icon" width={24} height={24} className="grayscale" />
              <div className="h-px w-20 bg-white/10"></div>
              <span className="text-[8px] font-black uppercase tracking-[0.5em]">FlowPro Systems</span>
              <div className="h-px w-20 bg-white/10"></div>
              <Image src={LOGO_ICON} alt="Icon" width={24} height={24} className="grayscale" />
            </div>
            <Button asChild variant="ghost" className="text-muted-foreground hover:text-primary font-black uppercase text-[10px] tracking-[0.2em]">
              <Link href="/quiz">RECOMEÇAR MEU FLOW</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
