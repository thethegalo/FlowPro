
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
  Rocket
} from 'lucide-react';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from '@/components/AppSidebar';
import { useToast } from '@/hooks/use-toast';

const SEGMENTS = [
  "Restaurante", "Clinica", "Academia", "Advocacia", 
  "E-commerce", "Salão de Beleza", "Consultório", "Imobiliária"
];

const STYLES = [
  { id: 'Moderno', desc: 'Bordas arredondadas e sombras suaves' },
  { id: 'Minimalista', desc: 'Foco no respiro e tipografia limpa' },
  { id: 'Ousado', desc: 'Cores fortes e contrastes intensos' },
  { id: 'Elegante', desc: 'Estilo clássico e cores sóbrias' }
];

export default function PromptsPage() {
  const [formData, setFormData] = useState({
    businessName: '',
    segment: '',
    targetAudience: '',
    primaryColor: '#7c3aff',
    style: 'Moderno',
    objective: ''
  });

  const [generatedPrompt, setGeneratedPrompt] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const { toast } = useToast();

  const generatePrompt = () => {
    const prompt = `Atue como um Web Designer Sênior e Especialista em Conversão.
Crie um site de alta performance para a empresa "${formData.businessName}", que atua no segmento de ${formData.segment}.

REQUISITOS VISUAIS:
- Estilo: ${formData.style}
- Paleta de Cores: Foco em ${formData.primaryColor}
- Público-alvo: ${formData.targetAudience}

ESTRUTURA DA PÁGINA:
1. Hero Section: Headline matadora focada em "${formData.objective}".
2. Prova Social: Seção para depoimentos e logos.
3. Benefícios: 3 colunas destacando os diferenciais.
4. CTA: Botão de ação principal em destaque com a cor ${formData.primaryColor}.

TECNOLOGIAS:
Use Next.js, Tailwind CSS, Shadcn UI e Lucide Icons. O código deve ser limpo, responsivo e acessível.`;
    
    setGeneratedPrompt(prompt);
    toast({ title: "Prompt Gerado!", description: "O comando neural está pronto para uso." });
  };

  const copyPrompt = () => {
    navigator.clipboard.writeText(generatedPrompt);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
    toast({ title: "Copiado!", description: "Prompt pronto para colar na sua IA favorita." });
  };

  const copyHTML = () => {
    const html = `<div class="min-h-screen bg-black text-white font-sans">
  <header class="p-6 flex justify-between items-center border-b border-white/10">
    <div class="text-xl font-bold">${formData.businessName}</div>
    <nav class="space-x-6 hidden md:block">
      <a href="#" class="hover:opacity-70">Home</a>
      <a href="#" class="hover:opacity-70">Serviços</a>
      <a href="#" class="hover:opacity-70">Contato</a>
    </nav>
    <button style="background-color: ${formData.primaryColor}" class="px-6 py-2 rounded-full font-bold">Contato</button>
  </header>
  <main class="py-20 px-6 text-center max-w-4xl mx-auto">
    <h1 class="text-5xl md:text-7xl font-extrabold mb-6 leading-tight">${formData.objective || 'Transforme seu Negócio'}</h1>
    <p class="text-xl opacity-60 mb-10">Soluções personalizadas para ${formData.segment} focadas em resultado.</p>
    <div class="flex flex-col sm:flex-row gap-4 justify-center">
      <button style="background-color: ${formData.primaryColor}" class="px-10 py-4 rounded-xl text-lg font-bold">Começar Agora</button>
      <button class="px-10 py-4 rounded-xl text-lg font-bold border border-white/20 hover:bg-white/5">Saiba Mais</button>
    </div>
  </main>
</div>`;
    navigator.clipboard.writeText(html);
    toast({ title: "HTML Copiado!", description: "Estrutura básica enviada para o seu clipboard." });
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-[#0a0a0f]">
        <AppSidebar />
        
        <main className="flex-1 flex flex-col min-w-0">
          <header className="h-16 border-b border-white/5 flex items-center justify-between px-6 bg-[#0a0a0f]/80 backdrop-blur-md sticky top-0 z-50">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="text-muted-foreground hover:text-white" />
              <div className="h-4 w-px bg-white/10 hidden md:block" />
              <h1 className="text-sm font-black italic uppercase tracking-widest flex items-center gap-2">
                <Layout className="h-4 w-4 text-primary" /> Fábrica de Sites Premium
              </h1>
            </div>
            <Badge variant="outline" className="bg-primary/10 border-primary/30 text-primary text-[8px] font-black uppercase px-3 py-1">
              Neural Engine v2.0
            </Badge>
          </header>

          <div className="flex-1 container max-w-6xl mx-auto p-4 md:p-8 space-y-8 pb-32">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Coluna do Formulário */}
              <div className="lg:col-span-5 space-y-6">
                <Card className="glass-card border-white/10 rounded-[2rem] bg-white/[0.02] overflow-hidden">
                  <CardHeader className="border-b border-white/5 bg-white/[0.02] p-6">
                    <CardTitle className="text-xs font-black uppercase tracking-widest italic flex items-center gap-2">
                      <Zap className="h-4 w-4 text-primary" /> Parâmetros de Design
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 space-y-5">
                    <div className="space-y-2">
                      <Label className="text-[10px] font-black uppercase tracking-widest opacity-50">Nome do Negócio</Label>
                      <Input 
                        placeholder="Ex: Prime Advocacia" 
                        className="bg-white/5 border-white/10 h-12 rounded-xl"
                        value={formData.businessName}
                        onChange={(e) => setFormData({...formData, businessName: e.target.value})}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-[10px] font-black uppercase tracking-widest opacity-50">Segmento</Label>
                      <Select onValueChange={(v) => setFormData({...formData, segment: v})}>
                        <SelectTrigger className="bg-white/5 border-white/10 h-12 rounded-xl">
                          <SelectValue placeholder="Selecione o nicho" />
                        </SelectTrigger>
                        <SelectContent className="bg-[#0a0a0f] border-white/10 text-white">
                          {SEGMENTS.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-[10px] font-black uppercase tracking-widest opacity-50">Objetivo Principal</Label>
                      <Input 
                        placeholder="Ex: Captar agendamentos pelo WhatsApp" 
                        className="bg-white/5 border-white/10 h-12 rounded-xl"
                        value={formData.objective}
                        onChange={(e) => setFormData({...formData, objective: e.target.value})}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-[10px] font-black uppercase tracking-widest opacity-50">Cor Principal</Label>
                        <div className="flex gap-2">
                          <div className="h-12 w-12 rounded-xl border border-white/10 overflow-hidden relative">
                            <input 
                              type="color" 
                              className="absolute inset-0 w-full h-full scale-150 cursor-pointer bg-transparent"
                              value={formData.primaryColor}
                              onChange={(e) => setFormData({...formData, primaryColor: e.target.value})}
                            />
                          </div>
                          <Input 
                            value={formData.primaryColor}
                            onChange={(e) => setFormData({...formData, primaryColor: e.target.value})}
                            className="flex-1 bg-white/5 border-white/10 h-12 rounded-xl font-mono text-xs"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-[10px] font-black uppercase tracking-widest opacity-50">Estilo Visual</Label>
                        <Select onValueChange={(v) => setFormData({...formData, style: v})} defaultValue="Moderno">
                          <SelectTrigger className="bg-white/5 border-white/10 h-12 rounded-xl">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-[#0a0a0f] border-white/10 text-white">
                            {STYLES.map(s => <SelectItem key={s.id} value={s.id}>{s.id}</SelectItem>)}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-[10px] font-black uppercase tracking-widest opacity-50">Público-Alvo</Label>
                      <Textarea 
                        placeholder="Ex: Empresários de 30-50 anos que buscam luxo..." 
                        className="bg-white/5 border-white/10 rounded-xl min-h-[80px] resize-none"
                        value={formData.targetAudience}
                        onChange={(e) => setFormData({...formData, targetAudience: e.target.value})}
                      />
                    </div>

                    <Button 
                      onClick={generatePrompt}
                      className="w-full h-14 bg-primary hover:bg-primary/90 text-white rounded-xl font-black uppercase tracking-widest shadow-xl shadow-primary/20 transition-all active:scale-95 group"
                    >
                      GERAR PROMPT MESTRE <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Coluna de Preview e Prompt */}
              <div className="lg:col-span-7 space-y-8">
                
                {/* LIVE PREVIEW */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between px-2">
                    <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40 flex items-center gap-2">
                      <Eye className="h-3 w-3" /> Live Architecture Preview
                    </h3>
                    <div className="flex gap-2">
                      <div className="h-2 w-2 rounded-full bg-red-500/50" />
                      <div className="h-2 w-2 rounded-full bg-yellow-500/50" />
                      <div className="h-2 w-2 rounded-full bg-green-500/50" />
                    </div>
                  </div>
                  
                  <div className={`w-full bg-[#050508] border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl transition-all duration-500 ${formData.style === 'Minimalista' ? 'rounded-none' : ''}`}>
                    {/* Header Preview */}
                    <div className="p-4 border-b border-white/5 flex justify-between items-center bg-white/[0.02]">
                      <div className="font-black text-[10px] italic tracking-tight uppercase">
                        {formData.businessName || 'Nome da Marca'}
                      </div>
                      <div className="flex gap-3">
                        <div className="h-1.5 w-8 rounded-full bg-white/10" />
                        <div className="h-1.5 w-8 rounded-full bg-white/10" />
                        <div className="h-1.5 w-12 rounded-full" style={{ backgroundColor: formData.primaryColor }} />
                      </div>
                    </div>
                    
                    {/* Hero Preview */}
                    <div className="p-12 text-center space-y-6">
                      <div className="space-y-3">
                        <div className="h-2 w-24 rounded-full bg-white/5 mx-auto" />
                        <h4 className="text-2xl font-black italic uppercase leading-none tracking-tighter">
                          {formData.objective || 'Sua Próxima Grande Conquista'}
                        </h4>
                        <div className="h-1.5 w-48 rounded-full bg-white/5 mx-auto" />
                      </div>
                      
                      <div className="flex justify-center gap-3">
                        <div className="h-10 w-32 rounded-lg shadow-lg" style={{ backgroundColor: formData.primaryColor }} />
                        <div className="h-10 w-32 rounded-lg border border-white/10 bg-white/5" />
                      </div>
                    </div>

                    {/* Features Preview */}
                    <div className="grid grid-cols-3 gap-4 p-8 bg-white/[0.01]">
                      {[1,2,3].map(i => (
                        <div key={i} className="space-y-2 p-4 border border-white/5 rounded-xl bg-white/[0.02]">
                          <div className="h-6 w-6 rounded-lg bg-white/5 flex items-center justify-center">
                            <Zap className="h-3 w-3" style={{ color: formData.primaryColor }} />
                          </div>
                          <div className="h-1.5 w-full rounded-full bg-white/10" />
                          <div className="h-1 w-2/3 rounded-full bg-white/5" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* PROMPT OUTPUT */}
                {generatedPrompt && (
                  <Card className="glass-card border-primary/30 rounded-[2.5rem] bg-[#0b0b14] animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <CardHeader className="border-b border-white/5 p-8 flex flex-row items-center justify-between">
                      <div className="space-y-1">
                        <CardTitle className="text-sm font-black uppercase italic tracking-widest text-primary flex items-center gap-2">
                          <Rocket className="h-4 w-4" /> Comando Estruturado
                        </CardTitle>
                        <CardDescription className="text-[10px] uppercase font-bold tracking-widest opacity-50">
                          Pronto para Lovable, Bolt ou v0
                        </CardDescription>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={copyHTML} className="h-10 rounded-xl font-black uppercase text-[10px] border-white/10 gap-2">
                          <Code2 className="h-4 w-4" /> HTML
                        </Button>
                        <Button variant="outline" size="sm" onClick={copyPrompt} className="h-10 rounded-xl font-black uppercase text-[10px] border-white/10 gap-2">
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
