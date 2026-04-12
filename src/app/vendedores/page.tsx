
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
    
    // Embaralhar nomes
    const shuffled = [...NAMES_POOL].sort(() => rng() - 0.5);
    const selected = shuffled.slice(0, 20);
    
    let baseRevenue = 45000 + (rng() * 10000); // Top 1 entre 45k e 55k
    
    return selected.map((name, i) => {
      const revenue = baseRevenue * (1 - (i * 0.08) - (rng() * 0.05));
      baseRevenue = revenue; // Garante ordem decrescente
      
      const sales = Math.floor(revenue / (400 + rng() * 300));
      
      return {
        pos: i + 1,
        name,
        city: CITIES[Math.floor(rng() * CITIES.length)],
        revenue: Math.floor(revenue),
        sales,
        status: i < 3 ? "Elite" : i < 8 ? "Top" : "Ativo"
      };
    });
  }, []);

  const top5 = useMemo(() => dynamicSellers.slice(0, 5), [dynamicSellers]);
  const maxRevenue = top5[0]?.revenue || 1;

  if (!mounted) return null; // Evita hidratação inconsistente

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-[#050508] relative overflow-hidden">
        {/* Fundo Atmosférico High-Tech */}
        <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute top-[-10%] right-[-5%] w-[45%] h-[45%] bg-primary/10 rounded-full blur-[160px] animate-pulse" />
          <div className="absolute bottom-[-10%] left-[-5%] w-[35%] h-[35%] bg-cyan-500/5 rounded-full blur-[130px]" />
          <div className="absolute inset-0 opacity-[0.02] grid-background" />
        </div>

        <AppSidebar />
        
        <main className="flex-1 flex flex-col min-w-0 relative z-10">
          <header className="h-16 border-b border-white/5 flex items-center justify-between px-6 bg-[#050508]/80 backdrop-blur-md sticky top-0 z-50">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="text-muted-foreground hover:text-white" />
              <div className="h-4 w-px bg-white/10 hidden md:block" />
              <h1 className="text-sm font-black italic uppercase tracking-widest flex items-center gap-2 text-white">
                <Trophy className="h-4 w-4 text-primary" /> Ranking Semanal de Consultores
              </h1>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="border-primary/30 text-primary text-[8px] font-black uppercase px-3 py-1 bg-primary/5 animate-pulse">
                Ciclo: {getWeeklySeed()}
              </Badge>
            </div>
          </header>

          <div className="flex-1 container max-w-6xl mx-auto p-4 md:p-8 space-y-8">
            
            {/* Cards de Resumo Operacional */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: "Volume Semanal", value: "R$ " + (dynamicSellers.reduce((acc, s) => acc + s.revenue, 0) / 10).toLocaleString('pt-BR', {maximumFractionDigits: 0}) + "k", icon: DollarSign, sub: "Faturamento global da base", subColor: "text-primary" },
                { label: "Contratos Ativos", value: dynamicSellers.reduce((acc, s) => acc + s.sales, 0) + " vendas", icon: Target, sub: "Volume de fechamentos", subColor: "text-cyan-400" },
                { label: "Consultores", value: "42 em campo", icon: Users, sub: "Operadores ativos no Flow", subColor: "text-muted-foreground" },
                { label: "Performance", value: "92% Ótima", icon: TrendingUp, sub: "Saúde do ecossistema", subColor: "text-green-500" }
              ].map((card, i) => (
                <Card key={i} className="glass-card border-white/10 bg-white/[0.02] p-6 space-y-2 transition-all duration-500 hover:shadow-[0_0_40px_rgba(124,58,255,0.15)] group">
                  <div className="flex items-center justify-between">
                    <span className="text-[8px] font-black uppercase tracking-[0.2em] text-muted-foreground group-hover:text-primary transition-colors">{card.label}</span>
                    <card.icon className="h-4 w-4 text-primary group-hover:scale-110 transition-transform" />
                  </div>
                  <div className="text-2xl font-black italic text-white uppercase tracking-tight">{card.value}</div>
                  <div className={cn("text-[9px] font-bold uppercase", card.subColor)}>
                    {card.sub}
                  </div>
                </Card>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Painel Top Performance */}
              <div className="lg:col-span-4 space-y-6">
                <Card className="glass-card border-primary/20 bg-[#0e0e1a] rounded-[2.5rem] overflow-hidden shadow-[0_0_50px_rgba(124,58,255,0.1)]">
                  <CardHeader className="border-b border-white/5 p-6 bg-primary/5">
                    <CardTitle className="text-xs font-black uppercase tracking-widest italic flex items-center gap-2">
                      <Star className="h-4 w-4 text-primary animate-pulse" /> Elite Performance
                    </CardTitle>
                    <CardDescription className="text-[9px] uppercase font-bold tracking-widest text-muted-foreground">Os 5 maiores destaques da semana</CardDescription>
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
                              "h-full transition-all duration-1000 delay-300 shadow-[0_0_10px_rgba(124,58,255,0.6)]",
                              seller.pos === 1 ? "bg-gradient-to-r from-primary via-white to-primary" : "bg-gradient-to-r from-primary to-cyan-500"
                            )}
                            style={{ width: `${(seller.revenue / maxRevenue) * 100}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <div className="p-8 rounded-[2.5rem] bg-gradient-to-br from-primary/10 to-transparent border border-primary/20 text-center space-y-4 relative overflow-hidden group">
                  <div className="absolute -top-10 -right-10 opacity-5 group-hover:rotate-12 transition-transform duration-700">
                    <Trophy className="h-32 w-32" />
                  </div>
                  <Crown className="h-10 w-10 text-yellow-400 mx-auto animate-bounce drop-shadow-[0_0_15px_rgba(250,204,21,0.5)]" />
                  <h3 className="text-base font-black uppercase italic text-white tracking-widest">Premiação do Ciclo</h3>
                  <p className="text-[10px] font-medium text-muted-foreground uppercase leading-relaxed max-w-[200px] mx-auto">
                    O Top 1 da semana ganhará um bônus de <span className="text-primary font-black">R$ 1.500 no PIX</span> e consultoria direta com o Mestre.
                  </p>
                </div>
              </div>

              {/* Tabela de Ranking Principal */}
              <div className="lg:col-span-8">
                <Card className="glass-card border-white/10 bg-[#0b0b14]/50 rounded-[2.5rem] overflow-hidden backdrop-blur-xl">
                  <CardHeader className="border-b border-white/5 p-8 flex flex-row items-center justify-between">
                    <CardTitle className="text-sm font-black uppercase tracking-widest italic flex items-center gap-2">
                      <Medal className="h-4 w-4 text-primary" /> Quadro de Honra FlowPro
                    </CardTitle>
                    <div className="flex items-center gap-2 text-[8px] font-black text-muted-foreground uppercase tracking-widest">
                      <div className="h-1.5 w-1.5 rounded-full bg-green-500" /> Sistema Live
                    </div>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="overflow-x-auto w-full">
                      <Table>
                        <TableHeader className="bg-white/5">
                          <TableRow className="border-white/5 hover:bg-transparent">
                            <TableHead className="w-16 text-center text-[9px] font-black uppercase tracking-widest">Rank</TableHead>
                            <TableHead className="text-[9px] font-black uppercase tracking-widest">Consultor</TableHead>
                            <TableHead className="text-[9px] font-black uppercase tracking-widest hidden md:table-cell">Região</TableHead>
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
                                "border-white/5 hover:bg-white/[0.03] transition-all group",
                                seller.pos === 1 && "bg-primary/10 border-y border-primary/20 shadow-[inset_0_0_30px_rgba(124,58,255,0.1)]"
                              )}
                            >
                              <TableCell className="text-center">
                                <div className="flex justify-center items-center h-full">
                                  {seller.pos === 1 ? (
                                    <div className="relative">
                                      <Crown className="h-5 w-5 text-yellow-400 drop-shadow-[0_0_10px_rgba(250,204,21,0.6)]" />
                                      <div className="absolute inset-0 bg-yellow-400 blur-xl opacity-20 animate-pulse" />
                                    </div>
                                  ) : (
                                    <span className={cn(
                                      "text-[10px] font-black font-mono",
                                      seller.pos <= 3 ? "text-white" : "opacity-30"
                                    )}>#{seller.pos}</span>
                                  )}
                                </div>
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center gap-3">
                                  <div className={cn(
                                    "h-9 w-9 rounded-xl border flex items-center justify-center text-[10px] font-black italic transition-all group-hover:scale-110",
                                    seller.pos === 1 
                                      ? "bg-primary border-primary text-white shadow-[0_0_15px_rgba(124,58,255,0.4)]" 
                                      : "bg-white/5 border-white/10 text-white/60 group-hover:border-primary/30"
                                  )}>
                                    {seller.name.split(' ').map(n => n[0]).join('')}
                                  </div>
                                  <div className="flex flex-col">
                                    <span className="text-[11px] font-bold text-white uppercase italic">{seller.name}</span>
                                    {seller.pos === 1 && <span className="text-[7px] font-black text-yellow-400 uppercase tracking-widest">Líder da Semana</span>}
                                  </div>
                                </div>
                              </TableCell>
                              <TableCell className="text-[10px] font-medium text-muted-foreground uppercase hidden md:table-cell">{seller.city}</TableCell>
                              <TableCell className={cn(
                                "text-right text-[11px] font-black italic font-mono",
                                seller.pos === 1 ? "text-yellow-400" : "text-cyan-400"
                              )}>
                                R$ {seller.revenue.toLocaleString('pt-BR')}
                              </TableCell>
                              <TableCell className="text-center text-[11px] font-bold text-white/80">{seller.sales}</TableCell>
                              <TableCell className="text-right">
                                {seller.status === "Elite" ? (
                                  <Badge className="bg-primary/20 text-primary border-primary/30 text-[8px] font-black uppercase shadow-[0_0_15px_rgba(124,58,255,0.2)]">Elite Flow</Badge>
                                ) : seller.status === "Top" ? (
                                  <Badge className="bg-cyan-500/20 text-cyan-400 border-cyan-500/30 text-[8px] font-black uppercase">Top Player</Badge>
                                ) : (
                                  <Badge variant="outline" className="text-[8px] font-black uppercase border-white/10 opacity-40">Operador</Badge>
                                )}
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
