"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
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
  DollarSign
} from 'lucide-react';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from '@/components/AppSidebar';

const RECOMMENDED_TOOLS = [
  {
    name: "Lovable",
    desc: "Crie sites e aplicações completas apenas descrevendo o que você quer.",
    category: "Desenvolvimento",
    icon: <Globe className="h-5 w-5 text-blue-400" />,
    url: "https://lovable.dev"
  },
  {
    name: "Canva",
    desc: "Design profissional para suas redes sociais, propostas e apresentações.",
    category: "Design",
    icon: <Palette className="h-5 w-5 text-purple-400" />,
    url: "https://canva.com"
  },
  {
    name: "Zapier",
    desc: "Conecte seus leads a planilhas ou CRMs automaticamente.",
    category: "Automação",
    icon: <Zap className="h-5 w-5 text-orange-400" />,
    url: "https://zapier.com"
  },
  {
    name: "Workana",
    desc: "Encontre freelas ou ofereça seus serviços para o mundo todo.",
    category: "Freelancer",
    icon: <Briefcase className="h-5 w-5 text-green-400" />,
    url: "https://workana.com"
  },
  {
    name: "WhatsApp Web",
    desc: "A ferramenta número 1 para fechamento de contratos no Brasil.",
    category: "Comunicação",
    icon: <MessageSquare className="h-5 w-5 text-emerald-400" />,
    url: "https://web.whatsapp.com"
  }
];

export default function ToolsPage() {
  const [messagesPerDay, setMessagesPerDay] = useState(20);
  const [convRate, setConvRate] = useState(5);
  const [ticket, setTicket] = useState(500);

  const potentialEarnings = (messagesPerDay * 30 * (convRate / 100) * ticket);

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
                <Wrench className="h-4 w-4 text-primary" /> Arsenal Flow
              </h1>
            </div>
          </header>

          <div className="flex-1 container max-w-5xl mx-auto p-4 md:p-8 space-y-12">
            
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
                          type="number" 
                          value={messagesPerDay} 
                          onChange={e => setMessagesPerDay(Number(e.target.value))}
                          className="bg-white/5 border-white/10 h-14 rounded-2xl text-xl font-bold"
                        />
                      </div>
                      <div className="space-y-3">
                        <Label className="text-[10px] font-black uppercase tracking-widest opacity-70">Taxa de Conversão (%)</Label>
                        <Input 
                          type="number" 
                          value={convRate} 
                          onChange={e => setConvRate(Number(e.target.value))}
                          className="bg-white/5 border-white/10 h-14 rounded-2xl text-xl font-bold"
                        />
                      </div>
                      <div className="space-y-3">
                        <Label className="text-[10px] font-black uppercase tracking-widest opacity-70">Ticket Médio (R$)</Label>
                        <Input 
                          type="number" 
                          value={ticket} 
                          onChange={e => setTicket(Number(e.target.value))}
                          className="bg-white/5 border-white/10 h-14 rounded-2xl text-xl font-bold"
                        />
                      </div>
                    </div>

                    <div className="bg-primary/5 border border-primary/20 rounded-[2rem] p-10 text-center space-y-4 relative overflow-hidden group">
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

            {/* Ferramentas Recomendadas */}
            <section className="space-y-6 pb-20">
              <div className="space-y-1">
                <h2 className="text-2xl font-black italic uppercase tracking-tighter text-white">Ferramentas Recomendadas</h2>
                <p className="text-muted-foreground text-xs uppercase font-bold tracking-widest">O que os melhores usam para acelerar o Flow.</p>
              </div>

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {RECOMMENDED_TOOLS.map((tool, i) => (
                  <Card key={i} className="glass-card border-white/5 hover:border-primary/30 transition-all rounded-[2rem] group">
                    <CardContent className="p-8 space-y-6">
                      <div className="flex justify-between items-start">
                        <div className="p-4 bg-white/5 rounded-2xl group-hover:scale-110 transition-transform">
                          {tool.icon}
                        </div>
                        <Badge variant="outline" className="text-[8px] font-black uppercase border-white/10">{tool.category}</Badge>
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-xl font-black italic uppercase tracking-tight text-white">{tool.name}</h3>
                        <p className="text-xs text-muted-foreground font-medium leading-relaxed">{tool.desc}</p>
                      </div>
                      <Button asChild className="w-full bg-white text-black hover:bg-primary hover:text-white rounded-xl h-12 font-black uppercase tracking-widest text-[10px]">
                        <a href={tool.url} target="_blank" rel="noopener noreferrer">
                          ACESSAR FERRAMENTA <External_Link className="ml-2 h-3 w-3" />
                        </a>
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

function External_Link(props: any) {
  return <ExternalLink {...props} />
}
