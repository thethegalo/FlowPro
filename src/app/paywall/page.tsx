
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
  CalendarCheck
} from 'lucide-react';
import { useUser, useFirestore } from '@/firebase';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

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
    <div className="min-h-screen bg-[#050508] text-white">
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px]"></div>
      </div>

      <section className="py-20 px-4 relative z-10">
        <div className="container max-w-5xl mx-auto space-y-16">
          <div className="text-center space-y-6">
            <Badge className="bg-primary/20 text-primary border border-primary/30 uppercase tracking-[0.3em] text-[10px] px-4 py-1.5">Libere todo o potencial</Badge>
            <h1 className="text-5xl md:text-8xl font-black italic uppercase tracking-tighter leading-[0.85]">
              DOMINE O MERCADO <br /><span className="text-primary">COM PODER IA.</span>
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto font-medium uppercase tracking-tight">
              A jornada de 7 dias foi apenas o começo. Escolha como você quer escalar a partir de agora.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-10 max-w-4xl mx-auto items-stretch">
            
            {/* PLANO VITALÍCIO */}
            <Card className="glass-card p-10 flex flex-col justify-between border-white/10 relative overflow-hidden rounded-[2.5rem] bg-white/[0.04] hover:bg-white/[0.06] transition-all duration-500">
              <div className="space-y-8 relative z-10">
                <div className="space-y-3">
                  <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-white/50 flex items-center gap-2">
                    <Infinity className="h-4 w-4" /> Plano Vitalício (Base)
                  </h3>
                  <div className="flex items-baseline gap-1">
                    <p className="text-6xl font-black italic text-white tracking-tighter">R$ 267</p>
                  </div>
                  <p className="text-[10px] font-black uppercase text-white/40 tracking-widest flex items-center gap-2">
                    <CalendarCheck className="h-3.5 w-3.5" /> EM ATÉ 12X NO CARTÃO
                  </p>
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
                      <CheckCircle2 className="h-4 w-4 text-white/20" /> {f}
                    </li>
                  ))}
                </ul>
              </div>
              <Button 
                onClick={() => handleSubscription('lifetime')}
                disabled={isLoading}
                className="w-full h-16 mt-10 rounded-2xl bg-white/5 border border-white/10 text-white hover:bg-white/10 font-black uppercase tracking-widest transition-all shadow-xl"
              >
                ATIVAR MEU ACESSO ÚNICO
              </Button>
            </Card>

            {/* PLANO PRO (MENSAL) */}
            <div className="relative p-[2px] rounded-[2.5rem] overflow-hidden shadow-[0_0_60px_rgba(139,92,246,0.3)]">
              <div className="absolute inset-0 bg-gradient-to-br from-primary via-accent to-primary animate-pulse"></div>
              <Card className="relative bg-[#050508] p-10 flex flex-col justify-between h-full border-none rounded-[calc(2.5rem-2px)]">
                <div className="absolute top-5 right-5 bg-primary text-white text-[8px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest shadow-lg">RECOMENDADO</div>
                
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
                      'Radar de Leads Ilimitado', 
                      'IA de Prospecção Avançada', 
                      'Novas Estratégias Semanais', 
                      'Scripts de Elite (Volume)', 
                      'Acesso à Comunidade Flow',
                      'Atualizações Vitalícias'
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
                  QUERO ACESSO COMPLETO <ArrowRight className="ml-2 h-6 w-6" />
                </Button>
              </Card>
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
    </div>
  );
}
