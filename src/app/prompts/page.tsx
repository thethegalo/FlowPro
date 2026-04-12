
"use client";

import { useState, useMemo, useEffect } from 'react';
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
  MousePointerClick,
  Menu,
  Star,
  Smartphone,
  CheckCircle2
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

const NICHES = [
  { label: "Barbearia", value: "Barbearia", theme: { bg: '#0d0d0d', primary: '#c9a84c', text: '#f5f5f5' } },
  { label: "Restaurante", value: "Restaurante", theme: { bg: '#1a0a00', primary: '#e85d04', text: '#fff8f0' } },
  { label: "Clínica", value: "Clínica", theme: { bg: '#f0f7ff', primary: '#0077b6', text: '#023e8a' } },
  { label: "Academia", value: "Academia", theme: { bg: '#0a0a0a', primary: '#ff6b00', text: '#ffffff' } },
  { label: "SaaS/Tech", value: "SaaS/Tech", theme: { bg: '#05050f', primary: '#7c3aed', text: '#f4f4f5' } },
  { label: "E-commerce", value: "E-commerce", theme: { bg: '#ffffff', primary: '#635bff', text: '#0a2540' } },
  { label: "Consultoria", value: "Consultoria", theme: { bg: '#f8f9fa', primary: '#1a1a2e', text: '#16213e' } },
];

const OBJECTIVES = ["Capturar Leads", "Vender Direto", "Agendar Reunião", "Distribuição de Conteúdo"];
const STYLES = ["Moderno & Dark", "Minimalista", "Corporativo", "Futurista", "Cyberpunk", "Clean White", "Luxo Profundo"];
const TONES = ["Profissional", "Amigável", "Urgente", "Luxuoso", "Descontraído"];
const SECTIONS = ["Hero", "Problema/Dor", "Solução", "Benefícios", "Depoimentos", "Preços", "FAQ", "CTA Final"];

export default function PromptsPage() {
  const [blueprint, setBlueprint] = useState({
    step: 1, language: 'Português (BR)', name: '', niche: 'SaaS/Tech', objective: 'Capturar Leads',
    style: 'Moderno & Dark', palette: ['#7C3AED', '#ffffff', '#05050f'], audience: '',
    tone: 'Profissional', sections: ['Hero', 'Solução', 'CTA Final'], differential: '',
    extras: '', isGenerated: false,
  });

  const [generatedPrompt, setGeneratedPrompt] = useState('');
  const [wordCount, setWordCount] = useState(0);
  const [isCopied, setIsCopied] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const currentTheme = useMemo(() => {
    const nicheData = NICHES.find(n => n.value === blueprint.niche);
    return nicheData?.theme || { bg: '#05050f', primary: '#7c3aed', text: '#f4f4f5' };
  }, [blueprint.niche]);

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
        palette: [currentTheme.primary, currentTheme.text, currentTheme.bg],
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
              <div className="bg-[#581c87]/40 border border-[#7c3aed]/30 text-[#c4b5fd] text-[11px] font-medium rounded-[6px] px-[10px] py-[4px] uppercase tracking-[0.5px]">
                VITALÍCIO
              </div>
            </div>
          </header>

          <div className="flex-1 flex flex-col lg:flex-row overflow-hidden bg-transparent">
            {/* STEPS LIST (LEFT) */}
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

            {/* FORM AREA (CENTER) */}
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
                                  <button key={n.value} onClick={() => setBlueprint({...blueprint, niche: n.value})} className={cn("px-4 py-3 rounded-xl text-[10px] font-bold uppercase transition-all border", blueprint.niche === n.value ? "bg-primary/25 border-primary/40 text-[#c4b5fd]" : "bg-white/[0.04] border-white/5 text-white/40")}>
                                    {n.label}
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

            {/* REAL-TIME VISUALIZER (RIGHT) */}
            <aside className="w-full lg:w-[35%] border-l border-white/5 bg-white/[0.02] backdrop-blur-[12px] p-10 flex flex-col items-center justify-start flex-shrink-0 hidden md:flex overflow-hidden">
              <div className="sticky top-1/2 -translate-y-1/2 w-full flex flex-col items-center gap-8">
                
                {/* Visualizer Label */}
                <div className="px-4 py-1.5 rounded-full bg-white/[0.06] border border-white/10 flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-[9px] font-bold text-white/40 uppercase tracking-[0.2em]">Real-time Visualizer</span>
                </div>

                <div className="relative group">
                  {/* Floating Sadow */}
                  <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-48 h-6 bg-black/60 blur-xl rounded-full scale-x-150 animate-shadow-pulse pointer-events-none" />
                  
                  {/* iPhone 14 Pro Mockup */}
                  <motion.div 
                    animate={{ y: [0, -6, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                    className="w-[260px] h-[520px] bg-[#1a1a1a] border-[3px] border-white/10 rounded-[44px] shadow-[0_0_0_1px_rgba(255,255,255,0.05),0_40px_80px_rgba(0,0,0,0.6)] relative overflow-hidden flex flex-col"
                  >
                    {/* Inner Edge Highlight */}
                    <div className="absolute inset-0 rounded-[41px] border border-white/[0.05] pointer-events-none z-50" />
                    
                    {/* Dynamic Island */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[100px] h-[30px] bg-black rounded-[99px] mt-3 z-50 flex items-center justify-center">
                      <div className="h-1.5 w-1.5 bg-blue-500/20 rounded-full ml-10" />
                    </div>

                    {/* Screen Content */}
                    <div 
                      className="flex-1 rounded-[36px] overflow-hidden flex flex-col transition-colors duration-500"
                      style={{ backgroundColor: currentTheme.bg }}
                    >
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={blueprint.step + blueprint.niche}
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -8 }}
                          transition={{ duration: 0.25 }}
                          className="flex-1 flex flex-col"
                        >
                          {/* Navigation Bar Mockup */}
                          <div className="h-14 flex items-center justify-between px-6 pt-6">
                            <Menu className="h-4 w-4" style={{ color: currentTheme.text }} />
                            <span className="text-[9px] font-bold uppercase tracking-widest truncate max-w-[120px]" style={{ color: currentTheme.text }}>
                              {blueprint.name || 'Your App'}
                            </span>
                            <div className="h-6 w-6 rounded-full bg-white/10" />
                          </div>

                          <div className="flex-1 p-6 space-y-6 overflow-y-auto no-scrollbar">
                            
                            {/* STEP 1: IDENTITY */}
                            {blueprint.step === 1 && (
                              <div className="space-y-4 pt-4">
                                <div className="space-y-2">
                                  <h3 className="text-2xl font-black leading-tight tracking-tight uppercase italic" style={{ color: currentTheme.text }}>
                                    {blueprint.name || 'Nova Era Digital'}
                                  </h3>
                                  <p className="text-[10px] leading-relaxed opacity-60" style={{ color: currentTheme.text }}>
                                    O futuro do nicho de {blueprint.niche} começa com um sistema otimizado.
                                  </p>
                                </div>
                                <div className="h-24 w-full rounded-2xl flex items-center justify-center" style={{ backgroundColor: currentTheme.primary }}>
                                  <Rocket className="h-8 w-8 text-white opacity-40" />
                                </div>
                                <div className="grid grid-cols-3 gap-2">
                                  {[1,2,3].map(i => <div key={i} className="h-1 w-full bg-white/10 rounded-full" />)}
                                </div>
                              </div>
                            )}

                            {/* STEP 2: STRATEGY */}
                            {blueprint.step === 2 && (
                              <div className="space-y-6 pt-4">
                                <Badge className="text-[8px] font-bold uppercase px-2 py-0.5" style={{ backgroundColor: currentTheme.primary, color: '#fff' }}>
                                  {blueprint.objective}
                                </Badge>
                                <h4 className="text-lg font-bold leading-tight" style={{ color: currentTheme.text }}>
                                  Estratégia Neural para {blueprint.niche}
                                </h4>
                                <div className="space-y-3">
                                  {[1,2].map(i => (
                                    <div key={i} className="p-4 rounded-xl border border-white/5 space-y-2" style={{ backgroundColor: 'rgba(255,255,255,0.03)' }}>
                                      <div className="h-2 w-12 rounded-full" style={{ backgroundColor: currentTheme.primary + '40' }} />
                                      <div className="h-1.5 w-full bg-white/5 rounded-full" />
                                    </div>
                                  ))}
                                </div>
                                <Button className="w-full h-10 rounded-xl font-bold text-[10px] uppercase" style={{ backgroundColor: currentTheme.primary, color: '#fff' }}>
                                  {blueprint.objective === 'Capturar Leads' ? 'QUERO MEU ACESSO' : 'INICIAR AGORA'}
                                </Button>
                              </div>
                            )}

                            {/* STEP 3: VISUAL */}
                            {blueprint.step === 3 && (
                              <div className="space-y-6 pt-4">
                                <div className="h-32 w-full rounded-3xl relative overflow-hidden flex flex-col justify-end p-4">
                                  <div className="absolute inset-0 opacity-40" style={{ background: `linear-gradient(to bottom, transparent, ${currentTheme.primary})` }} />
                                  <div className="relative z-10 space-y-1">
                                    <div className="h-2 w-16 bg-white/40 rounded-full" />
                                    <div className="h-4 w-24 bg-white rounded-md" />
                                  </div>
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                  {[1,2].map(i => (
                                    <div key={i} className="aspect-square rounded-2xl border border-white/5 flex items-center justify-center" style={{ backgroundColor: 'rgba(255,255,255,0.03)' }}>
                                      <Palette className="h-5 w-5 opacity-20" style={{ color: currentTheme.primary }} />
                                    </div>
                                  ))}
                                </div>
                                <div className="text-[8px] font-bold text-center opacity-40 uppercase tracking-widest" style={{ color: currentTheme.text }}>
                                  Style: {blueprint.style}
                                </div>
                              </div>
                            )}

                            {/* STEP 4: PUBLIC */}
                            {blueprint.step === 4 && (
                              <div className="space-y-6 pt-4">
                                <h4 className="text-[10px] font-black uppercase tracking-widest text-center" style={{ color: currentTheme.primary }}>
                                  Resultados Reais
                                </h4>
                                <div className="space-y-3">
                                  {[1,2].map(i => (
                                    <div key={i} className="p-4 rounded-2xl border border-white/5 space-y-3" style={{ backgroundColor: 'rgba(255,255,255,0.02)' }}>
                                      <div className="flex gap-1">
                                        {[1,2,3,4,5].map(s => <Star key={s} className="h-2 w-2 fill-current" style={{ color: currentTheme.primary }} />)}
                                      </div>
                                      <div className="h-1.5 w-full bg-white/5 rounded-full" />
                                      <div className="flex items-center gap-2">
                                        <div className="h-5 w-5 rounded-full bg-white/10" />
                                        <div className="h-1 w-12 bg-white/5 rounded-full" />
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* STEP 5: VOICE */}
                            {blueprint.step === 5 && (
                              <div className="space-y-6 pt-4 text-center">
                                <Badge variant="outline" className="text-[8px] font-bold" style={{ borderColor: currentTheme.primary + '40', color: currentTheme.primary }}>
                                  TOM {blueprint.tone.toUpperCase()}
                                </Badge>
                                <div className="space-y-4">
                                  <h4 className="text-xl font-bold leading-tight italic" style={{ color: currentTheme.text }}>
                                    {blueprint.tone === 'Urgente' ? 'Atenção! Sua Oportunidade.' : 'Soluções sob Medida.'}
                                  </h4>
                                  <div className="space-y-2">
                                    <div className="h-1.5 w-full bg-white/5 rounded-full" />
                                    <div className="h-1.5 w-3/4 bg-white/5 rounded-full mx-auto" />
                                  </div>
                                </div>
                                <div className="p-4 rounded-xl border-dashed border-white/10 bg-white/[0.01]">
                                  <p className="text-[9px] font-medium leading-relaxed opacity-50" style={{ color: currentTheme.text }}>
                                    "Exemplo de texto técnico adaptado para o público-alvo informado."
                                  </p>
                                </div>
                              </div>
                            )}

                            {/* STEP 6: STRUCTURE */}
                            {blueprint.step === 6 && (
                              <div className="space-y-4 pt-4">
                                <p className="text-[10px] font-bold text-white/20 uppercase text-center tracking-widest">Blueprint de Seções</p>
                                <div className="flex flex-col gap-2">
                                  {blueprint.sections.map((s, i) => (
                                    <div key={i} className="flex items-center gap-3">
                                      <div className="flex-1 h-8 rounded-lg flex items-center px-3 text-[8px] font-black uppercase italic" style={{ backgroundColor: currentTheme.primary + (i === 0 ? '40' : '15'), color: i === 0 ? currentTheme.text : currentTheme.primary }}>
                                        {s}
                                      </div>
                                      <div className="h-4 w-4 rounded-full border border-white/10 flex items-center justify-center">
                                        <div className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: currentTheme.primary }} />
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* STEP 7: DIFFERENTIAL */}
                            {blueprint.step === 7 && (
                              <div className="space-y-6 pt-4">
                                <div className="p-6 rounded-3xl border-2 border-dashed flex flex-col items-center text-center space-y-4" style={{ borderColor: currentTheme.primary + '30', backgroundColor: currentTheme.primary + '05' }}>
                                  <Zap className="h-8 w-8 animate-pulse" style={{ color: currentTheme.primary }} />
                                  <h4 className="text-sm font-black uppercase italic" style={{ color: currentTheme.text }}>
                                    O Diferencial
                                  </h4>
                                  <div className="space-y-2 w-full">
                                    {[1,2,3].map(i => (
                                      <div key={i} className="flex items-center gap-2">
                                        <CheckCircle2 className="h-3 w-3" style={{ color: currentTheme.primary }} />
                                        <div className="h-1 flex-1 bg-white/5 rounded-full" />
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            )}

                            {/* STEP 8: LAUNCH */}
                            {blueprint.step === 8 && (
                              <div className="space-y-6 pt-4 text-center">
                                <div className="relative inline-block">
                                  <Rocket className="h-12 w-12 mx-auto mb-4" style={{ color: currentTheme.primary }} />
                                  <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full" />
                                </div>
                                <h4 className="text-xl font-black italic uppercase tracking-tighter" style={{ color: currentTheme.text }}>
                                  Briefing Pronto
                                </h4>
                                <div className="space-y-3 pt-4">
                                  {[1,2,3,4,5].map(i => (
                                    <div key={i} className="h-1 bg-white/5 rounded-full" style={{ width: `${100 - (i * 15)}%`, margin: '0 auto' }} />
                                  ))}
                                </div>
                                <Button className="w-full h-12 rounded-2xl font-black uppercase text-[10px] tracking-widest mt-10 shadow-xl" style={{ backgroundColor: currentTheme.primary, color: '#fff' }}>
                                  Finalizar Blueprint <ChevronRight className="h-4 w-4 ml-2" />
                                </Button>
                              </div>
                            )}

                          </div>

                          {/* Bottom Navigation Mockup */}
                          <div className="h-16 border-t border-white/5 flex items-center justify-around px-4">
                            {[1,2,3,4].map(i => (
                              <div key={i} className="h-8 w-8 rounded-xl bg-white/[0.03] flex items-center justify-center">
                                <div className="h-3 w-3 rounded-full opacity-20" style={{ backgroundColor: currentTheme.text }} />
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      </AnimatePresence>
                    </div>
                  </motion.div>
                </div>

                <p className="text-[10px] font-bold text-white/20 uppercase tracking-[0.3em] flex items-center gap-2">
                  <Smartphone className="h-3 w-3" /> Hardware Simulation Active
                </p>
              </div>
            </aside>
          </div>
        </main>
      </div>

      <style jsx global>{`
        @keyframes shadow-pulse {
          0%, 100% { transform: translateX(-50%) scaleX(1.5) opacity(0.6); }
          50% { transform: translateX(-50%) scaleX(1.3) opacity(0.3); }
        }
        .animate-shadow-pulse {
          animation: shadow-pulse 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
