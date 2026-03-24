
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
  Search
} from 'lucide-react';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from '@/components/AppSidebar';
import { useToast } from '@/hooks/use-toast';

const PROMPT_TEMPLATES = [
  {
    id: 'sites',
    title: 'Estrutura de Site/LP',
    icon: <Globe className="h-4 w-4" />,
    description: 'Crie o roteiro completo de uma Landing Page que vende.',
    fields: ['product', 'niche', 'target'],
    template: (data: any) => `Atue como um Copywriter de Resposta Direta e Especialista em UX Design.
Crie a estrutura completa de uma Landing Page focada em conversão para: ${data.product || '[Produto/Serviço]'}.
O nicho é ${data.niche || '[Nicho]'} e o público-alvo são ${data.target || '[Público]'}.
ESTRUTURA NECESSÁRIA:
1. Headline Irresistível (Gancho + Benefício + Curiosidade).
2. Subheadline explicativa.
3. Seção de Dor (Liste 3 problemas comuns do público).
4. Seção de Solução (Como meu produto resolve isso).
5. Prova Social (Dicas de onde colocar depoimentos).
6. Oferta e Garantia.
7. CTA (Chamada para ação clara).
Use gatilhos mentais de escassez e autoridade.`
  },
  {
    id: 'logo',
    title: 'Criação de Logo/ID',
    icon: <Palette className="h-4 w-4" />,
    description: 'Gere instruções perfeitas para IAs de imagem.',
    fields: ['businessName', 'style', 'colors'],
    template: (data: any) => `Generate a professional logo design prompt for "${data.businessName || '[Nome do Negócio]'}".
Style: ${data.style || 'Minimalist, modern, and clean'}.
Primary Colors: ${data.colors || 'Luxury gold and deep black'}.
TECHNICAL SPECS: Vector style, flat design, high resolution, 8k, white background, symmetrical, professional typography, trending on Behance.
Ensure the symbol represents growth and elite performance.`
  },
  {
    id: 'outreach',
    title: 'Abordagem Irresistível',
    icon: <MessageSquare className="h-4 w-4" />,
    description: 'Para mensagens de WhatsApp/Direct que convertem.',
    fields: ['product', 'niche', 'tone'],
    template: (data: any) => `Atue como um especialista em Cold Outreach e Psicologia de Vendas.
Gere uma mensagem de abordagem curta e altamente personalizada para um dono de negócio do nicho de ${data.niche || '[Nicho]'}.
O produto/serviço que estou oferecendo é: ${data.product || '[Produto/Serviço]'}.
O tom da mensagem deve ser ${data.tone || 'amigável e profissional'}.
FOCO: Começar com um elogio genuíno, citar um gargalo de mercado que ele provavelmente tem e terminar com uma pergunta aberta que desperte curiosidade.
LIMITE: Máximo 300 caracteres.`
  },
  {
    id: 'closing',
    title: 'Fechamento Brutal',
    icon: <Target className="h-4 w-4" />,
    description: 'Para converter interessados em clientes pagantes.',
    fields: ['product', 'price', 'objection'],
    template: (data: any) => `Sou um vendedor fechando um contrato de ${data.product || '[Produto]'} por R$ ${data.price || '[Preço]'}.
O cliente apresentou a seguinte dúvida/objeção: "${data.objection || 'Vou pensar e te falo'}".
Gere uma resposta estratégica que utilize a técnica de "Inversão de Risco" e foque no custo de oportunidade (o quanto ele perde por não fechar hoje).
O tom deve ser confiante, escasso e direto ao ponto.`
  },
  {
    id: 'followup',
    title: 'Follow-up de Elite',
    icon: <History className="h-4 w-4" />,
    description: 'Retome conversas paradas sem parecer chato.',
    fields: ['businessName', 'context'],
    template: (data: any) => `Gere uma mensagem de follow-up estratégica para "${data.businessName || '[Negócio]'}".
Contexto da última conversa: ${data.context || 'Mandei a proposta mas não respondeu'}.
DIRETRIZES:
1. Não peça desculpas por incomodar.
2. Use o gancho: "Acredito que as coisas estejam corridas por aí...".
3. Agregue um valor rápido (ex: "Vi uma atualização no seu nicho e lembrei de você").
4. Termine com uma pergunta de sim ou não sobre o próximo passo.
Máximo 200 caracteres.`
  },
  {
    id: 'offer',
    title: 'Ideias de Oferta',
    icon: <Lightbulb className="h-4 w-4" />,
    description: 'Transforme seu serviço em uma oferta irresistível.',
    fields: ['niche', 'mainProblem'],
    template: (data: any) => `Atue como um Especialista em Estratégia de Produtos e Ofertas Irresistíveis.
Meu nicho é ${data.niche || '[Nicho]'} e o maior problema que resolvo é ${data.mainProblem || '[Problema]'}.
Crie 3 variações de ofertas "High Ticket":
1. Oferta de Implementação (Você faz para ele).
2. Oferta de Acompanhamento (Você ensina ele a fazer).
3. Oferta Híbrida (Software + Consultoria).
Para cada uma, defina um nome impactante, o que está incluso e por que ele não pode dizer não.`
  }
];

const FIELD_LABELS: Record<string, string> = {
  product: 'Seu Produto/Serviço',
  niche: 'Nicho de Atuação',
  target: 'Público Alvo',
  businessName: 'Nome da Empresa',
  style: 'Estilo Visual (Ex: Minimalista, Retrô)',
  colors: 'Cores Principais',
  tone: 'Tom de Voz',
  price: 'Preço da Oferta',
  objection: 'Objeção do Cliente',
  context: 'Contexto da Conversa',
  mainProblem: 'Maior Dor do Cliente'
};

const FIELD_PLACEHOLDERS: Record<string, string> = {
  product: 'Ex: Consultoria de Vendas',
  niche: 'Ex: Dentistas, Academias',
  target: 'Ex: Donos de clínicas pequenas',
  businessName: 'Ex: FlowPro Systems',
  style: 'Ex: Futurista, Neon, High-tech',
  colors: 'Ex: Roxo e Branco',
  tone: 'Ex: Agressivo, Educado, Elegante',
  price: 'Ex: 1.500,00',
  objection: 'Ex: Achei caro',
  context: 'Ex: Visualizou a proposta e sumiu',
  mainProblem: 'Ex: Não tem tempo para gerenciar redes'
};

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

  const handleTemplateChange = (template: typeof PROMPT_TEMPLATES[0]) => {
    setActiveTemplate(template);
    setGeneratedPrompt('');
    setFormData({}); // Limpa os dados ao trocar de categoria
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
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[8px] font-black uppercase tracking-widest">
                <Sparkles className="h-3 w-3" /> Engenharia Neural Ativa
              </div>
              <h2 className="text-3xl font-black italic uppercase tracking-tighter text-white">Fábrica de Comandos</h2>
              <p className="text-muted-foreground text-sm uppercase font-bold tracking-widest">Transforme variáveis em instruções de alta performance para extrair o melhor da IA.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Seleção de Templates */}
              <div className="lg:col-span-4 space-y-4">
                <div className="text-[10px] font-black uppercase tracking-widest text-primary/60 mb-2">Selecione o Objetivo</div>
                <div className="grid gap-3">
                  {PROMPT_TEMPLATES.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => handleTemplateChange(t)}
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
                            className="bg-white/5 border-white/10 h-12 rounded-xl focus-visible:ring-primary"
                            value={formData[field] || ''}
                            onChange={(e) => setFormData({...formData, [field]: e.target.value})}
                          />
                        </div>
                      ))}
                    </div>

                    <Button 
                      onClick={handleGenerate}
                      className="w-full h-14 bg-primary hover:bg-primary/90 rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-primary/20 transition-all active:scale-[0.98]"
                    >
                      GERAR PROMPT MESTRE <Zap className="ml-2 h-4 w-4 fill-white" />
                    </Button>
                  </CardContent>
                </Card>

                {/* Resultado */}
                {generatedPrompt && (
                  <Card className="bg-primary/5 border border-primary/20 rounded-[2.5rem] overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <CardHeader className="flex flex-row items-center justify-between p-6 border-b border-primary/10">
                      <div className="text-[10px] font-black uppercase tracking-widest text-primary flex items-center gap-2">
                        <Zap className="h-3 w-3 fill-primary" /> Prompt Gerado com Sucesso
                      </div>
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
                      <div className="bg-black/40 p-6 rounded-2xl border border-white/5">
                        <pre className="text-sm font-medium text-white/80 leading-relaxed whitespace-pre-wrap italic">
                          "{generatedPrompt}"
                        </pre>
                      </div>
                      <p className="text-[8px] text-center mt-6 text-muted-foreground uppercase font-black tracking-[0.3em]">
                        Dica: Cole este comando no ChatGPT, Claude ou Midjourney para resultados imediatos.
                      </p>
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
