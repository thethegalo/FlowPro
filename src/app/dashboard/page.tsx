
"use client";

import { useMemo, useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  CheckCircle2, 
  Flame, 
  MessageSquare, 
  Lock,
  Loader2,
  DollarSign,
  Target,
  Search,
  Trophy,
  ArrowUpRight,
  Sparkles,
  Zap,
  Calendar,
  Play,
  Bell,
  TrendingUp,
  Activity
} from 'lucide-react';
import { useUser, useFirestore, useCollection, useMemoFirebase, useDoc } from '@/firebase';
import { collection, query, orderBy, doc, getDoc, limit } from 'firebase/firestore';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from '@/components/AppSidebar';
import { useToast } from '@/hooks/use-toast';
import { 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip
} from 'recharts';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';
import { Input } from '@/components/ui/input';

const ADMIN_EMAIL = "thethegalo@gmail.com";

function AnimatedNumber({ value, duration = 2000, prefix = "", suffix = "" }: { value: number, duration?: number, prefix?: string, suffix?: string }) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      setDisplayValue(Math.floor(progress * value));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [value, duration]);

  return <span>{prefix}{displayValue.toLocaleString('pt-BR')}{suffix}</span>;
}

export default function Dashboard() {
  const { user, isUserLoading } = useUser();
  const db = useFirestore();
  const router = useRouter();
  const { toast } = useToast();
  
  const [userGoal, setUserGoal] = useState(5000);

  const userDocRef = useMemoFirebase(() => {
    if (!db || !user) return null;
    return doc(db, 'users', user.uid);
  }, [db, user]);
  const { data: userData, isLoading: isUserDocLoading } = useDoc(userDocRef);

  const isSpecialUser = useMemo(() => user?.email === ADMIN_EMAIL, [user]);
  const isGrayUser = useMemo(() => user?.email === 'grayy.fefe@gmail.com', [user]);

  const displayName = useMemo(() => {
    if (isSpecialUser) return 'Lucas';
    if (isGrayUser) return 'Gray';
    if (userData?.name) return userData.name;
    if (user?.displayName) return user.displayName;
    if (user?.email) return user.email.split('@')[0];
    return 'Usuário';
  }, [userData?.name, user?.displayName, user?.email, isSpecialUser, isGrayUser]);

  const isProMember = useMemo(() => {
    return userData?.plan === 'vitalicio' || userData?.plan === 'mensal' || userData?.plan === 'trimestral' || isSpecialUser || isGrayUser;
  }, [isSpecialUser, isGrayUser, userData]);

  const currentJourneyDay = useMemo(() => {
    if (!userData?.createdAt) return 1;
    if (isSpecialUser || isGrayUser) return 7;
    const created = userData.createdAt.toDate ? userData.createdAt.toDate() : new Date(userData.createdAt);
    const diffInMs = Date.now() - created.getTime();
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    return diffInDays + 1;
  }, [userData?.createdAt, isSpecialUser, isGrayUser]);

  const earningsQuery = useMemoFirebase(() => {
    if (!db || !user) return null;
    return query(collection(db, 'users', user.uid, 'earnings'), orderBy('date', 'desc'), limit(100));
  }, [db, user]);
  const { data: earningsData } = useCollection(earningsQuery);

  useEffect(() => {
    async function fetchGoal() {
      if (!db || !user) return;
      try {
        const quizDoc = await getDoc(doc(db, 'users', user.uid, 'quizResponses', 'initial'));
        if (quizDoc.exists()) {
          const target = quizDoc.data().responses?.target;
          if (target) setUserGoal(Number(Array.isArray(target) ? target[0] : target));
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

  const progressQuery = useMemoFirebase(() => {
    if (!db || !user) return null;
    return query(collection(db, 'users', user.uid, 'missionProgress'), orderBy('completedAt', 'asc'));
  }, [db, user]);
  const { data: progressData } = useCollection(progressQuery);

  const completedMissionIds = useMemo(() => {
    return progressData ? progressData.filter(p => p.isCompleted).map(p => p.missionId) : [];
  }, [progressData]);

  const totalEarnings = useMemo(() => {
    if (userData?.simulatedStats?.total !== undefined) return userData.simulatedStats.total;
    const raw = userData?.totalEarnings || 0;
    if (isSpecialUser) return 21564 + raw;
    if (isGrayUser) return 17594 + raw;
    return raw;
  }, [userData?.totalEarnings, userData?.simulatedStats, isSpecialUser, isGrayUser]);

  const displayGoal = isSpecialUser ? 50000 : isGrayUser ? 25000 : userGoal;
  
  const chartData = useMemo(() => {
    if (userData?.simulatedStats?.chart) {
      return userData.simulatedStats.chart.map((p: any) => ({
        date: new Date(p.date).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' }),
        ganhos: p.amount
      }));
    }

    const days = 30;
    const data = [];
    const now = new Date();
    const earningsByDate: Record<string, number> = {};
    earningsData?.forEach(e => { earningsByDate[e.date] = (earningsByDate[e.date] || 0) + (e.amount || 0); });
    
    const lucasValues = [5874,420,380,650,290,810,0,1200,340,290,480,0,920,670,410,380,0,1100,590,430,280,0,1340,480,670,0,1200,890,430,0,630];
    const grayValues = [0,600,0,800,1200,0,1500,0,700,900,0,1900,0,800,600,0,1700,0,1000,0,2000,0,700,1300,0,1600,0,294,0,0,0];

    for (let i = days; i >= 0; i--) {
      const d = new Date();
      d.setDate(now.getDate() - i);
      const dateKey = d.toISOString().split('T')[0];
      const dayStr = d.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
      let dailyValue = earningsByDate[dateKey] || 0;
      
      if (dailyValue === 0) {
        if (isSpecialUser) dailyValue = lucasValues[30 - i] || 0;
        else if (isGrayUser) dailyValue = grayValues[30 - i] || 0;
      }
      
      data.push({ date: dayStr, ganhos: dailyValue });
    }
    return data;
  }, [earningsData, isSpecialUser, isGrayUser, userData?.simulatedStats]);

  const userLevel = useMemo(() => {
    const missionsCount = completedMissionIds.length;
    if (missionsCount >= 6) return { name: 'PRO', color: 'text-purple-400', icon: <Trophy className="h-4 w-4" /> };
    if (missionsCount >= 4) return { name: 'Vendedor', color: 'text-green-400', icon: <Zap className="h-4 w-4" /> };
    return { name: 'Iniciante', color: 'text-primary', icon: <Sparkles className="h-4 w-4" /> };
  }, [completedMissionIds]);

  const dailyActions = userData?.dailyActions || 0;
  const dailyGoal = 10;

  useEffect(() => {
    if (!isUserLoading && !user) router.push('/auth');
  }, [user, isUserLoading, router]);

  if (isUserLoading || isUserDocLoading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full relative overflow-x-hidden">
        <AppSidebar />
        
        <main className="flex-1 flex flex-col min-w-0 relative z-10">
          {/* HEADER ULTRA-PREMIUM */}
          <header className="h-24 px-8 flex items-center justify-between bg-black/20 backdrop-blur-md border-b border-white/5 sticky top-0 z-50">
            <div className="space-y-1">
              <h1 className="text-[28px] font-bold text-white tracking-tight leading-none">
                Olá, {displayName} 👋
              </h1>
              <p className="text-sm font-medium text-white/40">
                Seja bem-vindo ao seu centro de comando tático.
              </p>
            </div>

            <div className="flex items-center gap-6">
              <div className="hidden md:flex relative group w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30 group-focus-within:text-primary transition-colors" />
                <Input 
                  placeholder="Pesquisar ferramentas..." 
                  className="h-10 bg-white/5 border-[#8b5cf6]/20 pl-10 text-xs rounded-lg focus-visible:ring-primary focus-visible:bg-white/[0.08] transition-all"
                />
              </div>

              <div className="flex items-center gap-4">
                <Badge className="h-9 px-4 bg-gradient-to-r from-[#7c3aed] to-[#9333ea] border-none text-[10px] font-black uppercase tracking-widest text-white shadow-[0_0_20px_rgba(124,58,237,0.3)] rounded-lg">
                  ⚡ VITALÍCIO
                </Badge>
                
                <button className="relative h-10 w-10 flex items-center justify-center rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                  <Bell className="h-5 w-5 text-white/60" />
                  <span className="absolute top-2.5 right-2.5 h-2 w-2 bg-red-500 rounded-full border-2 border-[#05050f]" />
                </button>
              </div>
            </div>
          </header>

          <div className="flex-1 p-8 space-y-10 max-w-7xl mx-auto w-full">
            
            {/* GRID DE MÉTRICAS (3 COLUNAS) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Card 1: Ganhos Totais */}
              <div className="group relative">
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#a855f7] to-transparent z-10" />
                <Card className="bg-white/5 border border-[#8b5cf6]/15 rounded-2xl p-6 transition-all duration-300 hover:translate-y-[-2px] hover:border-[#a855f7]/35 relative overflow-hidden">
                  <div className="flex justify-between items-start mb-4">
                    <div className="space-y-1">
                      <p className="text-[11px] font-bold text-white/40 uppercase tracking-[0.8px]">Placar de Caixa</p>
                      <h3 className="text-[28px] font-bold text-[#f0eeff] tracking-tight">
                        <AnimatedNumber value={totalEarnings} prefix="R$ " />
                      </h3>
                    </div>
                    <div className="p-2 bg-white/5 rounded-lg opacity-30 group-hover:opacity-100 transition-opacity">
                      <DollarSign className="h-5 w-5 text-primary" />
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-green-500/10 border-green-500/25 text-[#4ade80] text-[10px] font-bold px-2 py-0.5 rounded-md">
                      +12% hoje
                    </Badge>
                    <span className="text-[10px] text-white/20 font-medium uppercase tracking-widest">Meta: R$ {displayGoal.toLocaleString('pt-BR')}</span>
                  </div>
                </Card>
              </div>

              {/* Card 2: Ações Diárias */}
              <div className="group relative">
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#a855f7] to-transparent z-10" />
                <Card className="bg-white/5 border border-[#8b5cf6]/15 rounded-2xl p-6 transition-all duration-300 hover:translate-y-[-2px] hover:border-[#a855f7]/35 relative overflow-hidden">
                  <div className="flex justify-between items-start mb-4">
                    <div className="space-y-1">
                      <p className="text-[11px] font-bold text-white/40 uppercase tracking-[0.8px]">Execução Diária</p>
                      <h3 className="text-[28px] font-bold text-[#f0eeff] tracking-tight">
                        <AnimatedNumber value={dailyActions} /> <span className="text-lg opacity-30">/ {dailyGoal}</span>
                      </h3>
                    </div>
                    <div className="p-2 bg-white/5 rounded-lg opacity-30 group-hover:opacity-100 transition-opacity">
                      <Activity className="h-5 w-5 text-primary" />
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-blue-500/10 border-blue-500/25 text-blue-400 text-[10px] font-bold px-2 py-0.5 rounded-md">
                      Alta Performance
                    </Badge>
                    <span className="text-[10px] text-white/20 font-medium uppercase tracking-widest">Ritmo constante</span>
                  </div>
                </Card>
              </div>

              {/* Card 3: Progresso Jornada */}
              <div className="group relative">
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#a855f7] to-transparent z-10" />
                <Card className="bg-white/5 border border-[#8b5cf6]/15 rounded-2xl p-6 transition-all duration-300 hover:translate-y-[-2px] hover:border-[#a855f7]/35 relative overflow-hidden">
                  <div className="flex justify-between items-start mb-4">
                    <div className="space-y-1">
                      <p className="text-[11px] font-bold text-white/40 uppercase tracking-[0.8px]">Status Jornada</p>
                      <h3 className="text-[28px] font-bold text-[#f0eeff] tracking-tight">
                        Dia {currentJourneyDay} <span className="text-lg opacity-30">Ativo</span>
                      </h3>
                    </div>
                    <div className="p-2 bg-white/5 rounded-lg opacity-30 group-hover:opacity-100 transition-opacity">
                      <TrendingUp className="h-5 w-5 text-primary" />
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-purple-500/10 border-purple-500/25 text-[#c084fc] text-[10px] font-bold px-2 py-0.5 rounded-md">
                      Patente {userLevel.name}
                    </Badge>
                    <span className="text-[10px] text-white/20 font-medium uppercase tracking-widest">{completedMissionIds.length} concluídas</span>
                  </div>
                </Card>
              </div>
            </div>

            {/* GRÁFICO DE PERFORMANCE */}
            <Card className="bg-white/[0.03] border border-white/5 p-8 rounded-3xl space-y-8 overflow-hidden relative">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/0 via-primary/20 to-primary/0" />
              <div className="flex justify-between items-end">
                <div className="space-y-1">
                  <h3 className="text-xl font-bold text-white italic uppercase tracking-tight">Performance 30 Dias</h3>
                  <p className="text-xs text-white/30 uppercase font-bold tracking-widest">Análise de fluxo financeiro neural</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-white/20 mb-1">Total Período</p>
                  <div className="text-3xl font-bold italic tracking-tighter text-white"><AnimatedNumber value={totalEarnings} prefix="R$ " /></div>
                </div>
              </div>
              <div className="h-[300px] w-full relative">
                <ChartContainer config={{ ganhos: { label: "Valor", color: "hsl(var(--primary))" } }} className="aspect-auto h-full w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorGanhos" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.03)" />
                      <XAxis 
                        dataKey="date" 
                        axisLine={false} 
                        tickLine={false}
                        tick={{ fontSize: 9, fill: 'rgba(255,255,255,0.2)', fontWeight: 'bold' }}
                        interval={9}
                        dy={10}
                      />
                      <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 9, fill: 'rgba(255,255,255,0.2)', fontWeight: 'bold' }} tickFormatter={(v) => `R$${v}`} />
                      <Tooltip content={<ChartTooltipContent />} />
                      <Area type="monotone" dataKey="ganhos" stroke="hsl(var(--primary))" strokeWidth={3} fill="url(#colorGanhos)" animationDuration={2000} isAnimationActive={true} />
                    </AreaChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
            </Card>

            {/* JORNADA DE MISSÕES */}
            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h2 className="text-3xl font-bold italic uppercase tracking-tighter text-white">Sua Jornada de Escala</h2>
                  <p className="text-white/30 text-[10px] font-black uppercase tracking-[0.2em]">O método exato para sua primeira venda em 7 dias</p>
                </div>
                <Badge className="bg-primary/10 text-primary border-primary/20 text-[10px] font-black uppercase px-4 py-1.5 rounded-lg">
                  DIA {currentJourneyDay} OPERACIONAL
                </Badge>
              </div>

              <div className="grid gap-4">
                {missions.map((m) => {
                  const isCompleted = completedMissionIds.includes(m.id);
                  const isLocked = !isSpecialUser && !isGrayUser && m.order > currentJourneyDay && !isCompleted;
                  const isCurrent = !isCompleted && !isLocked && (isSpecialUser || isGrayUser || m.order === currentJourneyDay);

                  return (
                    <Link 
                      key={m.id} 
                      href={isLocked ? '#' : `/missions/${m.id}`}
                      className={`block group transition-all ${isLocked ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
                    >
                      <Card className={`bg-white/[0.03] border-white/5 rounded-2xl overflow-hidden transition-all duration-500 ${isCurrent ? 'border-primary/40 bg-primary/5 shadow-lg shadow-primary/5' : ''} ${isCompleted ? 'border-green-500/20' : 'hover:border-white/10 hover:bg-white/[0.05]'}`}>
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between gap-6">
                            <div className="flex items-center gap-6">
                              <div className={`h-14 w-14 rounded-xl flex items-center justify-center text-xl font-bold italic shrink-0 transition-all ${isCompleted ? 'bg-green-500/20 text-green-500' : isCurrent ? 'bg-primary text-white shadow-lg shadow-primary/30 rotate-3' : 'bg-white/5 text-white/30'}`}>
                                {isCompleted ? <CheckCircle2 className="h-7 w-7" /> : m.order}
                              </div>
                              <div className="space-y-1">
                                <h4 className={`font-bold uppercase italic tracking-tight text-lg ${isLocked ? 'text-white/20' : 'text-white'}`}>{m.title}</h4>
                                <p className="text-sm text-white/40 font-medium">{m.desc}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-4">
                              {isLocked ? (
                                <div className="flex flex-col items-end opacity-20">
                                  <Lock className="h-5 w-5 text-white" />
                                  <span className="text-[8px] font-bold uppercase text-white mt-1">Bloqueado</span>
                                </div>
                              ) : isCompleted ? (
                                <Badge className="bg-green-500/10 text-green-500 border-green-500/20 text-[10px] font-bold uppercase px-3 py-1">CONCLUÍDO</Badge>
                              ) : (
                                <Button size="sm" className="bg-primary hover:bg-primary/90 text-white rounded-lg text-[10px] font-bold uppercase px-4 h-9 shadow-lg group-hover:scale-105 transition-all">
                                  {isCurrent ? 'INICIAR AGORA' : 'REVISAR'} <Play className="ml-2 h-3 w-3 fill-white" />
                                </Button>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
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
