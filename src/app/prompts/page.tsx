"use client";

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  Copy, 
  Check, 
  Rocket, 
  ChevronRight, 
  ChevronLeft,
  Target,
  Palette,
  Users,
  Layers,
  Zap,
  Terminal,
  Type,
  Briefcase,
  Binary,
  Bell,
  Download,
  Loader2,
  Sparkles,
  MousePointerClick
} from 'lucide-react';
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from '@/components/AppSidebar';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { generateMasterPrompt } from '@/ai/flows/generate-master-prompt';

const STEPS = [
  { id: 1, title: 'Identidade', sub: 'Nome, Nicho & Idioma', icon: Briefcase },
  { id: 2, title: 'Estratégia', sub: 'Objetivo Principal', icon: Target },
  { id: 3, title: 'Visual', sub: 'Estilo & Cores', icon: Palette },
  { id: 4, title: 'Público', sub: 'Audiência Alvo', icon: Users },
  { id: 5, title: 'Voz', sub: 'Tom de Mensagem', icon: Type },
  { id: 6, title: 'Estrutura', sub: 'Seções da LP', icon: Layers },
  { id: 7, title: 'Diferencial', sub: 'Proposta Única', icon: Zap },
  { id: 8, title: 'Launch', sub: 'Gerar Briefing', icon: Rocket },
];

const LANGUAGES = [
  { id: 'Português (BR)', label: 'Português (BR)', icon: '🇧🇷' },
  { id: 'English (US)', label: 'English (US)', icon: '🇺🇸' },
];

const NICHES = ["Infoprodutos", "SaaS/Tech", "Serviços Locais", "E-commerce", "Saúde/Bem-estar", "Consultoria", "Imóveis"];
const OBJECTIVES = ["Capturar Leads", "Vender Direto", "Agendar Reunião", "Distribuição de Conteúdo"];
const STYLES = ["Moderno & Dark", "Minimalista", "Corporativo", "Futurista", "Cyberpunk", "Clean White", "Luxo Profundo"];
const TONES = ["Profissional", "Amigável", "Urgente", "Luxuoso", "Descontraído"];
const SECTIONS = ["Hero", "Problema/Dor", "Solução", "Benefícios", "Depoimentos", "Preços", "FAQ", "CTA Final"];

export default function PromptsPage() {
  const [blueprint, setBlueprint] = useState({
    step: 1, language: 'Português (BR)', name: '', niche: '', objective: 'Capturar Leads',
    style: 'Moderno & Dark', palette: ['#7C3AED', '#ffffff'], audience: '',
    tone: 'Profissional', sections: ['Hero', 'Solução', 'CTA Final'], differential: '',
    extras: '', isGenerated: false,
  });

  const [generatedPrompt, setGeneratedPrompt] = useState('');
  const [wordCount, setWordCount] = useState(0);
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

  const handleFinalGeneration = async () => {
    setIsGenerating(true);
    try {
      const result = await generateMasterPrompt({
        name: blueprint.name || 'Projeto Sem Nome',
        niche: blueprint.niche || 'Geral',
        language: blueprint.language,
        objective: blueprint.objective,
        style: blueprint.style,
        palette: blueprint.palette,
        audience: blueprint.audience || 'Geral',
        tone: blueprint.tone,
        sections: blueprint.sections,
        differential: blueprint.differential || 'Qualidade e Inovação',
      });

      setGeneratedPrompt(result.prompt);
      setWordCount(result.wordCount);
      setBlueprint(prev => ({ ...prev, isGenerated: true }));
      toast.success("Briefing Gerado com Sucesso!");
    } catch (error: any) {
      toast.error("Erro na Geração Neural", "Tente novamente em alguns instantes.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([generatedPrompt], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `briefing-${blueprint.name || 'projeto'}.txt`;
    document.body.appendChild(element);
    element.click();
    toast.success("Download iniciado!");
  };

  const toggleSection = (section: string) => {
    setBlueprint(prev => ({
      ...prev,
      sections: prev.sections.includes(section) 
        ? prev.sections.filter(s => s !== section)
        : [...prev.sections, section]
    }));
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-transparent text-white relative z-10 font-body">
        <AppSidebar />
        <main className="flex-1 flex flex-col min-w-0 bg-transparent">
          <header className="h-[48px] border-b border-white/5 flex items-center justify-between px-7 bg-transparent sticky top-0 z-50">
            <div className="flex items-center gap-3">
              <Terminal className="h-[14px] w-[14px] text-[#8b5cf6]/60" />
              <h1 className="text-[13px] font-medium text-white/50">Blueprint Workstation</h1>
            </div>
            <div className="flex items-center gap-4">
              <Bell className="h-4 w-4 text-white/20 hover:text-white/40 cursor-pointer" />
              <div className="bg-[#581c87]/40 border border-[#7c3aed]/30 text-[#c4b5fd] text-[11px] font-medium rounded-[6px] px-[10px] py-[4px] uppercase tracking-[0.5px]">
                VITALÍCIO
              </div>
            </div>
          </header>

          <div className="flex-1 flex flex-col lg:flex-row overflow-hidden bg-transparent">
            <aside className="w-full lg:w-64 border-r border-white/5 bg-white/[0.03] backdrop-blur-[12px] p-6 flex-shrink-0 hidden lg:block">
              <div className="space-y-8">
                <div className="space-y-1">
                  <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary">Engenharia de Prompt</h2>
                  <p className="text-[8px] font-bold text-muted-foreground uppercase">Configure o sistema</p>
                </div>
                <nav className="space-y-4">
                  {STEPS.map((s) => (
                    <div key={s.id} className={cn("flex items-center gap-4 transition-all duration-500", blueprint.step === s.id ? "opacity-100 translate-x-2" : "opacity-30")}>
                      <div className={cn("h-8 w-8 rounded-full border flex items-center justify-center transition-all", blueprint.step === s.id ? "border-primary bg-primary/20" : "border-white/10 bg-white/5")}>
                        {blueprint.step > s.id ? <Check className="h-4 w-4 text-green-500" /> : <s.icon className="h-3.5 w-3.5" />}
                      </div>
                      <div className="space-y-0.5">
                        <p className="text-[9px] font-bold uppercase tracking-wider">{s.title}</p>
                        <p className="text-[7px] font-bold text-muted-foreground uppercase">{s.sub}</p>
                      </div>
                    </div>
                  ))}
                </nav>
              </div>
            </aside>

            <section className="flex-1 overflow-y-auto p-8 relative flex flex-col items-center bg-transparent">
              <div className="w-full max-w-2xl space-y-10">
                <AnimatePresence mode="wait">
                  {!blueprint.isGenerated ? (
                    <motion.div key={blueprint.step} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-8">
                      <div className="space-y-2">
                        <h2 className="text-3xl font-semibold text-white tracking-tight">{STEPS[blueprint.step - 1].title}</h2>
                        <p className="text-white/30 text-[11px] uppercase tracking-[0.8px]">{STEPS[blueprint.step - 1].sub}</p>
                      </div>

                      <Card className="glass-card bg-white/[0.04] backdrop-blur-[12px] border-white/5 rounded-[2rem] overflow-hidden shadow-none">
                        <CardContent className="p-10 space-y-8">
                          {blueprint.step === 1 && (
                            <div className="space-y-8">
                              <div className="flex gap-2">
                                {LANGUAGES.map(lang => (
                                  <button key={lang.id} onClick={() => setBlueprint({...blueprint, language: lang.id})} className={cn("flex-1 h-14 rounded-xl border transition-all flex items-center justify-center gap-2", blueprint.language === lang.id ? "bg-primary/25 border-primary/40 text-[#c4b5fd]" : "bg-white/[0.04] border-white/5 text-white/40")}>
                                    <span className="text-lg">{lang.icon}</span>
                                    <span className="text-[10px] font-bold uppercase">{lang.label}</span>
                                  </button>
                                ))}
                              </div>
                              <div className="space-y-3">
                                <Label className="text-[10px] font-bold uppercase tracking-widest text-white/30">Nome do Projeto</Label>
                                <Input placeholder="Ex: Flow Agency" className="h-14 bg-white/[0.04] border-white/5 rounded-xl focus-visible:ring-primary" value={blueprint.name} onChange={e => setBlueprint({...blueprint, name: e.target.value})} />
                              </div>
                              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                {NICHES.map(n => (
                                  <button key={n} onClick={() => setBlueprint({...blueprint, niche: n})} className={cn("px-4 py-3 rounded-xl text-[10px] font-bold uppercase transition-all border", blueprint.niche === n ? "bg-primary/25 border-primary/40 text-[#c4b5fd]" : "bg-white/[0.04] border-white/5 text-white/40")}>
                                    {n}
                                  </button>
                                ))}
                              </div>
                            </div>
                          )}

                          {blueprint.step === 2 && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              {OBJECTIVES.map(obj => (
                                <button key={obj} onClick={() => setBlueprint({...blueprint, objective: obj})} className={cn("p-6 rounded-2xl border transition-all text-left space-y-2", blueprint.objective === obj ? "bg-primary/25 border-primary/40" : "bg-white/[0.04] border-white/5")}>
                                  <p className="text-[11px] font-bold uppercase text-white/90">{obj}</p>
                                  <p className="text-[9px] text-white/30 leading-relaxed">Otimizar o briefing para este foco estratégico.</p>
                                </button>
                              ))}
                            </div>
                          )}

                          {blueprint.step === 3 && (
                            <div className="space-y-6">
                              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                {STYLES.map(s => (
                                  <button key={s} onClick={() => setBlueprint({...blueprint, style: s})} className={cn("px-4 py-3 rounded-xl text-[10px] font-bold uppercase transition-all border", blueprint.style === s ? "bg-primary/25 border-primary/40 text-[#c4b5fd]" : "bg-white/[0.04] border-white/5 text-white/40")}>
                                    {s}
                                  </button>
                                ))}
                              </div>
                            </div>
                          )}

                          {blueprint.step === 4 && (
                            <div className="space-y-4">
                              <Label className="text-[10px] font-bold uppercase tracking-widest text-white/30">Descreva o cliente ideal</Label>
                              <Textarea 
                                placeholder="Ex: Donos de barbearias que faturam +10k e querem automatizar agenda." 
                                className="min-h-[150px] bg-white/[0.04] border-white/5 rounded-2xl p-6 text-sm"
                                value={blueprint.audience}
                                onChange={e => setBlueprint({...blueprint, audience: e.target.value})}
                              />
                            </div>
                          )}

                          {blueprint.step === 5 && (
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                              {TONES.map(t => (
                                <button key={t} onClick={() => setBlueprint({...blueprint, tone: t})} className={cn("px-4 py-3 rounded-xl text-[10px] font-bold uppercase transition-all border", blueprint.tone === t ? "bg-primary/25 border-primary/40 text-[#c4b5fd]" : "bg-white/[0.04] border-white/5 text-white/40")}>
                                  {t}
                                </button>
                              ))}
                            </div>
                          )}

                          {blueprint.step === 6 && (
                            <div className="grid grid-cols-2 gap-2">
                              {SECTIONS.map(s => (
                                <button key={s} onClick={() => toggleSection(s)} className={cn("px-4 py-3 rounded-xl text-[10px] font-bold uppercase transition-all border flex items-center justify-between", blueprint.sections.includes(s) ? "bg-primary/25 border-primary/40 text-[#c4b5fd]" : "bg-white/[0.04] border-white/5 text-white/40")}>
                                  {s}
                                  {blueprint.sections.includes(s) && <Check className="h-3 w-3" />}
                                </button>
                              ))}
                            </div>
                          )}

                          {blueprint.step === 7 && (
                            <div className="space-y-4">
                              <Label className="text-[10px] font-bold uppercase tracking-widest text-white/30">Qual o diferencial do projeto?</Label>
                              <Textarea 
                                placeholder="Ex: Integração com IA para análise de sentimentos ou dashboard em tempo real." 
                                className="min-h-[150px] bg-white/[0.04] border-white/5 rounded-2xl p-6 text-sm"
                                value={blueprint.differential}
                                onChange={e => setBlueprint({...blueprint, differential: e.target.value})}
                              />
                            </div>
                          )}

                          {blueprint.step === 8 && (
                            <div className="text-center space-y-6 py-6">
                              <Binary className="h-12 w-12 text-primary mx-auto animate-pulse" />
                              <div className="space-y-2">
                                <p className="text-[11px] text-white/40 uppercase tracking-[0.2em]">Engenharia Neural Pronta</p>
                                <p className="text-[10px] text-white/20 font-medium">Clique para processar o briefing técnico final.</p>
                              </div>
                            </div>
                          )}
                        </CardContent>
                      </Card>

                      <div className="flex gap-4">
                        <Button variant="outline" onClick={handleBack} disabled={blueprint.step === 1 || isGenerating} className="h-14 w-20 rounded-xl border-white/5 bg-white/[0.04]">
                          <ChevronLeft className="h-6 w-6" />
                        </Button>
                        <Button onClick={handleNext} disabled={isGenerating || (blueprint.step === 1 && (!blueprint.name || !blueprint.niche))} className="flex-1 h-14 rounded-xl bg-primary hover:bg-primary/90 text-white font-bold uppercase tracking-widest shadow-lg shadow-primary/20">
                          {isGenerating ? (
                            <div className="flex items-center gap-3">
                              <Loader2 className="h-4 w-4 animate-spin" />
                              <span>Processando...</span>
                            </div>
                          ) : blueprint.step === 8 ? "Gerar Briefing Técnico" : "Próximo Passo"}
                        </Button>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8 pt-4 pb-20">
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <h2 className="text-2xl font-semibold text-white tracking-tight">Briefing Gerado</h2>
                          <p className="text-white/30 text-[10px] uppercase tracking-widest flex items-center gap-2">
                            <Sparkles className="h-3 w-3 text-primary" /> {wordCount} palavras · Pronto para uso
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" onClick={handleDownload} className="h-9 rounded-lg border-white/10 bg-white/5 text-[10px] font-bold uppercase gap-2">
                            <Download className="h-3.5 w-3.5" /> .TXT
                          </Button>
                          <Button size="sm" onClick={() => { navigator.clipboard.writeText(generatedPrompt); setIsCopied(true); setTimeout(() => setIsCopied(false), 2000); toast.success("Copiado!"); }} className="h-9 rounded-lg bg-primary text-[10px] font-bold uppercase gap-2">
                            {isCopied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                            {isCopied ? "COPIADO" : "COPIAR"}
                          </Button>
                        </div>
                      </div>

                      <div className="bg-white/[0.03] backdrop-blur-xl p-8 rounded-[2rem] border border-white/5 font-mono text-[13px] text-white/70 leading-relaxed whitespace-pre-wrap max-h-[600px] overflow-y-auto no-scrollbar shadow-inner">
                        {generatedPrompt}
                      </div>

                      <Button 
                        variant="ghost" 
                        onClick={() => setBlueprint(prev => ({ ...prev, isGenerated: false, step: 1 }))}
                        className="w-full text-[10px] font-bold uppercase text-white/30 hover:text-white transition-colors"
                      >
                        Resetar e Criar Novo Projeto
                      </Button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </section>

            <aside className="w-full lg:w-[400px] border-l border-white/5 bg-white/[0.02] backdrop-blur-[12px] p-10 flex flex-col items-center justify-center flex-shrink-0 hidden xl:flex">
              <div className="w-[280px] h-[580px] bg-[#080810] border border-white/10 rounded-[3rem] shadow-2xl relative overflow-hidden flex flex-col group">
                {/* Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-black rounded-b-2xl z-20" />
                
                {/* Screen Content Mockup */}
                <div className="flex-1 p-6 space-y-6 bg-transparent overflow-y-auto no-scrollbar pt-12">
                  <div className="flex items-center justify-between">
                    <div className="h-4 w-20 bg-primary/20 rounded-full animate-pulse" />
                    <div className="h-4 w-4 bg-white/5 rounded-full" />
                  </div>
                  <div className="space-y-2">
                    <div className="h-8 w-full bg-white/5 rounded-lg" />
                    <div className="h-8 w-2/3 bg-white/5 rounded-lg opacity-50" />
                  </div>
                  
                  {/* Dinamic Preview */}
                  <div className="space-y-4 pt-10">
                    <div className="text-[10px] font-bold text-white/20 uppercase tracking-widest mb-4">Estrutura Mobile</div>
                    {blueprint.sections.map((s, i) => (
                      <div key={i} className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 space-y-2 group-hover:border-primary/20 transition-all">
                        <div className="h-2 w-12 bg-primary/10 rounded-full" />
                        <div className="h-2 w-full bg-white/5 rounded-full" />
                        <div className="h-2 w-3/4 bg-white/5 rounded-full opacity-30" />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Floating Action Button Mockup */}
                <div className="absolute bottom-8 right-6 h-12 w-12 rounded-full bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
                  <MousePointerClick className="h-5 w-5 text-white" />
                </div>
              </div>
              <p className="mt-8 text-[9px] font-bold text-white/20 uppercase tracking-[0.3em]">Hardware de Visualização Live</p>
            </aside>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
