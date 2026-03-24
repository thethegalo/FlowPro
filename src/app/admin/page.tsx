
"use client";

import { useUser, useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  Loader2, 
  CheckCircle2, 
  XCircle,
  Activity,
  UserCheck,
  Shield,
  Zap,
  Search,
  AlertCircle,
  Ban,
  Save,
  Infinity,
  CalendarDays
} from 'lucide-react';
import { collection, query, doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from '@/components/AppSidebar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function AdminPage() {
  const { user, isUserLoading } = useUser();
  const db = useFirestore();
  const router = useRouter();
  const { toast } = useToast();
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [plansToUpdate, setPlansToUpdate] = useState<Record<string, string>>({});

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

  const updateStatus = async (userId: string, newStatus: string) => {
    if (!db) return;
    setUpdatingId(userId);
    try {
      await updateDoc(doc(db, 'users', userId), { 
        status: newStatus,
        updatedAt: serverTimestamp()
      });
      toast({ title: "Status Atualizado", description: `Usuário agora está como ${newStatus}.` });
    } catch (error: any) {
      toast({ variant: "destructive", title: "Erro", description: error.message });
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
      toast({ title: "Plano Atualizado", description: "O acesso do usuário foi modificado com sucesso." });
    } catch (error: any) {
      toast({ variant: "destructive", title: "Erro", description: error.message });
    } finally {
      setUpdatingId(null);
    }
  };

  if (isUserLoading || isUsersLoading) {
    return (
      <div className="min-h-screen bg-[#050508] flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (user?.email !== ADMIN_EMAIL) return null;

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-[#050508]">
        <AppSidebar />
        
        <main className="flex-1 flex flex-col min-w-0">
          <header className="h-16 border-b border-white/5 flex items-center justify-between px-6 bg-[#050508]/80 backdrop-blur-md sticky top-0 z-50">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="text-muted-foreground hover:text-white" />
              <div className="h-4 w-px bg-white/10 hidden md:block" />
              <h1 className="text-sm font-black italic uppercase tracking-widest flex items-center gap-2">
                <Shield className="h-4 w-4 text-primary" /> Flow Command
              </h1>
            </div>
            <Badge className="bg-primary/20 text-primary uppercase tracking-widest px-4 py-1 border-primary/30 text-[8px] font-black">ADMIN MASTER</Badge>
          </header>

          <div className="flex-1 p-4 md:p-8 space-y-8 container max-w-6xl mx-auto">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card className="glass-card border-white/10 p-6 flex flex-col items-center justify-center text-center">
                <span className="text-[8px] font-black uppercase tracking-widest opacity-50 mb-1">Total Usuários</span>
                <div className="text-3xl font-black italic">{usersData?.length || 0}</div>
              </Card>
              <Card className="glass-card border-white/10 p-6 flex flex-col items-center justify-center text-center">
                <span className="text-[8px] font-black uppercase tracking-widest opacity-50 mb-1">Aguardando</span>
                <div className="text-3xl font-black italic text-yellow-500">
                  {usersData?.filter(u => u.status === 'pending').length || 0}
                </div>
              </Card>
              <Card className="glass-card border-white/10 p-6 flex flex-col items-center justify-center text-center">
                <span className="text-[8px] font-black uppercase tracking-widest opacity-50 mb-1">Aprovados</span>
                <div className="text-3xl font-black italic text-green-500">
                  {usersData?.filter(u => u.status === 'approved').length || 0}
                </div>
              </Card>
              <Card className="glass-card border-white/10 p-6 flex flex-col items-center justify-center text-center">
                <span className="text-[8px] font-black uppercase tracking-widest opacity-50 mb-1">Bloqueados</span>
                <div className="text-3xl font-black italic text-destructive">
                  {usersData?.filter(u => u.status === 'blocked').length || 0}
                </div>
              </Card>
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
                              <Select 
                                defaultValue={u.plan || 'nenhum'} 
                                onValueChange={(val) => setPlansToUpdate(prev => ({ ...prev, [u.id]: val }))}
                              >
                                <SelectTrigger className="h-8 w-[120px] bg-white/5 border-white/10 text-[9px] font-black uppercase">
                                  <SelectValue placeholder="Plano" />
                                </SelectTrigger>
                                <SelectContent className="bg-[#0b0b14] border-white/10 text-white">
                                  <SelectItem value="nenhum" className="text-[10px] font-black uppercase">Nenhum</SelectItem>
                                  <SelectItem value="mensal" className="text-[10px] font-black uppercase flex items-center gap-2">
                                    <CalendarDays className="h-3 w-3 inline mr-1" /> Mensal
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
                            {u.status === 'blocked' && (
                              <Button 
                                size="sm" 
                                variant="outline" 
                                disabled={updatingId === u.id}
                                onClick={() => updateStatus(u.id, 'pending')}
                                className="h-8 px-3 rounded-lg text-[9px] font-black uppercase tracking-widest text-yellow-500 hover:bg-yellow-500/10 border-yellow-500/20"
                              >
                                REVERTER
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
      </div>
    </SidebarProvider>
  );
}
