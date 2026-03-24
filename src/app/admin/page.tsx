
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
  TrendingUp,
  UserCheck,
  CreditCard,
  Shield,
  Activity,
  Zap,
  Search
} from 'lucide-react';
import { collection, query, doc, setDoc, deleteDoc, serverTimestamp } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from '@/components/AppSidebar';

export default function AdminPage() {
  const { user, isUserLoading } = useUser();
  const db = useFirestore();
  const router = useRouter();
  const { toast } = useToast();
  const [updatingId, setUpdatingId] = useState<string | null>(null);

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

  const togglePayment = async (userId: string, currentStatus: boolean) => {
    if (!db) return;
    setUpdatingId(userId);
    try {
      const subRef = doc(db, 'users', userId, 'subscriptions', 'active');
      if (currentStatus) {
        await deleteDoc(subRef);
        await setDoc(doc(db, 'users', userId), { isOnboarded: false }, { merge: true });
        toast({ title: "Acesso Removido", description: "Usuário agora está como pendente." });
      } else {
        await setDoc(subRef, {
          userId,
          planType: 'lifetime_admin',
          status: 'active',
          startDate: serverTimestamp()
        });
        await setDoc(doc(db, 'users', userId), { isOnboarded: true }, { merge: true });
        toast({ title: "Acesso Liberado", description: "Usuário agora possui acesso total." });
      }
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

  const totalPaid = usersData?.filter(u => u.isOnboarded).length || 0;
  const conversionRate = usersData && usersData.length > 0 ? ((totalPaid / usersData.length) * 100).toFixed(1) : 0;

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
                <Shield className="h-4 w-4 text-primary" /> Flow Command (Admin)
              </h1>
            </div>
            <Badge className="bg-primary/20 text-primary uppercase tracking-widest px-4 py-1 border-primary/30 text-[8px] font-black">ADMIN LEVEL 10</Badge>
          </header>

          <div className="flex-1 p-4 md:p-8 space-y-8 container max-w-6xl mx-auto">
            {/* Status das APIs */}
            <div className="grid gap-4 md:grid-cols-2">
              <Card className="glass-card border-white/10 overflow-hidden rounded-2xl">
                <CardHeader className="pb-2 bg-white/5">
                  <CardTitle className="text-[10px] font-black uppercase tracking-widest opacity-70 flex items-center gap-2">
                    <Activity className="h-4 w-4 text-primary" /> Status do Motor Flow
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase text-muted-foreground flex items-center gap-2">
                      <Zap className="h-3 w-3" /> Motor Neural (Google AI)
                    </span>
                    <Badge variant="outline" className="text-[8px] font-black border-green-500/20 text-green-500 bg-green-500/5">ATIVO (CÓDIGO PRONTO)</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase text-muted-foreground flex items-center gap-2">
                      <Search className="h-3 w-3" /> Radar de Leads (Places API)
                    </span>
                    <Badge variant="outline" className="text-[8px] font-black border-green-500/20 text-green-500 bg-green-500/5">ATIVO (CÓDIGO PRONTO)</Badge>
                  </div>
                  <p className="text-[8px] text-muted-foreground italic mt-2 border-t border-white/5 pt-2">
                    Nota: Certifique-se de que as chaves GOOGLE_PLACES_API_KEY e GOOGLE_GENAI_API_KEY estão no seu .env
                  </p>
                </CardContent>
              </Card>

              <div className="grid grid-cols-3 gap-4">
                <Card className="glass-card border-white/10">
                  <CardContent className="p-4 flex flex-col items-center justify-center h-full text-center">
                    <span className="text-[8px] font-black uppercase tracking-widest opacity-50 mb-1">Leads</span>
                    <div className="text-2xl font-black italic">{usersData?.length || 0}</div>
                  </CardContent>
                </Card>
                <Card className="glass-card border-white/10">
                  <CardContent className="p-4 flex flex-col items-center justify-center h-full text-center">
                    <span className="text-[8px] font-black uppercase tracking-widest opacity-50 mb-1">Conv.</span>
                    <div className="text-2xl font-black italic text-primary">{conversionRate}%</div>
                  </CardContent>
                </Card>
                <Card className="glass-card border-white/10">
                  <CardContent className="p-4 flex flex-col items-center justify-center h-full text-center">
                    <span className="text-[8px] font-black uppercase tracking-widest opacity-50 mb-1">Pro</span>
                    <div className="text-2xl font-black italic">{totalPaid}</div>
                  </CardContent>
                </Card>
              </div>
            </div>

            <Card className="glass-card border-white/10 overflow-hidden rounded-[2rem]">
              <CardHeader className="bg-white/5 border-b border-white/5 p-6">
                <CardTitle className="text-sm font-black uppercase tracking-widest italic flex items-center gap-2">
                  <UserCheck className="h-4 w-4 text-primary" /> Gestão de Guerreiros Flow
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="rounded-md overflow-hidden">
                  <Table>
                    <TableHeader className="bg-white/5">
                      <TableRow className="border-white/5 hover:bg-transparent">
                        <TableHead className="text-muted-foreground text-[10px] uppercase font-black">Usuário</TableHead>
                        <TableHead className="text-muted-foreground text-[10px] uppercase font-black">Email</TableHead>
                        <TableHead className="text-muted-foreground text-[10px] uppercase font-black">Progresso</TableHead>
                        <TableHead className="text-muted-foreground text-[10px] uppercase font-black text-right">Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {usersData?.map((u) => (
                        <TableRow key={u.id} className="border-white/5 hover:bg-white/[0.02]">
                          <TableCell className="font-bold text-xs">{u.name || u.email?.split('@')[0]}</TableCell>
                          <TableCell className="text-muted-foreground text-xs">{u.email}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className={`text-[8px] uppercase font-black border-white/10 ${u.isOnboarded ? 'text-green-500 border-green-500/20' : ''}`}>
                              {u.isOnboarded ? 'FLOW ATIVO' : 'PENDENTE'}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button 
                              size="sm" 
                              variant="ghost"
                              disabled={updatingId === u.id}
                              onClick={() => togglePayment(u.id, !!u.isOnboarded)}
                              className={`h-8 px-3 rounded-lg text-[10px] font-black uppercase tracking-widest ${u.isOnboarded ? 'text-destructive hover:text-destructive' : 'text-primary hover:text-primary'}`}
                            >
                              {updatingId === u.id ? <Loader2 className="h-3 w-3 animate-spin" /> : u.isOnboarded ? <XCircle className="h-3 w-3 mr-1" /> : <CheckCircle2 className="h-3 w-3 mr-1" />}
                              {u.isOnboarded ? 'REVOGAR' : 'LIBERAR'}
                            </Button>
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
