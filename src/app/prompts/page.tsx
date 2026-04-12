
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
  ShieldCheck,
  Type,
  Briefcase,
  Droplets,
  Wand2,
  Binary,
  Eye,
  Bell
} from 'lucide-react';
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from '@/components/AppSidebar';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

const STEPS = [
  { id: 1, title: 'Identidade', sub: 'Nome, Nicho & Idioma', icon: Briefcase },
  { id: 2, title: 'Estratégia', sub: 'Objetivo Principal', icon: Target },
  { id: 3, title: 'Visual', sub: 'Estilo & Cores', icon: Palette },
  { id: 4, title: 'Público', sub: 'Audiência Alvo', icon: Users },
  { id: 5, title: 'Voz', sub: 'Tom de Mensagem', icon: Type },
  { id: 6, title: 'Estrutura', sub: 'Seções da LP', icon: Layers },
  { id: 7, title: 'Diferencial', sub: 'Proposta Única', icon: Zap },
  { id: 8, title: 'Launch', sub: 'Gerar Blueprint', icon: Rocket },
];

const LANGUAGES = [
  { id: 'pt', label: 'Português (BR)', icon: '🇧🇷' },
  { id: 'en', label: 'English (US)', icon: '🇺🇸' },
];

const NICHES = ["Infoprodutos", "SaaS/Tech", "Serviços Locais", "E-commerce", "Saúde/Bem-estar", "Consultoria", "Imóveis"];
const OBJECTIVES = ["Capturar Leads", "Vender Direto", "Agendar Reunião", "Distribuição de Conteúdo"];
const STYLES = ["Moderno & Dark", "Minimalista", "Corporativo", "Futurista", "Cyberpunk", "Clean White", "Luxo Profundo"];
const TONES = ["Profissional", "Amigável", "Urgente", "Luxuoso", "Descontraído"];
const SECTIONS = ["Hero", "Problema/Dor", "Solução", "Benefícios", "Depoimentos", "Preços", "FAQ", "CTA Final"];

const COLOR_PRESETS = [
  { name: 'Flow', primary: '#7C3AED', secondary: '#ffffff' },
  { name: 'Cyber', primary: '#06B6D4', secondary: '#000000' },
  { name: 'Luxury', primary: '#F59E0B', secondary: '#111111' },
];

const SuggestButton = ({ onSuggest, label, icon: Icon = Zap }: { onSuggest: () => void, label?: string, icon?: any }) => {
  const [loading, setLoading] = useState(false);
  const handleClick = () => {
    setLoading(true);
    setTimeout(() => {
      onSuggest();
      setLoading(false);
    }, 1200);
  };
  return (
    <button onClick={handleClick} disabled={loading} className="flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest text-primary hover:text-primary/80 transition-all group">
      {loading ? <Zap className="h-3 w-3 animate-spin" /> : <Icon className="h-3 w-3 group-hover:scale-110 transition-transform" />}
      {label || 'Sugerir com IA'}
    </button>
  );
};

export default function PromptsPage() {
  const [blueprint, setBlueprint] = useState({
    step: 1, language: 'pt', name: '', niche: '', objective: 'Capturar Leads',
    style: 'Moderno & Dark', palette: ['#7C3AED', '#ffffff'], audience: '',
    tone: 'Profissional', sections: ['Hero', 'Solução', 'CTA Final'], differential: '',
    extras: '', isGenerated: false,
  });

  const [generatedPrompt, setGeneratedPrompt] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const handleNext = () => blueprint.step < 8 ? setBlueprint(prev => ({ ...prev, step: prev.step + 1 })) : handleFinalGeneration();
  const handleBack = () => blueprint.step > 1 && setBlueprint(prev => ({ ...prev, step: prev.step - 1 }));

  const handleFinalGeneration = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const isEn = blueprint.language === 'en';
      const prompt = `[ROLE]: Act as a Senior Frontend Developer and CRO Specialist for "${blueprint.name}". Target: ${blueprint.audience}. Style: ${blueprint.style}. Colors: ${blueprint.palette.join(', ')}. Framework: Next.js 15 + Tailwind. Sections: ${blueprint.sections.join(', ')}. Differential: ${blueprint.differential}.`;
      setGeneratedPrompt(prompt);
      setIsGenerating(false);
      setBlueprint(prev => ({ ...prev, isGenerated: true }));
      toast.success(isEn ? "Blueprint Generated!" : "Blueprint Gerado!");
    }, 3000);
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-transparent text-white relative z-10 font-body">
        <AppSidebar />
        <main className="flex-1 flex flex-col min-w-0 bg-transparent">
          <header className="h-[48px] border-b border-white/5 flex items-center justify-between px-7 bg-transparent sticky top-0 z-50">
            <div className="flex items-center gap-3">
              <Terminal className="h-[14px] w-[14px] text-[#8b5cf6]/60" />
              <h1 className="text-[13px] font-medium text-white/50">Workstation de Engenharia</h1>
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
                  <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary">Processo de Engenharia</h2>
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
                              <Input placeholder="Ex: Flow Agency" className="h-14 bg-white/[0.04] border-white/5 rounded-xl" value={blueprint.name} onChange={e => setBlueprint({...blueprint, name: e.target.value})} />
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
                        {blueprint.step === 8 && (
                          <div className="text-center space-y-6 py-6">
                            <Binary className="h-12 w-12 text-primary mx-auto animate-pulse" />
                            <p className="text-[11px] text-white/40 uppercase tracking-[0.2em]">Engenharia Neural Pronta para Disparo</p>
                          </div>
                        )}
                      </CardContent>
                    </Card>

                    <div className="flex gap-4">
                      <Button variant="outline" onClick={handleBack} disabled={blueprint.step === 1} className="h-14 w-20 rounded-xl border-white/5 bg-white/[0.04]">
                        <ChevronLeft className="h-6 w-6" />
                      </Button>
                      <Button onClick={handleNext} disabled={isGenerating} className="flex-1 h-14 rounded-xl bg-primary hover:bg-primary/90 text-white font-bold uppercase tracking-widest">
                        {isGenerating ? "Processando..." : blueprint.step === 8 ? "Gerar Comando Mestre" : "Próximo Passo"}
                      </Button>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {blueprint.isGenerated && !isGenerating && (
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 pt-10">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-bold uppercase text-white/80">Comando Gerado</h3>
                      <Button variant="ghost" size="sm" onClick={() => { navigator.clipboard.writeText(generatedPrompt); setIsCopied(true); setTimeout(() => setIsCopied(false), 2000); toast.success("Copiado!"); }} className="text-[10px] uppercase font-bold text-primary">
                        {isCopied ? "Copiado!" : "Copiar Prompt"}
                      </Button>
                    </div>
                    <div className="bg-black/40 p-8 rounded-3xl border border-white/5 text-xs text-white/60 leading-relaxed font-mono whitespace-pre-wrap">
                      {generatedPrompt}
                    </div>
                  </motion.div>
                )}
              </div>
            </section>

            <aside className="w-full lg:w-[450px] border-l border-white/5 bg-white/[0.02] backdrop-blur-[12px] p-10 flex flex-col items-center justify-center flex-shrink-0 hidden xl:flex">
              <div className="w-[280px] h-[580px] bg-white/[0.04] border border-white/10 rounded-[3rem] shadow-2xl relative overflow-hidden flex flex-col">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-black rounded-b-2xl z-20" />
                <div className="flex-1 p-6 space-y-6 bg-transparent overflow-y-auto no-scrollbar pt-12">
                  <div className="h-4 w-20 bg-primary/20 rounded-full" />
                  <div className="space-y-2">
                    <div className="h-8 w-full bg-white/5 rounded-lg" />
                    <div className="h-8 w-2/3 bg-white/5 rounded-lg" />
                  </div>
                  <div className="space-y-4 pt-10">
                    {blueprint.sections.map((s, i) => (
                      <div key={i} className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 space-y-2">
                        <div className="h-2 w-12 bg-white/10 rounded-full" />
                        <div className="h-2 w-full bg-white/5 rounded-full" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <p className="mt-8 text-[9px] font-bold text-white/20 uppercase tracking-[0.3em]">Visualização em Tempo Real</p>
            </aside>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
