"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Zap, ArrowRight, Loader2, CheckCircle2, TrendingUp, Clock, Target, ShieldCheck, Sparkles } from 'lucide-react';
import { generateSalesActionPlan } from '@/ai/flows/generate-sales-action-plan';

const STEPS = [
  {
    id: 'hours',
    title: 'Disponibilidade Diária',
    description: 'Quanto tempo você tem para focar na sua liberdade financeira?',
    type: 'radio',
    options: ['1h', '2h', '3h', '4h+']
  },
  {
    id: 'target',
    title: 'Meta de Faturamento',
    description: 'Arraste para definir quanto você quer ganhar nos próximos 30 dias',
    type: 'slider',
    min: 500,
    max: 5000,
    step: 100
  },
  {
    id: 'appear',
    title: 'Perfil de Vendedor',
    description: 'Você prefere ser autoridade ou trabalhar nos bastidores?',
    type: 'radio',
    options: ['Quero aparecer', 'Prefiro não aparecer']
  },
  {
    id: 'dream',
    title: 'Seu Maior Motivo',
    description: 'Em poucas palavras, por que você quer ter sucesso online?',
    type: 'text',
    placeholder: 'Ex: Ajudar minha família, viajar o mundo...'
  },
  {
    id: 'difficulty',
    title: 'Sua Maior Barreira',
    description: 'O que te impede de faturar hoje?',
    type: 'radio',
    options: ['Falta de tempo', 'Medo de vender', 'Não sei por onde começar']
  }
];

export default function QuizPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({ target: [1500] });
  const [status, setStatus] = useState<'quiz' | 'processing' | 'result'>('quiz');
  const [processingMessage, setProcessingMessage] = useState('');
  const [aiPlan, setAiPlan] = useState<any>(null);
  const router = useRouter();

  const messages = [
    "Analisando seu perfil...",
    "Conectando ao Motor Neural Flow...",
    "Calculando seu potencial de ganho...",
    "IA gerando estratégia personalizada...",
    "Finalizando seu plano mestre..."
  ];

  useEffect(() => {
    if (status === 'processing') {
      let i = 0;
      const interval = setInterval(() => {
        setProcessingMessage(messages[i]);
        i++;
        if (i >= messages.length) clearInterval(interval);
      }, 1000);

      const runAi = async () => {
        try {
          const result = await generateSalesActionPlan(answers);
          setAiPlan(result.plan);
          setTimeout(() => setStatus('result'), 1500);
        } catch (e) {
          setTimeout(() => setStatus('result'), 1500);
        }
      };
      runAi();
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

  const currentStepData = STEPS[currentStep];
  const progress = ((currentStep + 1) / STEPS.length) * 100;

  if (status === 'processing') {
    return (
      <div className="min-h-screen bg-[#050508] flex flex-col items-center justify-center p-4">
        <div className="space-y-8 text-center animate-in fade-in duration-700">
          <div className="relative h-24 w-24 mx-auto">
            <div className="absolute inset-0 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
            <Loader2 className="h-24 w-24 text-primary animate-spin relative z-10" />
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-black italic uppercase tracking-tighter shimmer-text">{processingMessage}</h2>
            <p className="text-[8px] font-black uppercase tracking-[0.4em] text-muted-foreground animate-pulse">Neural Engine v3.0</p>
          </div>
        </div>
      </div>
    );
  }

  if (status === 'result') {
    return (
      <div className="min-h-screen bg-[#050508] py-12 px-4 flex flex-col items-center animate-in slide-in-from-bottom-10 duration-700">
        <div className="w-full max-w-2xl space-y-8 relative z-10">
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-widest">
              <ShieldCheck className="h-4 w-4" /> Perfil Validado com Sucesso
            </div>
            <h1 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter leading-tight">
              PLANO GERADO <span className="text-primary">PARA VOCÊ</span>
            </h1>
          </div>

          <Card className="glass-card border-primary/30 rounded-[2rem] overflow-hidden shadow-2xl shadow-primary/10">
            <CardHeader className="bg-primary/5 border-b border-white/5 p-8">
              <CardTitle className="text-lg font-black italic uppercase flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" /> Estratégia Recomendada
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8 space-y-8">
              <div className="space-y-2">
                <p className="text-muted-foreground uppercase text-[10px] font-black tracking-widest opacity-70">Seu Plano de Ataque</p>
                <p className="text-2xl font-bold italic text-white leading-tight">
                  {aiPlan?.[0]?.title || "Estratégia de Escala Orgânica"}
                </p>
                <p className="text-sm text-muted-foreground font-medium italic">
                  "{aiPlan?.[0]?.description?.substring(0, 150)}..."
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
                  <div className="flex items-center gap-2 mb-2 text-primary">
                    <Clock className="h-4 w-4" />
                    <span className="text-[10px] font-black uppercase tracking-widest">Tempo</span>
                  </div>
                  <p className="text-lg font-bold">{answers.hours} p/ dia</p>
                </div>
                <div className="p-5 rounded-2xl bg-primary/10 border border-primary/30">
                  <div className="flex items-center gap-2 mb-2 text-primary">
                    <TrendingUp className="h-4 w-4" />
                    <span className="text-[10px] font-black uppercase tracking-widest">Meta Definida</span>
                  </div>
                  <p className="text-2xl font-black italic text-white">R$ {answers.target[0] || answers.target}/mês</p>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-white/5 border border-dashed border-white/10 text-center">
                <Sparkles className="h-6 w-6 text-primary mx-auto mb-3" />
                <p className="text-xs font-bold uppercase tracking-widest text-white mb-1">Passo 1 de 7 pronto</p>
                <p className="text-[10px] text-muted-foreground">O restante do seu plano neural está aguardando liberação na área do aluno.</p>
              </div>

              <Button 
                onClick={() => {
                  sessionStorage.setItem('temp_quiz', JSON.stringify(answers));
                  sessionStorage.setItem('temp_plan', JSON.stringify(aiPlan));
                  router.push('/paywall');
                }}
                className="w-full h-20 rounded-[2rem] bg-primary text-xl font-black uppercase tracking-widest shadow-xl shadow-primary/30 hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                ATIVAR MEU ACESSO <ArrowRight className="ml-2 h-6 w-6" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050508] flex flex-col items-center justify-center p-4">
      <div className="w-full max-xl space-y-8 relative z-10 animate-in fade-in duration-500">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-black italic uppercase tracking-tighter">Inicie seu Flow</h1>
          <p className="text-muted-foreground uppercase text-[10px] font-bold tracking-[0.2em]">Responda e receba sua rota personalizada</p>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between text-[10px] font-black text-muted-foreground uppercase tracking-widest">
            <span>PASSO {currentStep + 1} DE {STEPS.length}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2 bg-white/5" />
        </div>

        <Card className="glass-card border-white/10 rounded-[2rem] overflow-hidden">
          <CardHeader className="p-8">
            <CardTitle className="text-xl font-black italic uppercase tracking-tight">{currentStepData.title}</CardTitle>
            <CardDescription className="text-sm font-medium">{currentStepData.description}</CardDescription>
          </CardHeader>
          
          <CardContent className="px-8 pb-8 space-y-6">
            {currentStepData.type === 'radio' && (
              <RadioGroup 
                value={answers[currentStepData.id]}
                onValueChange={(val) => setAnswers({...answers, [currentStepData.id]: val})}
                className="grid gap-3"
              >
                {currentStepData.options?.map((opt) => (
                  <Label
                    key={opt}
                    className={`flex items-center justify-between p-5 rounded-2xl border-2 cursor-pointer transition-all ${answers[currentStepData.id] === opt ? 'border-primary bg-primary/10 text-white' : 'border-white/5 bg-white/[0.02] hover:bg-white/5 text-muted-foreground'}`}
                  >
                    <span className="font-bold uppercase tracking-tight italic">{opt}</span>
                    <RadioGroupItem value={opt} className="hidden" />
                  </Label>
                ))}
              </RadioGroup>
            )}

            {currentStepData.type === 'slider' && (
              <div className="space-y-8 py-4">
                <div className="text-center">
                  <span className="text-4xl font-black italic text-primary">R$ {answers.target[0] || answers.target}</span>
                  <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest mt-2">Expectativa de faturamento</p>
                </div>
                <Slider
                  defaultValue={[1500]}
                  max={5000}
                  min={500}
                  step={100}
                  onValueChange={(val) => setAnswers({...answers, target: val})}
                  className="py-4"
                />
                <div className="flex justify-between text-[8px] font-black uppercase text-muted-foreground tracking-widest">
                  <span>Iniciante</span>
                  <span>Escala Brutal</span>
                </div>
              </div>
            )}

            {currentStepData.type === 'text' && (
              <div className="py-4">
                <Input 
                  placeholder={currentStepData.placeholder}
                  className="bg-white/5 border-white/10 h-16 rounded-2xl text-lg font-medium focus-visible:ring-primary"
                  value={answers[currentStepData.id] || ''}
                  onChange={(e) => setAnswers({...answers, [currentStepData.id]: e.target.value})}
                />
              </div>
            )}
          </CardContent>

          <div className="px-8 pb-8 flex gap-3">
            <Button 
              variant="outline" 
              onClick={() => currentStep > 0 && setCurrentStep(currentStep - 1)} 
              disabled={currentStep === 0}
              className="flex-1 h-14 border-white/10 rounded-2xl font-black uppercase tracking-widest hover:bg-white/5"
            >
              VOLTAR
            </Button>
            <Button 
              onClick={handleNext} 
              disabled={!answers[currentStepData.id] && currentStepData.type !== 'slider'}
              className="flex-[2] h-14 bg-primary hover:bg-primary/90 rounded-2xl font-black uppercase tracking-widest shadow-lg shadow-primary/20"
            >
              {currentStep === STEPS.length - 1 ? "GERAR MEU PLANO" : "PRÓXIMO"} 
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
