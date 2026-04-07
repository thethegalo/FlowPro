
"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Layout, 
  Sparkles, 
  Copy, 
  Code2, 
  Monitor, 
  Smartphone, 
  Zap, 
  Palette,
  Target,
  ArrowRight,
  Check,
  Eye,
  Rocket,
  RotateCcw,
  MousePointerClick,
  Plus,
  X
} from 'lucide-react';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from '@/components/AppSidebar';
import { useToast } from '@/hooks/use-toast';

const NICHE_OPTIONS = [
  "Educação/Cursos", "Saúde & Bem-estar", "Moda & Beleza", "Tecnologia/SaaS", 
  "Finanças", "Gastronomia", "Esporte/Fitness", "E-commerce", 
  "Imóveis", "Marketing/Agências", "Jurídico", "Outro"
];

const OBJECTIVES = ["Capturar Leads", "Vender Direto", "Agendar Consulta", "Mostrar Portfólio", "Divulgar Evento"];
const STYLES = ["Minimalista", "Moderno", "Corporativo", "Futurista", "Elegante", "Bold", "Natural"];
const COLOR_SWATCHES = ["#7c3aff", "#3b82f6", "#10b981", "#ef4444", "#f59e0b", "#ec4899", "#06b6d4", "#ffffff"];
const TONES = [
  { label: "Profissional", emoji: "👔" },
  { label: "Dinâmico", emoji: "⚡" },
  { label: "Empático", emoji: "🤝" },
  { label: "Luxuoso", emoji: "💎" },
  { label: "Descontraído", emoji: "🎯" },
  { label: "Urgente", emoji: "🔥" }
];
const SECTION_OPTIONS = ["Hero", "Benefícios", "Depoimentos", "Preços", "FAQ", "CTA Final", "Sobre", "Portfólio", "Contato", "Vídeo"];

export default function PromptsPage() {
  const [formData, setFormData] = useState({
    businessName: '',
    niche: '',
    objective: 'Capturar Leads',
    visualStyle: 'Moderno',
    colors: ['#7c3aff'],
    targetAudience: '',
    tone: 'Profissional',
    sections: ['Hero', 'Benefícios', 'CTA Final'],
    differential: '',
    extras: ''
  });

  const [customColor, setCustomColor] = useState('#7c3aff');
  const [generatedPrompt, setGeneratedPrompt] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'mobile'>('desktop');
  const { toast } = useToast();

  const primaryColor = formData.colors[0] || '#7c3aff';

  const toggleSection = (section: string) => {
    setFormData(prev => ({
      ...prev,
      sections: prev.sections.includes(section) 
        ? prev.sections.filter(s => s !== section)
        : [...prev.sections, section]
    }));
  };

  const toggleColor = (color: string) => {
    setFormData(prev => {
      const exists = prev.colors.includes(color);
      if (exists) {
        if (prev.colors.length === 1) return prev;
        return { ...prev, colors: prev.colors.filter(c => c !== color) };
      } else {
        if (prev.colors.length >= 5) {
          toast({ variant: "destructive", title: "Limite atingido", description: "Máximo de 5 cores selecionadas." });
          return prev;
        }
        return { ...prev, colors: [...prev.colors, color] };
      }
    });
  };

  const addCustomColor = () => {
    if (formData.colors.length >= 5) {
      toast({ variant: "destructive", title: "Limite atingido", description: "Máximo de 5 cores selecionadas." });
      return;
    }
    if (formData.colors.includes(customColor)) return;
    setFormData(prev => ({ ...prev, colors: [...prev.colors, customColor] }));
  };

  const removeColor = (color: string) => {
    if (formData.colors.length === 1) return;
    setFormData(prev => ({ ...prev, colors: prev.colors.filter(c => c !== color) }));
  };

  const generatePrompt = () => {
    const prompt = `Atue como um Engenheiro de Prompts Sênior e Especialista em Web Design de Alta Conversão.
Gere uma estrutura completa de Landing Page para a empresa "${formData.businessName}", que atua no nicho de ${formData.niche}.

DADOS ESTRATÉGICOS:
- Objetivo Principal: ${formData.objective}
- Público-Alvo: ${formData.targetAudience || 'Não especificado'}
- Tom de Voz: ${formData.tone}
- Diferencial: ${formData.differential || 'Foco em qualidade e velocidade'}

DIRETRIZES VISUAIS:
- Estilo: ${formData.visualStyle}
- Paleta de Cores: ${formData.colors.join(', ')}
- Requisitos: Design responsivo, moderno e focado em UX.

ESTRUTURA DE SEÇÕES (ORDEM):
${formData.sections.map((s, i) => `${i + 1}. ${s}`).join('\n')}

TECNOLOGIAS:
Desenvolva utilizando Next.js 15, React, Tailwind CSS, Shadcn UI e Lucide Icons. O código deve ser limpo, modular e otimizado para SEO.

INFORMAÇÕES ADICIONAIS:
${formData.extras || 'Sem observações extras.'}

Gere o comando final estruturado para Lovable/Bolt/v0.`;
    
    setGeneratedPrompt(prompt);
    toast({ title: "Prompt Gerado!", description: "Comando neural pronto para o campo de batalha." });
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    if (label === 'Prompt') {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
    toast({ title: `${label} Copiado!`, description: "Já pode colar no seu destino." });
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-[#0a0a0f] relative overflow-x-hidden">
        <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-accent/5 rounded-full blur-[120px]"></div>
        </div>

        <AppSidebar />
        
        <main className="flex-1 flex flex-col min-w-0 relative z-10">
          <header className="h-16 border-b border-white/5 flex items-center justify-between px-6 bg-[#0a0a0f]/80 backdrop-blur-md sticky top-0 z-50">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="text-muted-foreground hover:text-white" />
              <div className="h-4 w-px bg-white/10 hidden md:block" />
              <h1 className="text-sm font-black italic uppercase tracking-widest flex items-center gap-2">
                <Layout className="h-4 w-4 text-primary" /> Fábrica de Sites Elite
              </h1>
            </div>
            <Badge variant="outline" className="bg-primary/10 border-primary/30 text-primary text-[8px] font-black uppercase px-3 py-1">
              Neural Engine v3.0
            </Badge>
          </header>

          <div className="flex-1 container max-w-7xl mx-auto p-4 md:p-8 space-y-8 pb-32">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              <div className="lg:col-span-5 space-y-6">
                <Card className="glass-card border-white/10 rounded-[2rem] bg-white/[0.02] overflow-hidden">
                  <CardHeader className="border-b border-white/5 bg-white/[0.02] p-6">
                    <CardTitle className="text-xs font-black uppercase tracking-widest italic flex items-center gap-2">
                      <Rocket className="h-4 w-4 text-primary" /> Parâmetros de Lançamento
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 space-y-6">
                    <div className="space-y-2">
                      <Label className="text-[10px] font-black uppercase tracking-widest opacity-50">O que você vende?</Label>
                      <Input 
                        placeholder="Ex: Consultoria de Tráfego Pago" 
                        className="bg-white/5 border-white/10 h-12 rounded-xl focus-visible:ring-primary input-glow"
                        value={formData.businessName}
                        onChange={(e) => setFormData({...formData, businessName: e.target.value})}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-[10px] font-black uppercase tracking-widest opacity-50">Nicho do Negócio</Label>
                      <Select onValueChange={(v) => setFormData({...formData, niche: v})}>
                        <SelectTrigger className="bg-white/5 border-white/10 h-12 rounded-xl">
                          <SelectValue placeholder="Selecione o nicho" />
                        </SelectTrigger>
                        <SelectContent className="bg-[#0a0a0f] border-white/10 text-white">
                          {NICHE_OPTIONS.map(n => <SelectItem key={n} value={n}>{n}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-[10px] font-black uppercase tracking-widest opacity-50">Objetivo da Página</Label>
                      <div className="flex flex-wrap gap-2">
                        {OBJECTIVES.map(obj => (
                          <button
                            key={obj}
                            onClick={() => setFormData({...formData, objective: obj})}
                            className={`px-3 py-2 rounded-lg text-[9px] font-black uppercase transition-all border ${
                              formData.objective === obj 
                              ? 'bg-primary/20 border-primary text-primary' 
                              : 'bg-white/5 border-white/5 text-muted-foreground hover:bg-white/10'
                            }`}
                          >
                            {obj}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-[10px] font-black uppercase tracking-widest opacity-50">Estilo Visual</Label>
                      <div className="flex flex-wrap gap-2">
                        {STYLES.map(style => (
                          <button
                            key={style}
                            onClick={() => setFormData({...formData, visualStyle: style})}
                            className={`px-3 py-2 rounded-lg text-[9px] font-black uppercase transition-all border ${
                              formData.visualStyle === style 
                              ? 'bg-accent/20 border-accent text-accent' 
                              : 'bg-white/5 border-white/5 text-muted-foreground hover:bg-white/10'
                            }`}
                          >
                            {style}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Label className="text-[10px] font-black uppercase tracking-widest opacity-50">Paleta de Cores (Máx 5)</Label>
                        <Badge variant="outline" className="text-[8px] opacity-50">{formData.colors.length}/5</Badge>
                      </div>
                      
                      <div className="flex flex-wrap items-center gap-2">
                        {COLOR_SWATCHES.map(color => {
                          const isSelected = formData.colors.includes(color);
                          return (
                            <button
                              key={color}
                              onClick={() => toggleColor(color)}
                              className={`h-8 w-8 rounded-full border-2 transition-all flex items-center justify-center relative overflow-hidden ${
                                isSelected ? 'border-white scale-110 shadow-[0_0_15px_rgba(255,255,255,0.3)]' : 'border-transparent opacity-60 hover:opacity-100'
                              }`}
                              style={{ backgroundColor: color }}
                            >
                              {isSelected && <Check className={`h-3 w-3 ${color === '#ffffff' ? 'text-black' : 'text-white'}`} />}
                            </button>
                          );
                        })}
                        
                        <div className="flex items-center gap-1 ml-auto">
                          <Input 
                            type="color"
                            value={customColor}
                            onChange={(e) => setCustomColor(e.target.value)}
                            className="w-10 h-10 p-1 bg-white/5 border-white/10 rounded-lg cursor-pointer"
                          />
                          <Button 
                            variant="outline" 
                            size="icon" 
                            onClick={addCustomColor}
                            className="h-10 w-10 border-white/10 hover:bg-white/5"
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 min-h-[32px] pt-2">
                        {formData.colors.map(color => (
                          <Badge 
                            key={color} 
                            variant="secondary"
                            className="pl-2 pr-1 py-1 gap-1 border-white/10 bg-white/5 group hover:bg-white/10 transition-colors"
                          >
                            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
                            <span className="text-[9px] font-mono uppercase">{color}</span>
                            <button 
                              onClick={() => removeColor(color)}
                              className="p-0.5 hover:bg-white/10 rounded-full transition-colors"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-[10px] font-black uppercase tracking-widest opacity-50">Público-Alvo</Label>
                      <Input 
                        placeholder="Ex: Donos de agências que faturam +10k" 
                        className="bg-white/5 border-white/10 h-12 rounded-xl focus-visible:ring-primary"
                        value={formData.targetAudience}
                        onChange={(e) => setFormData({...formData, targetAudience: e.target.value})}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-[10px] font-black uppercase tracking-widest opacity-50">Tom de Voz</Label>
                      <div className="grid grid-cols-3 gap-2">
                        {TONES.map(tone => (
                          <button
                            key={tone.label}
                            onClick={() => setFormData({...formData, tone: tone.label})}
                            className={`p-2 rounded-xl border flex flex-col items-center gap-1 transition-all ${
                              formData.tone === tone.label 
                              ? 'bg-primary/10 border-primary text-white' 
                              : 'bg-white/5 border-white/5 text-muted-foreground opacity-60'
                            }`}
                          >
                            <span className="text-sm">{tone.emoji}</span>
                            <span className="text-[8px] font-black uppercase tracking-tighter">{tone.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-[10px] font-black uppercase tracking-widest opacity-50">Seções do Site (Múltiplo)</Label>
                      <div className="flex flex-wrap gap-2">
                        {SECTION_OPTIONS.map(sec => (
                          <button
                            key={sec}
                            onClick={() => toggleSection(sec)}
                            className={`px-3 py-2 rounded-lg text-[9px] font-black uppercase transition-all border ${
                              formData.sections.includes(sec) 
                              ? 'bg-green-500/20 border-green-500 text-green-400' 
                              : 'bg-white/5 border-white/5 text-muted-foreground opacity-50 hover:opacity-100'
                            }`}
                          >
                            {sec}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-[10px] font-black uppercase tracking-widest opacity-50">Diferencial da Marca</Label>
                      <Input 
                        placeholder="Ex: Atendimento 24h e Suporte VIP" 
                        className="bg-white/5 border-white/10 h-12 rounded-xl"
                        value={formData.differential}
                        onChange={(e) => setFormData({...formData, differential: e.target.value})}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-[10px] font-black uppercase tracking-widest opacity-50">Informações Extras</Label>
                      <Textarea 
                        placeholder="Dê mais contexto para a IA..." 
                        className="bg-white/5 border-white/10 rounded-xl min-h-[100px] resize-none"
                        value={formData.extras}
                        onChange={(e) => setFormData({...formData, extras: e.target.value})}
                      />
                    </div>

                    <Button 
                      onClick={generatePrompt}
                      className="w-full h-16 bg-primary hover:bg-primary/90 text-white rounded-2xl font-black uppercase tracking-[0.2em] shadow-[0_10px_30px_rgba(124,58,255,0.3)] transition-all active:scale-95 group"
                    >
                      ATIVAR ENGENHARIA ⚡
                    </Button>
                  </CardContent>
                </Card>
              </div>

              <div className="lg:col-span-7 space-y-8">
                
                <Card className="glass-card border-white/10 rounded-[2.5rem] bg-[#0b0b14] overflow-hidden flex flex-col h-fit">
                  <CardHeader className="border-b border-white/5 p-6 flex flex-row items-center justify-between">
                    <div className="space-y-1">
                      <CardTitle className="text-sm font-black uppercase italic tracking-widest text-primary flex items-center gap-2">
                        <Eye className="h-4 w-4" /> Mockup Neural
                      </CardTitle>
                      <CardDescription className="text-[9px] uppercase font-bold tracking-widest opacity-50">Visualização de Arquitetura</CardDescription>
                    </div>
                    <div className="flex bg-white/5 p-1 rounded-xl">
                      <button 
                        onClick={() => setPreviewDevice('desktop')}
                        className={`p-2 rounded-lg transition-all ${previewDevice === 'desktop' ? 'bg-primary text-white shadow-lg' : 'text-muted-foreground hover:text-white'}`}
                      >
                        <Monitor className="h-4 w-4" />
                      </button>
                      <button 
                        onClick={() => setPreviewDevice('mobile')}
                        className={`p-2 rounded-lg transition-all ${previewDevice === 'mobile' ? 'bg-primary text-white shadow-lg' : 'text-muted-foreground hover:text-white'}`}
                      >
                        <Smartphone className="h-4 w-4" />
                      </button>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="p-10 flex items-center justify-center min-h-[500px]">
                    <div className={`relative transition-all duration-700 ease-in-out ${previewDevice === 'desktop' ? 'w-full max-w-[550px]' : 'w-[280px]'}`}>
                      
                      {previewDevice === 'desktop' && (
                        <div className="w-full h-[350px] bg-black border-[12px] border-zinc-800 rounded-3xl shadow-2xl relative overflow-hidden flex flex-col">
                          <div className="h-6 bg-zinc-900 border-b border-white/5 flex items-center px-3 gap-1.5">
                            <div className="h-2 w-2 rounded-full bg-red-500/50" />
                            <div className="h-2 w-2 rounded-full bg-yellow-500/50" />
                            <div className="h-2 w-2 rounded-full bg-green-500/50" />
                          </div>
                          <div className="h-1.5 w-full flex">
                            {formData.colors.map((c, i) => (
                              <div key={i} className="flex-1 h-full" style={{ backgroundColor: c }} />
                            ))}
                          </div>
                          <div className="flex-1 overflow-y-auto no-scrollbar" style={{ backgroundColor: primaryColor === '#ffffff' ? '#f0f0f0' : '#050508' }}>
                            <div className="p-4 space-y-4">
                              {formData.sections.map((sec, idx) => (
                                <div 
                                  key={idx} 
                                  className={`rounded-xl flex items-center justify-center text-[10px] font-black uppercase tracking-widest border transition-all duration-500`}
                                  style={{ 
                                    height: sec === 'Hero' ? '120px' : '60px',
                                    backgroundColor: `${primaryColor}${sec === 'Hero' ? '20' : '10'}`,
                                    borderColor: `${primaryColor}30`,
                                    color: primaryColor,
                                    padding: formData.visualStyle === 'Minimalista' ? '10px' : '20px',
                                    borderWidth: formData.visualStyle === 'Bold' ? '3px' : '1px'
                                  }}
                                >
                                  {sec}
                                </div>
                              ))}
                            </div>
                          </div>
                          <div className="absolute bottom-[-24px] left-1/2 -translate-x-1/2 w-[120%] h-3 bg-zinc-700 rounded-full" />
                        </div>
                      )}

                      {previewDevice === 'mobile' && (
                        <div className="w-full h-[480px] bg-black border-[10px] border-zinc-800 rounded-[3rem] shadow-2xl relative overflow-hidden flex flex-col">
                          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-5 bg-zinc-800 rounded-b-xl z-20" />
                          <div className="h-1.5 w-full flex mt-5 relative z-10">
                            {formData.colors.map((c, i) => (
                              <div key={i} className="flex-1 h-full" style={{ backgroundColor: c }} />
                            ))}
                          </div>
                          <div className="flex-1 overflow-y-auto no-scrollbar p-4 space-y-4" style={{ backgroundColor: primaryColor === '#ffffff' ? '#f0f0f0' : '#050508' }}>
                            {formData.sections.map((sec, idx) => (
                              <div 
                                key={idx} 
                                className={`rounded-2xl flex items-center justify-center text-[8px] font-black uppercase tracking-widest border transition-all duration-500`}
                                style={{ 
                                  height: sec === 'Hero' ? '100px' : '50px',
                                  backgroundColor: `${primaryColor}${sec === 'Hero' ? '20' : '10'}`,
                                  borderColor: `${primaryColor}30`,
                                  color: primaryColor,
                                  borderWidth: formData.visualStyle === 'Bold' ? '3px' : '1px'
                                }}
                              >
                                {sec}
                              </div>
                            ))}
                          </div>
                          <div className="h-6 bg-zinc-900 border-t border-white/5 flex items-center justify-center">
                            <div className="h-1 w-16 bg-white/20 rounded-full" />
                          </div>
                        </div>
                      )}

                      <div className="absolute inset-0 border-2 border-dashed border-primary/20 rounded-[3rem] -m-6 pointer-events-none animate-pulse" />
                    </div>
                  </CardContent>
                </Card>

                {generatedPrompt && (
                  <Card className="glass-card border-primary/30 rounded-[2.5rem] bg-[#0b0b14] animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <CardHeader className="border-b border-white/5 p-8 flex flex-row items-center justify-between">
                      <div className="space-y-1">
                        <CardTitle className="text-sm font-black uppercase italic tracking-widest text-primary flex items-center gap-2">
                          <Rocket className="h-4 w-4" /> Comando Estruturado
                        </CardTitle>
                        <CardDescription className="text-[10px] uppercase font-bold tracking-widest opacity-50">Pronto para Lovable ou v0</CardDescription>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => copyToClipboard('<div class="...">...</div>', 'HTML')} className="h-10 rounded-xl font-black uppercase text-[10px] border-white/10 gap-2 hover:bg-white/5">
                          <Code2 className="h-4 w-4" /> HTML
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => copyToClipboard(generatedPrompt, 'Prompt')} className="h-10 rounded-xl font-black uppercase text-[10px] border-white/10 gap-2 hover:bg-white/5">
                          {isCopied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                          PROMPT
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="p-8">
                      <div className="bg-black/40 p-8 rounded-2xl border border-white/5 text-sm font-medium italic whitespace-pre-wrap leading-relaxed text-white/90 font-mono">
                        {generatedPrompt}
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
