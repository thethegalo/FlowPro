"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Progress } from '@/components/ui/progress';
import { Zap, ArrowRight, ArrowLeft, Target, TrendingUp, Users } from 'lucide-react';
import { generateSalesActionPlan } from '@/ai/flows/generate-sales-action-plan';
import { useToast } from '@/hooks/use-toast';

const STEPS = [
  {
    id: 'industry',
    title: 'Your Industry',
    description: 'What field are you operating in?',
    type: 'text',
    placeholder: 'e.g. Real Estate, SaaS, E-commerce'
  },
  {
    id: 'experience',
    title: 'Experience Level',
    description: 'How long have you been in sales?',
    type: 'radio',
    options: ['Complete Beginner', '1-2 Years', '3-5 Years', 'Expert']
  },
  {
    id: 'challenge',
    title: 'Core Challenge',
    description: 'What is your biggest roadblock right now?',
    type: 'radio',
    options: ['Finding Leads', 'Closing Deals', 'Follow-up Consistency', 'Scaling My Efforts']
  },
  {
    id: 'goal',
    title: 'Monthly Goal',
    description: 'What is your target revenue or client count?',
    type: 'text',
    placeholder: 'e.g. $10,000 / month or 5 new clients'
  }
];

export default function QuizPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
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
    setIsSubmitting(true);
    try {
      // In a real app, we'd save to Firestore here
      const plan = await generateSalesActionPlan(answers);
      toast({
        title: "Profile Created!",
        description: "Your AI Sales Plan is ready for review.",
      });
      router.push('/dashboard');
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to generate plan. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const currentStepData = STEPS[currentStep];
  const progress = ((currentStep + 1) / STEPS.length) * 100;

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-xl space-y-8">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 text-primary font-bold mb-2">
            <Zap className="h-6 w-6" />
            <span className="text-2xl tracking-tighter">FlowPro Profile</span>
          </div>
          <h1 className="text-3xl font-bold font-headline">Let's build your plan</h1>
          <p className="text-muted-foreground">Answer a few questions to get your personalized AI roadmap.</p>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between text-xs font-bold text-muted-foreground uppercase tracking-widest">
            <span>Step {currentStep + 1} of {STEPS.length}</span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <Card className="border-none shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-5">
            {currentStep === 0 && <Users className="h-24 w-24" />}
            {currentStep === 1 && <TrendingUp className="h-24 w-24" />}
            {currentStep === 2 && <Target className="h-24 w-24" />}
          </div>
          <CardHeader>
            <CardTitle>{currentStepData.title}</CardTitle>
            <CardDescription>{currentStepData.description}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {currentStepData.type === 'text' ? (
              <Input 
                autoFocus
                placeholder={currentStepData.placeholder} 
                className="h-12 text-lg"
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
                    className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all hover:bg-secondary/20 ${answers[currentStepData.id] === opt ? 'border-primary bg-primary/5 shadow-md' : 'border-transparent bg-secondary/10'}`}
                  >
                    <span className="font-semibold">{opt}</span>
                    <RadioGroupItem value={opt} />
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
              className="flex-1 h-12"
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Back
            </Button>
            <Button 
              onClick={handleNext} 
              disabled={!answers[currentStepData.id] || isSubmitting}
              className="flex-[2] h-12 bg-primary shadow-lg shadow-primary/20"
            >
              {isSubmitting ? "Generating Plan..." : currentStep === STEPS.length - 1 ? "Complete Profile" : "Continue"} 
              {!isSubmitting && <ArrowRight className="ml-2 h-4 w-4" />}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}