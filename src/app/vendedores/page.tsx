
"use client";

import { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Trophy, 
  TrendingUp, 
  Users, 
  DollarSign, 
  Medal, 
  Target, 
  ChevronRight,
  ArrowUpRight,
  User,
  Star
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

const SELLERS = [
  { pos: 1, name: "Carlos Eduardo", city: "São Paulo", revenue: 12847, sales: 23, status: "Elite" },
  { pos: 2, name: "Amanda Silva", city: "Rio de Janeiro", revenue: 9234, sales: 18, status: "Elite" },
  { pos: 3, name: "Rafael Mendes", city: "Belo Horizonte", revenue: 7891, sales: 15, status: "Elite" },
  { pos: 4, name: "Juliana Costa", city: "São Paulo", revenue: 6540, sales: 12, status: "Top" },
  { pos: 5, name: "Marcos Oliveira", city: "Curitiba", revenue: 5823, sales: 11, status: "Top" },
  { pos: 6, name: "Fernanda Lima", city: "Fortaleza", revenue: 4912, sales: 9, status: "Top" },
  { pos: 7, name: "Thiago Santos", city: "Salvador", revenue: 4234, sales: 8, status: "Top" },
  { pos: 8, name: "Carla Rodrigues", city: "Recife", revenue: 3876, sales: 7, status: "Top" },
  { pos: 9, name: "Bruno Alves", city: "Manaus", revenue: 3421, sales: 6, status: "Ativo" },
  { pos: 10, name: "Patricia Souza", city: "Belém", revenue: 2987, sales: 5, status: "Ativo" },
  { pos: 11, name: "Lucas Ferreira", city: "Goiânia", revenue: 2654, sales: 5, status: "Ativo" },
  { pos: 12, name: "Ana Beatriz", city: "Floripa", revenue: 2234, sales: 4, status: "Ativo" },
  { pos: 13, name: "Roberto Carlos", city: "Porto Alegre", revenue: 1987, sales: 4, status: "Ativo" },
  { pos: 14, name: "Camila Torres", city: "Vitória", revenue: 1765, sales: 3, status: "Ativo" },
  { pos: 15, name: "Diego Melo", city: "Maceió", revenue: 1543, sales: 3, status: "Ativo" },
  { pos: 16, name: "Isabela Nunes", city: "Natal", revenue: 1234, sales: 2, status: "Ativo" },
  { pos: 17, name: "Felipe Gomes", city: "João Pessoa", revenue: 987, sales: 2, status: "Ativo" },
  { pos: 18, name: "Vanessa Cruz", city: "Teresina", revenue: 756, sales: 1, status: "Ativo" },
  { pos: 19, name: "Gustavo Barros", city: "Campo Grande", revenue: 634, sales: 1, status: "Ativo" },
  { pos: 20, name: "Roberto Lima", city: "Fortaleza", revenue: 527, sales: 1, status: "Ativo" },
];

const getMedalIcon = (pos: number) => {
  if (pos === 1) return <Trophy className="h-5 w-5 text-yellow-400" />;
  if (pos === 2) return <Medal className="h-5 w-5 text-zinc-300" />;
  if (pos === 3) return <Medal className="h-5 w-5 text-amber-600" />;
  return <span className="text-[10px] font-black opacity-30">#{pos}</span>;
};

const getStatusBadge = (status: string) => {
  if (status === "Elite") return <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30 text-[8px] font-black uppercase">Elite Flow</Badge>;
  if (status === "Top") return <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 text-[8px] font-black uppercase">Top Player</Badge>;
  return <Badge variant="outline" className="text-[8px] font-black uppercase border-white/10 opacity-50">Operador</Badge>;
};

export default function VendedoresRankingPage() {
  const top5 = useMemo(() => SELLERS.slice(0, 5), []);
  const maxRevenue = top5[0].revenue;

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
                <Trophy className="h-4 w-4 text-primary" /> Ranking de Consultores
              </h1>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_#22c55e]" />
              <span className="text-[8px] font-black uppercase tracking-widest text-muted-foreground">Atualizado em tempo real</span>
            </div>
          </header>

          <div className="flex-1 container max-w-6xl mx-auto p-4 md:p-8 space-y-8">
            
            {/* Cards de Resumo */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="glass-card border-white/10 bg-white/[0.02] p-6 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[8px] font-black uppercase tracking-[0.2em] text-muted-foreground">Total Faturado</span>
                  <DollarSign className="h-4 w-4 text-primary" />
                </div>
                <div className="text-2xl font-black italic text-white uppercase tracking-tight">R$ 84.271</div>
                <div className="text-[9px] font-bold text-green-500 flex items-center gap-1">
                  <ArrowUpRight className="h-3 w-3" /> +14% vs mês anterior
                </div>
              </Card>

              <Card className="glass-card border-white/10 bg-white/[0.02] p-6 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[8px] font-black uppercase tracking-[0.2em] text-muted-foreground">Total Vendas</span>
                  <Target className="h-4 w-4 text-primary" />
                </div>
                <div className="text-2xl font-black italic text-white uppercase tracking-tight">156 contratos</div>
                <div className="text-[9px] font-bold text-primary flex items-center gap-1 uppercase">Média R$ 540 p/venda</div>
              </Card>

              <Card className="glass-card border-white/10 bg-white/[0.02] p-6 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[8px] font-black uppercase tracking-[0.2em] text-muted-foreground">Consultores</span>
                  <Users className="h-4 w-4 text-primary" />
                </div>
                <div className="text-2xl font-black italic text-white uppercase tracking-tight">42 Ativos</div>
                <div className="text-[9px] font-bold text-muted-foreground flex items-center gap-1 uppercase tracking-widest">Base total consolidada</div>
              </Card>

              <Card className="glass-card border-primary/20 bg-primary/5 p-6 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[8px] font-black uppercase tracking-[0.2em] text-primary">Meta do Mês</span>
                  <TrendingUp className="h-4 w-4 text-primary" />
                </div>
                <div className="text-2xl font-black italic text-white uppercase tracking-tight">84% Atingida</div>
                <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                  <div className="h-full bg-primary w-[84%] shadow-[0_0_10px_#7c3aff]" />
                </div>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Gráfico Top 5 */}
              <div className="lg:col-span-4 space-y-6">
                <Card className="glass-card border-white/10 bg-[#0e0e1a] rounded-[2rem] overflow-hidden">
                  <CardHeader className="border-b border-white/5 p-6">
                    <CardTitle className="text-xs font-black uppercase tracking-widest italic flex items-center gap-2">
                      <Star className="h-4 w-4 text-primary" /> Elite Performance
                    </CardTitle>
                    <CardDescription className="text-[9px] uppercase font-bold tracking-widest">Os 5 maiores faturamentos do mês</CardDescription>
                  </CardHeader>
                  <CardContent className="p-8 space-y-8">
                    {top5.map((seller) => (
                      <div key={seller.pos} className="space-y-2">
                        <div className="flex justify-between items-end">
                          <span className="text-[10px] font-black uppercase text-white italic">{seller.name}</span>
                          <span className="text-[10px] font-black text-primary italic">R$ {seller.revenue.toLocaleString('pt-BR')}</span>
                        </div>
                        <div className="h-3 w-full bg-white/5 rounded-full overflow-hidden relative">
                          <div 
                            className={`h-full bg-gradient-to-r from-primary to-accent transition-all duration-1000 delay-300 shadow-[0_0_15px_rgba(124,58,255,0.4)]`}
                            style={{ width: `${(seller.revenue / maxRevenue) * 100}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <div className="p-6 rounded-[2rem] bg-primary/5 border border-primary/20 text-center space-y-4">
                  <Trophy className="h-8 w-8 text-primary mx-auto animate-bounce" />
                  <h3 className="text-sm font-black uppercase italic text-white tracking-widest">Premiação do Mês</h3>
                  <p className="text-[10px] font-medium text-muted-foreground uppercase leading-relaxed">
                    O Top 1 deste mês ganhará um upgrade para a Licença <span className="text-primary font-black">MASTER ADMIN</span> e um bônus de R$ 1.500 no PIX.
                  </p>
                </div>
              </div>

              {/* Tabela de Ranking */}
              <div className="lg:col-span-8">
                <Card className="glass-card border-white/10 bg-[#0b0b14] rounded-[2rem] overflow-hidden">
                  <CardHeader className="border-b border-white/5 p-8">
                    <CardTitle className="text-sm font-black uppercase tracking-widest italic flex items-center gap-2">
                      <Medal className="h-4 w-4 text-primary" /> Quadro de Honra FlowPro
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader className="bg-white/5">
                          <TableRow className="border-white/5 hover:bg-transparent">
                            <TableHead className="w-16 text-center text-[9px] font-black uppercase tracking-widest">Rank</TableHead>
                            <TableHead className="text-[9px] font-black uppercase tracking-widest">Consultor</TableHead>
                            <TableHead className="text-[9px] font-black uppercase tracking-widest">Cidade</TableHead>
                            <TableHead className="text-[9px] font-black uppercase tracking-widest text-right">Faturamento</TableHead>
                            <TableHead className="text-[9px] font-black uppercase tracking-widest text-center">Vendas</TableHead>
                            <TableHead className="text-[9px] font-black uppercase tracking-widest text-right">Status</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {SELLERS.map((seller) => (
                            <TableRow key={seller.pos} className="border-white/5 hover:bg-white/[0.02] transition-colors group">
                              <TableCell className="text-center">
                                <div className="flex justify-center">
                                  {getMedalIcon(seller.pos)}
                                </div>
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center gap-3">
                                  <div className="h-8 w-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[10px] font-black italic group-hover:bg-primary/20 group-hover:border-primary/30 transition-all">
                                    {seller.name.split(' ').map(n => n[0]).join('')}
                                  </div>
                                  <span className="text-[11px] font-bold text-white uppercase italic">{seller.name}</span>
                                </div>
                              </TableCell>
                              <TableCell className="text-[10px] font-medium text-muted-foreground uppercase">{seller.city}</TableCell>
                              <TableCell className="text-right text-[11px] font-black text-white italic">R$ {seller.revenue.toLocaleString('pt-BR')}</TableCell>
                              <TableCell className="text-center text-[11px] font-bold text-primary">{seller.sales}</TableCell>
                              <TableCell className="text-right">
                                {getStatusBadge(seller.status)}
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
