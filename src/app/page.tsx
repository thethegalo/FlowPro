import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Zap, 
  ArrowRight, 
  CheckCircle2, 
  ChevronDown, 
  Users, 
  LayoutGrid, 
  TrendingUp,
  MessageSquare,
  ShieldCheck,
  Globe
} from 'lucide-react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function Home() {
  const features = [
    { id: 'feature-access', title: 'COMO ACESSAR', description: 'Passo a passo inicial para dominar a plataforma.' },
    { id: 'feature-config', title: 'CONFIGURAÇÕES', description: 'Ajustes finos para máxima performance de vendas.' },
    { id: 'feature-gold', title: 'O OURO', description: 'Estratégias exclusivas que ninguém te conta.' },
  ];

  const stats = [
    { label: 'Empreendedores lucrando', value: '+1.743', icon: <Users className="h-6 w-6" /> },
    { label: 'Marketplaces integrados', value: '7+', icon: <LayoutGrid className="h-6 w-6" /> },
    { label: 'Lucro médio por venda', value: 'R$100+', icon: <TrendingUp className="h-6 w-6" /> },
  ];

  const faqs = [
    { q: "Como é feito o processo de entrega?", a: "Tudo é automatizado via nossa plataforma com rastreamento em tempo real." },
    { q: "Funciona com Shopify e outras plataformas?", a: "Sim, integração total com Shopify, Woocommerce, Nuvemshop e mais." },
    { q: "Preciso de muito dinheiro para começar?", a: "Não, nosso método foca em baixo investimento inicial e escala progressiva." },
    { q: "Quais tipos de nicho vocês trabalham?", a: "Trabalhamos com todos os nichos vencedores do mercado atual." },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#0a0a0c] text-white">
      {/* Header */}
      <header className="px-4 lg:px-6 h-20 flex items-center justify-between border-b border-white/5 sticky top-0 z-50 bg-[#0a0a0c]/80 backdrop-blur-xl">
        <Link className="flex items-center gap-2" href="/">
          <div className="bg-primary p-2 rounded-xl neon-glow">
            <Zap className="h-6 w-6 text-white" />
          </div>
          <span className="text-2xl font-black tracking-tighter">FLOWPRO</span>
        </Link>
        <div className="flex items-center gap-4">
          <Button asChild variant="ghost" className="text-white hover:text-primary hidden sm:flex">
            <Link href="/login">Área de Membros</Link>
          </Button>
          <Button asChild className="bg-primary hover:bg-primary/90 neon-glow">
            <Link href="/register">ASSINAR AGORA</Link>
          </Button>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-24 lg:py-40 overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--primary)_0%,_transparent_70%)] opacity-10 pointer-events-none"></div>
          <div className="container px-4 md:px-6 mx-auto relative z-10 text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-bold mb-4 animate-pulse">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              +1.742 empreendedores lucrando
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.1] max-w-4xl mx-auto">
              Enquanto você pensa, seus <span className="text-primary">concorrentes</span> já estão faturando com <span className="text-blue-500">IA</span>
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto font-medium">
              A única ferramenta com IA pronta e oficial de Mercado Livre, Shopee, Magalu e Bing. Economize tempo e escale seu negócio de forma automatizada.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <Button size="lg" className="h-16 px-10 text-lg font-bold bg-primary hover:bg-primary/90 neon-glow w-full sm:w-auto" asChild>
                <Link href="/quiz">QUERO COMEÇAR A LUCRAR AGORA <ArrowRight className="ml-2 h-5 w-5" /></Link>
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">💳 Pagamento seguro via Hotmart • Garantia de 7 dias</p>
            
            {/* Social Proof Logos */}
            <div className="pt-12 flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-40 grayscale hover:grayscale-0 transition-all">
              <span className="text-xl font-bold">Shopify</span>
              <span className="text-xl font-bold">Mercado Livre</span>
              <span className="text-xl font-bold">Shopee</span>
              <span className="text-xl font-bold">Nuvemshop</span>
            </div>
          </div>
        </section>

        {/* Features Cards Section */}
        <section className="py-24 bg-gradient-to-b from-transparent to-[#0f0f12]">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="text-center mb-16 space-y-4">
              <p className="text-primary font-bold tracking-widest uppercase text-sm">Área Exclusiva de Membros</p>
              <h2 className="text-3xl md:text-5xl font-black">Aulas <span className="text-primary">Premium</span> do Zero ao Avançado</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">Tudo o que você precisa para dominar o mercado, desde as primeiras configurações até as estratégias de escala.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {features.map((feature, i) => (
                <Card key={i} className="bg-[#16161a] border-white/5 hover:border-primary/50 transition-all group overflow-hidden cursor-pointer">
                  <div className="relative aspect-[3/4]">
                    <Image 
                      src={PlaceHolderImages.find(img => img.id === feature.id)?.imageUrl || ''} 
                      alt={feature.title}
                      fill
                      className="object-cover opacity-60 group-hover:opacity-100 transition-opacity"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#16161a] via-transparent to-transparent"></div>
                    <div className="absolute bottom-6 left-6 right-6 space-y-2">
                      <h3 className="text-2xl font-black italic tracking-tighter text-blue-400 group-hover:text-primary transition-colors">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground leading-snug">{feature.description}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="py-24 relative">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="text-center mb-16 space-y-4">
              <p className="text-primary font-bold tracking-widest uppercase text-sm">Investimento que se paga na primeira semana</p>
              <h2 className="text-3xl md:text-5xl font-black">Escolha seu <span className="text-primary">plano</span></h2>
            </div>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Plano Básico */}
              <Card className="bg-[#16161a] border-white/5 p-8 flex flex-col justify-between">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold flex items-center gap-2">
                      <ShieldCheck className="h-5 w-5 text-muted-foreground" /> BÁSICO
                    </h3>
                    <p className="text-sm text-muted-foreground">Acesso mensal para quem está começando.</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-4xl font-black">R$ 147,90 <span className="text-lg text-muted-foreground font-medium">/mês</span></p>
                  </div>
                  <ul className="space-y-3">
                    {['Acesso aos fornecedores', 'Marketplace Base', 'Suporte dedicado', 'Curso completo'].map((item, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="h-4 w-4 text-green-500" /> {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <Button variant="outline" className="w-full mt-8 border-white/10 hover:bg-white/5 h-12">ASSINAR BÁSICO</Button>
              </Card>

              {/* Plano Premium - Destaque */}
              <Card className="bg-[#16161a] border-primary/40 p-8 flex flex-col justify-between relative ring-2 ring-primary/20 neon-glow">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white text-[10px] font-black px-4 py-1 rounded-full whitespace-nowrap">MAIS VENDIDO - ECONOMIZE 50%</div>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold flex items-center gap-2 text-primary">
                      <Zap className="h-5 w-5" /> PREMIUM VITALÍCIO
                    </h3>
                    <p className="text-sm text-muted-foreground">Acesso total para sempre. Sem mensalidades.</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground line-through">De R$ 597,90</p>
                    <p className="text-4xl font-black text-white">R$ 267,90</p>
                    <p className="text-xs text-primary font-bold">PAGAMENTO ÚNICO — VITALÍCIO</p>
                  </div>
                  <ul className="grid grid-cols-1 gap-3">
                    {['Tudo do plano Básico', 'Acesso VIP aos scripts', 'Estratégia de escala IA', 'Suporte prioritário 24/7', 'Acesso vitalício sem renovação'].map((item, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="h-4 w-4 text-primary" /> {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <Button className="w-full mt-8 bg-primary hover:bg-primary/90 h-14 text-lg font-bold neon-glow">QUERO ACESSO VITALÍCIO</Button>
              </Card>
            </div>
            <div className="max-w-4xl mx-auto mt-8 p-4 rounded-xl border border-green-500/20 bg-green-500/5 text-center text-xs text-green-500 font-bold">
              🛡️ GARANTIA TOTAL: Se não gostar, devolvemos 100% do seu dinheiro. Sem perguntas.
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-24 bg-[#0a0a0c]">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="text-center mb-16 space-y-4">
              <p className="text-primary font-bold tracking-widest uppercase text-sm">Comunidade que só cresce</p>
              <h2 className="text-3xl md:text-5xl font-black">Faça parte do <span className="text-primary">movimento</span></h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {stats.map((stat, i) => (
                <Card key={i} className="bg-[#16161a]/50 border-white/5 p-8 text-center space-y-2">
                  <div className="inline-flex p-3 rounded-2xl bg-primary/10 text-primary mb-2">
                    {stat.icon}
                  </div>
                  <p className="text-3xl font-black">{stat.value}</p>
                  <p className="text-sm text-muted-foreground font-medium">{stat.label}</p>
                </Card>
              ))}
            </div>
            <div className="mt-16 text-center max-w-2xl mx-auto space-y-6">
              <p className="text-muted-foreground italic text-sm">
                Você está entrando em uma comunidade exclusiva com ferramentas, suporte e fornecedores que 99% dos vendedores não conhecem.
              </p>
              <Button size="lg" className="h-16 px-10 text-lg font-bold bg-primary hover:bg-primary/90 neon-glow w-full sm:w-auto" asChild>
                <Link href="/quiz">QUERO FAZER PARTE AGORA <ArrowRight className="ml-2 h-5 w-5" /></Link>
              </Button>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-24">
          <div className="container px-4 md:px-6 mx-auto max-w-3xl">
            <div className="text-center mb-16 space-y-4">
              <p className="text-primary font-bold tracking-widest uppercase text-sm">Tire suas dúvidas</p>
              <h2 className="text-3xl md:text-5xl font-black">Perguntas <span className="text-primary">Frequentes</span></h2>
            </div>
            <Accordion type="single" collapsible className="w-full space-y-4">
              {faqs.map((faq, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="border border-white/5 bg-[#16161a] rounded-xl px-6">
                  <AccordionTrigger className="text-left font-bold hover:no-underline py-6">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-6">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full py-12 border-t border-white/5 bg-[#0a0a0c]">
        <div className="container px-4 md:px-6 mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex flex-col items-center md:items-start gap-4">
            <Link className="flex items-center gap-2" href="/">
              <Zap className="h-6 w-6 text-primary" />
              <span className="text-2xl font-black tracking-tighter">FLOWPRO</span>
            </Link>
            <p className="text-xs text-muted-foreground text-center md:text-left">
              Automatize suas vendas com Inteligência Artificial.<br />
              © 2024 FlowPro. Todos os direitos reservados.
            </p>
          </div>
          <div className="flex gap-8">
            <nav className="flex flex-col gap-2">
              <p className="text-xs font-bold uppercase tracking-widest text-primary mb-2">Links</p>
              <Link className="text-xs text-muted-foreground hover:text-white" href="#">Termos</Link>
              <Link className="text-xs text-muted-foreground hover:text-white" href="#">Privacidade</Link>
            </nav>
            <nav className="flex flex-col gap-2">
              <p className="text-xs font-bold uppercase tracking-widest text-primary mb-2">Suporte</p>
              <Link className="text-xs text-muted-foreground hover:text-white" href="#">WhatsApp</Link>
              <Link className="text-xs text-muted-foreground hover:text-white" href="#">E-mail</Link>
            </nav>
          </div>
          <Button asChild className="bg-primary hover:bg-primary/90 neon-glow">
            <Link href="/register">ASSINAR AGORA</Link>
          </Button>
        </div>
      </footer>
    </div>
  );
}
