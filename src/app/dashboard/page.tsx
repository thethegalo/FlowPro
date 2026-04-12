
"use client";

import { useMemo, useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  CheckCircle2, 
  Lock,
  Loader2,
  DollarSign,
  Search,
  Trophy,
  Sparkles,
  Zap,
  Play,
  Bell,
  TrendingUp,
  Activity,
  ArrowRight,
  Plus,
  Globe,
  FileText,
  GraduationCap,
  Users,
  MessageSquare,
  Layout
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

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#1a1a2e] border border-[#a855f7]/30 p-3 rounded-lg shadow-2xl backdrop-blur-md">
        <p className="text-[10px] font-black uppercase text-white/40 mb-1">{payload[0].payload.date}</p>
        <p className="text-sm font-bold text-[#a855f7]">
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

  const totalEarnings = useMemo(() => {
    if (userData?.simulatedStats?.total !== undefined) return userData.simulatedStats.total;
    const raw = userData?.totalEarnings || 0;
    if (isSpecialUser) return 21564 + raw;
    if (isGrayUser) return 17594 + raw;
    return raw;
  }, [userData?.totalEarnings, userData?.simulatedStats, isSpecialUser, isGrayUser]);

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
    
    const lucasValues = [5874,420,380,650,290,810,0,1200,340,290,480,0,920,670,410,380,0,1100,590,430,280,0,1340,480,670,0,1200,890,430,0,630];
    const grayValues = [0,600,0,800,1200,0,1500,0,700,900,0,1900,0,800,600,0,1700,0,1000,0,2000,0,700,1300,0,1600,0,294,0,0,0];

    for (let i = days; i >= 0; i--) {
      const d = new Date();
      d.setDate(now.getDate() - i);
      const dayStr = d.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
      let dailyValue = 0;
      if (isSpecialUser) dailyValue = lucasValues[30 - i] || 0;
      else if (isGrayUser) dailyValue = grayValues[30 - i] || 0;
      
      data.push({ date: dayStr, ganhos: dailyValue });
    }
    return data;
  }, [isSpecialUser, isGrayUser, userData?.simulatedStats]);

  const currentJourneyDay = useMemo(() => {
    if (!userData?.createdAt) return 1;
    if (isSpecialUser || isGrayUser) return 7;
    const created = userData.createdAt.toDate ? userData.createdAt.toDate() : new Date(userData.createdAt);
    const diffInMs = Date.now() - created.getTime();
    return Math.floor(diffInMs / (1000 * 60 * 60 * 24)) + 1;
  }, [userData?.createdAt, isSpecialUser, isGrayUser]);

  const missions = [
    { id: 'dia1', title: 'DIA 1: Criar Oferta', desc: 'Defina o que vender e seu primeiro script.', order: 1 },
    { id: 'dia2', title: 'DIA 2: Ajustar Perfil', desc: 'Prepare suas redes para converter visitas.', order: 2 },
    { id: 'dia3', title: 'DIA 3: Encontrar Leads', desc: 'Identifique clientes com o Radar.', order: 3 },
    { id: 'dia4', title: 'DIA 4: Abordagem IA', desc: 'Inicie conversas estratégicas com IA.', order: 4 },
  ];

  const ecosystemModules = [
    { 
      title: 'Captar Lead', 
      desc: 'Escaneie o mercado e encontre alvos de alta probabilidade em segundos.', 
      icon: Search, 
      color: 'rgba(124,58,237,0.2)', 
      iconColor: '#a78bfa',
      url: '/leads' 
    },
    { 
      title: 'CRM Leads', 
      desc: 'Gerencie seu funil de vendas e organize seus contatos por status.', 
      icon: Users, 
      color: 'rgba(59,130,246,0.15)', 
      iconColor: '#60a5fa',
      url: '#' 
    },
    { 
      title: 'Contratos', 
      desc: 'Gere contratos profissionais e feche parcerias com segurança jurídica.', 
      icon: FileText, 
      color: 'rgba(34,197,94,0.12)', 
      iconColor: '#4ade80',
      url: '#' 
    },
    { 
      title: 'Abordagem', 
      desc: 'Scripts de WhatsApp otimizados por IA para máxima taxa de resposta.', 
      icon: MessageSquare, 
      color: 'rgba(245,158,11,0.12)', 
      iconColor: '#fbbf24',
      url: '/abordagens' 
    },
    { 
      title: 'Criar Sites', 
      desc: 'Desenvolva Landing Pages de luxo sem precisar escrever uma linha de código.', 
      icon: Globe, 
      color: 'rgba(236,72,153,0.12)', 
      iconColor: '#f472b6',
      url: '/prompts' 
    },
    { 
      title: 'Blueprints', 
      desc: 'Comandos mestres para escalar sua operação com inteligência artificial.', 
      icon: Zap, 
      color: 'rgba(20,184,166,0.12)', 
      iconColor: '#2dd4bf',
      url: '/prompts' 
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

  useEffect(() => {
    if (!isUserLoading && !user) router.push('/auth');
  }, [user, isUserLoading, router]);

  if (isUserLoading || isUserDocLoading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full relative overflow-x-hidden">
        <AppSidebar />
        
        <main className="flex-1 flex flex-col min-w-0 relative z-10">
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
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30 group-focus-within:text-primary" />
                <Input 
                  placeholder="Pesquisar ferramentas..." 
                  className="h-10 bg-white/5 border-[#8b5cf6]/20 pl-10 text-xs rounded-lg focus-visible:ring-primary"
                />
              </div>

              <div className="flex items-center gap-4">
                <Badge className="h-9 px-4 bg-gradient-to-r from-[#7c3aed] to-[#9333ea] border-none text-[10px] font-black uppercase text-white shadow-[0_0_20px_rgba(124,58,237,0.3)]">
                  ⚡ VITALÍCIO
                </Badge>
                
                <button className="relative h-10 w-10 flex items-center justify-center rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                  <Bell className="h-5 w-5 text-white/60" />
                  <span className="absolute top-2.5 right-2.5 h-2 w-2 bg-red-500 rounded-full border-2 border-[#05050f]" />
                </button>
              </div>
            </div>
          </header>

          <div className="flex-1 p-8 space-y-8 max-w-7xl mx-auto w-full">
            
            {/* GRID DE MÉTRICAS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { label: "Placar de Caixa", val: totalEarnings, prefix: "R$ ", icon: DollarSign, badge: "+12% hoje", sub: `Alvo R$ ${isSpecialUser ? '50.000' : '5.000'}` },
                { label: "Execução Diária", val: userData?.dailyActions || 0, suffix: " / 10", icon: Activity, badge: "Alta Performance", sub: "Ritmo constante" },
                { label: "Status Jornada", val: currentJourneyDay, prefix: "Dia ", icon: TrendingUp, badge: "Ativo", sub: `${completedMissionIds.length} concluídas` },
              ].map((m, i) => (
                <div key={i} className="group relative">
                  <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#a855f7] to-transparent z-10" />
                  <Card className="bg-white/5 border border-[#8b5cf6]/15 rounded-2xl p-6 transition-all duration-300 hover:translate-y-[-2px] hover:border-[#a855f7]/35 relative overflow-hidden">
                    <div className="flex justify-between items-start mb-4">
                      <div className="space-y-1">
                        <p className="text-[11px] font-bold text-white/40 uppercase tracking-[0.8px]">{m.label}</p>
                        <h3 className="text-[28px] font-bold text-[#f0eeff] tracking-tight">
                          {typeof m.val === 'number' ? <AnimatedNumber value={m.val} prefix={m.prefix} suffix={m.suffix} /> : m.val}
                        </h3>
                      </div>
                      <div className="p-2 bg-white/5 rounded-lg opacity-30 group-hover:opacity-100 transition-opacity">
                        <m.icon className="h-5 w-5 text-primary" />
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-green-500/10 border-green-500/25 text-[#4ade80] text-[10px] font-bold px-2 py-0.5 rounded-md">
                        {m.badge}
                      </Badge>
                      <span className="text-[10px] text-white/20 font-medium uppercase tracking-widest">{m.sub}</span>
                    </div>
                  </Card>
                </div>
              ))}
            </div>

            {/* SEÇÃO CENTRAL (GRÁFICO + AÇÕES) */}
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6">
              
              {/* GRÁFICO (65%) */}
              <div className="relative group">
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#a855f7] to-transparent z-10" />
                <Card className="bg-white/5 border border-[#8b5cf6]/15 rounded-2xl p-8 h-full">
                  <div className="flex justify-between items-start mb-8">
                    <div className="space-y-1">
                      <h3 className="text-xl font-bold text-white italic uppercase tracking-tight">Ganhos dos Últimos 30 Dias</h3>
                      <p className="text-xs text-white/30 uppercase font-bold tracking-widest">Análise de fluxo financeiro neural</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-white/20 mb-1">Total Período</p>
                      <div className="text-2xl font-black italic tracking-tighter text-[#a855f7]">
                        R$ {totalEarnings.toLocaleString('pt-BR')}
                      </div>
                    </div>
                  </div>

                  <div className="h-[280px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <defs>
                          <linearGradient id="colorGanhos" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#a855f7" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#a855f7" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.04)" />
                        <XAxis 
                          dataKey="date" 
                          axisLine={false} 
                          tickLine={false}
                          tick={{ fontSize: 11, fill: 'rgba(255,255,255,0.3)', fontWeight: 'bold' }}
                          dy={10}
                        />
                        <YAxis 
                          axisLine={false} 
                          tickLine={false} 
                          tick={{ fontSize: 11, fill: 'rgba(255,255,255,0.3)', fontWeight: 'bold' }} 
                          tickFormatter={(v) => `R$${v}`} 
                        />
                        <Tooltip content={<CustomTooltip />} />
                        <Area 
                          type="monotone" 
                          dataKey="ganhos" 
                          stroke="#a855f7" 
                          strokeWidth={2.5} 
                          fill="url(#colorGanhos)" 
                          dot={false}
                          animationDuration={2000}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </Card>
              </div>

              {/* COLUNA DIREITA (35%) */}
              <div className="flex flex-col gap-6">
                
                {/* CARD 1: AÇÕES RÁPIDAS */}
                <Card className="bg-white/5 border border-[#8b5cf6]/15 rounded-2xl p-6 relative overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#a855f7] to-transparent z-10" />
                  <p className="text-[11px] font-black text-primary/40 uppercase tracking-[1.5px] mb-6 flex items-center gap-2">
                    <Zap className="h-3 w-3 fill-primary" /> AÇÕES RÁPIDAS
                  </p>
                  
                  <div className="space-y-3">
                    <Button 
                      className="w-full h-10 bg-gradient-to-r from-[#7c3aed] to-[#9333ea] hover:opacity-85 transition-all hover:scale-[0.99] rounded-[10px] font-bold uppercase text-[11px] tracking-widest gap-2 shadow-lg shadow-purple-500/20"
                      onClick={() => router.push('/leads')}
                    >
                      <Plus className="h-4 w-4" /> Nova Prospecção
                    </Button>
                    <div className="grid grid-cols-2 gap-3">
                      <Button 
                        variant="outline" 
                        className="h-10 bg-white/5 border-[#a855f7]/20 hover:bg-white/10 hover:scale-[0.99] transition-all rounded-[10px] text-[10px] font-bold uppercase tracking-tight gap-2"
                        onClick={() => router.push('/prompts')}
                      >
                        <Globe className="h-3.5 w-3.5 text-primary" /> Criar Site IA
                      </Button>
                      <Button 
                        variant="outline" 
                        className="h-10 bg-white/5 border-[#a855f7]/20 hover:bg-white/10 hover:scale-[0.99] transition-all rounded-[10px] text-[10px] font-bold uppercase tracking-tight gap-2"
                      >
                        <FileText className="h-3.5 w-3.5 text-primary" /> Gerar Contrato
                      </Button>
                    </div>
                  </div>
                </Card>

                {/* CARD 2: VIP */}
                <Card className="flex-1 rounded-2xl p-6 relative overflow-hidden border-[#a855f7]/30 shadow-xl" style={{ background: 'linear-gradient(135deg, rgba(88,28,135,0.5), rgba(49,10,107,0.6))' }}>
                  <div className="relative z-10 space-y-4">
                    <Badge className="bg-[#c4b5fd] text-[#4c1d95] text-[9px] font-black uppercase px-3 py-1 rounded-md border-none">
                      🎓 CONTEÚDO VIP
                    </Badge>
                    <div className="space-y-2">
                      <h4 className="text-lg font-bold text-white italic leading-tight uppercase">Masterclass: Escala de Leads Infinitos</h4>
                      <p className="text-xs text-white/50 font-medium leading-relaxed">
                        Aprenda o método que permitiu ao Lucas faturar R$ 50k em 30 dias usando automação neural.
                      </p>
                    </div>
                    <Button variant="outline" className="w-full mt-4 border-white text-white hover:bg-white hover:text-purple-900 transition-all rounded-xl text-[10px] font-black uppercase tracking-widest">
                      ACESSAR AGORA <ArrowRight className="ml-2 h-3 w-3" />
                    </Button>
                  </div>
                  <div className="absolute -bottom-4 -right-4 opacity-10">
                    <GraduationCap className="h-32 w-32 text-white" />
                  </div>
                </Card>

              </div>
            </div>

            {/* SEÇÃO: ECOSSISTEMA PREMIUM */}
            <div className="space-y-6 pt-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h2 className="text-[18px] font-bold text-white tracking-tight uppercase italic">Ecossistema Premium</h2>
                  <p className="text-white/30 text-[10px] font-black uppercase tracking-[0.2em]">O arsenal tático completo para sua operação digital</p>
                </div>
                <Badge className="bg-green-500/10 text-[#4ade80] border-green-500/25 text-[10px] font-black uppercase px-4 py-1.5 rounded-lg shadow-[0_0_15px_rgba(34,197,94,0.1)]">
                  FULL ACCESS ATIVO
                </Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {ecosystemModules.map((module, i) => (
                  <Link key={i} href={module.url}>
                    <Card className="group relative bg-white/[0.04] border border-[#8b5cf6]/12 rounded-2xl p-5 transition-all duration-300 hover:border-[#a855f7]/40 hover:bg-[#8b5cf6]/[0.08] hover:translate-y-[-3px] hover:shadow-[0_8px_30px_rgba(139,92,246,0.15)] overflow-hidden">
                      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#a855f7]/40 to-transparent z-10" />
                      <div className="flex flex-col gap-4">
                        <div className="flex justify-between items-start">
                          <div 
                            className="h-10 w-10 rounded-[10px] flex items-center justify-center transition-all group-hover:scale-110 shadow-lg"
                            style={{ backgroundColor: module.color }}
                          >
                            <module.icon className="h-5 w-5" style={{ color: module.iconColor }} />
                          </div>
                          <ArrowRight className="h-4 w-4 text-white/10 group-hover:text-[#a855f7] transition-all group-hover:translate-x-1" />
                        </div>
                        <div className="space-y-1.5">
                          <h4 className="text-[14px] font-bold text-[#e8e6f0] uppercase tracking-tight">{module.title}</h4>
                          <p className="text-[12px] text-white/45 font-medium leading-[1.5] line-clamp-2">
                            {module.desc}
                          </p>
                        </div>
                        <div className="pt-2">
                          <span className="text-[11px] font-black uppercase tracking-widest text-[#a855f7]/80 group-hover:text-[#a855f7] flex items-center gap-2 transition-colors">
                            INICIAR MÓDULO <ChevronRight className="h-3 w-3" />
                          </span>
                        </div>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>

            {/* JORNADA DE MISSÕES (SIMPLIFICADA) */}
            <div className="space-y-6 pt-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h2 className="text-2xl font-bold italic uppercase tracking-tighter text-white">Sua Jornada de Escala</h2>
                  <p className="text-white/30 text-[10px] font-black uppercase tracking-[0.2em]">O método exato para sua primeira venda em 7 dias</p>
                </div>
                <Badge className="bg-primary/10 text-primary border-primary/20 text-[10px] font-black uppercase px-4 py-1.5 rounded-lg">
                  DIA {currentJourneyDay} ATIVO
                </Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
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
                      <Card className={`bg-white/[0.03] border-white/5 rounded-2xl p-5 transition-all duration-500 ${isCurrent ? 'border-primary/40 bg-primary/5 shadow-lg' : ''} ${isCompleted ? 'border-green-500/20' : 'hover:border-white/10'}`}>
                        <div className="flex flex-col gap-4">
                          <div className="flex justify-between items-start">
                            <div className={`h-10 w-10 rounded-xl flex items-center justify-center text-sm font-black italic transition-all ${isCompleted ? 'bg-green-500/20 text-green-500' : isCurrent ? 'bg-primary text-white shadow-lg rotate-3' : 'bg-white/5 text-white/30'}`}>
                              {isCompleted ? <CheckCircle2 className="h-5 w-5" /> : m.order}
                            </div>
                            {isLocked ? <Lock className="h-4 w-4 text-white/20" /> : isCompleted && <Badge className="bg-green-500/10 text-green-500 border-none text-[8px] font-black uppercase">OK</Badge>}
                          </div>
                          <div className="space-y-1">
                            <h4 className={`font-bold uppercase italic tracking-tight text-xs ${isLocked ? 'text-white/20' : 'text-white'}`}>{m.title}</h4>
                            <p className="text-[10px] text-white/40 font-medium line-clamp-1">{m.desc}</p>
                          </div>
                          <Button size="sm" className={`w-full h-8 rounded-lg text-[9px] font-bold uppercase transition-all ${isCompleted ? 'bg-white/5 text-white/40' : 'bg-primary text-white'}`} disabled={isLocked}>
                            {isCompleted ? 'REVISAR' : 'INICIAR'}
                          </Button>
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

function ChevronRight(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  )
}
