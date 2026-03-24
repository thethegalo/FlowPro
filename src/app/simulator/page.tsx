"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  User, 
  Bot, 
  Send, 
  Loader2, 
  RotateCcw, 
  MessageSquare,
  Sparkles,
  Zap,
  Target
} from 'lucide-react';
import { simulateCustomerResponse } from '@/ai/flows/simulate-customer-response';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from '@/components/AppSidebar';
import { useToast } from '@/hooks/use-toast';

type ChatMsg = {
  role: 'user' | 'customer';
  content: string;
  analysis?: string;
};

export default function SimulatorPage() {
  const [messages, setMessages] = useState<ChatMsg[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [personality, setPersonality] = useState<'skeptical' | 'busy' | 'interested' | 'rude'>('skeptical');
  const { toast } = useToast();

  const handleSimulate = async () => {
    if (!input.trim() || isLoading) return;
    
    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsLoading(true);

    try {
      const res = await simulateCustomerResponse({
        userMessage: userMsg,
        personality
      });

      setMessages(prev => [...prev, { 
        role: 'customer', 
        content: res.customerResponse,
        analysis: res.analysis
      }]);
    } catch (e) {
      toast({ variant: "destructive", title: "Erro na simulação" });
    } finally {
      setIsLoading(false);
    }
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
                <Target className="h-4 w-4 text-primary" /> Simulador de Objeções
              </h1>
            </div>
          </header>

          <div className="flex-1 container max-w-4xl mx-auto p-4 md:p-8 space-y-8 flex flex-col">
            <div className="space-y-1">
              <h2 className="text-2xl font-black italic uppercase tracking-tighter text-white">Campo de Treinamento</h2>
              <p className="text-muted-foreground text-xs uppercase font-bold tracking-widest">Pratique sua abordagem antes de falar com o cliente real.</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {[
                { id: 'skeptical', label: 'Desconfiado', icon: '🤨' },
                { id: 'busy', label: 'Ocupado', icon: '⏳' },
                { id: 'interested', label: 'Curioso', icon: '🤔' },
                { id: 'rude', label: 'Grosseiro', icon: '😠' },
              ].map(p => (
                <Button 
                  key={p.id}
                  variant={personality === p.id ? "default" : "outline"}
                  onClick={() => setPersonality(p.id as any)}
                  className={`rounded-xl text-[9px] font-black uppercase tracking-widest h-12 transition-all ${personality === p.id ? 'bg-primary border-primary' : 'border-white/10'}`}
                >
                  <span className="mr-2 text-base">{p.icon}</span> {p.label}
                </Button>
              ))}
            </div>

            <Card className="flex-1 glass-card border-white/5 rounded-[2rem] overflow-hidden flex flex-col min-h-[500px]">
              <div className="flex-1 p-6 overflow-y-auto space-y-6">
                {messages.length === 0 && (
                  <div className="h-full flex flex-col items-center justify-center text-center opacity-30 space-y-4">
                    <MessageSquare className="h-12 w-12" />
                    <p className="text-[10px] font-black uppercase tracking-[0.3em]">Envie sua primeira abordagem para começar</p>
                  </div>
                )}
                {messages.map((m, i) => (
                  <div key={i} className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'} space-y-2 animate-in fade-in slide-in-from-bottom-2`}>
                    <div className={`max-w-[85%] p-5 rounded-2xl text-sm font-medium ${m.role === 'user' ? 'bg-primary text-white rounded-tr-none' : 'bg-white/5 border border-white/10 text-white rounded-tl-none'}`}>
                      {m.content}
                    </div>
                    {m.analysis && (
                      <div className="max-w-[85%] p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-xl">
                        <p className="text-[9px] font-black uppercase text-yellow-500 tracking-widest mb-1 flex items-center gap-1">
                          <Sparkles className="h-3 w-3" /> Análise do Mentor
                        </p>
                        <p className="text-[11px] text-white/70 italic font-medium leading-relaxed">{m.analysis}</p>
                      </div>
                    )}
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-white/5 p-5 rounded-2xl rounded-tl-none flex items-center gap-3 border border-white/10 animate-pulse">
                      <Loader2 className="h-4 w-4 animate-spin text-primary" />
                      <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Cliente digitando...</span>
                    </div>
                  </div>
                )}
              </div>

              <div className="p-6 border-t border-white/5 bg-white/[0.02]">
                <div className="flex gap-3">
                  <Textarea 
                    placeholder="Escreva sua abordagem aqui..." 
                    className="flex-1 bg-white/5 border-white/10 rounded-2xl focus-visible:ring-primary min-h-[100px]"
                    value={input}
                    onChange={e => setInput(e.target.value)}
                  />
                  <div className="flex flex-col gap-2">
                    <Button onClick={handleSimulate} disabled={isLoading || !input.trim()} className="h-12 w-12 rounded-xl bg-primary shadow-lg shadow-primary/30">
                      <Send className="h-5 w-5" />
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => setMessages([])}
                      className="h-12 w-12 rounded-xl border-white/10 hover:bg-white/5"
                    >
                      <RotateCcw className="h-5 w-5 text-muted-foreground" />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
