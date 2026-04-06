
"use client";

import { useState, useMemo } from 'react';
import Link from 'next/link';
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
  Download,
  Send,
  History,
  Plus,
  Mail,
  Briefcase,
  UserPlus,
  Zap,
  Globe,
  Star
} from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { generateLeadMessage } from '@/ai/flows/generate-lead-message';
import { useToast } from '@/hooks/use-toast';
import { useUser, useFirestore, useMemoFirebase, useDoc } from '@/firebase';
import { doc, updateDoc, increment, serverTimestamp, collection, addDoc } from 'firebase/firestore';
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

const STATES = ["SP", "RJ", "MG", "PR", "SC", "RS", "BA", "CE", "PE", "GO"];

export default function LeadsPage() {
  const { user } = useUser();
  const db = useFirestore();
  const { toast } = useToast();
  
  const [loading, setLoading] = useState(false);
  const [leads, setLeads] = useState<any[]>([]);
  const [niche, setNiche] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [generatingMsg, setGeneratingMsg] = useState<string | null>(null);
  const [capturingId, setCapturingId] = useState<string | null>(null);
  const [approachedLeads, setApproachedLeads] = useState<string[]>([]);

  // Manual Capture Form State
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
    return p === 'vitalicio' || p === 'mensal' || p === 'trimestral';
  }, [userData]);

  const handleSearch = async () => {
    if (!niche || !state) {
      toast({ variant: "destructive", title: "Campos Obrigatórios", description: "Por favor, digite o nicho e selecione o estado." });
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

      // Limite de 20 para PRO e 5 para Free
      const finalLeads = isProMember ? (data.length > 20 ? data.slice(0, 20) : data) : data.slice(0, 5);
      setLeads(finalLeads);

      toast({ 
        title: "Radar Ativo!", 
        description: isProMember 
          ? `Encontramos ${finalLeads.length} leads de elite para você.` 
          : "Encontramos vários leads! Assine o PRO para ver a lista completa de 20+."
      });
    } catch (e: any) {
      toast({ variant: "destructive", title: "Erro na Busca", description: e.message || "Falha na conexão neural." });
    } finally {
      setLoading(false);
    }
  };

  const handleSaveLead = async (lead: any) => {
    if (!db || !user) return;
    
    setCapturingId(lead.id);
    try {
      await addDoc(collection(db, 'users', user.uid, 'capturedLeads'), {
        ...lead,
        capturedAt: serverTimestamp(),
        source: 'radar'
      });
      toast({ title: "Lead Salvo!", description: "Adicionado à sua base de dados com sucesso." });
    } catch (e: any) {
      toast({ variant: "destructive", title: "Erro ao Salvar", description: "Verifique suas permissões de acesso." });
    } finally {
      setCapturingId(null);
    }
  };

  const handleManualSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!db || !user) return;
    
    setIsManualSaving(true);
    try {
      await addDoc(collection(db, 'users', user.uid, 'capturedLeads'), {
        ...manualLead,
        capturedAt: serverTimestamp(),
        source: 'manual'
      });
      
      toast({ title: "Lead Cadastrado!", description: "Dados salvos na sua base neural." });
      setManualLead({ name: '', email: '', phone: '', businessType: '' });
      setIsDialogOpen(false);
    } catch (e) {
      toast({ variant: "destructive", title: "Erro", description: "Não foi possível salvar o lead manual." });
    } finally {
      setIsManualSaving(false);
    }
  };

  const handleWhatsApp = (phone: string, message?: string) => {
    if (!phone || phone === 'Telefone não listado') {
      toast({ variant: "destructive", title: "Contato Indisponível", description: "Este lead não possui um número válido." });
      return;
    }
    const cleanPhone = phone.replace(/\D/g, '');
    const waPhone = cleanPhone.length <= 11 ? `55${cleanPhone}` : cleanPhone;
    const encodedMsg = message ? encodeURIComponent(message) : '';
    
    window.open(`https://wa.me/${waPhone}${message ? `?text=${encodedMsg}` : ''}`, '_blank');
  };

  const handleGenMessage = async (lead: any) => {
    setGeneratingMsg(lead.id);
    try {
      const res = await generateLeadMessage({
        businessName: lead.name || 'Dono do Negócio',
        businessType: lead.type || 'Serviços',
        city: lead.city || 'Sua cidade'
      });
      
      if (res && res.message) {
        handleWhatsApp(lead.phone, res.message);
        toast({ title: "WhatsApp Conectado!", description: "Mensagem estratégica gerada pela IA." });
        
        if (!approachedLeads.includes(lead.id)) {
          setApproachedLeads(prev => [...prev, lead.id]);
        }
      }
    } catch (e) {
      toast({ variant: "destructive", title: "Erro de IA", description: "O motor neural falhou ao gerar o script. Tente novamente." });
    } finally {
      setGeneratingMsg(null);
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
                <Users className="h-4 w-4 text-primary" /> Radar de Leads
              </h1>
            </div>
            
            <div className="flex items-center gap-3">
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm" className="h-9 rounded-xl border-primary/30 text-primary text-[9px] font-black uppercase px-4 gap-2 hover:bg-primary hover:text-white transition-all">
                    <UserPlus className="h-3.5 w-3.5" /> NOVO LEAD
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-[#0e0e1a] border-white/10 text-white rounded-[2rem] sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle className="text-xl font-black italic uppercase tracking-tighter">Capturar Lead Manual</DialogTitle>
                    <DialogDescription className="text-[10px] uppercase font-bold text-muted-foreground">
                      Insira os dados do lead para salvar na sua base neural.
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleManualSave} className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label className="text-[10px] font-black uppercase opacity-50">Nome do Lead</Label>
                      <Input 
                        placeholder="Ex: João da Silva" 
                        className="bg-white/5 border-white/10 rounded-xl"
                        value={manualLead.name}
                        onChange={e => setManualLead({...manualLead, name: e.target.value})}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[10px] font-black uppercase opacity-50">Email Profissional</Label>
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
                        <Label className="text-[10px] font-black uppercase opacity-50">Segmento</Label>
                        <Input 
                          placeholder="Ex: Tecnologia" 
                          className="bg-white/5 border-white/10 rounded-xl"
                          value={manualLead.businessType}
                          onChange={e => setManualLead({...manualLead, businessType: e.target.value})}
                          required
                        />
                      </div>
                    </div>
                    <Button type="submit" disabled={isSavingManual} className="w-full h-14 bg-primary hover:bg-primary/90 font-black uppercase tracking-widest rounded-2xl shadow-xl shadow-primary/20">
                      {isSavingManual ? <Loader2 className="h-5 w-5 animate-spin" /> : "CAPTURAR LEAD AGORA"}
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>

              <Badge className={`bg-primary/20 text-primary border-primary/30 text-[8px] font-black uppercase px-3 py-1`}>
                {userData?.plan?.toUpperCase() || 'MODO FREE'}
              </Badge>
            </div>
          </header>

          <div className="flex-1 container max-w-4xl mx-auto p-4 md:p-8 space-y-8">
            {/* SEARCH FILTERS */}
            <Card className="glass-card border-white/10 overflow-hidden rounded-[2rem]">
              <CardHeader className="bg-white/5 border-b border-white/5 p-6">
                <CardTitle className="text-sm font-black uppercase tracking-widest italic flex items-center gap-2">
                  <Filter className="h-4 w-4 text-primary" /> Parâmetros do Radar Neural
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                  <div className="md:col-span-5 space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest opacity-50">O que você quer vender?</label>
                    <Input 
                      placeholder="Ex: Barbearia, Dentista..." 
                      className="bg-white/5 border-white/10 h-14 rounded-2xl focus-visible:ring-primary text-sm"
                      value={niche}
                      onChange={e => setNiche(e.target.value)}
                    />
                  </div>
                  <div className="md:col-span-3 space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest opacity-50">Estado (UF)</label>
                    <Select onValueChange={setState}>
                      <SelectTrigger className="bg-white/5 border-white/10 rounded-2xl h-14">
                        <SelectValue placeholder="UF" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#0b0b14] border-white/10 text-white">
                        {STATES.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="md:col-span-4 space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest opacity-50">Cidade (Opcional)</label>
                    <Input 
                      placeholder="Ex: São Paulo" 
                      className="bg-white/5 border-white/10 h-14 rounded-2xl focus-visible:ring-primary text-sm"
                      value={city}
                      onChange={e => setCity(e.target.value)}
                    />
                  </div>
                  <div className="md:col-span-12 pt-2">
                    <Button 
                      onClick={handleSearch} 
                      disabled={loading}
                      className="w-full h-16 bg-primary hover:bg-primary/90 rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-primary/20 transition-all active:scale-[0.98]"
                    >
                      {loading ? <Loader2 className="h-6 w-6 animate-spin" /> : <><Search className="h-5 w-5 mr-2" /> ATIVAR BUSCA NEURAL</>}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-6 pb-20">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-black italic uppercase tracking-tighter">
                  {leads.length > 0 ? `Resultados (${leads.length}${!isProMember ? '/20+' : ''})` : 'Aguardando Operação'}
                </h2>
                {leads.length > 0 && (
                  <Button variant="ghost" onClick={() => setLeads([])} className="text-[10px] font-black uppercase tracking-widest opacity-50 hover:opacity-100">
                    Limpar Resultados
                  </Button>
                )}
              </div>

              {!isProMember && leads.length > 0 && (
                <div className="p-6 bg-primary/10 border border-primary/20 rounded-3xl flex items-center justify-between gap-6">
                  <div className="space-y-1">
                    <p className="text-xs font-black uppercase text-primary tracking-widest flex items-center gap-2">
                      <Zap className="h-4 w-4" /> MODO LIMITADO ATIVO
                    </p>
                    <p className="text-xs text-white/70 font-medium">Você está vendo apenas os 5 primeiros leads. Assine o Pro para liberar 20+ por busca.</p>
                  </div>
                  <Button asChild size="sm" className="bg-primary text-white text-[9px] font-black h-10 px-6 rounded-xl">
                    <Link href="/paywall">UPGRADE PRO</Link>
                  </Button>
                </div>
              )}

              {leads.length === 0 && !loading ? (
                <div className="py-24 text-center glass-card rounded-[3rem] border-dashed border-white/10">
                  <div className="h-20 w-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6 opacity-30">
                    <Search className="h-10 w-10 text-white" />
                  </div>
                  <p className="text-muted-foreground uppercase text-[10px] font-black tracking-[0.4em] px-8 leading-relaxed">
                    Utilize os filtros acima para escanear <br />o mercado em busca de novos clientes
                  </p>
                </div>
              ) : loading ? (
                <div className="py-24 text-center space-y-6">
                  <div className="relative h-20 w-20 mx-auto">
                    <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl animate-pulse"></div>
                    <Loader2 className="h-20 w-20 animate-spin text-primary relative z-10" />
                  </div>
                  <p className="text-muted-foreground uppercase text-[10px] font-black tracking-[0.4em] animate-pulse">Neural Engine Processando...</p>
                </div>
              ) : (
                <div className="grid gap-4">
                  {leads.map((lead) => (
                    <Card key={lead.id} className={`glass-card border-white/10 transition-all duration-500 rounded-[2rem] overflow-hidden ${approachedLeads.includes(lead.id) ? 'border-primary/40 opacity-80' : ''}`}>
                      <CardContent className="p-8">
                        <div className="flex flex-col xl:flex-row justify-between gap-8">
                          <div className="flex gap-6 items-start">
                            <div className="h-14 w-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary shrink-0 border border-primary/20 shadow-lg group-hover:scale-110 transition-transform">
                              <MapPin className="h-6 w-6" />
                            </div>
                            <div className="space-y-2">
                              <div className="flex items-center gap-3">
                                <h4 className="font-black text-xl italic leading-none text-white uppercase">{lead.name}</h4>
                                {lead.rating && lead.rating !== '0' && (
                                  <Badge variant="outline" className="bg-yellow-500/10 border-yellow-500/20 text-yellow-500 text-[10px] font-black">
                                    ★ {lead.rating}
                                  </Badge>
                                )}
                              </div>
                              <div className="flex items-center gap-2 text-[10px] text-muted-foreground font-black uppercase tracking-widest">
                                <span className="text-primary">{lead.type}</span>
                                <span className="opacity-20">•</span>
                                <span>{lead.city}, {lead.state}</span>
                              </div>
                              <div className="flex items-center gap-3 text-sm font-bold text-white/60">
                                <Phone className="h-4 w-4 text-primary/60" /> {lead.phone}
                              </div>
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-3 items-center">
                            <Button 
                              variant="default" 
                              size="sm"
                              onClick={() => handleGenMessage(lead)}
                              disabled={generatingMsg === lead.id}
                              className="h-12 bg-primary text-white rounded-xl text-[10px] font-black uppercase tracking-widest gap-2 shadow-lg hover:scale-105 active:scale-95 transition-all"
                            >
                              {generatingMsg === lead.id ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                              SCRIPT IA
                            </Button>

                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleSaveLead(lead)}
                              disabled={capturingId === lead.id}
                              className="h-12 border-white/10 bg-white/5 text-white rounded-xl text-[10px] font-black uppercase tracking-widest gap-2 hover:bg-white/10 transition-all"
                            >
                              {capturingId === lead.id ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
                              CAPTURAR
                            </Button>

                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => {
                                if (!approachedLeads.includes(lead.id)) {
                                  setApproachedLeads(prev => [...prev, lead.id]);
                                }
                              }}
                              className={`h-12 rounded-xl text-[10px] font-black uppercase tracking-widest ${approachedLeads.includes(lead.id) ? 'text-green-500 bg-green-500/5' : 'text-muted-foreground'}`}
                            >
                              {approachedLeads.includes(lead.id) ? <Check className="h-5 w-5 mr-2" /> : <div className="h-5 w-5 mr-2 border-2 border-current/20 rounded-full" />}
                              {approachedLeads.includes(lead.id) ? 'ABORDADO' : 'MARCAR'}
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
