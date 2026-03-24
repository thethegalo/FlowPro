
"use client";

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft, 
  Search, 
  Check, 
  MapPin, 
  MessageSquare, 
  Loader2,
  Filter,
  Users,
  Lock,
  Star
} from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { generateLeadMessage } from '@/ai/flows/generate-lead-message';
import { useToast } from '@/hooks/use-toast';
import { useUser, useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, query } from 'firebase/firestore';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from '@/components/AppSidebar';

const BUSINESS_TYPES = [
  "Barbearia", "Salão de Beleza", "Pizzaria", "Restaurante", "Loja de Roupas", "Academia", "Clínica"
];

const STATES = ["SP", "RJ", "MG", "PR", "SC", "RS", "BA", "CE"];

const generateMockLeads = (type: string, city: string, count: number) => {
  return Array.from({ length: count }).map((_, i) => ({
    id: `lead-${i}`,
    name: `${type} ${['Express', 'Master', 'Alpha', 'Flow', 'Prime'][i % 5]} ${city}`,
    type,
    city,
    instagram: `@${type.toLowerCase().replace(' ', '')}_${city.toLowerCase()}_${i}`,
    phone: `(11) 9${Math.floor(10000000 + Math.random() * 90000000)}`,
    status: 'new'
  }));
};

export default function LeadsPage() {
  const { user } = useUser();
  const db = useFirestore();
  const { toast } = useToast();
  
  const [loading, setLoading] = useState(false);
  const [leads, setLeads] = useState<any[]>([]);
  const [city, setCity] = useState('');
  const [type, setType] = useState('');
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
    if (!type || !state) {
      toast({ variant: "destructive", title: "Erro", description: "Selecione o tipo e o estado." });
      return;
    }
    setLoading(true);
    const count = isProMember ? 15 : 5;
    setTimeout(() => {
      setLeads(generateMockLeads(type, city || 'Sua Cidade', count));
      setLoading(false);
      if (!isProMember) {
        toast({ title: "Limite Básico atingido", description: "Assine o Flow Pro para leads ilimitados." });
      }
    }, 1500);
  };

  const handleGenMessage = async (lead: any) => {
    if (!isProMember && approachedLeads.length >= 3) {
      toast({ variant: "destructive", title: "Recurso Bloqueado", description: "IA avançada é exclusiva para membros Flow Pro." });
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
      toast({ title: "Mensagem Gerada!", description: "Abordagem copiada para a área de transferência." });
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
                <Star className="h-3 w-3 mr-1 fill-primary" /> UNLIMITED ACCESS
              </Badge>
            ) : (
               <Button asChild size="sm" variant="outline" className="h-8 text-[9px] font-black uppercase tracking-widest border-primary/30 text-primary hover:bg-primary/10">
                 <Link href="/paywall">UPGRADE TO PRO</Link>
               </Button>
            )}
          </header>

          <div className="flex-1 container max-w-4xl mx-auto p-4 md:p-8 space-y-8">
            {!isProMember && (
              <Card className="bg-primary/5 border border-primary/20 p-4 rounded-2xl flex items-center justify-between gap-4">
                 <div className="flex items-center gap-3">
                    <div className="h-10 w-10 bg-primary/20 rounded-xl flex items-center justify-center text-primary">
                      <Lock className="h-5 w-5" />
                    </div>
                    <div>
                       <p className="text-xs font-black uppercase tracking-widest">Limite da Fase 1</p>
                       <p className="text-[10px] text-muted-foreground uppercase font-medium">Você está no plano básico. Resultados e recursos limitados.</p>
                    </div>
                 </div>
                 <Button asChild size="sm" className="bg-primary hover:bg-primary/90 rounded-xl text-[9px] font-black uppercase tracking-widest px-6">
                    <Link href="/paywall">LIBERAR ESCALA</Link>
                 </Button>
              </Card>
            )}

            <Card className="glass-card border-white/10 overflow-hidden">
              <CardHeader className="bg-white/5 border-b border-white/5">
                <CardTitle className="text-sm font-black uppercase tracking-widest italic flex items-center gap-2">
                  <Filter className="h-4 w-4 text-primary" /> Filtros de Prospecção
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest opacity-50">Nicho</label>
                    <Select onValueChange={setType}>
                      <SelectTrigger className="bg-white/5 border-white/10 rounded-xl h-12">
                        <SelectValue placeholder="Selecione..." />
                      </SelectTrigger>
                      <SelectContent className="bg-[#050508] border-white/10">
                        {BUSINESS_TYPES.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest opacity-50">Estado</label>
                    <Select onValueChange={setState}>
                      <SelectTrigger className="bg-white/5 border-white/10 rounded-xl h-12">
                        <SelectValue placeholder="UF" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#050508] border-white/10">
                        {STATES.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2 md:col-span-1">
                    <label className="text-[10px] font-black uppercase tracking-widest opacity-50">Cidade</label>
                    <Input 
                      placeholder="Ex: São Paulo" 
                      className="bg-white/5 border-white/10 h-12 rounded-xl"
                      value={city}
                      onChange={e => setCity(e.target.value)}
                    />
                  </div>
                  <div className="flex items-end">
                    <Button 
                      onClick={handleSearch} 
                      disabled={loading}
                      className="w-full h-12 bg-primary rounded-xl font-black uppercase tracking-widest"
                    >
                      {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <><Search className="h-4 w-4 mr-2" /> BUSCAR</>}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-black italic uppercase tracking-tighter">
                  Resultados {leads.length > 0 && `(${leads.length})`}
                </h2>
              </div>

              {leads.length === 0 ? (
                <div className="py-20 text-center glass-card rounded-[2rem] border-dashed">
                  <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-20" />
                  <p className="text-muted-foreground uppercase text-[10px] font-black tracking-widest">Nenhum lead buscado ainda</p>
                </div>
              ) : (
                <div className="grid gap-4">
                  {leads.map((lead) => (
                    <Card key={lead.id} className={`glass-card border-white/10 transition-all ${approachedLeads.includes(lead.id) ? 'opacity-50 grayscale' : ''}`}>
                      <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row justify-between gap-6">
                          <div className="space-y-3">
                            <div className="flex items-center gap-3">
                              <div className="h-10 w-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                                <MapPin className="h-5 w-5" />
                              </div>
                              <div>
                                <h4 className="font-bold text-lg leading-tight">{lead.name}</h4>
                                <p className="text-xs text-muted-foreground flex items-center gap-1">
                                  {lead.type} • {lead.city}, {state}
                                </p>
                              </div>
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-2 md:flex-nowrap md:items-center">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleGenMessage(lead)}
                              disabled={generatingMsg === lead.id}
                              className="flex-1 md:flex-none h-10 border-white/10 rounded-xl text-[9px] font-black uppercase tracking-widest gap-2"
                            >
                              {generatingMsg === lead.id ? <Loader2 className="h-3 w-3 animate-spin" /> : <MessageSquare className="h-3 w-3 text-primary" />}
                              IA de Abordagem
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => toggleApproached(lead.id)}
                              className={`flex-1 md:flex-none h-10 rounded-xl text-[9px] font-black uppercase tracking-widest ${approachedLeads.includes(lead.id) ? 'text-green-500' : ''}`}
                            >
                              {approachedLeads.includes(lead.id) ? <Check className="h-3 w-3 mr-1" /> : <div className="h-3 w-3 mr-1 border border-white/30 rounded-full" />}
                              {approachedLeads.includes(lead.id) ? 'ABORDADO' : 'MARCAR'}
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  {!isProMember && leads.length > 0 && (
                     <div className="p-6 text-center border border-dashed border-white/10 rounded-2xl bg-white/[0.01]">
                        <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-4">Mais 50+ leads ocultos no plano Pro</p>
                        <Button asChild variant="outline" className="border-primary/40 text-primary uppercase font-black text-[10px] h-10 px-8 rounded-xl">
                           <Link href="/paywall">REVELAR TODOS OS LEADS</Link>
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
