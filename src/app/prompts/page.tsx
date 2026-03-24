
"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { 
  Terminal, 
  Copy, 
  Check, 
  Zap, 
  MessageSquare, 
  Target, 
  Sparkles,
  Layout,
  Globe,
  Palette,
  History,
  Lightbulb,
  Search,
  Settings2,
  Loader2,
  ChevronRight,
  ShieldCheck,
  Cpu,
  ArrowRight,
  ExternalLink,
  MousePointerClick
} from 'lucide-react';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from '@/components/AppSidebar';
import { useToast } from '@/hooks/use-toast';
import { generateMasterPrompt } from '@/ai/flows/generate-master-prompt';

const PROMPT_TEMPLATES = [
  {
    id: 'custom',
    title: 'Prompt Customizado',
    icon: <Settings2 className="h-4 w-4" />,
    description: 'Crie um comando mestre para qualquer necessidade específica.',
    fields: ['niche', 'serviceType', 'goal', 'style'],
  },
  {
    id: 'sites',
    title: 'Estrutura de Site/LP',
    icon: <Globe className="h-4 w-4" />,
    description: 'Crie o roteiro completo de uma Landing Page que vende.',
    fields: ['product', 'niche', 'target'],
  },
  {
    id: 'logo',
    title: 'Criação de Logo/ID',
    icon: <Palette className="h-4 w-4" />,
    description: 'Gere instruções perfeitas para IAs de imagem.',
    fields: ['businessName', 'style', 'colors'],
  },
  {
    id: 'outreach',
    title: 'Abordagem Irresistível',
    icon: <MessageSquare className="h-4 w-4" />,
    description: 'Para mensagens de WhatsApp/Direct que convertem.',
    fields: ['product', 'niche', 'tone'],
  },
  {
    id: 'closing',
    title: 'Fechamento Brutal',
    icon: <Target className="h-4 w-4" />,
    description: 'Para converter interessados em clientes pagantes.',
    fields: ['product', 'price', 'objection'],
  },
  {
    id: 'followup',
    title: 'Follow-up de Elite',
    icon: <History className="h-4 w-4" />,
    description: 'Retome conversas paradas sem parecer chato.',
    fields: ['businessName', 'context'],
  },
  {
    id: 'offer',
    title: 'Ideias de Oferta',
    icon: <Lightbulb className="h-4 w-4" />,
    description: 'Transforme seu serviço em uma oferta irresistível.',
    fields: ['niche', 'mainProblem'],
  }
];

const FIELD_LABELS: Record<string, string> = {
  niche: 'Nicho do Negócio',
  serviceType: 'Tipo de Serviço',
  goal: 'Qual seu Objetivo?',
  style: 'Estilo / Tom de Voz',
  product: 'Seu Produto/Serviço',
  target: 'Público Alvo',
  businessName: 'Nome da Empresa',
  colors: 'Cores Principais',
  tone: 'Tom de Voz',
  price: 'Preço da Oferta',
  objection: 'Objeção do Cliente',
  context: 'Contexto da Conversa',
  mainProblem: 'Maior Dor do Cliente'
};

const FIELD_PLACEHOLDERS: Record<string, string> = {
  niche: 'Ex: Advocacia, Infoprodutos...',
  serviceType: 'Ex: Gestão de Tráfego, Mentorias...',
  goal: 'Ex: Criar um roteiro de vendas, Estruturar funil...',
  style: 'Ex: Agressivo, Sofisticado, Engraçado...',
  product: 'Ex: Consultoria de Vendas',
  target: 'Ex: Donos de clínicas pequenas',
  businessName: 'Ex: FlowPro Systems',
  colors: 'Ex: Roxo e Branco',
  tone: 'Ex: Educado e Elegante',
  price: 'Ex: 1.500,00',
  objection: 'Ex: Achei caro',
  context: 'Ex: Visualizou a proposta e sumiu',
  mainProblem: 'Ex: Não tem tempo para gerenciar redes'
};

const SUGGESTED_TOOLS: Record<string, { name: string, url: string }[]> = {
  sites: [
    { name: 'Lovable', url: 'https://lovable.dev' },
    { name: 'Durable', url: 'https://durable.co' }
  ],
  logo: [
    { name: 'Midjourney', url: 'https://midjourney.com' },
    { name: 'DALL·E 3', url: 'https://chatgpt.com/?model=gpt-4-dalle' }
  ],
  outreach: [
    { name: 'WhatsApp', url: 'https://web.whatsapp.com' },
    { name: 'Instagram', url: 'https://instagram.com' }
  ],
  closing: [
    { name: 'WhatsApp', url: 'https://web.whatsapp.com' },
    { name: 'ChatGPT', url: 'https://chatgpt.com' }
  ],
  followup: [
    { name: 'WhatsApp', url: 'https://web.whatsapp.com' },
    { name: 'Instagram', url: 'https://instagram.com' }
  ],
  custom: [
    { name: 'ChatGPT', url: 'https://chatgpt.com' },
    { name: 'Copy.ai', url: 'https://copy.ai' }
  ],
  offer: [
    { name: 'ChatGPT', url: 'https://chatgpt.com' },
    { name: 'Claude', url: 'https://claude.ai' }
  ]
};

export default function PromptsPage() {
  const [activeTemplate, setActiveTemplate] = useState(PROMPT_TEMPLATES[0]);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [generatedPrompt, setGeneratedPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [complexity, setComplexity] = useState<'simple' | 'advanced'>('advanced');
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const handleGenerate = async () => {
    setIsLoading(true);
    setGeneratedPrompt('');
    try {
      const res = await generateMasterPrompt({
        category: activeTemplate.title,
        variables: formData,
        complexity: complexity
      });
      setGeneratedPrompt(res.prompt);
      toast({ title: "Motor Neural Concluído", description: "O prompt foi gerado com sucesso." });
    } catch (e) {
      toast({ variant: "destructive", title: "Erro na Geração", description: "Ocorreu um problema ao conectar com a rede neural." });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    if (!generatedPrompt) return;
    navigator.clipboard.writeText(generatedPrompt);
    setCopied(true);
    toast({ title: "Prompt Copiado!", description: "Cole na sua IA favorita agora." });
    setTimeout(() => setCopied(false), 2000);
  };

  const handleTemplateChange = (template: typeof PROMPT_TEMPLATES[0]) => {
    setActiveTemplate(template);
    setGeneratedPrompt('');
    setFormData({}); 
  };

  const currentTools = SUGGESTED_TOOLS[activeTemplate.id] || SUGGESTED_TOOLS.custom;

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
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[8px] font-black uppercase tracking-widest">
                  <Cpu className="h-3 w-3 animate-pulse" /> Engenharia Neural Ativa
                </div>
                <h2 className="text-3xl font-black italic uppercase tracking-tighter text-white">Fábrica de Comandos</h2>
                <p className="text-muted-foreground text-sm uppercase font-bold tracking-widest">Transforme variáveis em instruções de alta performance.</p>
              </div>

              <div className="flex bg-white/5 p-1 rounded-xl border border-white/10">
                <button 
                  onClick={() => setComplexity('simple')}
                  className={`px-4 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${complexity === 'simple' ? 'bg-white text-black' : 'text-muted-foreground hover:text-white'}`}
                >
                  Simples
                </button>
                <button 
                  onClick={() => setComplexity('advanced')}
                  className={`px-4 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${complexity === 'advanced' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-muted-foreground hover:text-white'}`}
                >
                  Avançado
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Seleção de Templates */}
              <div className="lg:col-span-4 space-y-4">
                <div className="text-[10px] font-black uppercase tracking-widest text-primary/60 mb-2 px-2">Selecione o Objetivo</div>
                <div className="grid gap-3">
                  {PROMPT_TEMPLATES.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => handleTemplateChange(t)}
                      className={`p-4 rounded-2xl border text-left transition-all group relative overflow-hidden ${
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
                      {activeTemplate.id === t.id && (
                        <div className="absolute right-4 top-1/2 -translate-y-1/2">
                          <ChevronRight className="h-4 w-4 text-primary animate-pulse" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Formulário de Variáveis */}
              <div className="lg:col-span-8 space-y-6">
                <Card className="glass-card border-white/10 rounded-[2rem] overflow-hidden">
                  <CardHeader className="bg-white/5 border-b border-white/5 p-6">
                    <CardTitle className="text-xs font-black uppercase tracking-widest italic flex items-center gap-2">
                      {activeTemplate.icon} Personalizar: {activeTemplate.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-8 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {activeTemplate.fields.map((field) => (
                        <div key={field} className="space-y-2">
                          <Label className="text-[10px] font-black uppercase tracking-widest opacity-50">
                            {FIELD_LABELS[field] || field}
                          </Label>
                          <Input 
                            placeholder={FIELD_PLACEHOLDERS[field] || 'Preencha aqui...'}
                            className="bg-white/5 border-white/10 h-12 rounded-xl focus-visible:ring-primary font-medium"
                            value={formData[field] || ''}
                            onChange={(e) => setFormData({...formData, [field]: e.target.value})}
                          />
                        </div>
                      ))}
                    </div>

                    <Button 
                      onClick={handleGenerate}
                      disabled={isLoading || Object.values(formData).filter(v => v.trim()).length === 0}
                      className="w-full h-14 bg-primary hover:bg-primary/90 rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-primary/20 transition-all active:scale-[0.98] group"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          ENGENHARIA NEURAL...
                        </>
                      ) : (
                        <>
                          GERAR COMANDO MESTRE <Zap className="ml-2 h-4 w-4 fill-white group-hover:scale-125 transition-transform" />
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>

                {/* Resultado */}
                {generatedPrompt && (
                  <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <Card className="bg-primary/5 border border-primary/20 rounded-[2.5rem] overflow-hidden">
                      <CardHeader className="flex flex-row items-center justify-between p-6 border-b border-primary/10">
                        <div className="text-[10px] font-black uppercase tracking-widest text-primary flex items-center gap-2">
                          <ShieldCheck className="h-3 w-3 fill-primary" /> Comando Pronto para Operação
                        </div>
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          onClick={handleCopy}
                          className={`text-[10px] font-black uppercase tracking-widest h-8 transition-all ${copied ? 'text-green-500' : 'text-primary hover:bg-primary/10'}`}
                        >
                          {copied ? <Check className="h-3 w-3 mr-2" /> : <Copy className="h-3 w-3 mr-2" />}
                          {copied ? 'COPIADO' : 'COPIAR TUDO'}
                        </Button>
                      </CardHeader>
                      <CardContent className="p-8">
                        <div className="bg-black/40 p-6 rounded-2xl border border-white/5 group relative">
                          <pre className="text-sm font-medium text-white/80 leading-relaxed whitespace-pre-wrap italic">
                            {generatedPrompt}
                          </pre>
                          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                             <Sparkles className="h-4 w-4 text-primary/40" />
                          </div>
                        </div>
                        
                        <div className="mt-8 pt-8 border-t border-white/5 space-y-6">
                          <div className="flex items-center gap-3">
                            <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-black text-xs">1</div>
                            <div className="space-y-0.5">
                              <p className="text-[10px] font-black uppercase tracking-widest text-white">Próximo Passo</p>
                              <p className="text-xs text-muted-foreground">Copie o prompt acima e cole na ferramenta recomendada abaixo.</p>
                            </div>
                          </div>

                          <Button onClick={handleCopy} className="w-full h-14 bg-white text-black hover:bg-primary hover:text-white rounded-xl font-black uppercase tracking-widest shadow-xl transition-all active:scale-95">
                            {copied ? <Check className="mr-2 h-4 w-4" /> : <Copy className="mr-2 h-4 w-4" />}
                            {copied ? 'PRONTO PARA COLAR!' : 'COPIAR PROMPT AGORA'}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="glass-card border-white/5 rounded-[2.5rem] overflow-hidden">
                      <CardHeader className="bg-white/5 p-6 border-b border-white/5">
                        <div className="text-[10px] font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                          <MousePointerClick className="h-3.5 w-3.5" /> Onde usar esse prompt
                        </div>
                      </CardHeader>
                      <CardContent className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {currentTools.map((tool, i) => (
                            <div key={i} className="flex items-center justify-between p-4 bg-white/[0.03] border border-white/5 rounded-2xl group hover:border-primary/30 transition-all">
                              <div className="flex items-center gap-3">
                                <div className="h-10 w-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary border border-primary/20 group-hover:scale-110 transition-transform">
                                  <Zap className="h-5 w-5 fill-primary" />
                                </div>
                                <span className="font-black italic uppercase tracking-tight text-white">{tool.name}</span>
                              </div>
                              <Button asChild size="sm" variant="outline" className="rounded-xl border-white/10 h-10 px-4 text-[9px] font-black uppercase tracking-widest hover:bg-primary hover:border-primary hover:text-white transition-all">
                                <a href={tool.url} target="_blank" rel="noopener noreferrer">
                                  ACESSAR <ExternalLink className="ml-1.5 h-3 w-3" />
                                </a>
                              </Button>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
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
