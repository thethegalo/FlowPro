
"use client";

import { useState, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft, 
  Copy, 
  Check, 
  CheckCircle2, 
  Target, 
  MessageSquare, 
  TrendingUp,
  Zap,
  Loader2
} from 'lucide-react';
import { useUser, useFirestore } from '@/firebase';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';

const MISSION_CONTENT = {
  'dia1': {
    title: 'DIA 1: O Que Vender',
    desc: 'O primeiro passo é definir seu produto e sua abordagem.',
    steps: [
      { icon: <Target className="h-5 w-5" />, label: 'O Que Vender', value: 'SaaS de Automação para Empresas Locais' },
      { icon: <TrendingUp className="h-5 w-5" />, label: 'Preço Sugerido', value: 'R$ 497,00 / único' },
    ],
    instructions: [
      'Escolha um comércio local que não tenha site ou automação.',
      'Identifique o dono ou tomador de decisão.',
      'Prepare-se para enviar a mensagem inicial.'
    ],
    script: "Olá [Nome], vi que vocês estão fazendo um trabalho incrível no [Nome do Comércio]. Percebi um detalhe que pode estar fazendo vocês perderem clientes para a concorrência que já usa automação. Teria 2 minutos para eu te mostrar como resolver isso rápido?",
    cta: 'Envie para 10 pessoas hoje'
  },
  'dia2': {
    title: 'DIA 2: Onde Encontrar Clientes',
    desc: 'Agora vamos prospectar nos canais certos.',
    steps: [
      { icon: <MessageSquare className="h-5 w-5" />, label: 'Canal Principal', value: 'Instagram & Google Maps' },
      { icon: <Zap className="h-5 w-5" />, label: 'Volume Alvo', value: '25 contatos qualificados' },
    ],
    instructions: [
      'Use o Google Maps para pesquisar "Restaurantes" ou "Clínicas" na sua região.',
      'Encontre o perfil no Instagram e veja se postam com frequência.',
      'Se não postam há mais de 1 semana, eles precisam de ajuda urgente.'
    ],
    script: "Vi que o perfil de vocês está um pouco parado! Sabia que o Instagram entrega 4x mais para contas que usam nossa automação Alpha? Posso te mandar os resultados de quem já usa?",
    cta: 'Liste 25 potenciais clientes'
  },
  'dia3': {
    title: 'DIA 3: Fechamento Alpha',
    desc: 'Hora de converter contatos em dinheiro no bolso.',
    steps: [
      { icon: <CheckCircle2 className="h-5 w-5" />, label: 'Foco do Dia', value: 'Quebra de Objeções' },
      { icon: <Zap className="h-5 w-5" />, label: 'Conversão Alvo', value: '1 Venda Fechada' },
    ],
    instructions: [
      'Quando disserem "está caro", responda com o ROI esperado.',
      'Ofereça um bônus de implementação imediata.',
      'Use o script de fechamento abaixo para selar o acordo.'
    ],
    script: "Entendo perfeitamente o investimento. Mas se pensarmos que com apenas 1 novo cliente que o sistema trouxer você já paga o ano todo, faz sentido começarmos agora para você não perder mais vendas essa semana?",
    cta: 'Feche sua primeira venda'
  }
};

export default function MissionPage() {
  const params = useParams();
  const missionId = params.missionId as string;
  const content = MISSION_CONTENT[missionId as keyof typeof MISSION_CONTENT];
  const { user } = useUser();
  const db = useFirestore();
  const { toast } = useToast();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (!content) return;
    navigator.clipboard.writeText(content.script);
    setCopied(true);
    setTimeout(() => setCopied(null), 2000);
    toast({ title: "Script Copiado!", description: "Agora cole e personalize para seu cliente." });
  };

  const handleComplete = async () => {
    if (!user || !db || !content) return;
    setIsSubmitting(true);
    try {
      const progressRef = doc(db, 'users', user.uid, 'missionProgress', missionId);
      await setDoc(progressRef, {
        userId: user.uid,
        missionId,
        isCompleted: true,
        completedAt: serverTimestamp(),
        lastActivityAt: serverTimestamp(),
        currentMissionStepId: 'completed'
      }, { merge: true });

      toast({
        title: "Missão Concluída!",
        description: "Você subiu de nível. Próximo passo liberado!",
      });
      router.push('/dashboard');
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erro ao salvar",
        description: error.message,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!content) return <div>Missão não encontrada</div>;

  return (
    <div className="min-h-screen bg-[#050508] flex flex-col">
      <header className="px-4 h-16 flex items-center border-b border-white/5 bg-[#050508]/80 sticky top-0 z-50">
        <Link href="/dashboard" className="mr-4 text-muted-foreground hover:text-primary transition-colors">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <h1 className="text-xl font-black italic uppercase tracking-tighter">{content.title}</h1>
      </header>

      <main className="flex-1 container max-w-2xl mx-auto p-4 md:p-8 space-y-8">
        <div className="space-y-4">
          <Badge className="bg-primary/20 text-primary border border-primary/30 uppercase tracking-widest text-[10px]">EXECUTANDO AGORA</Badge>
          <h2 className="text-4xl font-black italic uppercase leading-none">{content.title}</h2>
          <p className="text-muted-foreground">{content.desc}</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {content.steps.map((step, i) => (
            <Card key={i} className="glass-card border-white/10 p-4 flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-xl text-primary">{step.icon}</div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest opacity-70">{step.label}</p>
                <p className="font-bold">{step.value}</p>
              </div>
            </Card>
          ))}
        </div>

        <Card className="glass-card border-white/10 overflow-hidden">
          <CardHeader className="bg-white/5">
            <CardTitle className="text-sm font-black uppercase tracking-widest italic">Script Pronto de Ataque</CardTitle>
            <CardDescription>Copie e adapte para suas necessidades</CardDescription>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <div className="bg-black/40 p-6 rounded-2xl border border-white/5 text-sm leading-relaxed italic text-muted-foreground">
              {content.script}
            </div>
            <Button onClick={handleCopy} className="w-full h-12 rounded-xl bg-white text-black font-black uppercase tracking-widest hover:bg-primary hover:text-white transition-all">
              {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
              {copied ? 'COPIADO' : 'COPIAR SCRIPT'}
            </Button>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <h3 className="text-lg font-black italic uppercase tracking-tighter">Instruções Práticas</h3>
          <ul className="space-y-3">
            {content.instructions.map((inst, i) => (
              <li key={i} className="flex gap-3 text-muted-foreground">
                <span className="text-primary font-black">{i + 1}.</span>
                <span className="text-sm">{inst}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="pt-8 sticky bottom-4">
          <Button 
            onClick={handleComplete} 
            disabled={isSubmitting}
            className="w-full h-20 rounded-3xl bg-primary text-xl font-black uppercase tracking-widest shadow-[0_10px_30px_rgba(139,92,246,0.3)] hover:scale-105 active:scale-95 transition-all"
          >
            {isSubmitting ? <Loader2 className="h-6 w-6 animate-spin" /> : (
              <span className="flex items-center gap-2">
                CONCLUIR MISSÃO <CheckCircle2 className="h-6 w-6" />
              </span>
            )}
          </Button>
          <p className="text-[10px] text-center mt-3 text-muted-foreground uppercase font-bold tracking-[0.2em]">
            Próximo passo: {content.cta}
          </p>
        </div>
      </main>
    </div>
  );
}
