"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Zap, Loader2, ShieldCheck, Lock } from 'lucide-react';
import { useAuth, useFirestore } from '@/firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const auth = useAuth();
  const db = useFirestore();
  const router = useRouter();
  const { toast } = useToast();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
        router.push('/dashboard');
      } else {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        await updateProfile(user, { displayName: name });

        // Criar perfil do usuário como PENDENTE e SEM PLANO
        await setDoc(doc(db, 'users', user.uid), {
          id: user.uid,
          email: user.email,
          name: name || email.split('@')[0],
          status: 'pending',
          plan: 'nenhum',
          dailyUsage: {
            leadsUsed: 0,
            messagesUsed: 0
          },
          createdAt: serverTimestamp(),
          isOnboarded: false
        });

        toast.success("Solicitação Enviada!", "Seu cadastro foi enviado para análise manual do mestre.");
        router.push('/dashboard');
      }
    } catch (error: any) {
      toast.error("Erro na Autenticação", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-transparent flex flex-col items-center justify-center p-4 relative z-10">
      <Card className="w-full max-w-md glass-card border-white/10 relative z-10 rounded-[2rem] overflow-hidden">
        <CardHeader className="space-y-1 text-center p-8 bg-white/5 border-b border-white/5">
          <div className="flex justify-center mb-4">
            <Zap className="h-10 w-10 text-primary animate-pulse" />
          </div>
          <CardTitle className="text-2xl font-black italic uppercase tracking-tighter">
            {isLogin ? 'Bem-vindo ao FlowPro' : 'Solicitar Acesso'}
          </CardTitle>
          <CardDescription className="text-muted-foreground uppercase text-[10px] font-bold tracking-[0.2em]">
            {isLogin ? 'Acesse sua conta de operador' : 'O acesso é restrito e sujeito a aprovação'}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 p-8">
          <form onSubmit={handleAuth} className="space-y-4">
            {!isLogin && (
              <div className="space-y-2 animate-in fade-in slide-in-from-top-2">
                <Label className="text-[10px] font-black uppercase tracking-widest opacity-70">Seu Nome</Label>
                <Input 
                  placeholder="Como quer ser chamado" 
                  className="bg-white/5 border-white/10 rounded-xl h-12"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            )}
            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase tracking-widest opacity-70">Email Profissional</Label>
              <Input 
                type="email" 
                placeholder="seu@email.com" 
                className="bg-white/5 border-white/10 rounded-xl h-12"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase tracking-widest opacity-70">Senha</Label>
              <Input 
                type="password" 
                className="bg-white/5 border-white/10 rounded-xl h-12"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {isLogin && (
              <div className="flex items-center justify-between pb-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="remember" className="border-white/20" />
                  <label htmlFor="remember" className="text-[9px] font-black uppercase tracking-widest opacity-50 cursor-pointer">Lembrar acesso</label>
                </div>
                <button type="button" className="text-[9px] font-black uppercase tracking-widest text-primary/60 hover:text-primary transition-colors">Esqueci a senha</button>
              </div>
            )}
            
            <Button className="w-full bg-primary hover:bg-primary/90 h-14 font-black uppercase tracking-widest rounded-xl shadow-lg shadow-primary/20 transition-all active:scale-[0.98]" disabled={isLoading}>
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : isLogin ? 'ENTRAR' : 'SOLICITAR ACESSO'}
            </Button>
          </form>

          {!isLogin ? (
            <div className="flex items-center gap-2 p-3 rounded-lg bg-primary/5 border border-primary/10 text-[10px] font-bold text-primary uppercase text-center justify-center">
              <ShieldCheck className="h-3 w-3" /> Liberação manual em até 24h
            </div>
          ) : (
            <div className="flex items-center gap-2 p-3 rounded-lg bg-white/5 border border-white/10 text-[9px] font-bold text-muted-foreground uppercase text-center justify-center">
              <Lock className="h-3 w-3" /> Acesso restrito a membros aprovados
            </div>
          )}

          <div className="text-center mt-4">
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="text-[10px] font-black uppercase tracking-widest text-primary hover:underline transition-all"
            >
              {isLogin ? 'Não tem conta? Peça acesso' : 'Já tem conta? Faça Login'}
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
