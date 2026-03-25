
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
  Timer
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

const LOGO_ICON = "https://s3.typebot.io/public/workspaces/cmml2oniw000g04l7gwmqelu1/typebots/cmn1vyjog000104la10d6sdzu/blocks/d5tqr6czngeukjb8r6whrs5s?v=1774318273085";
const ADMIN_EMAIL = "thethegalo@gmail.com";

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

  const displayName = useMemo(() => {
    if (user?.email === ADMIN_EMAIL) return 'Lucas';
    if (userData?.name) return userData.name;
    if (user?.displayName) return user.displayName;
    if (user?.email) return user.email.split('@')[0];
    return 'Usuário';
  }, [userData?.name, user?.displayName, user?.email]);

  const subQuery = useMemoFirebase(() => {
    if (!db || !user) return null;
    return query(collection(db, 'users', user.uid, 'subscriptions'));
  }, [db, user]);
  const { data: subData } = useCollection(subQuery);

  const isSpecialUser = user?.email === ADMIN_EMAIL;

  const isProMember = useMemo(() => {
    const hasActiveSub = subData?.some(sub => (sub.planType === 'monthly' || sub.planType === 'lifetime') && sub.status === 'active');
    const hasPremiumPlan = userData?.plan === 'vitalicio' || userData?.plan === 'mensal';
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
    return query(
      collection(db, 'users', user.uid, 'earnings'),
      orderBy('date', 'desc'),
      limit(100)
    );
  }, [db, user]);
  const { data: earningsData } = useCollection(earningsQuery);

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

  const progressQuery = useMemoFirebase(() => {
    if (!db || !user) return null;
    return query(collection(db, 'users', user.uid, 'missionProgress'), orderBy('completedAt', 'asc'));
  }, [db, user]);
  const { data: progressData } = useCollection(progressQuery);

  const completedMissionIds = useMemo(() => {
    return progressData ? progressData.filter(p => p.isCompleted).map(p => p.missionId) : [];
  }, [progressData]);

  const journeyProgress = (completedMissionIds.length / missions.length) * 100;
  const isJourneyFinished = completedMissionIds.includes('dia7');

  useEffect(() => {
    if (isJourneyFinished && !isProMember && !isUserDocLoading) {
      const timer = setTimeout(() => router.push('/paywall'), 5000);
      return () => clearTimeout(timer);
    }
  }, [isJourneyFinished, isProMember, router, isUserDocLoading]);

  const totalEarnings = useMemo(() => {
    const raw = userData?.totalEarnings || 0;
    return isSpecialUser ? 28754 + raw : raw;
  }, [userData?.totalEarnings, isSpecialUser]);

  const displayGoal = isSpecialUser ? 50000 : userGoal;
  const earningsProgress = (totalEarnings / displayGoal) * 100;

  const chartData = useMemo(() => {
    const days = 30;
    const data = [];
    const now = new Date();
    
    const earningsByDate: Record<string, number> = {};
    earningsData?.forEach(e => {
      earningsByDate[e.date] = (earningsByDate[e.date] || 0) + (e.amount || 0);
    });

    for (let i = days; i >= 0; i--) {
      const d = new Date();
      d.setDate(now.getDate() - i);
      const dateKey = d.toISOString().split('T')[0];
      const dayStr = d.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
      
      let dailyValue = earningsByDate[dateKey] || 0;
      
      if (isSpecialUser && dailyValue === 0) {
        // Lucas vende todos os dias - Visualização de alta performance
        const seed = (i * 1234.5) + (user?.uid?.charCodeAt(0) || 1);
        const rand = Math.abs(Math.sin(seed) * 10000) % 1;
        
        // Garante que cada dia tenha uma venda para Lucas, simulando fluxo constante
        const avgDaily = 28754 / 30;
        // Flutuação dinâmica entre R$ 300 e R$ 1700 aproximadamente
        dailyValue = Math.floor(avgDaily * (0.3 + rand * 1.5));
      }
      
      data.push({
        date: dayStr,
        ganhos: dailyValue,
      });
    }
    return data;
  }, [earningsData, isSpecialUser, user?.uid]);

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
    if (!db || !user || !earningAmount) return;
    setIsAddingEarning(true);
    const amount = Number(earningAmount);
    
    try {
      await addDoc(collection(db, 'users', user.uid, 'earnings'), {
        amount: amount,
        date: earningDate,
        createdAt: serverTimestamp(),
        description: "Venda registrada manualmente"
      });

      const userRef = doc(db, 'users', user.uid);
      await setDoc(userRef, {
        totalEarnings: increment(amount),
        totalActions: increment(1),
        dailyActions: increment(1),
        updatedAt: serverTimestamp(),
        lastActionAt: serverTimestamp(),
      }, { merge: true });

      toast({
        title: "Venda Registrada!",
        description: `R$ ${amount.toLocaleString('pt-BR')} adicionados ao seu placar.`
      });
      setShowEarningModal(false);
      setEarningAmount("");
    } catch (e: any) {
      toast({ variant: "destructive", title: "Erro ao salvar", description: "Verifique sua conexão." });
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

  if (userData?.status !== 'approved' && !isSpecialUser) {
    return (
      <div className="min-h-screen bg-[#050508] flex items-center justify-center p-6 text-center">
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
          <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-primary/10 rounded-full blur-[140px]"></div>
        </div>
        
        <Card className="w-full max-w-lg glass-card border-white/10 p-12 space-y-8 rounded-[3rem] relative z-10">
          <div className="h-24 w-24 bg-white/5 rounded-full flex items-center justify-center mx-auto border border-white/10">
            <ShieldAlert className="h-12 w-12 text-primary animate-pulse" />
          </div>
          
          <div className="space-y-4">
            <Badge className="bg-primary/20 text-primary border-primary/30 uppercase tracking-[0.3em] text-[10px] px-4 py-1.5">Acesso Sob Análise</Badge>
            <h1 className="text-3xl font-black italic uppercase tracking-tighter">Olá, {displayName}</h1>
            <p className="text-muted-foreground text-sm font-medium leading-relaxed">
              O FlowPro é um ecossistema fechado de elite. Sua solicitação de acesso foi enviada e está na fila para validação manual.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white/5 border border-white/5 space-y-4 text-left">
            <div className="flex items-center gap-3">
              <div className="h-2 w-2 rounded-full bg-green-500 shadow-[0_0_10px_#22c55e]"></div>
              <p className="text-[10px] font-black uppercase text-white/80">Cadastro Criado</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-2 w-2 rounded-full bg-yellow-500 animate-pulse shadow-[0_0_10px_#eab308]"></div>
              <p className="text-[10px] font-black uppercase text-white/80">Aguardando Aprovação do Administrador</p>
            </div>
            <div className="flex items-center gap-3 opacity-30">
              <div className="h-2 w-2 rounded-full bg-white"></div>
              <p className="text-[10px] font-black uppercase text-white/80">Liberação do Arsenal Neural</p>
            </div>
          </div>

          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest italic">
            Você será notificado via e-mail assim que seu acesso for liberado.
          </p>

          <Button 
            onClick={() => router.push('/auth')} 
            variant="outline" 
            className="w-full h-14 rounded-2xl border-white/10 text-[10px] font-black uppercase tracking-widest"
          >
            VOLTAR PARA LOGIN
          </Button>
        </Card>
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
                <Sparkles className="h-4 w-4 text-primary" /> Painel de Comando
              </h2>
            </div>
            
            <div className="flex items-center gap-3">
              <Badge variant="outline" className={`${isProMember ? 'bg-purple-500/10 border-purple-500/30 text-purple-400' : 'bg-white/5 border-white/10 text-muted-foreground'} text-[8px] font-black uppercase px-3 py-1`}>
                {userData?.plan?.toUpperCase() === 'NENHUM' ? 'SEM PLANO ATIVO' : userData?.plan?.toUpperCase()}
              </Badge>
              <Badge variant="secondary" className="bg-primary/10 text-primary gap-1 px-3 py-1 text-[10px] font-black uppercase">
                <Flame className="h-3 w-3" /> {completedMissionIds.length}D
              </Badge>
            </div>
          </header>

          <div className="flex-1 p-4 md:p-8 space-y-8 max-w-5xl mx-auto w-full">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div className="space-y-3">
                <div className="space-y-1">
                  <h1 className="text-3xl md:text-4xl font-black italic uppercase tracking-tighter leading-none text-white">
                    {displayName.split(' ')[0]}
                  </h1>
                  <div className="flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full w-fit">
                    <div className={`${userLevel.color}`}>
                      {userLevel.icon}
                    </div>
                    <span className={`text-[10px] font-black uppercase tracking-widest ${userLevel.color}`}>Patente {userLevel.name}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  {userData?.plan === 'mensal' && (
                    <div className="flex items-center gap-2 px-3 py-1 bg-yellow-500/5 border border-yellow-500/20 rounded-full w-fit">
                      <AlertCircle className="h-3 w-3 text-yellow-500" />
                      <span className="text-[8px] font-bold uppercase tracking-widest text-yellow-500/80">Uso diário limitado</span>
                    </div>
                  )}
                  {(userData?.plan === 'vitalicio' || isSpecialUser) && (
                    <div className="flex items-center gap-2 px-3 py-1 bg-green-500/5 border border-green-500/20 rounded-full w-fit">
                      <ShieldCheck className="h-3 w-3 text-green-500" />
                      <span className="text-[8px] font-bold uppercase tracking-widest text-green-500/80">Acesso ilimitado vitalício</span>
                    </div>
                  )}
                  {userData?.plan === 'nenhum' && (
                    <div className="flex items-center gap-2 px-3 py-1 bg-destructive/5 border border-destructive/20 rounded-full w-fit">
                      <Lock className="h-3 w-3 text-destructive" />
                      <span className="text-[8px] font-bold uppercase tracking-widest text-destructive/80">Assinatura necessária</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-primary/5 border border-primary/20 max-w-xs animate-in slide-in-from-right-10 duration-700">
                <div className="flex gap-3 items-start">
                  <AlertCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                  <p className="text-[10px] font-bold text-white/80 leading-relaxed uppercase">
                    {!isProMember ? "Libere seu plano para ativar o motor neural." : "Você está em modo de operação. Continue acelerando!"}
                  </p>
                </div>
              </div>
            </div>

            <Card className="bg-white/[0.02] border-white/5 rounded-[2rem] overflow-hidden p-6 md:p-10 space-y-10">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                <div className="space-y-1">
                  <h3 className="text-2xl font-black italic uppercase tracking-tight text-white">Ganhos Diários</h3>
                  <p className="text-xs text-muted-foreground font-medium uppercase tracking-widest opacity-60">Visualização de performance 30 dias.</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-black uppercase tracking-widest opacity-50 mb-1">Ganhos Totais</p>
                  <div className="text-4xl font-black italic tracking-tighter text-white">R$ {totalEarnings.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</div>
                </div>
              </div>

              <div className="h-[280px] w-full">
                <ChartContainer config={{ 
                  ganhos: { label: "Valor do Dia", color: "hsl(var(--primary))" } 
                }}>
                  <AreaChart 
                    data={chartData} 
                    margin={{ top: 10, right: 0, left: -20, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient id="colorGanhos" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.4}/>
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
                      interval={2}
                    />
                    <YAxis 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fontSize: 10, fill: 'rgba(255,255,255,0.3)', fontWeight: 'bold' }}
                      tickFormatter={(value) => `R$ ${value}`}
                      domain={[0, 'auto']}
                    />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Area 
                      type="monotone" 
                      dataKey="ganhos" 
                      stroke="hsl(var(--primary))" 
                      strokeWidth={3}
                      fillOpacity={1} 
                      fill="url(#colorGanhos)" 
                      animationDuration={2000}
                      dot={{ r: 3, fill: 'hsl(var(--primary))', strokeWidth: 1, stroke: '#fff', opacity: 0.8 }}
                      activeDot={{ r: 6, fill: 'hsl(var(--primary))', stroke: '#fff', strokeWidth: 2 }}
                    />
                  </AreaChart>
                </ChartContainer>
              </div>
            </Card>

            <div className="grid gap-6 md:grid-cols-2">
              <Card className="bg-white/[0.02] border-white/5 rounded-[2rem] overflow-hidden">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-black uppercase tracking-widest text-primary">Placar de Caixa</span>
                    <Badge variant="outline" className="text-[8px] border-primary/20 text-primary">META: R$ {displayGoal.toLocaleString('pt-BR')}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-end justify-between">
                    <div className="text-5xl font-black italic tracking-tighter">R$ {totalEarnings.toLocaleString('pt-BR')}</div>
                    
                    <Dialog open={showEarningModal} onOpenChange={setShowEarningModal}>
                      <DialogTrigger asChild>
                        <Button 
                          size="sm" 
                          className="bg-white text-black hover:bg-primary hover:text-white rounded-xl font-black uppercase text-[10px] h-10 px-4 transition-all active:scale-95"
                        >
                          <Plus className="h-3 w-3 mr-1" /> ADICIONAR GANHO
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="bg-[#0b0b14] border-white/10 text-white rounded-[2rem]">
                        <DialogHeader>
                          <DialogTitle className="text-xl font-black italic uppercase tracking-widest">Registrar Venda</DialogTitle>
                          <DialogDescription className="text-muted-foreground uppercase text-[10px] font-bold">Informe o valor para atualizar seu placar.</DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-6 py-4">
                          <div className="space-y-2">
                            <Label htmlFor="amount" className="text-[10px] font-black uppercase tracking-widest opacity-70">Valor da Venda (R$)</Label>
                            <Input
                              id="amount"
                              type="number"
                              placeholder="500"
                              value={earningAmount}
                              onChange={(e) => setEarningAmount(e.target.value)}
                              className="bg-white/5 border-white/10 h-12 rounded-xl text-lg font-bold"
                            />
                          </div>
                        </div>
                        <DialogFooter>
                          <Button 
                            onClick={handleAddEarning} 
                            disabled={isAddingEarning || !earningAmount}
                            className="w-full bg-primary h-12 rounded-xl font-black uppercase tracking-widest"
                          >
                            {isAddingEarning ? <Loader2 className="h-4 w-4 animate-spin" /> : 'CONFIRMAR REGISTRO'}
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-[8px] font-black uppercase opacity-50 tracking-widest">
                      <span>Progresso do Alvo</span>
                      <span>{Math.min(100, Math.round(earningsProgress))}%</span>
                    </div>
                    <Progress value={earningsProgress} className="h-2 bg-white/5" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/[0.02] border-white/5 rounded-[2rem] overflow-hidden">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-black uppercase tracking-widest text-accent">Execução Diária</span>
                    <Badge variant="outline" className="text-[8px] border-accent/20 text-accent">ROTINA DE ATAQUE</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="text-4xl font-black italic tracking-tighter">
                        {dailyActions}/{dailyGoal}
                      </div>
                      <p className="text-[10px] font-bold text-muted-foreground uppercase">Ações Concluídas Hoje</p>
                    </div>
                    <div className={`h-16 w-16 rounded-full flex items-center justify-center border-4 transition-all duration-1000 ${dailyActions >= dailyGoal ? 'border-green-500 bg-green-500/10 shadow-[0_0_20px_rgba(34,197,94,0.3)]' : 'border-white/5 bg-white/5'}`}>
                      {dailyActions >= dailyGoal ? <Flame className="h-8 w-8 text-green-500 animate-pulse" /> : <Target className="h-8 w-8 text-muted-foreground opacity-20" />}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6 pt-4 pb-20">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <h2 className="text-2xl font-black italic uppercase tracking-tighter flex items-center gap-2 text-white">
                    <div className="relative h-6 w-6">
                      <Image src={LOGO_ICON} alt="Icon" fill className="object-contain" />
                    </div>
                    Trilha de Missão: 7 Dias
                  </h2>
                  <p className="text-muted-foreground text-[10px] uppercase font-bold tracking-widest">Execute para desbloquear a Fase de Escala.</p>
                </div>
                
                <div className="flex items-center gap-4 bg-white/5 px-6 py-3 rounded-2xl border border-white/10">
                  <div className="space-y-1 flex-1 min-w-[120px]">
                    <div className="flex justify-between text-[8px] font-black uppercase tracking-widest mb-1">
                      <span>Seu Progresso</span>
                      <span>{completedMissionIds.length}/7</span>
                    </div>
                    <Progress value={journeyProgress} className="h-1.5 bg-white/10" />
                  </div>
                  {isJourneyFinished && (
                    <Badge className="bg-green-500/20 text-green-500 border-green-500/30 text-[8px] font-black uppercase">JORNADA COMPLETA</Badge>
                  )}
                </div>
              </div>
              
              <div className="grid gap-3 md:gap-4">
                {missions.map((mission, index) => {
                  const isCompleted = completedMissionIds.includes(mission.id);
                  const isTimeLocked = mission.order > currentJourneyDay;
                  const isDependencyLocked = index > 0 && !completedMissionIds.includes(missions[index - 1].id) && !isCompleted;
                  const isLocked = isDependencyLocked || isTimeLocked;
                  const isCurrent = !isCompleted && !isLocked;

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
                            <p className="text-xs text-muted-foreground line-clamp-1 opacity-70 group-hover:opacity-100 transition-opacity">
                              {isTimeLocked ? (
                                <span className="flex items-center gap-1 text-yellow-500/80 font-bold">
                                  <Timer className="h-3 w-3" /> LIBERA EM {mission.order - currentJourneyDay} DIA(S)
                                </span>
                              ) : mission.desc}
                            </p>
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
