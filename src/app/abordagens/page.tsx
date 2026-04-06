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
  ExternalLink
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
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  // Carregar nome do localStorage
  useEffect(() => {
    const savedName = localStorage.getItem('flowpro_user_name');
    if (savedName) setNome(savedName);
  }, []);

  // Salvar nome no localStorage
  useEffect(() => {
    if (nome) localStorage.setItem('flowpro_user_name', nome);
  }, [nome]);

  // Atualizar mensagem quando campos ou modelo mudarem
  useEffect(() => {
    setMessage(SCRIPTS[selectedModel].template(nome, empresa));
  }, [nome, empresa, selectedModel]);

  const handleCopyMessage = () => {
    navigator.clipboard.writeText(message);
    setCopied(true);
    toast({ title: "Mensagem Copiada!", description: "Agora é só colar no WhatsApp." });
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyPhone = () => {
    if (!whatsapp) return;
    navigator.clipboard.writeText(whatsapp);
    toast({ title: "Número Copiado!" });
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
      <div className="flex min-h-screen w-full bg-[#050508]">
        <AppSidebar />
        
        <main className="flex-1 flex flex-col min-w-0">
          <header className="h-16 border-b border-white/5 flex items-center justify-between px-6 bg-[#050508]/80 backdrop-blur-md sticky top-0 z-50">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="text-muted-foreground hover:text-white" />
              <div className="h-4 w-px bg-white/10 hidden md:block" />
              <h1 className="text-sm font-black italic uppercase tracking-widest flex items-center gap-2">
                <MessageSquare className="h-4 w-4 text-primary" /> Gerador de Abordagens
              </h1>
            </div>
            <Badge variant="outline" className="bg-primary/10 border-primary/30 text-primary text-[8px] font-black uppercase px-3 py-1">
              Scripts de Alta Conversão
            </Badge>
          </header>

          <div className="flex-1 container max-w-4xl mx-auto p-4 md:p-8 space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Coluna de Inputs */}
              <div className="lg:col-span-5 space-y-6">
                <Card className="glass-card border-white/10 rounded-[2rem] bg-[#0e0e1a]">
                  <CardHeader className="border-b border-white/5 p-6">
                    <CardTitle className="text-xs font-black uppercase tracking-widest italic flex items-center gap-2">
                      <Zap className="h-4 w-4 text-primary" /> Parâmetros da Carga
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 space-y-6">
                    <div className="space-y-2">
                      <Label className="text-[10px] font-black uppercase tracking-widest opacity-50">Seu Nome (Remetente)</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input 
                          placeholder="Como você quer se identificar" 
                          className="bg-white/5 border-white/10 h-12 pl-10 rounded-xl focus-visible:ring-primary"
                          value={nome}
                          onChange={(e) => setNome(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-[10px] font-black uppercase tracking-widest opacity-50">WhatsApp do Lead</Label>
                      <div className="flex gap-2">
                        <div className="relative flex-1">
                          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input 
                            placeholder="(00) 00000-0000" 
                            className="bg-white/5 border-white/10 h-12 pl-10 rounded-xl focus-visible:ring-primary"
                            value={whatsapp}
                            onChange={(e) => setWhatsapp(e.target.value)}
                          />
                        </div>
                        <Button variant="outline" size="icon" onClick={handleCopyPhone} className="h-12 w-12 rounded-xl border-white/10 hover:bg-white/5">
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-[10px] font-black uppercase tracking-widest opacity-50">Empresa do Cliente (Opcional)</Label>
                      <div className="relative">
                        <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input 
                          placeholder="Ex: Barbearia do João" 
                          className="bg-white/5 border-white/10 h-12 pl-10 rounded-xl focus-visible:ring-primary"
                          value={empresa}
                          onChange={(e) => setEmpresa(e.target.value)}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="space-y-3">
                  <Label className="text-[10px] font-black uppercase tracking-widest opacity-50 ml-2">Selecione o Modelo</Label>
                  <div className="grid grid-cols-1 gap-2">
                    {Object.entries(SCRIPTS).map(([key, model]) => (
                      <button
                        key={key}
                        onClick={() => setSelectedModel(key as any)}
                        className={`flex items-center gap-3 p-4 rounded-2xl border text-left transition-all ${
                          selectedModel === key 
                          ? 'bg-primary/10 border-primary text-white shadow-lg shadow-primary/10' 
                          : 'bg-white/[0.02] border-white/5 text-muted-foreground hover:bg-white/5'
                        }`}
                      >
                        <div className={`p-2 rounded-lg ${selectedModel === key ? 'bg-primary text-white' : 'bg-white/5'}`}>
                          {model.icon}
                        </div>
                        <span className="text-xs font-black uppercase italic">{model.title}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Coluna de Preview e Mensagem */}
              <div className="lg:col-span-7 space-y-6">
                <Card className="glass-card border-white/10 rounded-[2.5rem] bg-[#0b0b14] h-full flex flex-col overflow-hidden">
                  <CardHeader className="border-b border-white/5 p-8 flex flex-row items-center justify-between">
                    <div className="space-y-1">
                      <CardTitle className="text-sm font-black uppercase italic tracking-widest text-primary flex items-center gap-2">
                        <Send className="h-4 w-4" /> Script Gerado
                      </CardTitle>
                      <CardDescription className="text-[10px] uppercase font-bold tracking-widest opacity-50">
                        Clique para editar se necessário
                      </CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={handleCopyMessage} className="h-10 rounded-xl font-black uppercase text-[10px] border-white/10 gap-2">
                        {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                        {copied ? 'COPIADO' : 'COPIAR'}
                      </Button>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="p-8 flex-1 flex flex-col gap-6">
                    <Textarea 
                      className="flex-1 min-h-[350px] bg-black/40 p-8 rounded-2xl border border-white/5 text-base font-medium italic whitespace-pre-wrap leading-relaxed text-white/90 focus-visible:ring-primary resize-none"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    />

                    <div className="space-y-4">
                      <Button 
                        onClick={openWhatsApp}
                        className="w-full h-20 bg-green-600 hover:bg-green-500 text-white rounded-[2rem] font-black uppercase tracking-widest text-lg shadow-[0_15px_40px_rgba(22,163,74,0.3)] transition-all active:scale-95 group"
                      >
                        <span className="flex items-center gap-3">
                          ABRIR NO WHATSAPP <ExternalLink className="h-6 w-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </span>
                      </Button>
                      <p className="text-[8px] text-center text-muted-foreground uppercase font-black tracking-[0.4em]">
                        Certifique-se de que o número está correto com o DDD
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
