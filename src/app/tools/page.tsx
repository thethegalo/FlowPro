
"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Wrench, 
  ExternalLink, 
  Calculator, 
  TrendingUp, 
  Globe, 
  Palette, 
  Zap, 
  MessageSquare, 
  Briefcase,
  DollarSign,
  BookOpen,
  Layout,
  Receipt,
  CreditCard,
  Target,
  Video,
  Timer,
  Activity,
  HardDrive,
  Package,
  Share2,
  Mail,
  Slack as SlackIcon
} from 'lucide-react';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from '@/components/AppSidebar';

const CATEGORIES = [
  { id: 'all', label: 'Todas', icon: <Wrench className="h-4 w-4" /> },
  { id: 'money', label: 'Ganhar Dinheiro', icon: <DollarSign className="h-4 w-4" /> },
  { id: 'org', label: 'Organização', icon: <Layout className="h-4 w-4" /> },
  { id: 'comm', label: 'Comunicação', icon: <MessageSquare className="h-4 w-4" /> },
  { id: 'mkt', label: 'Marketing', icon: <Target className="h-4 w-4" /> },
  { id: 'auto', label: 'Automação', icon: <Zap className="h-4 w-4" /> },
  { id: 'fin', label: 'Financeiro', icon: <Receipt className="h-4 w-4" /> },
];

const TOOLS = [
  // GANHAR DINHEIRO
  {
    name: "Lovable",
    desc: "Crie sites e aplicações completas apenas descrevendo o que você quer.",
    when: "Quando precisar criar uma Landing Page ou MVP rápido.",
    category: "money",
    icon: <Globe className="h-5 w-5 text-blue-400" />,
    url: "https://lovable.dev"
  },
  {
    name: "Workana",
    desc: "Plataforma líder para contratar ou oferecer serviços freelance.",
    when: "Quando quiser delegar tarefas ou fazer renda extra como freela.",
    category: "money",
    icon: <Briefcase className="h-5 w-5 text-green-400" />,
    url: "https://workana.com"
  },
  {
    name: "Beehiiv",
    desc: "A plataforma mais poderosa para criar e monetizar newsletters.",
    when: "Quando quiser criar uma audiência própria e vender via e-mail.",
    category: "money",
    icon: <Mail className="h-5 w-5 text-orange-400" />,
    url: "https://beehiiv.com"
  },
  
  // ORGANIZAÇÃO
  {
    name: "Notion",
    desc: "Workspace tudo-em-um para notas, tarefas e bancos de dados.",
    when: "Para centralizar toda a estratégia e documentos do seu negócio.",
    category: "org",
    icon: <BookOpen className="h-5 w-5 text-white" />,
    url: "https://notion.so"
  },
  {
    name: "Trello",
    desc: "Gerenciamento de projetos baseado em cartões e colunas (Kanban).",
    when: "Para organizar seu fluxo de prospecção e funil de vendas visualmente.",
    category: "org",
    icon: <Layout className="h-5 w-5 text-blue-500" />,
    url: "https://trello.com"
  },
  {
    name: "Toggl Track",
    desc: "Ferramenta simples e poderosa de rastreamento de tempo.",
    when: "Quando precisar saber exatamente quanto tempo gasta em cada tarefa.",
    category: "org",
    icon: <Timer className="h-5 w-5 text-pink-500" />,
    url: "https://toggl.com/track/"
  },
  {
    name: "Google Drive",
    desc: "Armazenamento em nuvem e ferramentas de colaboração.",
    when: "Para salvar arquivos, contratos e apresentações com segurança.",
    category: "org",
    icon: <HardDrive className="h-5 w-5 text-yellow-500" />,
    url: "https://drive.google.com"
  },
  {
    name: "Dropbox",
    desc: "Sincronização de arquivos e backup inteligente.",
    when: "Para compartilhar arquivos pesados com clientes de forma profissional.",
    category: "org",
    icon: <Package className="h-5 w-5 text-blue-400" />,
    url: "https://dropbox.com"
  },
  {
    name: "RescueTime",
    desc: "Software que monitora sua produtividade digital automaticamente.",
    when: "Para identificar distrações e focar no que realmente traz dinheiro.",
    category: "org",
    icon: <Activity className="h-5 w-5 text-blue-600" />,
    url: "https://rescuetime.com"
  },

  // COMUNICAÇÃO
  {
    name: "WhatsApp Web",
    desc: "Versão para navegador do aplicativo de mensagens mais usado do mundo.",
    when: "A ferramenta obrigatória para fechar vendas e fazer suporte.",
    category: "comm",
    icon: <MessageSquare className="h-5 w-5 text-emerald-400" />,
    url: "https://web.whatsapp.com"
  },
  {
    name: "Slack",
    desc: "Plataforma de comunicação para equipes e comunidades.",
    when: "Para separar a conversa de trabalho do WhatsApp pessoal.",
    category: "comm",
    icon: <SlackIcon className="h-5 w-5 text-purple-400" />,
    url: "https://slack.com"
  },
  {
    name: "Zoom",
    desc: "Líder em videochamadas e reuniões online.",
    when: "Para fazer reuniões de fechamento e apresentações de propostas.",
    category: "comm",
    icon: <Video className="h-5 w-5 text-blue-400" />,
    url: "https://zoom.us"
  },

  // MARKETING
  {
    name: "Canva",
    desc: "Design gráfico simplificado para não designers.",
    when: "Para criar criativos de anúncios, posts e identidade visual.",
    category: "mkt",
    icon: <Palette className="h-5 w-5 text-purple-400" />,
    url: "https://canva.com"
  },
  {
    name: "HubSpot",
    desc: "CRM gratuito e ferramentas de automação de marketing.",
    when: "Para gerenciar leads e automatizar o envio de e-mails de marketing.",
    category: "mkt",
    icon: <Target className="h-5 w-5 text-orange-500" />,
    url: "https://hubspot.com"
  },
  {
    name: "Semrush",
    desc: "Ferramenta completa de SEO e análise de concorrência.",
    when: "Para descobrir o que seus concorrentes estão fazendo no Google.",
    category: "mkt",
    icon: <TrendingUp className="h-5 w-5 text-orange-600" />,
    url: "https://semrush.com"
  },

  // AUTOMAÇÃO
  {
    name: "Zapier",
    desc: "Conecte aplicativos e automatize fluxos de trabalho sem código.",
    when: "Para integrar o Radar de Leads com seu CRM ou Planilha.",
    category: "auto",
    icon: <Zap className="h-5 w-5 text-orange-400" />,
    url: "https://zapier.com"
  },
  {
    name: "Make",
    desc: "Automação visual avançada com possibilidades infinitas.",
    when: "Quando o Zapier for limitado para o que você precisa construir.",
    category: "auto",
    icon: <Share2 className="h-5 w-5 text-purple-500" />,
    url: "https://make.com"
  },

  // FINANCEIRO
  {
    name: "FreshBooks",
    desc: "Software de faturamento e contabilidade para pequenos negócios.",
    when: "Para enviar faturas profissionais e gerenciar despesas.",
    category: "fin",
    icon: <Receipt className="h-5 w-5 text-blue-500" />,
    url: "https://freshbooks.com"
  },
  {
    name: "Wave",
    desc: "Contabilidade e faturamento gratuito para freelancers.",
    when: "Se você está começando e precisa de gestão financeira custo zero.",
    category: "fin",
    icon: <CreditCard className="h-5 w-5 text-emerald-500" />,
    url: "https://waveapps.com"
  }
];

export default function ToolsPage() {
  const [messagesPerDay, setMessagesPerDay] = useState("20");
  const [convRate, setConvRate] = useState("5");
  const [ticket, setTicket] = useState("500");
  const [activeCategory, setActiveCategory] = useState('all');

  const potentialEarnings = (Number(messagesPerDay || 0) * 30 * (Number(convRate || 0) / 100) * Number(ticket || 0));

  const filteredTools = activeCategory === 'all' 
    ? TOOLS 
    : TOOLS.filter(t => t.category === activeCategory);

  const handleInputChange = (setter: (v: string) => void, value: string) => {
    const cleaned = value.replace(/\D/g, '').replace(/^0+/, '');
    setter(cleaned);
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-[#050508] relative overflow-hidden">
        {/* Background Animado com Partículas */}
        <div className="fixed inset-0 pointer-events-none z-0">
          {[...Array(12)].map((_, i) => (
            <span 
              key={i}
              className="absolute rounded-full bg-primary/10 blur-xl animate-pulse"
              style={{
                width: `${Math.random() * 300 + 100}px`,
                height: `${Math.random() * 300 + 100}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${Math.random() * 10 + 5}s`
              }}
            />
          ))}
        </div>

        <AppSidebar />
        
        <main className="flex-1 flex flex-col min-w-0 relative z-10">
          <header className="h-16 border-b border-white/5 flex items-center justify-between px-6 bg-[#050508]/80 backdrop-blur-md sticky top-0 z-50">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="text-muted-foreground hover:text-white" />
              <div className="h-4 w-px bg-white/10 hidden md:block" />
              <h1 className="text-sm font-black italic uppercase tracking-widest flex items-center gap-2">
                <Wrench className="h-4 w-4 text-primary" /> Arsenal Flow
              </h1>
            </div>
          </header>

          <div className="flex-1 container max-w-6xl mx-auto p-4 md:p-8 space-y-12">
            
            {/* Calculadora de Ganhos */}
            <section className="space-y-6">
              <div className="space-y-1">
                <h2 className="text-2xl font-black italic uppercase tracking-tighter text-white">Calculadora de Potencial</h2>
                <p className="text-muted-foreground text-xs uppercase font-bold tracking-widest">Projete seu faturamento com base na sua execução.</p>
              </div>
              
              <Card className="glass-card border-primary/20 overflow-hidden rounded-[2.5rem]">
                <CardContent className="p-8 md:p-12">
                  <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                      <div className="space-y-3">
                        <Label className="text-[10px] font-black uppercase tracking-widest opacity-70">Mensagens Enviadas p/ Dia</Label>
                        <Input 
                          type="text" 
                          inputMode="numeric"
                          value={messagesPerDay} 
                          onChange={e => handleInputChange(setMessagesPerDay, e.target.value)}
                          className="bg-white/5 border-white/10 h-14 rounded-2xl text-xl font-bold"
                          placeholder="0"
                        />
                      </div>
                      <div className="space-y-3">
                        <Label className="text-[10px] font-black uppercase tracking-widest opacity-70">Taxa de Conversão (%)</Label>
                        <Input 
                          type="text" 
                          inputMode="numeric"
                          value={convRate} 
                          onChange={e => handleInputChange(setConvRate, e.target.value)}
                          className="bg-white/5 border-white/10 h-14 rounded-2xl text-xl font-bold"
                          placeholder="0"
                        />
                      </div>
                      <div className="space-y-3">
                        <Label className="text-[10px] font-black uppercase tracking-widest opacity-70">Ticket Médio (R$)</Label>
                        <Input 
                          type="text" 
                          inputMode="numeric"
                          value={ticket} 
                          onChange={e => handleInputChange(setTicket, e.target.value)}
                          className="bg-white/5 border-white/10 h-14 rounded-2xl text-xl font-bold"
                          placeholder="0"
                        />
                      </div>
                    </div>

                    <div className="bg-primary/5 border border-primary/20 rounded-[2rem] p-10 text-center space-y-4 relative overflow-hidden group shadow-[0_0_80px_rgba(124,58,255,0.3)]">
                      <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full -z-10 animate-pulse" />
                      <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:scale-110 transition-transform">
                        <TrendingUp className="h-24 w-24 text-primary" />
                      </div>
                      <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Potencial Mensal Estimado</p>
                      <div className="text-5xl md:text-6xl font-black italic tracking-tighter text-white">
                        R$ {potentialEarnings.toLocaleString('pt-BR')}
                      </div>
                      <p className="text-[9px] font-bold text-muted-foreground uppercase leading-relaxed max-w-[200px] mx-auto">
                        Baseado em 30 dias de execução constante.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Hub de Ferramentas */}
            <section className="space-y-8 pb-20">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                <div className="space-y-1">
                  <h2 className="text-2xl font-black italic uppercase tracking-tighter text-white">Hub de Ferramentas</h2>
                  <p className="text-muted-foreground text-xs uppercase font-bold tracking-widest">O ecossistema perfeito para sua escala.</p>
                </div>
              </div>

              <div className="flex overflow-x-auto pb-4 gap-2 no-scrollbar">
                {CATEGORIES.map((cat) => (
                  <Button
                    key={cat.id}
                    variant={activeCategory === cat.id ? "default" : "outline"}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`rounded-xl text-[9px] font-black uppercase tracking-widest h-11 px-6 whitespace-nowrap transition-all ${
                      activeCategory === cat.id 
                      ? 'bg-primary border-primary shadow-[0_0_20px_rgba(124,58,255,0.4)]' 
                      : 'border-white/10 hover:bg-white/5'
                    }`}
                  >
                    <span className="mr-2">{cat.icon}</span>
                    {cat.label}
                  </Button>
                ))}
              </div>

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredTools.map((tool, i) => (
                  <Card 
                    key={i} 
                    className="glass-card border-white/5 hover:border-primary/30 transition-all rounded-[2rem] group flex flex-col h-full relative overflow-hidden before:absolute before:top-0 before:left-0 before:right-0 before:h-[2px] before:bg-gradient-to-r before:from-primary before:via-accent before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity"
                  >
                    <CardContent className="p-8 space-y-6 flex-1 flex flex-col">
                      <div className="flex justify-between items-start">
                        <div className="p-4 bg-white/5 rounded-2xl group-hover:scale-110 transition-transform border border-white/5 shadow-xl">
                          {tool.icon}
                        </div>
                        <Badge variant="outline" className="text-[8px] font-black uppercase border-white/10 bg-white/5">
                          {CATEGORIES.find(c => c.id === tool.category)?.label}
                        </Badge>
                      </div>
                      
                      <div className="space-y-4 flex-1">
                        <div className="space-y-2">
                          <h3 className="text-xl font-black italic uppercase tracking-tight text-white">{tool.name}</h3>
                          <p className="text-xs text-muted-foreground font-medium leading-relaxed">{tool.desc}</p>
                        </div>
                        
                        <div className="bg-white/[0.02] border border-white/5 rounded-xl p-4">
                          <p className="text-[8px] font-black uppercase text-primary tracking-widest mb-1">Quando usar:</p>
                          <p className="text-[10px] text-white/70 font-medium italic">{tool.when}</p>
                        </div>
                      </div>

                      <Button asChild className="w-full bg-white text-black hover:bg-primary hover:text-white rounded-xl h-12 font-black uppercase tracking-widest text-[10px] mt-6 shadow-xl active:scale-[0.98] transition-all">
                        <a href={tool.url} target="_blank" rel="noopener noreferrer">
                          ACESSAR FERRAMENTA <ExternalLink className="ml-2 h-3 w-3" />
                        </a>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              {filteredTools.length === 0 && (
                <div className="py-20 text-center opacity-30">
                  <Wrench className="h-12 w-12 mx-auto mb-4" />
                  <p className="text-xs font-black uppercase tracking-widest">Nenhuma ferramenta nesta categoria ainda.</p>
                </div>
              )}
            </section>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
