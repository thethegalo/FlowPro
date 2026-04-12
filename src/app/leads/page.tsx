"use client";

import { useState, useMemo } from 'react';
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
  UserPlus,
  Zap,
  ExternalLink,
  X,
  Navigation,
  Sparkles,
  Target,
  Building2,
  Scissors,
  Utensils,
  Dumbbell,
  Stethoscope,
  ShoppingBag
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
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [manualLead, setManualLead] = useState({ name: '', email: '', phone: '', businessType: '' });
  const [isSavingManual, setIsManualSaving] = useState(false);

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
        ? `Identificamos ${finalLeads.length} novos alvos.` 
        : "Relatório parcial gerado. Faça upgrade para ver todos.");
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
      ...manualLead,
      capturedAt: serverTimestamp(),
      source: 'manual',
      city: '', state: '', address: '', rating: '5.0'
    };
    try {
      await addDoc(collection(db, 'users', user.uid, 'capturedLeads'), leadData);
      success("Alvo Registrado", "Coordenadas salvas com sucesso.");
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
      warning("Contato Indisponível", "Número de WhatsApp não registrado.");
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
        success("Script Gerado", "Mensagem personalizada composta.");
        if (!approachedLeads.includes(lead.id)) setApproachedLeads(prev => [...prev, lead.id]);
      }
    } catch (e: any) {
      error("Falha na IA", "Motor neural indisponível.");
    } finally { setGeneratingMsg(null); }
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-transparent relative overflow-x-hidden">
        <AppSidebar />
        
        <main className="flex-1 flex flex-col min-w-0 relative z-10">
          <header className="h-16 border-b border-white/5 flex items-center justify-between px-6 bg-[#050508]/80 backdrop-blur-md sticky top-0 z-50">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="text-muted-foreground hover:text-white" />
              <div className="h-4 w-px bg-white/10" />
              <h1 className="text-sm font-semibold tracking-tight flex items-center gap-2">
                <Target className="h-4 w-4 text-primary" /> Radar Neural
              </h1>
            </div>
            
            <div className="flex items-center gap-3">
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm" className="h-8 rounded-lg border-white/10 text-white/70 text-[11px] font-medium px-3 gap-2 hover:bg-white/5">
                    <UserPlus className="h-3.5 w-3.5" /> Manual
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-[#0e0e1a] border-white/10 text-white rounded-2xl">
                  <DialogHeader>
                    <DialogTitle className="text-lg font-semibold">Registrar Alvo Manual</DialogTitle>
                    <DialogDescription className="text-xs text-white/40">Injetar coordenadas na base neural local.</DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleManualSave} className="space-y-4 py-4">
                    <div className="space-y-1.5">
                      <Label className="text-[11px] text-white/30 uppercase tracking-wider">Nome da Empresa</Label>
                      <Input placeholder="Ex: Padaria do João" className="bg-white/5 border-white/10" value={manualLead.name} onChange={e => setManualLead({...manualLead, name: e.target.value})} required />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <Label className="text-[11px] text-white/30 uppercase tracking-wider">WhatsApp</Label>
                        <Input placeholder="(00) 00000-0000" className="bg-white/5 border-white/10" value={manualLead.phone} onChange={e => setManualLead({...manualLead, phone: e.target.value})} required />
                      </div>
                      <div className="space-y-1.5">
                        <Label className="text-[11px] text-white/30 uppercase tracking-wider">Nicho</Label>
                        <Input placeholder="Ex: Alimentação" className="bg-white/5 border-white/10" value={manualLead.businessType} onChange={e => setManualLead({...manualLead, businessType: e.target.value})} required />
                      </div>
                    </div>
                    <Button type="submit" disabled={isSavingManual} className="w-full h-11 bg-primary hover:bg-primary/90 font-medium">
                      {isSavingManual ? <Loader2 className="h-4 w-4 animate-spin" /> : "Salvar Alvo"}
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>
              <Badge className="bg-primary/10 border-primary/20 text-primary text-[9px] font-semibold px-2 py-0.5">
                {isProMember ? 'VITALÍCIO' : 'TESTE'}
              </Badge>
            </div>
          </header>

          <div className="flex-1 container max-w-7xl mx-auto px-8 py-12 flex flex-col">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center flex-1">
              
              {/* COLUNA ESQUERDA: FORMULÁRIO */}
              <div className="space-y-8">
                <div className="space-y-1.5">
                  <h2 className="text-[18px] font-semibold text-white tracking-tight">Console de Busca</h2>
                  <p className="text-[12px] text-white/30 font-normal">Configure os parâmetros para varredura do ecossistema.</p>
                </div>

                <div className="h-px w-full bg-white/5" />

                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[11px] font-medium uppercase tracking-[0.6px] text-white/30">Nicho do Negócio</label>
                    <Input 
                      placeholder="Ex: Barbearia, Dentista, Academia..." 
                      className="bg-white/[0.04] border-white/[0.08] h-[42px] text-[13px] focus-visible:ring-0 focus-visible:border-primary/40"
                      value={niche}
                      onChange={e => setNiche(e.target.value)}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[11px] font-medium uppercase tracking-[0.6px] text-white/30">Cidade</label>
                      <Input 
                        placeholder="Ex: São Paulo" 
                        className="bg-white/[0.04] border-white/[0.08] h-[42px] text-[13px]"
                        value={city}
                        onChange={e => setCity(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[11px] font-medium uppercase tracking-[0.6px] text-white/30">Estado (UF)</label>
                      <Select onValueChange={setState} value={state}>
                        <SelectTrigger className="bg-white/[0.04] border-white/[0.08] h-[42px] text-[13px]">
                          <SelectValue placeholder="UF" />
                        </SelectTrigger>
                        <SelectContent className="bg-[#0b0b14] border-white/10 text-white">
                          {STATES.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[11px] font-medium uppercase tracking-[0.6px] text-white/30">País</label>
                    <Input 
                      placeholder="Brasil" 
                      className="bg-white/[0.04] border-white/[0.08] h-[42px] text-[13px]"
                      value={country}
                      onChange={e => setCountry(e.target.value)}
                    />
                  </div>

                  <Button 
                    onClick={handleSearch} 
                    disabled={loading}
                    className="w-full h-[44px] bg-[#6d28d9] hover:bg-[#7c3aed] transition-colors rounded-lg font-medium text-[13px] text-white shadow-lg"
                  >
                    {loading ? (
                      <div className="flex items-center gap-3">
                        <Loader2 className="h-4 w-4 animate-spin" /> 
                        <span>Escaneando mercado...</span>
                      </div>
                    ) : "Iniciar prospecção"}
                  </Button>
                </div>
              </div>

              {/* COLUNA DIREITA: RADAR VISUAL */}
              <div className="hidden md:flex flex-col items-center justify-center relative h-[500px] w-full">
                <Radar 
                  style={{ width: '420px', height: '420px' }}
                  className="z-10"
                />

                {/* Satélites de Dados */}
                <IconContainer 
                  icon={<Building2 className="h-[18px] w-[18px]" />} 
                  text="Empresas" 
                  className="top-[5%] left-1/2 -translate-x-1/2" 
                />
                <IconContainer 
                  icon={<Scissors className="h-[18px] w-[18px]" />} 
                  text="Barbearias" 
                  className="top-[15%] right-[8%]" 
                />
                <IconContainer 
                  icon={<Utensils className="h-[18px] w-[18px]" />} 
                  text="Restaurantes" 
                  className="top-[15%] left-[8%]" 
                />
                <IconContainer 
                  icon={<Dumbbell className="h-[18px] w-[18px]" />} 
                  text="Academias" 
                  className="bottom-[20%] right-[10%]" 
                />
                <IconContainer 
                  icon={<Stethoscope className="h-[18px] w-[18px]" />} 
                  text="Clínicas" 
                  className="bottom-[20%] left-[10%]" 
                />
                <IconContainer 
                  icon={<ShoppingBag className="h-[18px] w-[18px]" />} 
                  text="Lojas" 
                  className="bottom-[5%] left-1/2 -translate-x-1/2" 
                />

                {/* Floating Particles */}
                {[...Array(12)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute h-[3px] w-[3px] bg-purple-500/40 rounded-full"
                    animate={{
                      y: [0, -30, 0],
                      x: [0, 10, 0],
                      opacity: [0.2, 0.5, 0.2]
                    }}
                    transition={{
                      duration: 4 + Math.random() * 2,
                      repeat: Infinity,
                      delay: Math.random() * 5
                    }}
                    style={{
                      left: `${15 + Math.random() * 70}%`,
                      top: `${15 + Math.random() * 70}%`
                    }}
                  />
                ))}
              </div>
            </div>

            {/* RESULTADOS (Lista) */}
            <div className="mt-20 space-y-8 pb-32">
              <div className="flex items-center justify-between border-b border-white/5 pb-4">
                <div className="space-y-1">
                  <h2 className="text-[15px] font-semibold text-white/85 tracking-tight">Alvos Identificados</h2>
                  <p className="text-white/30 text-[11px] font-normal">Monitoramento do ecossistema em tempo real</p>
                </div>
              </div>

              <div className="grid gap-4">
                <AnimatePresence mode="popLayout">
                  {leads.length === 0 && !loading ? (
                    <motion.div 
                      key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                      className="py-20 text-center glass-card border-dashed border-white/10"
                    >
                      <p className="text-white/20 text-[11px] font-medium uppercase tracking-[0.2em]">Sistema aguardando coordenadas...</p>
                    </motion.div>
                  ) : loading ? (
                    <div key="loading" className="py-20 text-center space-y-4">
                      <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto" />
                      <p className="text-primary/60 text-[11px] font-medium tracking-widest uppercase animate-pulse">Varredura em curso...</p>
                    </div>
                  ) : (
                    leads.map((lead, i) => (
                      <motion.div key={lead.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                        <Card className={`glass-card transition-all duration-300 group ${approachedLeads.includes(lead.id) ? 'opacity-50 grayscale' : ''}`}>
                          <CardContent className="p-6">
                            <div className="flex flex-col xl:flex-row justify-between gap-6">
                              <div className="flex gap-5 items-start flex-1">
                                <div className="h-10 w-10 bg-white/5 rounded-lg flex items-center justify-center text-white/40 shrink-0 border border-white/5 group-hover:border-primary/30 transition-all">
                                  <MapPin className="h-5 w-5" />
                                </div>
                                <div className="space-y-1.5 flex-1">
                                  <div className="flex items-center gap-3">
                                    <h4 className="font-semibold text-sm text-white/90">{lead.name}</h4>
                                    {lead.rating && lead.rating !== '0' && <Badge variant="outline" className="bg-yellow-500/5 border-yellow-500/20 text-yellow-500 text-[9px]">★ {lead.rating}</Badge>}
                                  </div>
                                  <div className="flex items-center gap-3 text-[10px] text-white/30 uppercase font-medium tracking-wider">
                                    <span className="text-primary/60">{lead.type}</span>
                                    <span>•</span>
                                    <span>{lead.city}, {lead.state}</span>
                                  </div>
                                  <div className="flex flex-col gap-1 pt-1">
                                    <div className="flex items-center gap-2 text-[12px] font-medium text-white/60"><Phone className="h-3 w-3 opacity-40" /> {lead.phone}</div>
                                    <div className="flex items-center gap-2 text-[11px] text-white/25"><Navigation className="h-3 w-3" /> {lead.address}</div>
                                  </div>
                                </div>
                              </div>

                              <div className="flex flex-row xl:flex-col gap-2 min-w-[180px]">
                                <Button onClick={() => handleGenMessage(lead)} disabled={generatingMsg === lead.id} className="flex-1 h-9 bg-primary/20 border border-primary/30 text-primary-foreground rounded-lg text-[11px] font-semibold gap-2 hover:bg-primary/30">
                                  {generatingMsg === lead.id ? <Loader2 className="h-3 w-3 animate-spin" /> : <Zap className="h-3 w-3" />} Gerar script
                                </Button>
                                <Button variant="ghost" onClick={() => setApproachedLeads(prev => prev.includes(lead.id) ? prev.filter(id => id !== lead.id) : [...prev, lead.id])} className={`flex-1 h-9 rounded-lg text-[11px] font-semibold ${approachedLeads.includes(lead.id) ? 'text-green-500 bg-green-500/5' : 'text-white/30'}`}>
                                  {approachedLeads.includes(lead.id) ? <><Check className="h-4 w-4 mr-2" /> Abordado</> : <><Target className="h-4 w-4 mr-2" /> Marcar alvo</>}
                                </Button>
                              </div>
                            </div>

                            {activeScript?.id === lead.id && (
                              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mt-6 p-6 bg-black/40 border border-primary/20 rounded-xl">
                                <div className="flex items-center justify-between mb-4">
                                  <h5 className="text-[10px] font-bold uppercase tracking-widest text-primary/80 italic">Script de Abordagem</h5>
                                  <Button variant="ghost" size="sm" onClick={() => setActiveScript(null)} className="h-6 w-6 text-white/20 hover:text-white"><X className="h-4 w-4" /></Button>
                                </div>
                                <Textarea className="bg-black/20 border-white/5 text-white/80 text-[13px] mb-4 min-h-[100px] p-4 resize-none leading-relaxed" value={activeScript.message} readOnly />
                                <Button onClick={() => handleWhatsApp(activeScript.phone, activeScript.message)} className="w-full h-10 bg-green-600/20 border border-green-500/30 text-green-400 font-bold uppercase text-[10px] rounded-lg hover:bg-green-600/30">Abrir no WhatsApp <ExternalLink className="ml-2 h-3 w-3" /></Button>
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
