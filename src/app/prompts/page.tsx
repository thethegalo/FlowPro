
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

// --- CONSTANTES ---
const NICHE_OPTIONS = ["Educação/Cursos", "Saúde & Bem-estar", "Moda & Beleza", "Tecnologia/SaaS", "Finanças", "Gastronomia", "Esporte/Fitness", "E-commerce", "Imóveis", "Marketing/Agências", "Jurídico", "Outro"];
const GOAL_OPTIONS = ["Capturar Leads", "Vender Direto", "Agendar Consulta", "Mostrar Portfólio", "Divulgar Evento"];
const STYLE_OPTIONS = ["Minimalista", "Moderno", "Corporativo", "Futurista", "Elegante", "Bold", "Natural"];
const COLOR_SWATCHES = [{ name: "Deep Purple", hex: "#7c3aff" }, { name: "Cyan Neon", hex: "#22d3ee" }, { name: "Soft Lilac", hex: "#a855f7" }, { name: "Midnight Blue", hex: "#1e1b4b" }, { name: "Electric Green", hex: "#10b981" }, { name: "Sunset Orange", hex: "#f59e0b" }, { name: "Rose Pink", hex: "#f472b6" }, { name: "Classic White", hex: "#ffffff" }];
const TONE_OPTIONS = [{ label: "Profissional", emoji: "👔", id: "prof" }, { label: "Dinâmico", emoji: "⚡", id: "dyn" }, { label: "Empático", emoji: "🤝", id: "emp" }, { label: "Luxuoso", emoji: "💎", id: "lux" }, { label: "Descontraído", emoji: "🎯", id: "chill" }, { label: "Urgente", emoji: "🔥", id: "urg" }];
const SECTION_OPTIONS = ["Hero", "Benefícios", "Depoimentos", "Preços", "FAQ", "CTA Final", "Sobre", "Portfólio", "Contato", "Vídeo"];

const PROMPT_TEMPLATES = [
  { id: 'sites', title: 'Sites/LP', icon: <Globe className="h-4 w-4" />, description: 'Comando técnico para Lovable/Bolt criar sua página de vendas.', fields: ['product', 'niche', 'goal', 'style', 'colors', 'target_audience', 'tone', 'sections', 'differentiator', 'extra_info'] },
  { id: 'outreach', title: 'Abordagem Cold Direct', icon: <MessageSquare className="h-4 w-4" />, description: 'Script de primeiro contato que gera curiosidade e resposta.', fields: ['product', 'niche', 'tone'] },
  { id: 'closing', title: 'Fechamento & Objeções', icon: <Target className="h-4 w-4" />, description: 'Prompt para quebrar resistências de preço ou "vou pensar".', fields: ['product', 'price', 'objection'] },
  { id: 'logo', title: 'Identidade Visual/Logo', icon: <Palette className="h-4 w-4" />, description: 'Instruções visuais para Midjourney e DALL-E 3.', fields: ['businessName', 'style', 'colors'] }
];

const SUGGESTED_TOOLS: Record<string, { name: string, url: string }[]> = {
  sites: [{ name: 'Lovable', url: 'https://lovable.dev' }, { name: 'v0.dev', url: 'https://v0.dev' }],
  logo: [{ name: 'Midjourney', url: 'https://midjourney.com' }, { name: 'DALL·E 3', url: 'https://chatgpt.com' }],
  outreach: [{ name: 'ChatGPT', url: 'https://chatgpt.com' }, { name: 'Claude', url: 'https://claude.ai' }],
  closing: [{ name: 'IA Mentor', url: '/mentor' }, { name: 'ChatGPT', url: 'https://chatgpt.com' }]
};

const AnimatedCounter = ({ value }: { value: number }) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const end = value;
    if (start === end) return;
    let timer = setInterval(() => {
      start += Math.ceil(end / 20);
      if (start >= end) { setCount(end); clearInterval(timer); } else { setCount(start); }
    }, 30);
    return () => clearInterval(timer);
  }, [value]);
  return <span>{count}</span>;
};

const DevicePreview = ({ type, formData }: { type: string, formData: Record<string, any> }) => {
  const [activeDevice, setActiveDevice] = useState<'desktop' | 'mobile'>('desktop');
  if (type !== 'Sites/LP') return null;
  const sections = Array.isArray(formData.sections) ? formData.sections : [];
  const activeStyle = formData.style || 'Moderno';
  const colorInput = (formData.colors || '').toLowerCase();
  let primaryColor = '#7c3aff';
  let deviceBg = '#0e0e1a';
  if (colorInput.includes('roxo')) primaryColor = '#7c3aff';
  else if (colorInput.includes('azul') || colorInput.includes('ciano')) primaryColor = '#22d3ee';
  if (formData.colors?.startsWith('#')) {
    primaryColor = formData.colors;
    if (primaryColor === '#ffffff') deviceBg = '#f8f9fa';
  }
  return (
    <div className="space-y-6 pt-10 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-black italic uppercase text-white font-headline flex items-center gap-2"><Monitor className="h-4 w-4 text-primary" /> Mockup Preview</h3>
        <div className="flex bg-white/5 p-1 rounded-xl border border-white/10">
          <button onClick={() => setActiveDevice('desktop')} className={`px-3 py-1.5 rounded-lg text-[9px] font-black uppercase flex items-center gap-2 transition-all ${activeDevice === 'desktop' ? 'bg-primary text-white' : 'text-muted-foreground'}`}><Monitor className="h-3 w-3" /> Desktop</button>
          <button onClick={() => setActiveDevice('mobile')} className={`px-3 py-1.5 rounded-lg text-[9px] font-black uppercase flex items-center gap-2 transition-all ${activeDevice === 'mobile' ? 'bg-primary text-white' : 'text-muted-foreground'}`}><Smartphone className="h-3 w-3" /> Mobile</button>
        </div>
      </div>
      <div className="relative flex justify-center items-center py-10 bg-white/[0.02] border border-dashed border-white/10 rounded-[3rem] overflow-hidden min-h-[450px]">
        <div className={`device-mockup transition-all duration-700 ease-in-out shadow-2xl border-4 border-white/10 relative ${activeDevice === 'desktop' ? 'w-full max-w-2xl aspect-video rounded-t-3xl' : 'w-[260px] h-[520px] rounded-[3rem]'}`} style={{ backgroundColor: deviceBg }}>
          <div className="h-full flex flex-col p-4 space-y-4">
            {sections.length > 0 ? sections.map((sec, idx) => (
              <div key={idx} className="w-full rounded-xl border flex items-center justify-center p-4" style={{ backgroundColor: primaryColor, opacity: 0.15, borderColor: primaryColor }}>
                <span className="text-[8px] font-black uppercase text-white/50">{sec}</span>
              </div>
            )) : <div className="flex-1 flex items-center justify-center opacity-20"><Rocket className="h-10 w-10 animate-bounce" /></div>}
          </div>
        </div>
      </div>
    </div>
  );
};

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

  const handleGenerate = async () => {
    setIsLoading(true);
    setGeneratedPrompt('');
    setProgress(0);
    const interval = setInterval(() => setProgress(p => p >= 100 ? 100 : p + 5), 60);
    try {
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
      toast({ title: "Comando Gerado!", description: "Sua instrução neural está pronta." });
    } catch (e) {
      toast({ variant: "destructive", title: "Erro na IA", description: "Verifique sua chave Gemini." });
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
    toast({ title: "Copiado!" });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-[#080810]">
        <AppSidebar />
        <main className="flex-1 flex flex-col min-w-0">
          <header className="h-16 border-b border-white/5 flex items-center justify-between px-6 bg-[#080810]/80 backdrop-blur-md sticky top-0 z-50">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="text-muted-foreground" />
              <h1 className="text-sm font-black italic uppercase tracking-widest flex items-center gap-2"><Terminal className="h-4 w-4 text-primary" /> PromptForge</h1>
            </div>
          </header>

          <div className="flex-1 container max-w-5xl mx-auto p-8 space-y-12">
            <div className="flex flex-col md:flex-row justify-between items-end gap-6">
              <div className="space-y-2">
                <Badge className="bg-primary/10 text-primary border-primary/20 uppercase tracking-widest text-[8px]">Engenharia Neural Ativa</Badge>
                <h2 className="text-4xl font-black italic uppercase tracking-tighter text-white font-headline">Fábrica de Comandos</h2>
              </div>
              <div className="flex bg-white/5 p-1 rounded-xl border border-white/10">
                <button onClick={() => setComplexity('simple')} className={`px-4 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${complexity === 'simple' ? 'bg-white text-black' : 'text-muted-foreground'}`}>Simples</button>
                <button onClick={() => setComplexity('advanced')} className={`px-4 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${complexity === 'advanced' ? 'bg-primary text-white' : 'text-muted-foreground'}`}>Avançado</button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              <div className="lg:col-span-4 space-y-4">
                {PROMPT_TEMPLATES.map((t) => (
                  <button key={t.id} onClick={() => { setActiveTemplate(t); setGeneratedPrompt(''); setFormData({}); }} className={`w-full p-4 rounded-2xl border text-left transition-all ${activeTemplate.id === t.id ? 'bg-primary/10 border-primary text-white shadow-xl shadow-primary/10' : 'bg-white/[0.02] border-white/5 text-muted-foreground hover:bg-white/5'}`}>
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${activeTemplate.id === t.id ? 'bg-primary text-white' : 'bg-white/5'}`}>{t.icon}</div>
                      <div><span className="text-xs font-black uppercase italic block">{t.title}</span><p className="text-[8px] font-medium opacity-50">{t.description}</p></div>
                    </div>
                  </button>
                ))}
              </div>

              <div className="lg:col-span-8 space-y-8">
                <Card className="glass-card border-white/10 rounded-[2.5rem] bg-[#0e0e1a]">
                  <CardHeader className="border-b border-white/5 p-8"><CardTitle className="text-xs font-black uppercase tracking-widest italic flex items-center gap-2"><Settings2 className="h-4 w-4 text-primary" /> Parâmetros de Comando</CardTitle></CardHeader>
                  <CardContent className="p-10 space-y-8">
                    <div className="space-y-6">
                      <div className="space-y-3">
                        <Label className="text-[10px] font-black uppercase tracking-widest opacity-50">O que você vende?</Label>
                        <Input placeholder="Ex: Consultoria de Vendas" className="bg-white/5 border-white/10 h-14 rounded-2xl" value={formData.product || ''} onChange={(e) => setFormData({...formData, product: e.target.value})} />
                      </div>
                      {activeTemplate.id === 'sites' && (
                        <div className="space-y-6">
                          <div className="space-y-3">
                            <Label className="text-[10px] font-black uppercase tracking-widest opacity-50">Nicho do Negócio</Label>
                            <Select onValueChange={(v) => setFormData({...formData, niche: v})} value={formData.niche}>
                              <SelectTrigger className="bg-white/5 border-white/10 h-14 rounded-2xl"><SelectValue placeholder="Selecione..." /></SelectTrigger>
                              <SelectContent className="bg-[#0e0e1a] border-white/10">{NICHE_OPTIONS.map(o => <SelectItem key={o} value={o} className="text-xs">{o}</SelectItem>)}</SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-3">
                            <Label className="text-[10px] font-black uppercase tracking-widest opacity-50">Seções do Site</Label>
                            <div className="flex flex-wrap gap-2">{SECTION_OPTIONS.map(o => (
                              <button key={o} onClick={() => {
                                const curr = formData.sections || [];
                                setFormData({...formData, sections: curr.includes(o) ? curr.filter((v:any) => v !== o) : [...curr, o]});
                              }} className={`px-4 py-2 rounded-xl text-[9px] font-black uppercase border transition-all ${formData.sections?.includes(o) ? 'bg-primary/20 border-primary text-white' : 'bg-white/5 border-white/10 text-muted-foreground'}`}>{o}</button>
                            ))}</div>
                          </div>
                        </div>
                      )}
                    </div>
                    <Button onClick={handleGenerate} disabled={isLoading || !formData.product} className="w-full h-20 bg-primary hover:bg-primary/90 rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl shadow-primary/20 transition-all active:scale-95">
                      {isLoading ? <Loader2 className="h-6 w-6 animate-spin" /> : <><Zap className="h-5 w-5 mr-2 fill-white" /> ATIVAR ENGENHARIA</>}
                    </Button>
                  </CardContent>
                </Card>

                {generatedPrompt && (
                  <Card className="glass-card border-primary/30 rounded-[2.5rem] bg-[#0b0b14] animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <CardHeader className="border-b border-white/5 p-8 flex flex-row items-center justify-between">
                      <div className="flex items-center gap-3"><ShieldCheck className="h-5 w-5 text-green-500" /><span className="text-xs font-black uppercase italic">Comando Neural Gerado</span></div>
                      <Button size="sm" variant="outline" onClick={handleCopy} className="h-10 rounded-xl font-black uppercase text-[10px]">{copied ? 'COPIADO' : 'COPIAR'}</Button>
                    </CardHeader>
                    <CardContent className="p-10">
                      <pre className="bg-black/40 p-8 rounded-2xl border border-white/5 text-sm font-medium italic whitespace-pre-wrap leading-relaxed text-white/90">{generatedPrompt}</pre>
                      <DevicePreview type={activeTemplate.title} formData={formData} />
                      <div className="mt-10 space-y-4">
                        <p className="text-[10px] font-black uppercase tracking-widest text-primary/60">Onde usar este comando?</p>
                        <div className="grid grid-cols-2 gap-4">
                          {(SUGGESTED_TOOLS[activeTemplate.id] || []).map((t, i) => (
                            <Card key={i} className="glass-card p-6 flex items-center justify-between border-white/5 rounded-2xl">
                              <span className="text-sm font-black italic text-white uppercase">{t.name}</span>
                              <Button asChild variant="ghost" size="sm" className="h-10 rounded-xl text-primary font-black uppercase text-[9px]">
                                <a href={t.url} target="_blank" rel="noopener noreferrer">ABRIR <ExternalLink className="ml-2 h-3 w-3" /></a>
                              </Button>
                            </Card>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
