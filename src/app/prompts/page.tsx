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
  Download,
  Loader2,
  Sparkles,
  Menu,
  Star,
  Smartphone,
  CheckCircle2,
  Home,
  Search,
  User,
  ShoppingBag,
  ExternalLink,
  Wrench,
  Globe,
  Scissors,
  Stethoscope,
  UtensilsCrossed,
  Dumbbell,
  Instagram,
  MapPin,
  MessageSquare
} from 'lucide-react';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from '@/components/AppSidebar';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { generateAIPalette } from '@/ai/flows/generate-master-prompt';

const STEPS = [
  { id: 1, title: 'Identidade', sub: 'Nome & Nicho', icon: Briefcase },
  { id: 2, title: 'Estratégia', sub: 'Objetivo Principal', icon: Target },
  { id: 3, title: 'Visual', sub: 'Estilo & Cores', icon: Palette },
  { id: 4, title: 'Público', sub: 'Audiência Alvo', icon: Users },
  { id: 5, title: 'Voz', sub: 'Tom de Mensagem', icon: Type },
  { id: 6, title: 'Estrutura', sub: 'Seções da LP', icon: Layers },
  { id: 7, title: 'Recursos', sub: 'Funções Técnicas', icon: Wrench },
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
];

const TECH_RESOURCES = [
  { id: 'whatsapp', label: 'Botão WhatsApp', icon: <MessageSquare className="h-3.5 w-3.5" />, desc: 'Botão flutuante para contato direto.' },
  { id: 'instagram', label: 'Feed Instagram', icon: <Instagram className="h-3.5 w-3.5" />, desc: 'Exibir postagens recentes do perfil.' },
  { id: 'google_maps', label: 'Google Maps', icon: <MapPin className="h-3.5 w-3.5" />, desc: 'Mapa interativo com a localização.' },
  { id: 'reviews', label: 'Avaliações Google', icon: <Star className="h-3.5 w-3.5" />, desc: 'Widget de depoimentos do GMN.' },
  { id: 'seo', label: 'SEO Otimizado', icon: <Search className="h-3.5 w-3.5" />, desc: 'Tags para aparecer no topo do Google.' },
  { id: 'mobile', label: 'Mobile-First', icon: <Smartphone className="h-3.5 w-3.5" />, desc: 'Design focado 100% no celular.' },
  { id: 'form', label: 'Formulário Lead', icon: <Users className="h-3.5 w-3.5" />, desc: 'Captura de nome/email do cliente.' },
  { id: 'gallery', label: 'Galeria Fotos', icon: <ShoppingBag className="h-3.5 w-3.5" />, desc: 'Exibição de produtos/serviços.' },
];

const TEMPLATE_PRESETS = [
  { name: 'Barbearia Moderna', niche: 'Barbearia', style: 'Minimalista', icon: Scissors, color: '#c9a84c', palette: ['#c9a84c', '#f5f5f5', '#0d0d0d'], tone: 'Luxuoso', badge: 'Minimalista', previewUrl: 'https://luxe-hair-blueprint.lovable.app' },
  { name: 'Clínica Odontológica', niche: 'Clínica', style: 'Clean White', icon: Stethoscope, color: '#0077b6', palette: ['#0077b6', '#023e8a', '#f0f7ff'], tone: 'Profissional', badge: 'Elegante', previewUrl: 'https://smile-arc-plan.lovable.app' },
  { name: 'Restaurante Premium', niche: 'Restaurante', style: 'Luxo Profundo', icon: UtensilsCrossed, color: '#e85d04', palette: ['#e85d04', '#fff8f0', '#1a0a00'], tone: 'Amigável', badge: 'Luxuoso', previewUrl: 'https://prompt-alchemy-21.lovable.app' },
  { name: 'Academia Fitness', niche: 'Academia', style: 'Bold', icon: Dumbbell, color: '#ff6b00', palette: ['#ff6b00', '#ffffff', '#0a0a0a'], tone: 'Urgente', badge: 'Bold', previewUrl: 'https://gym-guide-grow.lovable.app' },
];

const TEMPLATE_DATA: Record<string, any> = {
  'Barbearia Moderna': {
    businessName: 'Barbearia Premium',
    niche: 'Beleza & Estética Masculina',
    objective: 'Agendamento Online',
    visualStyle: 'Dark Minimalist',
    tone: 'Sofisticado e Autoritário',
    sections: ['Hero com vídeo', 'Serviços & Preços', 'Galeria de Cortes', 'Depoimentos', 'Mapa & Horários', 'CTA WhatsApp'],
    differential: 'Tradição aliada a cortes modernos e agendamento sem filas.',
    extras: 'Crie uma landing page de alta conversão. Cores: Preto, Dourado e Cinza. Tipografia sans-serif robusta.'
  },
  'Clínica Odontológica': {
    businessName: 'Clínica Sorriso',
    niche: 'Saúde e Odontologia',
    objective: 'Capturar Leads Qualificados',
    visualStyle: 'Clean White & Trust',
    tone: 'Acolhedor e Profissional',
    sections: ['Hero com promessa', 'Especialidades', 'Equipe Médica', 'Infraestrutura', 'Garantia de Satisfação', 'FAQ', 'Formulário'],
    differential: 'Atendimento humanizado e tecnologias de ponta em implantes e estética.',
    extras: 'Foco total em passar confiança e higiene. Cores azul celeste e branco neve.'
  },
  'Restaurante Premium': {
    businessName: 'Gastrô Brasa',
    niche: 'Gastronomia Gourmet',
    objective: 'Reserva de Mesa',
    visualStyle: 'Elegant Dark',
    tone: 'Inspirador e Apetitoso',
    sections: ['Hero Imersivo', 'Menu Signature', 'Chef da Casa', 'Ambiente Vibe', 'Reservas Direct', 'Rodapé Institucional'],
    differential: 'Ingredientes orgânicos e experiência sensorial completa.',
    extras: 'Use imagens de pratos com alta definição. Cores marrom terra, terracota e preto.'
  },
  'Academia Fitness': {
    businessName: 'Apex Fitness',
    niche: 'Bem-estar e Musculação',
    objective: 'Matrícula Direta',
    visualStyle: 'High Energy Bold',
    tone: 'Motivador e Urgente',
    sections: ['Hero Energético', 'Planos de Acesso', 'Professores', 'Estrutura 24h', 'Depoimentos Alunos', 'Trial Grátis CTA'],
    differential: 'Equipamentos de última geração e foco em resultados reais em 3 meses.',
    extras: 'Design agressivo com fontes largas. Cores laranja vibrante, preto e branco.'
  },
};

const OBJECTIVES = ['Capturar Leads', 'Agendar Consulta', 'Venda Direta', 'Matrícula'];
const STYLES = [
  'Minimalista', 
  'Bold', 
  'Clean White', 
  'Luxo Profundo', 
  'Corporativo', 
  'Futurista', 
  'Cyberpunk', 
  'Vintage/Retro', 
  'High Tech', 
  'Pastel Soft'
];
const TONES = ['Profissional', 'Amigável', 'Urgente', 'Luxuoso', 'Dinâmico'];
const SECTIONS = ['Hero', 'Benefícios', 'Depoimentos', 'Preços', 'FAQ', 'CTA Final', 'Portfólio', 'Sobre'];

export default function PromptsPage() {
  const [activeMainTab, setActiveMainTab] = useState<'templates' | 'create'>('templates');
  const [blueprint, setBlueprint] = useState({
    step: 1, language: 'Português (BR)', name: '', niche: 'SaaS/Tech', objective: 'Capturar Leads',
    style: 'Futurista', palette: ['#7C3AED', '#ffffff', '#05050f'], audience: '',
    tone: 'Profissional', sections: ['Hero', 'Solução', 'CTA Final'], differential: '',
    extras: '', isGenerated: false,
    selectedTech: [] as string[]
  });

  const [generatedPrompt, setGeneratedPrompt] = useState('');
  const [wordCount, setWordCount] = useState(0);
  const [isCopied, setIsCopied] = useState(false);
  const [isGeneratingPalette, setIsGeneratingPalette] = useState(false);
  const [previewModal, setPreviewModal] = useState<{ open: boolean, url: string, name: string }>({ open: false, url: '', name: '' });
  const { toast } = useToast();

  const currentTheme = useMemo(() => {
    const nicheData = NICHES.find(n => n.value === blueprint.niche);
    return {
      bg: blueprint.palette[2] || nicheData?.theme.bg || '#05050f',
      primary: blueprint.palette[0] || nicheData?.theme.primary || '#7c3aed',
      text: blueprint.palette[1] || nicheData?.theme.text || '#f4f4f5'
    };
  }, [blueprint.niche, blueprint.palette]);

  const generatePromptString = (data: any) => {
    const techReqs = data.selectedTech?.length > 0 
      ? `\nRECURSOS TÉCNICOS SELECIONADOS:\n${data.selectedTech.map((id: string) => `- ${TECH_RESOURCES.find(r => r.id === id)?.label}: ${TECH_RESOURCES.find(r => r.id === id)?.desc}`).join('\n')}`
      : '';

    return `Crie uma landing page completa e profissional para ${data.businessName} no nicho de ${data.niche}.

OBJETIVO: ${data.objective}
TOM DE VOZ: ${data.tone}
ESTILO VISUAL: ${data.visualStyle}

SEÇÕES OBRIGATÓRIAS (nesta ordem):
${data.sections.map((s: string, i: number) => `${i + 1}. ${s}`).join('\n')}
${techReqs}

INSTRUÇÕES ESPECÍFICAS:
${data.extras}
${data.differential ? `DIFERENCIAL: ${data.differential}` : ''}

REQUISITOS TÉCNICOS GERAIS:
- Next.js 15 com React e Tailwind CSS
- Totalmente responsivo (mobile-first)
- Animações suaves nas seções (Framer Motion)
- SEO otimizado e carregamento instantâneo

Gere o código completo da página em um único arquivo.`;
  };

  const handleCopyTemplate = (templateName: string) => {
    const t = TEMPLATE_DATA[templateName];
    if (!t) return;

    const fullPrompt = generatePromptString(t);
    navigator.clipboard.writeText(fullPrompt);
    toast.success("Prompt Copiado!", "Cole direto no Lovable.dev");
  };

  const generatePrompt = () => {
    const prompt = generatePromptString({
      businessName: blueprint.name || 'o negócio',
      niche: blueprint.niche,
      objective: blueprint.objective,
      tone: blueprint.tone,
      visualStyle: blueprint.style,
      sections: blueprint.sections,
      selectedTech: blueprint.selectedTech,
      extras: `${blueprint.extras || `Site para ${blueprint.name} com design ${blueprint.style.toLowerCase()}.`}\nCores: ${blueprint.palette.join(', ')}`,
      differential: blueprint.differential
    });

    setGeneratedPrompt(prompt);
    setWordCount(prompt.split(/\s+/).length);
    setBlueprint(prev => ({ ...prev, isGenerated: true }));
    toast.success("Prompt Gerado!", "Comando neural pronto para o campo de batalha.");
  };

  const handleNext = () => {
    if (blueprint.step < 8) {
      setBlueprint(prev => ({ ...prev, step: prev.step + 1 }));
    } else {
      generatePrompt();
    }
  };

  const handleBack = () => {
    if (blueprint.step > 1) {
      setBlueprint(prev => ({ ...prev, step: prev.step - 1 }));
    }
  };

  const handleAIPalette = async () => {
    setIsGeneratingPalette(true);
    try {
      const palette = await generateAIPalette({
        name: blueprint.name || 'Projeto',
        niche: blueprint.niche,
        style: blueprint.style
      });
      setBlueprint(prev => ({
        ...prev,
        palette: [palette.primary, palette.text, palette.background]
      }));
      toast.success("Nova Paleta Criada", "A IA gerou uma combinação exclusiva de cores.");
    } catch (e) {
      toast.error("Falha na IA", "Não foi possível consultar o motor de design.");
    } finally {
      setIsGeneratingPalette(false);
    }
  };

  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([generatedPrompt], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `briefing-${blueprint.name || 'projeto'}.txt`;
    document.body.appendChild(element);
    element.click();
    toast.success("Download Concluído");
  };

  const toggleSection = (section: string) => {
    setBlueprint(prev => ({
      ...prev,
      sections: prev.sections.includes(section) 
        ? prev.sections.filter(s => s !== section)
        : [...prev.sections, section]
    }));
  };

  const toggleTech = (id: string) => {
    setBlueprint(prev => ({
      ...prev,
      selectedTech: prev.selectedTech.includes(id)
        ? prev.selectedTech.filter(t => t !== id)
        : [...prev.selectedTech, id]
    }));
  };

  const progressPercent = (blueprint.step / STEPS.length) * 100;

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-transparent text-white relative z-10">
        <AppSidebar />
        <main className="flex-1 flex flex-col min-w-0 bg-transparent">
          <header className="h-[48px] border-b border-white/5 flex items-center justify-between px-6 bg-transparent sticky top-0 z-50">
            <div className="flex items-center gap-3">
              <SidebarTrigger className="md:hidden" />
              <Terminal className="h-[14px] w-[14px] text-primary/70" />
              <h1 className="text-[13px] font-medium text-white/50">Blueprint Workstation</h1>
            </div>
            <div className="bg-[#581c87]/40 border border-[#7c3aed]/30 text-[#c4b5fd] text-[11px] font-medium rounded-[6px] px-[10px] py-[4px] uppercase tracking-[0.5px]">
              VITALÍCIO
            </div>
          </header>

          <div className="md:hidden h-1 w-full bg-white/5">
            <motion.div 
              className="h-full bg-primary"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
            />
          </div>

          <div className="flex-1 flex flex-col lg:flex-row overflow-hidden bg-transparent">
            {activeMainTab === 'create' && (
              <aside className="w-64 border-r border-white/5 bg-white/[0.02] p-6 hidden lg:block overflow-y-auto">
                <div className="space-y-8">
                  <div className="space-y-1">
                    <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Arquitetura de Prompt</h2>
                    <p className="text-[9px] font-bold text-white/20 uppercase">Fase de Planejamento</p>
                  </div>
                  <nav className="space-y-4">
                    {STEPS.map((s) => (
                      <div key={s.id} className={cn("flex items-center gap-4 transition-all duration-500", blueprint.step === s.id ? "opacity-100 translate-x-2" : "opacity-30")}>
                        <div className={cn("h-8 w-8 rounded-full border flex items-center justify-center transition-all", blueprint.step === s.id ? "border-primary bg-primary/20" : "border-white/10 bg-white/5")}>
                          {blueprint.step > s.id ? <CheckCircle2 className="h-4 w-4 text-green-500" /> : <s.icon className="h-3.5 w-3.5" />}
                        </div>
                        <div className="space-y-0.5">
                          <p className="text-[10px] font-black uppercase tracking-tight">{s.title}</p>
                          <p className="text-[8px] font-bold text-white/20 uppercase">{s.sub}</p>
                        </div>
                      </div>
                    ))}
                  </nav>
                </div>
              </aside>
            )}

            <section className="flex-1 overflow-y-auto p-6 md:p-12 relative flex flex-col items-center">
              <div className="w-full max-w-6xl space-y-10">
                
                <div className="flex justify-center mb-8">
                  <div className="bg-white/5 p-1.5 rounded-2xl border border-white/10 flex gap-2">
                    <button 
                      onClick={() => setActiveMainTab('templates')}
                      className={cn(
                        "px-6 h-11 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
                        activeMainTab === 'templates' ? "bg-primary text-white shadow-lg" : "text-white/40 hover:bg-white/5"
                      )}
                    >
                      Templates Prontos
                    </button>
                    <button 
                      onClick={() => setActiveMainTab('create')}
                      className={cn(
                        "px-6 h-11 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
                        activeMainTab === 'create' ? "bg-primary text-white shadow-lg" : "text-white/40 hover:bg-white/5"
                      )}
                    >
                      Criar do Zero
                    </button>
                  </div>
                </div>

                <AnimatePresence mode="wait">
                  {activeMainTab === 'templates' ? (
                    <motion.div 
                      key="templates-view"
                      initial={{ opacity: 1, y: 0 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-20 w-full"
                    >
                      {TEMPLATE_PRESETS.map((t) => (
                        <Card 
                          key={t.name} 
                          className="glass-card border-white/10 rounded-[2rem] p-8 flex flex-col space-y-8 group hover:border-primary/40 transition-all hover:shadow-[0_0_40px_rgba(124,58,255,0.15)] relative overflow-hidden"
                        >
                          <div className="relative w-full">
                            <div className="w-full bg-zinc-900 rounded-t-xl border border-zinc-700 overflow-hidden relative">
                              <div className="h-5 bg-zinc-800 flex items-center px-2 gap-1 border-b border-zinc-700">
                                <div className="h-2 w-2 rounded-full bg-red-500/70" />
                                <div className="h-2 w-2 rounded-full bg-yellow-500/70" />
                                <div className="h-2 w-2 rounded-full bg-green-500/70" />
                              </div>
                              
                              <button
                                onClick={() => setPreviewModal({ open: true, url: t.previewUrl, name: t.name })}
                                className="absolute top-2 right-2 px-2 py-1 bg-black/60 backdrop-blur-sm border border-white/10 rounded-lg text-[8px] font-black uppercase text-white hover:bg-primary/80 transition-all z-10"
                              >
                                VER SITE
                              </button>

                              <div className="relative h-52 overflow-hidden">
                                {t.previewUrl ? (
                                  <iframe
                                    src={t.previewUrl}
                                    className="w-full h-52 border-0 pointer-events-none"
                                    loading="lazy"
                                    sandbox="allow-scripts allow-same-origin"
                                    title={t.name}
                                  />
                                ) : (
                                  <div className="w-full h-52 bg-gradient-to-br from-primary/20 to-accent/10 flex items-center justify-center">
                                    <span className="text-[10px] font-black uppercase text-white/30 tracking-widest">Preview em breve</span>
                                  </div>
                                )}
                              </div>
                            </div>
                            <div className="h-2 bg-zinc-700 rounded-b-xl w-full" />
                            <div className="h-1 bg-zinc-600 rounded-b-xl w-[80%] mx-auto" />
                          </div>

                          <div className="flex flex-col items-center text-center space-y-6">
                            <div 
                              className="h-14 w-14 rounded-2xl flex items-center justify-center relative transition-transform duration-500 group-hover:scale-110"
                              style={{ backgroundColor: `${t.color}15`, border: `1px solid ${t.color}30` }}
                            >
                              <div className="absolute inset-0 blur-xl opacity-20" style={{ backgroundColor: t.color }} />
                              <t.icon className="h-7 w-7 relative z-10" style={{ color: t.color }} />
                            </div>
                            
                            <div className="space-y-2">
                              <h3 className="text-xl font-black italic uppercase tracking-tight text-white/90">{t.name}</h3>
                              <Badge variant="outline" className="bg-white/5 border-white/10 text-[9px] font-black uppercase tracking-widest opacity-60">
                                {t.badge}
                              </Badge>
                            </div>

                            <div className="w-full space-y-2">
                              <Button
                                variant="outline"
                                className="w-full h-12 rounded-xl border-white/10 text-[10px] font-black uppercase hover:bg-white/5 gap-2"
                                onClick={() => handleCopyTemplate(t.name)}
                              >
                                <Copy className="h-4 w-4" /> COPIAR PROMPT
                              </Button>
                              <Button
                                asChild
                                className="w-full h-12 rounded-xl bg-white text-black hover:bg-primary hover:text-white font-black uppercase tracking-widest text-[10px] gap-2 shadow-xl transition-all"
                              >
                                <a href="https://lovable.dev" target="_blank" rel="noopener noreferrer">
                                  <ExternalLink className="h-4 w-4" /> ABRIR LOVABLE
                                </a>
                              </Button>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </motion.div>
                  ) : (
                    <motion.div 
                      key="create-view"
                      initial={{ opacity: 1, y: 0 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="w-full max-w-2xl mx-auto space-y-10"
                    >
                      {!blueprint.isGenerated ? (
                        <motion.div 
                          key={blueprint.step} 
                          initial={{ opacity: 1, y: 0 }} 
                          animate={{ opacity: 1, y: 0 }} 
                          exit={{ opacity: 0, y: -10 }} 
                          className="space-y-10 pb-24 md:pb-0"
                        >
                          <div className="space-y-2">
                            <h2 className="text-[28px] font-extrabold text-white tracking-tighter uppercase italic leading-none">{STEPS[blueprint.step - 1].title}</h2>
                            <p className="text-white/30 text-[11px] uppercase tracking-[0.2em] font-black">{STEPS[blueprint.step - 1].sub}</p>
                          </div>

                          <Card className="glass-card border-white/10 rounded-[2rem] overflow-hidden shadow-none">
                            <CardContent className="p-8 md:p-10 space-y-8">
                              {blueprint.step === 1 && (
                                <div className="space-y-8">
                                  <div className="grid grid-cols-2 gap-3">
                                    {LANGUAGES.map(lang => (
                                      <button key={lang.id} onClick={() => setBlueprint({...blueprint, language: lang.id})} className={cn("h-14 rounded-xl border transition-all flex items-center justify-center gap-2", blueprint.language === lang.id ? "bg-primary/25 border-primary/40 text-[#c4b5fd]" : "bg-white/[0.04] border-white/5 text-white/40")}>
                                        <span className="text-lg">{lang.icon}</span>
                                        <span className="text-[10px] font-black uppercase">{lang.label}</span>
                                      </button>
                                    ))}
                                  </div>
                                  <div className="space-y-3">
                                    <Label className="text-[10px] font-black uppercase tracking-widest text-white/30">Nome do Projeto</Label>
                                    <Input placeholder="Ex: Flow Agency" className="h-14 bg-white/[0.04] border-white/5 rounded-xl focus-visible:ring-primary text-base" value={blueprint.name} onChange={e => setBlueprint({...blueprint, name: e.target.value})} />
                                  </div>
                                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                    {NICHES.map(n => (
                                      <button key={n.value} onClick={() => {
                                        setBlueprint({
                                          ...blueprint, 
                                          niche: n.value,
                                          palette: [n.theme.primary, n.theme.text, n.theme.bg]
                                        });
                                      }} className={cn("px-4 py-3 rounded-xl text-[10px] font-black uppercase transition-all border", blueprint.niche === n.value ? "bg-primary/25 border-primary/40 text-[#c4b5fd]" : "bg-white/[0.04] border-white/5 text-white/40")}>
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
                                      <p className="text-[11px] font-black uppercase text-white/90">{obj}</p>
                                      <p className="text-[10px] text-white/20 font-medium leading-relaxed">Briefing otimizado para conversão estratégica.</p>
                                    </button>
                                  ))}
                                </div>
                              )}

                              {blueprint.step === 3 && (
                                <div className="space-y-10">
                                  <div className="space-y-4">
                                    <div className="flex items-center justify-between mb-2">
                                      <Label className="text-[10px] font-black uppercase tracking-widest text-white/30">Estilo Visual</Label>
                                      <button 
                                        onClick={handleAIPalette}
                                        disabled={isGeneratingPalette}
                                        className="h-7 px-3 text-[9px] font-black uppercase text-primary hover:bg-primary/10 rounded-lg flex items-center gap-2 border border-primary/20 transition-all"
                                      >
                                        {isGeneratingPalette ? <Loader2 className="h-3 w-3 animate-spin" /> : <Sparkles className="h-3 w-3" />}
                                        Gerar Paleta com IA
                                      </button>
                                    </div>
                                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
                                      {STYLES.map(s => (
                                        <button key={s} onClick={() => setBlueprint({...blueprint, style: s})} className={cn("px-2 py-3 rounded-xl text-[8px] font-black uppercase transition-all border break-words text-center leading-tight", blueprint.style === s ? "bg-primary/25 border-primary/40 text-[#c4b5fd]" : "bg-white/[0.04] border-white/5 text-white/40")}>
                                          {s}
                                        </button>
                                      ))}
                                    </div>
                                  </div>
                                  
                                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div className="space-y-3">
                                      <Label className="text-[10px] font-black uppercase tracking-widest text-white/30">Primária</Label>
                                      <div className="flex gap-2">
                                        <div className="h-12 w-12 rounded-xl border border-white/10 shrink-0 shadow-lg" style={{ backgroundColor: blueprint.palette[0] }} />
                                        <Input 
                                          className="h-12 bg-white/[0.04] border-white/5 rounded-xl font-mono text-xs" 
                                          value={blueprint.palette[0]} 
                                          onChange={e => setBlueprint({...blueprint, palette: [e.target.value, blueprint.palette[1], blueprint.palette[2]]})} 
                                        />
                                      </div>
                                    </div>
                                    <div className="space-y-3">
                                      <Label className="text-[10px] font-black uppercase tracking-widest text-white/30">Texto</Label>
                                      <div className="flex gap-2">
                                        <div className="h-12 w-12 rounded-xl border border-white/10 shrink-0 shadow-lg" style={{ backgroundColor: blueprint.palette[1] }} />
                                        <Input 
                                          className="h-12 bg-white/[0.04] border-white/5 rounded-xl font-mono text-xs" 
                                          value={blueprint.palette[1]} 
                                          onChange={e => setBlueprint({...blueprint, palette: [blueprint.palette[0], e.target.value, blueprint.palette[2]]})} 
                                        />
                                      </div>
                                    </div>
                                    <div className="space-y-3">
                                      <Label className="text-[10px] font-black uppercase tracking-widest text-white/30">Fundo</Label>
                                      <div className="flex gap-2">
                                        <div className="h-12 w-12 rounded-xl border border-white/10 shrink-0 shadow-lg" style={{ backgroundColor: blueprint.palette[2] }} />
                                        <Input 
                                          className="h-12 bg-white/[0.04] border-white/5 rounded-xl font-mono text-xs" 
                                          value={blueprint.palette[2]} 
                                          onChange={e => setBlueprint({...blueprint, palette: [blueprint.palette[0], blueprint.palette[1], e.target.value]})} 
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )}

                              {blueprint.step === 4 && (
                                <div className="space-y-4">
                                  <Label className="text-[10px] font-black uppercase tracking-widest text-white/30">Público-Alvo (Persona)</Label>
                                  <Textarea 
                                    placeholder="Descreva quem utilizará a solução..." 
                                    className="min-h-[150px] bg-white/[0.04] border-white/5 rounded-2xl p-6 text-base font-medium"
                                    value={blueprint.audience}
                                    onChange={e => setBlueprint({...blueprint, audience: e.target.value})}
                                  />
                                </div>
                              )}

                              {blueprint.step === 5 && (
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                  {TONES.map(t => (
                                    <button key={t} onClick={() => setBlueprint({...blueprint, tone: t})} className={cn("px-4 py-3 rounded-xl text-[10px] font-black uppercase transition-all border", blueprint.tone === t ? "bg-primary/25 border-primary/40 text-[#c4b5fd]" : "bg-white/[0.04] border-white/5 text-white/40")}>
                                      {t}
                                    </button>
                                  ))}
                                </div>
                              )}

                              {blueprint.step === 6 && (
                                <div className="grid grid-cols-2 gap-2">
                                  {SECTIONS.map(s => (
                                    <button key={s} onClick={() => toggleSection(s)} className={cn("px-4 py-3 rounded-xl text-[10px] font-black uppercase transition-all border flex items-center justify-between", blueprint.sections.includes(s) ? "bg-primary/25 border-primary/40 text-[#c4b5fd]" : "bg-white/[0.04] border-white/5 text-white/40")}>
                                      {s}
                                      {blueprint.sections.includes(s) && <Check className="h-3 w-3" />}
                                    </button>
                                  ))}
                                </div>
                              )}

                              {blueprint.step === 7 && (
                                <div className="space-y-10">
                                  <div className="space-y-4">
                                    <Label className="text-[10px] font-black uppercase tracking-widest text-white/30">Funcionalidades Técnicas</Label>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                      {TECH_RESOURCES.map(res => (
                                        <button 
                                          key={res.id} 
                                          onClick={() => toggleTech(res.id)} 
                                          className={cn(
                                            "p-4 rounded-2xl border transition-all text-left group flex items-start gap-3",
                                            blueprint.selectedTech.includes(res.id) ? "bg-primary/25 border-primary/40" : "bg-white/[0.04] border-white/5 hover:bg-white/[0.06]"
                                          )}
                                        >
                                          <div className={cn(
                                            "h-9 w-9 rounded-xl flex items-center justify-center shrink-0 border transition-all",
                                            blueprint.selectedTech.includes(res.id) ? "bg-primary text-white border-primary" : "bg-white/5 text-white/20 border-white/10 group-hover:text-white/40"
                                          )}>
                                            {res.icon}
                                          </div>
                                          <div className="space-y-0.5">
                                            <p className="text-[11px] font-black uppercase text-white/90">{res.label}</p>
                                            <p className="text-[9px] text-white/20 font-medium leading-tight">{res.desc}</p>
                                          </div>
                                        </button>
                                      ))}
                                    </div>
                                  </div>

                                  <div className="space-y-4 pt-4 border-t border-white/5">
                                    <Label className="text-[10px] font-black uppercase tracking-widest text-white/30">Diferencial Único (Destaque do Projeto)</Label>
                                    <Textarea 
                                      placeholder="O que torna este projeto irresistível para o cliente? (Ex: Atendimento em 10min, Design Exclusivo, etc)" 
                                      className="min-h-[120px] bg-white/[0.04] border-white/5 rounded-2xl p-6 text-sm font-medium"
                                      value={blueprint.differential}
                                      onChange={e => setBlueprint({...blueprint, differential: e.target.value})}
                                    />
                                  </div>
                                </div>
                              )}

                              {blueprint.step === 8 && (
                                <div className="text-center space-y-6 py-6">
                                  <Binary className="h-12 w-12 text-primary mx-auto animate-pulse" style={{ willChange: 'transform' }} />
                                  <div className="space-y-2">
                                    <p className="text-[11px] text-white/40 font-black uppercase tracking-[0.3em]">Sincronização Neural Ativa</p>
                                    <p className="text-[10px] text-white/20 font-bold uppercase">Clique para processar o briefing técnico final.</p>
                                  </div>
                                </div>
                              )}
                            </CardContent>
                          </Card>

                          <div className="flex gap-4 sticky bottom-0 md:relative bg-[#05050f]/80 md:bg-transparent backdrop-blur-md md:backdrop-blur-0 p-4 md:p-0 -mx-6 md:mx-0 border-t border-white/5 md:border-none z-50">
                            <button 
                              onClick={handleBack} 
                              disabled={blueprint.step === 1} 
                              className="h-12 md:h-14 w-20 rounded-xl border border-white/5 bg-white/[0.04] flex items-center justify-center text-white/40 disabled:opacity-30"
                            >
                              <ChevronLeft className="h-6 w-6" />
                            </button>
                            <Button onClick={handleNext} disabled={(blueprint.step === 1 && (!blueprint.name || !blueprint.niche))} className="flex-1 h-12 md:h-14 rounded-xl bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-widest text-xs shadow-lg shadow-primary/20">
                              {blueprint.step === 8 ? "Gerar Blueprint" : "Próximo Passo"}
                            </Button>
                          </div>
                        </motion.div>
                      ) : (
                        <motion.div initial={{ opacity: 1, y: 0 }} animate={{ opacity: 1, y: 0 }} className="space-y-8 pt-4 pb-24 md:pb-20">
                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div className="space-y-1">
                              <h2 className="text-2xl font-semibold text-white tracking-tight uppercase italic">Briefing Gerado</h2>
                              <p className="text-white/30 text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                                <Sparkles className="h-3 w-3 text-primary" /> {wordCount} palavras · Alta Densidade
                              </p>
                            </div>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm" onClick={handleDownload} className="h-10 rounded-xl border-white/10 bg-white/5 text-[10px] font-black uppercase gap-2 flex-1 md:flex-none">
                                <Download className="h-4 w-4" /> .TXT
                              </Button>
                              <Button size="sm" onClick={() => { navigator.clipboard.writeText(generatedPrompt); setIsCopied(true); setTimeout(() => setIsCopied(false), 2000); toast.success("Copiado!"); }} className="h-10 rounded-xl bg-primary text-[10px] font-black uppercase gap-2 flex-1 md:flex-none">
                                {isCopied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                                {isCopied ? "COPIADO" : "COPIAR"}
                              </Button>
                            </div>
                          </div>

                          <div className="bg-white/[0.03] backdrop-blur-xl p-6 md:p-8 rounded-[2rem] border border-white/5 font-mono text-[13px] text-white/70 leading-relaxed whitespace-pre-wrap max-h-[500px] overflow-y-auto no-scrollbar shadow-inner">
                            {generatedPrompt}
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Button 
                              asChild
                              className="h-16 px-8 rounded-2xl bg-white text-black hover:bg-[#6366f1] hover:text-white font-black uppercase tracking-normal text-xs md:text-sm shadow-xl transition-all"
                            >
                              <a href="https://lovable.dev" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-3">
                                CRIAR APP NO LOVABLE <ExternalLink className="h-4 w-4 shrink-0" />
                              </a>
                            </Button>
                            <Button 
                              variant="ghost" 
                              onClick={() => setBlueprint(prev => ({ ...prev, isGenerated: false, step: 1 }))}
                              className="h-16 text-[11px] font-black uppercase text-white/30 hover:text-white transition-colors border border-white/5 rounded-2xl"
                            >
                              Novo Projeto
                            </Button>
                          </div>
                        </motion.div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </section>

            {activeMainTab === 'create' && (
              <aside className="w-[35%] border-l border-white/5 bg-white/[0.01] p-10 hidden lg:flex flex-col items-center relative">
                <div className="sticky top-12 w-full flex flex-col items-center gap-8">
                  <div className="px-4 py-1.5 rounded-full bg-white/[0.06] border border-white/10 flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" style={{ willChange: 'transform' }} />
                    <span className="text-[9px] font-black text-white/40 uppercase tracking-[0.2em]">Real-time Visualizer</span>
                  </div>

                  <div className="relative">
                    <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-48 h-6 bg-black/60 blur-xl rounded-full scale-x-150 animate-shadow-pulse pointer-events-none" />
                    
                    <div 
                      className="w-[260px] h-[520px] bg-[#1a1a1a] border-[3px] border-white/12 rounded-[44px] shadow-[0_40px_80px_rgba(0,0,0,0.6)] relative overflow-hidden flex flex-col animate-float"
                    >
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[100px] h-[30px] bg-black rounded-[99px] mt-3 z-50 flex items-center justify-center">
                        <div className="h-1 w-1 bg-white/5 rounded-full ml-10" />
                      </div>

                      <div 
                        className="flex-1 rounded-[36px] overflow-hidden flex flex-col transition-colors duration-500"
                        style={{ backgroundColor: currentTheme.bg }}
                      >
                        <AnimatePresence mode="wait">
                          <motion.div
                            key={blueprint.step + blueprint.niche + blueprint.palette[0]}
                            initial={{ opacity: 1, y: 0 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            transition={{ duration: 0.25 }}
                            className="flex-1 flex flex-col"
                          >
                            <div className="h-14 flex items-center justify-between px-6 pt-6 shrink-0">
                              <Menu className="h-4 w-4" style={{ color: currentTheme.text }} />
                              <span className="text-[9px] font-bold uppercase tracking-widest truncate max-w-[120px]" style={{ color: currentTheme.text }}>
                                {blueprint.name || 'Seu Projeto'}
                              </span>
                              <div className="h-6 w-6 rounded-full bg-white/10" />
                            </div>

                            <div className="flex-1 p-6 space-y-6 overflow-y-auto no-scrollbar">
                              {blueprint.step === 1 && (
                                <div className="space-y-4 pt-4">
                                  <h3 className="text-2xl font-black leading-tight tracking-tight uppercase italic" style={{ color: currentTheme.text }}>
                                    {blueprint.name || 'Nova Era Digital'}
                                  </h3>
                                  <div className="h-24 w-full rounded-2xl shadow-xl" style={{ backgroundColor: currentTheme.primary + '40' }} />
                                  <div className="grid grid-cols-3 gap-2">
                                    {[1,2,3].map(i => <div key={i} className="h-1 w-full bg-white/10 rounded-full" />)}
                                  </div>
                                </div>
                              )}

                              {blueprint.step === 2 && (
                                <div className="space-y-4 pt-4">
                                  <Badge variant="outline" className="border-white/10 text-[8px] font-black uppercase" style={{ color: currentTheme.text }}>{blueprint.objective}</Badge>
                                  <h3 className="text-xl font-black uppercase italic" style={{ color: currentTheme.text }}>Estratégia Neural</h3>
                                  <div className="space-y-2">
                                    <div className="h-12 w-full rounded-xl bg-white/5 border border-white/5 flex items-center px-4 gap-3">
                                      <Target className="h-4 w-4 opacity-40" style={{ color: currentTheme.primary }} />
                                      <div className="h-1.5 w-20 bg-white/10 rounded-full" />
                                    </div>
                                    <div className="h-12 w-full rounded-xl bg-white/5 border border-white/5 flex items-center px-4 gap-3">
                                      <Zap className="h-4 w-4 opacity-40" style={{ color: currentTheme.primary }} />
                                      <div className="h-1.5 w-24 bg-white/10 rounded-full" />
                                    </div>
                                  </div>
                                </div>
                              )}

                              {blueprint.step === 3 && (
                                <div className="space-y-6 pt-4">
                                  <div className="h-32 w-full rounded-3xl relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${currentTheme.primary}40, transparent)` }}>
                                    <div className="absolute bottom-4 left-4 h-8 w-8 rounded-full shadow-lg" style={{ backgroundColor: currentTheme.primary }} />
                                  </div>
                                  <div className="grid grid-cols-2 gap-3">
                                    <div className="h-20 rounded-2xl bg-white/5 border border-white/5" />
                                    <div className="h-20 rounded-2xl bg-white/5 border border-white/10" />
                                  </div>
                                  <div className="h-12 w-full rounded-xl shadow-lg flex items-center justify-center text-[10px] font-black uppercase tracking-widest text-white" style={{ backgroundColor: currentTheme.primary }}>
                                    Botão Primário
                                  </div>
                                </div>
                              )}

                              {blueprint.step === 4 && (
                                <div className="pt-4 space-y-4">
                                  <h3 className="text-xl font-black uppercase italic" style={{ color: currentTheme.text }}>Prova Social</h3>
                                  <div className="grid gap-3">
                                    {[1,2].map(i => (
                                      <div key={i} className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-2">
                                        <div className="flex gap-1">
                                          {[1,2,3,4,5].map(s => <Star key={s} className="h-2 w-2 fill-primary" style={{ color: currentTheme.primary }} />)}
                                        </div>
                                        <div className="h-1 w-full bg-white/10 rounded-full" />
                                        <div className="h-1 w-2/3 bg-white/10 rounded-full" />
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}

                              {blueprint.step === 5 && (
                                <div className="pt-4 space-y-4">
                                  <Badge variant="outline" className="border-white/10 text-[8px] font-black uppercase" style={{ color: currentTheme.text }}>TOM: {blueprint.tone}</Badge>
                                  <h3 className="text-xl font-black uppercase italic leading-tight" style={{ color: currentTheme.text }}>Headline no tom de voz escolhido</h3>
                                  <p className="text-[10px] opacity-40 font-medium leading-relaxed" style={{ color: currentTheme.text }}>Este é um exemplo de como a cópia do seu projeto irá se comportar no mobile.</p>
                                </div>
                              )}

                              {blueprint.step === 6 && (
                                <div className="pt-4 space-y-3">
                                  <h3 className="text-sm font-black uppercase tracking-widest text-center mb-4" style={{ color: currentTheme.text }}>Arquitetura</h3>
                                  {blueprint.sections.map(s => (
                                    <div key={s} className="flex items-center gap-3">
                                      <div className="h-10 flex-1 rounded-lg bg-white/5 border border-white/5 flex items-center px-4">
                                        <span className="text-[8px] font-bold uppercase tracking-widest opacity-40" style={{ color: currentTheme.text }}>{s}</span>
                                      </div>
                                      <div className="h-2 w-2 rounded-full" style={{ backgroundColor: currentTheme.primary }} />
                                    </div>
                                  ))}
                                </div>
                              )}

                              {blueprint.step === 7 && (
                                <div className="pt-4 space-y-6">
                                  <h3 className="text-sm font-black uppercase tracking-widest text-center" style={{ color: currentTheme.text }}>Recursos Ativos</h3>
                                  <div className="grid grid-cols-2 gap-2">
                                    {blueprint.selectedTech.map(id => (
                                      <div key={id} className="p-2 rounded-lg bg-white/5 border border-white/5 flex items-center gap-2">
                                        <div className="h-1 w-1 rounded-full bg-primary" />
                                        <span className="text-[8px] font-bold uppercase" style={{ color: currentTheme.text }}>{TECH_RESOURCES.find(r => r.id === id)?.label}</span>
                                      </div>
                                    ))}
                                  </div>
                                  <div className="p-4 rounded-xl border border-white/10" style={{ backgroundColor: currentTheme.primary + '10' }}>
                                    <p className="text-[8px] font-black uppercase tracking-widest opacity-40 mb-1" style={{ color: currentTheme.text }}>Diferencial</p>
                                    <div className="h-1 w-full bg-white/10 rounded-full" />
                                  </div>
                                </div>
                              )}

                              {blueprint.step === 8 && (
                                <div className="pt-4 space-y-6 text-center">
                                  <div className="h-20 w-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto animate-bounce">
                                    <Rocket className="h-10 w-10" style={{ color: currentTheme.primary }} />
                                  </div>
                                  <h3 className="text-lg font-black uppercase italic" style={{ color: currentTheme.text }}>Pronto para o Lançamento</h3>
                                  <div className="h-10 w-full rounded-xl shadow-lg" style={{ backgroundColor: currentTheme.primary }} />
                                </div>
                              )}
                            </div>

                            <div className="h-16 border-t border-white/5 flex items-center justify-around px-4 shrink-0">
                              <Home className="h-4 w-4 opacity-40" style={{ color: currentTheme.text }} />
                              <Search className="h-4 w-4 opacity-20" style={{ color: currentTheme.text }} />
                              <ShoppingBag className="h-4 w-4 opacity-20" style={{ color: currentTheme.text }} />
                              <User className="h-4 w-4 opacity-20" style={{ color: currentTheme.text }} />
                            </div>
                          </motion.div>
                        </AnimatePresence>
                      </div>
                    </div>
                  </div>

                  <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em] flex items-center gap-2">
                    <Smartphone className="h-3 w-3" /> Hardware Simulation
                  </p>
                </div>
              </aside>
            )}
          </div>
        </main>

        {previewModal.open && (
          <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex flex-col items-center justify-center p-4">
            <div className="w-full max-w-6xl flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <div className="h-3 w-3 rounded-full bg-red-500" />
                  <div className="h-3 w-3 rounded-full bg-yellow-500" />
                  <div className="h-3 w-3 rounded-full bg-green-500" />
                </div>
                <span className="text-sm font-black uppercase italic text-white tracking-widest">{previewModal.name}</span>
              </div>
              <div className="flex items-center gap-3">
                <a 
                  href={previewModal.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-primary/20 border border-primary/30 rounded-xl text-[10px] font-black uppercase text-primary hover:bg-primary hover:text-white transition-all"
                >
                  ABRIR EM NOVA ABA
                </a>
                <button
                  onClick={() => setPreviewModal({ open: false, url: '', name: '' })}
                  className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black uppercase text-white hover:bg-white/10 transition-all"
                >
                  FECHAR ✕
                </button>
              </div>
            </div>
            <div className="w-full max-w-6xl bg-zinc-900 rounded-2xl border border-zinc-700 overflow-hidden shadow-2xl shadow-primary/20">
              <div className="h-8 bg-zinc-800 border-b border-zinc-700 flex items-center px-4 gap-2">
                <div className="flex gap-1.5">
                  <div className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
                  <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/70" />
                  <div className="h-2.5 w-2.5 rounded-full bg-green-500/70" />
                </div>
                <div className="flex-1 mx-4 bg-zinc-700 rounded-md px-3 py-1 text-[10px] text-zinc-400 font-mono">
                  {previewModal.url}
                </div>
              </div>
              <iframe
                src={previewModal.url}
                className="w-full border-0"
                style={{ height: '75vh' }}
                loading="lazy"
                sandbox="allow-scripts allow-same-origin"
                title={previewModal.name}
              />
            </div>
          </div>
        )}
      </div>
    </SidebarProvider>
  );
}
