
"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Progress } from '@/components/ui/progress';
import { Zap, ArrowRight, ArrowLeft, Target, TrendingUp, Users, Loader2 } from 'lucide-react';
import { generateSalesActionPlan } from '@/ai/flows/generate-sales-action-plan';
import { useToast } from '@/hooks/use-toast';
import { useUser, useFirestore } from '@/firebase';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';

const STEPS = [
  {
    id: 'industry',
    title: 'Seu Mercado',
    description: 'Em qual área você quer atuar?',
    type: 'text',
    placeholder: 'Ex: Imobiliária, SaaS, E-commerce, Serviços Locais'
  },
  {
    id: 'experience',
    title: 'Nível de Experiência',
    description: 'Quanto você sabe sobre vendas?',
    type: 'radio',
    options: ['Iniciante Total', 'Já fiz algumas vendas', 'Experiente', 'Expert Alpha']
  },
  {
    id: 'challenge',
    title: 'Seu Maior Obstáculo',
    description: 'O que te impede de faturar hoje?',
    type: 'radio',
    options: ['Encontrar Clientes', 'Fechar o Negócio', 'Scripts Fracos', 'Escalar Resultados']
  },
  {
    id: 'goal',
    title: 'Meta Mensal',
    description: 'Quanto você quer colocar no bolso todo mês?',
    type: 'text',
    placeholder: 'Ex: R$ 5.000 / mês ou 10 novos clientes'
  }
];

export default function QuizPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useUser();
  const db = useFirestore();
  const router = useRouter();
  const { toast } = useToast();

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      submitQuiz();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const submitQuiz = async () => {
    if (!user || !db) return;
    setIsSubmitting(true);
    try {
      // 1. Generate AI Plan
      const planResponse = await generateSalesActionPlan(answers);
      
      // 2. Save Quiz Responses
      const quizRef = doc(db, 'users', user.uid, 'quizResponses', 'initial');
      await setDoc(quizRef, {
        userId: user.uid,
        responses: answers,
        completedAt: serverTimestamp()
      });

      // 3. Save Personalized Plan
      const planRef = doc(db, 'users', user.uid, 'personalizedPlans', 'current');
      await setDoc(planRef, {
        userId: user.uid,
        quizResponseId: 'initial',
        strategy: planResponse.plan[0].description, // Simplification for MVP
        suggestedIncomeType: answers.industry,
        executionMethod: 'Passo a passo diário FlowPro',
        generatedAt: serverTimestamp()
      });

      // 4. Update User Profile
      const userRef = doc(db, 'users', user.uid);
      await setDoc(userRef, {
        isOnboarded: true,
        updatedAt: serverTimestamp()
      }, { merge: true });

      toast({
        title: "Perfil Criado!",
        description: "Seu plano Alpha está pronto.",
      });
      router.push('/dashboard');
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Falha ao gerar seu plano. Tente novamente.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const currentStepData = STEPS[currentStep];
  const progress = ((currentStep + 1) / STEPS.length) * 100;

  return (
    <div className="min-h-screen bg-[#050508] flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-xl space-y-8 relative z-10">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 text-primary font-bold mb-2">
            <Zap className="h-6 w-6 animate-pulse" />
            <span className="text-2xl tracking-tighter italic font-black uppercase">FlowPro Alpha</span>
          </div>
          <h1 className="text-3xl font-black italic uppercase tracking-tighter">Vamos Construir sua Máquina</h1>
          <p className="text-muted-foreground uppercase text-[10px] font-bold tracking-[0.2em]">Responda para personalizar sua jornada</p>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between text-[10px] font-black text-muted-foreground uppercase tracking-widest">
            <span>Passo {currentStep + 1} de {STEPS.length}</span>
            <span>{Math.round(progress)}% Concluído</span>
          </div>
          <Progress value={progress} className="h-2 bg-white/5" />
        </div>

        <Card className="glass-card border-white/10 relative overflow-hidden">
          <CardHeader>
            <CardTitle className="text-xl font-black italic uppercase tracking-tight">{currentStepData.title}</CardTitle>
            <CardDescription className="text-sm font-medium">{currentStepData.description}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {currentStepData.type === 'text' ? (
              <Input 
                autoFocus
                placeholder={currentStepData.placeholder} 
                className="h-14 text-lg bg-white/5 border-white/10 rounded-2xl"
                value={answers[currentStepData.id] || ''}
                onChange={(e) => setAnswers({...answers, [currentStepData.id]: e.target.value})}
              />
            ) : (
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
            )}
          </CardContent>
          <div className="p-6 pt-0 flex gap-3">
            <Button 
              variant="outline" 
              onClick={handleBack} 
              disabled={currentStep === 0 || isSubmitting}
              className="flex-1 h-14 border-white/10 rounded-2xl font-black uppercase tracking-widest"
            >
              VOLTAR
            </Button>
            <Button 
              onClick={handleNext} 
              disabled={!answers[currentStepData.id] || isSubmitting}
              className="flex-[2] h-14 bg-primary rounded-2xl font-black uppercase tracking-widest"
            >
              {isSubmitting ? <Loader2 className="h-5 w-5 animate-spin" /> : currentStep === STEPS.length - 1 ? "FINALIZAR PERFIL" : "CONTINUAR"} 
              {!isSubmitting && <ArrowRight className="ml-2 h-4 w-4" />}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
