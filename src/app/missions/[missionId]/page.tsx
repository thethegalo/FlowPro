
"use client";

import { useState } from 'react';
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
  TrendingUp,
  Zap,
  Loader2,
  DollarSign
} from 'lucide-react';
import { useUser, useFirestore } from '@/firebase';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';

const MISSION_CONTENT = {
  'dia1': {
    title: 'DIA 1: A Oferta de Ouro',
    desc: 'O primeiro passo é definir um produto de alta demanda e seu script de ataque.',
    stats: [
      { label: 'O Que Vender', value: 'SaaS / Gestão para Negócios Locais', icon: <Target className="h-4 w-4" /> },
      { label: 'Valor Médio', value: 'R$ 497,00', icon: <DollarSign className="h-4 w-4" /> },
    ],
    instructions: [
      'Escolha um comércio que não tenha automação de mensagens.',
      'Identifique o dono pelo Instagram ou Google Maps.',
      'Prepare seu script Alpha de contato inicial.'
    ],
    script: "Olá [Nome], vi seu trabalho no [Comércio]. Percebi que vocês estão perdendo vendas por falta de automação rápida. Fiz um protótipo de como vocês podem recuperar 30% das vendas perdidas. Teria 2 min para eu te mostrar como funciona?",
    cta: 'Envie para 15 leads hoje'
  },
  'dia2': {
    title: 'DIA 2: Atração Alpha',
    desc: 'Vamos encontrar clientes qualificados que já estão prontos para comprar.',
    stats: [
      { label: 'Fonte', value: 'Instagram & Google Maps', icon: <Target className="h-4 w-4" /> },
      { label: 'Meta Diária', value: '25 Contatos Qualificados', icon: <Zap className="h-4 w-4" /> },
    ],
    instructions: [
      'Pesquise por "Restaurantes" ou "Clínicas" na sua cidade.',
      'Abra o Instagram deles e veja se postam stories.',
      'Se não postam há tempo, eles precisam da sua solução urgente.'
    ],
    script: "Percebi que seu perfil está um pouco parado! Sabia que o Instagram entrega 3x mais para quem usa nossa estratégia Alpha? Posso te mandar os resultados de quem já aplicou?",
    cta: 'Mapeie 25 potenciais clientes'
  },
  'dia3': {
    title: 'DIA 3: Fechamento Brutal',
    desc: 'Hora de transformar conversa em dinheiro no bolso com técnicas Alpha.',
    stats: [
      { label: 'Foco', value: 'Quebra de Objeções', icon: <Target className="h-4 w-4" /> },
      { label: 'Meta Final', value: '1 Venda Concluída', icon: <DollarSign className="h-4 w-4" /> },
    ],
    instructions: [
      'Se disserem "está caro", foque no retorno sobre o investimento.',
      'Ofereça um bônus de implementação rápida.',
      'Use o script de fechamento abaixo para selar o acordo.'
    ],
    script: "Entendo o investimento. Mas se pensarmos que com apenas 1 novo cliente o sistema já se paga, faz sentido começarmos agora para você não perder mais vendas essa semana?",
    cta: 'Feche seu primeiro contrato'
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
    setTimeout(() => setCopied(false), 2000);
    toast({ title: "Script Copiado!", description: "Personalize antes de enviar." });
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
        lastActivityAt: serverTimestamp()
      }, { merge: true });

      toast({ title: "Missão Concluída!", description: "Parabéns Alpha! Próximo nível liberado." });
      router.push('/dashboard');
    } catch (error: any) {
      toast({ variant: "destructive", title: "Erro", description: error.message });
      setIsSubmitting(false);
    }
  };

  if (!content) return <div className="p-20 text-center">Missão não encontrada</div>;

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
          <Badge className="bg-primary/20 text-primary border border-primary/30 uppercase tracking-widest text-[10px]">EXECUÇÃO AGORA</Badge>
          <h2 className="text-4xl font-black italic uppercase leading-none">{content.title}</h2>
          <p className="text-muted-foreground">{content.desc}</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {content.stats.map((stat, i) => (
            <Card key={i} className="glass-card border-white/10 p-4 flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-xl text-primary">{stat.icon}</div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest opacity-50">{stat.label}</p>
                <p className="font-bold text-sm italic">{stat.value}</p>
              </div>
            </Card>
          ))}
        </div>

        <Card className="glass-card border-white/10 overflow-hidden">
          <CardHeader className="bg-white/5 border-b border-white/5">
            <CardTitle className="text-sm font-black uppercase tracking-widest italic">Script Alpha Pronto</CardTitle>
            <CardDescription>Copie e adapte para seu cliente</CardDescription>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <div className="bg-black/40 p-5 rounded-2xl border border-white/5 text-sm leading-relaxed italic text-muted-foreground">
              {content.script}
            </div>
            <Button onClick={handleCopy} className="w-full h-12 rounded-xl bg-white text-black font-black uppercase tracking-widest hover:bg-primary hover:text-white transition-all">
              {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
              {copied ? 'COPIADO' : 'COPIAR SCRIPT'}
            </Button>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <h3 className="text-lg font-black italic uppercase tracking-tighter">Plano de Ação</h3>
          <ul className="space-y-4">
            {content.instructions.map((inst, i) => (
              <li key={i} className="flex gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                <span className="text-primary font-black text-xl italic leading-none">{i + 1}</span>
                <span className="text-sm text-muted-foreground leading-relaxed">{inst}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="pt-8 pb-12">
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
          <p className="text-[10px] text-center mt-4 text-muted-foreground uppercase font-bold tracking-[0.2em] animate-pulse">
            Próximo passo: {content.cta}
          </p>
        </div>
      </main>
    </div>
  );
}
