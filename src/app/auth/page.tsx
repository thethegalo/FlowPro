
"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Zap, Github, Mail, Loader2 } from 'lucide-react';
import { useAuth } from '@/firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signInAnonymously } from 'firebase/auth';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const auth = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
      router.push('/quiz');
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Authentication Error",
        description: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAnonymous = async () => {
    setIsLoading(true);
    try {
      await signInAnonymously(auth);
      router.push('/quiz');
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Guest Error",
        description: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050508] flex items-center justify-center p-4">
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-primary/10 rounded-full blur-[140px]"></div>
      </div>

      <Card className="w-full max-w-md glass-card border-white/10 relative z-10">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-4">
            <Zap className="h-10 w-10 text-primary animate-pulse" />
          </div>
          <CardTitle className="text-2xl font-black italic uppercase tracking-tighter">
            {isLogin ? 'Bem-vindo ao FlowPro' : 'Criar sua conta Alpha'}
          </CardTitle>
          <CardDescription className="text-muted-foreground uppercase text-[10px] font-bold tracking-[0.2em]">
            O seu futuro nas vendas começa agora
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleAuth} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-[10px] font-black uppercase tracking-widest opacity-70">Email</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="nome@exemplo.com" 
                className="bg-white/5 border-white/10 rounded-xl"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-[10px] font-black uppercase tracking-widest opacity-70">Senha</Label>
              <Input 
                id="password" 
                type="password" 
                className="bg-white/5 border-white/10 rounded-xl"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button className="w-full bg-primary hover:bg-primary/90 h-12 font-black uppercase tracking-widest rounded-xl" disabled={isLoading}>
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : isLogin ? 'ENTRAR' : 'CADASTRAR'}
            </Button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-white/10" />
            </div>
            <div className="relative flex justify-center text-xs uppercase font-black tracking-widest">
              <span className="bg-[#050508] px-2 text-muted-foreground">Ou continue com</span>
            </div>
          </div>

          <Button variant="outline" className="w-full border-white/10 hover:bg-white/5 h-12 font-black uppercase tracking-widest rounded-xl" onClick={handleAnonymous} disabled={isLoading}>
            MODO CONVIDADO (GUEST)
          </Button>

          <div className="text-center mt-4">
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="text-[10px] font-black uppercase tracking-widest text-primary hover:underline"
            >
              {isLogin ? 'Não tem conta? Cadastre-se' : 'Já tem conta? Faça Login'}
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
