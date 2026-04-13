"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  GitBranch, 
  MessageSquare, 
  Copy, 
  Check, 
  ChevronRight, 
  User, 
  Target, 
  Zap, 
  ShieldCheck, 
  RotateCcw,
  Sparkles,
  Menu,
  Info
} from 'lucide-react';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from '@/components/AppSidebar';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { DashboardParticles } from '@/components/DashboardParticles';

const FUNNEL_STEPS = [
  { 
    id: 1, 
    title: 'Primeiro Contato', 
    icon: <Target className="h-4 w-4" />,
    hint: "Objetivo: Quebrar o gelo e despertar a curiosidade sobre a falta de um site.",
    templates: [
      "Olá [Empresa]! Notei que vocês ainda não têm um site profissional. Hoje isso faz muitos clientes escolherem a concorrência. Posso te mostrar como resolver isso rapidinho?",
      "Oi [Empresa]! Vi que vocês estão no Google Maps mas sem site. Clientes que pesquisam online acabam indo pra quem tem presença digital. Posso te mandar um exemplo do que faríamos pra vocês?"
    ]
  },
  { 
    id: 2, 
    title: 'Follow-up', 
    icon: <RotateCcw className="h-4 w-4" />,
    hint: "Objetivo: Manter o radar ativo e gerar valor extra com exemplos reais.",
    templates: [
      "Oi [Empresa], tudo bem? Passei aqui pra deixar um exemplo de site que fizemos para um negócio parecido com o de vocês. Vale dar uma olhada!",
      "[Empresa], só passando pra ver se você teve tempo de ver minha mensagem. Tenho uma proposta rápida que pode trazer mais clientes pra vocês essa semana."
    ]
  },
  { 
    id: 3, 
    title: 'Interesse', 
    icon: <Sparkles className="h-4 w-4" />,
    hint: "Objetivo: Apresentar a solução, prazos e ancorar o preço inicial.",
    templates: [
      "Que bom! Basicamente criamos um site profissional pra [Empresa] em até 48h, com domínio, hospedagem e design exclusivo. O investimento é a partir de R$ 497. Posso te mandar a proposta completa?",
      "Show! O processo é simples: você me manda logo e informações, a gente cria o site em 48h e você já começa a receber clientes pelo Google. Quer agendar 10 min pra eu te mostrar?"
    ]
  },
  { 
    id: 4, 
    title: 'Objeção', 
    icon: <ShieldCheck className="h-4 w-4" />,
    hint: "Objetivo: Remover barreiras de preço/tempo e dar segurança com garantia.",
    templates: [
      "Entendo! Mas pensa comigo: se o site trouxer apenas 1 cliente novo por mês, já se paga. E clientes que chegam pelo Google já chegam prontos pra comprar. Vale o investimento?",
      "Faz sentido a preocupação. Por isso trabalhamos com pagamento parcelado e garantia: se não ficar satisfeito em 7 dias, devolvemos tudo. Posso enviar o contrato?"
    ]
  },
  { 
    id: 5, 
    title: 'Fechamento', 
    icon: <Zap className="h-4 w-4" />,
    hint: "Objetivo: Finalizar a negociação e colher os dados para início imediato.",
    templates: [
      "Perfeito [Empresa]! Então vamos fechar? Só preciso do seu e-mail para enviar o contrato e já começamos hoje mesmo.",
      "Ótimo! Me confirma o PIX ou prefere cartão parcelado? Assim que confirmar o pagamento já iniciamos o projeto nas próximas horas."
    ]
  }
];

export default function FunnelPage() {
  const [leadName, setLeadName] = useState('');
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedMessage, setSelectedMessage] = useState('');
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const activeStepData = FUNNEL_STEPS.find(s => s.id === currentStep);

  const handleSelectTemplate = (template: string) => {
    let final = template.replace(/\[Empresa\]/g, leadName || '[NOME DA EMPRESA]');
    setSelectedMessage(final);
  };

  const handleCopy = () => {
    if (!selectedMessage) return;
    navigator.clipboard.writeText(selectedMessage);
    setCopied(true);
    toast.success("Copiado!", "Script pronto para o WhatsApp.");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep(prev => prev + 1);
      setSelectedMessage('');
    } else {
      toast.success("Funil Concluído!", "Você percorreu todas as etapas da jornada.");
    }
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-transparent relative overflow-x-hidden">
        <DashboardParticles />
        
        {/* Fundo Atmosférico Vibrante */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
          <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-primary/20 rounded-full blur-[140px] animate-pulse"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-accent/10 rounded-full blur-[120px]"></div>
        </div>
        
        <AppSidebar />
        
        <main className="flex-1 flex flex-col min-w-0 relative z-10">
          <header className="h-[52px] border-b border-white/5 flex items-center justify-between px-6 bg-transparent sticky top-0 z-50">
            <div className="flex items-center gap-3">
              <SidebarTrigger className="md:hidden">
                <Menu className="h-5 w-5 text-white/50" />
              </SidebarTrigger>
              <GitBranch className="h-[14px] w-[14px] text-primary/70" />
              <h1 className="text-[13px] font-medium text-white/50">Funil de Vendas: Sites</h1>
            </div>
            <div className="bg-[#581c87]/40 border border-[#7c3aed]/30 text-[#c4b5fd] text-[11px] font-medium rounded-[6px] px-[10px] py-[4px] uppercase tracking-[0.5px]">
              VITALÍCIO
            </div>
          </header>

          <div className="flex-1 container max-w-5xl mx-auto p-4 md:p-8 space-y-8">
            <div className="space-y-2 text-center md:text-left">
              <h2 className="text-3xl font-black italic uppercase tracking-tighter text-white leading-none">
                ESTAÇÃO DE <span className="text-primary">CONVERSÃO</span>
              </h2>
              <p className="text-muted-foreground text-[10px] uppercase font-bold tracking-widest">Transforme leads frios em clientes de criação de sites.</p>
            </div>

            <div className="flex flex-col lg:grid lg:grid-cols-12 gap-6 lg:gap-8 items-start">
              
              {/* CADASTRO LEAD */}
              <div className="w-full lg:col-span-4 space-y-6">
                <Card className="glass-card border-white/10 rounded-[2rem] overflow-hidden">
                  <CardHeader className="bg-white/5 border-b border-white/5 p-6">
                    <CardTitle className="text-[10px] font-black uppercase tracking-widest text-primary flex items-center gap-2">
                      <User className="h-3 w-3" /> Ficha do Alvo
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 space-y-4">
                    <div className="space-y-2">
                      <Label className="text-[9px] font-black uppercase text-white/30 tracking-widest">Nome da Empresa</Label>
                      <Input 
                        placeholder="Ex: Padaria do João" 
                        value={leadName}
                        onChange={e => setLeadName(e.target.value)}
                        className="bg-white/5 border-white/10 h-12 rounded-xl focus-visible:ring-primary"
                      />
                    </div>
                  </CardContent>
                </Card>

                <div className="p-6 rounded-[2rem] bg-primary/5 border border-primary/20 text-center space-y-3">
                  <Info className="h-6 w-6 text-primary mx-auto" />
                  <p className="text-[10px] font-bold text-white/60 uppercase leading-relaxed italic">
                    "O site é a vitrine que nunca fecha. Venda autoridade, não apenas código."
                  </p>
                </div>
              </div>

              {/* FUNIL GUIADO */}
              <div className="w-full lg:col-span-8 space-y-6">
                <Card className="glass-card border-white/10 rounded-[2rem] overflow-hidden">
                  {/* Stepper */}
                  <div className="p-6 bg-white/5 border-b border-white/5 overflow-x-auto no-scrollbar">
                    <div className="flex items-center justify-between min-w-[600px] px-4">
                      {FUNNEL_STEPS.map((step, i) => (
                        <div key={step.id} className="flex items-center flex-1 last:flex-none">
                          <button
                            onClick={() => {
                              setCurrentStep(step.id);
                              setSelectedMessage('');
                            }}
                            className={cn(
                              "relative flex flex-col items-center gap-2 group transition-all",
                              currentStep === step.id ? "opacity-100" : "opacity-30 hover:opacity-50"
                            )}
                          >
                            <div className={cn(
                              "h-10 w-10 rounded-full flex items-center justify-center border-2 transition-all",
                              currentStep === step.id 
                                ? "bg-primary border-primary text-white shadow-[0_0_20px_rgba(124,58,255,0.4)]" 
                                : "bg-white/5 border-white/10 text-white/40"
                            )}>
                              {step.icon}
                            </div>
                            <span className="text-[8px] font-black uppercase tracking-widest whitespace-nowrap">{step.title}</span>
                          </button>
                          {i < FUNNEL_STEPS.length - 1 && (
                            <div className={cn(
                              "h-[1px] flex-1 mx-4 transition-all",
                              currentStep > step.id ? "bg-primary" : "bg-white/10"
                            )} />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  <CardContent className="p-8 space-y-8">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-xl font-black italic uppercase tracking-tighter text-white">
                          {activeStepData?.title}
                        </h3>
                        <Badge variant="outline" className="border-primary/30 text-primary text-[8px] font-black uppercase px-3 py-1">
                          Passo {currentStep} de 5
                        </Badge>
                      </div>
                      <div className="p-3 bg-white/5 border border-white/10 rounded-xl">
                        <p className="text-[10px] text-white/60 font-bold uppercase tracking-wider flex items-center gap-2">
                          <Zap className="h-3 w-3 text-primary fill-primary" /> {activeStepData?.hint}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {activeStepData?.templates.map((t, i) => {
                        const preview = t.replace(/\[Empresa\]/g, leadName || '[EMPRESA]');
                        return (
                          <button
                            key={i}
                            onClick={() => handleSelectTemplate(t)}
                            className="text-left p-5 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:border-primary/20 transition-all group relative overflow-hidden min-h-[140px]"
                          >
                            <div className="absolute top-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                              <Sparkles className="h-3 w-3 text-primary" />
                            </div>
                            <p className="text-[11px] text-white/60 leading-relaxed italic font-medium line-clamp-4">
                              "{preview}"
                            </p>
                            <div className="mt-4 flex items-center gap-2 text-[8px] font-black uppercase text-primary tracking-widest">
                              <MessageSquare className="h-2.5 w-2.5" /> Usar Modelo {i + 1}
                            </div>
                          </button>
                        );
                      })}
                    </div>

                    <AnimatePresence mode="wait">
                      {selectedMessage && (
                        <motion.div 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="space-y-4 pt-4 border-t border-white/5"
                        >
                          <div className="space-y-2">
                            <Label className="text-[9px] font-black uppercase text-white/30 tracking-widest ml-1">Script Editável</Label>
                            <Textarea 
                              value={selectedMessage}
                              onChange={e => setSelectedMessage(e.target.value)}
                              className="min-h-[180px] bg-black/40 border-white/10 rounded-2xl p-6 text-sm font-medium text-white/80 leading-relaxed resize-none focus-visible:ring-primary"
                            />
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <Button 
                              onClick={handleCopy}
                              className="h-14 rounded-xl bg-green-600 hover:bg-green-500 text-white font-black uppercase tracking-widest text-[10px] gap-2 shadow-xl group overflow-hidden relative"
                            >
                              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                              {copied ? 'COPIADO' : 'COPIAR MENSAGEM'}
                            </Button>
                            <Button 
                              onClick={handleNext}
                              className="h-14 rounded-xl bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-widest text-[10px] gap-2 shadow-lg shadow-primary/20"
                            >
                              PRÓXIMA ETAPA <ChevronRight className="h-4 w-4" />
                            </Button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
