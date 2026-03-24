
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
  Lock,
  Star,
  Copy
} from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { generateLeadMessage } from '@/ai/flows/generate-lead-message';
import { useToast } from '@/hooks/use-toast';
import { useUser, useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, query } from 'firebase/firestore';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from '@/components/AppSidebar';

const STATES = ["SP", "RJ", "MG", "PR", "SC", "RS", "BA", "CE", "PE", "GO"];

const generateMockLeads = (niche: string, city: string, state: string, count: number) => {
  const suffixes = ['Express', 'Master', 'Alpha', 'Flow', 'Prime', 'Inovação', 'Soluções'];
  return Array.from({ length: count }).map((_, i) => ({
    id: `lead-${i}-${Date.now()}`,
    name: `${niche.charAt(0).toUpperCase() + niche.slice(1)} ${suffixes[i % suffixes.length]} ${city || 'Central'}`,
    type: niche,
    city: city || 'Capital',
    state: state,
    instagram: `@${niche.toLowerCase().replace(/\s/g, '')}_${(city || 'lead').toLowerCase()}_${i}`,
    phone: `(${Math.floor(10 + Math.random() * 80)}) 9${Math.floor(10000000 + Math.random() * 90000000)}`,
    status: 'new'
  }));
};

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
    if (user?.email === 'thethegalo@gmail.com') return true;
    return subData?.some(sub => sub.planType === 'monthly' && sub.status === 'active');
  }, [subData, user]);

  const handleSearch = () => {
    if (!niche || !state) {
      toast({ 
        variant: "destructive", 
        title: "Campos Obrigatórios", 
        description: "Por favor, digite o nicho e selecione o estado." 
      });
      return;
    }
    setLoading(true);
    // Simulação de busca
    const count = isProMember ? 15 : 5;
    setTimeout(() => {
      setLeads(generateMockLeads(niche, city, state, count));
      setLoading(false);
      if (!isProMember) {
        toast({ 
          title: "Limite Básico", 
          description: "Você está vendo 5 resultados. Assine o Pro para liberar centenas." 
        });
      } else {
        toast({ title: "Busca Concluída", description: `Encontramos novos leads de ${niche} em ${state}.` });
      }
    }, 1200);
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({ title: "Copiado!", description: "Informação copiada para a área de transferência." });
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
        description: "A abordagem personalizada foi copiada. Agora é só enviar!" 
      });
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
                <Users className="h-4 w-4 text-primary" /> Captar Leads Flow
              </h1>
            </div>
            {isProMember ? (
              <Badge className="bg-primary/20 text-primary border-primary/30 text-[8px] font-black uppercase px-3 py-1">
                <Star className="h-3 w-3 mr-1 fill-primary" /> ACESSO ILIMITADO
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
                  <Filter className="h-4 w-4 text-primary" /> Radar de Prospecção
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                  <div className="md:col-span-5 space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest opacity-50">O que você quer vender?</label>
                    <Input 
                      placeholder="Ex: Barbearia, Dentista, Loja..." 
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
                      {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <><Search className="h-5 w-5 mr-2" /> BUSCAR LEADS AGORA</>}
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

              {leads.length === 0 ? (
                <div className="py-24 text-center glass-card rounded-[3rem] border-dashed border-white/5">
                  <div className="h-20 w-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6 opacity-20">
                    <Search className="h-10 w-10 text-white" />
                  </div>
                  <p className="text-muted-foreground uppercase text-[10px] font-black tracking-[0.3em]">Defina um nicho e inicie a busca</p>
                </div>
              ) : (
                <div className="grid gap-4">
                  {leads.map((lead) => (
                    <Card key={lead.id} className={`glass-card border-white/10 transition-all duration-500 rounded-[2rem] overflow-hidden ${approachedLeads.includes(lead.id) ? 'opacity-40 grayscale scale-[0.98]' : ''}`}>
                      <CardContent className="p-8">
                        <div className="flex flex-col lg:flex-row justify-between gap-8">
                          <div className="flex gap-6 items-start">
                            <div className="h-14 w-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary shrink-0 border border-primary/20">
                              <MapPin className="h-6 w-6" />
                            </div>
                            <div className="space-y-1">
                              <h4 className="font-black text-xl italic leading-none text-white uppercase tracking-tight">{lead.name}</h4>
                              <div className="flex flex-wrap gap-x-4 gap-y-1 items-center text-[10px] text-muted-foreground font-black uppercase tracking-widest">
                                <span className="text-primary">{lead.type}</span>
                                <span>•</span>
                                <span>{lead.city}, {lead.state}</span>
                              </div>
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-3 items-center">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleCopy(lead.phone)}
                              className="flex-1 lg:flex-none h-12 border-white/10 rounded-xl text-[9px] font-black uppercase tracking-widest gap-2 bg-white/5 hover:bg-white/10"
                            >
                              <Copy className="h-3.5 w-3.5" /> Copiar Contato
                            </Button>
                            
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleGenMessage(lead)}
                              disabled={generatingMsg === lead.id}
                              className="flex-1 lg:flex-none h-12 border-primary/30 text-primary rounded-xl text-[9px] font-black uppercase tracking-widest gap-2 hover:bg-primary/10"
                            >
                              {generatingMsg === lead.id ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <MessageSquare className="h-3.5 w-3.5" />}
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
                          <h3 className="text-xl font-black italic uppercase tracking-tighter">Quer mais 50+ leads agora?</h3>
                          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Você atingiu o limite do plano básico nesta busca.</p>
                        </div>
                        <Button asChild className="bg-primary hover:bg-primary/90 text-white font-black uppercase text-[11px] h-14 px-12 rounded-2xl shadow-lg shadow-primary/30">
                           <Link href="/paywall">LIBERAR TODOS OS LEADS PRO</Link>
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
