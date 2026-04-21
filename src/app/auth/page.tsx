
"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Zap, Loader2, ShieldCheck, Lock, ShieldAlert } from 'lucide-react';
import { useAuth, useFirestore, useUser } from '@/firebase';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  updateProfile,
  setPersistence,
  browserLocalPersistence,
  browserSessionPersistence
} from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  
  const auth = useAuth();
  const db = useFirestore();
  const { user, isUserLoading } = useUser();
  const router = useRouter();
  const { toast } = useToast();

  // Redireciona automaticamente se já estiver logado
  useEffect(() => {
    if (!isUserLoading && user) {
      router.push('/dashboard');
    }
  }, [user, isUserLoading, router]);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // Configura a persistência antes do login
      // browserLocalPersistence = Mantém logado mesmo fechando o navegador
      // browserSessionPersistence = Desloga ao fechar a aba
      await setPersistence(auth, rememberMe ? browserLocalPersistence : browserSessionPersistence);

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

  if (isUserLoading) {
    return (
      <div className="min-h-screen bg-transparent flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-transparent flex flex-col items-center justify-center p-4 relative z-10">
      <Card className="w-full max-w-md glass-card border-white/10 relative z-10 rounded-[2.5rem] overflow-hidden shadow-[0_0_100px_rgba(124,58,237,0.15)]">
        <CardHeader className="space-y-1 text-center p-8 bg-white/5 border-b border-white/5">
          <div className="flex justify-center mb-4">
            <Zap className="h-12 w-12 text-primary animate-pulse" style={{ willChange: 'transform' }} />
          </div>
          <CardTitle className="text-3xl font-black italic uppercase tracking-tighter">
            {isLogin ? 'BEM-VINDO AO FLOWPRO' : 'SOLICITAR ACESSO'}
          </CardTitle>
          <CardDescription className="text-muted-foreground uppercase text-[10px] font-bold tracking-[0.25em]">
            {isLogin ? 'ACESSE SUA CONTA DE OPERADOR' : 'O ACESSO É RESTRITO E SUJEITO A APROVAÇÃO'}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 p-8">
          
          {!isLogin && (
            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-3 animate-in fade-in slide-in-from-top-2">
              <ShieldAlert className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="text-[10px] font-black uppercase text-amber-500 tracking-widest">Protocolo de Auditoria</p>
                <p className="text-[11px] text-white/60 font-medium leading-relaxed italic">
                  Sua conta será criada como <span className="text-white font-bold">PENDENTE</span>. O acesso só será liberado após autorização manual do administrador.
                </p>
              </div>
            </div>
          )}

          <form onSubmit={handleAuth} className="space-y-4">
            {!isLogin && (
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-widest opacity-70">Seu Nome</Label>
                <Input 
                  placeholder="Como quer ser chamado?" 
                  className="bg-white/5 border-white/10 h-12 rounded-xl focus-visible:ring-primary"
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
                className="bg-white/5 border-white/10 h-12 rounded-xl focus-visible:ring-primary"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase tracking-widest opacity-70">Senha</Label>
              <Input 
                type="password" 
                placeholder="••••••••"
                className="bg-white/5 border-white/10 h-12 rounded-xl focus-visible:ring-primary"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {isLogin && (
              <div className="flex items-center justify-between pb-2">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="remember" 
                    className="border-white/20" 
                    checked={rememberMe}
                    onCheckedChange={(checked) => setRememberMe(!!checked)}
                  />
                  <label htmlFor="remember" className="text-[9px] font-black uppercase tracking-widest opacity-50 cursor-pointer">Lembrar acesso</label>
                </div>
                <button type="button" className="text-[9px] font-black uppercase tracking-widest text-primary/60 hover:text-primary transition-colors">Esqueci a senha</button>
              </div>
            )}
            
            <Button className="w-full bg-primary hover:bg-primary/90 h-14 font-black uppercase tracking-widest rounded-xl shadow-lg shadow-primary/20 transition-all active:scale-[0.98] mt-4" disabled={isLoading}>
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : isLogin ? 'ENTRAR' : 'ENVIAR SOLICITAÇÃO'}
            </Button>
          </form>

          {isLogin ? (
            <div className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10 text-[10px] font-bold text-muted-foreground uppercase text-center justify-center">
              <Lock className="h-4 w-4 text-primary/40" /> Acesso restrito a membros aprovados
            </div>
          ) : (
            <div className="flex items-center gap-3 p-4 rounded-xl bg-primary/10 border border-primary/30 text-[10px] font-bold text-primary uppercase text-center justify-center">
              <ShieldCheck className="h-4 w-4" /> Liberação manual em até 24h
            </div>
          )}

          <div className="text-center pt-4 border-t border-white/5">
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="group text-[10px] font-black uppercase tracking-[0.2em] transition-all hover:scale-105 active:scale-95"
            >
              <span className="text-white/40 group-hover:text-white/60 transition-colors">
                {isLogin ? 'NÃO TEM CONTA? ' : 'JÁ TEM CONTA? '}
              </span>
              <span className="text-primary group-hover:text-primary/80 transition-colors underline underline-offset-8 decoration-primary/30 font-black">
                {isLogin ? 'PEÇA ACESSO' : 'FAÇA LOGIN'}
              </span>
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
