
"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Zap, ArrowRight, Loader2, CheckCircle2, TrendingUp, Clock, Target, ShieldCheck, Smartphone, MousePointer2, TrendingDown } from 'lucide-react';
import { useUser, useFirestore } from '@/firebase';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';

const STEPS = [
  {
    id: 'hours',
    title: 'Disponibilidade',
    description: 'Quantas horas por dia você pode dedicar ao FlowPro?',
    type: 'radio',
    options: ['1h', '2h', '3h', '4h+']
  },
  {
    id: 'appear',
    title: 'Perfil de Atuação',
    description: 'Você prefere aparecer nos vídeos/vendas ou ser um "vendedor oculto"?',
    type: 'radio',
    options: ['Quero aparecer', 'Prefiro não aparecer']
  },
  {
    id: 'difficulty',
    title: 'Sua Maior Dificuldade',
    description: 'O que te impede de faturar hoje?',
    type: 'radio',
    options: ['Falta de tempo', 'Medo de vender', 'Não sei por onde começar']
  },
  {
    id: 'invest',
    title: 'Investimento Inicial',
    description: 'Você tem algum capital para investir em anúncios ou ferramentas pagas agora?',
    type: 'radio',
    options: ['Sim', 'Não']
  },
  {
    id: 'target',
    title: 'Meta de Faturamento',
    description: 'Quanto você quer ganhar nos próximos 30 dias?',
    type: 'radio',
    options: ['R$ 500', 'R$ 2.000', 'R$ 5.000+']
  },
  {
    id: 'device',
    title: 'Seu Equipamento',
    description: 'O que você vai usar para trabalhar?',
    type: 'radio',
    options: ['Só celular', 'Tenho computador']
  },
  {
    id: 'type',
    title: 'Preferência de Nicho',
    description: 'Você prefere focar em produtos físicos ou prestação de serviços digitais?',
    type: 'radio',
    options: ['Produtos', 'Serviços']
  },
  {
    id: 'triedBefore',
    title: 'Histórico',
    description: 'Você já tentou ganhar dinheiro online antes?',
    type: 'radio',
    options: ['Sim', 'Não']
  }
];

export default function QuizPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<'quiz' | 'processing' | 'result'>('quiz');
  const [processingMessage, setProcessingMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { user } = useUser();
  const db = useFirestore();
  const router = useRouter();
  const { toast } = useToast();

  const messages = [
    "Analisando seu perfil...",
    "Montando sua estratégia personalizada...",
    "Calculando seu potencial de ganho...",
    "Finalizando seu plano Alpha..."
  ];

  useEffect(() => {
    if (status === 'processing') {
      let i = 0;
      const interval = setInterval(() => {
        setProcessingMessage(messages[i]);
        i++;
        if (i >= messages.length) {
          clearInterval(interval);
          setTimeout(() => setStatus('result'), 800);
        }
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [status]);

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setStatus('processing');
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const calculateEarnings = () => {
    const hours = answers.hours || '1h';
    if (hours === '1h') return "R$ 300 a R$ 850";
    if (hours === '2h') return "R$ 900 a R$ 1.800";
    if (hours === '3h') return "R$ 1.900 a R$ 3.200";
    return "R$ 3.500 a R$ 7.000+";
  };

  const saveResults = async () => {
    if (!user || !db) {
        router.push('/auth');
        return;
    }
    setIsSubmitting(true);
    try {
      const quizRef = doc(db, 'users', user.uid, 'quizResponses', 'initial');
      await setDoc(quizRef, {
        userId: user.uid,
        responses: answers,
        completedAt: serverTimestamp()
      }, { merge: true });

      router.push('/paywall');
    } catch (error: any) {
      toast({ variant: "destructive", title: "Erro", description: "Falha ao salvar seu plano." });
      setIsSubmitting(false);
    }
  };

  if (status === 'processing') {
    return (
      <div className="min-h-screen bg-[#050508] flex flex-col items-center justify-center p-4">
        <div className="space-y-8 text-center">
          <div className="relative h-24 w-24 mx-auto">
            <div className="absolute inset-0 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
            <Loader2 className="h-24 w-24 text-primary animate-spin relative z-10" />
          </div>
          <h2 className="text-xl font-black italic uppercase tracking-tighter shimmer-text animate-pulse">
            {processingMessage}
          </h2>
        </div>
      </div>
    );
  }

  if (status === 'result') {
    return (
      <div className="min-h-screen bg-[#050508] py-12 px-4 flex flex-col items-center">
        <div className="w-full max-w-2xl space-y-8 relative z-10">
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-widest">
              <ShieldCheck className="h-4 w-4" /> Perfil Alpha Validado
            </div>
            <h1 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter leading-tight">
              SEU PLANO ESTÁ <span className="text-primary">PRONTO</span>
            </h1>
          </div>

          <Card className="glass-card border-primary/30">
            <CardHeader className="bg-primary/5 border-b border-white/5">
              <CardTitle className="text-lg font-black italic uppercase flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" /> Estratégia Recomendada
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8 space-y-8">
              <div className="space-y-2 text-center md:text-left">
                <p className="text-muted-foreground uppercase text-[10px] font-black tracking-widest opacity-70">Melhor Caminho</p>
                <p className="text-xl font-bold italic">
                  {answers.type === 'Serviços' 
                    ? "Venda de Serviços Digitais de Alta Demanda via Abordagem Direta"
                    : "Revenda Estratégica de Produtos Alpha com Scripts de Conversão"
                  }
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-white/5 border border-white/10 flex flex-col items-center md:items-start">
                  <div className="flex items-center gap-2 mb-2 text-primary">
                    <Clock className="h-4 w-4" />
                    <span className="text-[10px] font-black uppercase tracking-widest">Tempo Disponível</span>
                  </div>
                  <p className="text-lg font-bold">{answers.hours} p/ dia</p>
                </div>
                <div className="p-5 rounded-2xl bg-primary/10 border border-primary/30 flex flex-col items-center md:items-start shadow-[0_0_30px_rgba(139,92,246,0.1)]">
                  <div className="flex items-center gap-2 mb-2 text-primary">
                    <TrendingUp className="h-4 w-4" />
                    <span className="text-[10px] font-black uppercase tracking-widest">Potencial de Lucro</span>
                  </div>
                  <p className="text-2xl font-black italic text-white">{calculateEarnings()}<span className="text-xs font-normal opacity-70 ml-1">/mês</span></p>
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-white/5">
                {[
                  { label: `Estratégia de ${answers.appear === 'Quero aparecer' ? 'Autoridade' : 'Vendedor Oculto'}`, done: true },
                  { label: "Roteiro de execução para 3 dias", done: true },
                  { label: `Otimizado para ${answers.device}`, done: true }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-sm font-bold text-green-400">
                    <CheckCircle2 className="h-4 w-4 shrink-0" /> {item.label}
                  </div>
                ))}
              </div>

              <Button 
                onClick={saveResults}
                disabled={isSubmitting}
                className="w-full h-20 rounded-3xl bg-primary text-xl font-black uppercase tracking-widest shadow-[0_10px_40px_rgba(139,92,246,0.4)] hover:scale-105 transition-all group"
              >
                {isSubmitting ? <Loader2 className="h-6 w-6 animate-spin" /> : (
                  <span className="flex items-center gap-2">
                    ATIVAR MEU PLANO <ArrowRight className="h-6 w-6 group-hover:translate-x-2 transition-transform" />
                  </span>
                )}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const currentStepData = STEPS[currentStep];
  const progress = ((currentStep + 1) / STEPS.length) * 100;

  return (
    <div className="min-h-screen bg-[#050508] flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-xl space-y-8 relative z-10">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-black italic uppercase tracking-tighter">Personalize sua Jornada</h1>
          <p className="text-muted-foreground uppercase text-[10px] font-bold tracking-[0.2em]">O algoritmo precisa entender seu perfil alpha</p>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between text-[10px] font-black text-muted-foreground uppercase tracking-widest">
            <span>PASSO {currentStep + 1} DE {STEPS.length}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2 bg-white/5" />
        </div>

        <Card className="glass-card border-white/10">
          <CardHeader>
            <CardTitle className="text-xl font-black italic uppercase tracking-tight">{currentStepData.title}</CardTitle>
            <CardDescription className="text-sm font-medium">{currentStepData.description}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <RadioGroup 
              value={answers[currentStepData.id]}
              onValueChange={(val) => setAnswers({...answers, [currentStepData.id]: val})}
              className="grid gap-3"
            >
              {currentStepData.options?.map((opt) => (
                <Label
                  key={opt}
                  className={`flex items-center justify-between p-5 rounded-2xl border-2 cursor-pointer transition-all ${answers[currentStepData.id] === opt ? 'border-primary bg-primary/10' : 'border-white/5 bg-white/[0.02] hover:bg-white/5'}`}
                >
                  <span className="font-bold uppercase tracking-tight italic">{opt}</span>
                  <RadioGroupItem value={opt} className="hidden" />
                </Label>
              ))}
            </RadioGroup>
          </CardContent>
          <div className="p-6 pt-0 flex gap-3">
            <Button 
              variant="outline" 
              onClick={handleBack} 
              disabled={currentStep === 0}
              className="flex-1 h-14 border-white/10 rounded-2xl font-black uppercase tracking-widest"
            >
              VOLTAR
            </Button>
            <Button 
              onClick={handleNext} 
              disabled={!answers[currentStepData.id]}
              className="flex-[2] h-14 bg-primary rounded-2xl font-black uppercase tracking-widest"
            >
              {currentStep === STEPS.length - 1 ? "GERAR PLANO" : "PRÓXIMO"} 
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
