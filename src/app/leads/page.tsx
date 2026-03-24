
"use client";

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Check, 
  MapPin, 
  MessageSquare, 
  Loader2,
  Filter,
  Users,
  Star,
  Copy,
  Zap,
  Phone,
  AlertTriangle,
  ExternalLink,
  Send,
  History
} from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { generateLeadMessage } from '@/ai/flows/generate-lead-message';
import { generateFollowUp } from '@/ai/flows/generate-follow-up';
import { useToast } from '@/hooks/use-toast';
import { useUser, useFirestore, useCollection, useMemoFirebase, useDoc } from '@/firebase';
import { collection, query, doc, updateDoc, increment, serverTimestamp } from 'firebase/firestore';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from '@/components/AppSidebar';

const STATES = ["SP", "RJ", "MG", "PR", "SC", "RS", "BA", "CE", "PE", "GO"];
const ADMIN_EMAIL = "thethegalo@gmail.com";

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
  const [approachedLeads, setApproachedLeads] = useState<string[]>([]);

  const userDocRef = useMemoFirebase(() => {
    if (!db || !user) return null;
    return doc(db, 'users', user.uid);
  }, [db, user]);
  const { data: userData } = useDoc(userDocRef);

  const subQuery = useMemoFirebase(() => {
    if (!db || !user) return null;
    return query(collection(db, 'users', user.uid, 'subscriptions'));
  }, [db, user]);
  const { data: subData } = useCollection(subQuery);

  const isProMember = useMemo(() => {
    const hasActiveSub = subData?.some(sub => (sub.planType === 'monthly' || sub.planType === 'lifetime') && sub.status === 'active');
    const hasAdminOrVitalicio = user?.email === ADMIN_EMAIL || userData?.plan === 'vitalicio' || userData?.plan === 'mensal';
    return hasActiveSub || hasAdminOrVitalicio;
  }, [subData, user, userData]);

  const isUnlimited = user?.email === ADMIN_EMAIL || userData?.plan === 'vitalicio';

  const checkLimitAndTrack = async (type: 'leadsUsed' | 'messagesUsed', limitValue: number) => {
    if (!db || !user || !userData) return true;
    if (isUnlimited) return true;
    if (userData.plan !== 'mensal') return true; // Aplicando limites especificamente ao mensal conforme pedido

    const lastAction = userData.lastActionAt;
    const today = new Date().toDateString();
    const lastDate = lastAction ? (lastAction.toDate ? lastAction.toDate().toDateString() : new Date(lastAction).toDateString()) : '';
    
    const isNewDay = today !== lastDate;
    const currentUsage = isNewDay ? 0 : (userData.dailyUsage?.[type] || 0);

    if (currentUsage >= limitValue) {
      toast({ 
        variant: "destructive", 
        title: "Limite Atingido", 
        description: "Você atingiu o limite diário do plano mensal." 
      });
      return false;
    }

    try {
      const userRef = doc(db, 'users', user.uid);
      const updates: any = {
        lastActionAt: serverTimestamp(),
        [`dailyUsage.${type}`]: isNewDay ? 1 : increment(1),
      };
      
      if (isNewDay) {
        const otherType = type === 'leadsUsed' ? 'messagesUsed' : 'leadsUsed';
        updates[`dailyUsage.${otherType}`] = 0;
      }

      await updateDoc(userRef, updates);
      return true;
    } catch (e) {
      return true;
    }
  };

  const handleSearch = async () => {
    if (!niche || !state) {
      toast({ variant: "destructive", title: "Campos Obrigatórios", description: "Por favor, digite o nicho e selecione o estado." });
      return;
    }

    const canProceed = await checkLimitAndTrack('leadsUsed', 20);
    if (!canProceed) return;
    
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

      const finalLeads = isProMember ? data : data.slice(0, 5);
      setLeads(finalLeads);

      toast({ title: "Radar Ativo!", description: `Encontramos ${finalLeads.length} leads reais.` });
    } catch (e: any) {
      toast({ variant: "destructive", title: "Erro na Busca", description: e.message || "Falha na conexão." });
    } finally {
      setLoading(false);
    }
  };

  const handleWhatsApp = (phone: string, message?: string) => {
    if (!phone || phone === 'Telefone não listado') {
      toast({ variant: "destructive", title: "Ops!", description: "Contato não disponível." });
      return;
    }
    const cleanPhone = phone.replace(/\D/g, '');
    const waPhone = cleanPhone.length <= 11 ? `55${cleanPhone}` : cleanPhone;
    const encodedMsg = message ? encodeURIComponent(message) : '';
    
    window.open(`https://wa.me/${waPhone}${message ? `?text=${encodedMsg}` : ''}`, '_blank');
  };

  const handleGenMessage = async (lead: any) => {
    const canProceed = await checkLimitAndTrack('messagesUsed', 10);
    if (!canProceed) return;

    setGeneratingMsg(lead.id);
    try {
      const res = await generateLeadMessage({
        businessName: lead.name,
        businessType: lead.type,
        city: lead.city
      });
      
      handleWhatsApp(lead.phone, res.message);
      toast({ title: "WhatsApp Aberto!", description: "Mensagem enviada para o aplicativo." });
      
      if (!approachedLeads.includes(lead.id)) {
        setApproachedLeads(prev => [...prev, lead.id]);
      }
    } catch (e) {
      toast({ variant: "destructive", title: "Erro", description: "Falha ao gerar mensagem." });
    } finally {
      setGeneratingMsg(null);
    }
  };

  const handleFollowUp = async (lead: any) => {
    const canProceed = await checkLimitAndTrack('messagesUsed', 10);
    if (!canProceed) return;

    setGeneratingMsg(`follow-${lead.id}`);
    try {
      const res = await generateFollowUp({
        businessName: lead.name
      });
      
      handleWhatsApp(lead.phone, res.message);
      toast({ title: "Follow-up Gerado!", description: "Mensagem de retomada enviada." });
    } catch (e) {
      toast({ variant: "destructive", title: "Erro", description: "Falha ao gerar follow-up." });
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
               <div className="hidden sm:flex items-center gap-2 bg-white/5 px-3 py-1 rounded-full border border-white/10">
                  <span className="text-[8px] font-black uppercase text-muted-foreground tracking-widest">
                    {userData?.plan === 'mensal' ? `Leads: ${userData?.dailyUsage?.leadsUsed || 0}/20` : '+100 usuários ativos'}
                  </span>
               </div>
               <Badge className="bg-primary/20 text-primary border-primary/30 text-[8px] font-black uppercase px-2 md:px-3 py-1">
                 {userData?.plan?.toUpperCase() || 'FREE'}
               </Badge>
            </div>
          </header>

          <div className="flex-1 container max-w-4xl mx-auto p-4 md:p-8 space-y-8">
            <Card className="glass-card border-white/10 overflow-hidden rounded-[2rem]">
              <CardHeader className="bg-white/5 border-b border-white/5 p-6">
                <CardTitle className="text-sm font-black uppercase tracking-widest italic flex items-center gap-2">
                  <Filter className="h-4 w-4 text-primary" /> Filtro de Prospecção
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 md:p-8">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6">
                  <div className="md:col-span-5 space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest opacity-50">O que você quer vender?</label>
                    <Input 
                      placeholder="Ex: Barbearia, Dentista..." 
                      className="bg-white/5 border-white/10 h-12 md:h-14 rounded-2xl focus-visible:ring-primary"
                      value={niche}
                      onChange={e => setNiche(e.target.value)}
                    />
                  </div>
                  <div className="md:col-span-3 space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest opacity-50">Estado (UF)</label>
                    <Select onValueChange={setState}>
                      <SelectTrigger className="bg-white/5 border-white/10 rounded-2xl h-12 md:h-14">
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
                      className="bg-white/5 border-white/10 h-12 md:h-14 rounded-2xl focus-visible:ring-primary"
                      value={city}
                      onChange={e => setCity(e.target.value)}
                    />
                  </div>
                  <div className="md:col-span-12">
                    <Button 
                      onClick={handleSearch} 
                      disabled={loading}
                      className="w-full h-14 md:h-16 bg-primary hover:bg-primary/90 rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-primary/20 transition-all active:scale-[0.98]"
                    >
                      {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <><Search className="h-5 w-5 mr-2" /> BUSCAR LEADS REAIS</>}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-6 pb-20">
              <h2 className="text-xl md:text-2xl font-black italic uppercase tracking-tighter">
                {leads.length > 0 ? `Resultados (${leads.length})` : 'Aguardando Busca'}
              </h2>

              {!isProMember && leads.length > 0 && (
                <div className="p-4 bg-primary/10 border border-primary/20 rounded-2xl flex items-center justify-between gap-4">
                  <p className="text-[10px] font-bold text-primary uppercase">Você atingiu o limite da busca Free. Desbloqueie leads ilimitados.</p>
                  <Button asChild size="sm" className="bg-primary text-white text-[8px] font-black h-8 px-4 rounded-xl">
                    <Link href="/paywall">UPGRADE PRO</Link>
                  </Button>
                </div>
              )}

              {leads.length === 0 && !loading ? (
                <div className="py-16 md:py-24 text-center glass-card rounded-[3rem] border-dashed border-white/5">
                  <div className="h-16 w-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6 opacity-20">
                    <Search className="h-8 w-8 text-white" />
                  </div>
                  <p className="text-muted-foreground uppercase text-[10px] font-black tracking-[0.3em] px-6">Defina o nicho para captar seus leads</p>
                </div>
              ) : loading ? (
                <div className="py-24 text-center">
                  <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
                  <p className="text-muted-foreground uppercase text-[10px] font-black tracking-[0.3em]">Varrendo base neural do Google...</p>
                </div>
              ) : (
                <div className="grid gap-4">
                  {leads.map((lead) => (
                    <Card key={lead.id} className={`glass-card border-white/10 transition-all duration-500 rounded-[2rem] overflow-hidden ${approachedLeads.includes(lead.id) ? 'border-primary/40' : ''}`}>
                      <CardContent className="p-6 md:p-8">
                        <div className="flex flex-col lg:flex-row justify-between gap-6">
                          <div className="flex gap-4 items-start">
                            <div className="h-12 w-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary shrink-0 border border-primary/20">
                              <MapPin className="h-5 w-5" />
                            </div>
                            <div className="space-y-1 min-w-0">
                              <h4 className="font-black text-lg italic leading-none text-white uppercase truncate">{lead.name}</h4>
                              <div className="flex items-center gap-2 text-[10px] text-muted-foreground font-black uppercase tracking-widest">
                                <span className="text-primary">{lead.type}</span>
                                <span>•</span>
                                <span>{lead.city}, {lead.state}</span>
                              </div>
                              <div className="flex items-center gap-2 text-xs font-bold text-white/60 mt-2">
                                <Phone className="h-3.5 w-3.5" /> {lead.phone}
                              </div>
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-2 items-center">
                            <Button 
                              variant="default" 
                              size="sm"
                              onClick={() => handleGenMessage(lead)}
                              disabled={generatingMsg === lead.id}
                              className="h-12 bg-primary text-white rounded-xl text-[9px] font-black uppercase tracking-widest gap-2 shadow-lg"
                            >
                              {generatingMsg === lead.id ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Send className="h-3.5 w-3.5" />}
                              ENVIAR MENSAGEM IA
                            </Button>

                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleFollowUp(lead)}
                              disabled={generatingMsg === `follow-${lead.id}`}
                              className="h-12 border-accent/20 bg-accent/5 text-accent rounded-xl text-[9px] font-black uppercase tracking-widest gap-2 hover:bg-accent/10"
                            >
                              {generatingMsg === `follow-${lead.id}` ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <History className="h-3.5 w-3.5" />}
                              GERAR FOLLOW-UP
                            </Button>

                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => {
                                if (!approachedLeads.includes(lead.id)) {
                                  setApproachedLeads(prev => [...prev, lead.id]);
                                }
                              }}
                              className={`h-12 rounded-xl text-[9px] font-black uppercase tracking-widest ${approachedLeads.includes(lead.id) ? 'text-green-500 bg-green-500/5' : 'text-muted-foreground'}`}
                            >
                              {approachedLeads.includes(lead.id) ? <Check className="h-4 w-4 mr-2" /> : <div className="h-4 w-4 mr-2 border-2 border-current/30 rounded-full" />}
                              {approachedLeads.includes(lead.id) ? 'ABORDADO' : 'MARCAR ABORDADO'}
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
