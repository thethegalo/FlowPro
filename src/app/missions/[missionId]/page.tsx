
"use client";

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  ArrowLeft, 
  Copy, 
  Check, 
  CheckCircle2, 
  Target, 
  Loader2,
  DollarSign,
  Users,
  Layout,
  MessageSquare,
  TrendingUp,
  Settings,
  Trophy,
  PartyPopper,
  Search,
  ArrowRight,
  Info,
  UserCheck,
  Sparkles,
  Bot,
  Clock,
  BookOpen,
  ShieldCheck,
  Send
} from 'lucide-react';
import { useUser, useFirestore } from '@/firebase';
import { doc, setDoc, serverTimestamp, updateDoc, increment } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';

const LOGO_ICON = "https://s3.typebot.io/public/workspaces/cmml2oniw000g04l7gwmqelu1/typebots/cmn1vyjog000104la10d6sdzu/blocks/d5tqr6czngeukjb8r6whrs5s?v=1774318273085";

const MISSION_CONTENT = {
  'dia1': {
    title: 'DIA 1: Criar Oferta Flow',
    desc: 'O primeiro passo é definir um produto de alta demanda e seu roteiro de ataque irresistível.',
    guide: [
      { step: "Abra um bloco de notas ou papel.", icon: <Settings className="h-4 w-4" /> },
      { step: "Escolha 1 nicho (Ex: Dentistas).", icon: <Target className="h-4 w-4" /> },
      { step: "Defina o preço: R$ 497,00.", icon: <DollarSign className="h-4 w-4" /> },
      { step: "Escreva sua promessa central.", icon: <TrendingUp className="h-4 w-4" /> }
    ],
    stats: [
      { label: 'O Que Vender', value: 'SaaS / Gestão Local', icon: <Target className="h-4 w-4" /> },
      { label: 'Valor Sugerido', value: 'R$ 497,00', icon: <DollarSign className="h-4 w-4" /> },
    ],
    tasks: [
      'Escolher um nicho local lucrativo.',
      'Definir o problema principal que você resolve.',
      'Escrever uma promessa de 1 frase.',
      'Validar se o valor cobrado é compatível.'
    ],
    script: "Olá! Notei que vocês estão com o atendimento um pouco lento hoje. Criei um Flow que recupera até 30% das vendas que vocês perdem por demora. Quer ver como funciona?",
    cta: 'Defina sua oferta agora'
  },
  'dia2': {
    title: 'DIA 2: Ajustar Perfil Flow',
    desc: 'Transforme seu Instagram em uma vitrine de autoridade.',
    guide: [
      { step: "Vá ao Instagram > Editar Perfil.", icon: <Layout className="h-4 w-4" /> },
      { step: "Mude sua foto para algo profissional.", icon: <UserCheck className="h-4 w-4" /> },
      { step: "Cole a Bio sugerida abaixo.", icon: <MessageSquare className="h-4 w-4" /> },
      { step: "Crie o primeiro destaque 'Como Funciona'.", icon: <Sparkles className="h-4 w-4" /> }
    ],
    stats: [
      { label: 'Foco', value: 'Autoridade & Bio', icon: <Layout className="h-4 w-4" /> },
      { label: 'Meta', value: 'Perfil Profissional', icon: <TrendingUp className="h-4 w-4" /> },
    ],
    tasks: [
      'Ajustar a Bio com foco na transformação.',
      'Trocar a foto de perfil.',
      'Criar 3 destaques estratégicos.',
      'Fixar um post com sua promessa.'
    ],
    script: "Bio Sugerida: Especialista em Automação de Vendas para [Nicho]. Ajudo negócios locais a escalarem sem anúncios. Clique no link abaixo 👇",
    cta: 'Atualize suas redes sociais'
  },
  'dia3': {
    title: 'DIA 3: Encontrar Leads',
    desc: 'Use nossa ferramenta de Radar para encontrar clientes reais.',
    guide: [
      { step: "Acesse a aba 'Captar Leads' no menu lateral.", icon: <Search className="h-4 w-4" /> },
      { step: "Digite seu nicho e estado.", icon: <Target className="h-4 w-4" /> },
      { step: "Clique em Buscar Leads Reais.", icon: <Zap className="h-4 w-4" /> },
      { step: "Favorite 25 empresas da lista.", icon: <Star className="h-4 w-4" /> }
    ],
    stats: [
      { label: 'Meta', value: '25 Leads Reais', icon: <Users className="h-4 w-4" /> },
      { label: 'Ferramenta', value: 'Radar de Leads', icon: <Search className="h-4 w-4" /> },
    ],
    tasks: [
      'Acessar a ferramenta "Captar Leads".',
      'Buscar por negócios no seu nicho.',
      'Salvar 25 perfis/telefones.',
      'Identificar o nome do proprietário.'
    ],
    script: "O segredo está no volume. Quanto mais leads qualificados, mais chances de fechar.",
    cta: 'Acesse o Radar de Leads'
  },
  'dia4': {
    title: 'DIA 4: Fazer Abordagem',
    desc: 'É hora de ativar o motor neural e enviar as primeiras mensagens.',
    guide: [
      { step: "Volte para a lista de Leads salvos.", icon: <Users className="h-4 w-4" /> },
      { step: "Clique em 'Enviar Mensagem IA' no primeiro lead.", icon: <Zap className="h-4 w-4" /> },
      { step: "O WhatsApp abrirá com a mensagem pronta.", icon: <Send className="h-4 w-4" /> },
      { step: "Repita o processo com 15 leads hoje.", icon: <ArrowRight className="h-4 w-4" /> }
    ],
    stats: [
      { label: 'Ação', value: '15 Envios Diretos', icon: <MessageSquare className="h-4 w-4" /> },
      { label: 'Meta', value: '5 Respostas', icon: <PartyPopper className="h-4 w-4" /> },
    ],
    tasks: [
      'Gerar as 15 mensagens personalizadas.',
      'Personalizar o início de cada abordagem.',
      'Enviar as mensagens via WhatsApp.',
      'Marcar cada lead abordado no radar.'
    ],
    script: "Oi [Nome]! Vi que você é dono da [Empresa]. Gostei muito do seu perfil! Posso te mandar uma sugestão rápida de automação que vi que vocês ainda não usam?",
    cta: 'Inicie as abordagens hoje'
  },
  'dia5': {
    title: 'DIA 5: Conversar & Nutrir',
    desc: 'Gerencie as respostas e mostre o valor do seu método.',
    guide: [
      { step: "Responda quem já te deu um 'oi'.", icon: <MessageSquare className="h-4 w-4" /> },
      { step: "Use o IA Mentor para tirar dúvidas.", icon: <Bot className="h-4 w-4" /> },
      { step: "Agende reuniões para amanhã.", icon: <Clock className="h-4 w-4" /> }
    ],
    stats: [
      { label: 'Foco', value: 'Relacionamento', icon: <Users className="h-4 w-4" /> },
      { label: 'Meta', value: '2 Reuniões Marcadas', icon: <MessageSquare className="h-4 w-4" /> },
    ],
    tasks: [
      'Responder todos os leads em menos de 15 minutos.',
      'Usar o IA Mentor para quebrar objeções.',
      'Enviar um vídeo de 1 minuto mostrando benefícios.',
      'Agendar uma chamada de vídeo.'
    ],
    script: "Que bom que gostou! Gravei este vídeo rápido mostrando como o sistema Flow organiza seus leads. Teria 5 minutos para falarmos amanhã?",
    cta: 'Nutra seus interessados'
  },
  'dia6': {
    title: 'DIA 6: Fechar Venda Flow',
    desc: 'Hora de transformar as conversas em dinheiro.',
    guide: [
      { step: "Abra a biblioteca de scripts de fechamento.", icon: <BookOpen className="h-4 w-4" /> },
      { step: "Mande o link de pagamento/PIX.", icon: <DollarSign className="h-4 w-4" /> },
      { step: "Ofereça a garantia de 7 dias.", icon: <ShieldCheck className="h-4 w-4" /> }
    ],
    stats: [
      { label: 'Ação', value: 'Fechamento Brutal', icon: <DollarSign className="h-4 w-4" /> },
      { label: 'Meta', value: '1ª Venda Concluída', icon: <CheckCircle2 className="h-4 w-4" /> },
    ],
    tasks: [
      'Revisar os scripts de fechamento.',
      'Oferecer a garantia incondicional.',
      'Enviar o link de pagamento.',
      'Confirmar o recebimento.'
    ],
    script: "Entendo o receio, por isso ofereço 7 dias de garantia. Se não ver o Flow de clientes aumentar, devolvo seu investimento. Vamos começar?",
    cta: 'Feche seu contrato agora'
  },
  'dia7': {
    title: 'DIA 7: Escalar Flow',
    desc: 'Sua estrutura está validada. Agora é hora de repetir.',
    guide: [
      { step: "Analise quais nichos mais responderam.", icon: <Target className="h-4 w-4" /> },
      { step: "Aumente a meta diária para 50 leads.", icon: <Zap className="h-4 w-4" /> },
      { step: "Registre seu primeiro ganho no Dashboard.", icon: <DollarSign className="h-4 w-4" /> }
    ],
    stats: [
      { label: 'Foco', value: 'Escalabilidade', icon: <Settings className="h-4 w-4" /> },
      { label: 'Meta', value: 'Repetir o Flow', icon: <TrendingUp className="h-4 w-4" /> },
    ],
    tasks: [
      'Analisar nichos vencedores.',
      'Aumentar o radar para 50 leads.',
      'Contratar automação de disparo.',
      'Celebrar evolução.'
    ],
    script: "Venda concluída é apenas o começo. O lucro real está na escala.",
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
  const [completedTasks, setCompletedTasks] = useState<number[]>([]);

  const handleCopy = () => {
    if (!content) return;
    navigator.clipboard.writeText(content.script);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast({ title: "Script Copiado!", description: "Personalize e envie para o lead." });
  };

  const toggleTask = (index: number) => {
    setCompletedTasks(prev => 
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };

  const handleComplete = async () => {
    if (!user || !db || !content) return;
    
    if (completedTasks.length < content.tasks.length) {
      toast({ 
        variant: "destructive", 
        title: "Ação Requerida", 
        description: "Complete todos os passos da checklist antes de concluir a missão." 
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const progressRef = doc(db, 'users', user.uid, 'missionProgress', missionId);
      await setDoc(progressRef, {
        userId: user.uid,
        missionId,
        isCompleted: true,
        completedAt: serverTimestamp(),
      }, { merge: true });

      // Atualizar XP/Ações totais (10 pontos por missão)
      await updateDoc(doc(db, 'users', user.uid), {
        totalActions: increment(10),
        dailyActions: increment(1),
        updatedAt: serverTimestamp()
      });

      if (missionId === 'dia7') {
        setShowCelebration(true);
      } else {
        toast({ title: "Missão Concluída!", description: "Boa! Você avançou para o próximo nível." });
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
        <Card className="max-w-xl w-full bg-primary/10 border-primary/30 rounded-[2.5rem] p-12 text-center space-y-8 animate-in zoom-in duration-500">
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
        <div className="flex items-center gap-3">
          <div className="relative h-6 w-6">
            <Image src={LOGO_ICON} alt="Icon" fill className="object-contain" />
          </div>
          <h1 className="text-xl font-black italic uppercase tracking-tighter">{content.title}</h1>
        </div>
      </header>

      <main className="flex-1 container max-w-2xl mx-auto p-4 md:p-8 space-y-8">
        <div className="space-y-6">
          <div className="flex items-center gap-2 mb-2">
            <Info className="h-4 w-4 text-primary" />
            <h3 className="text-[10px] font-black uppercase tracking-widest text-primary">Modo Guiado de Execução</h3>
          </div>
          <div className="grid gap-3">
            {content.guide?.map((item, i) => (
              <div key={i} className="flex items-center gap-4 p-4 bg-white/[0.02] border border-white/5 rounded-2xl hover:bg-white/[0.04] transition-colors">
                <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0 border border-primary/20">
                  {item.icon}
                </div>
                <p className="text-xs font-bold text-white/80 uppercase tracking-tight">{item.step}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4 pt-4">
          <Badge className="bg-primary/20 text-primary border border-primary/30 uppercase tracking-widest text-[10px] px-4 py-1.5">AÇÕES OBRIGATÓRIAS</Badge>
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

        <div className="space-y-6">
          <h3 className="text-xl font-black italic uppercase tracking-tighter flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-primary" /> Checklist da Missão
          </h3>
          <div className="grid gap-3">
            {content.tasks.map((task, i) => (
              <div 
                key={i} 
                onClick={() => toggleTask(i)}
                className={`flex items-start gap-4 p-5 rounded-2xl border transition-all cursor-pointer ${
                  completedTasks.includes(i) 
                  ? 'bg-primary/5 border-primary/30 opacity-70' 
                  : 'bg-white/[0.02] border-white/5 hover:bg-white/[0.04]'
                }`}
              >
                <Checkbox 
                  checked={completedTasks.includes(i)} 
                  onCheckedChange={() => toggleTask(i)}
                  className="mt-1"
                />
                <span className={`text-sm font-medium ${completedTasks.includes(i) ? 'line-through text-muted-foreground' : 'text-white/80'}`}>
                  {task}
                </span>
              </div>
            ))}
          </div>
        </div>

        <Card className="glass-card border-white/10 overflow-hidden rounded-[2rem]">
          <CardHeader className="bg-white/5 border-b border-white/5 p-6">
            <CardTitle className="text-sm font-black uppercase tracking-widest italic flex items-center gap-2">
               <Image src={LOGO_ICON} alt="Icon" width={16} height={16} /> Script de Ataque
            </CardTitle>
            <CardDescription className="uppercase text-[9px] font-bold tracking-widest opacity-70">Copie e adapte para seu lead</CardDescription>
          </CardHeader>
          <CardContent className="p-8 space-y-6">
            <div className="bg-black/60 p-6 rounded-2xl border border-white/5 text-sm leading-relaxed italic text-white/80 font-medium">
              "{content.script}"
            </div>
            <div className="flex gap-3">
              <Button onClick={handleCopy} className="flex-1 h-14 rounded-2xl bg-white text-black font-black uppercase tracking-widest hover:bg-primary hover:text-white transition-all shadow-xl shadow-white/5">
                {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                {copied ? 'COPIADO' : 'COPIAR SCRIPT'}
              </Button>
              <Button 
                onClick={async () => {
                  toggleTask(completedTasks.length);
                  if (db && user) {
                    await updateDoc(doc(db, 'users', user.uid), {
                      totalActions: increment(1),
                      dailyActions: increment(1),
                      lastActionAt: serverTimestamp()
                    });
                  }
                  toast({ title: "Boa!", description: "Ação registrada no seu progresso." });
                }}
                variant="outline"
                className="h-14 px-6 border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest"
              >
                JÁ FIZ ISSO
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="pt-8 pb-20">
          <Button 
            onClick={handleComplete} 
            disabled={isSubmitting}
            className="w-full h-20 rounded-[2rem] bg-primary text-xl font-black uppercase tracking-widest shadow-[0_15px_40px_rgba(139,92,246,0.3)] hover:scale-105 active:scale-95 transition-all"
          >
            {isSubmitting ? <Loader2 className="h-6 w-6 animate-spin" /> : (
              <span className="flex items-center gap-3">
                CONCLUIR MISSÃO <CheckCircle2 className="h-6 w-6" />
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
