"use client";

import { useUser, useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Users, BarChart3, Target, Loader2, ArrowLeft, ShieldAlert } from 'lucide-react';
import Link from 'next/link';
import { collection, query } from 'firebase/firestore';

export default function AdminPage() {
  const { user, isUserLoading } = useUser();
  const db = useFirestore();
  const router = useRouter();

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

  if (isUserLoading || isUsersLoading) {
    return (
      <div className="min-h-screen bg-[#050508] flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (user?.email !== ADMIN_EMAIL) {
    return (
      <div className="min-h-screen bg-[#050508] flex items-center justify-center p-4">
        <Card className="glass-card border-destructive/20 max-w-md w-full p-8 text-center space-y-4">
          <ShieldAlert className="h-12 w-12 text-destructive mx-auto" />
          <h1 className="text-xl font-black uppercase italic tracking-tighter">Acesso Negado</h1>
          <p className="text-muted-foreground text-sm">Apenas administradores podem visualizar esta área.</p>
          <Button asChild variant="outline" className="w-full">
            <Link href="/dashboard">Voltar para o Painel</Link>
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050508] p-4 md:p-8">
      <div className="container max-w-6xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="text-muted-foreground hover:text-white transition-colors">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <h1 className="text-3xl font-black italic uppercase tracking-tighter">Admin Control</h1>
          </div>
          <Badge className="bg-primary/20 text-primary uppercase tracking-widest px-4 py-1">ADMIN: {user.email}</Badge>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card className="glass-card border-white/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-[10px] font-black uppercase tracking-widest opacity-70 flex items-center gap-2">
                <Users className="h-4 w-4" /> Total Leads
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-black italic">{usersData?.length || 0}</div>
            </CardContent>
          </Card>
          <Card className="glass-card border-white/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-[10px] font-black uppercase tracking-widest opacity-70 flex items-center gap-2">
                <BarChart3 className="h-4 w-4" /> Conversão
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-black italic">-- %</div>
            </CardContent>
          </Card>
          <Card className="glass-card border-white/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-[10px] font-black uppercase tracking-widest opacity-70 flex items-center gap-2">
                <Target className="h-4 w-4" /> Ativos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-black italic">0</div>
            </CardContent>
          </Card>
        </div>

        <Card className="glass-card border-white/10">
          <CardHeader>
            <CardTitle className="text-sm font-black uppercase tracking-widest italic">Lista de Usuários Recentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border border-white/5 overflow-hidden">
              <Table>
                <TableHeader className="bg-white/5">
                  <TableRow className="border-white/5 hover:bg-transparent">
                    <TableHead className="text-muted-foreground text-[10px] uppercase font-black">ID / Nome</TableHead>
                    <TableHead className="text-muted-foreground text-[10px] uppercase font-black">Email</TableHead>
                    <TableHead className="text-muted-foreground text-[10px] uppercase font-black">Status</TableHead>
                    <TableHead className="text-muted-foreground text-[10px] uppercase font-black">Data</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {usersData?.map((u) => (
                    <TableRow key={u.id} className="border-white/5 hover:bg-white/[0.02]">
                      <TableCell className="font-bold text-xs">{u.name || u.id}</TableCell>
                      <TableCell className="text-muted-foreground text-xs">{u.email}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-[8px] uppercase font-black border-white/10">
                          {u.isOnboarded ? 'ONBOARDED' : 'PENDENTE'}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground text-xs">{u.createdAt ? new Date(u.createdAt).toLocaleDateString() : 'N/A'}</TableCell>
                    </TableRow>
                  ))}
                  {(!usersData || usersData.length === 0) && (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center py-10 text-muted-foreground italic">Nenhum usuário encontrado</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

import { Button } from '@/components/ui/button';
