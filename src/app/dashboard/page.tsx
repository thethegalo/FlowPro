"use client";

import { useMemo, useEffect, useState } from 'react';
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
  X
} from 'lucide-react';
import { useUser, useFirestore, useMemoFirebase, useDoc, useCollection } from '@/firebase';
import { collection, query, orderBy, doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from '@/components/AppSidebar';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

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
  const [isVipModalOpen, setIsVipModalOpen] = useState(false);
  const [isEditingName, setIsEditingName] = useState(false);
  const [editNameValue, setEditNameValue] = useState('');
  
  const userDocRef = useMemoFirebase(() => {
    if (!db || !user) return null;
    return doc(db, 'users', user.uid);
  }, [db, user]);
  const { data: userData, isLoading: isUserDocLoading } = useDoc(userDocRef);

  const isAdmin = useMemo(() => user?.email === "thethegalo@gmail.com", [user]);

  const displayName = useMemo(() => {
    if (isAdmin) return 'Lucas';
    if (userData?.name) return userData.name;
    if (user?.displayName) return user.displayName;
    if (user?.email) return user.email.split('@')[0];
    return 'Usuário';
  }, [userData?.name, user?.displayName, user?.email, isAdmin]);

  const totalEarnings = useMemo(() => {
    if (userData?.simulatedStats?.total !== undefined) return userData.simulatedStats.total;
    const raw = userData?.totalEarnings || 0;
    if (isAdmin) return 21564 + raw;
    return raw;
  }, [userData?.totalEarnings, userData?.simulatedStats, isAdmin]);

  const chartData = useMemo(() => {
    if (userData?.simulatedStats?.chart) {
      return userData.simulatedStats.chart.map((p: any) => ({
        date: new Date(p.date).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' }),
        ganhos: p.amount
      }));
    }
    return Array.from({ length: 30 }).map((_, i) => ({
      date: `${i + 1}/03`,
      ganhos: Math.floor(Math.random() * 1000)
    }));
  }, [userData?.simulatedStats]);

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
    { title: 'Captar lead', desc: 'Escaneie o mercado e encontre alvos em segundos.', icon: Search, url: '/leads' },
    { title: 'Abordagem', desc: 'Scripts de WhatsApp otimizados por IA.', icon: MessageSquare, url: '/abordagens' },
    { title: 'Gerador de Prompts', desc: 'Comandos mestres para escalar sua operação.', icon: Zap, url: '/prompts' },
    { title: 'Ferramentas', desc: 'Arsenal de inteligência para acelerar fluxo.', icon: Globe, url: '/tools' },
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

  if (isUserLoading || isUserDocLoading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-primary" style={{ willChange: 'transform' }} /></div>;

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

          <div className="flex-1 p-6 md:p-8 space-y-8 max-w-7xl mx-auto w-full">
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
                    <Pencil className="h-3.5 w-3.5" />
                  </button>
                </div>
              )}
              <p className="text-xs md:text-sm text-white/30">
                Seja bem-vindo ao seu centro de comando tático.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
              {[
                { label: "Placar de Caixa", val: totalEarnings, prefix: "R$ ", icon: DollarSign, badge: "+12% hoje", sub: `Alvo R$ ${isAdmin ? '50.000' : '5.000'}` },
                { label: "Execução Diária", val: userData?.dailyActions || 0, suffix: " / 10", icon: Activity, badge: "Alta Performance", sub: "Ritmo constante" },
                { label: "Status Jornada", val: currentJourneyDay, prefix: "Dia ", icon: TrendingUp, badge: "Ativo", sub: `${completedMissionIds.length} concluídas` },
              ].map((m, i) => (
                <Card key={m.label} className="glass-card p-6 flex flex-col justify-between hover:border-primary/20 transition-all">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest mb-1">{m.label}</p>
                      <h3 className="text-2xl md:text-3xl font-black italic text-white leading-none">
                        {typeof m.val === 'number' ? <AnimatedNumber value={m.val} prefix={m.prefix} suffix={m.suffix} /> : m.val}
                      </h3>
                    </div>
                    <m.icon className="h-4 w-4 text-primary/40" />
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-green-500/10 border-green-500/20 text-green-400 text-[9px] font-bold uppercase py-0 px-2 rounded-full">
                      {m.badge}
                    </Badge>
                    <span className="text-[10px] text-white/20 uppercase font-medium">{m.sub}</span>
                  </div>
                </Card>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <Card className="lg:col-span-8 glass-card p-6 min-h-[300px] flex flex-col">
                <div className="flex justify-between items-center mb-8">
                  <div>
                    <h3 className="text-[11px] font-black uppercase tracking-widest text-white/30">Ganhos Temporais</h3>
                    <p className="text-[10px] text-white/20 uppercase">Performance tática (30 dias)</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-bold text-primary uppercase">Total Período</p>
                    <div className="text-lg md:text-xl font-black text-white italic">
                      R$ {totalEarnings.toLocaleString('pt-BR')}
                    </div>
                  </div>
                </div>

                <div className="flex-1 w-full min-h-[180px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorGanhos" x1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#8b5cf6" stopOpacity="0.15"/>
                          <stop offset="95%" stopColor="#8b5cf6" stopOpacity="0"/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid vertical={false} stroke="rgba(255,255,255,0.03)" strokeDasharray="3 3" />
                      <XAxis dataKey="date" hide />
                      <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: 'rgba(255,255,255,0.2)' }} tickFormatter={(v) => `R$${v}`} />
                      <Tooltip content={<CustomTooltip />} />
                      <Area 
                        type="monotone" 
                        dataKey="ganhos" 
                        stroke="#8b5cf6" 
                        strokeWidth={2} 
                        fill="url(#colorGanhos)" 
                        isAnimationActive={false}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </Card>

              <div className="lg:col-span-4 flex flex-col gap-6">
                <Card className="glass-card p-6">
                  <p className="text-[10px] font-black uppercase tracking-widest text-white/20 mb-6">Comandos Rápidos</p>
                  <div className="space-y-3">
                    <Button 
                      className="w-full h-11 bg-primary/80 hover:bg-primary rounded-xl font-medium text-sm gap-2"
                      onClick={() => router.push('/leads')}
                    >
                      <Plus className="h-4 w-4" /> Nova prospecção
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full h-11 bg-white/5 border-white/5 hover:bg-white/10 rounded-xl text-xs"
                      onClick={() => router.push('/prompts')}
                    >
                      <Globe className="h-3.5 w-3.5 mr-2 opacity-40" /> Criar Site
                    </Button>
                  </div>
                </Card>

                <Card className="glass-card flex-1 p-6 relative overflow-hidden group">
                  <div className="relative z-10 space-y-4">
                    <Badge className="bg-primary/20 text-primary border-none text-[9px] font-black uppercase px-2 py-0.5 rounded-md">
                      🎓 CONTEÚDO VIP
                    </Badge>
                    <div className="space-y-1">
                      <h4 className="text-base font-bold text-white leading-tight">Masterclass: Escala Infinitos</h4>
                      <p className="text-xs text-white/30 font-medium leading-relaxed">
                        Aprenda o método exato para faturar R$ 50k em 30 dias com IA.
                      </p>
                    </div>
                    <Button 
                      variant="outline" 
                      onClick={() => setIsVipModalOpen(true)}
                      className="w-full mt-4 bg-white/10 border-white/10 text-white hover:bg-white/20 transition-all rounded-xl text-[11px] font-bold uppercase"
                    >
                      Acessar Agora <ArrowRight className="ml-2 h-3 w-3" />
                    </Button>
                  </div>
                  <div className="absolute -bottom-4 -right-4 opacity-5 group-hover:scale-110 transition-transform">
                    <GraduationCap className="h-32 w-32 text-white" />
                  </div>
                </Card>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h2 className="text-base md:text-lg font-semibold text-white tracking-tight">Ecossistema Premium</h2>
                  <p className="text-white/30 text-[11px] uppercase tracking-widest">Arsenal tático para sua operação digital</p>
                </div>
                <div className="hidden md:flex bg-green-500/10 border border-green-500/20 text-green-400 text-[10px] font-medium px-3 py-1 rounded-lg items-center gap-2">
                  <CheckCircle2 className="h-3 w-3" /> Full access ativo
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {ecosystemModules.map((module, i) => (
                  <Link key={module.title} href={module.url} prefetch={false}>
                    <Card className="glass-card p-5 group hover:border-primary/30 transition-all">
                      <div className="flex flex-col gap-4">
                        <div className="flex justify-between items-start">
                          <div className="h-8 w-8 rounded-lg bg-white/5 flex items-center justify-center border border-white/5">
                            <module.icon className="h-4 w-4 text-white/40" />
                          </div>
                          <ChevronRight className="h-4 w-4 text-white/10 group-hover:text-primary transition-all group-hover:translate-x-1" />
                        </div>
                        <div className="space-y-1">
                          <h4 className="text-sm font-semibold text-white/80">{module.title}</h4>
                          <p className="text-xs text-white/30 leading-relaxed line-clamp-2">
                            {module.desc}
                          </p>
                        </div>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>

            <div className="space-y-6 pb-20">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h2 className="text-base md:text-lg font-semibold text-white tracking-tight">Jornada de Escala</h2>
                  <p className="text-white/30 text-[11px] uppercase tracking-widest">Sua primeira venda em 7 dias</p>
                </div>
                <Badge className="bg-primary/10 border-primary/20 text-primary text-[10px] uppercase rounded-lg px-3 py-1 font-bold">
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
                        "glass-card p-5 h-full flex flex-col justify-between transition-all",
                        isCurrent && "border-primary/40 bg-primary/5 shadow-[0_0_20px_rgba(139,92,246,0.1)]"
                      )}>
                        <div className="space-y-4">
                          <div className="flex justify-between items-start">
                            <div className={cn(
                              "h-8 w-8 rounded-lg border flex items-center justify-center text-xs font-bold",
                              isCompleted ? "bg-green-500/10 border-green-500/20 text-green-400" : 
                              isCurrent ? "bg-primary/20 border-primary/40 text-primary" : 
                              "bg-white/5 border-white/10 text-white/20"
                            )}>
                              {isCompleted ? <CheckCircle2 className="h-4 w-4" /> : m.order}
                            </div>
                            {isLocked && <Lock className="h-3.5 w-3.5 text-white/10" />}
                          </div>
                          
                          <div className="space-y-1">
                            <h4 className={cn("text-[10px] font-black uppercase tracking-tight", isCompleted ? 'text-white/40' : 'text-white/90')}>
                              {m.title}
                            </h4>
                            <p className="text-[9px] text-white/30 leading-relaxed font-medium">
                              {m.desc}
                            </p>
                          </div>
                        </div>

                        <div className="pt-4">
                          <div className={cn(
                            "w-full h-8 rounded-lg text-[9px] font-black uppercase tracking-widest flex items-center justify-center transition-all",
                            isCompleted ? "border border-white/5 text-white/30 hover:bg-white/5" : 
                            isCurrent ? "bg-primary text-white" : "bg-white/5 text-white/20"
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

        <Dialog open={isVipModalOpen} onOpenChange={setIsVipModalOpen}>
          <DialogContent className="bg-[#0e0e1a] border-white/10 text-white rounded-[2rem] max-w-sm sm:max-w-md p-12 text-center">
            <DialogHeader className="space-y-6 flex flex-col items-center">
              <div className="relative h-16 w-48 mb-4">
                <Image src={LOGO_URL} alt="FlowPro Logo" fill className="object-contain" loading="lazy" />
              </div>
              <DialogTitle className="text-2xl font-black italic uppercase tracking-tighter">
                EM BREVE
              </DialogTitle>
              <div className="space-y-2">
                <p className="text-white/60 text-sm font-medium leading-relaxed">
                  Estamos finalizando o motor neural desta Masterclass. Você será notificado assim que o conteúdo for liberado no seu painel.
                </p>
              </div>
            </DialogHeader>
            <div className="mt-8">
              <Button 
                onClick={() => setIsVipModalOpen(false)}
                className="w-full h-12 bg-primary hover:bg-primary/90 font-black uppercase tracking-widest rounded-xl"
              >
                ENTENDIDO
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </SidebarProvider>
  );
}
