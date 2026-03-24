
"use client";

import { useMemo, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  CheckCircle2, 
  Flame, 
  MessageSquare, 
  BookOpen, 
  Zap,
  Lock,
  Loader2,
  DollarSign,
  Target,
  Search,
  UserCheck,
  Trophy,
  ArrowUpRight,
  Star,
  ShieldAlert,
  Clock,
  ShieldCheck
} from 'lucide-react';
import { useUser, useFirestore, useCollection, useMemoFirebase, useDoc } from '@/firebase';
import { collection, query, orderBy, doc } from 'firebase/firestore';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from '@/components/AppSidebar';

export default function Dashboard() {
  const { user, isUserLoading } = useUser();
  const db = useFirestore();
  const router = useRouter();

  const userDocRef = useMemoFirebase(() => {
    if (!db || !user) return null;
    return doc(db, 'users', user.uid);
  }, [db, user]);
  const { data: userData, isLoading: isUserDocLoading } = useDoc(userDocRef);

  const progressQuery = useMemoFirebase(() => {
    if (!db || !user) return null;
    return query(collection(db, 'users', user.uid, 'missionProgress'), orderBy('lastActivityAt', 'desc'));
  }, [db, user]);
  const { data: progressData } = useCollection(progressQuery);

  const missions = [
    { id: 'dia1', title: 'DIA 1: Criar Oferta', desc: 'Defina o que vender e seu primeiro script.', order: 1 },
    { id: 'dia2', title: 'DIA 2: Ajustar Perfil', desc: 'Prepare suas redes para converter visitas em vendas.', order: 2 },
    { id: 'dia3', title: 'DIA 3: Encontrar Leads', desc: 'Identifique os clientes ideais com nossa ferramenta.', order: 3 },
    { id: 'dia4', title: 'DIA 4: Fazer Abordagem', desc: 'Inicie conversas estratégicas e gere interesse.', order: 4 },
    { id: 'dia5', title: 'DIA 5: Conversar & Nutrir', desc: 'Tire dúvidas e mostre o valor da sua solução.', order: 5 },
    { id: 'dia6', title: 'DIA 6: Fechar Venda', desc: 'Quebre as objeções finais e receba o pagamento.', order: 6 },
    { id: 'dia7', title: 'DIA 7: Escalar Fluxo', desc: 'Automatize processos e multiplique seus ganhos.', order: 7 },
  ];

  const completedMissionIds = useMemo(() => {
    return progressData ? progressData.filter(p => p.isCompleted).map(p => p.missionId) : [];
  }, [progressData]);

  const progressPercentage = (completedMissionIds.length / missions.length) * 100;

  useEffect(() => {
    if (!isUserLoading && !user) {
      router.push('/auth');
    }
  }, [user, isUserLoading, router]);

  if (isUserLoading || isUserDocLoading) {
    return (
      <div className="min-h-screen bg-[#050508] flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  // STATUS: BLOCKED
  if (userData?.status === 'blocked') {
    return (
      <div className="min-h-screen bg-[#050508] flex items-center justify-center p-6 text-center">
        <Card className="max-w-md glass-card p-12 space-y-6 rounded-[2.5rem]">
          <div className="h-20 w-20 bg-destructive/10 rounded-full flex items-center justify-center mx-auto border border-destructive/20">
            <ShieldAlert className="h-10 w-10 text-destructive" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-black italic uppercase text-white">Acesso Bloqueado</h2>
            <p className="text-muted-foreground text-sm font-medium">Sua conta foi restringida por violação de termos ou falta de pagamento. Entre em contato com o suporte.</p>
          </div>
          <Button asChild variant="outline" className="w-full h-14 rounded-2xl border-white/10 uppercase font-black tracking-widest">
            <Link href="/">VOLTAR PARA HOME</Link>
          </Button>
        </Card>
      </div>
    );
  }

  // STATUS: PENDING
  if (userData?.status === 'pending') {
    return (
      <div className="min-h-screen bg-[#050508] flex items-center justify-center p-6 text-center">
        <Card className="max-w-lg glass-card p-12 space-y-8 rounded-[2.5rem] border-primary/20">
          <div className="relative h-24 w-24 mx-auto">
            <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl animate-pulse"></div>
            <div className="relative h-24 w-24 bg-primary/10 rounded-full flex items-center justify-center border border-primary/30">
              <Clock className="h-12 w-12 text-primary" />
            </div>
          </div>
          <div className="space-y-3">
            <Badge className="bg-primary/20 text-primary border-primary/30 uppercase tracking-[0.2em] text-[8px] px-4 py-1">Solicitação Recebida</Badge>
            <h2 className="text-3xl font-black italic uppercase text-white tracking-tight">Aguardando Liberação</h2>
            <p className="text-muted-foreground text-base max-w-sm mx-auto leading-relaxed">
              O administrador está analisando seu perfil. Em breve sua jornada na <strong>Área do Aluno</strong> será desbloqueada.
            </p>
          </div>
          <div className="p-6 bg-white/5 rounded-2xl border border-white/10 space-y-4">
            <div className="flex items-center gap-3 text-left">
              <div className="h-8 w-8 rounded-lg bg-green-500/10 flex items-center justify-center text-green-500 shrink-0">
                <CheckCircle2 className="h-5 w-5" />
              </div>
              <p className="text-xs font-bold text-white/80 uppercase">Pagamento Detectado</p>
            </div>
            <div className="flex items-center gap-3 text-left">
              <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0 animate-pulse">
                <Zap className="h-5 w-5" />
              </div>
              <p className="text-xs font-bold text-white/80 uppercase">Configurando Ambiente Neural...</p>
            </div>
          </div>
          <Button variant="ghost" onClick={() => window.location.reload()} className="text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors">
            ATUALIZAR STATUS
          </Button>
        </Card>
      </div>
    );
  }

  // STATUS: APPROVED (ÁREA DO ALUNO)
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-[#050508]">
        <AppSidebar />
        
        <main className="flex-1 flex flex-col min-w-0">
          <header className="h-16 border-b border-white/5 flex items-center justify-between px-6 bg-[#050508]/80 backdrop-blur-md sticky top-0 z-40">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="text-muted-foreground hover:text-white" />
              <div className="h-4 w-px bg-white/10 hidden md:block" />
              <h2 className="text-sm font-black italic uppercase tracking-widest hidden md:block flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-primary" /> Área do Aluno
              </h2>
            </div>
            
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="bg-green-500/10 border-green-500/30 text-green-500 text-[8px] font-black uppercase px-3 py-1">
                <ShieldCheck className="h-3 w-3 mr-1" /> FLOW LIBERADO
              </Badge>
              <Badge variant="secondary" className="bg-primary/10 text-primary gap-1 px-3 py-1 text-[10px] font-black uppercase">
                <Flame className="h-3 w-3" /> {completedMissionIds.length + 1}D STREAK
              </Badge>
            </div>
          </header>

          <div className="flex-1 p-4 md:p-8 space-y-8 max-w-5xl mx-auto w-full">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
              <div className="space-y-2">
                <h1 className="text-4xl font-black italic uppercase tracking-tighter leading-none">
                  Olá, {userData?.name || 'Guerreiro Flow'}
                </h1>
                <p className="text-muted-foreground uppercase text-[10px] font-bold tracking-widest flex items-center gap-2">
                  <Target className="h-3 w-3 text-primary" /> Meta Ativa: R$ 5.000+
                </p>
              </div>
              <div className="flex gap-4 w-full md:w-auto">
                <div className="flex-1 md:flex-none glass-card px-6 py-3 rounded-2xl flex flex-col items-center justify-center min-w-[120px]">
                  <span className="text-[8px] font-black uppercase tracking-widest opacity-50 mb-1">Seu Nível</span>
                  <span className="text-sm font-black italic text-primary uppercase">Elite</span>
                </div>
                <div className="flex-1 md:flex-none glass-card px-6 py-3 rounded-2xl flex flex-col items-center justify-center min-w-[120px]">
                  <span className="text-[8px] font-black uppercase tracking-widest opacity-50 mb-1">Ganhos Flow</span>
                  <span className="text-sm font-black italic flex items-center gap-1">
                    <DollarSign className="h-3 w-3" /> {completedMissionIds.length * 450}
                  </span>
                </div>
              </div>
            </div>

            <Card className="bg-white/[0.02] border-white/5 rounded-[2rem] overflow-hidden">
              <CardContent className="p-8 space-y-6">
                <div className="flex justify-between items-end">
                  <div className="space-y-1">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Progresso da Jornada</p>
                    <h3 className="text-2xl font-black italic uppercase tracking-tight">{Math.round(progressPercentage)}% Concluído</h3>
                  </div>
                  <Trophy className="h-8 w-8 text-primary opacity-20" />
                </div>
                <Progress value={progressPercentage} className="h-3 bg-white/5" />
                <div className="flex justify-between text-[10px] font-black uppercase opacity-50 tracking-widest">
                  <span>Início</span>
                  <span>Escala Profissional</span>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button asChild variant="outline" className="h-24 glass-card border-white/10 flex flex-col gap-2 rounded-2xl hover:bg-primary/10 hover:border-primary/40 group">
                <Link href="/leads">
                  <Search className="h-6 w-6 text-primary group-hover:scale-110 transition-transform" />
                  <span className="text-[9px] font-black uppercase tracking-widest text-white">Captar Leads</span>
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-24 glass-card border-white/10 flex flex-col gap-2 rounded-2xl hover:bg-accent/10 hover:border-accent/40 group">
                <Link href="/mentor">
                  <MessageSquare className="h-6 w-6 text-accent group-hover:scale-110 transition-transform" />
                  <span className="text-[9px] font-black uppercase tracking-widest text-white">IA Mentor</span>
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-24 glass-card border-white/10 flex flex-col gap-2 rounded-2xl hover:bg-purple-500/10 hover:border-purple-500/40 group">
                <Link href="/resources">
                  <BookOpen className="h-6 w-6 text-purple-400 group-hover:scale-110 transition-transform" />
                  <span className="text-[9px] font-black uppercase tracking-widest text-white">Scripts</span>
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-24 glass-card border-white/10 flex flex-col gap-2 rounded-2xl hover:bg-green-500/10 hover:border-green-500/40 group">
                <Link href="/dashboard">
                  <UserCheck className="h-6 w-6 text-green-400 group-hover:scale-110 transition-transform" />
                  <span className="text-[9px] font-black uppercase tracking-widest text-white">Perfil</span>
                </Link>
              </Button>
            </div>

            <div className="space-y-6 pt-4 pb-20">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-black italic uppercase tracking-tighter flex items-center gap-2 text-white">
                  <Zap className="h-6 w-6 text-primary" /> Trilhas de Missão
                </h2>
                <Badge variant="outline" className="text-[8px] font-black uppercase border-white/10 px-3 text-muted-foreground">Status: Ativo</Badge>
              </div>
              
              <div className="grid gap-4">
                {missions.map((mission, index) => {
                  const isCompleted = completedMissionIds.includes(mission.id);
                  const isLocked = index > completedMissionIds.length;
                  const isCurrent = index === completedMissionIds.length;

                  return (
                    <div 
                      key={mission.id} 
                      className={`group relative overflow-hidden p-6 rounded-[1.5rem] border transition-all duration-500 ${
                        isLocked 
                        ? 'bg-white/[0.01] border-white/5 opacity-40 grayscale pointer-events-none' 
                        : isCurrent 
                        ? 'bg-primary/5 border-primary/30 shadow-[0_0_40px_rgba(139,92,246,0.15)] hover:border-primary' 
                        : 'bg-white/[0.03] border-white/10 hover:bg-white/[0.05]'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-4 relative z-10">
                        <div className="flex items-center gap-5">
                          <div className={`h-14 w-14 rounded-2xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-110 ${
                            isCompleted ? 'bg-green-500/10 text-green-500 border border-green-500/20' : isLocked ? 'bg-white/5 text-muted-foreground' : 'bg-primary text-white shadow-xl shadow-primary/40'
                          }`}>
                            {isCompleted ? <CheckCircle2 className="h-7 w-7" /> : isLocked ? <Lock className="h-6 w-6" /> : <span className="font-black italic text-xl leading-none">{index + 1}</span>}
                          </div>
                          <div className="space-y-1 text-left">
                            <h4 className={`font-black italic uppercase tracking-tight text-xl ${isCompleted ? 'text-muted-foreground' : 'text-white'}`}>
                              {mission.title}
                            </h4>
                            <p className="text-sm text-muted-foreground line-clamp-1 opacity-70 group-hover:opacity-100 transition-opacity">{mission.desc}</p>
                          </div>
                        </div>
                        
                        {!isLocked && (
                          <Button asChild variant={isCurrent ? "default" : "ghost"} className="rounded-xl font-black uppercase text-[10px] tracking-widest h-12 px-8">
                            <Link href={`/missions/${mission.id}`}>
                              {isCompleted ? 'REVISAR' : 'EXECUTAR'} <ArrowUpRight className="ml-2 h-4 w-4" />
                            </Link>
                          </Button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
