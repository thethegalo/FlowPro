"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Copy, 
  ArrowLeft, 
  BookOpen, 
  Check, 
  Search,
  Filter,
  MessageSquare,
  Zap,
  Phone,
  Mail,
  Lock,
  Star
} from 'lucide-react';
import { useState, useMemo } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useUser, useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, query } from 'firebase/firestore';

const SCRIPTS = {
  outreach: [
    { title: 'Cold DM - LinkedIn (Fase 1)', content: "Hi [Name], saw your recent post about [Topic]. Found it really insightful! I noticed you're working on [Project]. We recently helped [Competitor] achieve [Result] in this area. Would love to share how we did it. Open to a 5-min chat?", pro: false },
    { title: 'The "Problem-First" Email (Fase 2)', content: "Subject: Solving [Specific Pain Point] for [Company]\n\nHi [Name],\n\nI've been following [Company] and noticed [Specific Challenge]. Most teams handle this by [Inefficient Method], which usually costs them [Metric]. We take a different approach that [Benefit].\n\nWorth a quick look?", pro: true },
  ],
  closing: [
    { title: 'The Transition Close (Fase 1)', content: "Based on everything we've discussed, it seems like [Solution] is the best fit for your goals. Shall we move forward with the next steps to get this implemented by [Deadline]?", pro: false },
    { title: 'Handling "It\'s too expensive" (Fase 2)', content: "I hear you on the cost. If we look at the investment vs. the [Potential Revenue/Savings] of $[Amount] we projected, the ROI happens in [Timeframe]. Does that change how you look at the budget?", pro: true },
  ],
  followup: [
    { title: 'The "Value Add" Follow-up (Fase 1)', content: "Hi [Name], ran across this article on [Topic] and thought of our conversation about [Pain Point]. I think page 3 specifically applies to your situation. Hope it helps!\n\nBest, [My Name]", pro: false },
  ]
};

export default function ResourcesPage() {
  const { user } = useUser();
  const db = useFirestore();
  const { toast } = useToast();
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const subQuery = useMemoFirebase(() => {
    if (!db || !user) return null;
    return query(collection(db, 'users', user.uid, 'subscriptions'));
  }, [db, user]);
  const { data: subData } = useCollection(subQuery);

  const isProMember = useMemo(() => {
    if (user?.email === 'thethegalo@gmail.com') return true;
    return subData?.some(sub => sub.planType === 'monthly' && sub.status === 'active');
  }, [subData, user]);

  const copyToClipboard = (text: string, id: string, isPro: boolean) => {
    if (isPro && !isProMember) {
      toast({
        variant: "destructive",
        title: "Recurso Pro",
        description: "Scripts avançados são exclusivos para membros Flow Pro.",
      });
      return;
    }
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    toast({
      title: "Copiado!",
      description: "Script pronto para uso.",
    });
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#050508] text-white">
      <header className="px-4 h-16 flex items-center border-b border-white/5 bg-[#050508]/80 sticky top-0 z-50">
        <Link href="/dashboard" className="mr-4 text-muted-foreground hover:text-primary transition-colors">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div className="flex-1 flex items-center justify-between">
          <h1 className="text-xl font-black italic uppercase tracking-tighter flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-primary" /> Biblioteca de Scripts
          </h1>
          {isProMember && (
            <Badge className="bg-primary/20 text-primary border-primary/30 text-[8px] font-black uppercase px-3 py-1">
              PRO MEMBER
            </Badge>
          )}
        </div>
      </header>

      <main className="flex-1 container max-w-4xl mx-auto p-4 md:p-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <h2 className="text-3xl font-black italic uppercase tracking-tighter">Modelos de Execução</h2>
            <p className="text-muted-foreground uppercase text-[10px] font-bold tracking-widest">Ações comprovadas para cada fase do fluxo.</p>
          </div>
        </div>

        <Tabs defaultValue="outreach" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-white/5 p-1 h-12 rounded-xl">
            <TabsTrigger value="outreach" className="gap-2 font-black uppercase text-[10px] tracking-widest"><Mail className="h-4 w-4" /> Abordagem</TabsTrigger>
            <TabsTrigger value="closing" className="gap-2 font-black uppercase text-[10px] tracking-widest"><Zap className="h-4 w-4" /> Fechamento</TabsTrigger>
            <TabsTrigger value="followup" className="gap-2 font-black uppercase text-[10px] tracking-widest"><Phone className="h-4 w-4" /> Follow-up</TabsTrigger>
          </TabsList>

          {Object.entries(SCRIPTS).map(([key, list]) => (
            <TabsContent key={key} value={key} className="mt-6 space-y-4">
              {list.map((script, idx) => {
                const isLocked = script.pro && !isProMember;
                return (
                  <Card key={idx} className={`glass-card border-white/10 transition-all ${isLocked ? 'opacity-60' : ''}`}>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <div className="space-y-1">
                        <CardTitle className="text-lg font-black italic uppercase tracking-tight flex items-center gap-2">
                          {script.title} {script.pro && <Star className="h-3 w-3 text-primary fill-primary" />}
                        </CardTitle>
                        <CardDescription className="text-[10px] uppercase font-bold tracking-widest">
                          {isLocked ? 'Exclusivo Fase 2: Escala' : 'Livre para Fase 1'}
                        </CardDescription>
                      </div>
                      <Button 
                        size="sm" 
                        variant={isLocked ? "ghost" : "outline"}
                        onClick={() => copyToClipboard(script.content, `${key}-${idx}`, !!script.pro)}
                        className={`gap-2 rounded-xl text-[10px] font-black uppercase tracking-widest ${isLocked ? 'text-primary' : ''}`}
                      >
                        {isLocked ? <Lock className="h-4 w-4" /> : copiedId === `${key}-${idx}` ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                        {isLocked ? "UNLOCK PRO" : copiedId === `${key}-${idx}` ? "COPIADO" : "COPIAR"}
                      </Button>
                    </CardHeader>
                    <CardContent>
                      <pre className={`bg-black/40 p-5 rounded-2xl text-xs whitespace-pre-wrap font-medium leading-relaxed border border-white/5 text-white/70 ${isLocked ? 'blur-sm select-none' : ''}`}>
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
          <Card className="bg-primary/10 border-primary/30 overflow-hidden rounded-[2rem]">
            <CardContent className="p-8 flex flex-col md:flex-row items-center gap-6">
              <div className="bg-primary/20 p-4 rounded-2xl">
                <Zap className="h-10 w-10 text-primary" />
              </div>
              <div className="space-y-1 text-center md:text-left flex-1">
                <h3 className="text-xl font-black italic uppercase tracking-tighter">Precisa de Scripts de Elite?</h3>
                <p className="text-xs text-muted-foreground uppercase font-bold tracking-widest">Desbloqueie a Fase 2 para ter acesso a modelos de escala agressiva.</p>
              </div>
              <Button asChild className="bg-primary hover:bg-primary/90 rounded-2xl h-14 px-8 font-black uppercase tracking-widest">
                <Link href="/paywall">EVOLUIR PARA PRO</Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}
