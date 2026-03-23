
"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Zap, Star, ShieldCheck, CheckCircle2, ArrowRight, Lock } from 'lucide-react';

export default function PaywallPage() {
  return (
    <div className="min-h-screen bg-[#050508] py-20 px-4">
      <div className="container max-w-5xl mx-auto space-y-16">
        <div className="text-center space-y-6">
          <Badge className="bg-primary/20 text-primary border border-primary/30 uppercase tracking-[0.3em] text-[10px]">LIBERAÇÃO PENDENTE</Badge>
          <h1 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter leading-none">
            VOCÊ ESTÁ A UM PASSO DE <br /><span className="text-primary shimmer-text">COMERÇAR A FATURAR</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Seu plano Alpha já foi gerado e as tarefas estão prontas. Libere seu acesso agora para visualizar o passo a passo completo, scripts e o mentor IA.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Plano Mensal */}
          <Card className="glass-card p-8 flex flex-col justify-between border-white/5 hover:border-white/20">
            <div className="space-y-6">
              <div className="space-y-1">
                <h3 className="text-xs font-black uppercase tracking-widest text-muted-foreground">Standard Alpha</h3>
                <p className="text-4xl font-black italic">R$ 147<span className="text-sm font-normal opacity-50">/mês</span></p>
              </div>
              <ul className="space-y-4">
                {['Acesso a todas as Missões', 'Mentor IA Ilimitado', 'Biblioteca de Scripts', 'Plano Personalizado'].map((f, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm font-bold uppercase tracking-widest text-white/70">
                    <CheckCircle2 className="h-4 w-4 text-primary" /> {f}
                  </li>
                ))}
              </ul>
            </div>
            <Button variant="outline" className="w-full h-14 mt-8 rounded-2xl border-white/10 hover:bg-white text-black font-black uppercase tracking-widest transition-all">
              ATIVAR MENSAL
            </Button>
          </Card>

          {/* Plano Vitalício - Destaque */}
          <div className="relative group p-[2px] rounded-[var(--radius)] overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary via-accent to-primary animate-marquee bg-[length:200%_200%]"></div>
            <Card className="relative bg-[#050508] p-8 flex flex-col justify-between h-full border-none rounded-[calc(var(--radius)-2px)]">
              <div className="absolute top-4 right-4 bg-primary text-white text-[8px] font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-lg">90% DE DESCONTO</div>
              <div className="space-y-6">
                <div className="space-y-1">
                  <h3 className="text-xs font-black uppercase tracking-widest text-primary">Alpha Founder Elite</h3>
                  <div className="flex items-baseline gap-2">
                    <p className="text-5xl font-black italic text-white">R$ 267</p>
                    <span className="text-[10px] font-black uppercase text-primary tracking-widest">PAGAMENTO ÚNICO</span>
                  </div>
                </div>
                <ul className="space-y-4">
                  {[
                    'Tudo do Mensal', 
                    'Acesso VITALÍCIO', 
                    'Sem Mensalidades', 
                    'Mentoria VIP Alpha', 
                    'Scripts Exclusivos V2'
                  ].map((f, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm font-black uppercase tracking-widest text-white">
                      <Star className="h-4 w-4 text-primary fill-primary" /> {f}
                    </li>
                  ))}
                </ul>
              </div>
              <Button className="w-full h-16 mt-8 rounded-2xl bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-widest shadow-[0_10px_30px_rgba(139,92,246,0.4)] transition-all">
                DOMINAR O MERCADO <Zap className="ml-2 h-5 w-5 fill-white" />
              </Button>
            </Card>
          </div>
        </div>

        <div className="text-center pt-8 space-y-4">
          <div className="flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground">
            <ShieldCheck className="h-4 w-4" /> Pagamento Seguro • Acesso Imediato • Garantia de 7 Dias
          </div>
          <p className="text-xs text-muted-foreground italic">
            "Seu plano já está pronto e reservado. Falta apenas liberar o acesso para começar sua primeira missão ainda hoje."
          </p>
        </div>
      </div>
    </div>
  );
}
