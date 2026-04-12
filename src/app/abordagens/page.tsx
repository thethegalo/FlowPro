"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
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
  Zap, 
  Globe, 
  ShoppingCart, 
  Bot, 
  Instagram,
  ExternalLink,
  Smartphone,
  MoreVertical,
  Smile,
  Briefcase,
  Sparkles,
  Type,
  ShieldCheck,
  Menu
} from 'lucide-react';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from '@/components/AppSidebar';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

const LANGUAGES = [
  { id: 'pt', label: 'Português', icon: '🇧🇷' },
  { id: 'en', label: 'English', icon: '🇺🇸' },
  { id: 'es', label: 'Español', icon: '🇪🇸' },
];

const TONES = [
  { id: 'professional', label: 'Profissional', icon: <Briefcase className="h-5 w-5" /> },
  { id: 'friendly', label: 'Amigável', icon: <Smile className="h-5 w-5" /> },
  { id: 'urgent', label: 'Urgente', icon: <Zap className="h-5 w-5" /> },
  { id: 'luxury', label: 'Luxuoso', icon: <Sparkles className="h-5 w-5" /> },
  { id: 'casual', label: 'Casual', icon: <Type className="h-5 w-5" /> },
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
      en: "Hi! I saw that [Empresa]'s doesn't have a sales-focused website yet. Today, 80% of people buy after searching on Google. Does it make sense to increase your profit with a new Landing Page?",
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
      es: "¡Hola equipo de [Empresa]! Vi sus productos y la calidad es increíble. ¿Han pensado em tener su propia tienda virtual para dejar de depender solo de los mensagens directos? ¿Puedo mostrarles cómo escalar?"
    }
  },
  redes: {
    title: "Redes Sociais",
    icon: <Instagram className="h-4 w-4" />,
    templates: {
      pt: "Oi! Sou o [Nome]. Acompanho o conteúdo da [Empresa] e vejo que o engajamento poderia estar 3x maior com o design certo. Podemos bater um papo sobre como profissionalizar o perfil?",
      en: "Hi! I'm [Nome]. I follow [Empresa]'s content and see that engagement could be 3x higher with the right design. Can we chat about professionalizing the profile?",
      es: "¡Hola! Soy [Nome]. Sigo el contenido de [Empresa] e veo que el compromiso podría ser 3 veces mayor con el diseño adecuado. ¿Podemos hablar sobre cómo profissionalizar el perfil?"
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

  useEffect(() => {
    if (!isManualMode) {
      let base = NICHES[niche].templates[language as 'pt' | 'en' | 'es'];
      
      let final = base
        .replace(/\[Nome\]/g, nome || '[Seu Nome]')
        .replace(/\[Empresa\]/g, empresa || '[Nome do Lead]');

      if (tone === 'urgent') {
        const prefixes = { pt: "⚠️ OPORTUNIDADE: ", en: "⚠️ OPPORTUNITY: ", es: "⚠️ OPORTUNIDAD: " };
        final = (prefixes[language as 'pt' | 'en' | 'es'] || "⚠️ ") + final;
      } else if (tone === 'friendly') {
        final = final + " 😊";
      } else if (tone === 'luxury') {
        const luxuryTerms = { pt: "Exclusivo: ", en: "Exclusive: ", es: "Exclusivo: " };
        final = (luxuryTerms[language as 'pt' | 'en' | 'es'] || "Exclusivo: ") + final;
      }

      setMessage(final);
    }
  }, [nome, empresa, niche, language, tone, isManualMode]);

  const handleCopyMessage = () => {
    navigator.clipboard.writeText(message);
    setCopied(true);
    toast.success("Copiado!", "Script pronto para colar.");
    setTimeout(() => setCopied(false), 2000);
  };

  const openWhatsApp = () => {
    if (!whatsapp) {
      toast.warning("Dados Faltando", "Insira o número do lead primeiro.");
      return;
    }
    const cleanPhone = whatsapp.replace(/\D/g, '');
    const finalPhone = cleanPhone.length <= 11 ? `55${cleanPhone}` : cleanPhone;
    window.open(`https://wa.me/${finalPhone}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-transparent relative overflow-hidden font-body">
        <AppSidebar />
        
        <main className="flex-1 flex flex-col min-w-0 relative z-10">
          <header className="h-[48px] border-b border-white/5 flex items-center justify-between px-6 bg-transparent sticky top-0 z-50">
            <div className="flex items-center gap-3">
              <SidebarTrigger className="md:hidden">
                <Menu className="h-5 w-5 text-white/50" />
              </SidebarTrigger>
              <MessageSquare className="h-[14px] w-[14px] text-primary/70" />
              <h1 className="text-[13px] font-medium text-white/50">Configurador de Script</h1>
            </div>
            <div className="bg-[#581c87]/40 border border-[#7c3aed]/30 text-[#c4b5fd] text-[11px] font-medium rounded-[6px] px-[10px] py-[4px] uppercase tracking-[0.5px]">
              VITALÍCIO
            </div>
          </header>

          <div className="flex-1 container max-w-6xl mx-auto p-4 md:p-8 lg:p-12 space-y-8">
            <div className="flex flex-col lg:grid lg:grid-cols-12 gap-8 items-start">
              
              <div className="lg:col-span-5 space-y-8 w-full">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 px-1">
                    <User className="h-3 w-3 text-primary" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-white/40">Dados do Alvo</span>
                  </div>
                  
                  <Card className="glass-card border-white/5 bg-white/[0.02] backdrop-blur-xl rounded-2xl overflow-hidden">
                    <CardContent className="p-6 space-y-4">
                      <div className="space-y-2">
                        <Label className="text-[9px] font-bold uppercase tracking-widest opacity-50">Seu Nome</Label>
                        <Input 
                          placeholder="Como você assina?" 
                          className="bg-white/5 border-white/10 h-11 rounded-xl focus-visible:ring-primary text-sm"
                          value={nome}
                          onChange={(e) => setNome(e.target.value)}
                        />
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label className="text-[9px] font-bold uppercase tracking-widest opacity-50">WhatsApp Lead</Label>
                          <Input 
                            placeholder="(00) 00000-0000" 
                            className="bg-white/5 border-white/10 h-11 rounded-xl text-sm"
                            value={whatsapp}
                            onChange={(e) => setWhatsapp(e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-[9px] font-bold uppercase tracking-widest opacity-50">Empresa</Label>
                          <Input 
                            placeholder="Nome do Alvo" 
                            className="bg-white/5 border-white/10 h-11 rounded-xl text-sm"
                            value={empresa}
                            onChange={(e) => setEmpresa(e.target.value)}
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-2 px-1">
                    <Zap className="h-3 w-3 text-primary" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-white/40">Parâmetros de IA</span>
                  </div>

                  <Card className="glass-card border-white/5 bg-white/[0.03] backdrop-blur-xl rounded-[2rem] overflow-hidden">
                    <CardContent className="p-6 md:p-8 space-y-8">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-3">
                          <Label className="text-[9px] font-bold uppercase tracking-widest opacity-50">Idioma</Label>
                          <Select value={language} onValueChange={setLanguage}>
                            <SelectTrigger className="bg-white/5 border-white/10 h-11 rounded-xl text-[10px] font-black uppercase">
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
                          <Label className="text-[9px] font-bold uppercase tracking-widest opacity-50">Nicho</Label>
                          <Select value={niche} onValueChange={(val: any) => setNiche(val)}>
                            <SelectTrigger className="bg-white/5 border-white/10 h-11 rounded-xl text-[10px] font-black uppercase">
                              <SelectValue placeholder="Nicho" />
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

                      <div className="space-y-4">
                        <Label className="text-[9px] font-bold uppercase tracking-widest opacity-50 ml-1">Tom da Abordagem</Label>
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
                          {TONES.map((t) => (
                            <button
                              key={t.id}
                              onClick={() => setTone(t.id)}
                              className={cn(
                                "flex flex-col items-center justify-center gap-2 p-2 rounded-xl border transition-all duration-300 min-h-[80px]",
                                tone === t.id 
                                ? 'bg-primary/20 border-primary text-white shadow-[0_0_20px_rgba(124,58,255,0.3)]' 
                                : 'bg-white/[0.02] border-white/5 text-muted-foreground hover:bg-white/5'
                              )}
                            >
                              <div className={cn(
                                "transition-colors duration-300",
                                tone === t.id ? "text-primary" : "opacity-40"
                              )}>
                                {t.icon}
                              </div>
                              <span className="text-[9px] font-bold uppercase text-center leading-tight">
                                {t.label}
                              </span>
                            </button>
                          ))}
                        </div>
                      </div>

                      <Button 
                        onClick={() => setIsManualMode(true)}
                        variant="outline"
                        className="w-full h-12 bg-white/5 hover:bg-white/10 text-white/40 border-white/10 rounded-xl font-bold uppercase tracking-widest text-[9px]"
                      >
                        <Type className="h-3.5 w-3.5 mr-2" /> Habilitar Edição Manual
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <div className="lg:col-span-7 flex flex-col items-center gap-8 w-full">
                <div className="relative">
                  <div className="absolute inset-0 bg-primary/10 blur-[100px] rounded-full animate-pulse pointer-events-none" />
                  
                  <div className="w-[280px] h-[560px] sm:w-[320px] sm:h-[640px] bg-[#0a0a0a] rounded-[3rem] border-[8px] border-[#1a1a1a] shadow-[0_40px_100px_rgba(0,0,0,0.8)] relative overflow-hidden flex flex-col z-10">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-6 bg-[#1a1a1a] rounded-b-2xl z-20" />
                    
                    <div className="h-20 bg-[#141418] border-b border-white/5 pt-8 px-6 flex items-center gap-3 shrink-0">
                      <div className="h-9 w-9 rounded-full bg-white/5 border border-white/5 flex items-center justify-center">
                        <User className="h-5 w-5 text-white/20" />
                      </div>
                      <div className="flex-1">
                        <p className="text-[11px] font-bold text-white/90 truncate uppercase">{empresa || 'Empresa Alvo'}</p>
                        <div className="flex items-center gap-1">
                          <div className="h-1 w-1 rounded-full bg-green-500 animate-pulse" />
                          <p className="text-[8px] font-bold text-green-500/80 uppercase tracking-widest">Digitando...</p>
                        </div>
                      </div>
                      <MoreVertical className="h-4 w-4 text-white/20" />
                    </div>

                    <div className="flex-1 p-5 bg-[#050508] space-y-4 overflow-y-auto no-scrollbar">
                      <div className="flex justify-start">
                        <AnimatePresence mode="wait">
                          <motion.div 
                            key={message}
                            initial={{ opacity: 0, scale: 0.95, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            className="max-w-[90%] p-4 rounded-2xl rounded-tl-none bg-[#1a1a1e] border border-white/5 shadow-2xl relative"
                          >
                            <p className="text-[11px] leading-relaxed text-white/80 whitespace-pre-wrap italic font-medium">
                              {message}
                            </p>
                            <div className="flex items-center justify-end gap-1 mt-2">
                              <span className="text-[7px] text-white/20 font-black">14:32</span>
                              <Check className="h-2.5 w-2.5 text-primary" />
                            </div>
                          </motion.div>
                        </AnimatePresence>
                      </div>
                    </div>

                    <div className="h-16 bg-[#141418] border-t border-white/5 px-5 flex items-center gap-3 shrink-0">
                      <Smile className="h-5 w-5 text-white/20" />
                      <div className="flex-1 bg-white/[0.03] h-9 rounded-full border border-white/5 flex items-center px-4">
                        <span className="text-[9px] text-white/20 font-bold uppercase">Responder...</span>
                      </div>
                      <div className="h-9 w-9 rounded-full bg-primary flex items-center justify-center">
                        <Send className="h-4 w-4 text-white fill-white" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="w-full max-w-xl space-y-6">
                  {isManualMode && (
                    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
                      <Card className="glass-card border-primary/20 bg-black/40 rounded-3xl overflow-hidden">
                        <CardHeader className="p-4 border-b border-white/5 flex flex-row items-center justify-between bg-white/5">
                          <h3 className="text-[10px] font-black uppercase text-primary">Ajuste Neural</h3>
                          <Button variant="ghost" size="sm" onClick={() => setIsManualMode(false)} className="h-6 px-2 text-[8px] font-bold">Reset</Button>
                        </CardHeader>
                        <CardContent className="p-4">
                          <Textarea 
                            className="bg-transparent border-none text-white/80 text-sm p-0 min-h-[120px] focus-visible:ring-0 resize-none leading-relaxed"
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
                      className="w-full h-16 bg-green-600 hover:bg-green-500 text-white rounded-2xl font-black uppercase tracking-widest text-base shadow-[0_15px_40px_rgba(22,163,74,0.3)] transition-all"
                    >
                      ABRIR NO WHATSAPP <ExternalLink className="h-5 w-5 ml-2" />
                    </Button>

                    <Button 
                      variant="outline" 
                      onClick={handleCopyMessage}
                      className="w-full h-12 rounded-xl border-white/10 bg-white/5 font-black uppercase text-[10px] tracking-widest gap-2"
                    >
                      {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                      {copied ? 'COPIADO' : 'COPIAR SCRIPT'}
                    </Button>
                  </div>

                  <p className="text-[8px] text-center text-white/20 uppercase font-black tracking-[0.4em] flex items-center justify-center gap-2">
                    <ShieldCheck className="h-3 w-3" /> Verificação Neural OK
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
