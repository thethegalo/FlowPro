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
  Infinity
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
    { q: "Preciso ter experiência prévia?", a: "Absolutamente não. O FlowPro foi desenhado especificamente para quem está começando do zero absoluto." },
    { q: "Preciso investir dinheiro em anúncios?", a: "Não. Ensinamos estratégias de tráfego orgânico para que você faça sua primeira venda sem gastar em anúncios." },
    { q: "Em quanto tempo vejo resultados?", a: "Seguindo o passo a passo, nosso objetivo é que você realize sua primeira venda em até 7 dias." },
    { q: "Como funciona o suporte?", a: "Você terá acesso ao nosso Mentor IA 24h por dia para tirar qualquer dúvida técnica ou estratégica." }
  ];

  return (
    <div className="min-h-screen bg-[#050508] text-white">
      <section className="py-20 px-4">
        <div className="container max-w-5xl mx-auto space-y-12">
          <div className="text-center space-y-6">
            <Badge className="bg-primary/20 text-primary border border-primary/30 uppercase tracking-[0.3em] text-[10px]">Acesso Flow Liberado</Badge>
            <h1 className="text-4xl md:text-7xl font-black italic uppercase tracking-tighter leading-none">
              SEU PLANO ESTÁ PRONTO. <br /><span className="text-primary shimmer-text">ATIVE O FLUXO.</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto font-medium">
              Você já viu o potencial. Agora, receba as ferramentas, os scripts e o mentor para transformar esse potencial em dinheiro.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto items-stretch">
            <Card className="glass-card p-8 flex flex-col justify-between border-white/5 relative overflow-hidden rounded-[2rem]">
              <div className="space-y-6 relative z-10">
                <div className="space-y-1">
                  <h3 className="text-xs font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                    <Clock className="h-4 w-4" /> Plano Mensal
                  </h3>
                  <p className="text-4xl font-black italic">R$ 147<span className="text-sm font-normal opacity-50">/mês</span></p>
                </div>
                <ul className="space-y-4">
                  {['Jornada de 7 Dias', 'Scripts Flow', 'Mentor IA Ilimitado', 'Cancelamento livre'].map((f, i) => (
                    <li key={i} className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-white/70">
                      <CheckCircle2 className="h-4 w-4 text-primary" /> {f}
                    </li>
                  ))}
                </ul>
              </div>
              <Button 
                onClick={() => handleSubscription('monthly')}
                disabled={isLoading}
                variant="outline" 
                className="w-full h-14 mt-8 rounded-2xl border-white/10 hover:bg-white text-black font-black uppercase tracking-widest relative z-10"
              >
                ASSINAR MENSAL
              </Button>
            </Card>

            <div className="relative p-[2px] rounded-[2rem] overflow-hidden scale-105 shadow-[0_0_50px_rgba(139,92,246,0.2)]">
              <div className="absolute inset-0 bg-gradient-to-br from-primary via-accent to-primary animate-marquee bg-[length:200%_200%]"></div>
              <Card className="relative bg-[#050508] p-8 flex flex-col justify-between h-full border-none rounded-[calc(2rem-2px)]">
                <div className="absolute top-4 right-4 bg-primary text-white text-[8px] font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-lg">MELHOR VALOR</div>
                <div className="space-y-6">
                  <div className="space-y-1">
                    <h3 className="text-xs font-black uppercase tracking-widest text-primary flex items-center gap-2">
                      <Infinity className="h-4 w-4" /> Flow Founder Elite
                    </h3>
                    <div className="flex items-baseline gap-2">
                      <span className="text-muted-foreground line-through text-lg decoration-primary/50">R$ 497</span>
                      <p className="text-5xl font-black italic text-white">R$ 267</p>
                    </div>
                    <p className="text-[10px] font-black uppercase text-primary tracking-widest flex items-center gap-2">
                      <CreditCard className="h-3 w-3" /> Em até 12x no cartão
                    </p>
                  </div>
                  <ul className="space-y-4">
                    {['Acesso Vitalício', 'Estratégia Personalizada', 'Ferramenta de Leads', 'Mentor IA 24/7', 'Garantia de 7 Dias'].map((f, i) => (
                      <li key={i} className="flex items-center gap-3 text-xs font-black uppercase tracking-widest text-white">
                        <Star className="h-4 w-4 text-primary fill-primary" /> {f}
                      </li>
                    ))}
                  </ul>
                </div>
                <Button 
                  onClick={() => handleSubscription('lifetime')}
                  disabled={isLoading}
                  className="w-full h-16 mt-8 rounded-2xl bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-widest shadow-[0_10px_30px_rgba(139,92,246,0.4)]"
                >
                  DESBLOQUEAR ACESSO VITALÍCIO <Zap className="ml-2 h-5 w-5 fill-white" />
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
          <h2 className="text-3xl font-black italic uppercase tracking-tighter mb-12 text-center">Dúvidas Frequentes</h2>
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
