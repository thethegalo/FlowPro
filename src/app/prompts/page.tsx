
"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  Layout, 
  Sparkles, 
  Copy, 
  Check, 
  Rocket, 
  ChevronRight, 
  ChevronLeft,
  Target,
  Palette,
  Users,
  MessageSquare,
  Layers,
  Zap,
  Smartphone,
  Monitor,
  MousePointerClick,
  Code2,
  Terminal,
  ShieldCheck,
  Search,
  Type,
  Briefcase
} from 'lucide-react';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from '@/components/AppSidebar';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

// --- CONFIGURAÇÕES E CONSTANTES ---

const STEPS = [
  { id: 1, title: 'Identidade', sub: 'Nome & Nicho', icon: Briefcase },
  { id: 2, title: 'Estratégia', sub: 'Objetivo Principal', icon: Target },
  { id: 3, title: 'Visual', sub: 'Estilo & Cores', icon: Palette },
  { id: 4, title: 'Público', sub: 'Audiência Alvo', icon: Users },
  { id: 5, title: 'Voz', sub: 'Tom de Mensagem', icon: Type },
  { id: 6, title: 'Estrutura', sub: 'Seções da LP', icon: Layers },
  { id: 7, title: 'Diferencial', sub: 'Proposta Única', icon: Zap },
  { id: 8, title: 'Launch', sub: 'Gerar Blueprint', icon: Rocket },
];

const NICHES = ["Infoprodutos", "SaaS/Tech", "Serviços Locais", "E-commerce", "Saúde/Bem-estar", "Consultoria", "Imóveis"];
const OBJECTIVES = ["Capturar Leads", "Vender Direto", "Agendar Reunião", "Distribuição de Conteúdo"];
const STYLES = ["Moderno & Dark", "Minimalista", "Corporativo", "Futurista", "Bold & Colorido"];
const TONES = ["Profissional", "Amigável", "Urgente", "Luxuoso", "Descontraído"];
const SECTIONS = ["Hero", "Problema/Dor", "Solução", "Benefícios", "Depoimentos", "Preços", "FAQ", "CTA Final"];

// --- COMPONENTES AUXILIARES ---

const SuggestButton = ({ onSuggest, label }: { onSuggest: () => void, label?: string }) => {
  const [loading, setLoading] = useState(false);
  
  const handleClick = () => {
    setLoading(true);
    setTimeout(() => {
      onSuggest();
      setLoading(false);
    }, 1200);
  };

  return (
    <button 
      onClick={handleClick}
      disabled={loading}
      className="flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest text-primary hover:text-primary/80 transition-all group"
    >
      {loading ? <Zap className="h-3 w-3 animate-spin" /> : <Sparkles className="h-3 w-3 group-hover:scale-110 transition-transform" />}
      {label || 'Sugerir com IA'}
    </button>
  );
};

// --- COMPONENTE PRINCIPAL ---

export default function PromptsPage() {
  const [blueprint, setBlueprint] = useState({
    step: 1,
    name: '',
    niche: '',
    objective: 'Capturar Leads',
    style: 'Moderno & Dark',
    palette: ['#7C3AED', '#ffffff'],
    audience: '',
    tone: 'Profissional',
    sections: ['Hero', 'Solução', 'CTA Final'],
    differential: '',
    extras: '',
    isGenerated: false,
  });

  const [generatedPrompt, setGeneratedPrompt] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const handleNext = () => {
    if (blueprint.step < 8) {
      setBlueprint(prev => ({ ...prev, step: prev.step + 1 }));
    } else {
      handleFinalGeneration();
    }
  };

  const handleBack = () => {
    if (blueprint.step > 1) {
      setBlueprint(prev => ({ ...prev, step: prev.step - 1 }));
    }
  };

  const handleFinalGeneration = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const prompt = `Atue como um Especialista em Web Design e Engenheiro de Prompts.
Gere o código completo para a Landing Page da marca "${blueprint.name}", focada no nicho de ${blueprint.niche}.

ESPECIFICAÇÕES TÉCNICAS:
- Objetivo: ${blueprint.objective}
- Estilo Visual: ${blueprint.style}
- Paleta: ${blueprint.palette.join(', ')}
- Tom de Voz: ${blueprint.tone}
- Público: ${blueprint.audience}

ESTRUTURA SOLICITADA:
${blueprint.sections.map((s, i) => `${i+1}. ${s}`).join('\n')}

Diferencial Competitivo: ${blueprint.differential}

Utilize Next.js 15, Tailwind CSS e Lucide Icons. Garanta responsividade mobile e alta taxa de conversão.`;
      
      setGeneratedPrompt(prompt);
      setIsGenerating(false);
      setBlueprint(prev => ({ ...prev, isGenerated: true }));
      toast({ title: "Blueprint Gerado!", description: "Seu comando mestre está pronto." });
    }, 3000);
  };

  const isStepValid = () => {
    if (blueprint.step === 1) return blueprint.name.length > 2 && blueprint.niche !== '';
    if (blueprint.step === 4) return blueprint.audience.length > 5;
    return true;
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-[#050505] text-white relative overflow-hidden font-body">
        {/* Topographic Background Pattern */}
        <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.03] select-none scale-110">
          <svg width="100%" height="100%" viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 100 C 200 150, 400 50, 600 100 S 800 150, 1000 100" stroke="white" fill="transparent" strokeWidth="2" />
            <path d="M0 200 C 200 250, 400 150, 600 200 S 800 250, 1000 200" stroke="white" fill="transparent" strokeWidth="2" />
            <path d="M0 300 C 200 350, 400 250, 600 300 S 800 350, 1000 300" stroke="white" fill="transparent" strokeWidth="2" />
            <path d="M0 400 C 200 450, 400 350, 600 400 S 800 450, 1000 400" stroke="white" fill="transparent" strokeWidth="2" />
            <path d="M0 500 C 200 550, 400 450, 600 500 S 800 550, 1000 500" stroke="white" fill="transparent" strokeWidth="2" />
          </svg>
        </div>

        <AppSidebar />
        
        <main className="flex-1 flex flex-col min-w-0 relative z-10">
          <header className="h-16 border-b border-white/5 flex items-center justify-between px-6 bg-[#050505]/80 backdrop-blur-xl sticky top-0 z-50">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="text-muted-foreground hover:text-white" />
              <div className="h-4 w-px bg-white/10 hidden md:block" />
              <h1 className="text-sm font-black italic uppercase tracking-[0.2em] flex items-center gap-2">
                <Terminal className="h-4 w-4 text-primary" /> Blueprint Workstation
              </h1>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-primary animate-pulse shadow-[0_0_10px_#7c3aed]" />
              <span className="text-[8px] font-black uppercase tracking-widest text-white/40">Neural Sync Active</span>
            </div>
          </header>

          <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
            
            {/* --- COLUNA 1: STEPPER LATERAL --- */}
            <aside className="w-full lg:w-64 border-r border-white/5 bg-black/20 p-6 flex-shrink-0 hidden lg:block">
              <div className="space-y-8">
                <div className="space-y-1">
                  <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-primary italic">Processo de Engenharia</h2>
                  <p className="text-[8px] font-bold text-muted-foreground uppercase">Configure os parâmetros do sistema</p>
                </div>
                
                <nav className="space-y-4">
                  {STEPS.map((s) => {
                    const isActive = blueprint.step === s.id;
                    const isCompleted = blueprint.step > s.id;
                    return (
                      <div 
                        key={s.id} 
                        className={cn(
                          "flex items-center gap-4 transition-all duration-500",
                          isActive ? "opacity-100 translate-x-2" : "opacity-30"
                        )}
                      >
                        <div className={cn(
                          "h-8 w-8 rounded-full border flex items-center justify-center transition-all",
                          isActive ? "border-primary bg-primary/20 shadow-[0_0_15px_rgba(124,58,237,0.5)]" : "border-white/10 bg-white/5",
                          isCompleted && "border-green-500 bg-green-500/20 shadow-[0_0_10px_rgba(34,197,94,0.3)]"
                        )}>
                          {isCompleted ? <Check className="h-4 w-4 text-green-500" /> : <s.icon className={cn("h-3.5 w-3.5", isActive ? "text-primary" : "text-white")} />}
                        </div>
                        <div className="space-y-0.5">
                          <p className="text-[9px] font-black uppercase tracking-wider">{s.title}</p>
                          <p className="text-[7px] font-bold text-muted-foreground uppercase">{s.sub}</p>
                        </div>
                      </div>
                    );
                  })}
                </nav>
              </div>
            </aside>

            {/* --- COLUNA 2: CONFIGURAÇÃO CENTRAL --- */}
            <section className="flex-1 overflow-y-auto p-4 md:p-8 lg:p-12 relative flex flex-col items-center">
              <div className="w-full max-w-2xl space-y-10">
                
                <AnimatePresence mode="wait">
                  <motion.div
                    key={blueprint.step}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.4 }}
                    className="space-y-8"
                  >
                    {/* Header do Passo */}
                    <div className="space-y-2">
                      <Badge variant="outline" className="border-primary/30 text-primary text-[8px] font-black px-3 py-1 bg-primary/5">
                        STAGE 0{blueprint.step}
                      </Badge>
                      <h2 className="text-4xl font-black italic uppercase tracking-tighter">
                        {STEPS[blueprint.step - 1].title}
                      </h2>
                      <p className="text-muted-foreground text-sm font-medium">
                        {STEPS[blueprint.step - 1].sub}. Preencha com precisão.
                      </p>
                    </div>

                    {/* Formulários Dinâmicos */}
                    <Card className="bg-white/[0.02] border-white/10 backdrop-blur-2xl rounded-[2.5rem] overflow-hidden shadow-2xl">
                      <CardContent className="p-8 md:p-10 space-y-6">
                        
                        {blueprint.step === 1 && (
                          <div className="space-y-6">
                            <div className="space-y-3">
                              <Label className="text-[10px] font-black uppercase tracking-widest opacity-50">Nome do Projeto / Marca</Label>
                              <Input 
                                placeholder="Ex: Flow Agency"
                                className="h-14 bg-white/5 border-white/10 rounded-2xl focus-visible:ring-primary text-lg font-bold italic"
                                value={blueprint.name}
                                onChange={e => setBlueprint({...blueprint, name: e.target.value})}
                              />
                            </div>
                            <div className="space-y-3">
                              <Label className="text-[10px] font-black uppercase tracking-widest opacity-50">Nicho de Atuação</Label>
                              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                {NICHES.map(n => (
                                  <button
                                    key={n}
                                    onClick={() => setBlueprint({...blueprint, niche: n})}
                                    className={cn(
                                      "px-4 py-3 rounded-xl text-[10px] font-black uppercase transition-all border",
                                      blueprint.niche === n ? "bg-primary/20 border-primary text-primary" : "bg-white/5 border-white/5 text-muted-foreground hover:bg-white/10"
                                    )}
                                  >
                                    {n}
                                  </button>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}

                        {blueprint.step === 2 && (
                          <div className="space-y-6">
                            <div className="space-y-3">
                              <Label className="text-[10px] font-black uppercase tracking-widest opacity-50">Qual o foco principal?</Label>
                              <div className="grid gap-3">
                                {OBJECTIVES.map(obj => (
                                  <button
                                    key={obj}
                                    onClick={() => setBlueprint({...blueprint, objective: obj})}
                                    className={cn(
                                      "flex items-center justify-between p-5 rounded-2xl border transition-all",
                                      blueprint.objective === obj ? "bg-primary/10 border-primary text-white shadow-lg" : "bg-white/[0.02] border-white/5 text-muted-foreground hover:bg-white/5"
                                    )}
                                  >
                                    <span className="font-bold uppercase italic text-sm">{obj}</span>
                                    {blueprint.objective === obj && <Zap className="h-4 w-4 text-primary fill-primary" />}
                                  </button>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}

                        {blueprint.step === 3 && (
                          <div className="space-y-6">
                            <div className="space-y-3">
                              <Label className="text-[10px] font-black uppercase tracking-widest opacity-50">Estilo Visual</Label>
                              <div className="flex flex-wrap gap-2">
                                {STYLES.map(s => (
                                  <button
                                    key={s}
                                    onClick={() => setBlueprint({...blueprint, style: s})}
                                    className={cn(
                                      "px-4 py-2 rounded-lg text-[9px] font-black uppercase border transition-all",
                                      blueprint.style === s ? "bg-primary text-white border-primary" : "bg-white/5 border-white/10 text-muted-foreground"
                                    )}
                                  >
                                    {s}
                                  </button>
                                ))}
                              </div>
                            </div>
                            <div className="space-y-3">
                              <Label className="text-[10px] font-black uppercase tracking-widest opacity-50">Cor Primária (HEX)</Label>
                              <div className="flex items-center gap-4">
                                <div className="h-14 w-14 rounded-2xl border border-white/10 shrink-0" style={{ background: blueprint.palette[0] }} />
                                <Input 
                                  value={blueprint.palette[0]}
                                  onChange={e => setBlueprint({...blueprint, palette: [e.target.value, blueprint.palette[1]]})}
                                  className="h-14 bg-white/5 border-white/10 rounded-2xl font-mono text-center"
                                />
                              </div>
                            </div>
                          </div>
                        )}

                        {blueprint.step === 4 && (
                          <div className="space-y-6">
                            <div className="flex items-center justify-between">
                              <Label className="text-[10px] font-black uppercase tracking-widest opacity-50">Público-Alvo Ideal</Label>
                              <SuggestButton onSuggest={() => setBlueprint({...blueprint, audience: 'Donos de agências de marketing e freelancers que faturam acima de R$ 10k/mês e buscam escala.'})} />
                            </div>
                            <Textarea 
                              placeholder="Descreva quem vai comprar de você..."
                              className="min-h-[150px] bg-white/5 border-white/10 rounded-2xl text-base p-6 leading-relaxed"
                              value={blueprint.audience}
                              onChange={e => setBlueprint({...blueprint, audience: e.target.value})}
                            />
                          </div>
                        )}

                        {blueprint.step === 5 && (
                          <div className="space-y-6">
                            <Label className="text-[10px] font-black uppercase tracking-widest opacity-50">Como a marca fala?</Label>
                            <div className="grid grid-cols-2 gap-3">
                              {TONES.map(t => (
                                <button
                                  key={t}
                                  onClick={() => setBlueprint({...blueprint, tone: t})}
                                  className={cn(
                                    "p-6 rounded-2xl border text-center transition-all",
                                    blueprint.tone === t ? "bg-primary/20 border-primary text-white" : "bg-white/5 border-white/5 text-muted-foreground"
                                  )}
                                >
                                  <span className="font-black uppercase tracking-tighter italic text-sm">{t}</span>
                                </button>
                              ))}
                            </div>
                          </div>
                        )}

                        {blueprint.step === 6 && (
                          <div className="space-y-6">
                            <Label className="text-[10px] font-black uppercase tracking-widest opacity-50">Estrutura de Seções (Seleção)</Label>
                            <div className="grid grid-cols-2 gap-2">
                              {SECTIONS.map(s => (
                                <button
                                  key={s}
                                  onClick={() => {
                                    setBlueprint(prev => ({
                                      ...prev,
                                      sections: prev.sections.includes(s) ? prev.sections.filter(sec => sec !== s) : [...prev.sections, s]
                                    }));
                                  }}
                                  className={cn(
                                    "p-4 rounded-xl border text-[10px] font-black uppercase transition-all",
                                    blueprint.sections.includes(s) ? "bg-green-500/20 border-green-500 text-green-400" : "bg-white/5 border-white/5 text-muted-foreground"
                                  )}
                                >
                                  {s}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}

                        {blueprint.step === 7 && (
                          <div className="space-y-6">
                            <div className="flex items-center justify-between">
                              <Label className="text-[10px] font-black uppercase tracking-widest opacity-50">Proposta Única de Valor</Label>
                              <SuggestButton onSuggest={() => setBlueprint({...blueprint, differential: 'Entrega de LP profissional em menos de 48h com foco total em conversão e SEO otimizado.'})} />
                            </div>
                            <Input 
                              placeholder="O que te faz único?"
                              className="h-14 bg-white/5 border-white/10 rounded-2xl px-6"
                              value={blueprint.differential}
                              onChange={e => setBlueprint({...blueprint, differential: e.target.value})}
                            />
                          </div>
                        )}

                        {blueprint.step === 8 && (
                          <div className="space-y-8 py-10 text-center">
                            <div className="h-20 w-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto border border-primary/30 animate-pulse">
                              <ShieldCheck className="h-10 w-10 text-primary" />
                            </div>
                            <div className="space-y-2">
                              <h3 className="text-2xl font-black italic uppercase tracking-tighter">Blueprint Concluído</h3>
                              <p className="text-muted-foreground text-xs uppercase font-bold tracking-widest">Seu plano neural está pronto para ser processado.</p>
                            </div>
                            
                            {isGenerating ? (
                              <div className="space-y-4">
                                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                  <motion.div 
                                    className="h-full bg-primary"
                                    initial={{ width: 0 }}
                                    animate={{ width: '100%' }}
                                    transition={{ duration: 3 }}
                                  />
                                </div>
                                <p className="text-[8px] font-black uppercase tracking-[0.4em] text-primary animate-pulse italic">Estruturando algoritmos de conversão...</p>
                              </div>
                            ) : blueprint.isGenerated ? (
                              <div className="p-6 bg-green-500/10 border border-green-500/30 rounded-2xl text-green-400 text-[10px] font-black uppercase tracking-widest">
                                Comandos neurais gerados com sucesso!
                              </div>
                            ) : null}
                          </div>
                        )}

                      </CardContent>
                    </Card>

                    {/* Controles de Navegação */}
                    <div className="flex items-center gap-4">
                      <Button 
                        variant="outline" 
                        onClick={handleBack}
                        disabled={blueprint.step === 1 || isGenerating}
                        className="h-16 w-20 rounded-2xl border-white/10 bg-white/5 hover:bg-white/10"
                      >
                        <ChevronLeft className="h-6 w-6" />
                      </Button>
                      <Button 
                        onClick={handleNext}
                        disabled={!isStepValid() || isGenerating}
                        className={cn(
                          "flex-1 h-16 rounded-2xl font-black uppercase tracking-[0.2em] shadow-xl transition-all",
                          isStepValid() ? "bg-primary hover:bg-primary/90 shadow-primary/20 animate-pulse" : "bg-white/5 text-muted-foreground border-white/10 cursor-not-allowed"
                        )}
                      >
                        {blueprint.step === 8 ? 'DISPARAR ENGENHARIA' : 'PRÓXIMO PASSO'}
                        <ChevronRight className="ml-2 h-5 w-5" />
                      </Button>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Exibição do Prompt Final */}
                {blueprint.isGenerated && !isGenerating && (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6 pt-10"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-black italic uppercase text-primary">Comando Mestre</h3>
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => {
                            navigator.clipboard.writeText(generatedPrompt);
                            setIsCopied(true);
                            setTimeout(() => setIsCopied(false), 2000);
                            toast({ title: "Copiado!" });
                          }}
                          className="h-10 rounded-xl border-white/10 bg-white/5 gap-2"
                        >
                          {isCopied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                          {isCopied ? 'COPIADO' : 'COPIAR PROMPT'}
                        </Button>
                      </div>
                    </div>
                    <div className="bg-black/60 p-8 rounded-3xl border border-primary/20 text-sm font-medium italic text-white/80 leading-relaxed font-mono shadow-inner">
                      {generatedPrompt}
                    </div>
                  </motion.div>
                )}

              </div>
            </section>

            {/* --- COLUNA 3: LIVE PREVIEW (iPhone) --- */}
            <aside className="w-full lg:w-[450px] border-l border-white/5 bg-black/40 p-10 flex flex-col items-center justify-center flex-shrink-0 hidden xl:flex">
              <div className="relative group">
                {/* Glow Effect */}
                <div 
                  className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full transition-all duration-1000"
                  style={{ backgroundColor: `${blueprint.palette[0]}20` }}
                />
                
                {/* Smartphone Frame */}
                <div className="w-[300px] h-[620px] bg-[#0a0a0a] rounded-[3.5rem] border-[10px] border-[#1a1a1a] shadow-[0_40px_100px_rgba(0,0,0,0.8)] relative overflow-hidden flex flex-col z-10 transition-all duration-700">
                  
                  {/* Notch */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-[#1a1a1a] rounded-b-3xl z-20" />
                  
                  {/* Internal Screen Content */}
                  <div className="flex-1 flex flex-col bg-[#050505] overflow-y-auto no-scrollbar">
                    {/* Header Simulado */}
                    <div className="h-16 px-6 flex items-center justify-between border-b border-white/5 shrink-0">
                      <div className="h-4 w-12 bg-white/5 rounded-full" />
                      <div className="h-6 w-6 rounded-full bg-primary/20" style={{ background: `${blueprint.palette[0]}30` }} />
                    </div>

                    <div className="p-6 space-y-6">
                      {/* Hero Preview */}
                      <div className="space-y-3 pt-4">
                        <div 
                          className="h-3 w-20 rounded-full mb-2" 
                          style={{ background: blueprint.palette[0] }} 
                        />
                        <h4 className="text-2xl font-black italic uppercase leading-none">
                          {blueprint.name || 'Sua Marca'}
                        </h4>
                        <p className="text-[10px] text-white/40 leading-relaxed">
                          {blueprint.differential || 'O segredo da alta performance neural.'}
                        </p>
                        <div 
                          className="h-10 w-full rounded-xl mt-4 shadow-lg shadow-primary/20 flex items-center justify-center text-[10px] font-black uppercase tracking-widest"
                          style={{ background: blueprint.palette[0], color: blueprint.palette[1] }}
                        >
                          {blueprint.objective}
                        </div>
                      </div>

                      {/* Dynamic Sections Preview */}
                      <div className="space-y-4 pt-6">
                        {blueprint.sections.map((s, i) => (
                          <div key={i} className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-[8px] font-black uppercase tracking-widest text-white/20">{s}</span>
                              <div className="h-1.5 w-1.5 rounded-full" style={{ background: blueprint.palette[0] }} />
                            </div>
                            <div className="h-2 w-full bg-white/5 rounded-full" />
                            <div className="h-2 w-2/3 bg-white/5 rounded-full" />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Reflection */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/[0.02] to-transparent pointer-events-none" />
                </div>
              </div>
              
              <div className="mt-10 flex flex-col items-center gap-2">
                <div className="flex gap-2">
                  <Smartphone className="h-4 w-4 text-primary" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-white/60 italic">Live Mobile Blueprint</span>
                </div>
                <p className="text-[8px] font-bold text-white/20 uppercase">Renderização Neural em Tempo Real</p>
              </div>
            </aside>

          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
