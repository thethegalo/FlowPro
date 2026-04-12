"use client";

import { useMemo, useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
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
  ChevronRight
} from 'lucide-react';
import { useUser, useFirestore, useMemoFirebase, useDoc, useCollection } from '@/firebase';
import { collection, query, orderBy, doc } from 'firebase/firestore';
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from '@/components/AppSidebar';
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
import { cn } from '@/lib/utils';

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
      <div className="bg-[#0f0f1a] border border-[#8b5cf6]/25 p-[10px_14px] rounded-[8px] shadow-none outline-none">
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
    { title: 'Captar Lead', desc: 'Escaneie o mercado e encontre alvos em segundos.', icon: Search, url: '/leads' },
    { title: 'CRM Leads', desc: 'Gerencie seu funil de vendas e organize contatos.', icon: Users, url: '#' },
    { title: 'Contratos', desc: 'Gere contratos profissionais e feche parcerias.', icon: FileText, url: '#' },
    { title: 'Abordagem', desc: 'Scripts de WhatsApp otimizados por IA.', icon: MessageSquare, url: '/abordagens' },
    { title: 'Criar Sites', desc: 'Desenvolva Landing Pages sem código.', icon: Globe, url: '/prompts' },
    { title: 'Blueprints', desc: 'Comandos mestres para escalar sua operação.', icon: Zap, url: '/prompts' },
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

  if (isUserLoading || isUserDocLoading) return <div className="min-h-screen flex items-center justify-center bg-transparent"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full relative overflow-x-hidden bg-transparent">
        <AppSidebar />
        
        <main className="flex-1 flex flex-col min-w-0 relative z-0 bg-transparent">
          <header className="px-[32px] pt-[28px] pb-6 flex items-center justify-between sticky top-0 z-50 bg-transparent">
            <div className="space-y-0.5">
              <h1 className="text-[22px] font-semibold text-white tracking-[-0.3px] leading-tight">
                Olá, {displayName} 👋
              </h1>
              <p className="text-[13px] font-normal text-white/35">
                Seja bem-vindo ao seu centro de comando tático.
              </p>
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden md:flex relative group w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-[14px] w-[14px] text-white/30" />
                <Input 
                  placeholder="Pesquisar ferramentas..." 
                  className="h-[36px] bg-white/[0.04] border-white/[0.08] pl-9 text-[13px] rounded-[8px] focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-white/20 transition-all"
                />
              </div>

              <div className="flex items-center gap-3">
                <Badge className="bg-[#581c87]/40 border border-[#7c3aed]/35 text-[#c4b5fd] text-[11px] uppercase tracking-[0.5px] rounded-[6px] px-[10px] py-[4px] font-medium shadow-none hover:bg-[#581c87]/60">
                  VITALÍCIO
                </Badge>
                
                <button className="relative w-[34px] h-[34px] flex items-center justify-center rounded-[8px] bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.08] transition-colors">
                  <Bell className="h-4 w-4 text-white/60" />
                  <span className="absolute top-2 right-2 h-1.5 w-1.5 bg-red-500 rounded-full" />
                </button>
              </div>
            </div>
          </header>

          <div className="flex-1 p-[28px_32px] pt-2 space-y-7 max-w-7xl mx-auto w-full bg-transparent">
            
            {/* GRID DE MÉTRICAS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
              {[
                { label: "Placar de Caixa", val: totalEarnings, prefix: "R$ ", icon: DollarSign, badge: "+12% hoje", sub: `Alvo R$ ${isSpecialUser ? '50.000' : '5.000'}` },
                { label: "Execução Diária", val: userData?.dailyActions || 0, suffix: " / 10", icon: Activity, badge: "Alta Performance", sub: "Ritmo constante" },
                { label: "Status Jornada", val: currentJourneyDay, prefix: "Dia ", icon: TrendingUp, badge: "Ativo", sub: `${completedMissionIds.length} concluídas` },
              ].map((m, i) => (
                <div key={i} className="group relative">
                  <Card className="glass-card p-[20px_24px] hover:border-white/[0.2] hover:translate-y-[-1px] relative overflow-hidden transition-all duration-150">
                    <m.icon className="h-4 w-4 text-white/20 absolute top-5 right-6" />
                    <div className="space-y-4">
                      <div>
                        <p className="text-[11px] font-medium text-white/30 uppercase tracking-[0.8px] mb-1">{m.label}</p>
                        <h3 className="text-[28px] font-semibold text-[#f4f4f5] tracking-[-0.5px] leading-none">
                          {typeof m.val === 'number' ? <AnimatedNumber value={m.val} prefix={m.prefix} suffix={m.suffix} /> : m.val}
                        </h3>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className="bg-[#22c55e]/[0.08] border border-[#22c55e]/20 text-[#86efac] text-[10px] font-medium px-2 py-0.5 rounded-full shadow-none">
                          {m.badge}
                        </Badge>
                        <span className="text-[11px] text-white/25 font-normal">{m.sub}</span>
                      </div>
                    </div>
                  </Card>
                </div>
              ))}
            </div>

            {/* SEÇÃO CENTRAL (GRÁFICO + AÇÕES) */}
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-7 bg-transparent">
              
              {/* GRÁFICO (65%) */}
              <div className="lg:col-span-1">
                <Card className="glass-card p-6 h-full shadow-none overflow-hidden">
                  <div className="flex justify-between items-start mb-6">
                    <div className="space-y-1">
                      <h3 className="text-[12px] font-medium text-white/30 uppercase tracking-[1px]">Ganhos dos últimos 30 dias</h3>
                      <p className="text-[11px] font-normal text-white/20">Análise de performance tática mensal</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[11px] text-white/30 mb-1">Total Período</p>
                      <div className="text-[20px] font-semibold text-[#a78bfa] tracking-[-0.3px]">
                        R$ {totalEarnings.toLocaleString('pt-BR')}
                      </div>
                    </div>
                  </div>

                  <div className="h-[180px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={chartData} margin={{ top: 5, right: 0, left: -20, bottom: 0 }}>
                        <defs>
                          <linearGradient id="colorGanhos" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#8b5cf6" stopOpacity="0.15"/>
                            <stop offset="95%" stopColor="#8b5cf6" stopOpacity="0"/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid vertical={false} stroke="rgba(255,255,255,0.04)" strokeDasharray="4 4" />
                        <XAxis 
                          dataKey="date" 
                          axisLine={false} 
                          tickLine={false}
                          tick={{ fontSize: 10, fill: 'rgba(255,255,255,0.2)' }}
                          dy={10}
                        />
                        <YAxis 
                          axisLine={false} 
                          tickLine={false} 
                          tick={{ fontSize: 10, fill: 'rgba(255,255,255,0.2)' }} 
                          width={45}
                          tickFormatter={(v) => `R$${v}`} 
                        />
                        <Tooltip 
                          content={<CustomTooltip />} 
                          cursor={{ stroke: 'rgba(139,92,246,0.3)', strokeWidth: 1, strokeDasharray: '4 4' }}
                        />
                        <Area 
                          type="monotone" 
                          dataKey="ganhos" 
                          stroke="#8b5cf6" 
                          strokeWidth={1.5} 
                          fill="url(#colorGanhos)" 
                          dot={false}
                          isAnimationActive={false}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </Card>
              </div>

              {/* COLUNA DIREITA (35%) */}
              <div className="flex flex-col gap-7">
                <Card className="glass-card p-6 relative overflow-hidden">
                  <p className="text-[11px] font-black text-primary/40 uppercase tracking-[1.5px] mb-6 flex items-center gap-2">
                    <Zap className="h-3 w-3 fill-primary" /> AÇÕES RÁPIDAS
                  </p>
                  
                  <div className="space-y-3">
                    <Button 
                      className="w-full h-10 bg-[#7c3aed] hover:bg-[#6d28d9] transition-all rounded-[10px] font-bold uppercase text-[11px] tracking-widest gap-2 shadow-none"
                      onClick={() => router.push('/leads')}
                    >
                      <Plus className="h-4 w-4" /> Nova Prospecção
                    </Button>
                    <div className="grid grid-cols-2 gap-3">
                      <Button 
                        variant="outline" 
                        className="h-10 bg-white/5 border-[#a855f7]/20 hover:bg-white/10 transition-all rounded-[10px] text-[10px] font-bold uppercase tracking-tight gap-2"
                        onClick={() => router.push('/prompts')}
                      >
                        <Globe className="h-3.5 w-3.5 text-primary" /> Criar Site IA
                      </Button>
                      <Button 
                        variant="outline" 
                        className="h-10 bg-white/5 border-[#a855f7]/20 hover:bg-white/10 transition-all rounded-[10px] text-[10px] font-bold uppercase tracking-tight gap-2"
                      >
                        <FileText className="h-3.5 w-3.5 text-primary" /> Gerar Contrato
                      </Button>
                    </div>
                  </div>
                </Card>

                <Card className="glass-card flex-1 p-6 relative overflow-hidden shadow-none bg-[#581c87]/20">
                  <div className="relative z-10 space-y-4">
                    <Badge className="bg-[#c4b5fd] text-[#4c1d95] text-[9px] font-black uppercase px-3 py-1 rounded-md border-none shadow-none">
                      🎓 CONTEÚDO VIP
                    </Badge>
                    <div className="space-y-2">
                      <h4 className="text-[16px] font-bold text-white leading-tight">Masterclass: Escala de Leads Infinitos</h4>
                      <p className="text-xs text-white/50 font-normal leading-relaxed">
                        Aprenda o método que permitiu ao Lucas faturar R$ 50k em 30 dias usando automação neural.
                      </p>
                    </div>
                    <Button variant="outline" className="w-full mt-4 bg-white/10 border-white/15 text-white hover:bg-white/20 transition-all rounded-lg text-[10px] font-semibold uppercase tracking-widest">
                      Acessar Agora <ArrowRight className="ml-2 h-3 w-3" />
                    </Button>
                  </div>
                  <div className="absolute -bottom-4 -right-4 opacity-10">
                    <GraduationCap className="h-32 w-32 text-white" />
                  </div>
                </Card>
              </div>
            </div>

            {/* SEÇÃO: ECOSSISTEMA PREMIUM */}
            <div className="space-y-7 pt-4 bg-transparent">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h2 className="text-[15px] font-semibold text-white/85 tracking-tight">Ecossistema Premium</h2>
                  <p className="text-white/30 text-[11px] font-normal">O arsenal tático completo para sua operação digital</p>
                </div>
                <Badge className="bg-green-500/10 text-[#4ade80] border-green-500/25 text-[10px] font-black uppercase px-4 py-1.5 rounded-[12px] shadow-none">
                  FULL ACCESS ATIVO
                </Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {ecosystemModules.map((module, i) => (
                  <Link key={i} href={module.url}>
                    <Card className="glass-card p-5 group relative overflow-hidden bg-white/[0.02] hover:translate-y-[-2px] hover:border-[#8b5cf6]/25 hover:bg-white/[0.06] transition-all duration-200 ease-[cubic-bezier(0.4,0,0.2,1)]">
                      <div className="flex flex-col gap-4">
                        <div className="flex justify-between items-start">
                          <div className="h-8 w-8 rounded-lg bg-white/[0.06] flex items-center justify-center transition-all group-hover:scale-105">
                            <module.icon className="size-4 text-white/50" />
                          </div>
                          <ArrowRight className="h-3.5 w-3.5 text-white/10 group-hover:text-[#a855f7] transition-all group-hover:translate-x-1" />
                        </div>
                        <div className="space-y-1.5">
                          <h4 className="text-[13px] font-medium text-white/85 tracking-tight">{module.title}</h4>
                          <p className="text-[12px] text-white/35 font-normal leading-[1.6] line-clamp-2">
                            {module.desc}
                          </p>
                        </div>
                        <div className="pt-1">
                          <span className="text-[11px] font-medium text-[#8b5cf6]/70 group-hover:text-[#8b5cf6] flex items-center gap-2 transition-colors">
                            Iniciar módulo <ChevronRight className="h-3 w-3" />
                          </span>
                        </div>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>

            {/* JORNADA DE MISSÕES */}
            <div className="space-y-7 pt-4 bg-transparent">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h2 className="text-[15px] font-semibold text-white/85 tracking-[-0.2px]">Sua Jornada de Escala</h2>
                  <p className="text-[11px] font-normal text-white/30 tracking-[0.8px]">O método exato para sua primeira venda em 7 dias</p>
                </div>
                <Badge className="bg-[#8b5cf6]/10 border border-[#8b5cf6]/25 text-[#c4b5fd] text-[10px] uppercase rounded-[12px] px-3 py-1 font-medium shadow-none">
                  DIA {currentJourneyDay} ATIVO
                </Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                {missions.map((m) => {
                  const isCompleted = completedMissionIds.includes(m.id);
                  const isLocked = !isSpecialUser && !isGrayUser && m.order > currentJourneyDay && !isCompleted;
                  const isCurrent = !isCompleted && !isLocked && (isSpecialUser || isGrayUser || m.order === currentJourneyDay);

                  return (
                    <Link 
                      key={m.id} 
                      href={isLocked ? '#' : `/missions/${m.id}`}
                      className={cn(
                        "block transition-all",
                        isLocked ? 'cursor-not-allowed' : 'cursor-pointer'
                      )}
                    >
                      <Card className={cn(
                        "glass-card p-[18px] transition-all duration-200 h-full flex flex-col justify-between bg-white/[0.025]",
                        isCurrent && "hover:border-white/12 hover:translate-y-[-1px] hover:bg-white/[0.05]"
                      )}>
                        <div className="space-y-4">
                          <div className="flex justify-between items-start">
                            <div className={cn(
                              "h-7 w-7 rounded-[8px] border flex items-center justify-center text-[13px] font-semibold transition-all",
                              isCompleted ? "bg-[#22c55e]/10 border-[#22c55e]/20 text-[#4ade80]" : 
                              isCurrent ? "bg-[#8b5cf6]/15 border-[#8b5cf6]/30 text-[#a78bfa] shadow-none" : 
                              "bg-white/[0.04] border-white/[0.08] text-white/20"
                            )}>
                              {isCompleted ? <CheckCircle2 className="h-[14px] w-[14px]" /> : m.order}
                            </div>
                            {isLocked && <Lock className="h-3.5 w-3.5 text-white/10" />}
                          </div>
                          
                          <div className="space-y-1.5">
                            <h4 className={cn(
                              "text-[12px] font-semibold uppercase tracking-[0.3px] transition-colors",
                              isCompleted ? "text-white/40" : isCurrent ? "text-white/90" : "text-white/25"
                            )}>
                              {m.title}
                            </h4>
                            <p className={cn(
                              "text-[11px] leading-[1.5] transition-colors",
                              isCompleted ? "text-white/20" : "text-white/35"
                            )}>
                              {m.desc}
                            </p>
                          </div>
                        </div>

                        <div className="pt-4">
                          {isCompleted ? (
                            <div className="w-full h-[32px] rounded-[6px] border border-white/10 text-white/35 text-[11px] font-normal flex items-center justify-center transition-colors hover:bg-white/5">
                              Revisar
                            </div>
                          ) : (
                            <div 
                              className={cn(
                                "w-full h-[32px] rounded-[6px] text-[11px] font-medium flex items-center justify-center transition-all",
                                isCurrent 
                                  ? "bg-[#6d28d9]/30 border border-[#8b5cf6]/40 text-[#c4b5fd]" 
                                  : "bg-white/[0.04] border-white/[0.08] text-white/20"
                              )}
                            >
                              {isLocked ? 'Bloqueado' : 'Iniciar'}
                            </div>
                          )}
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