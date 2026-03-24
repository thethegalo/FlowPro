
"use client";

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Sparkles, 
  ExternalLink, 
  Zap, 
  MessageSquare, 
  Palette, 
  Video, 
  Bot, 
  FileText, 
  BrainCircuit,
  TrendingUp,
  Layout,
  Mic2,
  Globe,
  Mail
} from 'lucide-react';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from '@/components/AppSidebar';

const AI_CATEGORIES = [
  { id: 'all', label: 'Todas', icon: <BrainCircuit className="h-4 w-4" /> },
  { id: 'sales', label: 'IA para Vendas', icon: <TrendingUp className="h-4 w-4" /> },
  { id: 'creation', label: 'IA para Criação', icon: <Palette className="h-4 w-4" /> },
  { id: 'content', label: 'IA para Conteúdo', icon: <Video className="h-4 w-4" /> },
  { id: 'prod', label: 'IA para Produtividade', icon: <Zap className="h-4 w-4" /> },
];

const AI_TOOLS = [
  // IA PARA VENDAS
  {
    name: "ChatGPT",
    desc: "O assistente de IA mais versátil para scripts, ideias e estratégia.",
    useCase: "Criar roteiros de vendas personalizados e quebrar objeções complexas.",
    category: "sales",
    icon: <MessageSquare className="h-5 w-5 text-emerald-400" />,
    url: "https://chatgpt.com"
  },
  {
    name: "Copy.ai",
    desc: "IA focada em copywriting rápido para redes sociais e e-mails.",
    useCase: "Gerar legendas, headlines e e-mails de abordagem em poucos segundos.",
    category: "sales",
    icon: <Zap className="h-5 w-5 text-blue-400" />,
    url: "https://copy.ai"
  },
  {
    name: "Jasper",
    desc: "Especialista em textos persuasivos e marketing de alta performance.",
    useCase: "Escrever anúncios irresistíveis e landing pages que convertem visitantes em clientes.",
    category: "sales",
    icon: <FileText className="h-5 w-5 text-orange-400" />,
    url: "https://jasper.ai"
  },
  
  // IA PARA CRIAÇÃO
  {
    name: "Midjourney",
    desc: "A melhor IA para geração de imagens ultra-realistas e artísticas.",
    useCase: "Criar artes profissionais e exclusivas para seus produtos, marcas e anúncios.",
    category: "creation",
    icon: <Palette className="h-5 w-5 text-purple-400" />,
    url: "https://midjourney.com"
  },
  {
    name: "DALL·E",
    desc: "IA integrada ao ChatGPT para criação de imagens por descrição.",
    useCase: "Transformar ideias complexas em ilustrações e fotos instantâneas para seu material.",
    category: "creation",
    icon: <Sparkles className="h-5 w-5 text-pink-400" />,
    url: "https://openai.com/dall-e-3"
  },
  {
    name: "Durable",
    desc: "Crie um site profissional completo em apenas 30 segundos com IA.",
    useCase: "Construir landing pages ultra-rápidas para validar novos nichos de mercado.",
    category: "creation",
    icon: <Globe className="h-5 w-5 text-blue-500" />,
    url: "https://durable.co"
  },

  // IA PARA CONTEÚDO
  {
    name: "CapCut IA",
    desc: "Edição de vídeo simplificada com recursos avançados de inteligência.",
    useCase: "Criar Reels e Shorts virais com legendas automáticas e cortes inteligentes.",
    category: "content",
    icon: <Video className="h-5 w-5 text-white" />,
    url: "https://capcut.com"
  },
  {
    name: "Pictory",
    desc: "Transforme roteiros de texto em vídeos curtos automaticamente.",
    useCase: "Criar canais de conteúdo sem aparecer (Canais Dark) para YouTube e TikTok.",
    category: "content",
    icon: <Layout className="h-5 w-5 text-indigo-400" />,
    url: "https://pictory.ai"
  },
  {
    name: "ElevenLabs",
    desc: "A voz de IA mais natural e realista do mundo.",
    useCase: "Dublar vídeos e criar locuções profissionais para seus anúncios sem precisar de estúdio.",
    category: "content",
    icon: <Mic2 className="h-5 w-5 text-yellow-400" />,
    url: "https://elevenlabs.io"
  },

  // IA PARA PRODUTIVIDADE
  {
    name: "Notion AI",
    desc: "Inteligência integrada ao seu espaço de trabalho e banco de dados.",
    useCase: "Resumir reuniões, organizar sua base de conhecimento e escrever documentação técnica.",
    category: "prod",
    icon: <FileText className="h-5 w-5 text-white" />,
    url: "https://notion.so"
  },
  {
    name: "Mailchimp IA",
    desc: "Automação de e-mail marketing com auxílio de inteligência preditiva.",
    useCase: "Escalar seu alcance e nutrir seus leads automaticamente com e-mails inteligentes.",
    category: "prod",
    icon: <Mail className="h-5 w-5 text-yellow-500" />,
    url: "https://mailchimp.com"
  }
];

export default function AIToolsPage() {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredTools = activeCategory === 'all' 
    ? AI_TOOLS 
    : AI_TOOLS.filter(t => t.category === activeCategory);

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
                <Sparkles className="h-4 w-4 text-primary" /> Arsenal IA
              </h1>
            </div>
          </header>

          <div className="flex-1 container max-w-6xl mx-auto p-4 md:p-8 space-y-12">
            
            <section className="space-y-6">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[8px] font-black uppercase tracking-widest">
                  <Bot className="h-3 w-3" /> Inteligência Neural Ativa
                </div>
                <h2 className="text-3xl font-black italic uppercase tracking-tighter text-white">IAs Recomendadas</h2>
                <p className="text-muted-foreground text-sm uppercase font-bold tracking-widest max-w-2xl">O seu arsenal estratégico de inteligência artificial para ganhar dinheiro e executar com alta performance.</p>
              </div>

              <div className="flex overflow-x-auto pb-4 gap-2 no-scrollbar">
                {AI_CATEGORIES.map((cat) => (
                  <Button
                    key={cat.id}
                    variant={activeCategory === cat.id ? "default" : "outline"}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`rounded-xl text-[9px] font-black uppercase tracking-widest h-11 px-6 whitespace-nowrap transition-all ${
                      activeCategory === cat.id ? 'bg-primary border-primary shadow-[0_0_20px_rgba(139,92,246,0.3)]' : 'border-white/10 hover:bg-white/5'
                    }`}
                  >
                    <span className="mr-2">{cat.icon}</span>
                    {cat.label}
                  </Button>
                ))}
              </div>

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredTools.map((tool, i) => (
                  <Card key={i} className="glass-card border-white/5 hover:border-primary/30 transition-all duration-500 rounded-[2rem] group flex flex-col h-full overflow-hidden">
                    <div className="absolute top-0 right-0 p-6 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity pointer-events-none">
                      {tool.icon}
                    </div>
                    
                    <CardContent className="p-8 space-y-6 flex-1 flex flex-col relative z-10">
                      <div className="flex justify-between items-start">
                        <div className="p-4 bg-white/5 rounded-2xl group-hover:scale-110 transition-transform border border-white/5 shadow-xl group-hover:shadow-primary/10">
                          {tool.icon}
                        </div>
                        <Badge variant="outline" className="text-[8px] font-black uppercase border-white/10 bg-white/5">
                          {AI_CATEGORIES.find(c => c.id === tool.category)?.label}
                        </Badge>
                      </div>
                      
                      <div className="space-y-4 flex-1">
                        <div className="space-y-2">
                          <h3 className="text-xl font-black italic uppercase tracking-tight text-white">{tool.name}</h3>
                          <p className="text-xs text-muted-foreground font-medium leading-relaxed">{tool.desc}</p>
                        </div>
                        
                        <div className="bg-primary/5 border border-primary/10 rounded-2xl p-5 group-hover:bg-primary/10 transition-colors">
                          <p className="text-[8px] font-black uppercase text-primary tracking-widest mb-2 flex items-center gap-1">
                            <Zap className="h-2.5 w-2.5 fill-primary" /> Use isso para:
                          </p>
                          <p className="text-[11px] text-white/80 font-bold italic leading-relaxed">{tool.useCase}</p>
                        </div>
                      </div>

                      <Button asChild className="w-full bg-white text-black hover:bg-primary hover:text-white rounded-xl h-12 font-black uppercase tracking-widest text-[10px] mt-6 shadow-xl active:scale-[0.98] transition-all">
                        <a href={tool.url} target="_blank" rel="noopener noreferrer">
                          ACESSAR IA <ExternalLink className="ml-2 h-3 w-3" />
                        </a>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              {filteredTools.length === 0 && (
                <div className="py-20 text-center opacity-30">
                  <Bot className="h-12 w-12 mx-auto mb-4" />
                  <p className="text-xs font-black uppercase tracking-widest">Nenhuma IA nesta categoria ainda.</p>
                </div>
              )}
            </section>

            {/* Banner de Incentivo */}
            <Card className="bg-gradient-to-br from-primary/20 via-transparent to-accent/10 border-white/10 rounded-[2.5rem] overflow-hidden">
              <CardContent className="p-10 flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="space-y-2 text-center md:text-left">
                  <h3 className="text-2xl font-black italic uppercase tracking-tight">O futuro é neural</h3>
                  <p className="text-muted-foreground text-sm font-medium max-w-md">Dominar essas ferramentas hoje é o que separa os amadores dos executores de alto nível. Comece por uma e multiplique seus resultados.</p>
                </div>
                <div className="flex gap-4">
                  <div className="h-12 w-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center animate-pulse">
                    <Sparkles className="h-6 w-6 text-primary" />
                  </div>
                  <div className="h-12 w-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center animate-bounce">
                    <TrendingUp className="h-6 w-6 text-accent" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
