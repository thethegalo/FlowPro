
"use client";

import { useMemo, useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  AreaChart, 
  Area, 
  ResponsiveContainer, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip 
} from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  CheckCircle2, 
  Lock,
  Loader2,
  DollarSign,
  Search,
  Zap,
  Activity,
  ArrowRight,
  Plus,
  Globe,
  GraduationCap,
  MessageSquare,
  ChevronRight,
  LayoutDashboard,
  TrendingUp,
  Menu,
  Pencil,
  Check,
  X,
  ShieldAlert,
  Clock,
  Sparkles,
  Terminal,
  GitBranch,
  Target,
  Wrench,
  Cpu
} from 'lucide-react';
import { useUser, useFirestore, useMemoFirebase, useDoc, useCollection } from '@/firebase';
import { collection, query, orderBy, doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from '@/components/AppSidebar';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

const LOGO_URL = "https://s3.typebot.io/public/workspaces/cmml2oniw000g04l7gwmqelu1/typebots/cmn1vyjog000104la10d6sdzu/blocks/ywpf1hja4q4bxg9gzqobiz93?v=1774307470623";

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

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#0f0f1a] border border-[#8b5cf6]/25 p-[10px_14px] rounded-[8px] shadow-xl">
        <p className="text-[10px] font-medium uppercase text-white/20 mb-1">{payload[0].payload.date}</p>
        <p className="text-[12px] font-bold text-white">
          R$ {payload[0].value.toLocaleString('pt-BR')}
        </p>
      </div>
    );
  }
  return null;
};

export default function Dashboard() {
  const { user, isUserLoading } = useUser();
  const db = useFirestore();
  const router = useRouter();
  const { success, error } = useToast();
  const [isEditingName, setIsEditingName] = useState(false);
  const [editNameValue, setEditNameValue] = useState('');
  const [timeRange, setTimeRange] = useState<'today' | '7days' | 'month' | 'max'>('month');
  
  const [sessionEarnings, setSessionEarnings] = useState(0);
  
  const userDocRef = useMemoFirebase(() => {
    if (!db || !user) return null;
    return doc(db, 'users', user.uid);
  }, [db, user]);
  const { data: userData, isLoading: isUserDocLoading } = useDoc(userDocRef);

  const isAdmin = useMemo(() => user?.email === "thethegalo@gmail.com", [user]);

  useEffect(() => {
    const handleNewSale = (e: any) => {
      if (e.detail?.value) {
        setSessionEarnings(prev => prev + e.detail.value);
      }
    };
    window.addEventListener('flow-new-sale', handleNewSale);
    return () => window.removeEventListener('flow-new-sale', handleNewSale);
  }, []);

  const isPending = useMemo(() => userData?.status === 'pending' && !isAdmin, [userData, isAdmin]);

  const displayName = useMemo(() => {
    if (isAdmin) return 'Lucas';
    if (userData?.name) return userData.name;
    if (user?.displayName) return user.displayName;
    if (user?.email) return user.email.split('@')[0];
    return 'Usuário';
  }, [userData?.name, user?.displayName, user?.email, isAdmin]);

  const totalEarnings = useMemo(() => {
    if (isAdmin) return 216430 + sessionEarnings;
    if (userData?.simulatedStats?.total !== undefined) {
      return userData.simulatedStats.total + sessionEarnings;
    }
    return (userData?.totalEarnings || 0) + sessionEarnings;
  }, [userData, isAdmin, sessionEarnings]);

  const fullChartData = useMemo(() => {
    let baseData = [];
    if (userData?.simulatedStats?.chart) {
      baseData = userData.simulatedStats.chart.map((p: any) => ({
        date: new Date(p.date).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' }),
        ganhos: p.amount
      }));
    } else {
      baseData = Array.from({ length: 30 }).map((_, i) => ({
        date: `${i + 1}/03`,
        ganhos: Math.floor(Math.random() * 400) + 700 
      }));
    }

    if (baseData.length > 0 && sessionEarnings > 0) {
      const lastIdx = baseData.length - 1;
      baseData[lastIdx] = {
        ...baseData[lastIdx],
        ganhos: baseData[lastIdx].ganhos + sessionEarnings
      };
    }
    
    return baseData;
  }, [userData?.simulatedStats, sessionEarnings]);

  const filteredChartData = useMemo(() => {
    if (timeRange === 'today') return fullChartData.slice(-1);
    if (timeRange === '7days') return fullChartData.slice(-7);
    if (timeRange === 'month') return fullChartData.slice(-30);
    return fullChartData;
  }, [fullChartData, timeRange]);

  const periodTotal = useMemo(() => {
    if (timeRange === 'max') return totalEarnings;
    return filteredChartData.reduce((acc, curr) => acc + curr.ganhos, 0);
  }, [filteredChartData, timeRange, totalEarnings]);

  const currentJourneyDay = useMemo(() => {
    if (!userData?.createdAt) return 1;
    if (isAdmin) return 7;
    const created = userData.createdAt.toDate ? userData.createdAt.toDate() : new Date(userData.createdAt);
    const diffInMs = Date.now() - created.getTime();
    return Math.max(1, Math.floor(diffInMs / (1000 * 60 * 60 * 24)) + 1);
  }, [userData?.createdAt, isAdmin]);

  const missions = [
    { id: 'dia1', title: 'DIA 1: Criar Oferta', desc: 'Defina o que vender e seu primeiro script.', order: 1 },
    { id: 'dia2', title: 'DIA 2: Ajustar Perfil', desc: 'Prepare suas redes para converter visitas.', order: 2 },
    { id: 'dia3', title: 'DIA 3: Encontrar Leads', desc: 'Identifique clientes com o Radar.', order: 3 },
    { id: 'dia4', title: 'DIA 4: Abordagem IA', desc: 'Inicie conversas estratégicas com IA.', order: 4 },
    { id: 'dia5', title: 'DIA 5: Conversar & Nutrir', desc: 'Gerencie respostas e mostre o valor.', order: 5 },
    { id: 'dia6', title: 'DIA 6: Fechar Venda', desc: 'Transforme conversas em dinheiro.', order: 6 },
    { id: 'dia7', title: 'DIA 7: Escalar Flow', desc: 'Sua estrutura está pronta. Repita.', order: 7 },
  ];

  const ecosystemModules = [
    { 
      title: 'Captar lead', 
      desc: 'Escaneie o mercado e encontre alvos lucrativos em segundos.', 
      icon: Search, 
      url: '/leads',
      color: 'from-blue-600/20 to-blue-400/10',
      iconColor: 'text-blue-400',
      badge: 'Scanner Live'
    },
    { 
      title: 'Abordagem', 
      desc: 'Scripts de WhatsApp otimizados pelo motor neural v2.', 
      icon: MessageSquare, 
      url: '/abordagens',
      color: 'from-purple-600/20 to-purple-400/10',
      iconColor: 'text-purple-400',
      badge: 'Neural'
    },
    { 
      title: 'Gerador de Prompts', 
      desc: 'Comandos mestres para criar sites e apps em minutos.', 
      icon: Terminal, 
      url: '/prompts',
      color: 'from-amber-600/20 to-amber-400/10',
      iconColor: 'text-amber-400',
      badge: 'App Builder'
    },
    { 
      title: 'Ferramentas', 
      desc: 'Arsenal tático completo para acelerar seu faturamento.', 
      icon: Wrench, 
      url: '/tools',
      color: 'from-emerald-600/20 to-emerald-400/10',
      iconColor: 'text-emerald-400',
      badge: 'VIP Tools'
    },
  ];

  const progressQuery = useMemoFirebase(() => {
    if (!db || !user) return null;
    return query(collection(db, 'users', user.uid, 'missionProgress'), orderBy('completedAt', 'asc'));
  }, [db, user]);
  const { data: progressData } = useCollection(progressQuery);

  const completedMissionIds = useMemo(() => {
    return progressData ? progressData.filter(p => p.isCompleted).map(p => p.missionId) : [];
  }, [progressData]);

  const startEditing = () => {
    setEditNameValue(displayName);
    setIsEditingName(true);
  };

  const cancelEditing = () => {
    setIsEditingName(false);
  };

  const saveName = async () => {
    if (!db || !user || !editNameValue.trim()) return;
    try {
      await updateDoc(doc(db, 'users', user.uid), {
        name: editNameValue.trim(),
        updatedAt: serverTimestamp()
      });
      setIsEditingName(false);
      success("Perfil Atualizado", "Seu nome de operador foi sincronizado.");
    } catch (e) {
      error("Erro na Sincronização", "Não foi possível salvar seu novo nome.");
    }
  };

  useEffect(() => {
    if (!isUserLoading && !user) router.push('/auth');
  }, [user, isUserLoading, router]);

  if (isUserLoading || isUserDocLoading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;

  if (isPending) {
    return (
      <SidebarProvider>
        <div className="flex min-h-screen w-full relative bg-[#05050f]">
          <AppSidebar />
          <main className="flex-1 flex flex-col items-center justify-center p-6 text-center">
            <div className="max-w-md w-full space-y-8 animate-in fade-in zoom-in duration-500">
              <div className="h-24 w-24 bg-amber-500/10 border border-amber-500/30 rounded-full flex items-center justify-center mx-auto shadow-[0_0_40px_rgba(245,158,11,0.15)]">
                <ShieldAlert className="h-10 w-10 text-amber-500" />
              </div>
              <div className="space-y-3">
                <h1 className="text-3xl font-black italic uppercase tracking-tighter text-white">ACESSO EM AUDITORIA</h1>
                <p className="text-muted-foreground text-sm font-medium leading-relaxed">
                  Sua conta foi criada com sucesso, mas o acesso às ferramentas de elite do FlowPro requer liberação manual do administrador.
                </p>
              </div>
              <Card className="glass-card p-6 border-amber-500/20 bg-amber-500/5">
                <div className="flex items-center gap-4 text-left">
                  <div className="h-10 w-10 rounded-xl bg-amber-500/20 flex items-center justify-center shrink-0">
                    <Clock className="h-5 w-5 text-amber-500" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase text-amber-500 tracking-widest">Protocolo de Segurança</p>
                    <p className="text-[12px] text-white/70 font-medium">Análise em andamento. Geralmente liberado em até 24h úteis.</p>
                  </div>
                </div>
              </Card>
              <div className="pt-4">
                <p className="text-[9px] font-black uppercase tracking-[0.4em] text-white/20">Aguardando liberação mestre</p>
              </div>
              <Button onClick={() => router.push('/')} variant="outline" className="h-12 rounded-xl border-white/10 text-[10px] font-black uppercase tracking-widest hover:bg-white/5">
                Voltar para Home
              </Button>
            </div>
          </main>
        </div>
      </SidebarProvider>
    );
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full relative bg-transparent">
        <AppSidebar />
        
        <main className="flex-1 flex flex-col min-w-0 bg-transparent">
          <header className="h-[52px] border-b border-white/5 flex items-center justify-between px-6 bg-transparent sticky top-0 z-50">
            <div className="flex items-center gap-3">
              <SidebarTrigger className="md:hidden">
                <Menu className="h-5 w-5 text-white/50" />
              </SidebarTrigger>
              <LayoutDashboard className="h-[14px] w-[14px] text-primary/70" />
              <h1 className="text-[13px] font-medium text-white/50">Dashboard</h1>
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden md:block bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold px-3 py-1 rounded-full uppercase">
                {userData?.plan?.toUpperCase() || 'BUSCANDO...'}
              </div>
              <div className="bg-[#581c87]/40 border border-[#7c3aed]/30 text-[#c4b5fd] text-[11px] font-medium rounded-[6px] px-[10px] py-[4px] uppercase tracking-[0.5px]">
                VITALÍCIO
              </div>
            </div>
          </header>

          <div className="flex-1 p-6 md:p-8 space-y-10 max-w-7xl mx-auto w-full">
            <div className="space-y-1">
              {isEditingName ? (
                <div className="flex items-center gap-2 animate-in fade-in slide-in-from-left-2 duration-300">
                  <input
                    type="text"
                    value={editNameValue}
                    onChange={(e) => setEditNameValue(e.target.value)}
                    className="bg-white/5 border border-white/10 rounded-lg px-3 py-1 text-xl md:text-2xl font-semibold text-white focus:outline-none focus:ring-1 focus:ring-primary w-full max-w-[240px]"
                    autoFocus
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') saveName();
                      if (e.key === 'Escape') cancelEditing();
                    }}
                  />
                  <button onClick={saveName} className="p-2 bg-green-500/10 text-green-500 rounded-lg hover:bg-green-500/20 transition-all">
                    <Check className="h-4 w-4" />
                  </button>
                  <button onClick={cancelEditing} className="p-2 bg-white/5 text-white/30 rounded-lg hover:bg-white/10 transition-all">
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-3 group">
                  <h1 className="text-xl md:text-2xl font-semibold text-white tracking-tight flex items-center gap-2">
                    Olá, {displayName} 👋
                  </h1>
                  <button 
                    onClick={startEditing}
                    className="opacity-0 group-hover:opacity-100 transition-all p-1.5 text-white/20 hover:text-primary hover:bg-primary/10 rounded-md"
                    title="Editar nome"
                  >
                    < Pencil className="h-3.5 w-3.5" />
                  </button>
                </div>
              )}
              <p className="text-xs md:text-sm text-white/30 font-medium">
                Seja bem-vindo ao seu centro de comando tático de elite.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
              {[
                { label: "Placar de Caixa", val: totalEarnings, prefix: "R$ ", icon: DollarSign, badge: "+12% hoje", sub: `Alvo R$ ${isAdmin ? '500.000' : '5.000'}` },
                { label: "Execução Diária", val: userData?.dailyActions || 0, suffix: " / 10", icon: Activity, badge: "Alta Performance", sub: "Ritmo constante" },
                { label: "Status Jornada", val: currentJourneyDay, prefix: "Dia ", icon: TrendingUp, badge: "Ativo", sub: `${completedMissionIds.length} concluídas` },
              ].map((m, i) => (
                <Card key={m.label} className="glass-card p-6 flex flex-col justify-between hover:border-primary/20 transition-all group overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="flex justify-between items-start mb-4 relative z-10">
                    <div>
                      <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest mb-1">{m.label}</p>
                      <h3 className="text-2xl md:text-3xl font-black italic text-white leading-none">
                        {typeof m.val === 'number' ? <AnimatedNumber value={m.val} prefix={m.prefix} suffix={m.suffix} /> : m.val}
                      </h3>
                    </div>
                    <m.icon className="h-5 w-5 text-primary/40 group-hover:text-primary/70 transition-colors" />
                  </div>
                  <div className="flex items-center gap-2 relative z-10">
                    <Badge className="bg-green-500/10 border-green-500/20 text-green-400 text-[9px] font-bold uppercase py-0 px-2 rounded-full">
                      {m.badge}
                    </Badge>
                    <span className="text-[10px] text-white/20 uppercase font-medium">{m.sub}</span>
                  </div>
                </Card>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <Card className="lg:col-span-8 glass-card p-8 min-h-[300px] flex flex-col relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[100px] rounded-full -mr-32 -mt-32 pointer-events-none" />
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 relative z-10">
                  <div>
                    <h3 className="text-[11px] font-black uppercase tracking-widest text-white/30 flex items-center gap-2">
                      <TrendingUp className="h-3 w-3 text-primary" /> Ganhos Temporais
                    </h3>
                    <div className="flex flex-wrap items-center gap-2 mt-4">
                      <button 
                        onClick={() => setTimeRange('today')}
                        className={cn("px-4 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest border transition-all", timeRange === 'today' ? "bg-primary border-primary text-white shadow-lg shadow-primary/20" : "border-white/5 bg-white/5 text-white/30 hover:text-white/60")}
                      >
                        Hoje
                      </button>
                      <button 
                        onClick={() => setTimeRange('7days')}
                        className={cn("px-4 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest border transition-all", timeRange === '7days' ? "bg-primary border-primary text-white shadow-lg shadow-primary/20" : "border-white/5 bg-white/5 text-white/30 hover:text-white/60")}
                      >
                        7 Dias
                      </button>
                      <button 
                        onClick={() => setTimeRange('month')}
                        className={cn("px-4 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest border transition-all", timeRange === 'month' ? "bg-primary border-primary text-white shadow-lg shadow-primary/20" : "border-white/5 bg-white/5 text-white/30 hover:text-white/60")}
                      >
                        Este Mês
                      </button>
                      <button 
                        onClick={() => setTimeRange('max')}
                        className={cn("px-4 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest border transition-all", timeRange === 'max' ? "bg-primary border-primary text-white shadow-lg shadow-primary/20" : "border-white/5 bg-white/5 text-white/30 hover:text-white/60")}
                      >
                        Máximo
                      </button>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-black text-primary uppercase tracking-widest">Total Período</p>
                    <div className="text-2xl md:text-3xl font-black text-white italic tracking-tighter mt-1">
                      R$ {periodTotal.toLocaleString('pt-BR')}
                    </div>
                  </div>
                </div>

                <div className="flex-1 w-full min-h-[220px] relative z-10">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={filteredChartData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorGanhos" x1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#8b5cf6" stopOpacity="0.3"/>
                          <stop offset="95%" stopColor="#8b5cf6" stopOpacity="0"/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid vertical={false} stroke="rgba(255,255,255,0.03)" strokeDasharray="3 3" />
                      <XAxis dataKey="date" hide />
                      <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: 'rgba(255,255,255,0.2)', fontWeight: 'bold' }} tickFormatter={(v) => `R$${v}`} />
                      <Tooltip content={<CustomTooltip />} />
                      <Area 
                        type="monotone" 
                        dataKey="ganhos" 
                        stroke="#8b5cf6" 
                        strokeWidth={3} 
                        fill="url(#colorGanhos)" 
                        isAnimationActive={true}
                        animationDuration={1500}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </Card>

              <div className="lg:col-span-4 flex flex-col gap-6">
                <Card className="glass-card p-8 border-white/5 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20 mb-6 relative z-10">Comandos Rápidos</p>
                  <div className="space-y-4 relative z-10">
                    <Button 
                      className="w-full h-14 bg-primary hover:bg-primary/90 text-white rounded-2xl font-black uppercase tracking-widest text-[11px] gap-3 shadow-xl shadow-primary/20 transition-all active:scale-[0.97]"
                      onClick={() => router.push('/leads')}
                    >
                      <Plus className="h-4 w-4" /> Nova prospecção
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full h-14 bg-white/5 border-white/10 hover:bg-white/10 text-white rounded-2xl font-black uppercase tracking-widest text-[11px] transition-all"
                      onClick={() => router.push('/prompts')}
                    >
                      <Cpu className="h-4 w-4 mr-2 opacity-40" /> Criar Site IA
                    </Button>
                  </div>
                </Card>

                <Card className="glass-card flex-1 p-8 relative overflow-hidden group">
                  <div className="relative z-10 space-y-5">
                    <Badge className="bg-primary/20 text-primary border-none text-[9px] font-black uppercase px-3 py-1 rounded-full tracking-widest">
                      🎓 CONTEÚDO VIP
                    </Badge>
                    <div className="space-y-2">
                      <h4 className="text-xl font-black italic uppercase tracking-tighter text-white leading-tight">Masterclass: Escala Infinitos</h4>
                      <p className="text-xs text-white/40 font-medium leading-relaxed italic">
                        O método exato para faturar R$ 50k mensais com o arsenal FlowPro.
                      </p>
                    </div>
                    <Button 
                      asChild
                      className="w-full mt-2 h-12 bg-white text-black hover:bg-primary hover:text-white transition-all rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg"
                    >
                      <Link href="/masterclass">Acessar Treinamento <ArrowRight className="ml-2 h-3.5 w-3.5" /></Link>
                    </Button>
                  </div>
                  <div className="absolute -bottom-6 -right-6 opacity-[0.03] group-hover:opacity-[0.08] transition-all group-hover:scale-110 duration-700 pointer-events-none">
                    <GraduationCap className="h-40 w-40 text-white" />
                  </div>
                </Card>
              </div>
            </div>

            <div className="space-y-8">
              <div className="flex items-center justify-between px-2">
                <div className="space-y-1.5">
                  <h2 className="text-xl font-black italic uppercase tracking-tighter text-white">Ecossistema <span className="text-primary italic">Premium</span></h2>
                  <p className="text-white/20 text-[10px] uppercase font-bold tracking-[0.2em]">Sua estação de comando neural ativada</p>
                </div>
                <div className="hidden md:flex bg-green-500/10 border border-green-500/20 text-green-400 text-[10px] font-black uppercase px-4 py-1.5 rounded-full items-center gap-2 shadow-[0_0_15px_rgba(34,197,94,0.1)]">
                  <div className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" /> Full access ativo
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {ecosystemModules.map((module, i) => (
                  <Link key={module.title} href={module.url} prefetch={false} className="group">
                    <motion.div
                      whileHover={{ y: -5 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                    >
                      <Card className="glass-card p-6 border-white/5 bg-white/[0.02] hover:border-primary/40 transition-all duration-500 relative overflow-hidden flex flex-col h-[220px] justify-between shadow-xl">
                        <div className={`absolute inset-0 bg-gradient-to-br ${module.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                        <div className="absolute top-0 right-0 p-4 opacity-[0.02] group-hover:opacity-[0.08] transition-opacity duration-500">
                           <module.icon className="h-20 w-20 text-white" />
                        </div>
                        
                        <div className="space-y-6 relative z-10">
                          <div className="flex justify-between items-start">
                            <div className={cn("h-11 w-11 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 shadow-inner group-hover:border-white/20 transition-all", module.iconColor)}>
                              <module.icon className="h-5 w-5" />
                            </div>
                            <Badge variant="outline" className="text-[8px] font-black uppercase border-white/10 text-white/40 group-hover:text-white/90 group-hover:border-white/20 transition-colors">
                              {module.badge}
                            </Badge>
                          </div>
                          
                          <div className="space-y-1.5">
                            <h4 className="text-sm font-black uppercase italic text-white/90 tracking-tight flex items-center gap-2 group-hover:text-white">
                              {module.title}
                            </h4>
                            <p className="text-[11px] text-white/40 leading-relaxed font-medium group-hover:text-white/70 transition-colors">
                              {module.desc}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t border-white/5 relative z-10 group-hover:border-white/10 transition-colors">
                          <span className="text-[9px] font-black uppercase text-white/20 tracking-widest group-hover:text-white/60">Acessar</span>
                          <ChevronRight className="h-3.5 w-3.5 text-white/10 group-hover:text-primary transition-all group-hover:translate-x-1" />
                        </div>
                      </Card>
                    </motion.div>
                  </Link>
                ))}
              </div>
            </div>

            <div className="space-y-8 pb-32">
              <div className="flex items-center justify-between px-2">
                <div className="space-y-1.5">
                  <h2 className="text-xl font-black italic uppercase tracking-tighter text-white">Jornada de <span className="text-primary italic">Escala</span></h2>
                  <p className="text-white/20 text-[10px] uppercase font-bold tracking-[0.2em]">Sua primeira venda em tempo recorde</p>
                </div>
                <Badge className="bg-primary/10 border-primary/20 text-primary text-[10px] font-black uppercase rounded-full px-4 py-1.5 shadow-[0_0_15px_rgba(124,58,237,0.1)]">
                  DIA {currentJourneyDay} ATIVO
                </Badge>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-4 pb-4">
                {missions.map((m) => {
                  const isCompleted = completedMissionIds.includes(m.id);
                  const isLocked = !isAdmin && m.order > currentJourneyDay && !isCompleted;
                  const isCurrent = !isCompleted && !isLocked && (isAdmin || m.order === currentJourneyDay);

                  return (
                    <Link 
                      key={m.id} 
                      href={isLocked ? '#' : `/missions/${m.id}`}
                      prefetch={false}
                      className={cn(
                        "block",
                        isLocked ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
                      )}
                    >
                      <Card className={cn(
                        "glass-card p-5 h-full flex flex-col justify-between transition-all group relative overflow-hidden",
                        isCurrent && "border-primary/50 bg-primary/10 shadow-[0_0_30px_rgba(139,92,246,0.15)] ring-1 ring-primary/20"
                      )}>
                        {isCurrent && <div className="absolute top-0 right-0 p-2"><Sparkles className="h-3 w-3 text-primary animate-pulse" /></div>}
                        <div className="space-y-4 relative z-10">
                          <div className="flex justify-between items-start">
                            <div className={cn(
                              "h-9 w-9 rounded-xl border flex items-center justify-center text-xs font-black italic shadow-inner transition-all",
                              isCompleted ? "bg-green-500/10 border-green-500/20 text-green-400" : 
                              isCurrent ? "bg-primary border-primary text-white" : 
                              "bg-white/5 border-white/10 text-white/20"
                            )}>
                              {isCompleted ? <CheckCircle2 className="h-5 w-5" /> : m.order}
                            </div>
                            {isLocked && <Lock className="h-3.5 w-3.5 text-white/10" />}
                          </div>
                          
                          <div className="space-y-1.5">
                            <h4 className={cn("text-[10px] font-black uppercase tracking-tight", isCompleted ? 'text-white/40' : 'text-white/90')}>
                              {m.title}
                            </h4>
                            <p className="text-[9px] text-white/30 leading-relaxed font-bold uppercase italic group-hover:text-white/50 transition-colors">
                              {m.desc}
                            </p>
                          </div>
                        </div>

                        <div className="pt-6 relative z-10">
                          <div className={cn(
                            "w-full h-10 rounded-xl text-[9px] font-black uppercase tracking-widest flex items-center justify-center transition-all shadow-md",
                            isCompleted ? 'border border-white/10 bg-white/5 text-white/30 hover:bg-white/10 hover:text-white/50' : 
                            isCurrent ? "bg-primary text-white hover:bg-primary/90 hover:scale-105 active:scale-95" : 
                            "bg-white/5 text-white/20"
                          )}>
                            {isCompleted ? 'revisar' : isLocked ? 'bloqueado' : 'iniciar'}
                          </div>
                        </div>
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

