
"use client";

import { useMemo, useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  CheckCircle2, 
  Flame, 
  MessageSquare, 
  BookOpen, 
  Lock,
  Loader2,
  DollarSign,
  Target,
  Search,
  UserCheck,
  Trophy,
  ArrowUpRight,
  ShieldAlert,
  Clock,
  ShieldCheck,
  Sparkles,
  Plus,
  TrendingUp,
  Zap,
  AlertCircle,
  TrendingDown
} from 'lucide-react';
import { useUser, useFirestore, useCollection, useMemoFirebase, useDoc } from '@/firebase';
import { collection, query, orderBy, doc, updateDoc, increment, serverTimestamp, getDoc } from 'firebase/firestore';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from '@/components/AppSidebar';
import { useToast } from '@/hooks/use-toast';
import { 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Area,
  AreaChart
} from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

const LOGO_ICON = "https://s3.typebot.io/public/workspaces/cmml2oniw000g04l7gwmqelu1/typebots/cmn1vyjog000104la10d6sdzu/blocks/d5tqr6czngeukjb8r6whrs5s?v=1774318273085";
const ADMIN_EMAIL = "thethegalo@gmail.com";

export default function Dashboard() {
  const { user, isUserLoading } = useUser();
  const db = useFirestore();
  const router = useRouter();
  const { toast } = useToast();
  const [isAddingEarning, setIsAddingEarning] = useState(false);
  const [userGoal, setUserGoal] = useState(5000);

  const userDocRef = useMemoFirebase(() => {
    if (!db || !user) return null;
    return doc(db, 'users', user.uid);
  }, [db, user]);
  const { data: userData, isLoading: isUserDocLoading } = useDoc(userDocRef);

  const subQuery = useMemoFirebase(() => {
    if (!db || !user) return null;
    return query(collection(db, 'users', user.uid, 'subscriptions'));
  }, [db, user]);
  const { data: subData } = useCollection(subQuery);

  const isSpecialUser = user?.email === ADMIN_EMAIL;

  const isProMember = useMemo(() => {
    const hasActiveSub = subData?.some(sub => (sub.planType === 'monthly' || sub.planType === 'lifetime') && sub.status === 'active');
    return hasActiveSub || isSpecialUser;
  }, [subData, isSpecialUser]);

  const progressQuery = useMemoFirebase(() => {
    if (!db || !user) return null;
    return query(collection(db, 'users', user.uid, 'missionProgress'), orderBy('completedAt', 'desc'));
  }, [db, user]);
  const { data: progressData } = useCollection(progressQuery);

  useEffect(() => {
    async function fetchGoal() {
      if (!db || !user) return;
      try {
        const quizDoc = await getDoc(doc(db, 'users', user.uid, 'quizResponses', 'initial'));
        if (quizDoc.exists()) {
          const target = quizDoc.data().responses?.target;
          if (target) {
            setUserGoal(Number(Array.isArray(target) ? target[0] : target));
          }
        }
      } catch (e) {}
    }
    fetchGoal();
  }, [db, user]);

  const missions = [
    { id: 'dia1', title: 'DIA 1: Criar Oferta', desc: 'Defina o que vender e seu primeiro script de ataque.', order: 1 },
    { id: 'dia2', title: 'DIA 2: Ajustar Perfil', desc: 'Prepare suas redes para converter visitas em vendas reais.', order: 2 },
    { id: 'dia3', title: 'DIA 3: Encontrar Leads', desc: 'Identifique os clientes ideais com nosso Radar de Leads.', order: 3 },
    { id: 'dia4', title: 'DIA 4: Fazer Abordagem', desc: 'Inicie conversas estratégicas e gere interesse com IA.', order: 4 },
    { id: 'dia5', title: 'DIA 5: Conversar & Nutrir', desc: 'Tire dúvidas e mostre o valor da sua solução Flow.', order: 5 },
    { id: 'dia6', title: 'DIA 6: Fechar Venda', desc: 'Quebre as objeções finais e receba o primeiro pagamento.', order: 6 },
    { id: 'dia7', title: 'DIA 7: Escalar Flow', desc: 'Automatize processos e multiplique seus ganhos diários.', order: 7 },
  ];

  const completedMissionIds = useMemo(() => {
    return progressData ? progressData.filter(p => p.isCompleted).map(p => p.missionId) : [];
  }, [progressData]);

  const isJourneyFinished = completedMissionIds.includes('dia7');

  useEffect(() => {
    if (isJourneyFinished && !isProMember && !isUserDocLoading) {
      const timer = setTimeout(() => router.push('/paywall'), 3000);
      return () => clearTimeout(timer);
    }
  }, [isJourneyFinished, isProMember, router, isUserDocLoading]);

  // Lógica de Ganhos: Para o Admin soma ao valor base de destaque
  const rawEarnings = userData?.totalEarnings || 0;
  const totalEarnings = isSpecialUser ? 28754 + rawEarnings : rawEarnings;
  const displayGoal = isSpecialUser ? 50000 : userGoal;
  const earningsProgress = (totalEarnings / displayGoal) * 100;

  // Gerador de dados para o gráfico (Série temporal contínua dos últimos 30 dias)
  const chartData = useMemo(() => {
    const days = 30;
    const data = [];
    const baseValue = totalEarnings;
    
    // Inicia 30 dias atrás e vem até hoje
    for (let i = days; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dayStr = date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
      
      // Simulação de curva de crescimento realista baseada no ganho atual
      let value = 0;
      if (baseValue > 0) {
        // Fator de crescimento: quanto mais perto de hoje, maior o valor acumulado simulado
        const growthFactor = (days - i) / days;
        // Adiciona uma variação aleatória para não ser uma linha reta perfeita
        const variation = 0.85 + Math.random() * 0.3; 
        value = Math.floor(baseValue * growthFactor * variation);
      }
      
      data.push({
        date: dayStr,
        ganhos: value,
      });
    }
    return data;
  }, [totalEarnings]);

  const userLevel = useMemo(() => {
    const missionsCount = completedMissionIds.length;
    const actionsCount = userData?.totalActions || 0;
    
    if (missionsCount >= 6 || actionsCount >= 100) return { name: 'PRO', color: 'text-purple-400', icon: <Trophy className="h-4 w-4" /> };
    if (missionsCount >= 4 || actionsCount >= 50) return { name: 'Vendedor', color: 'text-green-400', icon: <Zap className="h-4 w-4" /> };
    if (missionsCount >= 2 || actionsCount >= 15) return { name: 'Executor', color: 'text-blue-400', icon: <TrendingUp className="h-4 w-4" /> };
    return { name: 'Iniciante', color: 'text-primary', icon: <Sparkles className="h-4 w-4" /> };
  }, [completedMissionIds, userData]);

  const dailyActions = userData?.dailyActions || 0;
  const dailyGoal = 10;

  const handleAddEarning = async () => {
    if (!db || !user) return;
    setIsAddingEarning(true);
    try {
      const userRef = doc(db, 'users', user.uid);
      await updateDoc(userRef, {
        totalEarnings: increment(100),
        updatedAt: serverTimestamp(),
        lastActionAt: serverTimestamp()
      });
      toast({
        title: rawEarnings === 0 && !isSpecialUser ? "🔥 Boa! Você já saiu do zero" : "Venda Registrada!",
        description: "+ R$ 100,00 adicionados ao seu placar."
      });
    } catch (e: any) {
      console.error("Erro ao adicionar ganho:", e);
      toast({ variant: "destructive", title: "Erro ao atualizar ganhos", description: "Verifique sua conexão ou permissões." });
    } finally {
      setIsAddingEarning(false);
    }
  };

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

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-[#050508]">
        <AppSidebar />
        
        <main className="flex-1 flex flex-col min-w-0">
          <header className="h-16 border-b border-white/5 flex items-center justify-between px-6 bg-[#050508]/80 backdrop-blur-md sticky top-0 z-40">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="text-muted-foreground hover:text-white" />
              <div className="h-4 w-px bg-white/10 hidden md:block" />
              <h2 className="text-sm font-black italic uppercase tracking-widest hidden md:flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-primary" /> Área do Aluno
              </h2>
            </div>
            
            <div className="flex items-center gap-3">
              <Badge variant="outline" className={`${isProMember ? 'bg-purple-500/10 border-purple-500/30 text-purple-400' : 'bg-white/5 border-white/10 text-muted-foreground'} text-[8px] font-black uppercase px-3 py-1`}>
                {isProMember ? 'PRO MEMBER' : 'FREE PLAN'}
              </Badge>
              <Badge variant="secondary" className="bg-primary/10 text-primary gap-1 px-3 py-1 text-[10px] font-black uppercase">
                <Flame className="h-3 w-3" /> {completedMissionIds.length}D
              </Badge>
            </div>
          </header>

          <div className="flex-1 p-4 md:p-8 space-y-8 max-w-5xl mx-auto w-full">
            {isJourneyFinished && !isProMember && (
              <div className="bg-primary/10 border border-primary/20 p-6 rounded-[2rem] flex flex-col md:flex-row items-center justify-between gap-6 animate-in zoom-in duration-500">
                <div className="space-y-1 text-center md:text-left">
                  <h3 className="text-xl font-black italic uppercase tracking-tighter text-white">Parabéns! Você concluiu sua primeira jornada</h3>
                  <p className="text-sm text-muted-foreground font-medium">Agora é hora de escalar seus resultados na Fase 2.</p>
                </div>
                <Button asChild className="bg-primary hover:bg-primary/90 rounded-2xl h-14 px-8 font-black uppercase tracking-widest shadow-xl shadow-primary/20">
                  <Link href="/paywall">DESBLOQUEAR ESCALA PRO</Link>
                </Button>
              </div>
            )}

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div className="space-y-2">
                <h1 className="text-3xl md:text-4xl font-black italic uppercase tracking-tighter leading-none">
                  Olá, {userData?.name?.split(' ')[0] || 'Guerreiro'}
                </h1>
                <div className="flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full w-fit">
                  <div className={`${userLevel.color}`}>
                    {userLevel.icon}
                  </div>
                  <span className={`text-[10px] font-black uppercase tracking-widest ${userLevel.color}`}>Nível {userLevel.name}</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-primary/5 border border-primary/20 max-w-xs animate-in slide-in-from-right-10 duration-700">
                <div className="flex gap-3 items-start">
                  <AlertCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                  <p className="text-[10px] font-bold text-white/80 leading-relaxed uppercase">
                    {completedMissionIds.length === 0 
                      ? "Você está a 1 passo da sua primeira venda. Não pare agora." 
                      : isJourneyFinished
                      ? "Você já provou que é um executor. A escala é o próximo passo."
                      : "Agora é a etapa onde a maioria desiste. Continue acelerando!"}
                  </p>
                </div>
              </div>
            </div>

            <Card className="bg-white/[0.02] border-white/5 rounded-[2rem] overflow-hidden p-6 md:p-10 space-y-8">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                <div className="space-y-1">
                  <h3 className="text-2xl font-black italic uppercase tracking-tight text-white">Ganhos dos Últimos 30 Dias</h3>
                  <p className="text-xs text-muted-foreground font-medium uppercase tracking-widest">Soma dos contratos fechados nos últimos 30 dias.</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-black uppercase tracking-widest opacity-50 mb-1">Ganhos Totais</p>
                  <div className="text-4xl font-black italic tracking-tighter text-white">R$ {totalEarnings.toLocaleString('pt-BR')}</div>
                </div>
              </div>

              <div className="h-[300px] w-full">
                <ChartContainer config={{ 
                  ganhos: { label: "Ganhos", color: "hsl(var(--primary))" } 
                }}>
                  <AreaChart 
                    data={chartData} 
                    margin={{ top: 10, right: 0, left: -20, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient id="colorGanhos" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                    <XAxis 
                      dataKey="date" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fontSize: 10, fill: 'rgba(255,255,255,0.3)', fontWeight: 'bold' }}
                      dy={10}
                      minTickGap={30}
                    />
                    <YAxis 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fontSize: 10, fill: 'rgba(255,255,255,0.3)', fontWeight: 'bold' }}
                      tickFormatter={(value) => `R$ ${value >= 1000 ? value / 1000 + 'k' : value}`}
                      domain={[0, (dataMax: number) => Math.ceil(dataMax * 1.2 / 1000) * 1000]}
                    />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Area 
                      type="monotone" 
                      dataKey="ganhos" 
                      stroke="hsl(var(--primary))" 
                      strokeWidth={3}
                      fillOpacity={1} 
                      fill="url(#colorGanhos)" 
                      animationDuration={1500}
                    />
                  </AreaChart>
                </ChartContainer>
              </div>
            </Card>

            <div className="grid gap-6 md:grid-cols-2">
              <Card className="bg-white/[0.02] border-white/5 rounded-[2rem] overflow-hidden">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-black uppercase tracking-widest text-primary">Seus Ganhos</span>
                    <Badge variant="outline" className="text-[8px] border-primary/20 text-primary">META: R$ {displayGoal.toLocaleString('pt-BR')}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-end justify-between">
                    <div className="text-5xl font-black italic tracking-tighter">R$ {totalEarnings.toLocaleString('pt-BR')}</div>
                    <Button 
                      size="sm" 
                      onClick={handleAddEarning}
                      disabled={isAddingEarning}
                      className="bg-white text-black hover:bg-primary hover:text-white rounded-xl font-black uppercase text-[10px] h-10 px-4 transition-all"
                    >
                      {isAddingEarning ? <Loader2 className="h-3 w-3 animate-spin" /> : <><Plus className="h-3 w-3 mr-1" /> ADICIONAR GANHO</>}
                    </Button>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-[8px] font-black uppercase opacity-50 tracking-widest">
                      <span>Progresso da Meta</span>
                      <span>{Math.min(100, Math.round(earningsProgress))}%</span>
                    </div>
                    <Progress value={earningsProgress} className="h-2 bg-white/5" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/[0.02] border-white/5 rounded-[2rem] overflow-hidden">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-black uppercase tracking-widest text-accent">Ações de Hoje</span>
                    <Badge variant="outline" className="text-[8px] border-accent/20 text-accent">EXECUTAR DIARIAMENTE</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="text-4xl font-black italic tracking-tighter">
                        {dailyActions}/{dailyGoal}
                      </div>
                      <p className="text-[10px] font-bold text-muted-foreground uppercase">Atividades Concluídas</p>
                    </div>
                    <div className={`h-16 w-16 rounded-full flex items-center justify-center border-4 ${dailyActions >= dailyGoal ? 'border-green-500 bg-green-500/10' : 'border-white/5 bg-white/5'}`}>
                      {dailyActions >= dailyGoal ? <Flame className="h-8 w-8 text-green-500 animate-pulse" /> : <Target className="h-8 w-8 text-muted-foreground opacity-20" />}
                    </div>
                  </div>
                  {dailyActions >= dailyGoal && (
                    <div className="text-center p-2 bg-green-500/10 border border-green-500/20 rounded-xl">
                      <p className="text-[10px] font-black text-green-500 uppercase tracking-widest">🔥 Meta do dia concluída</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
              <Button asChild variant="outline" className="h-20 md:h-24 glass-card border-white/10 flex flex-col gap-2 rounded-2xl hover:bg-primary/10 hover:border-primary/40 group">
                <Link href="/leads">
                  <Search className="h-5 w-5 md:h-6 md:w-6 text-primary group-hover:scale-110 transition-transform" />
                  <span className="text-[8px] md:text-[9px] font-black uppercase tracking-widest text-white">Captar Leads</span>
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-20 md:h-24 glass-card border-white/10 flex flex-col gap-2 rounded-2xl hover:bg-accent/10 hover:border-accent/40 group">
                <Link href="/mentor">
                  <MessageSquare className="h-5 w-5 md:h-6 md:w-6 text-accent group-hover:scale-110 transition-transform" />
                  <span className="text-[8px] md:text-[9px] font-black uppercase tracking-widest text-white">IA Mentor</span>
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-20 md:h-24 glass-card border-white/10 flex flex-col gap-2 rounded-2xl hover:bg-purple-500/10 hover:border-purple-500/40 group">
                <Link href="/resources">
                  <BookOpen className="h-5 w-5 md:h-6 md:w-6 text-purple-400 group-hover:scale-110 transition-transform" />
                  <span className="text-[8px] md:text-[9px] font-black uppercase tracking-widest text-white">Scripts</span>
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-20 md:h-24 glass-card border-white/10 flex flex-col gap-2 rounded-2xl hover:bg-green-500/10 hover:border-green-500/40 group">
                <Link href="/dashboard">
                  <UserCheck className="h-5 w-5 md:h-6 md:w-6 text-green-400 group-hover:scale-110 transition-transform" />
                  <span className="text-[8px] md:text-[9px] font-black uppercase tracking-widest text-white">Perfil</span>
                </Link>
              </Button>
            </div>

            <div className="space-y-6 pt-4 pb-20">
              <div className="flex items-center justify-between">
                <h2 className="text-xl md:text-2xl font-black italic uppercase tracking-tighter flex items-center gap-2 text-white">
                  <div className="relative h-5 w-5 md:h-6 md:w-6">
                    <Image src={LOGO_ICON} alt="Icon" fill className="object-contain" />
                  </div>
                  Trilhas de Missão
                </h2>
                <div className="flex items-center gap-2 text-[8px] font-black text-muted-foreground uppercase bg-white/5 px-3 py-1 rounded-full border border-white/10">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse"></span> Alguém acabou de fechar uma venda
                </div>
              </div>
              
              <div className="grid gap-3 md:gap-4">
                {missions.map((mission, index) => {
                  const isCompleted = completedMissionIds.includes(mission.id);
                  const isLocked = index > completedMissionIds.length;
                  const isCurrent = index === completedMissionIds.length;

                  return (
                    <div 
                      key={mission.id} 
                      className={`group relative overflow-hidden p-4 md:p-6 rounded-[1.5rem] border transition-all duration-500 ${
                        isLocked 
                        ? 'bg-white/[0.01] border-white/5 opacity-40 grayscale pointer-events-none' 
                        : isCurrent 
                        ? 'bg-primary/5 border-primary/30 shadow-[0_0_40px_rgba(139,92,246,0.15)] hover:border-primary' 
                        : 'bg-white/[0.03] border-white/10 hover:bg-white/[0.05]'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-4 relative z-10">
                        <div className="flex items-center gap-4 md:gap-5">
                          <div className={`h-10 w-10 md:h-14 md:w-14 rounded-xl md:rounded-2xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-110 ${
                            isCompleted ? 'bg-green-500/10 text-green-500 border border-green-500/20' : isLocked ? 'bg-white/5 text-muted-foreground' : 'bg-primary text-white shadow-xl shadow-primary/40'
                          }`}>
                            {isCompleted ? <CheckCircle2 className="h-5 w-5 md:h-7 md:w-7" /> : isLocked ? <Lock className="h-4 w-4 md:h-6 md:w-6" /> : <span className="font-black italic text-lg md:text-xl leading-none">{index + 1}</span>}
                          </div>
                          <div className="space-y-0.5 md:space-y-1 text-left min-w-0">
                            <h4 className={`font-black italic uppercase tracking-tight text-base md:text-xl truncate ${isCompleted ? 'text-muted-foreground' : 'text-white'}`}>
                              {mission.title}
                            </h4>
                            <p className="text-xs text-muted-foreground line-clamp-1 opacity-70 group-hover:opacity-100 transition-opacity">{mission.desc}</p>
                          </div>
                        </div>
                        
                        {!isLocked && (
                          <Button asChild variant={isCurrent ? "default" : "ghost"} className="rounded-xl font-black uppercase text-[8px] md:text-[10px] tracking-widest h-10 md:h-12 px-4 md:px-8">
                            <Link href={`/missions/${mission.id}`}>
                              {isCompleted ? 'REVISAR' : 'EXECUTAR'} <ArrowUpRight className="ml-1 md:ml-2 h-3 w-3 md:h-4 w-4" />
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
