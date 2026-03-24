
"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  Terminal, 
  Copy, 
  Check, 
  Zap, 
  MessageSquare, 
  Video, 
  Target, 
  Sparkles,
  RefreshCcw,
  Layout
} from 'lucide-react';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from '@/components/AppSidebar';
import { useToast } from '@/hooks/use-toast';

const PROMPT_TEMPLATES = [
  {
    id: 'outreach',
    title: 'Abordagem Irresistível',
    icon: <MessageSquare className="h-4 w-4" />,
    description: 'Para gerar mensagens de WhatsApp/Direct que convertem.',
    template: (data: any) => `Atue como um especialista em Cold Outreach e Psicologia de Vendas.
Gere uma mensagem de abordagem curta e altamente personalizada para um dono de negócio do nicho de ${data.niche || '[Nicho]'}.
O produto/serviço que estou oferecendo é: ${data.product || '[Produto/Serviço]'}.
O tom da mensagem deve ser ${data.tone || 'amigável e profissional'}.
FOCO: Começar com um elogio genuíno, citar um gargalo de mercado que ele provavelmente tem e terminar com uma pergunta aberta que desperte curiosidade.
LIMITE: Máximo 300 caracteres.`
  },
  {
    id: 'reels',
    title: 'Roteiro Viral (Reels/Shorts)',
    icon: <Video className="h-4 w-4" />,
    description: 'Para criar vídeos curtos que geram engajamento e vendas.',
    template: (data: any) => `Crie um roteiro de 30 segundos para um Reels/TikTok focado em vender ${data.product || '[Produto]'}.
PÚBLICO: ${data.target || '[Público Alvo]'}.
ESTRUTURA:
1. Gancho (0-3s): Uma frase que pare o scroll imediatamente.
2. Problema (3-10s): Exponha a dor do público de forma visual.
3. Solução/Benefício (10-25s): Como meu produto resolve isso rápido.
4. CTA (25-30s): Comando de ação claro (Ex: "Comente FLOW para saber mais").
Use uma linguagem ${data.tone || 'dinâmica e direta'}.`
  },
  {
    id: 'objection',
    title: 'Quebra de Objeções',
    icon: <Target className="h-4 w-4" />,
    description: 'Para quando o cliente diz "está caro" ou "vou pensar".',
    template: (data: any) => `Sou um vendedor oferecendo ${data.product || '[Produto]'} para um cliente que acabou de dizer a seguinte objeção: "${data.objection || 'Está muito caro para mim agora'}".
Gere 3 opções de respostas curtas para WhatsApp que usem o gatilho da inversão de risco e foquem no ROI (Retorno sobre Investimento).
Tom: ${data.tone || 'Confiante e empático'}.`
  },
  {
    id: 'content',
    title: 'Estratégia de Conteúdo',
    icon: <Layout className="h-4 w-4" />,
    description: 'Para planejar sua semana de posts focados em conversão.',
    template: (data: any) => `Crie um calendário de conteúdo para 5 dias no Instagram para o nicho de ${data.niche || '[Nicho]'}.
OBJETIVO: Vender ${data.product || '[Produto]'}.
Cada dia deve ter:
- Tema do Post
- Headline Irresistível
- Legenda focada em conversão
- Sugestão de imagem/vídeo
Foque em educar o público sobre o problema e posicionar meu produto como a única solução viável.`
  }
];

export default function PromptsPage() {
  const [activeTemplate, setActiveTemplate] = useState(PROMPT_TEMPLATES[0]);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [generatedPrompt, setGeneratedPrompt] = useState('');
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const handleGenerate = () => {
    const prompt = activeTemplate.template(formData);
    setGeneratedPrompt(prompt);
  };

  const handleCopy = () => {
    if (!generatedPrompt) return;
    navigator.clipboard.writeText(generatedPrompt);
    setCopied(true);
    toast({ title: "Prompt Copiado!", description: "Cole na sua IA favorita agora." });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-[#050508]">
        <AppSidebar />
        
        <main className="flex-1 flex flex-col min-w-0">
          <header className="h-16 border-b border-white/5 flex items-center justify-between px-6 bg-[#050508]/80 backdrop-blur-md sticky top-0 z-50">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="text-muted-foreground hover:text-white" />
              <div className="h-4 w-px bg-white/10 hidden md:block" />
              <h1 className="text-sm font-black italic uppercase tracking-widest flex items-center gap-2">
                <Terminal className="h-4 w-4 text-primary" /> Gerador de Prompts
              </h1>
            </div>
          </header>

          <div className="flex-1 container max-w-5xl mx-auto p-4 md:p-8 space-y-8">
            <div className="space-y-2">
              <h2 className="text-3xl font-black italic uppercase tracking-tighter text-white">Engenharia Neural</h2>
              <p className="text-muted-foreground text-sm uppercase font-bold tracking-widest">Transforme suas ideias em instruções de alta performance para IA.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Seleção de Templates */}
              <div className="lg:col-span-4 space-y-4">
                <div className="text-[10px] font-black uppercase tracking-widest text-primary/60 mb-2">Selecione o Modelo</div>
                <div className="grid gap-3">
                  {PROMPT_TEMPLATES.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => {
                        setActiveTemplate(t);
                        setGeneratedPrompt('');
                      }}
                      className={`p-4 rounded-2xl border text-left transition-all group ${
                        activeTemplate.id === t.id 
                        ? 'bg-primary/10 border-primary text-white shadow-[0_0_20px_rgba(139,92,246,0.1)]' 
                        : 'bg-white/[0.02] border-white/5 text-muted-foreground hover:bg-white/[0.05] hover:border-white/10'
                      }`}
                    >
                      <div className="flex items-center gap-3 mb-1">
                        <div className={`p-2 rounded-lg ${activeTemplate.id === t.id ? 'bg-primary text-white' : 'bg-white/5 text-muted-foreground group-hover:text-white transition-colors'}`}>
                          {t.icon}
                        </div>
                        <span className="text-xs font-black uppercase italic tracking-tight">{t.title}</span>
                      </div>
                      <p className="text-[10px] font-medium leading-relaxed opacity-60">{t.description}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Formulário de Variáveis */}
              <div className="lg:col-span-8 space-y-6">
                <Card className="glass-card border-white/10 rounded-[2rem] overflow-hidden">
                  <CardHeader className="bg-white/5 border-b border-white/5 p-6">
                    <CardTitle className="text-xs font-black uppercase tracking-widest italic flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-primary" /> Personalizar Instrução
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-8 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label className="text-[10px] font-black uppercase tracking-widest opacity-50">Seu Produto/Serviço</Label>
                        <Input 
                          placeholder="Ex: Consultoria de Vendas" 
                          className="bg-white/5 border-white/10 h-12 rounded-xl"
                          onChange={(e) => setFormData({...formData, product: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-[10px] font-black uppercase tracking-widest opacity-50">Nicho de Atuação</Label>
                        <Input 
                          placeholder="Ex: Dentistas, Academias" 
                          className="bg-white/5 border-white/10 h-12 rounded-xl"
                          onChange={(e) => setFormData({...formData, niche: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-[10px] font-black uppercase tracking-widest opacity-50">Tom de Voz</Label>
                        <Input 
                          placeholder="Ex: Agressivo, Educado, Descontraído" 
                          className="bg-white/5 border-white/10 h-12 rounded-xl"
                          onChange={(e) => setFormData({...formData, tone: e.target.value})}
                        />
                      </div>
                      {activeTemplate.id === 'reels' && (
                        <div className="space-y-2">
                          <Label className="text-[10px] font-black uppercase tracking-widest opacity-50">Público Alvo</Label>
                          <Input 
                            placeholder="Ex: Donos de negócio local" 
                            className="bg-white/5 border-white/10 h-12 rounded-xl"
                            onChange={(e) => setFormData({...formData, target: e.target.value})}
                          />
                        </div>
                      )}
                      {activeTemplate.id === 'objection' && (
                        <div className="space-y-2">
                          <Label className="text-[10px] font-black uppercase tracking-widest opacity-50">Objeção do Cliente</Label>
                          <Input 
                            placeholder="Ex: Não tenho dinheiro agora" 
                            className="bg-white/5 border-white/10 h-12 rounded-xl"
                            onChange={(e) => setFormData({...formData, objection: e.target.value})}
                          />
                        </div>
                      )}
                    </div>

                    <Button 
                      onClick={handleGenerate}
                      className="w-full h-14 bg-primary hover:bg-primary/90 rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-primary/20 transition-all active:scale-[0.98]"
                    >
                      MONTAR PROMPT AGORA <Zap className="ml-2 h-4 w-4 fill-white" />
                    </Button>
                  </CardContent>
                </Card>

                {/* Resultado */}
                {generatedPrompt && (
                  <Card className="bg-primary/5 border border-primary/20 rounded-[2rem] overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <CardHeader className="flex flex-row items-center justify-between p-6 border-b border-primary/10">
                      <div className="text-[10px] font-black uppercase tracking-widest text-primary">Prompt Gerado</div>
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        onClick={handleCopy}
                        className="text-[10px] font-black uppercase tracking-widest h-8 text-primary hover:bg-primary/10"
                      >
                        {copied ? <Check className="h-3 w-3 mr-2" /> : <Copy className="h-3 w-3 mr-2" />}
                        {copied ? 'COPIADO' : 'COPIAR TUDO'}
                      </Button>
                    </CardHeader>
                    <CardContent className="p-8">
                      <pre className="text-sm font-medium text-white/80 leading-relaxed whitespace-pre-wrap italic">
                        "{generatedPrompt}"
                      </pre>
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
