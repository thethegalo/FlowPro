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
  Rocket
} from 'lucide-react';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from '@/components/AppSidebar';
import { useToast } from '@/hooks/use-toast';
import { generateMasterPrompt } from '@/ai/flows/generate-master-prompt';

const PROMPT_TEMPLATES = [
  {
    id: 'sites',
    title: 'Estrutura de Site/LP',
    icon: <Globe className="h-4 w-4" />,
    description: 'Comando técnico para Lovable/Bolt criar sua página de vendas.',
    fields: ['product', 'niche', 'style', 'colors'],
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
  },
  {
    id: 'offer',
    title: 'Criação de Oferta',
    icon: <Rocket className="h-4 w-4" />,
    description: 'Transforme seu serviço em um pacote impossível de recusar.',
    fields: ['niche', 'mainProblem', 'serviceType'],
  },
  {
    id: 'followup',
    title: 'Follow-up Estratégico',
    icon: <History className="h-4 w-4" />,
    description: 'Comando para recuperar leads que pararam de responder.',
    fields: ['businessName', 'context'],
  },
  {
    id: 'custom',
    title: 'Prompt Customizado',
    icon: <Settings2 className="h-4 w-4" />,
    description: 'Crie um comando mestre para qualquer outra necessidade.',
    fields: ['niche', 'serviceType', 'goal', 'style'],
  }
];

const FIELD_LABELS: Record<string, string> = {
  niche: 'Nicho do Negócio',
  serviceType: 'Tipo de Serviço',
  goal: 'Qual seu Objetivo?',
  style: 'Estilo Visual (Ex: High-Tech, Clean)',
  product: 'O que você vende?',
  businessName: 'Nome da Empresa',
  colors: 'Cores (Ex: Roxo e Preto)',
  tone: 'Tom de Voz (Ex: Agressivo, Educado)',
  price: 'Preço da Oferta',
  objection: 'Objeção do Cliente (Ex: Tá caro)',
  context: 'Onde a conversa parou?',
  mainProblem: 'Maior Dor do Cliente'
};

const FIELD_PLACEHOLDERS: Record<string, string> = {
  niche: 'Ex: Clínicas de Estética, E-commerce...',
  serviceType: 'Ex: Gestão de Tráfego, Automação...',
  goal: 'Ex: Criar um carrossel de 7 slides...',
  style: 'Ex: Minimalista Dark, Estilo Apple...',
  product: 'Ex: Consultoria de Vendas Flow',
  businessName: 'Ex: FlowPro Systems',
  colors: 'Ex: Azul Marinho e Branco',
  tone: 'Ex: Persuasivo mas sem parecer spam',
  price: 'Ex: 12x de 197,00',
  objection: 'Ex: Ele disse que não tem tempo agora',
  context: 'Ex: Visualizou a proposta e sumiu há 2 dias',
  mainProblem: 'Ex: Gastam muito em anúncio e não vendem'
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
  ],
  offer: [
    { name: 'ChatGPT', url: 'https://chatgpt.com' },
    { name: 'Claude', url: 'https://claude.ai' }
  ],
  custom: [
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
      toast({ title: "Comando Neural Gerado!", description: "Sua instrução de alta performance está pronta." });
    } catch (e) {
      toast({ variant: "destructive", title: "Erro na Rede", description: "Verifique sua conexão e tente novamente." });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    if (!generatedPrompt) return;
    navigator.clipboard.writeText(generatedPrompt);
    setCopied(true);
    toast({ title: "Copiado para o Flow!", description: "Cole agora na ferramenta recomendada." });
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
                <Terminal className="h-4 w-4 text-primary" /> Fábrica de Comandos
              </h1>
            </div>
          </header>

          <div className="flex-1 container max-w-5xl mx-auto p-4 md:p-8 space-y-12">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[8px] font-black uppercase tracking-widest">
                  <Cpu className="h-3 w-3 animate-pulse" /> Engenharia de Alta Performance
                </div>
                <h2 className="text-3xl font-black italic uppercase tracking-tighter text-white leading-none">Motor de Prompts</h2>
                <p className="text-muted-foreground text-sm uppercase font-bold tracking-widest">Gere instruções perfeitas para extrair o máximo das IAs.</p>
              </div>

              <div className="flex bg-white/5 p-1 rounded-xl border border-white/10">
                <button 
                  onClick={() => setComplexity('simple')}
                  className={`px-4 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${complexity === 'simple' ? 'bg-white text-black shadow-lg' : 'text-muted-foreground hover:text-white'}`}
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

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12">
              {/* Navegação de Objetivos */}
              <div className="lg:col-span-4 space-y-4">
                <p className="text-[10px] font-black uppercase tracking-widest text-primary/60 px-2">Escolha seu Objetivo</p>
                <div className="grid gap-2">
                  {PROMPT_TEMPLATES.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => handleTemplateChange(t)}
                      className={`p-4 rounded-2xl border text-left transition-all group relative overflow-hidden ${
                        activeTemplate.id === t.id 
                        ? 'bg-primary/10 border-primary text-white shadow-[0_0_30px_rgba(139,92,246,0.1)]' 
                        : 'bg-white/[0.02] border-white/5 text-muted-foreground hover:bg-white/[0.05] hover:border-white/10'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${activeTemplate.id === t.id ? 'bg-primary text-white' : 'bg-white/5 text-muted-foreground group-hover:text-white'}`}>
                          {t.icon}
                        </div>
                        <div className="min-w-0">
                          <span className="text-xs font-black uppercase italic truncate block">{t.title}</span>
                          <p className="text-[9px] font-medium opacity-50 line-clamp-1">{t.description}</p>
                        </div>
                      </div>
                      {activeTemplate.id === t.id && (
                        <div className="absolute right-4 top-1/2 -translate-y-1/2">
                          <ChevronRight className="h-4 w-4 text-primary animate-pulse" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Editor de Variáveis */}
              <div className="lg:col-span-8 space-y-8">
                <Card className="glass-card border-white/10 rounded-[2.5rem] overflow-hidden">
                  <CardHeader className="bg-white/5 border-b border-white/5 p-8">
                    <CardTitle className="text-xs font-black uppercase tracking-widest italic flex items-center gap-2">
                      <Settings2 className="h-4 w-4 text-primary" /> Personalizar Comando: {activeTemplate.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-8 md:p-10 space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {activeTemplate.fields.map((field) => (
                        <div key={field} className="space-y-2">
                          <Label className="text-[10px] font-black uppercase tracking-widest opacity-50">
                            {FIELD_LABELS[field] || field}
                          </Label>
                          <Input 
                            placeholder={FIELD_PLACEHOLDERS[field] || 'Preencha...'}
                            className="bg-white/5 border-white/10 h-14 rounded-2xl focus-visible:ring-primary font-medium"
                            value={formData[field] || ''}
                            onChange={(e) => setFormData({...formData, [field]: e.target.value})}
                          />
                        </div>
                      ))}
                    </div>

                    <Button 
                      onClick={handleGenerate}
                      disabled={isLoading || Object.values(formData).filter(v => v.trim()).length === 0}
                      className="w-full h-16 md:h-20 bg-primary hover:bg-primary/90 rounded-2xl font-black uppercase tracking-[0.2em] text-xs shadow-xl shadow-primary/20 transition-all active:scale-[0.98] group"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-3 h-6 w-6 animate-spin" />
                          SINCRONIZANDO REDE NEURAL...
                        </>
                      ) : (
                        <>
                          ATIVAR ENGENHARIA NEURAL <Zap className="ml-3 h-5 w-5 fill-white group-hover:scale-125 transition-transform" />
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>

                {/* Exibição do Resultado */}
                {generatedPrompt && (
                  <div className="space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-700">
                    <div className="relative p-[2px] rounded-[3rem] overflow-hidden bg-gradient-to-br from-primary via-accent/50 to-primary/30 shadow-2xl shadow-primary/20">
                      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent animate-pulse"></div>
                      <Card className="relative bg-[#0b0b14] border-none rounded-[calc(3rem-2px)] overflow-hidden">
                        <CardHeader className="flex flex-row items-center justify-between p-8 border-b border-white/5">
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-2xl bg-primary/20 flex items-center justify-center text-primary border border-primary/20">
                              <ShieldCheck className="h-6 w-6" />
                            </div>
                            <div>
                              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Comando Mestre Gerado</p>
                              <p className="text-[8px] font-bold text-muted-foreground uppercase">Pronto para execução em larga escala</p>
                            </div>
                          </div>
                          <Badge variant="outline" className="border-primary/30 text-primary text-[8px] font-black uppercase">
                            {complexity.toUpperCase()} ENGINE
                          </Badge>
                        </CardHeader>
                        
                        <CardContent className="p-8 md:p-10 space-y-8">
                          <div className="bg-black/40 p-8 rounded-3xl border border-white/5 relative group">
                            <pre className="text-sm md:text-base font-medium text-white/90 leading-relaxed whitespace-pre-wrap italic font-body">
                              {generatedPrompt}
                            </pre>
                            <div className="absolute top-4 right-4 opacity-20 group-hover:opacity-100 transition-opacity">
                               <Sparkles className="h-5 w-5 text-primary" />
                            </div>
                          </div>
                          
                          <Button 
                            onClick={handleCopy} 
                            className={`w-full h-20 md:h-24 rounded-[2rem] text-lg md:text-xl font-black uppercase tracking-[0.2em] shadow-2xl transition-all active:scale-95 group relative overflow-hidden ${
                              copied ? 'bg-green-500' : 'bg-white text-black hover:bg-white/90'
                            }`}
                          >
                            <div className="flex items-center justify-center gap-4 relative z-10">
                              {copied ? (
                                <><Check className="h-8 w-8" /> COMANDO COPIADO!</>
                              ) : (
                                <><Copy className="h-7 w-7" /> PRONTO PARA COLAR!</>
                              )}
                            </div>
                          </Button>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Guia de Próximos Passos */}
                    <div className="space-y-6">
                      <div className="flex items-center gap-3 px-2">
                        <MousePointerClick className="h-5 w-5 text-primary" />
                        <h3 className="text-xl font-black italic uppercase tracking-tighter text-white">Onde usar este comando?</h3>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {currentTools.map((tool, i) => (
                          <Card key={i} className="glass-card border-white/5 rounded-3xl overflow-hidden group hover:border-primary/40 transition-all duration-500">
                            <CardContent className="p-6 flex items-center justify-between gap-4">
                              <div className="flex items-center gap-4">
                                <div className="h-12 w-12 bg-white/5 rounded-2xl flex items-center justify-center text-white border border-white/10 group-hover:bg-primary/10 group-hover:border-primary/20 transition-all shrink-0">
                                  {i === 0 ? <Zap className="h-6 w-6 text-primary fill-primary" /> : <Sparkles className="h-6 w-6 text-accent" />}
                                </div>
                                <div className="space-y-0.5 min-w-0">
                                  <p className="text-[8px] font-black uppercase tracking-[0.2em] text-muted-foreground">Recomendação</p>
                                  <h4 className="font-black italic uppercase tracking-tight text-lg text-white truncate">{tool.name}</h4>
                                </div>
                              </div>
                              <Button asChild size="sm" variant="outline" className="rounded-xl border-white/10 h-12 px-6 text-[10px] font-black uppercase hover:bg-primary hover:text-white transition-all shadow-lg active:scale-95 shrink-0">
                                <a href={tool.url} target="_blank" rel="noopener noreferrer">
                                  ABRIR <ExternalLink className="ml-2 h-3.5 w-3.5" />
                                </a>
                              </Button>
                            </CardContent>
                          </Card>
                        ))}
                      </div>

                      <div className="p-6 rounded-3xl bg-primary/5 border border-dashed border-primary/20 flex items-start gap-4">
                        <Info className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <p className="text-[10px] font-bold text-white/60 leading-relaxed uppercase">
                          DICA FLOW: Se estiver usando para <span className="text-white">SITES</span>, cole o comando na <span className="text-white">Lovable</span> e peça para ela criar a estrutura visual primeiro. Depois que ela terminar, peça para ajustar os textos usando os gatilhos mentais do prompt.
                        </p>
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
