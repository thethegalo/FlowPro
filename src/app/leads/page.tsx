"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft, 
  Search, 
  Copy, 
  ExternalLink, 
  Check, 
  MapPin, 
  MessageSquare, 
  Loader2,
  Filter,
  Users,
  Instagram,
  Phone
} from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { generateLeadMessage } from '@/ai/flows/generate-lead-message';
import { useToast } from '@/hooks/use-toast';

const BUSINESS_TYPES = [
  "Barbearia", "Salão de Beleza", "Pizzaria", "Restaurante", "Loja de Roupas", "Academia", "Clínica"
];

const STATES = ["SP", "RJ", "MG", "PR", "SC", "RS", "BA", "CE"];

// Simulated Lead Data Generation
const generateMockLeads = (type: string, city: string) => {
  return Array.from({ length: 8 }).map((_, i) => ({
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
  const [loading, setLoading] = useState(false);
  const [leads, setLeads] = useState<any[]>([]);
  const [city, setCity] = useState('');
  const [type, setType] = useState('');
  const [state, setState] = useState('');
  const [generatingMsg, setGeneratingMsg] = useState<string | null>(null);
  const [approachedLeads, setApproachedLeads] = useState<string[]>([]);
  const { toast } = useToast();

  const handleSearch = () => {
    if (!type || !state) {
      toast({ variant: "destructive", title: "Erro", description: "Selecione o tipo e o estado." });
      return;
    }
    setLoading(true);
    // Simulate API delay
    setTimeout(() => {
      setLeads(generateMockLeads(type, city || 'Sua Cidade'));
      setLoading(false);
    }, 1500);
  };

  const handleGenMessage = async (lead: any) => {
    setGeneratingMsg(lead.id);
    try {
      const res = await generateLeadMessage({
        businessName: lead.name,
        businessType: lead.type,
        city: lead.city
      });
      navigator.clipboard.writeText(res.message);
      toast({ title: "Mensagem Gerada!", description: "A IA criou uma abordagem e já copiamos para sua área de transferência." });
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
    <div className="min-h-screen bg-[#050508] flex flex-col">
      <header className="px-4 h-16 flex items-center border-b border-white/5 bg-[#050508]/80 sticky top-0 z-50">
        <Link href="/dashboard" className="mr-4 text-muted-foreground hover:text-primary transition-colors">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <h1 className="text-xl font-black italic uppercase tracking-tighter flex items-center gap-2">
          <Users className="h-5 w-5 text-primary" /> Captar Leads Flow
        </h1>
      </header>

      <main className="flex-1 container max-w-4xl mx-auto p-4 md:p-8 space-y-8">
        {/* Filter Section */}
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

        {/* Results Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-black italic uppercase tracking-tighter">
              Resultados {leads.length > 0 && `(${leads.length})`}
            </h2>
            {leads.length > 0 && (
              <Badge variant="outline" className="border-green-500/20 text-green-500 text-[8px] font-black uppercase">Pronto para Abordar</Badge>
            )}
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
                        <div className="flex gap-4">
                          <button className="flex items-center gap-1.5 text-[10px] font-black uppercase text-muted-foreground hover:text-white transition-colors">
                            <Instagram className="h-3 w-3" /> {lead.instagram}
                          </button>
                          <button className="flex items-center gap-1.5 text-[10px] font-black uppercase text-muted-foreground hover:text-white transition-colors">
                            <Phone className="h-3 w-3" /> {lead.phone}
                          </button>
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
                          Gerar Mensagem IA
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => toggleApproached(lead.id)}
                          className={`flex-1 md:flex-none h-10 rounded-xl text-[9px] font-black uppercase tracking-widest ${approachedLeads.includes(lead.id) ? 'text-green-500' : ''}`}
                        >
                          {approachedLeads.includes(lead.id) ? <Check className="h-3 w-3 mr-1" /> : <Circle className="h-3 w-3 mr-1" />}
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
      </main>
    </div>
  );
}

function Circle({ className, ...props }: any) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
      {...props}
    >
      <circle cx="12" cy="12" r="10" />
    </svg>
  );
}
