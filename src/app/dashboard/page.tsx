
"use client";

import { useMemo } from 'react';
import Link from 'next/link';
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
  DollarSign
} from 'lucide-react';
import { useUser, useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, query, orderBy, where } from 'firebase/firestore';

export default function Dashboard() {
  const { user, isUserLoading } = useUser();
  const db = useFirestore();

  // Fetch Mission Progress
  const progressQuery = useMemoFirebase(() => {
    if (!db || !user) return null;
    return query(collection(db, 'users', user.uid, 'missionProgress'), orderBy('lastActivityAt', 'desc'));
  }, [db, user]);

  const { data: progressData, isLoading: isProgressLoading } = useCollection(progressQuery);

  // Define static missions (in a real app these come from /missions collection)
  const missions = [
    { id: 'dia1', title: 'DIA 1: O Que Vender', desc: 'Defina seu produto e script inicial.', order: 1 },
    { id: 'dia2', title: 'DIA 2: Onde Encontrar Clientes', desc: 'Instagram e empresas locais.', order: 2 },
    { id: 'dia3', title: 'DIA 3: Fechamento Alpha', desc: 'Scripts de objeções e conversão.', order: 3 },
  ];

  const completedMissionIds = useMemo(() => {
    return progressData ? progressData.filter(p => p.isCompleted).map(p => p.missionId) : [];
  }, [progressData]);

  const currentMissionIndex = completedMissionIds.length;
  const progressPercentage = (completedMissionIds.length / missions.length) * 100;

  if (isUserLoading) {
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
            <span className="text-xl font-bold tracking-tight italic">FlowPro</span>
          </Link>
          <div className="flex items-center gap-4">
            <Badge variant="secondary" className="bg-primary/10 text-primary gap-1 px-3 py-1">
              <Flame className="h-3 w-3" /> {completedMissionIds.length + 1} DIA STREAK
            </Badge>
          </div>
        </div>
      </header>

      <main className="flex-1 p-4 md:p-8 space-y-8 container mx-auto max-w-4xl">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-black italic uppercase tracking-tighter">Olá, {user?.displayName || 'Vendedor Alpha'}</h1>
          <p className="text-muted-foreground uppercase text-[10px] font-bold tracking-widest">Objetivo: Sua primeira venda em 3 dias</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card className="glass-card border-white/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-black uppercase tracking-widest opacity-70">Seu Progresso</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-black italic">{completedMissionIds.length} / {missions.length} MISSÕES</div>
              <Progress value={progressPercentage} className="h-2 mt-4 bg-white/5" />
            </CardContent>
          </Card>
          <Card className="bg-primary/20 border-primary/30">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-black uppercase tracking-widest text-primary">Ganhos Estimados</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-black italic flex items-center gap-1">
                <DollarSign className="h-5 w-5" /> R$ {completedMissionIds.length * 150},00
              </div>
              <p className="text-[10px] font-bold uppercase tracking-widest opacity-70 mt-1">Baseado em execuções concluídas</p>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-black italic uppercase tracking-tighter flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-primary" /> Jornada de Execução
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
                    ? 'bg-white/[0.02] border-white/5 opacity-50 grayscale' 
                    : isCurrent 
                    ? 'bg-primary/5 border-primary/50 shadow-[0_0_30px_rgba(139,92,246,0.1)]' 
                    : 'bg-white/[0.03] border-accent/30'
                  }`}
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                        isCompleted ? 'bg-green-500/20 text-green-500' : isLocked ? 'bg-white/5 text-muted-foreground' : 'bg-primary text-white'
                      }`}>
                        {isCompleted ? <CheckCircle2 className="h-6 w-6" /> : isLocked ? <Lock className="h-5 w-5" /> : <Zap className="h-6 w-6" />}
                      </div>
                      <div>
                        <h4 className={`font-black italic uppercase tracking-tight text-lg ${isCompleted ? 'text-muted-foreground' : ''}`}>
                          {mission.title}
                        </h4>
                        <p className="text-sm text-muted-foreground">{mission.desc}</p>
                      </div>
                    </div>
                    
                    {!isLocked && (
                      <Button asChild variant={isCurrent ? "default" : "outline"} className="rounded-xl font-black uppercase text-[10px] tracking-widest">
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

        <div className="grid grid-cols-2 gap-4">
          <Button asChild variant="outline" className="h-24 glass-card border-white/10 flex flex-col gap-2 rounded-2xl hover:bg-primary/10 hover:border-primary/40 group">
            <Link href="/mentor">
              <MessageSquare className="h-6 w-6 text-primary group-hover:scale-110 transition-transform" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em]">IA Mentor</span>
            </Link>
          </Button>
          <Button asChild variant="outline" className="h-24 glass-card border-white/10 flex flex-col gap-2 rounded-2xl hover:bg-accent/10 hover:border-accent/40 group">
            <Link href="/resources">
              <BookOpen className="h-6 w-6 text-accent group-hover:scale-110 transition-transform" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em]">Scripts</span>
            </Link>
          </Button>
        </div>
      </main>
    </div>
  );
}
