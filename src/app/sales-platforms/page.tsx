
"use client";

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  CreditCard, 
  ExternalLink, 
  Zap, 
  ShieldCheck, 
  Globe, 
  TrendingUp, 
  DollarSign, 
  MousePointerClick,
  Smartphone,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from '@/components/AppSidebar';

const PLATFORMS = [
  {
    name: "Kiwify",
    desc: "A plataforma com o checkout mais rápido e intuitivo do mercado brasileiro.",
    when: "Ideal para infoprodutos, mentorias e serviços que precisam de aprovação imediata.",
    tags: ["Pix Rápido", "Checkout 1-Clique"],
    icon: <Zap className="h-5 w-5 text-green-400" />,
    url: "https://kiwify.com.br"
  },
  {
    name: "Hotmart",
    desc: "Líder na América Latina com o ecossistema mais completo de vendas e afiliados.",
    when: "Quando você busca escala global e ferramentas robustas de automação.",
    tags: ["Escala Global", "Multimoedas"],
    icon: <Globe className="h-5 w-5 text-orange-500" />,
    url: "https://hotmart.com"
  },
  {
    name: "Eduzz",
    desc: "Plataforma focada no crescimento do produtor com ótimas taxas de comissão.",
    when: "Excelente para vender serviços e integrar com a área de membros Nutror.",
    tags: ["Foco em Produtor", "Nutror"],
    icon: <TrendingUp className="h-5 w-5 text-blue-400" />,
    url: "https://eduzz.com"
  },
  {
    name: "Stripe",
    desc: "A infraestrutura financeira mundial. Aceite pagamentos de qualquer lugar do mundo.",
    when: "Para quem está criando um SaaS ou quer total controle sobre a API de pagamentos.",
    tags: ["Internacional", "Developer Friendly"],
    icon: <CreditCard className="h-5 w-5 text-indigo-400" />,
    url: "https://stripe.com"
  },
  {
    name: "Mercado Pago",
    desc: "A solução mais conhecida para links de pagamento direto e vendas via QR Code.",
    when: "Para negócios locais e freelancers que precisam de um link rápido via WhatsApp.",
    tags: ["Link Direto", "Maquininha"],
    icon: <Smartphone className="h-5 w-5 text-sky-400" />,
    url: "https://mercadopago.com.br"
  },
  {
    name: "InfinitePay",
    desc: "Plataforma com as melhores taxas do mercado para recebimento via Pix e cartão.",
    when: "Quando sua prioridade é o lucro líquido e taxas de parcelamento baixas.",
    tags: ["Melhores Taxas", "Pix"],
    icon: <DollarSign className="h-5 w-5 text-emerald-400" />,
    url: "https://infinitepay.io"
  }
];

export default function SalesPlatformsPage() {
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
                <CreditCard className="h-4 w-4 text-primary" /> Plataformas de Venda
              </h1>
            </div>
          </header>

          <div className="flex-1 container max-w-5xl mx-auto p-4 md:p-8 space-y-12">
            
            <section className="space-y-6">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[8px] font-black uppercase tracking-widest">
                  <ShieldCheck className="h-3 w-3" /> Infraestrutura de Recebimento
                </div>
                <h2 className="text-3xl font-black italic uppercase tracking-tighter text-white">Onde Receber</h2>
                <p className="text-muted-foreground text-sm uppercase font-bold tracking-widest max-w-2xl">Escolha a rota mais rápida para transformar suas abordagens em dinheiro na conta.</p>
              </div>

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {PLATFORMS.map((platform, i) => (
                  <Card key={i} className="glass-card border-white/5 hover:border-primary/30 transition-all duration-500 rounded-[2rem] group flex flex-col h-full overflow-hidden">
                    <CardContent className="p-8 space-y-6 flex-1 flex flex-col relative z-10">
                      <div className="flex justify-between items-start">
                        <div className="p-4 bg-white/5 rounded-2xl group-hover:scale-110 transition-transform border border-white/5 shadow-xl group-hover:shadow-primary/10">
                          {platform.icon}
                        </div>
                        <div className="flex flex-col gap-1 items-end">
                          {platform.tags.map(tag => (
                            <Badge key={tag} variant="outline" className="text-[7px] font-black uppercase border-white/10 bg-white/5 whitespace-nowrap">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div className="space-y-4 flex-1">
                        <div className="space-y-2">
                          <h3 className="text-xl font-black italic uppercase tracking-tight text-white">{platform.name}</h3>
                          <p className="text-xs text-muted-foreground font-medium leading-relaxed">{platform.desc}</p>
                        </div>
                        
                        <div className="bg-primary/5 border border-primary/10 rounded-2xl p-5 group-hover:bg-primary/10 transition-colors">
                          <p className="text-[8px] font-black uppercase text-primary tracking-widest mb-2 flex items-center gap-1">
                            <MousePointerClick className="h-2.5 w-2.5 fill-primary" /> Quando usar:
                          </p>
                          <p className="text-[11px] text-white/80 font-bold italic leading-relaxed">{platform.when}</p>
                        </div>
                      </div>

                      <Button asChild className="w-full bg-white text-black hover:bg-primary hover:text-white rounded-xl h-12 font-black uppercase tracking-widest text-[10px] mt-6 shadow-xl active:scale-[0.98] transition-all">
                        <a href={platform.url} target="_blank" rel="noopener noreferrer">
                          ACESSAR PLATAFORMA <ExternalLink className="ml-2 h-3 w-3" />
                        </a>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* Dica de Especialista */}
            <Card className="bg-gradient-to-br from-accent/20 via-transparent to-primary/10 border-white/10 rounded-[2.5rem] overflow-hidden">
              <CardContent className="p-10 flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="space-y-2 text-center md:text-left">
                  <div className="flex items-center gap-2 text-accent text-[10px] font-black uppercase tracking-widest mb-2">
                    <CheckCircle2 className="h-4 w-4" /> Dica de Especialista
                  </div>
                  <h3 className="text-2xl font-black italic uppercase tracking-tight">Não perca tempo com burocracia</h3>
                  <p className="text-muted-foreground text-sm font-medium max-w-md">Para sua primeira venda, foque na plataforma com aprovação mais rápida. Depois que o dinheiro entrar, você otimiza as taxas.</p>
                </div>
                <div className="flex gap-4">
                  <div className="h-16 w-16 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center">
                    <Clock className="h-8 w-8 text-accent animate-pulse" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
