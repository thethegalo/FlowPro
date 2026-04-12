"use client";

import { useMemo, useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Trophy, 
  TrendingUp, 
  Users, 
  DollarSign, 
  Medal, 
  Target, 
  Star,
  Crown
} from 'lucide-react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from '@/components/AppSidebar';
import { cn } from '@/lib/utils';

// --- LÓGICA DE GERAÇÃO DINÂMICA (SEEDED RANDOM) ---

const NAMES_POOL = [
  "Gabriel L.", "Rafael S.", "Marcos V.", "Ana P.", "Juliana C.", 
  "Carlos E.", "Amanda S.", "Rafael M.", "Marcos O.", "Fernanda L.", 
  "Thiago S.", "Carla R.", "Bruno A.", "Patricia S.", "Lucas F.", 
  "Ana B.", "Roberto C.", "Camila T.", "Diego M.", "Isabela N.", 
  "Felipe G.", "Vanessa C.", "Gustavo B.", "Roberto L.", "Mariana X.", 
  "Vinicius T.", "Beatriz W.", "Leonardo K.", "Sofia R.", "Daniel P."
];

const CITIES = ["São Paulo", "Rio de Janeiro", "Curitiba", "Belo Horizonte", "Fortaleza", "Salvador", "Porto Alegre", "Brasília", "Recife", "Goiânia"];

// Função para gerar semente baseada na semana do ano
function getWeeklySeed() {
  const now = new Date();
  const oneJan = new Date(now.getFullYear(), 0, 1);
  const numberOfDays = Math.floor((now.getTime() - oneJan.getTime()) / (24 * 60 * 60 * 1000));
  const weekNumber = Math.ceil((now.getDay() + 1 + numberOfDays) / 7);
  return `${now.getFullYear()}-${weekNumber}`;
}

// Gerador de número aleatório baseado em semente (Lcg simples)
function seededRandom(seed: string) {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = seed.charCodeAt(i) + ((hash << 5) - hash);
  }
  return function() {
    hash = (hash * 16807) % 2147483647;
    return (hash - 1) / 2147483646;
  };
}

export default function VendedoresRankingPage() {
  const [mounted, setMount] = useState(false);

  useEffect(() => {
    setMount(true);
  }, []);

  const dynamicSellers = useMemo(() => {
    const seed = getWeeklySeed();
    const rng = seededRandom(seed);
    
    const shuffled = [...NAMES_POOL].sort(() => rng() - 0.5);
    const selected = shuffled.slice(0, 20);
    
    let baseRevenue = 11000 + (rng() * 2000); 
    
    return selected.map((name, i) => {
      const reductionFactor = Math.pow(0.85, i);
      const revenue = baseRevenue * reductionFactor * (0.95 + rng() * 0.1);
      const sales = Math.floor(revenue / (150 + rng() * 100));
      
      return {
        pos: i + 1,
        name,
        city: CITIES[Math.floor(rng() * CITIES.length)],
        revenue: Math.floor(revenue),
        sales: sales || 1,
        status: i < 3 ? "Elite" : i < 8 ? "Top" : "Ativo"
      };
    });
  }, []);

  const top5 = useMemo(() => dynamicSellers.slice(0, 5), [dynamicSellers]);
  const maxRevenue = top5[0]?.revenue || 1;

  if (!mounted) return null;

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-transparent relative z-10">
        <AppSidebar />
        
        <main className="flex-1 flex flex-col min-w-0 bg-transparent">
          <header className="h-[52px] border-b border-white/5 flex items-center justify-between px-6 bg-transparent sticky top-0 z-50">
            <div className="flex items-center gap-4">
              <h1 className="text-[13px] font-medium text-white/50 flex items-center gap-2">
                <Trophy className="h-3.5 w-3.5 text-primary" /> Ranking Semanal
              </h1>
            </div>
            <div className="bg-[#581c87]/40 border border-[#7c3aed]/30 text-[#c4b5fd] text-[11px] font-medium rounded-[6px] px-[10px] py-[4px] uppercase tracking-[0.5px]">
              VITALÍCIO
            </div>
          </header>

          <div className="flex-1 container max-w-6xl mx-auto p-4 md:p-8 space-y-8 bg-transparent">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 bg-transparent">
              {[
                { label: "Volume Semanal", value: "R$ " + (dynamicSellers.reduce((acc, s) => acc + s.revenue, 0) / 1000).toLocaleString('pt-BR', {maximumFractionDigits: 1}) + "k", icon: DollarSign, sub: "Faturamento global", subColor: "text-primary" },
                { label: "Contratos Ativos", value: dynamicSellers.reduce((acc, s) => acc + s.sales, 0) + " vendas", icon: Target, sub: "Volume de fechamentos", subColor: "text-cyan-400" },
                { label: "Consultores", value: "42 em campo", icon: Users, sub: "Operadores ativos", subColor: "text-muted-foreground" },
                { label: "Performance", value: "92% Ótima", icon: TrendingUp, sub: "Saúde do ecossistema", subColor: "text-green-500" }
              ].map((card, i) => (
                <Card key={i} className="glass-card border-white/10 bg-white/[0.02] p-6 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[8px] font-black uppercase tracking-[0.2em] text-muted-foreground">{card.label}</span>
                    <card.icon className="h-4 w-4 text-primary opacity-40" />
                  </div>
                  <div className="text-2xl font-black italic text-white uppercase tracking-tight">{card.value}</div>
                  <div className={cn("text-[9px] font-bold uppercase", card.subColor)}>{card.sub}</div>
                </Card>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-transparent">
              <div className="lg:col-span-4 space-y-6">
                <Card className="glass-card border-primary/20 bg-[#0e0e1a]/40 rounded-[2.5rem] overflow-hidden">
                  <CardHeader className="border-b border-white/5 p-6 bg-primary/5">
                    <CardTitle className="text-xs font-black uppercase tracking-widest italic flex items-center gap-2">
                      <Star className="h-4 w-4 text-primary animate-pulse" /> Elite Performance
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-8 space-y-8">
                    {top5.map((seller) => (
                      <div key={seller.pos} className="space-y-2">
                        <div className="flex justify-between items-end">
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-black text-white/40 font-mono">#{seller.pos}</span>
                            <span className="text-[10px] font-black uppercase text-white italic">{seller.name}</span>
                          </div>
                          <span className="text-[10px] font-black text-cyan-400 font-mono">R$ {seller.revenue.toLocaleString('pt-BR')}</span>
                        </div>
                        <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden relative border border-white/5">
                          <div 
                            className={cn(
                              "h-full transition-all duration-1000",
                              seller.pos === 1 ? "bg-gradient-to-r from-primary via-white to-primary" : "bg-gradient-to-r from-primary to-cyan-500"
                            )}
                            style={{ width: `${(seller.revenue / maxRevenue) * 100}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              <div className="lg:col-span-8 bg-transparent">
                <Card className="glass-card border-white/10 bg-[#0b0b14]/30 rounded-[2.5rem] overflow-hidden">
                  <CardHeader className="border-b border-white/5 p-8">
                    <CardTitle className="text-sm font-black uppercase tracking-widest italic flex items-center gap-2">
                      <Medal className="h-4 w-4 text-primary" /> Quadro de Honra
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="overflow-x-auto w-full">
                      <Table>
                        <TableHeader className="bg-white/5">
                          <TableRow className="border-white/5 hover:bg-transparent">
                            <TableHead className="w-16 text-center text-[9px] font-black uppercase tracking-widest">Rank</TableHead>
                            <TableHead className="text-[9px] font-black uppercase tracking-widest">Consultor</TableHead>
                            <TableHead className="text-[9px] font-black uppercase tracking-widest text-right">Faturamento</TableHead>
                            <TableHead className="text-[9px] font-black uppercase tracking-widest text-center">Vendas</TableHead>
                            <TableHead className="text-[9px] font-black uppercase tracking-widest text-right">Status</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {dynamicSellers.map((seller) => (
                            <TableRow 
                              key={seller.pos} 
                              className={cn(
                                "border-white/5 hover:bg-white/[0.03] transition-all",
                                seller.pos === 1 && "bg-primary/5"
                              )}
                            >
                              <TableCell className="text-center">
                                {seller.pos === 1 ? <Crown className="h-4 w-4 text-yellow-400 mx-auto" /> : <span className="text-[10px] font-black opacity-30">#{seller.pos}</span>}
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center gap-3">
                                  <div className="h-8 w-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[9px] font-black italic">
                                    {seller.name.split(' ').map(n => n[0]).join('')}
                                  </div>
                                  <span className="text-[11px] font-bold text-white uppercase italic">{seller.name}</span>
                                </div>
                              </TableCell>
                              <TableCell className="text-right text-[11px] font-black font-mono text-cyan-400">
                                R$ {seller.revenue.toLocaleString('pt-BR')}
                              </TableCell>
                              <TableCell className="text-center text-[11px] font-bold text-white/80">{seller.sales}</TableCell>
                              <TableCell className="text-right">
                                <Badge variant="outline" className={cn(
                                  "text-[8px] font-black uppercase border-white/10",
                                  seller.status === 'Elite' ? "text-primary border-primary/30" : "opacity-40"
                                )}>
                                  {seller.status}
                                </Badge>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
