
"use client";

import { useUser, useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { 
  Loader2, 
  CheckCircle2, 
  UserCheck,
  Shield,
  Ban,
  Save,
  Infinity,
  CalendarDays,
  Calendar,
  BarChart3,
  Trash2,
  RefreshCcw,
  DollarSign,
  Zap,
  Users
} from 'lucide-react';
import { collection, query, doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from '@/components/AppSidebar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function AdminPage() {
  const { user, isUserLoading } = useUser();
  const db = useFirestore();
  const router = useRouter();
  const { toast } = useToast();
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [plansToUpdate, setPlansToUpdate] = useState<Record<string, string>>({});
  
  const [simulationUser, setSimulationUser] = useState<any>(null);
  const [minDayVal, setMinDayVal] = useState("100");
  const [maxDayVal, setMaxDayVal] = useState("1200");
  const [manualTotal, setTotalOverwrite] = useState("");
  const [simulatedData, setSimulatedData] = useState<any[]>([]);

  const [testNotification, setTestNotification] = useState<boolean>(false);

  const ADMIN_EMAIL = "thethegalo@gmail.com";

  useEffect(() => {
    if (!isUserLoading && (!user || user.email !== ADMIN_EMAIL)) {
      router.push('/dashboard');
    }
  }, [user, isUserLoading, router]);

  const usersQuery = useMemoFirebase(() => {
    if (!db) return null;
    return query(collection(db, 'users'));
  }, [db]);
  const { data: usersData, isLoading: isUsersLoading } = useCollection(usersQuery);

  const handleTestPix = () => {
    const audio = new Audio('/sounds/pix.mp3');
    audio.play().catch(() => {});
    setTestNotification(true);
    toast.success("Teste Iniciado", "O alerta visual e sonoro foi disparado.");
    setTimeout(() => setTestNotification(false), 5000);
  };

  const updateStatus = async (userId: string, newStatus: string) => {
    if (!db) return;
    setUpdatingId(userId);
    try {
      await updateDoc(doc(db, 'users', userId), { 
        status: newStatus,
        updatedAt: serverTimestamp()
      });
      toast.success("Status Atualizado", `Usuário agora está como ${newStatus}.`);
    } catch (error: any) {
      toast.error("Erro", error.message);
    } finally {
      setUpdatingId(null);
    }
  };

  const toggleAffiliate = async (userId: string, currentStatus: boolean) => {
    if (!db) return;
    setUpdatingId(userId);
    try {
      await updateDoc(doc(db, 'users', userId), { 
        isAffiliate: !currentStatus,
        updatedAt: serverTimestamp()
      });
      toast.success("Modo Afiliado", !currentStatus ? "Notificações de Pix ativadas." : "Notificações desativadas.");
    } catch (error: any) {
      toast.error("Erro", error.message);
    } finally {
      setUpdatingId(null);
    }
  };

  const updatePlan = async (userId: string) => {
    if (!db) return;
    const newPlan = plansToUpdate[userId];
    if (!newPlan) return;

    setUpdatingId(userId);
    try {
      await updateDoc(doc(db, 'users', userId), { 
        plan: newPlan,
        updatedAt: serverTimestamp()
      });
      toast.success("Plano Atualizado", "O acesso do usuário foi modificado com sucesso.");
    } catch (error: any) {
      toast.error("Erro", error.message);
    } finally {
      setUpdatingId(null);
    }
  };

  const handleGenerateRandom = () => {
    const min = Number(minDayVal) || 0;
    const max = Number(maxDayVal) || 1000;
    const data = [];
    const now = new Date();
    let sum = 0;

    for (let i = 30; i >= 0; i--) {
      const d = new Date();
      d.setDate(now.getDate() - i);
      const dateKey = d.toISOString().split('T')[0];
      const val = Math.floor(Math.random() * (max - min + 1)) + min;
      sum += val;
      data.push({ date: dateKey, amount: val });
    }
    setSimulatedData(data);
    if (!manualTotal) setTotalOverwrite(sum.toString());
    toast.success("Dados Gerados", "Curva de 30 dias criada com sucesso.");
  };

  const handleSaveSimulation = async () => {
    if (!db || !simulationUser) return;
    setUpdatingId(simulationUser.id);
    try {
      await updateDoc(doc(db, 'users', simulationUser.id), {
        simulatedStats: {
          total: Number(manualTotal) || 0,
          chart: simulatedData,
          updatedAt: new Date().toISOString()
        }
      });
      toast.success("Sucesso!", "Dados injetados na conta do usuário.");
      setSimulationUser(null);
    } catch (e: any) {
      toast.error("Erro", e.message);
    } finally {
      setUpdatingId(null);
    }
  };

  const handleResetSimulation = async () => {
    if (!db || !simulationUser) return;
    setUpdatingId(simulationUser.id);
    try {
      await updateDoc(doc(db, 'users', simulationUser.id), {
        simulatedStats: null
      });
      toast.success("Resetado", "Todos os dados de simulação foram removidos.");
      setSimulationUser(null);
    } catch (e: any) {
      toast.error("Erro", e.message);
    } finally {
      setUpdatingId(null);
    }
  };

  if (isUserLoading || isUsersLoading) {
    return (
      <div className="min-h-screen bg-transparent flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (user?.email !== ADMIN_EMAIL) return null;

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-transparent relative z-10">
        <AppSidebar />
        
        <main className="flex-1 flex flex-col min-w-0 bg-transparent">
          <header className="h-[52px] border-b border-white/5 flex items-center justify-between px-6 bg-transparent sticky top-0 z-50">
            <div className="flex items-center gap-4">
              <h1 className="text-[13px] font-medium text-white/50 flex items-center gap-2">
                <Shield className="h-3.5 w-3.5 text-primary" /> Flow Command
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleTestPix}
                className="h-8 border-green-500/20 bg-green-500/5 text-green-500 text-[9px] font-black uppercase tracking-widest gap-2"
              >
                <Zap className="h-3 w-3" /> Testar Som e Alerta
              </Button>
              <div className="bg-[#581c87]/40 border border-[#7c3aed]/30 text-[#c4b5fd] text-[11px] font-medium rounded-[6px] px-[10px] py-[4px] uppercase tracking-[0.5px]">
                ADMIN MASTER
              </div>
            </div>
          </header>

          <div className="flex-1 p-4 md:p-8 space-y-8 container max-w-6xl mx-auto bg-transparent">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 bg-transparent">
              {[
                { label: "Total Usuários", val: usersData?.length || 0, color: "" },
                { label: "Aguardando", val: usersData?.filter(u => u.status === 'pending').length || 0, color: "text-yellow-500" },
                { label: "Aprovados", val: usersData?.filter(u => u.status === 'approved').length || 0, color: "text-green-500" },
                { label: "Bloqueados", val: usersData?.filter(u => u.status === 'blocked').length || 0, color: "text-destructive" },
              ].map((stat, i) => (
                <Card key={i} className="glass-card border-white/10 p-6 flex flex-col items-center justify-center text-center">
                  <span className="text-[8px] font-black uppercase tracking-widest opacity-50 mb-1">{stat.label}</span>
                  <div className={`text-3xl font-black italic ${stat.color}`}>{stat.val}</div>
                </Card>
              ))}
            </div>

            <Card className="glass-card border-white/10 overflow-hidden rounded-[2rem]">
              <CardHeader className="bg-white/5 border-b border-white/5 p-6">
                <CardTitle className="text-sm font-black uppercase tracking-widest italic flex items-center gap-2">
                  <UserCheck className="h-4 w-4 text-primary" /> Gestão de Operadores
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="rounded-md overflow-x-auto">
                  <Table>
                    <TableHeader className="bg-white/5">
                      <TableRow className="border-white/5 hover:bg-transparent">
                        <TableHead className="text-muted-foreground text-[10px] uppercase font-black">Usuário</TableHead>
                        <TableHead className="text-muted-foreground text-[10px] uppercase font-black">Email</TableHead>
                        <TableHead className="text-muted-foreground text-[10px] uppercase font-black">Status</TableHead>
                        <TableHead className="text-muted-foreground text-[10px] uppercase font-black">Afiliado</TableHead>
                        <TableHead className="text-muted-foreground text-[10px] uppercase font-black">Plano</TableHead>
                        <TableHead className="text-muted-foreground text-[10px] uppercase font-black text-right">Comandos</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {usersData?.map((u) => (
                        <TableRow key={u.id} className="border-white/5 hover:bg-white/[0.02]">
                          <TableCell className="font-bold text-xs text-white">{u.name || u.email?.split('@')[0]}</TableCell>
                          <TableCell className="text-muted-foreground text-xs">{u.email}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className={`text-[8px] uppercase font-black border-white/10 ${
                              u.status === 'approved' ? 'text-green-500 border-green-500/20 bg-green-500/5' : 
                              u.status === 'pending' ? 'text-yellow-500 border-yellow-500/20 bg-yellow-500/5' : 
                              'text-destructive border-destructive/20 bg-destructive/5'
                            }`}>
                              {u.status?.toUpperCase() || 'PENDING'}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                               <Switch 
                                checked={u.isAffiliate || false} 
                                onCheckedChange={() => toggleAffiliate(u.id, u.isAffiliate)}
                                disabled={updatingId === u.id}
                                className="data-[state=checked]:bg-primary"
                               />
                               <span className="text-[10px] font-black uppercase text-white/40">{u.isAffiliate ? 'SIM' : 'NÃO'}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Select 
                                defaultValue={u.plan || 'nenhum'} 
                                onValueChange={(val) => setPlansToUpdate(prev => ({ ...prev, [u.id]: val }))}
                              >
                                <SelectTrigger className="h-8 w-[130px] bg-white/5 border-white/10 text-[9px] font-black uppercase">
                                  <SelectValue placeholder="Plano" />
                                </SelectTrigger>
                                <SelectContent className="bg-[#0b0b14] border-white/10 text-white">
                                  <SelectItem value="nenhum" className="text-[10px] font-black uppercase">Nenhum</SelectItem>
                                  <SelectItem value="mensal" className="text-[10px] font-black uppercase flex items-center gap-2">
                                    <CalendarDays className="h-3 w-3 inline mr-1 text-amber-500" /> Mensal
                                  </SelectItem>
                                  <SelectItem value="trimestral" className="text-[10px] font-black uppercase flex items-center gap-2">
                                    <Calendar className="h-3 w-3 inline mr-1 text-cyan-500" /> Trimestral
                                  </SelectItem>
                                  <SelectItem value="vitalicio" className="text-[10px] font-black uppercase flex items-center gap-2">
                                    <Infinity className="h-3 w-3 inline mr-1 text-primary" /> Vitalício
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                              {plansToUpdate[u.id] && plansToUpdate[u.id] !== u.plan && (
                                <Button 
                                  size="icon" 
                                  variant="ghost" 
                                  onClick={() => updatePlan(u.id)}
                                  disabled={updatingId === u.id}
                                  className="h-8 w-8 text-primary hover:bg-primary/10"
                                >
                                  {updatingId === u.id ? <Loader2 className="h-3 w-3 animate-spin" /> : <Save className="h-3 w-3" />}
                                </Button>
                              )}
                            </div>
                          </TableCell>
                          <TableCell className="text-right flex justify-end gap-2 p-4">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => setSimulationUser(u)}
                              className="h-8 px-3 rounded-lg text-[9px] font-black uppercase tracking-widest text-primary hover:bg-primary/10 border-primary/20"
                            >
                              <BarChart3 className="h-3 w-3 mr-1" />
                              SIMULAR
                            </Button>
                            {u.status !== 'approved' && (
                              <Button 
                                size="sm" 
                                variant="outline" 
                                disabled={updatingId === u.id}
                                onClick={() => updateStatus(u.id, 'approved')}
                                className="h-8 px-3 rounded-lg text-[9px] font-black uppercase tracking-widest text-green-500 hover:bg-green-500/10 border-green-500/20"
                              >
                                {updatingId === u.id ? <Loader2 className="h-3 w-3 animate-spin" /> : <CheckCircle2 className="h-3 w-3 mr-1" />}
                                LIBERAR
                              </Button>
                            )}
                            {u.status !== 'blocked' && (
                              <Button 
                                size="sm" 
                                variant="outline" 
                                disabled={updatingId === u.id}
                                onClick={() => updateStatus(u.id, 'blocked')}
                                className="h-8 px-3 rounded-lg text-[9px] font-black uppercase tracking-widest text-destructive hover:bg-destructive/10 border-destructive/20"
                              >
                                {updatingId === u.id ? <Loader2 className="h-3 w-3 animate-spin" /> : <Ban className="h-3 w-3 mr-1" />}
                                BLOQUEAR
                              </Button>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>

        {/* DIALOG DE SIMULAÇÃO */}
        <Dialog open={!!simulationUser} onOpenChange={(open) => !open && setSimulationUser(null)}>
          <DialogContent className="bg-[#0e0e1a] border-white/10 text-white rounded-[2rem] sm:max-w-[450px] shadow-[0_0_80px_rgba(124,58,255,0.2)]">
            <DialogHeader>
              <DialogTitle className="text-xl font-black italic uppercase tracking-tighter flex items-center gap-2">
                <Zap className="h-5 w-5 text-primary" /> Modo Simulação
              </DialogTitle>
              <DialogDescription className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">
                Injetar dados de faturamento para: <span className="text-white">{simulationUser?.name || simulationUser?.email}</span>
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-6 py-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase opacity-50 tracking-widest">Valor Mín/Dia (R$)</Label>
                  <Input 
                    type="number"
                    value={minDayVal}
                    onChange={(e) => setMinDayVal(e.target.value)}
                    className="bg-white/5 border-white/10 rounded-xl h-12 focus-visible:ring-primary"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase opacity-50 tracking-widest">Valor Máx/Dia (R$)</Label>
                  <Input 
                    type="number"
                    value={maxDayVal}
                    onChange={(e) => setMaxDayVal(e.target.value)}
                    className="bg-white/5 border-white/10 rounded-xl h-12 focus-visible:ring-primary"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase opacity-50 tracking-widest">Ganhos Totais (Sobrescrita Manual)</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-primary" />
                  <Input 
                    type="number"
                    placeholder="Ex: 13501"
                    value={manualTotal}
                    onChange={(e) => setTotalOverwrite(e.target.value)}
                    className="bg-white/5 border-white/10 rounded-xl h-12 pl-10 focus-visible:ring-primary font-bold text-lg"
                  />
                </div>
                <p className="text-[8px] text-muted-foreground uppercase font-medium">Este valor aparecerá no placar principal do dashboard.</p>
              </div>

              <Button 
                onClick={handleGenerateRandom}
                variant="outline"
                className="w-full h-12 border-primary/30 text-primary hover:bg-primary/10 rounded-xl font-black uppercase tracking-widest text-[10px]"
              >
                <RefreshCcw className="h-3.5 w-3.5 mr-2" /> Gerar Aleatório (30 Dias)
              </Button>
            </div>

            <DialogFooter className="flex flex-col sm:flex-row gap-2">
              <Button 
                variant="ghost" 
                onClick={handleResetSimulation}
                disabled={updatingId === simulationUser?.id}
                className="flex-1 h-12 text-destructive hover:bg-destructive/10 rounded-xl font-black uppercase tracking-widest text-[10px]"
              >
                <Trash2 className="h-3.5 w-3.5 mr-2" /> Zerar Tudo
              </Button>
              <Button 
                onClick={handleSaveSimulation}
                disabled={updatingId === simulationUser?.id}
                className="flex-[2] h-12 bg-primary hover:bg-primary/90 rounded-xl font-black uppercase tracking-widest shadow-lg shadow-primary/20"
              >
                {updatingId === simulationUser?.id ? <Loader2 className="h-4 w-4 animate-spin" /> : "SALVAR ALTERAÇÕES"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Notificação de Teste (Admin Only) */}
        {testNotification && (
          <div className="fixed top-6 right-6 z-[200] animate-in slide-in-from-right-4 duration-500">
            <div className="bg-[#0a0a0f] border border-green-500/40 rounded-2xl p-4 shadow-[0_0_40px_rgba(34,197,94,0.2)] flex items-center gap-4 min-w-[280px]">
              <div className="h-12 w-12 bg-green-500/20 rounded-xl flex items-center justify-center shrink-0">
                <span className="text-2xl">💸</span>
              </div>
              <div className="flex-1">
                <p className="text-[10px] font-black uppercase tracking-widest text-green-400">Pix Recorrência</p>
                <p className="text-2xl font-black italic text-white tracking-tighter">R$ 197</p>
                <p className="text-[9px] text-white/40 uppercase font-bold">Teste de Sistema OK</p>
              </div>
              <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.8)]"></div>
            </div>
          </div>
        )}
      </div>
    </SidebarProvider>
  );
}
