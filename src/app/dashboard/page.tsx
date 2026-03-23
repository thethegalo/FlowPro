
"use client";

import { useMemo, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  CheckCircle2, 
  Circle, 
  Flame, 
  MessageSquare, 
  BookOpen, 
  TrendingUp,
  ChevronRight,
  Zap,
  Lock,
  Loader2,
  DollarSign,
  Target
} from 'lucide-react';
import { useUser, useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, query, orderBy } from 'firebase/firestore';

export default function Dashboard() {
  const { user, isUserLoading } = useUser();
  const db = useFirestore();
  const router = useRouter();

  // Fetch Subscriptions (Verify access)
  const subQuery = useMemoFirebase(() => {
    if (!db || !user) return null;
    return query(collection(db, 'users', user.uid, 'subscriptions'));
  }, [db, user]);
  const { data: subData, isLoading: isSubLoading } = useCollection(subQuery);

  // Fetch Mission Progress
  const progressQuery = useMemoFirebase(() => {
    if (!db || !user) return null;
    return query(collection(db, 'users', user.uid, 'missionProgress'), orderBy('lastActivityAt', 'desc'));
  }, [db, user]);
  const { data: progressData, isLoading: isProgressLoading } = useCollection(progressQuery);

  // Define static missions
  const missions = [
    { id: 'dia1', title: 'DIA 1: A Oferta de Ouro', desc: 'Defina o que vender e seu primeiro script.', order: 1 },
    { id: 'dia2', title: 'DIA 2: Atração Alpha', desc: 'Onde encontrar clientes prontos para pagar.', order: 2 },
    { id: 'dia3', title: 'DIA 3: Fechamento Brutal', desc: 'Quebra de objeções e conversão em dinheiro.', order: 3 },
  ];

  const completedMissionIds = useMemo(() => {
    return progressData ? progressData.filter(p => p.isCompleted).map(p => p.missionId) : [];
  }, [progressData]);

  const progressPercentage = (completedMissionIds.length / missions.length) * 100;

  // Security Check
  useEffect(() => {
    if (!isUserLoading && !isSubLoading && user && (!subData || subData.length === 0)) {
      router.push('/paywall');
    }
  }, [user, subData, isUserLoading, isSubLoading, router]);

  if (isUserLoading || isSubLoading) {
    return (
      <div className="min-h-screen bg-[#050508] flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#050508]">
      <header className="sticky top-0 z-40 border-b border-white/5 bg-[#050508]/80 backdrop-blur-md">
        <div className="container flex h-16 items-center justify-between px-4 sm:px-6">
          <Link href="/dashboard" className="flex items-center gap-2">
            <Zap className="h-6 w-6 text-primary" />
            <span className="text-xl font-black italic tracking-tighter uppercase">FlowPro</span>
          </Link>
          <div className="flex items-center gap-4">
            <Badge variant="secondary" className="bg-primary/10 text-primary gap-1 px-3 py-1">
              <Flame className="h-3 w-3" /> {completedMissionIds.length + 1}D STREAK
            </Badge>
          </div>
        </div>
      </header>

      <main className="flex-1 p-4 md:p-8 space-y-8 container mx-auto max-w-4xl">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-black italic uppercase tracking-tighter">Olá, {user?.displayName || 'Guerreiro Alpha'}</h1>
          <p className="text-muted-foreground uppercase text-[10px] font-bold tracking-widest flex items-center gap-2">
            <Target className="h-3 w-3 text-primary" /> Objetivo: Sua primeira venda em 72h
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card className="glass-card border-white/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-[10px] font-black uppercase tracking-widest opacity-70">Seu Progresso</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-black italic uppercase">{completedMissionIds.length} / {missions.length} CONCLUÍDO</div>
              <Progress value={progressPercentage} className="h-2 mt-4 bg-white/5" />
            </CardContent>
          </Card>
          <Card className="bg-primary/10 border-primary/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-[10px] font-black uppercase tracking-widest text-primary">Potencial de Ganhos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-black italic flex items-center gap-1">
                <DollarSign className="h-5 w-5" /> R$ {completedMissionIds.length * 300},00
              </div>
              <p className="text-[10px] font-bold uppercase tracking-widest opacity-50 mt-1">Baseado em execuções práticas</p>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-black italic uppercase tracking-tighter flex items-center gap-2">
            <Zap className="h-5 w-5 text-primary" /> Missões de Execução
          </h2>
          
          <div className="grid gap-4">
            {missions.map((mission, index) => {
              const isCompleted = completedMissionIds.includes(mission.id);
              const isLocked = index > completedMissionIds.length;
              const isCurrent = index === completedMissionIds.length;

              return (
                <div 
                  key={mission.id} 
                  className={`relative overflow-hidden p-6 rounded-2xl border transition-all ${
                    isLocked 
                    ? 'bg-white/[0.02] border-white/5 opacity-40' 
                    : isCurrent 
                    ? 'bg-primary/5 border-primary/40 shadow-[0_0_30px_rgba(139,92,246,0.1)]' 
                    : 'bg-white/[0.03] border-accent/20'
                  }`}
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className={`h-12 w-12 rounded-full flex items-center justify-center shrink-0 ${
                        isCompleted ? 'bg-green-500/20 text-green-500' : isLocked ? 'bg-white/5 text-muted-foreground' : 'bg-primary text-white shadow-lg shadow-primary/30'
                      }`}>
                        {isCompleted ? <CheckCircle2 className="h-6 w-6" /> : isLocked ? <Lock className="h-5 w-5" /> : <Zap className="h-6 w-6" />}
                      </div>
                      <div>
                        <h4 className={`font-black italic uppercase tracking-tight text-lg ${isCompleted ? 'text-muted-foreground' : ''}`}>
                          {mission.title}
                        </h4>
                        <p className="text-sm text-muted-foreground line-clamp-1">{mission.desc}</p>
                      </div>
                    </div>
                    
                    {!isLocked && (
                      <Button asChild variant={isCurrent ? "default" : "outline"} className="rounded-xl font-black uppercase text-[10px] tracking-widest h-10 px-6">
                        <Link href={`/missions/${mission.id}`}>
                          {isCompleted ? 'REVISAR' : 'EXECUTAR'} <ChevronRight className="ml-1 h-4 w-4" />
                        </Link>
                      </Button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-4">
          <Button asChild variant="outline" className="h-28 glass-card border-white/10 flex flex-col gap-2 rounded-2xl hover:bg-primary/10 hover:border-primary/40 group">
            <Link href="/mentor">
              <MessageSquare className="h-8 w-8 text-primary group-hover:scale-110 transition-transform" />
              <div className="text-center">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] block">IA Mentor</span>
                <span className="text-[8px] opacity-50 uppercase">Pergunte à IA</span>
              </div>
            </Link>
          </Button>
          <Button asChild variant="outline" className="h-28 glass-card border-white/10 flex flex-col gap-2 rounded-2xl hover:bg-accent/10 hover:border-accent/40 group">
            <Link href="/resources">
              <BookOpen className="h-8 w-8 text-accent group-hover:scale-110 transition-transform" />
              <div className="text-center">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] block">Scripts</span>
                <span className="text-[8px] opacity-50 uppercase">Modelos Prontos</span>
              </div>
            </Link>
          </Button>
        </div>
      </main>
    </div>
  );
}
