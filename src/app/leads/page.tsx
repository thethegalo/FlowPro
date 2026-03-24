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
  ExternalLink
} from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { generateLeadMessage } from '@/ai/flows/generate-lead-message';
import { useToast } from '@/hooks/use-toast';
import { useUser, useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, query } from 'firebase/firestore';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from '@/components/AppSidebar';

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
  const [approachedLeads, setApproachedLeads] = useState<string[]>([]);

  const subQuery = useMemoFirebase(() => {
    if (!db || !user) return null;
    return query(collection(db, 'users', user.uid, 'subscriptions'));
  }, [db, user]);
  const { data: subData } = useCollection(subQuery);

  const isProMember = useMemo(() => {
    if (user?.email === 'thethegalo@gmail.com' || user?.email === 'tietegalo@gmail.com') return true;
    return subData?.some(sub => (sub.planType === 'monthly' || sub.planType === 'lifetime' || sub.planType === 'lifetime_admin') && sub.status === 'active');
  }, [subData, user]);

  const handleSearch = async () => {
    if (!niche || !state) {
      toast({ 
        variant: "destructive", 
        title: "Campos Obrigatórios", 
        description: "Por favor, digite o nicho e selecione o estado." 
      });
      return;
    }
    
    setLoading(true);
    setLeads([]);

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ niche, city, state }),
      });

      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("O servidor retornou uma resposta inválida. Verifique se o backend está configurado.");
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Falha na busca de leads');
      }

      const finalLeads = isProMember ? data : data.slice(0, 5);
      setLeads(finalLeads);

      if (finalLeads.length === 0) {
        toast({ 
          variant: "destructive",
          title: "Sem resultados", 
          description: "Nenhum lead encontrado para este nicho nesta região." 
        });
      } else {
        toast({ 
          title: "Radar Ativo!", 
          description: `Encontramos ${finalLeads.length} leads reais.` 
        });
      }
    } catch (e: any) {
      console.error('Erro na busca de leads:', e);
      toast({ 
        variant: "destructive", 
        title: "Erro na Busca", 
        description: e.message || "Falha na conexão com o motor de leads." 
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (text: string) => {
    if (!text || text === 'Telefone não listado') {
      toast({ variant: "destructive", title: "Ops!", description: "Contato não disponível para este lead." });
      return;
    }
    navigator.clipboard.writeText(text);
    toast({ title: "Copiado!", description: "Contato copiado com sucesso." });
  };

  const handleWhatsApp = (phone: string) => {
    if (!phone || phone === 'Telefone não listado') {
      toast({ variant: "destructive", title: "Ops!", description: "Contato não disponível para este lead." });
      return;
    }
    // Formata o número: remove tudo que não é dígito
    const cleanPhone = phone.replace(/\D/g, '');
    // Garante o código do país (55 para Brasil) se não houver
    const waPhone = cleanPhone.length <= 11 ? `55${cleanPhone}` : cleanPhone;
    window.open(`https://wa.me/${waPhone}`, '_blank');
  };

  const handleGenMessage = async (lead: any) => {
    if (!isProMember && approachedLeads.length >= 3) {
      toast({ 
        variant: "destructive", 
        title: "Limite de IA atingido", 
        description: "A geração de mensagens ilimitada é exclusiva para membros Flow Pro." 
      });
      return;
    }
    setGeneratingMsg(lead.id);
    try {
      const res = await generateLeadMessage({
        businessName: lead.name,
        businessType: lead.type,
        city: lead.city
      });
      navigator.clipboard.writeText(res.message);
      toast({ 
        title: "Mensagem Gerada!", 
        description: "A abordagem estratégica foi copiada para sua área de transferência." 
      });
      if (!approachedLeads.includes(lead.id)) {
        setApproachedLeads(prev => [...prev, lead.id]);
      }
    } catch (e) {
      toast({ variant: "destructive", title: "Erro", description: "Falha ao gerar mensagem com IA." });
    } finally {
      setGeneratingMsg(null);
    }
  };

  const toggleApproached = (id: string) => {
    setApproachedLeads(prev => 
      prev.includes(id) ? prev.filter(l => l !== id) : [...prev, id]
    );
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
                <Users className="h-4 w-4 text-primary" /> Radar de Leads Reais
              </h1>
            </div>
            {isProMember ? (
              <Badge className="bg-primary/20 text-primary border-primary/30 text-[8px] font-black uppercase px-3 py-1">
                <Star className="h-3 w-3 mr-1 fill-primary" /> RADAR ILIMITADO
              </Badge>
            ) : (
               <Button asChild size="sm" variant="outline" className="h-8 text-[9px] font-black uppercase tracking-widest border-primary/30 text-primary hover:bg-primary/10">
                 <Link href="/paywall">UPGRADE PRO</Link>
               </Button>
            )}
          </header>

          <div className="flex-1 container max-w-4xl mx-auto p-4 md:p-8 space-y-8">
            <Card className="glass-card border-white/10 overflow-hidden rounded-[2rem]">
              <CardHeader className="bg-white/5 border-b border-white/5 p-6">
                <CardTitle className="text-sm font-black uppercase tracking-widest italic flex items-center gap-2">
                  <Filter className="h-4 w-4 text-primary" /> Filtro de Prospecção Real
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                  <div className="md:col-span-5 space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest opacity-50">O que você quer vender?</label>
                    <Input 
                      placeholder="Ex: Barbearia, Dentista, Pizzaria..." 
                      className="bg-white/5 border-white/10 h-14 rounded-2xl focus-visible:ring-primary"
                      value={niche}
                      onChange={e => setNiche(e.target.value)}
                    />
                  </div>
                  <div className="md:col-span-3 space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest opacity-50">Estado (UF)</label>
                    <Select onValueChange={setState}>
                      <SelectTrigger className="bg-white/5 border-white/10 rounded-2xl h-14">
                        <SelectValue placeholder="Selecione..." />
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
                      className="bg-white/5 border-white/10 h-14 rounded-2xl focus-visible:ring-primary"
                      value={city}
                      onChange={e => setCity(e.target.value)}
                    />
                  </div>
                  <div className="md:col-span-12">
                    <Button 
                      onClick={handleSearch} 
                      disabled={loading}
                      className="w-full h-16 bg-primary hover:bg-primary/90 rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-primary/20 transition-all active:scale-[0.98]"
                    >
                      {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <><Search className="h-5 w-5 mr-2" /> BUSCAR LEADS REAIS AGORA</>}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-black italic uppercase tracking-tighter flex items-center gap-3">
                  Resultados Encontrados {leads.length > 0 && <Badge className="bg-white/5 text-white border-white/10 ml-2">{leads.length}</Badge>}
                </h2>
              </div>

              {leads.length === 0 && !loading ? (
                <div className="py-24 text-center glass-card rounded-[3rem] border-dashed border-white/5">
                  <div className="h-20 w-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6 opacity-20">
                    <Search className="h-10 w-10 text-white" />
                  </div>
                  <p className="text-muted-foreground uppercase text-[10px] font-black tracking-[0.3em]">O radar está pronto para encontrar dados reais</p>
                </div>
              ) : loading ? (
                <div className="py-24 text-center">
                  <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
                  <p className="text-muted-foreground uppercase text-[10px] font-black tracking-[0.3em]">Conectando à base de dados do Google via Backend Seguro...</p>
                </div>
              ) : (
                <div className="grid gap-4">
                  {leads.map((lead) => (
                    <Card key={lead.id} className={`glass-card border-white/10 transition-all duration-500 rounded-[2rem] overflow-hidden ${approachedLeads.includes(lead.id) ? 'border-primary/40 shadow-[0_0_20px_rgba(139,92,246,0.1)]' : ''}`}>
                      <CardContent className="p-8">
                        <div className="flex flex-col lg:flex-row justify-between gap-8">
                          <div className="flex gap-6 items-start">
                            <div className="h-14 w-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary shrink-0 border border-primary/20">
                              <MapPin className="h-6 w-6" />
                            </div>
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <h4 className="font-black text-xl italic leading-none text-white uppercase tracking-tight">{lead.name}</h4>
                                {lead.rating > 0 && (
                                  <Badge variant="outline" className="h-5 px-1.5 text-[9px] font-black text-yellow-500 border-yellow-500/20">
                                    <Star className="h-2.5 w-2.5 mr-1 fill-yellow-500" /> {lead.rating}
                                  </Badge>
                                )}
                              </div>
                              <div className="flex flex-col gap-1 mt-2">
                                <div className="flex items-center gap-2 text-[10px] text-muted-foreground font-black uppercase tracking-widest">
                                  <span className="text-primary">{lead.type}</span>
                                  <span>•</span>
                                  <span>{lead.city}, {lead.state}</span>
                                </div>
                                <div className="flex items-center gap-2 text-[11px] text-primary font-bold italic uppercase tracking-tighter">
                                  <Phone className="h-3.5 w-3.5" /> {lead.phone}
                                </div>
                                <p className="text-[10px] text-muted-foreground/60 font-medium uppercase">{lead.address}</p>
                              </div>
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-3 items-center">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleWhatsApp(lead.phone)}
                              className={`flex-1 lg:flex-none h-12 border-green-500/20 rounded-xl text-[9px] font-black uppercase tracking-widest gap-2 bg-green-500/5 hover:bg-green-500/10 text-green-500 ${lead.phone === 'Telefone não listado' ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                              <MessageSquare className="h-3.5 w-3.5" /> WhatsApp
                            </Button>

                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleCopy(lead.phone)}
                              className={`flex-1 lg:flex-none h-12 border-white/10 rounded-xl text-[9px] font-black uppercase tracking-widest gap-2 bg-white/5 hover:bg-white/10 ${lead.phone === 'Telefone não listado' ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                              <Copy className="h-3.5 w-3.5" /> Copiar Fone
                            </Button>
                            
                            <Button 
                              variant="default" 
                              size="sm"
                              onClick={() => handleGenMessage(lead)}
                              disabled={generatingMsg === lead.id}
                              className="flex-1 lg:flex-none h-12 bg-primary text-white rounded-xl text-[9px] font-black uppercase tracking-widest gap-2 shadow-lg shadow-primary/20 hover:scale-105 transition-all"
                            >
                              {generatingMsg === lead.id ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Zap className="h-3.5 w-3.5 fill-white" />}
                              Gerar Mensagem IA
                            </Button>

                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => toggleApproached(lead.id)}
                              className={`flex-1 lg:flex-none h-12 rounded-xl text-[9px] font-black uppercase tracking-widest transition-colors ${approachedLeads.includes(lead.id) ? 'text-green-500 bg-green-500/5' : 'text-muted-foreground hover:text-white'}`}
                            >
                              {approachedLeads.includes(lead.id) ? <Check className="h-4 w-4 mr-2" /> : <div className="h-4 w-4 mr-2 border-2 border-current/30 rounded-full" />}
                              {approachedLeads.includes(lead.id) ? 'ABORDADO' : 'MARCAR'}
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  
                  {!isProMember && leads.length > 0 && (
                     <div className="p-10 text-center border-2 border-dashed border-primary/20 rounded-[3rem] bg-primary/5 mt-8 space-y-6">
                        <div className="space-y-2">
                          <h3 className="text-xl font-black italic uppercase tracking-tighter">Quer resultados ilimitados?</h3>
                          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Você atingiu o limite do plano básico. O Google encontrou muito mais resultados.</p>
                        </div>
                        <Button asChild className="bg-primary hover:bg-primary/90 text-white font-black uppercase text-[11px] h-14 px-12 rounded-2xl shadow-lg shadow-primary/30">
                           <Link href="/paywall">LIBERAR RADAR COMPLETO</Link>
                        </Button>
                     </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
