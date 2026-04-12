"use client";

import { useState, useMemo } from 'react';
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
  Phone,
  UserPlus,
  Zap,
  ExternalLink,
  X,
  Navigation,
  Sparkles,
  Target,
  Building2,
  Flag,
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

          <div className="flex-1 container max-w-7xl mx-auto p-4 md:p-12 space-y-12 relative overflow-visible bg-transparent">
            
            {/* NOVO LAYOUT DE DUAS COLUNAS */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
              
              {/* COLUNA ESQUERDA: CONSOLE DE BUSCA */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="md:col-span-7 lg:col-span-6 z-20"
              >
                <Card className="glass-card overflow-hidden shadow-[0_0_60px_rgba(124,58,255,0.08)] bg-[#080814]/60 backdrop-blur-[16px] border-purple-500/15">
                  <CardHeader className="bg-white/5 border-b border-white/5 p-6 flex flex-row items-center justify-between">
                    <div className="space-y-1">
                      <CardTitle className="text-sm font-semibold flex items-center gap-2 text-white/90">
                        <Target className="h-4 w-4 text-primary" /> Console de Busca
                      </CardTitle>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={handleSuggest}
                      className="text-[9px] font-black uppercase tracking-widest text-primary/60 hover:text-primary hover:bg-primary/5 rounded-xl px-4"
                    >
                      <Sparkles className="h-3 w-3 mr-2" /> Sugerir
                    </Button>
                  </CardHeader>
                  <CardContent className="p-8 space-y-6">
                    <div className="grid grid-cols-1 gap-5">
                      <div className="space-y-2">
                        <label className="text-[10px] font-medium uppercase tracking-[0.8px] text-white/35 ml-1">Nicho do Negócio</label>
                        <Input 
                          placeholder="Ex: Barbearia, Dentista..." 
                          className="bg-white/5 border-white/10 h-10 rounded-lg focus-visible:ring-primary transition-all text-[13px]"
                          value={niche}
                          onChange={e => setNiche(e.target.value)}
                          disabled={loading}
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-[10px] font-medium uppercase tracking-[0.8px] text-white/35 ml-1">Cidade</label>
                          <Input 
                            placeholder="Ex: São Paulo" 
                            className="bg-white/5 border-white/10 h-10 rounded-lg focus-visible:ring-primary transition-all text-[13px]"
                            value={city}
                            onChange={e => setCity(e.target.value)}
                            disabled={loading}
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-medium uppercase tracking-[0.8px] text-white/35 ml-1">Estado (UF)</label>
                          <Select onValueChange={setState} value={state} disabled={loading}>
                            <SelectTrigger className="bg-white/5 border-white/10 h-10 rounded-lg focus:ring-primary text-[13px]">
                              <SelectValue placeholder="UF" />
                            </SelectTrigger>
                            <SelectContent className="bg-[#0b0b14] border-white/10 text-white max-h-[250px]">
                              {STATES.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-[10px] font-medium uppercase tracking-[0.8px] text-white/35 ml-1">País</label>
                        <Input 
                          placeholder="Brasil" 
                          className="bg-white/5 border-white/10 h-10 rounded-lg focus-visible:ring-primary text-[13px]"
                          value={country}
                          onChange={e => setCountry(e.target.value)}
                          disabled={loading}
                        />
                      </div>

                      <div className="pt-2">
                        <Button 
                          onClick={handleSearch} 
                          disabled={loading}
                          className="w-full h-11 bg-[#7c3aed]/85 hover:bg-[#7c3aed] transition-all rounded-lg font-medium text-[13px] shadow-lg active:scale-95"
                        >
                          {loading ? (
                            <div className="flex items-center gap-3">
                              <Loader2 className="h-4 w-4 animate-spin" /> 
                              <span>Escaneando mercado...</span>
                            </div>
                          ) : (
                            <span className="flex items-center gap-2">
                              <Search className="h-4 w-4" /> Iniciar prospecção
                            </span>
                          )}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* COLUNA DIREITA: RADAR VISUAL */}
              <div className="hidden md:flex md:col-span-5 lg:col-span-6 flex-col items-center justify-center relative min-h-[400px] overflow-hidden">
                <div className="absolute top-0 w-full text-center space-y-1">
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-[11px] font-medium uppercase tracking-widest text-purple-400/60">Radar Neural Ativo</span>
                    <div className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                  </div>
                  <p className="text-[11px] text-white/30">Escaneando oportunidades em tempo real</p>
                </div>

                {/* Partículas flutuantes */}
                {[...Array(12)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute h-[3px] w-[3px] bg-purple-500 rounded-full opacity-40"
                    animate={{
                      y: [0, -20, 0],
                      opacity: [0.2, 0.6, 0.2],
                      scale: [1, 1.2, 1]
                    }}
                    transition={{
                      duration: 3 + Math.random() * 2,
                      repeat: Infinity,
                      delay: Math.random() * 2
                    }}
                    style={{
                      left: `${Math.random() * 80 + 10}%`,
                      top: `${Math.random() * 80 + 10}%`
                    }}
                  />
                ))}

                <div className="relative flex flex-col items-center justify-center gap-8">
                  {/* Row 1 */}
                  <div className="flex gap-16">
                    <IconContainer icon={<Building2 className="h-4 w-4" />} text="Empresas" delay={0.2} />
                    <IconContainer icon={<Scissors className="h-4 w-4" />} text="Barbearias" delay={0.4} />
                    <IconContainer icon={<Utensils className="h-4 w-4" />} text="Restaurantes" delay={0.3} />
                  </div>
                  
                  {/* Radar Central */}
                  <Radar className="h-32 w-32" />

                  {/* Row 2 */}
                  <div className="flex gap-20">
                    <IconContainer icon={<Dumbbell className="h-4 w-4" />} text="Academias" delay={0.5} />
                    <IconContainer icon={<Stethoscope className="h-4 w-4" />} text="Clínicas" delay={0.8} />
                  </div>

                  {/* Row 3 */}
                  <IconContainer icon={<ShoppingBag className="h-4 w-4" />} text="Lojas" delay={0.6} />
                </div>
              </div>
            </div>

            <div className="space-y-8 pb-32 bg-transparent">
              <div className="flex items-center justify-between border-b border-white/5 pb-4">
                <div className="space-y-1">
                  <h2 className="text-[15px] font-semibold text-white/85 tracking-tight">
                    Alvos Identificados
                  </h2>
                  <p className="text-white/30 text-[11px] font-normal">
                    Resultados da varredura neural do ecossistema
                  </p>
                </div>
              </div>

              <div className="grid gap-4">
                <AnimatePresence mode="popLayout">
                  {leads.length === 0 && !loading ? (
                    <motion.div 
                      key="empty"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="py-20 text-center glass-card border-dashed border-white/10 bg-transparent"
                    >
                      <p className="text-muted-foreground uppercase text-[10px] font-bold tracking-[0.3em] px-8">
                        Sistema aguardando coordenadas...
                      </p>
                    </motion.div>
                  ) : loading ? (
                    <div key="loading" className="py-20 text-center space-y-6">
                      <div className="relative h-12 w-12 mx-auto">
                        <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-pulse" />
                        <Loader2 className="h-12 w-12 animate-spin text-primary relative z-10" />
                      </div>
                      <p className="text-primary/60 text-[11px] font-medium tracking-[0.2em] animate-pulse uppercase">Sincronizando base de dados...</p>
                    </div>
                  ) : (
                    leads.map((lead, i) => (
                      <motion.div
                        key={lead.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                      >
                        <Card className={`glass-card transition-all duration-300 overflow-hidden group bg-white/[0.02] border-white/5 hover:bg-white/[0.04] ${approachedLeads.includes(lead.id) ? 'opacity-50 grayscale' : ''}`}>
                          <CardContent className="p-6">
                            <div className="flex flex-col xl:flex-row justify-between gap-6">
                              <div className="flex gap-5 items-start flex-1">
                                <div className="h-10 w-10 bg-white/5 rounded-lg flex items-center justify-center text-white/40 shrink-0 border border-white/5 group-hover:border-primary/30 group-hover:text-primary transition-all">
                                  <MapPin className="h-5 w-5" />
                                </div>
                                <div className="space-y-1.5 flex-1">
                                  <div className="flex items-center gap-3 flex-wrap">
                                    <h4 className="font-semibold text-sm text-white/90 tracking-tight">{lead.name}</h4>
                                    {lead.rating && lead.rating !== '0' && (
                                      <Badge variant="outline" className="bg-yellow-500/5 border-yellow-500/20 text-yellow-500/80 text-[9px] font-bold py-0 h-4">
                                        ★ {lead.rating}
                                      </Badge>
                                    )}
                                  </div>
                                  <div className="flex items-center gap-3 text-[10px] text-white/30 font-medium uppercase tracking-widest">
                                    <span className="text-primary/60 flex items-center gap-1">{lead.type}</span>
                                    <span>•</span>
                                    <span>{lead.city}, {lead.state}</span>
                                  </div>
                                  <div className="flex flex-col gap-1 pt-1">
                                    <div className="flex items-center gap-2 text-[12px] font-medium text-white/60">
                                      <Phone className="h-3 w-3 opacity-40" /> {lead.phone}
                                    </div>
                                    <div className="flex items-center gap-2 text-[11px] text-white/25">
                                      <Navigation className="h-3 w-3" /> {lead.address}
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div className="flex flex-row xl:flex-col gap-2 min-w-[180px]">
                                <Button 
                                  onClick={() => handleGenMessage(lead)}
                                  disabled={generatingMsg === lead.id}
                                  className="flex-1 h-9 bg-[#7c3aed]/20 border border-[#7c3aed]/30 text-[#c4b5fd] rounded-lg text-[11px] font-semibold gap-2 hover:bg-[#7c3aed]/30 transition-all"
                                >
                                  {generatingMsg === lead.id ? <Loader2 className="h-3 w-3 animate-spin" /> : <Zap className="h-3 w-3" />}
                                  Gerar script
                                </Button>

                                <Button 
                                  variant="ghost" 
                                  onClick={() => {
                                    if (!approachedLeads.includes(lead.id)) {
                                      setApproachedLeads(prev => [...prev, lead.id]);
                                      success("Alvo Marcado", "Lead marcado como abordado.");
                                    } else {
                                      setApproachedLeads(prev => prev.filter(id => id !== lead.id));
                                    }
                                  }}
                                  className={`flex-1 h-9 rounded-lg text-[11px] font-semibold transition-all ${approachedLeads.includes(lead.id) ? 'text-green-500 bg-green-500/5' : 'text-white/30 hover:bg-white/5'}`}
                                >
                                  {approachedLeads.includes(lead.id) ? (
                                    <><Check className="h-4 w-4 mr-2" /> Abordado</>
                                  ) : (
                                    <><Target className="h-4 w-4 mr-2" /> Marcar alvo</>
                                  )}
                                </Button>
                              </div>
                            </div>

                            {activeScript && activeScript.id === lead.id && (
                              <motion.div 
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                className="mt-6 p-6 bg-black/40 backdrop-blur-md border border-primary/20 rounded-xl relative"
                              >
                                <div className="flex items-center justify-between mb-4">
                                  <h5 className="text-[10px] font-bold uppercase tracking-widest text-primary/80 italic">Script de Abordagem Personalizado</h5>
                                  <Button variant="ghost" size="sm" onClick={() => setActiveScript(null)} className="h-6 w-6 p-0 text-white/20 hover:text-white rounded-full">
                                    <X className="h-4 w-4" />
                                  </Button>
                                </div>
                                <Textarea 
                                  className="bg-black/20 border-white/5 text-white/80 italic text-[13px] mb-4 min-h-[100px] p-4 rounded-lg leading-relaxed resize-none"
                                  value={activeScript.message}
                                  readOnly
                                />
                                <Button 
                                  onClick={() => handleWhatsApp(activeScript.phone, activeScript.message)}
                                  className="w-full h-10 bg-green-600/20 border border-green-500/30 text-green-400 font-bold uppercase tracking-widest text-[10px] rounded-lg hover:bg-green-600/30 transition-all"
                                >
                                  Abrir no WhatsApp <ExternalLink className="ml-2 h-3 w-3" />
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
