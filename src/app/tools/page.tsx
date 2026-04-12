"use client";

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Wrench, 
  ExternalLink, 
  TrendingUp, 
  Globe, 
  Zap, 
  MessageSquare, 
  DollarSign,
  BookOpen,
  Layout,
  Bell,
  Menu
} from 'lucide-react';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from '@/components/AppSidebar';
import { cn } from '@/lib/utils';

const CATEGORIES = [
  { id: 'all', label: 'Todas', icon: <Wrench className="h-4 w-4" /> },
  { id: 'money', label: 'Renda', icon: <DollarSign className="h-4 w-4" /> },
  { id: 'org', label: 'Gestão', icon: <Layout className="h-4 w-4" /> },
  { id: 'auto', label: 'Fluxo', icon: <Zap className="h-4 w-4" /> },
];

const TOOLS = [
  { name: "Lovable", desc: "Crie apps apenas descrevendo o que você quer.", when: "Para Landing Pages ou MVPs rápidos.", category: "money", icon: <Globe className="h-5 w-5 text-blue-400" />, url: "https://lovable.dev" },
  { name: "Notion", desc: "Workspace tudo-em-um para notas e bancos de dados.", when: "Para centralizar sua estratégia.", category: "org", icon: <BookOpen className="h-5 w-5 text-white" />, url: "https://notion.so" },
  { name: "Zapier", desc: "Conecte apps e automatize fluxos sem código.", when: "Integrar leads com seu CRM.", category: "auto", icon: <Zap className="h-5 w-5 text-orange-400" />, url: "https://zapier.com" },
  { name: "WhatsApp Web", desc: "Mensageiro oficial para prospecção direta.", when: "A ferramenta obrigatória para fechar vendas.", category: "money", icon: <MessageSquare className="h-5 w-5 text-emerald-400" />, url: "https://web.whatsapp.com" },
];

export default function ToolsPage() {
  const [messagesPerDay, setMessagesPerDay] = useState("20");
  const [convRate, setConvRate] = useState("5");
  const [ticket, setTicket] = useState("500");
  const [activeCategory, setActiveCategory] = useState('all');

  const potentialEarnings = (Number(messagesPerDay || 0) * 30 * (Number(convRate || 0) / 100) * Number(ticket || 0));
  const filteredTools = activeCategory === 'all' ? TOOLS : TOOLS.filter(t => t.category === activeCategory);

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-transparent relative z-10">
        <AppSidebar />
        <main className="flex-1 flex flex-col min-w-0 bg-transparent">
          <header className="h-[52px] border-b border-white/5 flex items-center justify-between px-6 bg-transparent sticky top-0 z-50">
            <div className="flex items-center gap-3">
              <SidebarTrigger className="md:hidden">
                <Menu className="h-5 w-5 text-white/50" />
              </SidebarTrigger>
              <Wrench className="h-[14px] w-[14px] text-primary/70" />
              <h1 className="text-[13px] font-medium text-white/50">Arsenal de Inteligência</h1>
            </div>
            <div className="flex items-center gap-4">
              <Bell className="h-4 w-4 text-white/20" />
              <div className="bg-[#581c87]/40 border border-[#7c3aed]/30 text-[#c4b5fd] text-[11px] font-medium rounded-[6px] px-[10px] py-[4px] uppercase tracking-[0.5px]">
                VITALÍCIO
              </div>
            </div>
          </header>

          <div className="flex-1 container max-w-6xl mx-auto p-6 md:p-8 space-y-12">
            <section className="space-y-6">
              <h2 className="text-xl font-semibold text-white tracking-tight">Calculadora de Potencial</h2>
              <Card className="glass-card overflow-hidden">
                <CardContent className="p-0 flex flex-col md:flex-row">
                  <div className="flex-1 p-8 md:p-10 space-y-6">
                    <div className="space-y-2">
                      <Label className="text-[10px] font-black uppercase tracking-widest text-white/30">Envios Diários</Label>
                      <Input type="number" value={messagesPerDay} onChange={e => setMessagesPerDay(e.target.value)} className="h-12 bg-white/[0.04] border-white/10 rounded-xl text-base" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-[10px] font-black uppercase tracking-widest text-white/30">Conversão (%)</Label>
                        <Input type="number" value={convRate} onChange={e => setConvRate(e.target.value)} className="h-12 bg-white/[0.04] border-white/10 rounded-xl text-base" />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-[10px] font-black uppercase tracking-widest text-white/30">Ticket Médio</Label>
                        <Input type="number" value={ticket} onChange={e => setTicket(e.target.value)} className="h-12 bg-white/[0.04] border-white/10 rounded-xl text-base" />
                      </div>
                    </div>
                  </div>
                  <div className="w-full md:w-72 bg-primary/5 md:border-l border-white/5 p-10 flex flex-col items-center justify-center text-center space-y-2">
                    <TrendingUp className="h-8 w-8 text-primary opacity-40 mb-2" />
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Potencial Mensal</p>
                    <div className="text-3xl md:text-4xl font-black italic text-white tracking-tighter">R$ {potentialEarnings.toLocaleString('pt-BR')}</div>
                    <p className="text-[9px] text-white/20 uppercase font-bold">Estimativa baseada em 30 dias</p>
                  </div>
                </CardContent>
              </Card>
            </section>

            <section className="space-y-8 pb-32">
              <div className="flex overflow-x-auto pb-4 gap-2 no-scrollbar">
                {CATEGORIES.map((cat) => (
                  <Button key={cat.id} variant={activeCategory === cat.id ? "default" : "outline"} onClick={() => setActiveCategory(cat.id)} className={cn("rounded-xl text-[10px] font-black uppercase tracking-widest h-11 px-6 transition-all shrink-0", activeCategory === cat.id ? "bg-primary border-primary shadow-lg shadow-primary/20" : "bg-white/[0.04] border-white/5")}>
                    <span className="mr-2">{cat.icon}</span> {cat.label}
                  </Button>
                ))}
              </div>

              <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {filteredTools.map((tool, i) => (
                  <Card key={i} className="glass-card group flex flex-col hover:border-primary/30 transition-all">
                    <CardContent className="p-8 space-y-6 flex-1 flex flex-col">
                      <div className="p-4 bg-white/5 rounded-2xl w-fit group-hover:scale-110 transition-transform">
                        {tool.icon}
                      </div>
                      <div className="space-y-4 flex-1">
                        <div className="space-y-1">
                          <h3 className="text-lg font-bold text-white uppercase italic tracking-tight">{tool.name}</h3>
                          <p className="text-xs text-white/40 font-medium leading-relaxed">{tool.desc}</p>
                        </div>
                        <div className="bg-white/[0.02] border border-white/5 rounded-xl p-4">
                          <p className="text-[8px] font-black uppercase text-primary tracking-widest mb-1">Aplicação Operacional:</p>
                          <p className="text-[10px] text-white/60 font-bold italic">{tool.when}</p>
                        </div>
                      </div>
                      <Button asChild className="w-full h-12 rounded-xl bg-white text-black hover:bg-primary hover:text-white font-black uppercase tracking-widest text-[10px] mt-4">
                        <a href={tool.url} target="_blank" rel="noopener noreferrer">Acessar <ExternalLink className="ml-2 h-3 w-3" /></a>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}