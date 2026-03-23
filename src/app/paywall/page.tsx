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
  Lock
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
    { q: "Qual a diferença dos planos?", a: "O plano vitalício libera a Fase 1 (7 dias) e o suporte básico. O plano mensal (Flow Pro) libera a Fase 2, com leads ilimitados, novas estratégias de escala e IA avançada de prospecção." },
    { q: "Posso mudar de plano depois?", a: "Sim, você pode migrar para o plano Pro a qualquer momento para desbloquear a escala ilimitada." },
    { q: "Preciso investir dinheiro em anúncios?", a: "Não. Ensinamos estratégias de tráfego orgânico para que você faça sua primeira venda sem gastar em anúncios." },
    { q: "Como funciona o suporte?", a: "Você terá acesso ao nosso Mentor IA 24h por dia para tirar qualquer dúvida técnica ou estratégica." }
  ];

  return (
    <div className="min-h-screen bg-[#050508] text-white">
      <section className="py-20 px-4">
        <div className="container max-w-5xl mx-auto space-y-12">
          <div className="text-center space-y-6">
            <Badge className="bg-primary/20 text-primary border border-primary/30 uppercase tracking-[0.3em] text-[10px]">Evolução Contínua</Badge>
            <h1 className="text-4xl md:text-7xl font-black italic uppercase tracking-tighter leading-none">
              DA PRIMEIRA VENDA <br /><span className="text-primary shimmer-text">À ESCALA BRUTAL.</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto font-medium">
              Escolha seu nível de entrada. Comece a jornada ou domine o mercado com acesso Pro ilimitado.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto items-stretch">
            {/* Lifetime Plan */}
            <Card className="glass-card p-8 flex flex-col justify-between border-white/5 relative overflow-hidden rounded-[2rem] opacity-90">
              <div className="space-y-6 relative z-10">
                <div className="space-y-1">
                  <h3 className="text-xs font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                    <Infinity className="h-4 w-4" /> Plano Vitalício (Base)
                  </h3>
                  <div className="flex items-baseline gap-2">
                    <span className="text-muted-foreground line-through text-xs decoration-primary/50">R$ 497</span>
                    <p className="text-4xl font-black italic text-white">R$ 267</p>
                  </div>
                  <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">Acesso Único • Sem mensalidade</p>
                </div>
                <ul className="space-y-4">
                  {[
                    'Jornada de 7 Dias Completa', 
                    'Scripts Flow Básicos', 
                    'Ferramenta de Leads (Limitada)', 
                    'Suporte IA Base'
                  ].map((f, i) => (
                    <li key={i} className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-white/70">
                      <CheckCircle2 className="h-4 w-4 text-white/30" /> {f}
                    </li>
                  ))}
                </ul>
              </div>
              <Button 
                onClick={() => handleSubscription('lifetime')}
                disabled={isLoading}
                variant="outline" 
                className="w-full h-14 mt-8 rounded-2xl border-white/10 hover:bg-white text-black font-black uppercase tracking-widest relative z-10"
              >
                ATIVAR VITALÍCIO
              </Button>
            </Card>

            {/* Monthly Pro Plan */}
            <div className="relative p-[2px] rounded-[2rem] overflow-hidden scale-105 shadow-[0_0_50px_rgba(139,92,246,0.2)]">
              <div className="absolute inset-0 bg-gradient-to-br from-primary via-accent to-primary animate-marquee bg-[length:200%_200%]"></div>
              <Card className="relative bg-[#050508] p-8 flex flex-col justify-between h-full border-none rounded-[calc(2rem-2px)]">
                <div className="absolute top-4 right-4 bg-primary text-white text-[8px] font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-lg animate-pulse">RECOMENDADO PARA ESCALA</div>
                <div className="space-y-6">
                  <div className="space-y-1">
                    <h3 className="text-xs font-black uppercase tracking-widest text-primary flex items-center gap-2">
                      <Zap className="h-4 w-4 fill-primary" /> Flow Pro (Assinatura)
                    </h3>
                    <p className="text-5xl font-black italic text-white">R$ 147<span className="text-sm font-normal opacity-50 tracking-normal">/mês</span></p>
                    <p className="text-[10px] font-black uppercase text-primary tracking-widest flex items-center gap-2">
                      <TrendingUp className="h-3 w-3" /> Fase 2: Escala Ilimitada
                    </p>
                  </div>
                  <ul className="space-y-4">
                    {[
                      'Fase 2: Escala Flow Ativada',
                      'Geração de Leads Ilimitada', 
                      'IA de Prospecção Avançada', 
                      'Novos Nichos & Estratégias',
                      'Acompanhamento Contínuo',
                      'Scripts de Elite Atualizados'
                    ].map((f, i) => (
                      <li key={i} className="flex items-center gap-3 text-xs font-black uppercase tracking-widest text-white">
                        <Star key={i} className="h-4 w-4 text-primary fill-primary" /> {f}
                      </li>
                    ))}
                  </ul>
                </div>
                <Button 
                  onClick={() => handleSubscription('monthly')}
                  disabled={isLoading}
                  className="w-full h-16 mt-8 rounded-2xl bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-widest shadow-[0_10px_30px_rgba(139,92,246,0.4)]"
                >
                  DESBLOQUEAR FLOW PRO <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Card>
            </div>
          </div>

          <div className="flex flex-col items-center gap-6 pt-12">
            <div className="flex items-center gap-6 px-8 py-4 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-md">
              <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                <ShieldCheck className="h-5 w-5 text-green-500" /> 7 Dias de Garantia
              </div>
              <div className="w-px h-4 bg-white/10"></div>
              <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                <ShieldAlert className="h-5 w-5 text-primary" /> Pagamento 100% Seguro
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white/[0.02] border-y border-white/5">
        <div className="container max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-black italic uppercase tracking-tighter mb-12 text-center">Fases do FlowPro</h2>
          <div className="grid gap-6 md:grid-cols-2 mb-12">
             <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-4">
                <h4 className="text-primary font-black uppercase text-xs tracking-widest">FASE 1: PRIMEIRA VENDA</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">O plano mestre de 7 dias para você sair do zero e colocar dinheiro no bolso. Scripts, ofertas e leads focados em velocidade.</p>
             </div>
             <div className="p-6 rounded-2xl bg-primary/5 border border-primary/20 space-y-4">
                <h4 className="text-primary font-black uppercase text-xs tracking-widest">FASE 2: ESCALA FLOW</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">Para quem quer faturar R$5k, R$10k ou mais. IA avançada, automações e volume ilimitado de leads qualificados diariamente.</p>
             </div>
          </div>
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="glass-card border-none rounded-2xl px-6">
                <AccordionTrigger className="font-black uppercase tracking-widest text-xs hover:no-underline text-left">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-sm leading-relaxed pb-6">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </div>
  );
}
