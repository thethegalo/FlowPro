
"use client";

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  Copy, 
  BookOpen, 
  Check, 
  Zap,
  Phone,
  Mail,
  Lock,
  Star,
  Layout,
  MessageCircle,
  FileCheck
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useUser, useFirestore, useCollection, useMemoFirebase, useDoc } from '@/firebase';
import { collection, query, doc } from 'firebase/firestore';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from '@/components/AppSidebar';

const SCRIPTS = {
  outreach: [
    { title: 'Abordagem Local (Fase 1)', content: "Olá! Notei que o perfil da [Negócio] é muito bom, mas vocês ainda não usam automação de respostas. Isso faz vocês perderem clientes para a concorrência que responde mais rápido. Posso te mandar uma demo de como recuperar essas vendas?", pro: false },
    { title: 'Email de Autoridade (Fase 2)', content: "Assunto: Resolvendo o gargalo de leads da [Empresa]\n\nOlá [Nome],\n\nEstive analisando o funil de vocês e identifiquei um ponto de perda de 30% na conversão logo no primeiro contato. Desenvolvemos um Flow que atua exatamente nessa ferida.\n\nTeria 5 min amanhã?", pro: true },
  ],
  closing: [
    { title: 'Fechamento Direto (Fase 1)', content: "Com base no que conversamos, o sistema Flow é o que falta para você automatizar sua agenda. Podemos liberar seu acesso agora e já configurar sua primeira campanha hoje mesmo?", pro: false },
    { title: 'Quebra de Objeção: Preço (Fase 2)', content: "Eu entendo o investimento. Se olharmos para o lucro de R$ [Valor] que projetamos, o sistema se paga em menos de 15 dias. Faz sentido deixar esse lucro na mesa por causa de uma parcela mensal?", pro: true },
  ],
  models: [
    { title: 'Bio de Autoridade', content: "🚀 Especialista em Automação de Vendas para [Nicho]\n🎯 Ajudo negócios a escalarem sem anúncios\n💰 +R$ [Valor] gerados para clientes\n👇 Veja como funciona o Método Flow", pro: false },
    { title: 'Estrutura de Oferta Irresistível', content: "1. O Problema: [O que dói no cliente]\n2. A Causa: [Por que isso acontece]\n3. A Solução: [Seu Método Flow]\n4. O Resultado: [O que ele ganha]\n5. A Garantia: [Risco Zero]\n6. CTA: [Próximo Passo]", pro: true },
    { title: 'Proposta Comercial (Compacta)', content: "Olá [Nome],\n\nSegue o resumo da nossa solução:\n\n✅ Implementação do Radar Flow em 48h\n✅ Automação de 100% dos Leads de entrada\n✅ Dashboard de Ganhos em tempo real\n\nInvestimento: R$ [Valor]\nRetorno Estimado: [ROI]\n\nIniciamos hoje?", pro: true }
  ]
};

const ADMIN_EMAIL = "thethegalo@gmail.com";

export default function ResourcesPage() {
  const { user } = useUser();
  const db = useFirestore();
  const { success, warning, error } = useToast();
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const userDocRef = useMemoFirebase(() => {
    if (!db || !user) return null;
    return doc(db, 'users', user.uid);
  }, [db, user]);
  const { data: userData } = useDoc(userDocRef);

  const subQuery = useMemoFirebase(() => {
    if (!db || !user) return null;
    return query(collection(db, 'users', user.uid, 'subscriptions'));
  }, [db, user]);
  const { data: subData } = useCollection(subQuery);

  const isProMember = useMemo(() => {
    const hasActiveSub = subData?.some(sub => (sub.planType === 'monthly' || sub.planType === 'lifetime') && sub.status === 'active');
    const hasPremiumPlan = userData?.plan === 'vitalicio' || userData?.plan === 'mensal';
    return hasActiveSub || hasPremiumPlan || user?.email === ADMIN_EMAIL;
  }, [subData, user, userData]);

  const copyToClipboard = (text: string, id: string, isPro: boolean) => {
    if (isPro && !isProMember) {
      warning("Recurso Pro", "Scripts avançados são exclusivos para membros Flow Pro ou Vitalícios.");
      return;
    }
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    success("Copiado!", "Script pronto para ser colado e personalizado.");
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-transparent relative z-10">
        <AppSidebar />
        
        <main className="flex-1 flex flex-col min-w-0 relative z-10">
          <header className="h-16 border-b border-white/5 flex items-center justify-between px-6 bg-[#050508]/80 backdrop-blur-md sticky top-0 z-50">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="text-muted-foreground hover:text-white" />
              <div className="h-4 w-px bg-white/10 hidden md:block" />
              <h1 className="text-sm font-black italic uppercase tracking-widest flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-primary" /> Biblioteca de Elite
              </h1>
            </div>
            {isProMember && (
              <Badge className="bg-primary/20 text-primary border-primary/30 text-[8px] font-black uppercase px-3 py-1">
                {userData?.plan?.toUpperCase() || 'PRO MEMBER'}
              </Badge>
            )}
          </header>

          <div className="flex-1 container max-w-4xl mx-auto p-4 md:p-8 space-y-8">
            <div className="space-y-2">
              <h2 className="text-3xl font-black italic uppercase tracking-tighter text-white">Arsenal de Scripts</h2>
              <p className="text-muted-foreground uppercase text-[10px] font-bold tracking-widest">Modelos de alta conversão testados no campo de batalha.</p>
            </div>

            <Tabs defaultValue="outreach" className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-white/5 p-1 h-14 rounded-2xl border border-white/5">
                <TabsTrigger value="outreach" className="gap-2 font-black uppercase text-[10px] tracking-widest rounded-xl"><Mail className="h-4 w-4" /> Abordagem</TabsTrigger>
                <TabsTrigger value="closing" className="gap-2 font-black uppercase text-[10px] tracking-widest rounded-xl"><Zap className="h-4 w-4" /> Fechamento</TabsTrigger>
                <TabsTrigger value="models" className="gap-2 font-black uppercase text-[10px] tracking-widest rounded-xl"><FileCheck className="h-4 w-4" /> Modelos</TabsTrigger>
              </TabsList>

              {Object.entries(SCRIPTS).map(([key, list]) => (
                <TabsContent key={key} value={key} className="mt-8 space-y-4">
                  {list.map((script, idx) => {
                    const isLocked = script.pro && !isProMember;
                    return (
                      <Card key={idx} className={`glass-card border-white/10 transition-all ${isLocked ? 'opacity-60' : 'hover:border-primary/30'} rounded-[1.5rem]`}>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                          <div className="space-y-1">
                            <CardTitle className="text-lg font-black italic uppercase tracking-tight flex items-center gap-2">
                              {script.title} {script.pro && <Star className="h-3 w-3 text-primary fill-primary" />}
                            </CardTitle>
                            <CardDescription className="text-[10px] uppercase font-bold tracking-widest">
                              {isLocked ? 'Exclusivo Fase 2: Escala' : 'Livre para Fase 1'}
                            </CardDescription>
                          </div>
                          <div className="flex gap-2">
                            {isLocked ? (
                              <Button asChild size="sm" variant="ghost" className="gap-2 rounded-xl text-[10px] font-black uppercase tracking-widest h-10 text-primary">
                                <Link href="/paywall"><Lock className="h-4 w-4" /> UNLOCK PRO</Link>
                              </Button>
                            ) : (
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => copyToClipboard(script.content, `${key}-${idx}`, !!script.pro)}
                                className="gap-2 rounded-xl text-[10px] font-black uppercase tracking-widest h-10 border-white/10 hover:bg-white/5"
                              >
                                {copiedId === `${key}-${idx}` ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                                {copiedId === `${key}-${idx}` ? "COPIADO" : "COPIAR"}
                              </Button>
                            )}
                          </div>
                        </CardHeader>
                        <CardContent>
                          <pre className={`bg-black/40 p-6 rounded-2xl text-xs whitespace-pre-wrap font-medium leading-relaxed border border-white/5 text-white/70 ${isLocked ? 'blur-sm select-none' : ''}`}>
                            {script.content}
                          </pre>
                        </CardContent>
                      </Card>
                    );
                  })}
                </TabsContent>
              ))}
            </Tabs>

            {!isProMember && (
              <Card className="bg-primary/10 border-primary/30 overflow-hidden rounded-[2rem] shadow-[0_0_60px_rgba(124,58,255,0.2)]">
                <CardContent className="p-8 flex flex-col md:flex-row items-center gap-6">
                  <div className="bg-primary/20 p-4 rounded-2xl">
                    <Star className="h-10 w-10 text-primary fill-primary" />
                  </div>
                  <div className="space-y-1 text-center md:text-left flex-1">
                    <h3 className="text-xl font-black italic uppercase tracking-tighter">Precisa de Scripts de Elite?</h3>
                    <p className="text-xs text-muted-foreground uppercase font-bold tracking-widest">Desbloqueie a Fase 2 para ter acesso a modelos de escala agressiva.</p>
                  </div>
                  <Button asChild className="bg-primary hover:bg-primary/90 rounded-2xl h-14 px-8 font-black uppercase tracking-widest shadow-lg shadow-primary/20 transition-all">
                    <Link href="/paywall">EVOLUIR PARA PRO</Link>
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
