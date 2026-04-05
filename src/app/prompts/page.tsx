
"use client";

import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Terminal, 
  Copy, 
  Check, 
  Zap, 
  MessageSquare, 
  Target, 
  Sparkles,
  Globe,
  Palette,
  History,
  Lightbulb,
  Settings2,
  Loader2,
  ChevronRight,
  ShieldCheck,
  Cpu,
  ExternalLink,
  MousePointerClick,
  Info,
  Rocket,
  Smartphone,
  Monitor,
  RotateCcw,
  CheckCircle2
} from 'lucide-react';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from '@/components/AppSidebar';
import { useToast } from '@/hooks/use-toast';
import { generateMasterPrompt } from '@/ai/flows/generate-master-prompt';

// --- CONSTANTES DE OPÇÕES ---

const NICHE_OPTIONS = [
  "Educação/Cursos", "Saúde & Bem-estar", "Moda & Beleza", "Tecnologia/SaaS", 
  "Finanças", "Gastronomia", "Esporte/Fitness", "E-commerce", "Imóveis", 
  "Marketing/Agências", "Jurídico", "Outro"
];

const GOAL_OPTIONS = ["Capturar Leads", "Vender Direto", "Agendar Consulta", "Mostrar Portfólio", "Divulgar Evento"];

const STYLE_OPTIONS = ["Minimalista", "Moderno", "Corporativo", "Futurista", "Elegante", "Bold", "Natural"];

const COLOR_SWATCHES = [
  { name: "Deep Purple", hex: "#7c3aff" },
  { name: "Cyan Neon", hex: "#22d3ee" },
  { name: "Soft Lilac", hex: "#a855f7" },
  { name: "Midnight Blue", hex: "#1e1b4b" },
  { name: "Electric Green", hex: "#10b981" },
  { name: "Sunset Orange", hex: "#f59e0b" },
  { name: "Rose Pink", hex: "#f472b6" },
  { name: "Classic White", hex: "#ffffff" }
];

const TONE_OPTIONS = [
  { label: "Profissional", emoji: "👔", id: "prof" },
  { label: "Dinâmico", emoji: "⚡", id: "dyn" },
  { label: "Empático", emoji: "🤝", id: "emp" },
  { label: "Luxuoso", emoji: "💎", id: "lux" },
  { label: "Descontraído", emoji: "🎯", id: "chill" },
  { label: "Urgente", emoji: "🔥", id: "urg" }
];

const SECTION_OPTIONS = ["Hero", "Benefícios", "Depoimentos", "Preços", "FAQ", "CTA Final", "Sobre", "Portfólio", "Contato", "Vídeo"];

// --- COMPONENTES AUXILIARES ---

const AnimatedCounter = ({ value }: { value: number }) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const end = value;
    if (start === end) return;
    let timer = setInterval(() => {
      start += Math.ceil(end / 20);
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 30);
    return () => clearInterval(timer);
  }, [value]);
  return <span>{count}</span>;
};

const DevicePreview = ({ type }: { type: 'Sites/LP' | string }) => {
  const [activeDevice, setActiveDevice] = useState<'desktop' | 'mobile'>('desktop');

  if (type !== 'Sites/LP') return null;

  return (
    <div className="space-y-6 pt-10">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Monitor className="h-4 w-4 text-primary" />
          <h3 className="text-lg font-black italic uppercase text-white font-headline">Mockup Preview</h3>
        </div>
        <div className="flex bg-white/5 p-1 rounded-xl border border-white/10">
          <button 
            onClick={() => setActiveDevice('desktop')}
            className={`px-3 py-1.5 rounded-lg text-[9px] font-black uppercase flex items-center gap-2 transition-all ${activeDevice === 'desktop' ? 'bg-primary text-white' : 'text-muted-foreground'}`}
          >
            <Monitor className="h-3 w-3" /> Desktop
          </button>
          <button 
            onClick={() => setActiveDevice('mobile')}
            className={`px-3 py-1.5 rounded-lg text-[9px] font-black uppercase flex items-center gap-2 transition-all ${activeDevice === 'mobile' ? 'bg-primary text-white' : 'text-muted-foreground'}`}
          >
            <Smartphone className="h-3 w-3" /> Mobile
          </button>
        </div>
      </div>

      <div className="relative flex justify-center items-center py-10 bg-white/[0.02] border border-dashed border-white/10 rounded-[3rem] overflow-hidden">
        <div className="absolute inset-0 grid-background opacity-10"></div>
        
        <div className={`device-mockup ${activeDevice === 'desktop' ? 'w-full max-w-2xl h-[300px]' : 'w-[240px] h-[480px]'}`}>
          <div className="p-4 space-y-4">
            <div className="flex justify-between items-center mb-6">
              <div className="w-16 h-4 wireframe-block"></div>
              <div className="flex gap-2">
                <div className="w-8 h-4 wireframe-block"></div>
                <div className="w-8 h-4 wireframe-block"></div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="w-3/4 h-8 wireframe-block mx-auto"></div>
              <div className="w-1/2 h-4 wireframe-block mx-auto"></div>
            </div>
            <div className={`w-full wireframe-block ${activeDevice === 'desktop' ? 'h-32' : 'h-48'}`}></div>
            <div className="grid grid-cols-2 gap-2">
              <div className="h-12 wireframe-block"></div>
              <div className="h-12 wireframe-block"></div>
            </div>
            <div className="w-full h-10 bg-primary/20 border border-primary/30 rounded-lg animate-pulse mt-4"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- CONFIGURAÇÕES ---

const PROMPT_TEMPLATES = [
  {
    id: 'sites',
    title: 'Sites/LP',
    icon: <Globe className="h-4 w-4" />,
    description: 'Comando técnico para Lovable/Bolt criar sua página de vendas.',
    fields: ['product', 'niche', 'goal', 'style', 'colors', 'target_audience', 'tone', 'sections', 'differentiator', 'extra_info'],
  },
  {
    id: 'outreach',
    title: 'Abordagem Cold Direct',
    icon: <MessageSquare className="h-4 w-4" />,
    description: 'Script de primeiro contato que gera curiosidade e resposta.',
    fields: ['product', 'niche', 'tone'],
  },
  {
    id: 'closing',
    title: 'Fechamento & Objeções',
    icon: <Target className="h-4 w-4" />,
    description: 'Prompt para quebrar resistências de preço ou "vou pensar".',
    fields: ['product', 'price', 'objection'],
  },
  {
    id: 'logo',
    title: 'Identidade Visual/Logo',
    icon: <Palette className="h-4 w-4" />,
    description: 'Instruções visuais para Midjourney e DALL-E 3.',
    fields: ['businessName', 'style', 'colors'],
  }
];

const FIELD_LABELS: Record<string, string> = {
  product: 'O que você vende?',
  niche: 'Nicho do negócio',
  goal: 'Objetivo da página',
  style: 'Estilo visual',
  colors: 'Paleta de cores',
  target_audience: 'Público-alvo',
  tone: 'Tom de voz',
  sections: 'Seções do site',
  differentiator: 'Diferencial da marca',
  extra_info: 'Informações extras',
  businessName: 'Nome da Empresa',
  price: 'Preço da Oferta',
  objection: 'Objeção do Cliente'
};

const FIELD_PLACEHOLDERS: Record<string, string> = {
  product: 'Ex: Consultoria de Vendas Flow',
  target_audience: 'Descreva seu cliente ideal...',
  differentiator: 'O que te diferencia dos concorrentes?',
  extra_info: 'Qualquer detalhe adicional...',
  businessName: 'Ex: FlowPro Systems',
  price: 'Ex: 12x de 197,00',
  objection: 'Ex: Ele disse que não tem tempo agora'
};

const SUGGESTED_TOOLS: Record<string, { name: string, url: string }[]> = {
  sites: [
    { name: 'Lovable', url: 'https://lovable.dev' },
    { name: 'v0.dev', url: 'https://v0.dev' }
  ],
  logo: [
    { name: 'Midjourney', url: 'https://midjourney.com' },
    { name: 'DALL·E 3', url: 'https://chatgpt.com' }
  ],
  outreach: [
    { name: 'ChatGPT', url: 'https://chatgpt.com' },
    { name: 'Claude', url: 'https://claude.ai' }
  ],
  closing: [
    { name: 'IA Mentor', url: '/mentor' },
    { name: 'ChatGPT', url: 'https://chatgpt.com' }
  ]
};

// --- PÁGINA PRINCIPAL ---

export default function PromptsPage() {
  const [activeTemplate, setActiveTemplate] = useState(PROMPT_TEMPLATES[0]);
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [generatedPrompt, setGeneratedPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [complexity, setComplexity] = useState<'simple' | 'advanced'>('advanced');
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();
  const mainBtnRef = useRef<HTMLButtonElement>(null);

  const createParticles = (e: React.MouseEvent) => {
    const btn = mainBtnRef.current;
    if (!btn) return;
    const x = e.clientX;
    const y = e.clientY;

    for (let i = 0; i < 15; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.left = `${x}px`;
      particle.style.top = `${y}px`;
      
      const tx = (Math.random() - 0.5) * 200;
      const ty = (Math.random() - 0.5) * 200;
      particle.style.setProperty('--tw-translate-x', `${tx}px`);
      particle.style.setProperty('--tw-translate-y', `${ty}px`);
      
      document.body.appendChild(particle);
      setTimeout(() => particle.remove(), 800);
    }
  };

  const handleGenerate = async (e: React.MouseEvent) => {
    createParticles(e);
    setIsLoading(true);
    setGeneratedPrompt('');
    setProgress(0);

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 5;
      });
    }, 60);

    try {
      // Transformar arrays do formulário em strings para a API
      const processedData: Record<string, string> = {};
      Object.keys(formData).forEach(key => {
        const val = formData[key];
        processedData[key] = Array.isArray(val) ? val.join(", ") : String(val);
      });

      const res = await generateMasterPrompt({
        category: activeTemplate.title,
        variables: processedData,
        complexity: complexity
      });
      setGeneratedPrompt(res.prompt);
      toast({ title: "Comando Neural Gerado!", description: "Sua instrução de alta performance está pronta." });
    } catch (e) {
      toast({ variant: "destructive", title: "Erro na Rede", description: "Verifique sua conexão e tente novamente." });
    } finally {
      setIsLoading(false);
      clearInterval(interval);
      setProgress(100);
    }
  };

  const handleCopy = () => {
    if (!generatedPrompt) return;
    navigator.clipboard.writeText(generatedPrompt);
    setCopied(true);
    toast({ 
      title: "Pronto para o Flow!", 
      description: "Comando copiado para sua área de transferência.",
      className: "animate-in slide-in-from-right-full duration-500 border-primary/50"
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const toggleMultiSelect = (field: string, value: string) => {
    const current = formData[field] || [];
    const updated = current.includes(value)
      ? current.filter((v: string) => v !== value)
      : [...current, value];
    setFormData({ ...formData, [field]: updated });
  };

  const updateField = (field: string, value: any) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleTemplateChange = (template: typeof PROMPT_TEMPLATES[0]) => {
    setActiveTemplate(template);
    setGeneratedPrompt('');
    setFormData({}); 
    setProgress(0);
  };

  const currentTools = SUGGESTED_TOOLS[activeTemplate.id] || SUGGESTED_TOOLS.outreach;

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-[#080810]">
        <AppSidebar />
        
        <main className="flex-1 flex flex-col min-w-0">
          <header className="h-16 border-b border-white/5 flex items-center justify-between px-4 md:px-6 bg-[#080810]/80 backdrop-blur-md sticky top-0 z-50">
            <div className="flex items-center gap-2 md:gap-4">
              <SidebarTrigger className="text-muted-foreground hover:text-white" />
              <div className="h-4 w-px bg-white/10 hidden md:block" />
              <h1 className="text-[10px] md:text-sm font-black italic uppercase tracking-widest flex items-center gap-2 font-headline">
                <Terminal className="h-3 w-3 md:h-4 md:w-4 text-primary" /> PromptForge
              </h1>
            </div>
          </header>

          <div className="flex-1 container max-w-5xl mx-auto p-4 md:p-8 space-y-8 md:space-y-12">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[8px] font-black uppercase tracking-widest">
                  <Cpu className="h-3 w-3 animate-pulse" /> Engenharia Neural Ativa
                </div>
                <h2 className="text-3xl md:text-4xl font-black italic uppercase tracking-tighter text-white leading-tight font-headline">Fábrica de Comandos</h2>
                <p className="text-muted-foreground text-xs md:text-sm uppercase font-bold tracking-widest flex items-center gap-2">
                  <AnimatedCounter value={1420} /> Prompts Otimizados Hoje
                </p>
              </div>

              <div className="flex bg-white/5 p-1 rounded-xl border border-white/10 w-full md:w-auto">
                <button 
                  onClick={() => setComplexity('simple')}
                  className={`flex-1 md:flex-none px-4 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${complexity === 'simple' ? 'bg-white text-black shadow-lg' : 'text-muted-foreground hover:text-white'}`}
                >
                  Simples
                </button>
                <button 
                  onClick={() => setComplexity('advanced')}
                  className={`flex-1 md:flex-none px-4 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${complexity === 'advanced' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-muted-foreground hover:text-white'}`}
                >
                  Avançado
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12">
              <div className="lg:col-span-4 space-y-4">
                <p className="text-[10px] font-black uppercase tracking-widest text-primary/60 px-2 font-headline">Escolha seu Objetivo</p>
                <div className="flex overflow-x-auto lg:grid gap-2 no-scrollbar pb-4 lg:pb-0 px-1 md:px-0">
                  {PROMPT_TEMPLATES.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => handleTemplateChange(t)}
                      className={`p-4 rounded-2xl border text-left transition-all group relative overflow-hidden shrink-0 lg:shrink-1 w-[200px] lg:w-full ${
                        activeTemplate.id === t.id 
                        ? 'bg-primary/10 border-primary text-white shadow-[0_0_30px_rgba(139,92,246,0.15)]' 
                        : 'bg-white/[0.02] border-white/5 text-muted-foreground hover:bg-white/[0.05] hover:border-white/10'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${activeTemplate.id === t.id ? 'bg-primary text-white' : 'bg-white/5 text-muted-foreground group-hover:text-white'}`}>
                          {t.icon}
                        </div>
                        <div className="min-w-0">
                          <span className="text-[10px] md:text-xs font-black uppercase italic truncate block font-headline">{t.title}</span>
                          <p className="text-[8px] md:text-[9px] font-medium opacity-50 line-clamp-1 font-body">{t.description}</p>
                        </div>
                      </div>
                      {activeTemplate.id === t.id && (
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 hidden lg:block">
                          <ChevronRight className="h-4 w-4 text-primary animate-pulse" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-8 space-y-8">
                <Card className="glass-card border-white/10 rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden bg-[#0e0e1a]">
                  <CardHeader className="bg-white/5 border-b border-white/5 p-6 md:p-8">
                    <CardTitle className="text-[10px] md:text-xs font-black uppercase tracking-widest italic flex items-center gap-2 leading-tight font-headline">
                      <Settings2 className="h-4 w-4 text-primary shrink-0" /> {activeTemplate.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 md:p-10 space-y-8">
                    
                    <div className="grid grid-cols-1 gap-8">
                      {/* Campo: O que você vende */}
                      <div className="space-y-3 group input-glow">
                        <Label className="text-[9px] md:text-[10px] font-black uppercase tracking-widest opacity-50 group-focus-within:opacity-100 group-focus-within:text-primary transition-all">
                          {FIELD_LABELS.product}
                        </Label>
                        <Input 
                          placeholder={FIELD_PLACEHOLDERS.product}
                          className="bg-white/5 border-white/10 h-12 md:h-14 rounded-2xl focus-visible:ring-primary font-medium text-sm transition-all"
                          value={formData.product || ''}
                          onChange={(e) => updateField('product', e.target.value)}
                        />
                      </div>

                      {/* Lógica condicional para SITES/LP */}
                      {activeTemplate.id === 'sites' ? (
                        <div className="space-y-10">
                          {/* Nicho - Select */}
                          <div className="space-y-3">
                            <Label className="text-[9px] md:text-[10px] font-black uppercase tracking-widest opacity-50">Nicho do Negócio</Label>
                            <Select onValueChange={(val) => updateField('niche', val)} value={formData.niche}>
                              <SelectTrigger className="bg-white/5 border-white/10 h-14 rounded-2xl focus:ring-primary text-sm font-medium">
                                <SelectValue placeholder="Selecione o Nicho" />
                              </SelectTrigger>
                              <SelectContent className="bg-[#0e0e1a] border-white/10">
                                {NICHE_OPTIONS.map(opt => (
                                  <SelectItem key={opt} value={opt} className="text-xs uppercase font-bold">{opt}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>

                          {/* Objetivo - Chips */}
                          <div className="space-y-3">
                            <Label className="text-[9px] md:text-[10px] font-black uppercase tracking-widest opacity-50">Objetivo da Página</Label>
                            <div className="flex flex-wrap gap-2">
                              {GOAL_OPTIONS.map(opt => (
                                <button
                                  key={opt}
                                  onClick={() => updateField('goal', opt)}
                                  className={`px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest border transition-all ${formData.goal === opt ? 'bg-primary/20 border-primary text-white' : 'bg-white/5 border-white/10 text-muted-foreground hover:bg-white/10'}`}
                                >
                                  {opt}
                                </button>
                              ))}
                            </div>
                          </div>

                          {/* Estilo Visual - Chips */}
                          <div className="space-y-3">
                            <Label className="text-[9px] md:text-[10px] font-black uppercase tracking-widest opacity-50">Estilo Visual</Label>
                            <div className="flex flex-wrap gap-2">
                              {STYLE_OPTIONS.map(opt => (
                                <button
                                  key={opt}
                                  onClick={() => updateField('style', opt)}
                                  className={`px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest border transition-all ${formData.style === opt ? 'bg-primary/20 border-primary text-white' : 'bg-white/5 border-white/10 text-muted-foreground hover:bg-white/10'}`}
                                >
                                  {opt}
                                </button>
                              ))}
                            </div>
                          </div>

                          {/* Paleta de Cores - Swatches */}
                          <div className="space-y-4">
                            <Label className="text-[9px] md:text-[10px] font-black uppercase tracking-widest opacity-50">Paleta de Cores</Label>
                            <div className="flex flex-wrap gap-3">
                              {COLOR_SWATCHES.map(swatch => (
                                <button
                                  key={swatch.name}
                                  onClick={() => updateField('colors', swatch.hex)}
                                  className={`h-8 w-8 rounded-full border-2 transition-all hover:scale-110 ${formData.colors === swatch.hex ? 'border-white scale-110 shadow-[0_0_10px_rgba(255,255,255,0.3)]' : 'border-transparent'}`}
                                  style={{ backgroundColor: swatch.hex }}
                                  title={swatch.name}
                                />
                              ))}
                            </div>
                            <Input 
                              placeholder="Ou digite cores personalizadas..."
                              className="bg-white/5 border-white/10 h-12 rounded-xl text-xs"
                              value={formData.colors || ''}
                              onChange={(e) => updateField('colors', e.target.value)}
                            />
                          </div>

                          {/* Público Alvo */}
                          <div className="space-y-3">
                            <Label className="text-[9px] md:text-[10px] font-black uppercase tracking-widest opacity-50">Público-Alvo</Label>
                            <Input 
                              placeholder={FIELD_PLACEHOLDERS.target_audience}
                              className="bg-white/5 border-white/10 h-14 rounded-2xl focus-visible:ring-primary font-medium text-sm"
                              value={formData.target_audience || ''}
                              onChange={(e) => updateField('target_audience', e.target.value)}
                            />
                          </div>

                          {/* Tom de Voz - Cards */}
                          <div className="space-y-3">
                            <Label className="text-[9px] md:text-[10px] font-black uppercase tracking-widest opacity-50">Tom de Voz</Label>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                              {TONE_OPTIONS.map(opt => (
                                <button
                                  key={opt.id}
                                  onClick={() => updateField('tone', opt.label)}
                                  className={`p-3 rounded-2xl border text-left flex items-center gap-3 transition-all ${formData.tone === opt.label ? 'bg-primary/20 border-primary' : 'bg-white/5 border-white/10'}`}
                                >
                                  <span className="text-lg">{opt.emoji}</span>
                                  <span className="text-[9px] font-black uppercase tracking-widest text-white/80">{opt.label}</span>
                                </button>
                              ))}
                            </div>
                          </div>

                          {/* Seções - Multi Chips */}
                          <div className="space-y-3">
                            <Label className="text-[9px] md:text-[10px] font-black uppercase tracking-widest opacity-50">Seções do Site (Múltipla)</Label>
                            <div className="flex flex-wrap gap-2">
                              {SECTION_OPTIONS.map(opt => (
                                <button
                                  key={opt}
                                  onClick={() => toggleMultiSelect('sections', opt)}
                                  className={`px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest border transition-all ${formData.sections?.includes(opt) ? 'bg-primary/20 border-primary text-white' : 'bg-white/5 border-white/10 text-muted-foreground hover:bg-white/10'}`}
                                >
                                  {opt}
                                </button>
                              ))}
                            </div>
                          </div>

                          {/* Diferencial */}
                          <div className="space-y-3">
                            <Label className="text-[9px] md:text-[10px] font-black uppercase tracking-widest opacity-50">Diferencial da Marca</Label>
                            <Input 
                              placeholder={FIELD_PLACEHOLDERS.differentiator}
                              className="bg-white/5 border-white/10 h-14 rounded-2xl focus-visible:ring-primary font-medium text-sm"
                              value={formData.differentiator || ''}
                              onChange={(e) => updateField('differentiator', e.target.value)}
                            />
                          </div>

                          {/* Info Extras */}
                          <div className="space-y-3">
                            <Label className="text-[9px] md:text-[10px] font-black uppercase tracking-widest opacity-50">Informações Extras</Label>
                            <Textarea 
                              placeholder={FIELD_PLACEHOLDERS.extra_info}
                              className="bg-white/5 border-white/10 rounded-2xl min-h-[100px] focus-visible:ring-primary font-medium text-sm"
                              value={formData.extra_info || ''}
                              onChange={(e) => updateField('extra_info', e.target.value)}
                            />
                          </div>
                        </div>
                      ) : (
                        // Renderização padrão para outros templates
                        activeTemplate.fields.filter(f => f !== 'product').map((field) => (
                          <div key={field} className="space-y-3 group input-glow">
                            <Label className="text-[9px] md:text-[10px] font-black uppercase tracking-widest opacity-50 group-focus-within:opacity-100 group-focus-within:text-primary transition-all">
                              {FIELD_LABELS[field] || field}
                            </Label>
                            <Input 
                              placeholder={FIELD_PLACEHOLDERS[field] || 'Preencha...'}
                              className="bg-white/5 border-white/10 h-12 md:h-14 rounded-2xl focus-visible:ring-primary font-medium text-sm transition-all"
                              value={formData[field] || ''}
                              onChange={(e) => updateField(field, e.target.value)}
                            />
                          </div>
                        ))
                      )}
                    </div>

                    <div className="space-y-4 pt-6">
                      {isLoading && (
                        <div className="space-y-2 animate-in fade-in duration-500">
                          <div className="flex justify-between text-[8px] font-black uppercase text-primary">
                            <span>Sincronizando Neurônios...</span>
                            <span>{progress}%</span>
                          </div>
                          <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-primary transition-all duration-300 shadow-[0_0_10px_#7c3aff]"
                              style={{ width: `${progress}%` }}
                            ></div>
                          </div>
                        </div>
                      )}

                      <Button 
                        ref={mainBtnRef}
                        onClick={handleGenerate}
                        disabled={isLoading || !formData.product}
                        className="w-full h-14 md:h-20 bg-primary hover:bg-primary/90 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] md:text-xs shadow-xl shadow-primary/20 transition-all active:scale-[0.98] group relative overflow-hidden"
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="mr-3 h-5 w-5 md:h-6 md:w-6 animate-spin" />
                            PROCESSANDO...
                          </>
                        ) : (
                          <>
                            ATIVAR ENGENHARIA <Zap className="ml-2 h-4 w-4 md:h-5 md:w-5 fill-white group-hover:scale-125 transition-transform" />
                          </>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {generatedPrompt && (
                  <div className="space-y-8 md:space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-700">
                    <div className="relative p-[2px] rounded-[2rem] md:rounded-[3rem] overflow-hidden bg-gradient-to-br from-primary via-accent/50 to-primary/30 shadow-2xl shadow-primary/20">
                      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent animate-pulse"></div>
                      <Card className="relative bg-[#0b0b14] border-none rounded-[calc(2rem-2px)] md:rounded-[calc(3rem-2px)] overflow-hidden">
                        <CardHeader className="flex flex-row items-center justify-between p-6 md:p-8 border-b border-white/5">
                          <div className="flex items-center gap-3">
                            <div className="h-8 w-8 md:h-10 md:w-10 rounded-xl md:rounded-2xl bg-primary/20 flex items-center justify-center text-primary border border-primary/20">
                              <ShieldCheck className="h-5 w-5 text-green-500" />
                            </div>
                            <div>
                              <p className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] text-primary leading-none mb-1 font-headline">Comando Gerado</p>
                              <p className="text-[7px] md:text-[8px] font-bold text-muted-foreground uppercase leading-none font-body">Pronto para execução</p>
                            </div>
                          </div>
                          <Badge variant="outline" className="border-primary/30 text-primary text-[7px] md:text-[8px] font-black uppercase font-body">
                            {complexity.toUpperCase()}
                          </Badge>
                        </CardHeader>
                        
                        <CardContent className="p-6 md:p-10 space-y-6 md:space-y-8">
                          <div className="bg-black/40 p-5 md:p-8 rounded-2xl md:rounded-3xl border border-white/5 relative group">
                            <pre className="text-xs md:text-base font-medium text-white/90 leading-relaxed whitespace-pre-wrap italic font-code">
                              {generatedPrompt}
                            </pre>
                            <div className="absolute top-4 right-4 opacity-20 group-hover:opacity-100 transition-opacity">
                               <Sparkles className="h-4 w-4 md:h-5 md:w-5 text-primary" />
                            </div>
                          </div>
                          
                          <div className="flex flex-col sm:flex-row gap-3">
                            <Button 
                              onClick={handleCopy} 
                              className={`flex-1 h-16 md:h-20 rounded-2xl text-sm md:text-lg font-black uppercase tracking-[0.2em] shadow-2xl transition-all active:scale-95 group relative overflow-hidden ${
                                copied ? 'bg-green-500' : 'bg-white text-black hover:bg-white/90'
                              }`}
                            >
                              <div className="flex items-center justify-center gap-3 md:gap-4 relative z-10">
                                {copied ? (
                                  <><Check className="h-6 w-6 md:h-7 md:w-7" /> COPIADO!</>
                                ) : (
                                  <><Copy className="h-5 w-5 md:h-6 md:w-6" /> COPIAR COMANDO</>
                                )}
                              </div>
                            </Button>
                            
                            <Button 
                              onClick={handleGenerate}
                              variant="outline"
                              className="h-16 md:h-20 px-8 rounded-2xl border-white/10 hover:bg-white/5 text-white/70 font-black uppercase text-[10px] tracking-widest gap-2"
                            >
                              <RotateCcw className="h-5 w-5" /> REGENERAR
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    <DevicePreview type={activeTemplate.title} />

                    <div className="space-y-6">
                      <div className="flex items-center gap-3 px-2">
                        <MousePointerClick className="h-4 w-4 md:h-5 md:w-5 text-primary" />
                        <h3 className="text-lg md:text-xl font-black italic uppercase tracking-tighter text-white font-headline">Onde usar este comando?</h3>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {currentTools.map((tool, i) => (
                          <Card key={i} className="glass-card border-white/5 rounded-2xl md:rounded-3xl overflow-hidden group hover:border-primary/40 transition-all duration-500">
                            <CardContent className="p-5 md:p-6 flex items-center justify-between gap-4">
                              <div className="flex items-center gap-3 md:gap-4 min-w-0">
                                <div className="h-10 w-10 md:h-12 md:w-12 bg-white/5 rounded-xl flex items-center justify-center text-white border border-white/10 group-hover:bg-primary/10 group-hover:border-primary/20 transition-all shrink-0">
                                  {i === 0 ? <Zap className="h-5 w-5 md:h-6 md:w-6 text-primary fill-primary" /> : <Sparkles className="h-5 w-5 md:h-6 md:w-6 text-accent" />}
                                </div>
                                <div className="space-y-0.5 min-w-0">
                                  <p className="text-[7px] md:text-[8px] font-black uppercase tracking-[0.2em] text-muted-foreground font-body">Recomendação</p>
                                  <h4 className="font-black italic uppercase tracking-tight text-base md:text-lg text-white truncate font-headline">{tool.name}</h4>
                                </div>
                              </div>
                              <Button asChild size="sm" variant="outline" className="rounded-xl border-white/10 h-10 md:h-12 px-4 md:px-6 text-[9px] md:text-[10px] font-black uppercase hover:bg-primary hover:text-white transition-all shadow-lg shrink-0 font-body">
                                <a href={tool.url} target="_blank" rel="noopener noreferrer">
                                  ABRIR <ExternalLink className="ml-1.5 h-3 w-3" />
                                </a>
                              </Button>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
