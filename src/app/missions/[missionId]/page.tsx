"use client";

import { useState, useEffect } from 'react';
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
  Zap,
  Loader2,
  DollarSign,
  Users,
  Layout,
  MessageSquare,
  TrendingUp,
  Settings,
  Trophy
} from 'lucide-react';
import { useUser, useFirestore } from '@/firebase';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';

const MISSION_CONTENT = {
  'dia1': {
    title: 'DIA 1: Criar Oferta Flow',
    desc: 'O primeiro passo é definir um produto de alta demanda e seu roteiro de ataque.',
    stats: [
      { label: 'O Que Vender', value: 'SaaS / Gestão Local', icon: <Target className="h-4 w-4" /> },
      { label: 'Valor Sugerido', value: 'R$ 497,00', icon: <DollarSign className="h-4 w-4" /> },
    ],
    instructions: [
      'Escolha um nicho local que você conheça bem.',
      'Defina o benefício principal (ex: recuperar vendas perdidas).',
      'Escreva sua promessa irresistível.'
    ],
    script: "Olá! Notei que vocês estão com o atendimento um pouco lento hoje. Criei um fluxo Flow que recupera até 30% das vendas que vocês perdem por demora. Quer ver como funciona?",
    cta: 'Defina sua oferta agora'
  },
  'dia2': {
    title: 'DIA 2: Ajustar Perfil Flow',
    desc: 'Transforme seu Instagram em uma máquina de conversão.',
    stats: [
      { label: 'Foco', value: 'Autoridade & Bio', icon: <Layout className="h-4 w-4" /> },
      { label: 'Meta', value: 'Perfil Profissional', icon: <TrendingUp className="h-4 w-4" /> },
    ],
    instructions: [
      'Ajuste sua bio focada em resolver o problema do cliente.',
      'Destaque seus melhores serviços nos fixados.',
      'Use uma foto de perfil que transmita confiança.'
    ],
    script: "Link na Bio: Especialista em Recuperação de Vendas para [Nicho]. Clique para automatizar seu negócio.",
    cta: 'Atualize suas redes sociais'
  },
  'dia3': {
    title: 'DIA 3: Encontrar Leads',
    desc: 'Use nossa ferramenta de busca para achar clientes prontos para pagar.',
    stats: [
      { label: 'Meta', value: '25 Leads Qualificados', icon: <Users className="h-4 w-4" /> },
      { label: 'Ferramenta', value: 'Captador Flow', icon: <Zap className="h-4 w-4" /> },
    ],
    instructions: [
      'Acesse a ferramenta "Captar Leads" no dashboard.',
      'Busque por negócios no seu nicho escolhido.',
      'Mapeie 25 perfis que postam conteúdo regularmente.'
    ],
    script: "Use a IA Flow para gerar as mensagens de abordagem.",
    cta: 'Acesse o Captador de Leads'
  },
  'dia4': {
    title: 'DIA 4: Fazer Abordagem',
    desc: 'É hora de enviar as primeiras mensagens e gerar interesse real.',
    stats: [
      { label: 'Ação', value: '15 Envios Diretos', icon: <MessageSquare className="h-4 w-4" /> },
      { label: 'Meta', value: '5 Respostas', icon: <Zap className="h-4 w-4" /> },
    ],
    instructions: [
      'Envie as mensagens geradas pela IA para os leads mapeados.',
      'Personalize o início de cada mensagem com o nome do dono.',
      'Não tente vender ainda, foque em marcar uma conversa.'
    ],
    script: "Oi [Nome]! Vi que você é dono da [Empresa]. Gostei muito do seu perfil! Posso te mandar uma sugestão rápida de automação que vi que vocês ainda não usam?",
    cta: 'Envie para 15 leads hoje'
  },
  'dia5': {
    title: 'DIA 5: Conversar & Nutrir',
    desc: 'Tire as dúvidas dos interessados e mostre seu protótipo.',
    stats: [
      { label: 'Foco', value: 'Relacionamento', icon: <Users className="h-4 w-4" /> },
      { label: 'Meta', value: '2 Reuniões/Chamadas', icon: <MessageSquare className="h-4 w-4" /> },
    ],
    instructions: [
      'Responda rapidamente a todos que demonstraram interesse.',
      'Use o Mentor IA para ajudar com dúvidas técnicas.',
      'Envie um vídeo curto mostrando como sua solução funciona.'
    ],
    script: "Que bom que gostou! Gravei este vídeo de 1 min mostrando como o sistema Flow organiza seus leads automaticamente. O que achou?",
    cta: 'Responda todos os interessados'
  },
  'dia6': {
    title: 'DIA 6: Fechar Venda Flow',
    desc: 'Hora de transformar as conversas em dinheiro no bolso.',
    stats: [
      { label: 'Ação', value: 'Fechamento Brutal', icon: <DollarSign className="h-4 w-4" /> },
      { label: 'Meta', value: '1ª Venda Concluída', icon: <CheckCircle2 className="h-4 w-4" /> },
    ],
    instructions: [
      'Quebre as objeções finais com os scripts da biblioteca.',
      'Ofereça uma garantia de 7 dias para reduzir o risco.',
      'Envie o link de pagamento ou dados para PIX.'
    ],
    script: "Entendo o receio, por isso ofereço 7 dias de garantia. Se não ver o fluxo de clientes aumentar, devolvo seu investimento. Vamos começar?",
    cta: 'Feche seu primeiro contrato'
  },
  'dia7': {
    title: 'DIA 7: Escalar Fluxo',
    desc: 'Prepare-se para repetir o processo e escalar seus ganhos.',
    stats: [
      { label: 'Foco', value: 'Escalabilidade', icon: <Settings className="h-4 w-4" /> },
      { label: 'Meta', value: 'R$ 5.000/mês', icon: <TrendingUp className="h-4 w-4" /> },
    ],
    instructions: [
      'Analise quais leads responderam melhor.',
      'Configure automações simples para sua prospecção.',
      'Aumente o volume de abordagens diárias.'
    ],
    script: "O processo Flow é cíclico. Quanto mais você repete, mais você ganha.",
    cta: 'Escala ativada'
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
  const [showCelebration, setShowCelebration] = useState(false);

  const handleCopy = () => {
    if (!content) return;
    navigator.clipboard.writeText(content.script);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast({ title: "Script Copiado!", description: "Agora personalize e envie." });
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

      if (missionId === 'dia7') {
        setShowCelebration(true);
        toast({ title: "Jornada Concluída!", description: "Fase 1 Finalizada com sucesso!" });
      } else {
        toast({ title: "Missão Concluída!", description: "Parabéns Guerreiro Flow! Próximo nível liberado." });
        router.push('/dashboard');
      }
    } catch (error: any) {
      toast({ variant: "destructive", title: "Erro", description: error.message });
      setIsSubmitting(false);
    }
  };

  if (!content) return <div className="p-20 text-center text-muted-foreground font-black uppercase tracking-widest">Missão não encontrada</div>;

  if (showCelebration) {
    return (
      <div className="min-h-screen bg-[#050508] flex items-center justify-center p-6">
        <Card className="max-w-xl w-full bg-primary/10 border-primary/30 rounded-[2rem] p-12 text-center space-y-8 animate-in zoom-in duration-500">
           <div className="h-24 w-24 bg-primary rounded-full flex items-center justify-center mx-auto shadow-[0_0_50px_rgba(139,92,246,0.5)]">
             <Trophy className="h-12 w-12 text-white" />
           </div>
           <div className="space-y-4">
              <h2 className="text-4xl font-black italic uppercase tracking-tighter">PRIMEIRA VENDA CONCLUÍDA!</h2>
              <p className="text-muted-foreground uppercase text-[10px] font-bold tracking-widest">Você dominou a Fase 1 da Jornada Flow.</p>
           </div>
           <p className="text-white/80 font-medium leading-relaxed">
             Sua estrutura está pronta e sua primeira vitória foi alcançada. Agora o jogo muda. Para faturar alto e dominar seu nicho, você precisa da <strong>Escala Flow</strong>.
           </p>
           <Button asChild className="w-full h-16 rounded-2xl bg-primary text-lg font-black uppercase tracking-widest shadow-xl shadow-primary/30">
             <Link href="/dashboard">IR PARA ÁREA DE ESCALA</Link>
           </Button>
        </Card>
      </div>
    )
  }

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
          <Badge className="bg-primary/20 text-primary border border-primary/30 uppercase tracking-widest text-[10px] px-4 py-1.5">EXECUÇÃO IMEDIATA</Badge>
          <h2 className="text-4xl md:text-5xl font-black italic uppercase leading-none tracking-tighter">{content.title}</h2>
          <p className="text-muted-foreground text-lg">{content.desc}</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {content.stats.map((stat, i) => (
            <Card key={i} className={`p-6 flex items-center gap-4 border-white/5 ${i === 1 ? 'bg-primary/5 border-primary/20' : 'bg-white/[0.03]'}`}>
              <div className="p-3 bg-white/5 rounded-xl text-primary">{stat.icon}</div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest opacity-50">{stat.label}</p>
                <p className="font-black text-sm italic">{stat.value}</p>
              </div>
            </Card>
          ))}
        </div>

        <Card className="glass-card border-white/10 overflow-hidden rounded-[2rem]">
          <CardHeader className="bg-white/5 border-b border-white/5 p-6">
            <CardTitle className="text-sm font-black uppercase tracking-widest italic flex items-center gap-2">
              <Zap className="h-4 w-4 text-primary" /> Script de Ataque
            </CardTitle>
            <CardDescription className="uppercase text-[9px] font-bold tracking-widest opacity-70">Copie e adapte para seu lead</CardDescription>
          </CardHeader>
          <CardContent className="p-8 space-y-6">
            <div className="bg-black/60 p-6 rounded-2xl border border-white/5 text-sm leading-relaxed italic text-white/80 font-medium">
              "{content.script}"
            </div>
            <Button onClick={handleCopy} className="w-full h-14 rounded-2xl bg-white text-black font-black uppercase tracking-widest hover:bg-primary hover:text-white transition-all shadow-xl shadow-white/5">
              {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
              {copied ? 'COPIADO' : 'COPIAR SCRIPT'}
            </Button>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <h3 className="text-xl font-black italic uppercase tracking-tighter flex items-center gap-2">
            <Layout className="h-5 w-5 text-primary" /> Plano de Ação
          </h3>
          <ul className="space-y-4">
            {content.instructions.map((inst, i) => (
              <li key={i} className="flex gap-5 p-5 rounded-2xl bg-white/[0.02] border border-white/5 group hover:bg-white/[0.04] transition-colors">
                <span className="text-primary font-black text-2xl italic leading-none opacity-50 group-hover:opacity-100 transition-opacity">{i + 1}</span>
                <span className="text-sm text-muted-foreground leading-relaxed font-medium group-hover:text-white/80 transition-colors">{inst}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="pt-8 pb-20">
          <Button 
            onClick={handleComplete} 
            disabled={isSubmitting}
            className="w-full h-20 rounded-[2rem] bg-primary text-xl font-black uppercase tracking-widest shadow-[0_15px_40px_rgba(139,92,246,0.3)] hover:scale-105 active:scale-95 transition-all"
          >
            {isSubmitting ? <Loader2 className="h-6 w-6 animate-spin" /> : (
              <span className="flex items-center gap-3">
                CONCLUIR DIA <CheckCircle2 className="h-6 w-6" />
              </span>
            )}
          </Button>
          <p className="text-[10px] text-center mt-6 text-muted-foreground uppercase font-bold tracking-[0.3em] animate-pulse">
            Próximo passo: {content.cta}
          </p>
        </div>
      </main>
    </div>
  );
}
