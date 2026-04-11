
"use client";

import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  Smile,
  Languages,
  Target,
  Briefcase,
  Sparkles,
  Type,
  Clock,
  ShieldCheck
} from 'lucide-react';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from '@/components/AppSidebar';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

// --- CONFIGURAÇÕES DO MOTOR DE IA ---

const LANGUAGES = [
  { id: 'pt', label: 'Português (BR)', icon: '🇧🇷' },
  { id: 'en', label: 'English (US)', icon: '🇺🇸' },
  { id: 'es', label: 'Español (ES)', icon: '🇪🇸' },
];

const TONES = [
  { id: 'professional', label: 'Profissional', icon: <Briefcase className="h-3 w-3" /> },
  { id: 'friendly', label: 'Amigável', icon: <Smile className="h-3 w-3" /> },
  { id: 'urgent', label: 'Urgente', icon: <Zap className="h-3 w-3" /> },
  { id: 'luxury', label: 'Luxuoso', icon: <Sparkles className="h-3 w-3" /> },
  { id: 'casual', label: 'Descontraído', icon: <Type className="h-3 w-3" /> },
];

const NICHES = {
  presenca: {
    title: "Presença Digital",
    icon: <Globe className="h-4 w-4" />,
    templates: {
      pt: "Olá! Notei que o perfil da [Empresa] tem um potencial incrível, mas falta posicionamento estratégico no Google. Posso te enviar uma sugestão rápida de melhoria?",
      en: "Hi! I noticed [Empresa]'s profile has amazing potential, but lacks strategic positioning on Google. Can I send you a quick improvement suggestion?",
      es: "¡Hola! Noté que el perfil de [Empresa] tiene un potencial increíble, pero le falta posicionamiento estratégico en Google. ¿Puedo enviarte una sugerencia rápida de mejora?"
    }
  },
  site: {
    title: "Site Profissional",
    icon: <Globe className="h-4 w-4" />,
    templates: {
      pt: "Oi! Vi que a [Empresa] ainda não tem um site focado em vendas. Hoje, 80% das pessoas compram após pesquisar no Google. Faz sentido aumentar seu lucro com uma Landing Page nova?",
      en: "Hi! I saw that [Empresa] doesn't have a sales-focused website yet. Today, 80% of people buy after searching on Google. Does it make sense to increase your profit with a new Landing Page?",
      es: "¡Hola! Vi que [Empresa] aún no tiene un sitio web enfocado en ventas. Hoy, el 80% de las personas compran después de buscar en Google. ¿Tiene sentido aumentar sus ganancias con una nueva Landing Page?"
    }
  },
  automacao: {
    title: "Automação IA",
    icon: <Bot className="h-4 w-4" />,
    templates: {
      pt: "Olá! Notei que o atendimento da [Empresa] pode ser muito mais rápido com automação inteligente. Eu crio sistemas que respondem seus clientes 24h por dia. Gostaria de ver uma demo?",
      en: "Hi! I noticed [Empresa]'s customer service could be much faster with smart automation. I create systems that respond to your customers 24/7. Would you like to see a demo?",
      es: "¡Hola! Noté que la atención al cliente de [Empresa] podría ser mucho más rápida con automatización inteligente. Creo sistemas que responden a sus clientes las 24 horas del día. ¿Le gustaría ver una demostración?"
    }
  },
  ecommerce: {
    title: "E-commerce",
    icon: <ShoppingCart className="h-4 w-4" />,
    templates: {
      pt: "Olá pessoal da [Empresa]! Vi seus produtos e a qualidade é incrível. Já pensaram em ter uma loja virtual própria para parar de depender apenas do direct? Posso te mostrar como escalar?",
      en: "Hello [Empresa] team! I saw your products and the quality is amazing. Have you thought about having your own online store to stop relying only on direct messages? Can I show you how to scale?",
      es: "¡Hola equipo de [Empresa]! Vi sus productos y la calidad es increíble. ¿Han pensado en tener su propia tienda virtual para dejar de depender solo de los mensajes directos? ¿Puedo mostrarles cómo escalar?"
    }
  },
  redes: {
    title: "Redes Sociais",
    icon: <Instagram className="h-4 w-4" />,
    templates: {
      pt: "Oi! Sou o [Nome]. Acompanho o conteúdo da [Empresa] e vejo que o engajamento poderia estar 3x maior com o design certo. Podemos bater um papo sobre como profissionalizar o perfil?",
      en: "Hi! I'm [Nome]. I follow [Empresa]'s content and see that engagement could be 3x higher with the right design. Can we chat about professionalizing the profile?",
      es: "¡Hola! Soy [Nome]. Sigo el contenido de [Empresa] y veo que el compromiso podría ser 3 veces mayor con el diseño adecuado. ¿Podemos hablar sobre cómo profesionalizar el perfil?"
    }
  }
};

export default function AbordagensPage() {
  const [nome, setNome] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [empresa, setEmpresa] = useState('');
  const [language, setLanguage] = useState('pt');
  const [tone, setTone] = useState('professional');
  const [niche, setNiche] = useState<keyof typeof NICHES>('presenca');
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

  // --- LÓGICA DE GERAÇÃO DINÂMICA ---
  useEffect(() => {
    if (!isManualMode) {
      let base = NICHES[niche].templates[language as 'pt' | 'en' | 'es'];
      
      // Aplicar substituições
      let final = base
        .replace(/\[Nome\]/g, nome || '[Seu Nome]')
        .replace(/\[Empresa\]/g, empresa || '[Nome do Lead]');

      // Aplicar Tom de Voz (Simulação de IA)
      if (tone === 'urgent') {
        const prefixes = { pt: "⚠️ OPORTUNIDADE: ", en: "⚠️ OPPORTUNITY: ", es: "⚠️ OPORTUNIDAD: " };
        final = prefixes[language as 'pt' | 'en' | 'es'] + final;
      } else if (tone === 'friendly') {
        const friendlyEmoji = language === 'pt' ? " 😊" : language === 'en' ? " 😊" : " 😊";
        final = final + friendlyEmoji;
      } else if (tone === 'luxury') {
        const luxuryTerms = { pt: "Exclusivo: ", en: "Exclusive: ", es: "Exclusivo: " };
        final = luxuryTerms[language as 'pt' | 'en' | 'es'] + final;
      }

      setMessage(final);
    }
  }, [nome, empresa, niche, language, tone, isManualMode]);

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
      <div className="flex min-h-screen w-full bg-[#050508] relative overflow-hidden font-body">
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
                <Target className="h-4 w-4 text-primary" /> Configuração de Abordagem
              </h1>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
              <span className="text-[8px] font-black uppercase tracking-widest text-white/40">AI Neural Link Active</span>
            </div>
          </header>

          <div className="flex-1 container max-w-6xl mx-auto p-4 md:p-8 lg:p-12 space-y-8">
            <div className="flex flex-col lg:grid lg:grid-cols-12 gap-12 items-start">
              
              {/* --- COLUNA DE CONFIGURAÇÃO (ESQUERDA) --- */}
              <div className="lg:col-span-5 space-y-8 w-full">
                
                {/* Grupo 1: Identificação */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 px-1">
                    <User className="h-3 w-3 text-primary" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-white/60">Identificação Operacional</span>
                  </div>
                  
                  <Card className="glass-card border-white/5 bg-white/[0.02] backdrop-blur-xl rounded-2xl overflow-hidden shadow-2xl">
                    <CardContent className="p-6 space-y-4">
                      <div className="space-y-2">
                        <Label className="text-[9px] font-black uppercase tracking-widest opacity-50">Seu Nome (Remetente)</Label>
                        <Input 
                          placeholder="Ex: Lucas Silva" 
                          className="bg-white/5 border-white/10 h-12 rounded-xl focus-visible:ring-primary text-sm font-medium"
                          value={nome}
                          onChange={(e) => setNome(e.target.value)}
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label className="text-[9px] font-black uppercase tracking-widest opacity-50">WhatsApp do Lead</Label>
                          <Input 
                            placeholder="(DDD) 99999-9999" 
                            className="bg-white/5 border-white/10 h-12 rounded-xl focus-visible:ring-primary text-sm"
                            value={whatsapp}
                            onChange={(e) => setWhatsapp(e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-[9px] font-black uppercase tracking-widest opacity-50">Empresa Alvo</Label>
                          <Input 
                            placeholder="Nome da Empresa" 
                            className="bg-white/5 border-white/10 h-12 rounded-xl focus-visible:ring-primary text-sm"
                            value={empresa}
                            onChange={(e) => setEmpresa(e.target.value)}
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Grupo 2: Parâmetros de IA */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 px-1">
                    <Zap className="h-3 w-3 text-primary" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-white/60">Engenharia de Prompt</span>
                  </div>

                  <Card className="glass-card border-primary/20 bg-white/[0.03] backdrop-blur-xl rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(124,58,255,0.1)]">
                    <CardContent className="p-8 space-y-8">
                      {/* Idioma e Nicho */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-3">
                          <Label className="text-[9px] font-black uppercase tracking-widest opacity-50">Idioma de Saída</Label>
                          <Select value={language} onValueChange={setLanguage}>
                            <SelectTrigger className="bg-white/5 border-white/10 h-12 rounded-xl text-xs font-bold uppercase tracking-tight">
                              <SelectValue placeholder="Selecione" />
                            </SelectTrigger>
                            <SelectContent className="bg-[#0b0b14] border-white/10 text-white">
                              {LANGUAGES.map(lang => (
                                <SelectItem key={lang.id} value={lang.id} className="text-[10px] font-black uppercase">
                                  {lang.icon} {lang.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-3">
                          <Label className="text-[9px] font-black uppercase tracking-widest opacity-50">Nicho da Oferta</Label>
                          <Select value={niche} onValueChange={(val: any) => setNiche(val)}>
                            <SelectTrigger className="bg-white/5 border-white/10 h-12 rounded-xl text-xs font-bold uppercase tracking-tight">
                              <SelectValue placeholder="Selecione" />
                            </SelectTrigger>
                            <SelectContent className="bg-[#0b0b14] border-white/10 text-white">
                              {Object.entries(NICHES).map(([id, data]) => (
                                <SelectItem key={id} value={id} className="text-[10px] font-black uppercase">
                                  {data.title}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      {/* Tom de Voz Grid */}
                      <div className="space-y-4">
                        <Label className="text-[9px] font-black uppercase tracking-widest opacity-50 ml-1">Tom de Voz da Abordagem</Label>
                        <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
                          {TONES.map((t) => (
                            <button
                              key={t.id}
                              onClick={() => setTone(t.id)}
                              className={cn(
                                "flex flex-col items-center justify-center gap-2 p-3 rounded-xl border transition-all duration-300",
                                tone === t.id 
                                ? 'bg-primary/20 border-primary text-white shadow-[0_0_15px_rgba(124,58,255,0.3)]' 
                                : 'bg-white/[0.02] border-white/5 text-muted-foreground hover:bg-white/5'
                              )}
                            >
                              {t.icon}
                              <span className="text-[8px] font-black uppercase tracking-tighter">{t.label}</span>
                            </button>
                          ))}
                        </div>
                      </div>

                      <Button 
                        onClick={() => setIsManualMode(true)}
                        className="w-full h-14 bg-white/5 hover:bg-white/10 text-white/60 border border-white/10 rounded-2xl font-black uppercase tracking-widest text-[9px] transition-all"
                      >
                        <Type className="h-3.5 w-3.5 mr-2" /> Habilitar Edição Manual
                      </Button>
                    </CardContent>
                  </Card>
                </div>

                <div className="p-6 bg-primary/5 border border-dashed border-primary/20 rounded-2xl">
                  <p className="text-[9px] font-bold text-primary uppercase text-center tracking-widest flex items-center justify-center gap-2">
                    <ShieldCheck className="h-3 w-3" /> Script otimizado para alta conversão mobile
                  </p>
                </div>
              </div>

              {/* --- COLUNA DE PREVIEW SIMULADO (DIREITA) --- */}
              <div className="lg:col-span-7 flex flex-col items-center gap-8 w-full relative">
                
                {/* FLOW SIMULATOR (Smartphone Mockup) */}
                <div className="relative group">
                  {/* Glow Effect reativo */}
                  <div className="absolute inset-0 bg-primary/10 blur-[100px] rounded-full animate-pulse pointer-events-none" />
                  
                  {/* Smartphone Frame */}
                  <div className="w-[300px] h-[600px] md:w-[340px] md:h-[680px] bg-[#0a0a0a] rounded-[3.5rem] border-[10px] border-[#1a1a1a] shadow-[0_40px_100px_rgba(0,0,0,0.8)] relative overflow-hidden flex flex-col z-10">
                    
                    {/* Notch */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-[#1a1a1a] rounded-b-3xl z-20" />
                    
                    {/* Chat Header */}
                    <div className="h-24 bg-[#141418] border-b border-white/5 pt-10 px-6 flex items-center gap-3 shrink-0">
                      <div className="h-10 w-10 rounded-full bg-white/5 border border-white/5 flex items-center justify-center overflow-hidden">
                        <User className="h-6 w-6 text-white/20" />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs font-black text-white/90 truncate uppercase tracking-tight">{empresa || '[Nome do Lead]'}</p>
                        <div className="flex items-center gap-1.5">
                          <div className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                          <p className="text-[8px] font-bold text-green-500/80 uppercase tracking-widest italic">Digitando...</p>
                        </div>
                      </div>
                      <MoreVertical className="h-4 w-4 text-white/30" />
                    </div>

                    {/* Chat Area */}
                    <div className="flex-1 p-6 bg-[#050508] space-y-4 overflow-y-auto no-scrollbar relative">
                      <div className="flex justify-start">
                        <AnimatePresence mode="wait">
                          <motion.div 
                            key={message}
                            initial={{ opacity: 0, scale: 0.95, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.3, type: 'spring', stiffness: 200 }}
                            className="max-w-[90%] p-5 rounded-3xl rounded-tl-none bg-[#1a1a1e] border border-white/5 shadow-2xl relative"
                          >
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
                            <div className="flex items-center justify-end gap-1 mt-2">
                              <span className="text-[7px] text-white/20 uppercase font-black">14:32</span>
                              <Check className="h-2.5 w-2.5 text-primary" />
                            </div>
                          </motion.div>
                        </AnimatePresence>
                      </div>
                    </div>

                    {/* Chat Input Bar */}
                    <div className="h-20 bg-[#141418] border-t border-white/5 px-5 flex items-center gap-3 shrink-0">
                      <Smile className="h-5 w-5 text-white/20" />
                      <div className="flex-1 bg-white/[0.03] h-10 rounded-full border border-white/5 flex items-center px-4">
                        <span className="text-[9px] text-white/20 font-bold uppercase tracking-widest">Escrever...</span>
                      </div>
                      <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
                        <Send className="h-4 w-4 text-white fill-white" />
                      </div>
                    </div>
                  </div>

                  {/* Reflection Effect */}
                  <div className="absolute inset-0 rounded-[3.5rem] bg-gradient-to-tr from-white/[0.02] to-transparent pointer-events-none z-30" />
                </div>

                {/* --- AÇÕES DO SCRIPT --- */}
                <div className="w-full max-w-xl space-y-6">
                  {isManualMode && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <Card className="glass-card border-primary/30 bg-black/40 rounded-[2rem] overflow-hidden">
                        <CardHeader className="p-5 border-b border-white/5 flex flex-row items-center justify-between bg-white/5">
                          <CardTitle className="text-[10px] font-black uppercase tracking-widest text-primary italic">Refino Tático de IA</CardTitle>
                          <Button variant="ghost" size="sm" onClick={() => setIsManualMode(false)} className="h-7 px-3 text-[8px] font-black uppercase tracking-widest opacity-50 hover:opacity-100">Resetar Motor</Button>
                        </CardHeader>
                        <CardContent className="p-6">
                          <Textarea 
                            className="bg-transparent border-none text-white/90 italic text-sm p-0 min-h-[140px] focus-visible:ring-0 resize-none leading-relaxed"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                          />
                        </CardContent>
                      </Card>
                    </motion.div>
                  )}

                  <div className="space-y-4">
                    <Button 
                      onClick={openWhatsApp}
                      className="w-full h-20 bg-green-600 hover:bg-green-500 text-white rounded-[2.5rem] font-black uppercase tracking-[0.2em] text-lg shadow-[0_15px_40px_rgba(22,163,74,0.3)] transition-all active:scale-[0.98] group relative overflow-hidden"
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
                        className="flex-1 h-14 rounded-2xl border-white/10 bg-white/5 font-black uppercase text-[10px] tracking-widest gap-2 hover:bg-white/10 hover:border-primary/30 transition-all"
                      >
                        {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                        {copied ? 'COPIADO' : 'COPIAR SCRIPT IA'}
                      </Button>
                      <Button 
                        variant="outline"
                        className="h-14 w-14 rounded-2xl border-white/10 bg-white/5 hover:bg-white/10"
                      >
                        <Smartphone className="h-4 w-4 opacity-50" />
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center justify-center gap-2 opacity-30">
                    <div className="h-px w-8 bg-white" />
                    <p className="text-[8px] text-center text-muted-foreground uppercase font-black tracking-[0.4em]">
                      Verificação de Segurança Neural OK
                    </p>
                    <div className="h-px w-8 bg-white" />
                  </div>
                </div>

              </div>

            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
