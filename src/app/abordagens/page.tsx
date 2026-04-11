
"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  Send, 
  Copy, 
  Check, 
  MessageSquare, 
  User, 
  Building2, 
  Phone, 
  Zap, 
  Globe, 
  ShoppingCart, 
  Bot, 
  Instagram,
  ExternalLink,
  Smartphone,
  ChevronRight,
  MoreVertical,
  Paperclip,
  Smile
} from 'lucide-react';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from '@/components/AppSidebar';
import { useToast } from '@/hooks/use-toast';

const SCRIPTS = {
  presenca: {
    title: "Presença Digital",
    icon: <Globe className="h-4 w-4" />,
    template: (nome: string, empresa: string) => `Olá${empresa ? ' pessoal da ' + empresa : ''}! Tudo bem?\n\nMe chamo ${nome || '[Seu Nome]'} e sou especialista em posicionamento digital. Estava analisando o perfil de vocês e notei algumas oportunidades para atrair mais clientes qualificados direto pelo Google e Redes Sociais.\n\nVocês já possuem uma estratégia ativa para isso ou estariam abertos a uma sugestão rápida de melhoria?`
  },
  site: {
    title: "Site Profissional",
    icon: <Globe className="h-4 w-4" />,
    template: (nome: string, empresa: string) => `Oi! Sou o ${nome || '[Seu Nome]'}.${empresa ? ' Vi que a ' + empresa + ' ainda não tem um site otimizado para vendas.' : ' Estava pesquisando sobre o seu negócio e notei que vocês ainda não possuem um site profissional.'}\n\nHoje, 80% das pessoas pesquisam no Google antes de comprar. Eu trabalho criando Landing Pages que transformam visitantes em clientes.\n\nFaz sentido para vocês aumentarem o faturamento através de um site novo?`
  },
  automacao: {
    title: "Automação",
    icon: <Bot className="h-4 w-4" />,
    template: (nome: string, empresa: string) => `Olá! Tudo certo?\n\nNotei que o atendimento${empresa ? ' da ' + empresa : ''} pode ser muito mais rápido com automação inteligente. Eu crio sistemas que respondem seus clientes no WhatsApp 24h por dia, sem deixar ninguém esperando.\n\nIsso evita que vocês percam vendas por demora no retorno. Gostariam de ver uma demonstração de 1 minuto de como isso funciona?`
  },
  ecommerce: {
    title: "E-commerce",
    icon: <ShoppingCart className="h-4 w-4" />,
    template: (nome: string, empresa: string) => `Olá${empresa ? ' pessoal da ' + empresa : ''}! Vi os produtos de vocês e achei a qualidade incrível.\n\nVocês já pensaram em ter uma loja virtual própria para parar de depender apenas de direct ou marketplaces? Com um e-commerce vocês escalam as vendas e automatizam o estoque.\n\nPosso te mostrar como montar essa estrutura rapidamente?`
  },
  redes: {
    title: "Redes Sociais",
    icon: <Instagram className="h-4 w-4" />,
    template: (nome: string, empresa: string) => `Oi! Tudo bem? Sou o ${nome || '[Seu Nome]'}.\n\nEstava acompanhando o conteúdo${empresa ? ' da ' + empresa : ''} e vi que vocês tem um potencial enorme, mas o engajamento poderia estar 3x maior com o design e a estratégia certa.\n\nTrabalho com gestão estratégica de redes sociais focada em autoridade e vendas. Podemos bater um papo sobre como profissionalizar o perfil de vocês?`
  }
};

export default function AbordagensPage() {
  const [nome, setNome] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [empresa, setEmpresa] = useState('');
  const [selectedModel, setSelectedModel] = useState<keyof typeof SCRIPTS>('presenca');
  const [message, setMessage] = useState('');
  const [isManualMode, setIsManualMode] = useState(false);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const savedName = localStorage.getItem('flowpro_user_name');
    if (savedName) setNome(savedName);
  }, []);

  useEffect(() => {
    if (nome) localStorage.setItem('flowpro_user_name', nome);
  }, [nome]);

  useEffect(() => {
    if (!isManualMode) {
      setMessage(SCRIPTS[selectedModel].template(nome, empresa));
    }
  }, [nome, empresa, selectedModel, isManualMode]);

  const handleCopyMessage = () => {
    navigator.clipboard.writeText(message);
    setCopied(true);
    toast({ title: "Mensagem Copiada!", description: "Pronta para ser colada." });
    setTimeout(() => setCopied(false), 2000);
  };

  const openWhatsApp = () => {
    if (!whatsapp) {
      toast({ variant: "destructive", title: "Número necessário", description: "Insira o WhatsApp do lead primeiro." });
      return;
    }
    const cleanPhone = whatsapp.replace(/\D/g, '');
    const finalPhone = cleanPhone.length <= 11 ? `55${cleanPhone}` : cleanPhone;
    const encodedMsg = encodeURIComponent(message);
    window.open(`https://wa.me/${finalPhone}?text=${encodedMsg}`, '_blank');
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-[#050508] relative overflow-hidden">
        {/* Background Atmosphere */}
        <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-green-500/5 rounded-full blur-[150px]"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px]"></div>
        </div>

        <AppSidebar />
        
        <main className="flex-1 flex flex-col min-w-0 relative z-10">
          <header className="h-16 border-b border-white/5 flex items-center justify-between px-6 bg-[#050508]/80 backdrop-blur-md sticky top-0 z-50">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="text-muted-foreground hover:text-white" />
              <div className="h-4 w-px bg-white/10 hidden md:block" />
              <h1 className="text-sm font-black italic uppercase tracking-widest flex items-center gap-2">
                <MessageSquare className="h-4 w-4 text-primary" /> Flow Simulator
              </h1>
            </div>
            <Badge variant="outline" className="bg-primary/10 border-primary/30 text-primary text-[8px] font-black uppercase px-3 py-1">
              Engenharia de Conversão
            </Badge>
          </header>

          <div className="flex-1 container max-w-6xl mx-auto p-4 md:p-8 space-y-8">
            <div className="flex flex-col lg:grid lg:grid-cols-12 gap-8 items-start">
              
              {/* Coluna de Inputs (Esquerda) */}
              <div className="lg:col-span-5 space-y-6 w-full">
                
                <div className="space-y-4">
                  <Card className="glass-card border-white/5 rounded-2xl bg-[#0e0e1a]/50 backdrop-blur-sm">
                    <CardContent className="p-6 space-y-4">
                      <div className="space-y-2">
                        <Label className="text-[9px] font-black uppercase tracking-widest opacity-50 flex items-center gap-2">
                          <User className="h-3 w-3 text-primary" /> Identificação do Remetente
                        </Label>
                        <Input 
                          placeholder="Seu Nome" 
                          className="bg-white/5 border-white/10 h-12 rounded-xl focus-visible:ring-primary text-sm font-medium"
                          value={nome}
                          onChange={(e) => setNome(e.target.value)}
                        />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="glass-card border-white/5 rounded-2xl bg-[#0e0e1a]/50 backdrop-blur-sm">
                    <CardContent className="p-6 space-y-4">
                      <div className="space-y-2">
                        <Label className="text-[9px] font-black uppercase tracking-widest opacity-50 flex items-center gap-2">
                          <Phone className="h-3 w-3 text-primary" /> Coordenadas do Alvo
                        </Label>
                        <Input 
                          placeholder="WhatsApp do Lead (DDD + Número)" 
                          className="bg-white/5 border-white/10 h-12 rounded-xl focus-visible:ring-primary text-sm font-medium"
                          value={whatsapp}
                          onChange={(e) => setWhatsapp(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-[9px] font-black uppercase tracking-widest opacity-50 flex items-center gap-2">
                          <Building2 className="h-3 w-3 text-primary" /> Nome do Negócio
                        </Label>
                        <Input 
                          placeholder="Empresa do Cliente (Opcional)" 
                          className="bg-white/5 border-white/10 h-12 rounded-xl focus-visible:ring-primary text-sm font-medium"
                          value={empresa}
                          onChange={(e) => setEmpresa(e.target.value)}
                        />
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="space-y-3">
                  <Label className="text-[9px] font-black uppercase tracking-widest opacity-50 ml-2">Diretriz da Abordagem</Label>
                  <div className="grid grid-cols-1 gap-2">
                    {Object.entries(SCRIPTS).map(([key, model]) => (
                      <button
                        key={key}
                        onClick={() => {
                          setSelectedModel(key as any);
                          setIsManualMode(false);
                        }}
                        className={`flex items-center justify-between p-4 rounded-xl border text-left transition-all duration-300 ${
                          selectedModel === key && !isManualMode
                          ? 'bg-primary/10 border-primary text-white shadow-[0_0_20px_rgba(124,58,255,0.2)]' 
                          : 'bg-white/[0.02] border-white/5 text-muted-foreground hover:bg-white/5'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg ${selectedModel === key && !isManualMode ? 'bg-primary text-white' : 'bg-white/5'}`}>
                            {model.icon}
                          </div>
                          <span className="text-[10px] font-black uppercase italic tracking-wider">{model.title}</span>
                        </div>
                        {selectedModel === key && !isManualMode && <div className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />}
                      </button>
                    ))}
                  </div>
                </div>

                <Button 
                  onClick={() => setIsManualMode(true)}
                  className="w-full h-14 bg-primary/10 hover:bg-primary/20 text-primary border border-primary/30 rounded-xl font-black uppercase tracking-widest text-[10px] shadow-lg shadow-primary/5 transition-all active:scale-[0.98]"
                >
                  <Zap className="h-4 w-4 mr-2" /> REFINAR SCRIPT MANUALMENTE
                </Button>
              </div>

              {/* Coluna de Preview (Direita) */}
              <div className="lg:col-span-7 flex flex-col items-center gap-8 w-full">
                
                {/* FLOW SIMULATOR (Smartphone Mockup) */}
                <div className="relative group">
                  {/* Smartphone Frame */}
                  <div className="w-[300px] h-[600px] md:w-[340px] md:h-[680px] bg-[#121214] rounded-[3rem] border-[8px] border-[#222] shadow-[0_40px_100px_rgba(0,0,0,0.8)] relative overflow-hidden flex flex-col">
                    
                    {/* Notch */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-[#222] rounded-b-2xl z-20" />
                    
                    {/* Chat Header */}
                    <div className="h-20 bg-[#1a1a1e] border-b border-white/5 pt-8 px-6 flex items-center gap-3 shrink-0">
                      <div className="h-10 w-10 rounded-full bg-white/10 border border-white/5 flex items-center justify-center overflow-hidden">
                        <User className="h-6 w-6 text-white/20" />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs font-bold text-white/90 truncate">{empresa || '[Nome do Lead]'}</p>
                        <p className="text-[8px] font-bold text-green-500 uppercase tracking-widest">Online agora</p>
                      </div>
                      <MoreVertical className="h-4 w-4 text-white/30" />
                    </div>

                    {/* Chat Area */}
                    <div className="flex-1 p-4 bg-[#0a0a0c] space-y-4 overflow-y-auto no-scrollbar">
                      <div className="flex justify-start">
                        <div className="max-w-[85%] p-4 rounded-2xl rounded-tl-none bg-[#1a1a1e] border border-white/5 shadow-xl relative animate-in fade-in slide-in-from-bottom-2">
                          <p className="text-[11px] leading-relaxed text-white/80 whitespace-pre-wrap italic font-medium">
                            {message.split('\n').map((line, i) => (
                              <span key={i}>
                                {line.includes('[Seu Nome]') ? (
                                  <span className="text-primary font-black not-italic">[Seu Nome]</span>
                                ) : line}
                                <br />
                              </span>
                            ))}
                          </p>
                          <span className="text-[7px] text-white/20 uppercase font-black absolute bottom-2 right-3">14:32 ✓✓</span>
                        </div>
                      </div>
                    </div>

                    {/* Chat Input Bar */}
                    <div className="h-16 bg-[#1a1a1e] border-t border-white/5 px-4 flex items-center gap-3 shrink-0">
                      <Smile className="h-5 w-5 text-white/20" />
                      <div className="flex-1 bg-white/5 h-10 rounded-full border border-white/5 flex items-center px-4">
                        <span className="text-[10px] text-white/20">Mensagem...</span>
                      </div>
                      <div className="h-10 w-10 rounded-full bg-green-600 flex items-center justify-center shadow-lg shadow-green-600/20">
                        <Send className="h-4 w-4 text-white fill-white" />
                      </div>
                    </div>
                  </div>

                  {/* Reflection Effect */}
                  <div className="absolute inset-0 rounded-[3rem] bg-gradient-to-tr from-white/[0.02] to-transparent pointer-events-none" />
                </div>

                {/* Manual Editor & Actions */}
                <div className="w-full max-w-xl space-y-6">
                  {isManualMode && (
                    <Card className="glass-card border-primary/20 bg-black/40 rounded-2xl overflow-hidden animate-in fade-in slide-in-from-top-2">
                      <CardHeader className="p-4 border-b border-white/5 flex flex-row items-center justify-between">
                        <CardTitle className="text-[10px] font-black uppercase tracking-widest text-primary italic">Refino Tático</CardTitle>
                        <Button variant="ghost" size="sm" onClick={() => setIsManualMode(false)} className="h-6 px-2 text-[8px] font-black uppercase tracking-widest opacity-50">Resetar Automático</Button>
                      </CardHeader>
                      <CardContent className="p-4">
                        <Textarea 
                          className="bg-transparent border-none text-white/90 italic text-sm p-0 min-h-[120px] focus-visible:ring-0 resize-none leading-relaxed"
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                        />
                      </CardContent>
                    </Card>
                  )}

                  <div className="space-y-4">
                    <Button 
                      onClick={openWhatsApp}
                      className="w-full h-20 bg-green-600 hover:bg-green-500 text-white rounded-[2rem] font-black uppercase tracking-widest text-lg shadow-[0_15px_40px_rgba(22,163,74,0.3)] transition-all active:scale-[0.98] group relative overflow-hidden"
                    >
                      <span className="flex items-center gap-3 relative z-10">
                        ABRIR NO WHATSAPP <ExternalLink className="h-6 w-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      </span>
                      <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 skew-x-12" />
                    </Button>

                    <div className="flex gap-3">
                      <Button 
                        variant="outline"
                        onClick={handleCopyMessage}
                        className="flex-1 h-12 rounded-xl border-white/10 font-black uppercase text-[10px] tracking-widest gap-2 hover:bg-white/5"
                      >
                        {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                        {copied ? 'COPIADO' : 'COPIAR SCRIPT'}
                      </Button>
                      <Button 
                        variant="outline"
                        className="h-12 w-12 rounded-xl border-white/10 hover:bg-white/5"
                      >
                        <Smartphone className="h-4 w-4 opacity-50" />
                      </Button>
                    </div>
                  </div>

                  <p className="text-[8px] text-center text-muted-foreground uppercase font-black tracking-[0.4em] opacity-40">
                    Certifique-se de que o número está correto com o DDD
                  </p>
                </div>

              </div>

            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
