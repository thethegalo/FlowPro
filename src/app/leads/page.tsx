"use client";

import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Check, 
  MapPin, 
  Loader2,
  Phone,
  Zap,
  ExternalLink,
  X,
  Navigation,
  Target,
  Building2,
  Scissors,
  Utensils,
  Dumbbell,
  Stethoscope,
  ShoppingBag,
  Menu,
  Globe
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
import { Radar, IconContainer } from '@/components/ui/radar-effect';

const STATES = [
  "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", 
  "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", 
  "RS", "RO", "RR", "SC", "SP", "SE", "TO"
];

const ADMIN_EMAIL = "thethegalo@gmail.com";

interface Particle {
  left: string;
  top: string;
  duration: number;
  delay: number;
}

export default function LeadsPage() {
  const { user } = useUser();
  const db = useFirestore();
  const { toast, success, error, warning } = useToast();
  
  const [loading, setLoading] = useState(false);
  const [leads, setLeads] = useState<any[]>([]);
  const [niche, setNiche] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country] = useState('Brasil');
  const [serviceValue, setServiceValue] = useState(297);
  const [generatingMsg, setGeneratingMsg] = useState<string | null>(null);
  const [approachedLeads, setApproachedLeads] = useState<string[]>([]);
  const [activeScript, setActiveScript] = useState<{ id: string, message: string, phone: string } | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [manualLead, setManualLead] = useState({ name: '', email: '', phone: '', businessType: '' });
  const [isSavingManual, setIsManualSaving] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    // Generate particles only on the client to avoid hydration mismatch
    const newParticles = Array.from({ length: 12 }).map(() => ({
      left: `${15 + Math.random() * 70}%`,
      top: `${15 + Math.random() * 70}%`,
      duration: 4 + Math.random() * 2,
      delay: Math.random() * 5
    }));
    setParticles(newParticles);
  }, []);

  const userDocRef = useMemoFirebase(() => {
    if (!db || !user) return null;
    return doc(db, 'users', user.uid);
  }, [db, user]);
  const { data: userData } = useDoc(userDocRef);

  const isProMember = useMemo(() => {
    const p = userData?.plan;
    return p === 'vitalicio' || p === 'mensal' || p === 'trimestral' || user?.email === ADMIN_EMAIL;
  }, [userData, user]);

  const handleSearch = async () => {
    if (!niche || !state) {
      warning("Campos Obrigatórios", "Nicho e Estado são necessários para a varredura.");
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
      if (!response.ok) throw new Error(data.error || 'Falha na varredura neural');

      const finalLeads = isProMember ? data : data.slice(0, 5);
      setLeads(finalLeads);

      if (finalLeads.length > 0) {
        success("Varredura Concluída", `Identificamos ${finalLeads.length} novos alvos estratégicos.`);
      } else {
        toast.show("Sem Resultados", "Nenhum alvo encontrado nestas coordenadas.");
      }
    } catch (e: any) {
      error("Erro no Radar", e.message || "Interrupção na conexão neural.");
    } finally {
      setLoading(false);
    }
  };

  const handleManualSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!db || !user) return;
    setIsManualSaving(true);
    const leadData = {
      ...manualLead,
      capturedAt: serverTimestamp(),
      source: 'manual',
      city: '', state: '', address: '', rating: '5.0'
    };
    try {
      await addDoc(collection(db, 'users', user.uid, 'capturedLeads'), leadData);
      success("Alvo Registrado", "Coordenadas injetadas na base neural.");
      setManualLead({ name: '', email: '', phone: '', businessType: '' });
      setIsDialogOpen(false);
    } catch (err: any) {
      errorEmitter.emit('permission-error', new FirestorePermissionError({
        path: `users/${user.uid}/capturedLeads`, operation: 'create', requestResourceData: leadData
      }));
    } finally { setIsManualSaving(false); }
  };

  const handleWhatsApp = (phone: string, message: string) => {
    if (!phone || phone === 'Telefone não listado') {
      warning("Contato Bloqueado", "Este alvo não possui WhatsApp registrado.");
      return;
    }
    const cleanPhone = phone.replace(/\D/g, '');
    const waPhone = cleanPhone.length <= 11 ? `55${cleanPhone}` : cleanPhone;
    window.open(`https://wa.me/${waPhone}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleGenMessage = async (lead: any) => {
    setGeneratingMsg(lead.id);
    try {
      const res = await generateLeadMessage({
        businessName: lead.name || 'Dono do Negócio',
        businessType: lead.type || niche || 'Serviços',
        city: lead.city || city || 'Sua região'
      });
      if (res?.message) {
        setActiveScript({ id: lead.id, message: res.message, phone: lead.phone });
        success("Script Gerado", "Mensagem composta pelo motor de IA.");
        if (!approachedLeads.includes(lead.id)) setApproachedLeads(prev => [...prev, { id: lead.id, timestamp: Date.now() }].map(item => typeof item === 'string' ? item : item.id));
      }
    } catch (e: any) {
      error("Erro na IA", "Falha ao compor script personalizado.");
    } finally { setGeneratingMsg(null); }
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-transparent relative overflow-x-hidden">
        <AppSidebar />
        
        <main className="flex-1 flex flex-col min-w-0 relative z-10">
          <header className="h-[52px] border-b border-white/5 flex items-center justify-between px-6 bg-transparent sticky top-0 z-50">
            <div className="flex items-center gap-3">
              <SidebarTrigger className="md:hidden">
                <Menu className="h-5 w-5 text-white/50" />
              </SidebarTrigger>
              <Target className="h-[14px] w-[14px] text-primary/70" />
              <h1 className="text-[13px] font-medium text-white/50">Radar Neural</h1>
            </div>
            
            <div className="flex items-center gap-4">
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <button className="text-white/35 text-[12px] font-medium hover:text-white/60 transition-colors px-2">
                    Injeção Manual
                  </button>
                </DialogTrigger>
                <DialogContent className="bg-[#0e0e1a] border-white/10 text-white rounded-2xl">
                  <DialogHeader>
                    <DialogTitle className="text-lg font-semibold italic uppercase">Registrar Alvo Manual</DialogTitle>
                    <DialogDescription className="text-xs text-white/40 font-medium">Injetar coordenadas na base neural local.</DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleManualSave} className="space-y-4 py-4">
                    <div className="space-y-1.5">
                      <Label className="text-[10px] text-white/30 uppercase tracking-widest font-black">Nome da Empresa</Label>
                      <Input placeholder="Ex: Padaria do João" className="bg-white/5 border-white/10 h-11" value={manualLead.name} onChange={e => setManualLead({...manualLead, name: e.target.value})} required />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <Label className="text-[10px] text-white/30 uppercase tracking-widest font-black">WhatsApp</Label>
                        <Input placeholder="(00) 00000-0000" className="bg-white/5 border-white/10 h-11" value={manualLead.phone} onChange={e => setManualLead({...manualLead, phone: e.target.value})} required />
                      </div>
                      <div className="space-y-1.5">
                        <Label className="text-[10px] text-white/30 uppercase tracking-widest font-black">Nicho</Label>
                        <Input placeholder="Ex: Alimentação" className="bg-white/5 border-white/10 h-11" value={manualLead.businessType} onChange={e => setManualLead({...manualLead, businessType: e.target.value})} required />
                      </div>
                    </div>
                    <Button type="submit" disabled={isSavingManual} className="w-full h-12 bg-primary hover:bg-primary/90 font-bold uppercase tracking-widest text-xs rounded-xl">
                      {isSavingManual ? <Loader2 className="h-4 w-4 animate-spin" /> : "Registrar Alvo"}
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>
              <div className="bg-[#581c87]/40 border border-[#7c3aed]/30 text-[#c4b5fd] text-[11px] font-medium rounded-[6px] px-[10px] py-[4px] uppercase tracking-[0.5px]">
                VITALÍCIO
              </div>
            </div>
          </header>

          <div className="flex-1 container max-w-7xl mx-auto px-6 md:px-12 py-8 md:py-12 flex flex-col">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center flex-1">
              
              {/* FORMULÁRIO */}
              <div className="space-y-8">
                <div className="space-y-1.5">
                  <h2 className="text-xl md:text-2xl font-semibold text-white tracking-tight">Console de Busca</h2>
                  <p className="text-xs md:text-sm text-white/30 font-medium">Configure os parâmetros para varredura do ecossistema.</p>
                </div>

                <div className="h-px w-full bg-white/5" />

                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-white/30">Nicho do Negócio</label>
                    <Input 
                      placeholder="Ex: Barbearia, Dentista, Academia..." 
                      className="bg-white/[0.04] border-white/[0.08] h-11 text-sm focus-visible:ring-0 focus-visible:border-primary/40"
                      value={niche}
                      onChange={e => setNiche(e.target.value)}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-white/30">Cidade</label>
                      <Input 
                        placeholder="Ex: São Paulo" 
                        className="bg-white/[0.04] border-white/[0.08] h-11 text-sm"
                        value={city}
                        onChange={e => setCity(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-white/30">Estado (UF)</label>
                      <Select onValueChange={setState} value={state}>
                        <SelectTrigger className="bg-white/[0.04] border-white/[0.08] h-11 text-sm w-full">
                          <SelectValue placeholder="UF" />
                        </SelectTrigger>
                        <SelectContent className="bg-[#0b0b14] border-white/10 text-white max-h-[280px] w-[var(--radix-select-trigger-width)]">
                          {STATES.map(s => (
                            <SelectItem key={s} value={s} className="uppercase font-bold">
                              {s}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-white/30">País</label>
                    <Input 
                      placeholder="Brasil" 
                      className="bg-white/[0.04] border-white/[0.08] h-11 text-sm opacity-50"
                      value={country}
                      readOnly
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest opacity-50">Quanto você quer cobrar? (R$)</label>
                    <div className="flex flex-wrap gap-2">
                      {[97, 197, 297, 497, 697, 997, 1299].map(val => (
                        <button
                          key={val}
                          type="button"
                          onClick={() => setServiceValue(val)}
                          className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase border transition-all ${serviceValue === val ? 'bg-primary border-primary text-white' : 'bg-white/5 border-white/10 text-muted-foreground hover:bg-white/10'}`}
                        >
                          R$ {val}
                        </button>
                      ))}
                    </div>
                  </div>

                  <Button 
                    onClick={handleSearch} 
                    disabled={loading}
                    className="w-full h-12 bg-primary hover:bg-primary/90 transition-all rounded-xl font-bold uppercase tracking-widest text-xs text-white shadow-lg shadow-primary/20"
                  >
                    {loading ? (
                      <div className="flex items-center gap-3">
                        <Loader2 className="h-4 w-4 animate-spin" /> 
                        <span>Varredura Ativa...</span>
                      </div>
                    ) : "Iniciar prospecção"}
                  </Button>
                </div>
              </div>

              {/* RADAR VISUAL (DESKTOP ONLY) */}
              <div className="hidden md:flex flex-col items-center justify-center relative h-[500px] w-full">
                <div className="absolute top-0 text-center space-y-1">
                  <div className="flex items-center justify-center gap-2">
                    <div className="h-1.5 w-1.5 bg-green-500 rounded-full animate-pulse" />
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/60">Radar Neural Ativo</p>
                  </div>
                  <p className="text-[9px] text-white/20 uppercase font-bold tracking-widest">Varredura em escala 1:1</p>
                </div>

                <Radar 
                  style={{ width: '420px', height: '420px' }}
                  className="z-10"
                />

                <IconContainer icon={<Building2 className="h-4 w-4" />} text="Empresas" className="top-[5%] left-1/2 -translate-x-1/2" />
                <IconContainer icon={<Scissors className="h-4 w-4" />} text="Barbearias" className="top-[15%] right-[8%]" />
                <IconContainer icon={<Utensils className="h-4 w-4" />} text="Restaurantes" className="top-[15%] left-[8%]" />
                <IconContainer icon={<Dumbbell className="h-4 w-4" />} text="Academias" className="bottom-[20%] right-[10%]" />
                <IconContainer icon={<Stethoscope className="h-4 w-4" />} text="Clínicas" className="bottom-[20%] left-[10%]" />
                <IconContainer icon={<ShoppingBag className="h-4 w-4" />} text="Lojas" className="bottom-[5%] left-1/2 -translate-x-1/2" />

                {particles.map((p, i) => (
                  <motion.div
                    key={i}
                    className="absolute h-[3px] w-[3px] bg-primary/40 rounded-full"
                    animate={{ y: [0, -30, 0], x: [0, 10, 0], opacity: [0.2, 0.5, 0.2] }}
                    transition={{ duration: p.duration, repeat: Infinity, delay: p.delay }}
                    style={{ left: p.left, top: p.top }}
                  />
                ))}
              </div>
            </div>

            {/* RESULTADOS */}
            <div className="mt-16 space-y-8 pb-32">
              <div className="flex items-center justify-between border-b border-white/5 pb-4">
                <div className="space-y-1">
                  <h2 className="text-base md:text-lg font-semibold text-white tracking-tight">Alvos Identificados</h2>
                  <p className="text-white/20 text-[10px] uppercase font-bold tracking-widest">Monitoramento do ecossistema live</p>
                </div>
              </div>

              <div className="grid gap-4">
                <AnimatePresence mode="popLayout">
                  {leads.length === 0 && !loading ? (
                    <motion.div 
                      key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                      className="py-20 text-center glass-card border-dashed border-white/10"
                    >
                      <p className="text-white/20 text-[10px] font-black uppercase tracking-[0.3em]">Aguardando Coordenadas de Varredura</p>
                    </motion.div>
                  ) : loading ? (
                    <div key="loading" className="py-20 text-center space-y-4">
                      <div className="h-12 w-12 border-2 border-primary/20 border-t-primary rounded-full animate-spin mx-auto" />
                      <p className="text-primary/60 text-[10px] font-black uppercase tracking-widest animate-pulse">Escaneando Mercado...</p>
                    </div>
                  ) : (
                    leads.map((lead, i) => {
                      const potential = Math.floor(serviceValue * (1 + ((lead.id.charCodeAt(0) % 30) / 100)));
                      
                      return (
                        <motion.div key={lead.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                          <Card className={`glass-card transition-all group ${approachedLeads.includes(lead.id) ? 'opacity-50 grayscale' : ''}`}>
                            <CardContent className="p-6">
                              <div className="flex flex-col xl:flex-row justify-between gap-6">
                                <div className="flex gap-5 items-start flex-1">
                                  <div className="h-10 w-10 bg-white/5 rounded-lg flex items-center justify-center text-white/40 shrink-0 border border-white/5 group-hover:border-primary/30 transition-all">
                                    <MapPin className="h-5 w-5" />
                                  </div>
                                  <div className="space-y-1.5 flex-1 min-w-0">
                                    <div className="flex items-center justify-between gap-4">
                                      <div className="flex items-center gap-3">
                                        <h4 className="font-bold text-sm text-white/90 truncate">{lead.name}</h4>
                                        {lead.rating && lead.rating !== '0' && <Badge variant="outline" className="bg-yellow-500/5 border-yellow-500/20 text-yellow-500 text-[9px] font-bold shrink-0">★ {lead.rating}</Badge>}
                                      </div>
                                      <div className="px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-xl shrink-0">
                                        <p className="text-[9px] font-black uppercase text-green-400">💰 Potencial: R$ {potential}</p>
                                      </div>
                                    </div>
                                    <div className="flex items-center gap-3 text-[10px] text-white/30 uppercase font-black tracking-widest">
                                      <span className="text-primary/60">{lead.type}</span>
                                      <span>•</span>
                                      <span>{lead.city}, {lead.state}</span>
                                    </div>
                                    <div className="flex flex-col gap-1.5 pt-1">
                                      <div className="flex items-center gap-2 text-[12px] font-medium text-white/60">
                                        <Phone className="h-3.5 w-3.5 opacity-40 text-primary" /> {lead.phone}
                                      </div>
                                      
                                      {lead.website && (
                                        <div className="flex items-center gap-2 text-[11px] text-white/40 hover:text-primary transition-colors group/link">
                                          <Globe className="h-3.5 w-3.5 opacity-40 text-primary" />
                                          <a 
                                            href={lead.website} 
                                            target="_blank" 
                                            rel="noopener noreferrer" 
                                            className="truncate underline underline-offset-2 decoration-white/10 group-hover/link:decoration-primary/40"
                                          >
                                            {lead.website.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')}
                                          </a>
                                        </div>
                                      )}

                                      <div className="flex items-center gap-2 text-[11px] text-white/25">
                                        <Navigation className="h-3 w-3 opacity-30" /> {lead.address}
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                <div className="flex flex-row xl:flex-col gap-2 min-w-[180px]">
                                  <Button onClick={() => handleGenMessage(lead)} disabled={generatingMsg === lead.id} className="flex-1 h-10 bg-primary/20 border border-primary/30 text-primary-foreground rounded-xl text-[10px] font-black uppercase tracking-widest gap-2 hover:bg-primary/30">
                                    {generatingMsg === lead.id ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Zap className="h-3.5 w-3.5" />} Gerar script
                                  </Button>
                                  <Button variant="ghost" onClick={() => setApproachedLeads(prev => prev.includes(lead.id) ? prev.filter(id => id !== lead.id) : [...prev, lead.id])} className={`flex-1 h-10 rounded-xl text-[10px] font-black uppercase tracking-widest ${approachedLeads.includes(lead.id) ? 'text-green-500 bg-green-500/5' : 'text-white/20'}`}>
                                    {approachedLeads.includes(lead.id) ? <><Check className="h-4 w-4 mr-2" /> Abordado</> : <><Target className="h-4 w-4 mr-2" /> Marcar alvo</>}
                                  </Button>
                                </div>
                              </div>

                              {activeScript?.id === lead.id && (
                                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mt-6 p-6 bg-black/40 border border-primary/20 rounded-2xl">
                                  <div className="flex items-center justify-between mb-4">
                                    <h5 className="text-[10px] font-black uppercase tracking-[0.2em] text-primary/80 italic">Script de Abordagem Sugerido</h5>
                                    <Button variant="ghost" size="sm" onClick={() => setActiveScript(null)} className="h-8 w-8 rounded-full text-white/20 hover:text-white"><X className="h-4 w-4" /></Button>
                                  </div>
                                  <Textarea className="bg-black/20 border-white/5 text-white/80 text-sm mb-4 min-h-[120px] p-4 resize-none leading-relaxed font-medium" value={activeScript.message} readOnly />
                                  <Button onClick={() => handleWhatsApp(activeScript.phone, activeScript.message)} className="w-full h-12 bg-green-600/20 border border-green-500/30 text-green-400 font-black uppercase text-xs rounded-xl hover:bg-green-600/30 transition-all">Abrir no WhatsApp <ExternalLink className="ml-2 h-4 w-4" /></Button>
                              </motion.div>
                              )}
                            </CardContent>
                          </Card>
                        </motion.div>
                      );
                    })
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
