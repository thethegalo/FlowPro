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
  TrendingDown,
  Calendar,
  ShieldX,
  ChevronRight,
  Timer,
  Play
} from 'lucide-react';
import { useUser, useFirestore, useCollection, useMemoFirebase, useDoc } from '@/firebase';
import { collection, query, orderBy, doc, setDoc, addDoc, increment, serverTimestamp, getDoc, limit, where } from 'firebase/firestore';
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
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DashboardParticles } from '@/components/DashboardParticles';

const LOGO_ICON = "https://s3.typebot.io/public/workspaces/cmml2oniw000g04l7gwmqelu1/typebots/cmn1vyjog000104la10d6sdzu/blocks/d5tqr6czngeukjb8r6whrs5s?v=1774318273085";
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
  
  const [isAddingEarning, setIsAddingEarning] = useState(false);
  const [showEarningModal, setShowEarningModal] = useState(false);
  const [earningAmount, setEarningAmount] = useState("");
  const [earningDate, setEarningDate] = useState(new Date().toISOString().split('T')[0]);
  const [userGoal, setUserGoal] = useState(5000);

  const userDocRef = useMemoFirebase(() => {
    if (!db || !user) return null;
    return doc(db, 'users', user.uid);
  }, [db, user]);
  const { data: userData, isLoading: isUserDocLoading } = useDoc(userDocRef);

  const isSpecialUser = useMemo(() => user?.email === ADMIN_EMAIL, [user]);

  const displayName = useMemo(() => {
    if (isSpecialUser) return 'Lucas';
    if (userData?.name) return userData.name;
    if (user?.displayName) return user.displayName;
    if (user?.email) return user.email.split('@')[0];
    return 'Usuário';
  }, [userData?.name, user?.displayName, user?.email, isSpecialUser]);

  const subQuery = useMemoFirebase(() => {
    if (!db || !user) return null;
    return query(collection(db, 'users', user.uid, 'subscriptions'));
  }, [db, user]);
  const { data: subData } = useCollection(subQuery);

  const isProMember = useMemo(() => {
    const hasActiveSub = subData?.some(sub => (sub.planType === 'monthly' || sub.planType === 'lifetime') && sub.status === 'active');
    const hasPremiumPlan = userData?.plan === 'vitalicio' || userData?.plan === 'mensal' || userData?.plan === 'trimestral';
    return hasActiveSub || hasPremiumPlan || isSpecialUser;
  }, [subData, isSpecialUser, userData]);

  const currentJourneyDay = useMemo(() => {
    if (!userData?.createdAt) return 1;
    if (isSpecialUser) return 7;
    const created = userData.createdAt.toDate ? userData.createdAt.toDate() : new Date(userData.createdAt);
    const diffInMs = Date.now() - created.getTime();
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    return diffInDays + 1;
  }, [userData?.createdAt, isSpecialUser]);

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
    const raw = userData?.totalEarnings || 0;
    return isSpecialUser ? 28754 + raw : raw;
  }, [userData?.totalEarnings, isSpecialUser]);

  const displayGoal = isSpecialUser ? 50000 : userGoal;
  const chartData = useMemo(() => {
    const days = 30;
    const data = [];
    const now = new Date();
    const earningsByDate: Record<string, number> = {};
    earningsData?.forEach(e => { earningsByDate[e.date] = (earningsByDate[e.date] || 0) + (e.amount || 0); });
    for (let i = days; i >= 0; i--) {
      const d = new Date();
      d.setDate(now.getDate() - i);
      const dateKey = d.toISOString().split('T')[0];
      const dayStr = d.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
      let dailyValue = earningsByDate[dateKey] || 0;
      if (isSpecialUser && dailyValue === 0) {
        const seed = (i * 1234.5) + (user?.uid?.charCodeAt(0) || 1);
        const rand = Math.abs(Math.sin(seed) * 10000) % 1;
        dailyValue = Math.floor((28754 / 30) * (0.3 + rand * 1.5));
      }
      data.push({ date: dayStr, ganhos: dailyValue });
    }
    return data;
  }, [earningsData, isSpecialUser, user?.uid]);

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

  if (isUserLoading || isUserDocLoading) return <div className="min-h-screen bg-[#050508] flex items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-[#050508] relative dashboard-root overflow-x-hidden">
        <DashboardParticles />
        <AppSidebar />
        
        <main className="flex-1 flex flex-col min-w-0 relative z-10">
          <header className="h-16 border-b border-white/5 flex items-center justify-between px-6 bg-[#050508]/80 backdrop-blur-md sticky top-0 z-40 overflow-hidden">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="text-muted-foreground hover:text-white" />
              <div className="h-6 w-px bg-white/10 hidden md:block" />
              <h2 className="text-sm font-black italic uppercase tracking-widest flex items-center gap-2 animate-gradient-text">
                <Sparkles className="h-4 w-4 text-primary" /> Painel de Comando
              </h2>
            </div>
            <Badge variant="outline" className={`${isProMember ? 'bg-purple-500/10 border-purple-500/30 text-purple-400' : 'bg-white/5'} text-[8px] font-black uppercase px-3 py-1 relative z-50`}>
              {isSpecialUser ? 'VITALÍCIO' : (userData?.plan?.toUpperCase() || 'ACESSO LIMITADO')}
            </Badge>
          </header>

          <div className="flex-1 p-8 space-y-12 max-w-5xl mx-auto w-full">
            {/* Boas Vindas */}
            <div className="flex flex-col md:flex-row justify-between items-end gap-6">
              <div className="space-y-3">
                <h1 className="text-4xl font-black italic uppercase tracking-tighter text-white">{displayName}</h1>
                <div className="flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full w-fit status-badge">
                  <div className={userLevel.color}>{userLevel.icon}</div>
                  <span className={`text-[10px] font-black uppercase tracking-widest ${userLevel.color}`}>Patente {userLevel.name}</span>
                </div>
              </div>
              <div className="p-4 rounded-2xl bg-primary/5 border border-primary/20 max-w-xs">
                <p className="text-[10px] font-bold text-white/80 leading-relaxed uppercase">
                  {isSpecialUser ? "Modo de operação ativa. Acelere para a escala!" : !isProMember ? "Assine um plano para liberar o Radar Neural completo." : "Modo de operação ativo. Acelere para a escala!"}
                </p>
              </div>
            </div>

            {/* Gráfico de Performance */}
            <Card className="bg-white/[0.02] border-white/5 rounded-[2rem] p-10 space-y-10 metric-card mb-8">
              <div className="flex justify-between items-end">
                <h3 className="text-2xl font-black italic uppercase tracking-tight text-white">Performance 30 Dias</h3>
                <div className="text-right">
                  <p className="text-[10px] font-black uppercase tracking-widest opacity-50 mb-1">Ganhos Totais</p>
                  <div className="text-4xl font-black italic tracking-tighter text-white"><AnimatedNumber value={totalEarnings} prefix="R$ " /></div>
                </div>
              </div>
              <div className="h-[300px] w-full relative pb-6">
                <ChartContainer config={{ ganhos: { label: "Valor", color: "hsl(var(--primary))" } }}>
                  <AreaChart data={chartData} margin={{ top: 10, right: 0, left: -20, bottom: 30 }}>
                    <defs><linearGradient id="colorGanhos" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.4}/><stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/></linearGradient></defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.06)" />
                    <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 8, fill: 'rgba(255,255,255,0.3)', fontWeight: 'bold' }} dy={15} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 8, fill: 'rgba(255,255,255,0.3)', fontWeight: 'bold' }} tickFormatter={(v) => `R$${v}`} />
                    <Tooltip content={<ChartTooltipContent />} />
                    <Area type="monotone" dataKey="ganhos" stroke="hsl(var(--primary))" strokeWidth={3} fill="url(#colorGanhos)" animationDuration={2000} />
                  </AreaChart>
                </ChartContainer>
              </div>
            </Card>

            {/* Grades de Métricas */}
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="bg-white/[0.02] border-white/5 rounded-[2rem] p-8 space-y-6 metric-card">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-black uppercase tracking-widest text-primary">Placar de Caixa</span>
                  <Badge variant="outline" className="text-[8px] border-primary/20 text-primary">ALVO: R$ {displayGoal.toLocaleString('pt-BR')}</Badge>
                </div>
                <div className="text-5xl font-black italic tracking-tighter text-white"><AnimatedNumber value={totalEarnings} prefix="R$ " /></div>
                <p className="text-[10px] font-bold text-green-500 flex items-center gap-1"><ArrowUpRight className="h-3 w-3" /> +12% HOJE</p>
                <div className="space-y-2">
                  <div className="flex justify-between text-[8px] font-black uppercase opacity-50"><span>Progresso</span><span>{Math.min(100, Math.round((totalEarnings/displayGoal)*100))}%</span></div>
                  <Progress value={(totalEarnings/displayGoal)*100} className="h-2" />
                </div>
              </Card>

              <Card className="bg-white/[0.02] border-white/5 rounded-[2rem] p-8 metric-card">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-[10px] font-black uppercase tracking-widest text-accent">Execução Diária</span>
                  <Badge variant="outline" className="text-[8px] border-accent/20 text-accent">ALTA PERFORMANCE</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-4xl font-black italic tracking-tighter text-white"><AnimatedNumber value={dailyActions} />/{dailyGoal}</div>
                    <p className="text-[10px] font-bold text-muted-foreground uppercase mt-1">Ações do Dia</p>
                  </div>
                  <div className="relative h-24 w-24 flex items-center justify-center">
                    <svg className="h-full w-full transform -rotate-90">
                      <circle cx="50%" cy="50%" r="40%" fill="transparent" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
                      <circle cx="50%" cy="50%" r="40%" fill="transparent" stroke="hsl(var(--primary))" strokeWidth="8" strokeDasharray="251.2" strokeDashoffset={251.2 - (251.2 * Math.min(1, dailyActions / dailyGoal))} strokeLinecap="round" style={{ filter: 'drop-shadow(0 0 8px #7c3aff)' }} />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      {dailyActions >= dailyGoal ? <Flame className="h-8 w-8 text-green-500" /> : <Target className="h-8 w-8 text-primary/40" />}
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* JORNADA DE 7 DIAS (RESTAURADA) */}
            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h2 className="text-3xl font-black italic uppercase tracking-tighter text-white">Sua Jornada de Escala</h2>
                  <p className="text-muted-foreground text-[10px] font-black uppercase tracking-[0.2em]">O método exato para sua primeira venda em 7 dias</p>
                </div>
                <Badge className="bg-primary/10 text-primary border-primary/30 text-[10px] font-black uppercase px-4 py-1">
                  DIA {currentJourneyDay} ATIVO
                </Badge>
              </div>

              <div className="grid gap-4">
                {missions.map((m) => {
                  const isCompleted = completedMissionIds.includes(m.id);
                  const isLocked = !isSpecialUser && m.order > currentJourneyDay && !isCompleted;
                  const isCurrent = !isCompleted && !isLocked && (isSpecialUser || m.order === currentJourneyDay);

                  return (
                    <Link 
                      key={m.id} 
                      href={isLocked ? '#' : `/missions/${m.id}`}
                      className={`block group transition-all ${isLocked ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
                    >
                      <Card className={`glass-card border-white/5 rounded-3xl overflow-hidden transition-all duration-500 ${isCurrent ? 'border-primary/40 bg-primary/5 shadow-lg shadow-primary/5' : ''} ${isCompleted ? 'border-green-500/20' : ''}`}>
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between gap-6">
                            <div className="flex items-center gap-6">
                              <div className={`h-14 w-14 rounded-2xl flex items-center justify-center text-xl font-black italic shrink-0 transition-all ${isCompleted ? 'bg-green-500/20 text-green-500' : isCurrent ? 'bg-primary text-white shadow-lg shadow-primary/30 rotate-3' : 'bg-white/5 text-muted-foreground'}`}>
                                {isCompleted ? <CheckCircle2 className="h-7 w-7" /> : m.order}
                              </div>
                              <div className="space-y-1">
                                <h4 className={`font-black uppercase italic tracking-tight text-lg ${isLocked ? 'text-muted-foreground' : 'text-white'}`}>{m.title}</h4>
                                <p className="text-xs text-muted-foreground font-medium">{m.desc}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-4">
                              {isLocked ? (
                                <div className="flex flex-col items-end">
                                  <Lock className="h-5 w-5 text-muted-foreground/30" />
                                  <span className="text-[8px] font-black uppercase text-muted-foreground/40 mt-1">Aguarde o Tempo Neural</span>
                                </div>
                              ) : isCompleted ? (
                                <Badge className="bg-green-500/10 text-green-500 border-green-500/20 text-[8px] font-black uppercase">CONCLUÍDO</Badge>
                              ) : (
                                <Button size="sm" className="bg-primary hover:bg-primary/90 text-white rounded-xl text-[9px] font-black uppercase px-4 h-9 shadow-lg group-hover:scale-105 transition-all">
                                  {isCurrent ? 'INICIAR AGORA' : 'EXECUTAR'} <Play className="ml-2 h-3 w-3 fill-white" />
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

        <style dangerouslySetInnerHTML={{ __html: `
          [data-sidebar="sidebar"] { width: 250px !important; overflow: hidden !important; }
          [data-sidebar="menu-button"] span { white-space: nowrap !important; }
          [data-sidebar="sidebar"]::before { content: ""; position: absolute; inset: 0; background-image: linear-gradient(to right, rgba(124, 58, 255, 0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(124, 58, 255, 0.03) 1px, transparent 1px); background-size: 40px 40px; pointer-events: none; }
          [data-sidebar="menu-button"]:hover { background: rgba(124, 58, 255, 0.08) !important; border-left: 2px solid #7c3aff !important; }
          [data-sidebar="menu-button"][data-active="true"] { border-left: 2px solid #7c3aff !important; box-shadow: inset 4px 0 12px -2px rgba(124, 58, 255, 0.2) !important; }
          .animate-gradient-text { background: linear-gradient(90deg, #fff, #a855f7, #22d3ee, #fff) !important; background-size: 300% auto !important; -webkit-background-clip: text !important; -webkit-text-fill-color: transparent !important; animation: gradMove 4s linear infinite !important; }
          @keyframes gradMove { 0% { background-position: 0% center; } 100% { background-position: 100% center; } }
          .status-badge { animation: pulse-green 2s ease-in-out infinite !important; }
          @keyframes pulse-green { 0%, 100% { box-shadow: 0 0 6px rgba(16, 185, 129, 0.3); } 50% { box-shadow: 0 0 16px rgba(16, 185, 129, 0.7); } }
          .metric-card:hover { transform: translateY(-2px) !important; box-shadow: 0 8px 32px rgba(124, 58, 255, 0.2) !important; border-top: 1px solid rgba(124, 58, 255, 0.3) !important; transition: 0.25s ease !important; }
          .bg-green-500.absolute { animation: pulse-dot 2s infinite !important; }
          @keyframes pulse-dot { 0%, 100% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.6); } 50% { box-shadow: 0 0 0 6px rgba(16, 185, 129, 0); } }
          .dashboard-root::after { content: ""; position: fixed; inset: -5%; z-index: 0; pointer-events: none; background: radial-gradient(ellipse 50% 40% at 15% 10%, rgba(124, 58, 255, 0.07) 0%, transparent 60%), radial-gradient(ellipse 40% 35% at 85% 90%, rgba(34, 211, 238, 0.04) 0%, transparent 55%); animation: orbMove 12s ease-in-out infinite alternate; }
          @keyframes orbMove { 0% { background-position: 0% 0%, 100% 100%; opacity: 0.8; } 50% { background-position: 8% 12%, 92% 88%; opacity: 1; } 100% { background-position: 15% 5%, 85% 95%; opacity: 0.9; } }
        ` }} />
      </div>
    </SidebarProvider>
  );
}
