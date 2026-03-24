
"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Zap, Loader2, ShieldCheck, Smartphone } from 'lucide-react';
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

        // Atualizar perfil do Auth para garantir que user.displayName funcione
        await updateProfile(user, { displayName: name });

        // Recuperar dados do quiz temporários
        const tempQuiz = sessionStorage.getItem('temp_quiz');
        const tempPlan = sessionStorage.getItem('temp_plan');

        // Criar perfil do usuário como PENDENTE e plano inicial
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
          isOnboarded: !!tempQuiz
        });

        if (tempQuiz && tempPlan) {
          const answers = JSON.parse(tempQuiz);
          const plan = JSON.parse(tempPlan);

          await setDoc(doc(db, 'users', user.uid, 'quizResponses', 'initial'), {
            userId: user.uid,
            responses: answers,
            completedAt: serverTimestamp()
          });

          await setDoc(doc(db, 'users', user.uid, 'personalizedPlans', 'active'), {
            userId: user.uid,
            strategy: plan?.[0]?.title || "Estratégia Flow",
            fullPlan: plan || [],
            generatedAt: serverTimestamp()
          });
        }

        toast({ title: "Conta Criada!", description: "Sua solicitação de acesso foi enviada para análise." });
        router.push('/dashboard');
      }
    } catch (error: any) {
      toast({ variant: "destructive", title: "Erro na Autenticação", description: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050508] flex flex-col items-center justify-center p-4">
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-primary/10 rounded-full blur-[140px]"></div>
      </div>

      <Card className="w-full max-w-md glass-card border-white/10 relative z-10 rounded-[2rem] overflow-hidden">
        <CardHeader className="space-y-1 text-center p-8 bg-white/5 border-b border-white/5">
          <div className="flex justify-center mb-4">
            <Zap className="h-10 w-10 text-primary animate-pulse" />
          </div>
          <CardTitle className="text-2xl font-black italic uppercase tracking-tighter">
            {isLogin ? 'Bem-vindo ao FlowPro' : 'Finalizar seu Cadastro'}
          </CardTitle>
          <CardDescription className="text-muted-foreground uppercase text-[10px] font-bold tracking-[0.2em]">
            {isLogin ? 'O seu futuro nas vendas continua aqui' : 'Crie sua conta para solicitar acesso'}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 p-8">
          <form onSubmit={handleAuth} className="space-y-4">
            {!isLogin && (
              <div className="space-y-2 animate-in fade-in slide-in-from-top-2">
                <Label className="text-[10px] font-black uppercase tracking-widest opacity-70">Nome Completo</Label>
                <Input 
                  placeholder="Seu nome" 
                  className="bg-white/5 border-white/10 rounded-xl h-12"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            )}
            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase tracking-widest opacity-70">Email</Label>
              <Input 
                type="email" 
                placeholder="nome@exemplo.com" 
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

            <div className="flex items-center justify-between pb-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="remember" className="border-white/20" />
                <label htmlFor="remember" className="text-[9px] font-black uppercase tracking-widest opacity-50 cursor-pointer">Lembrar acesso</label>
              </div>
              <button type="button" className="text-[9px] font-black uppercase tracking-widest text-primary/60 hover:text-primary transition-colors">Esqueci a senha</button>
            </div>
            
            <Button className="w-full bg-primary hover:bg-primary/90 h-14 font-black uppercase tracking-widest rounded-xl shadow-lg shadow-primary/20 transition-all active:scale-[0.98]" disabled={isLoading}>
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : isLogin ? 'ENTRAR' : 'SOLICITAR ACESSO'}
            </Button>
          </form>

          {!isLogin && (
            <div className="flex items-center gap-2 p-3 rounded-lg bg-primary/5 border border-primary/10 text-[10px] font-bold text-primary uppercase text-center justify-center">
              <ShieldCheck className="h-3 w-3" /> Acesso sujeito a aprovação manual
            </div>
          )}

          <div className="text-center mt-4">
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="text-[10px] font-black uppercase tracking-widest text-primary hover:underline transition-all"
            >
              {isLogin ? 'Não tem conta? Cadastre-se' : 'Já tem conta? Faça Login'}
            </button>
          </div>

          <div className="text-center mt-8 pt-6 border-t border-white/5">
            <p className="text-[8px] font-black text-muted-foreground uppercase tracking-widest mb-3">Versão Mobile Disponível</p>
            <Button variant="outline" size="sm" className="h-10 rounded-xl border-white/10 text-[9px] font-black uppercase tracking-widest gap-2 w-full hover:bg-white/5">
              <Smartphone className="h-3.5 w-3.5" /> BAIXAR FLOWPRO APP
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
