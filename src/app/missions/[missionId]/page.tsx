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
  Search
} from 'lucide-react';
import { useUser, useFirestore } from '@/firebase';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';

const LOGO_ICON = "https://s3.typebot.io/public/workspaces/cmml2oniw000g04l7gwmqelu1/typebots/cmn1vyjog000104la10d6sdzu/blocks/d5tqr6czngeukjb8r6whrs5s?v=1774318273085";

const MISSION_CONTENT = {
  'dia1': {
    title: 'DIA 1: Criar Oferta Flow',
    desc: 'O primeiro passo é definir um produto de alta demanda e seu roteiro de ataque irresistível.',
    stats: [
      { label: 'O Que Vender', value: 'SaaS / Gestão Local', icon: <Target className="h-4 w-4" /> },
      { label: 'Valor Sugerido', value: 'R$ 497,00', icon: <DollarSign className="h-4 w-4" /> },
    ],
    tasks: [
      'Escolher um nicho local lucrativo (ex: Odontologia, Estética).',
      'Definir o problema principal que você resolve (ex: falta de leads).',
      'Escrever uma promessa de 1 frase (ex: "Recupero 30% das suas vendas perdidas").',
      'Validar se o valor cobrado é compatível com o mercado local.'
    ],
    script: "Olá! Notei que vocês estão com o atendimento um pouco lento hoje. Criei um Flow que recupera até 30% das vendas que vocês perdem por demora. Quer ver como funciona?",
    cta: 'Defina sua oferta agora'
  },
  'dia2': {
    title: 'DIA 2: Ajustar Perfil Flow',
    desc: 'Transforme seu Instagram em uma vitrine de autoridade que converte visitas em dinheiro.',
    stats: [
      { label: 'Foco', value: 'Autoridade & Bio', icon: <Layout className="h-4 w-4" /> },
      { label: 'Meta', value: 'Perfil Profissional', icon: <TrendingUp className="h-4 w-4" /> },
    ],
    tasks: [
      'Ajustar a Bio com foco na transformação do cliente.',
      'Trocar a foto de perfil por uma com boa iluminação e profissional.',
      'Criar 3 destaques estratégicos (Quem Sou, Provas, Como Funciona).',
      'Fixar um post com sua promessa irresistível no topo.'
    ],
    script: "Bio Sugerida: Especialista em Automação de Vendas para [Nicho]. Ajudo negócios locais a escalarem sem anúncios. Clique no link abaixo 👇",
    cta: 'Atualize suas redes sociais'
  },
  'dia3': {
    title: 'DIA 3: Encontrar Leads',
    desc: 'Use nossa ferramenta de Radar para encontrar clientes reais com dinheiro no bolso.',
    stats: [
      { label: 'Meta', value: '25 Leads Reais', icon: <Users className="h-4 w-4" /> },
      { label: 'Ferramenta', value: 'Radar de Leads', icon: <Search className="h-4 w-4" /> },
    ],
    tasks: [
      'Acessar a ferramenta "Captar Leads" no dashboard.',
      'Buscar por negócios no seu nicho escolhido e região.',
      'Salvar 25 perfis/telefones que possuem avaliações no Google.',
      'Identificar o nome do proprietário em pelo menos 10 desses leads.'
    ],
    script: "O segredo está no volume. Quanto mais leads qualificados, mais chances de fechar.",
    cta: 'Acesse o Radar de Leads'
  },
  'dia4': {
    title: 'DIA 4: Fazer Abordagem',
    desc: 'É hora de ativar o motor neural e enviar as primeiras mensagens estratégicas.',
    stats: [
      { label: 'Ação', value: '15 Envios Diretos', icon: <MessageSquare className="h-4 w-4" /> },
      { label: 'Meta', value: '5 Respostas', icon: <PartyPopper className="h-4 w-4" /> },
    ],
    tasks: [
      'Gerar as 15 mensagens personalizadas usando a IA do FlowPro.',
      'Personalizar o início de cada abordagem com o nome do dono.',
      'Enviar as mensagens via WhatsApp ou Direct.',
      'Marcar cada lead abordado no seu controle de radar.'
    ],
    script: "Oi [Nome]! Vi que você é dono da [Empresa]. Gostei muito do seu perfil! Posso te mandar uma sugestão rápida de automação que vi que vocês ainda não usam?",
    cta: 'Inicie as abordagens hoje'
  },
  'dia5': {
    title: 'DIA 5: Conversar & Nutrir',
    desc: 'Gerencie as respostas dos interessados e mostre o valor do seu método.',
    stats: [
      { label: 'Foco', value: 'Relacionamento', icon: <Users className="h-4 w-4" /> },
      { label: 'Meta', value: '2 Reuniões Marcadas', icon: <MessageSquare className="h-4 w-4" /> },
    ],
    tasks: [
      'Responder todos os leads em menos de 15 minutos.',
      'Usar o IA Mentor para quebrar as primeiras objeções.',
      'Enviar um vídeo de 1 minuto mostrando os benefícios do sistema.',
      'Agendar uma chamada de vídeo ou visita presencial para fechar.'
    ],
    script: "Que bom que gostou! Gravei este vídeo rápido mostrando como o sistema Flow organiza seus leads. Teria 5 minutos para falarmos amanhã sobre como adaptar isso na [Empresa]?",
    cta: 'Nutra seus interessados'
  },
  'dia6': {
    title: 'DIA 6: Fechar Venda Flow',
    desc: 'Hora de transformar as conversas em dinheiro e concluir sua primeira vitória.',
    stats: [
      { label: 'Ação', value: 'Fechamento Brutal', icon: <DollarSign className="h-4 w-4" /> },
      { label: 'Meta', value: '1ª Venda Concluída', icon: <CheckCircle2 className="h-4 w-4" /> },
    ],
    tasks: [
      'Revisar os scripts de fechamento na biblioteca.',
      'Oferecer a garantia incondicional de 7 dias do FlowPro.',
      'Enviar o link de pagamento ou PIX para o cliente.',
      'Confirmar o recebimento e dar as boas-vindas ao novo parceiro.'
    ],
    script: "Entendo o receio, por isso ofereço 7 dias de garantia. Se não ver o Flow de clientes aumentar, devolvo seu investimento. Vamos começar?",
    cta: 'Feche seu contrato agora'
  },
  'dia7': {
    title: 'DIA 7: Escalar Flow',
    desc: 'Sua estrutura está validada. Agora é hora de escalar e automatizar o processo.',
    stats: [
      { label: 'Foco', value: 'Escalabilidade', icon: <Settings className="h-4 w-4" /> },
      { label: 'Meta', value: 'Repetir o Flow', icon: <TrendingUp className="h-4 w-4" /> },
    ],
    tasks: [
      'Analisar quais nichos trouxeram as melhores respostas.',
      'Aumentar o radar para 50 leads por dia.',
      'Contratar uma automação simples de disparo se necessário.',
      'Celebrar sua evolução e preparar para o faturamento de 5k.'
    ],
    script: "Venda concluída é apenas o começo. O lucro real está na escala e na repetição do processo validado.",
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
            <Button onClick={handleCopy} className="w-full h-14 rounded-2xl bg-white text-black font-black uppercase tracking-widest hover:bg-primary hover:text-white transition-all shadow-xl shadow-white/5">
              {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
              {copied ? 'COPIADO' : 'COPIAR SCRIPT'}
            </Button>
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
