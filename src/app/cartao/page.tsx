"use client";

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  CreditCard, 
  Upload, 
  Instagram, 
  Mail, 
  Globe, 
  Phone, 
  Copy, 
  Check, 
  ExternalLink,
  Smartphone,
  Menu,
  Sparkles,
  Download,
  User
} from 'lucide-react';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from '@/components/AppSidebar';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import Image from 'next/image';

const COLORS = [
  { hex: '#7c3aff', label: 'Roxo' },
  { hex: '#3b82f6', label: 'Azul' },
  { hex: '#10b981', label: 'Verde' },
  { hex: '#ef4444', label: 'Vermelho' },
  { hex: '#f59e0b', label: 'Âmbar' },
  { hex: '#ec4899', label: 'Rosa' },
];

const STYLES = ['Moderno', 'Minimalista', 'Dark', 'Gradiente'];

export default function CartaoDigitalPage() {
  const [formData, setFormData] = useState({
    nome: '',
    profissao: '',
    whatsapp: '',
    instagram: '',
    email: '',
    site: '',
    cor: '#7c3aff',
    estilo: 'Moderno'
  });
  const [photo, setPhoto] = useState<string | null>(null);
  const [isGenerated, setIsGenerated] = useState(false);
  const [copied, setCopied] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'whatsapp') {
      const masked = value.replace(/\D/g, '')
        .replace(/(\d{2})(\d)/, '($1) $2')
        .replace(/(\d{5})(\d)/, '$1-$2')
        .replace(/(-\d{4})\d+?$/, '$1');
      setFormData(prev => ({ ...prev, [name]: masked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPhoto(url);
    }
  };

  const promptText = `Crie um cartão de visita digital para ${formData.nome || '[Nome]'}, ${formData.profissao || '[Profissão]'}. 
WhatsApp: ${formData.whatsapp || '[Número]'}. Instagram: @${formData.instagram || '[Instagram]'}. Email: ${formData.email || '[Email]'}.
Cor primária: ${formData.cor}. Estilo: ${formData.estilo}.
Inclua botão de WhatsApp, Instagram, Email e botão 'Salvar Contato'.
Design responsivo e moderno.`;

  const handleGenerate = () => {
    if (!formData.nome || !formData.profissao) {
      toast.warning("Dados Faltando", "Preencha ao menos Nome e Profissão.");
      return;
    }
    setIsGenerated(true);
    toast.success("Blueprint Gerado!", "Copie o prompt para criar seu cartão.");
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(promptText);
    setCopied(true);
    toast.success("Copiado!", "Prompt pronto para o Lovable.");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-transparent relative overflow-x-hidden">
        {/* Background Atmospheric */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
          <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-primary/20 rounded-full blur-[140px] animate-pulse" style={{ willChange: 'transform' }}></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-accent/10 rounded-full blur-[120px]"></div>
        </div>

        <AppSidebar />
        
        <main className="flex-1 flex flex-col min-w-0 relative z-10">
          <header className="h-[52px] border-b border-white/5 flex items-center justify-between px-6 bg-transparent sticky top-0 z-50">
            <div className="flex items-center gap-3">
              <SidebarTrigger className="md:hidden">
                <Menu className="h-5 w-5 text-white/50" />
              </SidebarTrigger>
              <CreditCard className="h-[14px] w-[14px] text-primary/70" />
              <h1 className="text-[13px] font-medium text-white/50 uppercase tracking-widest font-black italic">Estúdio de Cartão Digital</h1>
            </div>
            <div className="bg-[#581c87]/40 border border-[#7c3aed]/30 text-[#c4b5fd] text-[11px] font-medium rounded-[6px] px-[10px] py-[4px] uppercase tracking-[0.5px]">
              VITALÍCIO
            </div>
          </header>

          <div className="flex-1 container max-w-6xl mx-auto p-4 md:p-8 lg:p-12 space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* PREVIEW (MOBILE TOP) */}
              <div className="lg:col-span-5 lg:order-2 flex flex-col items-center gap-6">
                <div className="w-full flex items-center justify-center relative">
                  <div className="absolute inset-0 bg-primary/10 blur-[80px] rounded-full pointer-events-none" />
                  
                  {/* Card Simulator */}
                  <motion.div 
                    layout
                    className={cn(
                      "w-[280px] h-[500px] rounded-[2.5rem] shadow-2xl relative overflow-hidden flex flex-col transition-all duration-500 border",
                      formData.estilo === 'Dark' ? 'bg-[#0a0a0a] border-white/10 text-white' : 
                      formData.estilo === 'Moderno' ? 'bg-white border-white/20 text-slate-900' :
                      formData.estilo === 'Minimalista' ? 'bg-transparent border-white/5 text-white' :
                      'bg-gradient-to-br from-[#1a1a2e] to-[#0a0a0a] border-primary/20 text-white'
                    )}
                  >
                    {/* Gradient Overlay for style Gradient */}
                    {formData.estilo === 'Gradiente' && (
                      <div className="absolute inset-0 opacity-20" style={{ background: `linear-gradient(135deg, ${formData.cor}, transparent)` }} />
                    )}

                    <div className="p-8 flex-1 flex flex-col items-center text-center space-y-6 z-10">
                      <div 
                        className="h-24 w-24 rounded-full border-4 flex items-center justify-center overflow-hidden shrink-0 shadow-xl relative"
                        style={{ borderColor: formData.cor }}
                      >
                        {photo ? (
                          <Image src={photo} alt="Profile" fill className="object-cover" unoptimized />
                        ) : (
                          <div className="h-full w-full bg-white/5 flex items-center justify-center">
                            <User className="h-10 w-10 opacity-20" />
                          </div>
                        )}
                      </div>

                      <div className="space-y-1">
                        <h3 className="text-xl font-black uppercase tracking-tighter italic">{formData.nome || 'Seu Nome'}</h3>
                        <p className="text-[10px] font-bold uppercase tracking-widest opacity-50">{formData.profissao || 'Sua Profissão'}</p>
                      </div>

                      <div className="w-full space-y-3 pt-4">
                        <div className="h-11 w-full rounded-2xl bg-green-500 text-white flex items-center justify-center gap-2 text-[10px] font-black uppercase shadow-lg shadow-green-500/20">
                          <Phone className="h-3.5 w-3.5" /> WhatsApp
                        </div>
                        <div className="h-11 w-full rounded-2xl bg-purple-600 text-white flex items-center justify-center gap-2 text-[10px] font-black uppercase shadow-lg shadow-purple-600/20">
                          <Instagram className="h-3.5 w-3.5" /> Instagram
                        </div>
                        <div className="h-11 w-full rounded-2xl bg-blue-500 text-white flex items-center justify-center gap-2 text-[10px] font-black uppercase shadow-lg shadow-blue-500/20">
                          <Mail className="h-3.5 w-3.5" /> E-mail
                        </div>
                        {formData.site && (
                          <div className="h-11 w-full rounded-2xl bg-slate-500 text-white flex items-center justify-center gap-2 text-[10px] font-black uppercase shadow-lg shadow-slate-500/20">
                            <Globe className="h-3.5 w-3.5" /> Website
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="p-6 border-t border-white/5 flex justify-center bg-black/20 z-10">
                      <Badge 
                        variant="outline" 
                        className="rounded-full px-4 py-1.5 border-none text-[8px] font-black uppercase tracking-widest"
                        style={{ backgroundColor: formData.cor, color: '#fff' }}
                      >
                        Salvar Contato
                      </Badge>
                    </div>
                  </motion.div>
                </div>
                
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20 animate-pulse" style={{ willChange: 'transform' }}>Simulação em Tempo Real</p>
              </div>

              {/* FORMULARIO */}
              <div className="lg:col-span-7 lg:order-1 space-y-8">
                <div className="space-y-2">
                  <h2 className="text-3xl font-black italic uppercase tracking-tighter text-white">Configurar Cartão</h2>
                  <p className="text-muted-foreground text-[10px] uppercase font-bold tracking-widest">Arquitetura de Identidade Digital</p>
                </div>

                <Card className="glass-card border-white/10 rounded-[2rem] overflow-hidden">
                  <CardContent className="p-8 space-y-8">
                    {/* Foto */}
                    <div className="flex flex-col items-center sm:flex-row sm:items-center gap-6">
                      <div className="h-20 w-20 rounded-full border-2 border-dashed border-white/20 flex items-center justify-center overflow-hidden relative group shrink-0">
                        {photo ? (
                          <Image src={photo} alt="Preview" fill className="object-cover" unoptimized />
                        ) : (
                          <Upload className="h-6 w-6 opacity-20" />
                        )}
                        <button 
                          onClick={() => fileInputRef.current?.click()}
                          className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity"
                        >
                          <Upload className="h-5 w-5 text-white" />
                        </button>
                        <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handlePhotoUpload} />
                      </div>
                      <div className="space-y-1 text-center sm:text-left">
                        <Label className="text-[10px] font-black uppercase tracking-widest text-primary">Foto de Perfil</Label>
                        <p className="text-[11px] text-white/30">Formatos: JPG, PNG. Máximo 2MB.</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label className="text-[9px] font-black uppercase tracking-widest opacity-50">Nome Completo</Label>
                        <Input name="nome" placeholder="Ex: Lucas Mestre" value={formData.nome} onChange={handleInputChange} className="bg-white/5 border-white/10 h-12 rounded-xl focus-visible:ring-primary" />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-[9px] font-black uppercase tracking-widest opacity-50">Profissão/Cargo</Label>
                        <Input name="profissao" placeholder="Ex: Estrategista IA" value={formData.profissao} onChange={handleInputChange} className="bg-white/5 border-white/10 h-12 rounded-xl focus-visible:ring-primary" />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-[9px] font-black uppercase tracking-widest opacity-50">WhatsApp</Label>
                        <Input name="whatsapp" placeholder="(00) 00000-0000" value={formData.whatsapp} onChange={handleInputChange} className="bg-white/5 border-white/10 h-12 rounded-xl focus-visible:ring-primary" />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-[9px] font-black uppercase tracking-widest opacity-50">Instagram (@)</Label>
                        <Input name="instagram" placeholder="seu.perfil" value={formData.instagram} onChange={handleInputChange} className="bg-white/5 border-white/10 h-12 rounded-xl focus-visible:ring-primary" />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-[9px] font-black uppercase tracking-widest opacity-50">Email</Label>
                        <Input name="email" type="email" placeholder="mestre@flowpro.app" value={formData.email} onChange={handleInputChange} className="bg-white/5 border-white/10 h-12 rounded-xl focus-visible:ring-primary" />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-[9px] font-black uppercase tracking-widest opacity-50">Site (Opcional)</Label>
                        <Input name="site" placeholder="www.seusite.com" value={formData.site} onChange={handleInputChange} className="bg-white/5 border-white/10 h-12 rounded-xl focus-visible:ring-primary" />
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div className="space-y-3">
                        <Label className="text-[9px] font-black uppercase tracking-widest opacity-50">Cor Primária</Label>
                        <div className="flex flex-wrap gap-3">
                          {COLORS.map((c) => (
                            <button
                              key={c.hex}
                              onClick={() => setFormData(prev => ({ ...prev, cor: c.hex }))}
                              className={cn(
                                "h-8 w-8 rounded-full border-2 transition-all",
                                formData.cor === c.hex ? "border-white scale-110 shadow-lg" : "border-transparent opacity-40 hover:opacity-100"
                              )}
                              style={{ backgroundColor: c.hex }}
                              title={c.label}
                            />
                          ))}
                        </div>
                      </div>

                      <div className="space-y-3">
                        <Label className="text-[9px] font-black uppercase tracking-widest opacity-50">Estilo Visual</Label>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                          {STYLES.map((s) => (
                            <button
                              key={s}
                              onClick={() => setFormData(prev => ({ ...prev, estilo: s }))}
                              className={cn(
                                "h-10 rounded-xl text-[9px] font-black uppercase tracking-widest border transition-all",
                                formData.estilo === s ? "bg-primary border-primary text-white" : "bg-white/5 border-white/10 text-white/40 hover:bg-white/10"
                              )}
                            >
                              {s}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    <Button 
                      onClick={handleGenerate}
                      className="w-full h-16 bg-primary hover:bg-primary/90 text-white rounded-2xl font-black uppercase tracking-widest text-base shadow-[0_15px_40px_rgba(124,58,237,0.3)] transition-all"
                    >
                      GERAR BLUEPRINT <Sparkles className="h-5 w-5 ml-2" />
                    </Button>
                  </CardContent>
                </Card>

                {/* AREA DE OUTPUT */}
                <AnimatePresence>
                  {isGenerated && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }} 
                      animate={{ opacity: 1, height: 'auto' }}
                      className="space-y-6"
                    >
                      <Card className="glass-card border-primary/20 bg-black/40 rounded-[2rem] overflow-hidden">
                        <div className="p-6 border-b border-white/5 bg-white/5 flex items-center justify-between">
                          <h3 className="text-[10px] font-black uppercase text-primary tracking-[0.2em]">Prompt para Lovable.dev</h3>
                          <Badge variant="outline" className="text-[8px] border-primary/30 text-primary">PRONTO</Badge>
                        </div>
                        <CardContent className="p-6 space-y-6">
                          <Textarea 
                            readOnly 
                            value={promptText}
                            className="bg-transparent border-none text-white/80 text-sm p-0 min-h-[120px] focus-visible:ring-0 resize-none leading-relaxed font-medium"
                          />
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-white/5">
                            <Button 
                              onClick={handleCopy}
                              variant="outline"
                              className="h-12 border-white/10 bg-white/5 hover:bg-white/10 rounded-xl font-black uppercase tracking-widest text-[9px]"
                            >
                              {copied ? <Check className="h-4 w-4 mr-2 text-green-500" /> : <Copy className="h-4 w-4 mr-2" />}
                              COPIAR PROMPT
                            </Button>
                            <Button 
                              asChild
                              className="h-12 bg-white text-black hover:bg-[#6366f1] hover:text-white rounded-xl font-black uppercase tracking-widest text-[9px] shadow-xl transition-all"
                            >
                              <a href="https://lovable.dev" target="_blank" rel="noopener noreferrer">
                                ABRIR LOVABLE <ExternalLink className="h-3.5 w-3.5 ml-2" />
                              </a>
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
