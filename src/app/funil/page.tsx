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
  Phone
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
    templates: [
      "Olá [Empresa]! Notei que vocês atuam fortemente no nicho de [Nicho], mas ainda não possuem um sistema de captura automática de leads. Posso te enviar uma sugestão de como aumentar suas vendas?",
      "Oi pessoal da [Empresa]! Vi o perfil de vocês no radar. Gostaria de saber se vocês já usam IA para responder clientes no WhatsApp? Isso recupera até 30% das vendas perdidas."
    ]
  },
  { 
    id: 2, 
    title: 'Follow-up', 
    icon: <RotateCcw className="h-4 w-4" />,
    templates: [
      "Oi [Empresa], passando para saber se conseguiu ver minha mensagem anterior? Sei que as coisas são corridas por aí, mas não queria que perdessem essa oportunidade no nicho de [Nicho].",
      "Olá! Vi que minha mensagem ficou perdida. Só para reforçar: identifiquei um gargalo operacional na [Empresa] que podemos resolver em 48h. Teria 2 minutos?"
    ]
  },
  { 
    id: 3, 
    title: 'Interesse', 
    icon: <Sparkles className="h-4 w-4" />,
    templates: [
      "Que bom que gostou! O próximo passo para a [Empresa] é validarmos o Radar Neural. Posso te mostrar uma demo rápida de como funciona a prospecção no seu nicho?",
      "Fico feliz com o interesse! Basicamente, o FlowPro automatiza o que você levaria horas fazendo manualmente. Quer agendar uma call de 5 min para eu te mostrar os ganhos?"
    ]
  },
  { 
    id: 4, 
    title: 'Objeção', 
    icon: <ShieldCheck className="h-4 w-4" />,
    templates: [
      "Entendo que o investimento agora pareça um desafio. Mas se a [Empresa] fechar apenas 1 novo contrato de [Nicho] com o sistema, ele já se paga 3x. Faz sentido?",
      "Sobre o tempo: a implementação é 100% por nossa conta. Você só precisa apertar o play e colher os leads. Vamos remover esse peso das suas costas hoje?"
    ]
  },
  { 
    id: 5, 
    title: 'Fechamento', 
    icon: <Zap className="h-4 w-4" />,
    templates: [
      "Tudo pronto para iniciarmos a escala na [Empresa]! Vou te enviar o link de acesso e já configuramos seu primeiro Radar agora mesmo. Podemos seguir?",
      "Excelente escolha. O ecossistema FlowPro vai mudar o jogo para você. Segue o link para liberação do seu painel de comando. Seja bem-vindo ao topo!"
    ]
  }
];

export default function FunnelPage() {
  const [leadName, setLeadName] = useState('');
  const [leadNiche, setLeadNiche] = useState('');
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedMessage, setSelectedMessage] = useState('');
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const activeStepData = FUNNEL_STEPS.find(s => s.id === currentStep);

  const handleSelectTemplate = (template: string) => {
    let final = template
      .replace(/\[Empresa\]/g, leadName || '[NOME DA EMPRESA]')
      .replace(/\[Nicho\]/g, leadNiche || '[SEU NICHO]');
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
      <div className="flex min-h-screen w-full bg-[#050508] relative overflow-x-hidden">
        <DashboardParticles />
        
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
              <h1 className="text-[13px] font-medium text-white/50">Funil de Vendas</h1>
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
              <p className="text-muted-foreground text-[10px] uppercase font-bold tracking-widest">Acompanhe seu lead do primeiro oi ao fechamento.</p>
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
                      <Label className="text-[9px] font-black uppercase text-white/30 tracking-widest">Empresa</Label>
                      <Input 
                        placeholder="Nome do Lead" 
                        value={leadName}
                        onChange={e => setLeadName(e.target.value)}
                        className="bg-white/5 border-white/10 h-12 rounded-xl focus-visible:ring-primary"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[9px] font-black uppercase text-white/30 tracking-widest">Nicho de Atuação</Label>
                      <Input 
                        placeholder="Ex: Barbearia, Dentista..." 
                        value={leadNiche}
                        onChange={e => setLeadNiche(e.target.value)}
                        className="bg-white/5 border-white/10 h-12 rounded-xl focus-visible:ring-primary"
                      />
                    </div>
                  </CardContent>
                </Card>

                <div className="p-6 rounded-[2rem] bg-primary/5 border border-primary/20 text-center space-y-3">
                  <ShieldCheck className="h-6 w-6 text-primary mx-auto" />
                  <p className="text-[10px] font-bold text-white/60 uppercase leading-relaxed italic">
                    "O fechamento não é sorte, é processo. Siga as etapas e o resultado virá."
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
                            onClick={() => setCurrentStep(step.id)}
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
                      <p className="text-xs text-white/40 font-medium">Escolha um modelo de abordagem para este estágio do funil:</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {activeStepData?.templates.map((t, i) => (
                        <button
                          key={i}
                          onClick={() => handleSelectTemplate(t)}
                          className="text-left p-5 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:border-primary/20 transition-all group relative overflow-hidden min-h-[140px]"
                        >
                          <div className="absolute top-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Zap className="h-3 w-3 text-primary fill-primary" />
                          </div>
                          <p className="text-[11px] text-white/60 leading-relaxed italic font-medium line-clamp-4">
                            "{t}"
                          </p>
                          <div className="mt-4 flex items-center gap-2 text-[8px] font-black uppercase text-primary tracking-widest">
                            <MessageSquare className="h-2.5 w-2.5" /> Selecionar Modelo {i + 1}
                          </div>
                        </button>
                      ))}
                    </div>

                    <AnimatePresence mode="wait">
                      {selectedMessage && (
                        <motion.div 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="space-y-4 pt-4"
                        >
                          <div className="space-y-2">
                            <Label className="text-[9px] font-black uppercase text-white/30 tracking-widest ml-1">Script Personalizado</Label>
                            <Textarea 
                              value={selectedMessage}
                              onChange={e => setSelectedMessage(e.target.value)}
                              className="min-h-[150px] bg-black/40 border-white/10 rounded-2xl p-6 text-sm font-medium text-white/80 leading-relaxed resize-none focus-visible:ring-primary"
                            />
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <Button 
                              onClick={handleCopy}
                              className="h-14 rounded-xl bg-white text-black hover:bg-white/90 font-black uppercase tracking-widest text-[10px] gap-2 shadow-xl group overflow-hidden relative"
                            >
                              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                              {copied ? <Check className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4" />}
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
