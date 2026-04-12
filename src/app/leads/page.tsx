
"use client";

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Check, 
  MapPin, 
  Loader2,
  Filter,
  Users,
  Phone,
  UserPlus,
  Zap,
  ExternalLink,
  MessageSquare,
  X,
  Globe,
  Navigation,
  Sparkles,
  Target,
  Building2,
  Flag
} from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { generateLeadMessage } from '@/ai/flows/generate-lead-message';
import { useToast } from '@/hooks/use-toast';
import { useUser, useFirestore, useMemoFirebase, useDoc } from '@/firebase';
import { collection, doc, serverTimestamp, addDoc } from 'firebase/firestore';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from '@/components/AppSidebar';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from '@/components/ui/textarea';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';

const STATES = [
  "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", 
  "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", 
  "RS", "RO", "RR", "SC", "SP", "SE", "TO"
];

const ADMIN_EMAIL = "thethegalo@gmail.com";

const SUGGESTIONS = [
  { niche: 'Barbearia', city: 'São Paulo', state: 'SP', country: 'Brasil' },
  { niche: 'Dentista', city: 'Curitiba', state: 'PR', country: 'Brasil' },
  { niche: 'Restaurante Japonês', city: 'Rio de Janeiro', state: 'RJ', country: 'Brasil' },
  { niche: 'Escola de Inglês', city: 'Belo Horizonte', state: 'MG', country: 'Brasil' },
  { niche: 'Pet Shop', city: 'Florianópolis', state: 'SC', country: 'Brasil' },
];

export default function LeadsPage() {
  const { user } = useUser();
  const db = useFirestore();
  const { toast, success, error, warning } = useToast();
  
  const [loading, setLoading] = useState(false);
  const [leads, setLeads] = useState<any[]>([]);
  const [niche, setNiche] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('Brasil');
  const [generatingMsg, setGeneratingMsg] = useState<string | null>(null);
  const [approachedLeads, setApproachedLeads] = useState<string[]>([]);
  
  const [activeScript, setActiveScript] = useState<{ id: string, message: string, phone: string } | null>(null);

  const [manualLead, setManualLead] = useState({
    name: '',
    email: '',
    phone: '',
    businessType: ''
  });
  const [isSavingManual, setIsManualSaving] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const userDocRef = useMemoFirebase(() => {
    if (!db || !user) return null;
    return doc(db, 'users', user.uid);
  }, [db, user]);
  const { data: userData } = useDoc(userDocRef);

  const isProMember = useMemo(() => {
    const p = userData?.plan;
    return p === 'vitalicio' || p === 'mensal' || p === 'trimestral' || user?.email === ADMIN_EMAIL;
  }, [userData, user]);

  const handleSuggest = () => {
    const random = SUGGESTIONS[Math.floor(Math.random() * SUGGESTIONS.length)];
    setNiche(random.niche);
    setCity(random.city);
    setState(random.state);
    setCountry(random.country);
    success("Sugestão Aplicada", `Radar configurado para ${random.niche}.`);
  };

  const handleSearch = async () => {
    if (!niche || !state) {
      warning("Campos Obrigatórios", "Por favor, digite o nicho e selecione o estado.");
      return;
    }
    
    setLoading(true);
    setLeads([]);

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ niche, city, state }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Falha na busca de leads');

      const finalLeads = isProMember ? (data.length > 20 ? data.slice(0, 20) : data) : data.slice(0, 5);
      setLeads(finalLeads);

      success("Escaneamento Concluído!", isProMember 
        ? `Identificamos ${finalLeads.length} novos alvos de alta probabilidade.` 
        : "Relatório parcial gerado. Faça upgrade para ver todos os alvos.");
    } catch (e: any) {
      error("Erro no Radar", e.message || "Conexão neural interrompida.");
    } finally {
      setLoading(false);
    }
  };

  const handleManualSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!db || !user) return;
    
    setIsManualSaving(true);
    const leadData = {
      name: manualLead.name,
      phone: manualLead.phone,
      email: manualLead.email,
      businessType: manualLead.businessType,
      capturedAt: serverTimestamp(),
      source: 'manual',
      city: '',
      state: '',
      address: '',
      rating: '5.0'
    };

    try {
      await addDoc(collection(db, 'users', user.uid, 'capturedLeads'), leadData);
      success("Alvo Registrado", "As coordenadas foram salvas na base neural local.");
      setManualLead({ name: '', email: '', phone: '', businessType: '' });
      setIsDialogOpen(false);
    } catch (err: any) {
      errorEmitter.emit('permission-error', new FirestorePermissionError({
        path: `users/${user.uid}/capturedLeads`,
        operation: 'create',
        requestResourceData: leadData
      }));
    } finally {
      setIsManualSaving(false);
    }
  };

  const handleWhatsApp = (phone: string, message: string) => {
    if (!phone || phone === 'Telefone não listado') {
      warning("Contato Indisponível", "Este lead não possui um número válido registrado.");
      return;
    }
    const cleanPhone = phone.replace(/\D/g, '');
    const waPhone = cleanPhone.length <= 11 ? `55${cleanPhone}` : cleanPhone;
    const encodedMsg = encodeURIComponent(message);
    window.open(`https://wa.me/${waPhone}?text=${encodedMsg}`, '_blank');
  };

  const handleGenMessage = async (lead: any) => {
    setGeneratingMsg(lead.id);
    try {
      const res = await generateLeadMessage({
        businessName: lead.name || 'Dono do Negócio',
        businessType: lead.type || niche || 'Serviços',
        city: lead.city || city || 'Sua região'
      });
      
      if (res && res.message) {
        setActiveScript({ id: lead.id, message: res.message, phone: lead.phone });
        success("Script Gerado", "Mensagem personalizada composta com sucesso.");
        if (!approachedLeads.includes(lead.id)) {
          setApproachedLeads(prev => [...prev, lead.id]);
        }
      }
    } catch (e: any) {
      error("Falha na IA", "O motor neural falhou ao compor a mensagem.");
    } finally {
      setGeneratingMsg(null);
    }
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-transparent relative overflow-hidden z-10">
        <AppSidebar />
        
        <main className="flex-1 flex flex-col min-w-0 relative z-10">
          <header className="h-16 border-b border-white/5 flex items-center justify-between px-6 bg-[#050508]/80 backdrop-blur-md sticky top-0 z-50">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="text-muted-foreground hover:text-white" />
              <div className="h-4 w-px bg-white/10 hidden md:block" />
              <h1 className="text-sm font-black italic uppercase tracking-widest flex items-center gap-2">
                <Target className="h-4 w-4 text-primary" /> Radar Neural de Leads
              </h1>
            </div>
            
            <div className="flex items-center gap-3">
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm" className="h-9 rounded-xl border-white/10 text-white/70 text-[9px] font-black uppercase px-4 gap-2 hover:bg-white/5 transition-all">
                    <UserPlus className="h-3.5 w-3.5" /> MANUAL
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-[#0e0e1a] border-white/10 text-white rounded-[2rem] sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle className="text-xl font-black italic uppercase tracking-tighter">Injetar Alvo Manual</DialogTitle>
                    <DialogDescription className="text-[10px] uppercase font-bold text-muted-foreground">
                      Coordenadas para salvar na base neural local.
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleManualSave} className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label className="text-[10px] font-black uppercase opacity-50">Nome do Alvo</Label>
                      <Input 
                        placeholder="Ex: João da Silva" 
                        className="bg-white/5 border-white/10 rounded-xl"
                        value={manualLead.name}
                        onChange={e => setManualLead({...manualLead, name: e.target.value})}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[10px] font-black uppercase opacity-50">Email de Contato</Label>
                      <Input 
                        type="email"
                        placeholder="lead@empresa.com" 
                        className="bg-white/5 border-white/10 rounded-xl"
                        value={manualLead.email}
                        onChange={e => setManualLead({...manualLead, email: e.target.value})}
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-[10px] font-black uppercase opacity-50">WhatsApp</Label>
                        <Input 
                          placeholder="(00) 00000-0000" 
                          className="bg-white/5 border-white/10 rounded-xl"
                          value={manualLead.phone}
                          onChange={e => setManualLead({...manualLead, phone: e.target.value})}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-[10px] font-black uppercase opacity-50">Nicho</Label>
                        <Input 
                          placeholder="Ex: Tecnologia" 
                          className="bg-white/5 border-white/10 rounded-xl"
                          value={manualLead.businessType}
                          onChange={e => setManualLead({...manualLead, businessType: e.target.value})}
                          required
                        />
                      </div>
                    </div>
                    <Button type="submit" disabled={isSavingManual} className="w-full h-14 bg-primary hover:bg-primary/90 font-black uppercase tracking-widest rounded-2xl shadow-xl shadow-primary/20 transition-all">
                      {isSavingManual ? <Loader2 className="h-5 w-5 animate-spin" /> : "REGISTRAR ALVO"}
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>

              <Badge className="bg-primary/20 text-primary border-primary/30 text-[8px] font-black uppercase px-3 py-1">
                {isProMember ? 'ACESSO VITALÍCIO' : 'MODO TESTE'}
              </Badge>
            </div>
          </header>

          <div className="flex-1 container max-w-5xl mx-auto p-4 md:p-12 space-y-12 relative overflow-visible bg-transparent">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <Card className="glass-card overflow-hidden shadow-[0_0_60px_rgba(124,58,255,0.08)] bg-transparent">
                <CardHeader className="bg-white/5 border-b border-white/5 p-8 flex flex-row items-center justify-between">
                  <div className="space-y-1">
                    <CardTitle className="text-lg font-black uppercase tracking-widest italic flex items-center gap-2">
                      <Zap className="h-5 w-5 text-primary" /> Configuração de Varredura
                    </CardTitle>
                    <CardDescription className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">Preencha os parâmetros para o radar neural</CardDescription>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={handleSuggest}
                    className="text-[9px] font-black uppercase tracking-widest text-primary/60 hover:text-primary hover:bg-primary/5 rounded-xl px-4"
                  >
                    <Sparkles className="h-3 w-3 mr-2" /> Sugerir Dados
                  </Button>
                </CardHeader>
                <CardContent className="p-10">
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                    <div className="md:col-span-6 space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-widest opacity-50 ml-1">O que você busca? (Nicho)</label>
                      <div className="relative group">
                        <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                        <Input 
                          placeholder="Ex: Barbearia, Dentista, Academia..." 
                          className="bg-white/5 border-white/10 h-16 pl-12 rounded-2xl focus-visible:ring-primary transition-all text-base font-medium"
                          value={niche}
                          onChange={e => setNiche(e.target.value)}
                          disabled={loading}
                        />
                      </div>
                    </div>
                    
                    <div className="md:col-span-6 space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-widest opacity-50 ml-1">Cidade</label>
                      <div className="relative group">
                        <Navigation className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                        <Input 
                          placeholder="Ex: São Paulo" 
                          className="bg-white/5 border-white/10 h-16 pl-12 rounded-2xl focus-visible:ring-primary transition-all text-base font-medium"
                          value={city}
                          onChange={e => setCity(e.target.value)}
                          disabled={loading}
                        />
                      </div>
                    </div>

                    <div className="md:col-span-4 space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-widest opacity-50 ml-1">Estado (UF)</label>
                      <div className="relative group">
                        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors z-10" />
                        <Select onValueChange={setState} value={state} disabled={loading}>
                          <SelectTrigger className="bg-white/5 border-white/10 h-16 pl-12 rounded-2xl focus:ring-primary text-base font-medium">
                            <SelectValue placeholder="Selecione UF" />
                          </SelectTrigger>
                          <SelectContent className="bg-[#0b0b14] border-white/10 text-white max-h-[300px]">
                            {STATES.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="md:col-span-8 space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-widest opacity-50 ml-1">País</label>
                      <div className="relative group">
                        <Flag className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                        <Input 
                          placeholder="Ex: Brasil" 
                          className="bg-white/5 border-white/10 h-16 pl-12 rounded-2xl focus-visible:ring-primary transition-all text-base font-medium"
                          value={country}
                          onChange={e => setCountry(e.target.value)}
                          disabled={loading}
                        />
                      </div>
                    </div>

                    <div className="md:col-span-12 pt-4">
                      <Button 
                        onClick={handleSearch} 
                        disabled={loading}
                        className="w-full h-20 bg-primary hover:bg-primary/90 transition-all rounded-[2rem] font-black uppercase tracking-[0.3em] text-lg shadow-[0_20px_50px_rgba(124,58,255,0.3)] active:scale-95"
                      >
                        {loading ? (
                          <div className="flex items-center gap-4">
                            <Loader2 className="h-8 w-8 animate-spin" /> 
                            <span>RASTREANDO ALVOS...</span>
                          </div>
                        ) : (
                          <span className="flex items-center gap-3">
                            <Search className="h-6 w-6" /> INICIAR PROSPECÇÃO
                          </span>
                        )}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <div className="space-y-8 pb-32 bg-transparent">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h2 className="text-3xl font-black italic uppercase tracking-tighter text-white">
                    Alvos Identificados
                  </h2>
                  <p className="text-muted-foreground text-[10px] uppercase font-bold tracking-widest">
                    O radar neural está operando na sua frequência de escala
                  </p>
                </div>
              </div>

              <div className="grid gap-6">
                <AnimatePresence mode="popLayout">
                  {leads.length === 0 && !loading ? (
                    <motion.div 
                      key="empty"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="py-32 text-center glass-card border-dashed border-white/10 bg-transparent"
                    >
                      <p className="text-muted-foreground uppercase text-[11px] font-black tracking-[0.5em] px-8 leading-relaxed">
                        SISTEMA AGUARDANDO COORDENADAS...
                      </p>
                    </motion.div>
                  ) : loading ? (
                    <div key="loading" className="py-32 text-center space-y-8">
                      <Loader2 className="h-24 w-24 animate-spin text-primary mx-auto" />
                      <p className="text-primary uppercase text-[11px] font-black tracking-[0.5em] animate-pulse">Sincronizando Banco de Dados Neural...</p>
                    </div>
                  ) : (
                    leads.map((lead, i) => (
                      <motion.div
                        key={lead.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                      >
                        <Card className={`glass-card transition-all duration-500 overflow-hidden group bg-transparent ${approachedLeads.includes(lead.id) ? 'opacity-60 grayscale' : ''}`}>
                          <CardContent className="p-10">
                            <div className="flex flex-col xl:flex-row justify-between gap-10">
                              <div className="flex gap-8 items-start flex-1">
                                <div className="h-16 w-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary shrink-0 border border-primary/20">
                                  <MapPin className="h-8 w-8" />
                                </div>
                                <div className="space-y-3 flex-1">
                                  <div className="flex items-center gap-4 flex-wrap">
                                    <h4 className="font-black text-2xl italic leading-none text-white uppercase tracking-tight">{lead.name}</h4>
                                    {lead.rating && lead.rating !== '0' && (
                                      <Badge variant="outline" className="bg-yellow-500/10 border-yellow-500/30 text-yellow-500 text-[10px] font-black py-1 px-3">
                                        ★ {lead.rating}
                                      </Badge>
                                    )}
                                  </div>
                                  <div className="flex items-center gap-3 text-[10px] text-muted-foreground font-black uppercase tracking-widest">
                                    <span className="text-primary/80 flex items-center gap-1"><Zap className="h-3 w-3 fill-primary" /> {lead.type}</span>
                                    <span className="opacity-20">•</span>
                                    <span>{lead.city}, {lead.state}</span>
                                  </div>
                                  <div className="flex flex-col gap-2 pt-2">
                                    <div className="flex items-center gap-3 text-sm font-bold text-white/70">
                                      <Phone className="h-4 w-4 text-primary/60" /> {lead.phone}
                                    </div>
                                    <div className="flex items-center gap-3 text-[11px] font-medium text-white/40 italic">
                                      <Navigation className="h-3.5 w-3.5 text-primary/40" /> {lead.address}
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div className="flex flex-col gap-3 min-w-[200px]">
                                <Button 
                                  onClick={() => handleGenMessage(lead)}
                                  disabled={generatingMsg === lead.id}
                                  className="w-full h-14 bg-primary text-white rounded-2xl text-[10px] font-black uppercase tracking-widest gap-3 shadow-xl hover:scale-105 active:scale-95 transition-all"
                                >
                                  {generatingMsg === lead.id ? <Loader2 className="h-5 w-5 animate-spin" /> : <Zap className="h-5 w-5" />}
                                  GERAR SCRIPT IA
                                </Button>

                                <Button 
                                  variant="ghost" 
                                  onClick={() => {
                                    if (!approachedLeads.includes(lead.id)) {
                                      setApproachedLeads(prev => [...prev, lead.id]);
                                      success("Alvo Marcado", "Lead marcado como abordado na sua base local.");
                                    } else {
                                      setApproachedLeads(prev => prev.filter(id => id !== lead.id));
                                    }
                                  }}
                                  className={`w-full h-14 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${approachedLeads.includes(lead.id) ? 'text-green-500 bg-green-500/5' : 'text-white/40 hover:bg-white/5'}`}
                                >
                                  {approachedLeads.includes(lead.id) ? (
                                    <><Check className="h-5 w-5 mr-3" /> ABORDADO</>
                                  ) : (
                                    <><Target className="h-5 w-5 mr-3 opacity-30" /> MARCAR ALVO</>
                                  )}
                                </Button>
                              </div>
                            </div>

                            {activeScript && activeScript.id === lead.id && (
                              <motion.div 
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                className="mt-8 p-8 bg-black/60 backdrop-blur-md border border-primary/30 rounded-3xl relative"
                              >
                                <div className="flex items-center justify-between mb-6">
                                  <h5 className="text-[11px] font-black uppercase tracking-widest text-primary italic">Script de Abordagem Personalizado</h5>
                                  <Button variant="ghost" size="sm" onClick={() => setActiveScript(null)} className="h-8 w-8 p-0 text-white/30 hover:text-white rounded-full">
                                    <X className="h-5 w-5" />
                                  </Button>
                                </div>
                                <Textarea 
                                  className="bg-black/40 border-white/5 text-white/90 italic text-base mb-6 min-h-[120px] p-6 rounded-2xl leading-relaxed resize-none shadow-inner"
                                  value={activeScript.message}
                                  readOnly
                                />
                                <Button 
                                  onClick={() => handleWhatsApp(activeScript.phone, activeScript.message)}
                                  className="w-full h-16 bg-green-600 hover:bg-green-500 text-white font-black uppercase tracking-[0.2em] text-xs rounded-2xl shadow-[0_15px_40px_rgba(22,163,74,0.3)] transition-all active:scale-[0.98]"
                                >
                                  ABRIR NO WHATSAPP <ExternalLink className="ml-3 h-5 w-5" />
                                </Button>
                              </motion.div>
                            )}
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))
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
