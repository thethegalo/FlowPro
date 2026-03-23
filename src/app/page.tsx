import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { 
  Zap, 
  ArrowRight, 
  ShieldCheck, 
  TrendingUp, 
  MessageSquare, 
  Target, 
  Globe,
  Flame,
  Star,
  Cpu,
  BarChart3,
  Layers
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
  const LOGO_URL = "https://s3.typebot.io/public/workspaces/cmml2oniw000g04l7gwmqelu1/typebots/cmn1vyjog000104la10d6sdzu/blocks/rjyrip9n5saiz4dgdgpephqg?v=1774305985862";

  const pillars = [
    { title: 'IA Neural Autônoma', icon: <Cpu className="h-6 w-6" />, desc: 'Vendedores virtuais que aprendem e adaptam em tempo real.', color: 'text-purple-400' },
    { title: 'Scripts de Alta Retenção', icon: <MessageSquare className="h-6 w-6" />, desc: 'Copywriting gerado por algoritmos treinados em conversão.', color: 'text-blue-400' },
    { title: 'Integração Alpha', icon: <Layers className="h-6 w-6" />, desc: 'Conecte-se a qualquer CRM ou plataforma em segundos.', color: 'text-cyan-400' },
  ];

  const salesActivity = [
    { name: 'Lucas M.', amount: '497,00', time: '2 min ago' },
    { name: 'Ana Silva', amount: '1.290,00', time: '5 min ago' },
    { name: 'GXP Vendas', amount: '297,00', time: 'Agora' },
    { name: 'Beatriz R.', amount: '890,00', time: '12 min ago' },
    { name: 'Carlos J.', amount: '147,00', time: '15 min ago' },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#050508] text-white">
      {/* Dynamic Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-primary/20 rounded-full blur-[140px] animate-pulse-glow"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-accent/10 rounded-full blur-[140px] animate-pulse-glow" style={{ animationDelay: '5s' }}></div>
        <div className="absolute inset-0 grid-background opacity-20"></div>
      </div>

      {/* Navigation */}
      <header className="px-6 h-24 flex items-center justify-between sticky top-0 z-50 bg-[#050508]/70 backdrop-blur-xl border-b border-white/5">
        <Link href="/" className="flex items-center group">
          <div className="relative h-16 w-48 md:h-20 md:w-56 transition-transform duration-500 group-hover:scale-110">
            <Image 
              src={LOGO_URL} 
              alt="FlowPro Logo" 
              fill 
              className="object-contain"
              priority
            />
          </div>
        </Link>
        <div className="hidden md:flex items-center gap-10">
          <Link href="#tecnologia" className="text-[10px] font-black uppercase tracking-[0.2em] hover:text-primary transition-all">Tecnologia</Link>
          <Link href="#planos" className="text-[10px] font-black uppercase tracking-[0.2em] hover:text-primary transition-all">Ecossistema</Link>
          <Link href="#faq" className="text-[10px] font-black uppercase tracking-[0.2em] hover:text-primary transition-all">Suporte</Link>
        </div>
        <Button asChild className="bg-white text-black hover:bg-primary hover:text-white font-black rounded-full px-8 h-12 transition-all duration-500 hover:scale-105 active:scale-95">
          <Link href="/quiz">ATIVAR AGORA</Link>
        </Button>
      </header>

      <main className="relative z-10">
        {/* Hero Section */}
        <section className="relative pt-16 pb-32 lg:pt-24 lg:pb-56 overflow-hidden">
          <div className="container px-6 mx-auto text-center relative z-20">
            {/* GIANT LOGO DISPLAY */}
            <div className="flex justify-center mb-12 animate-float">
              <div className="relative h-40 w-80 md:h-64 md:w-[500px] drop-shadow-[0_0_30px_rgba(139,92,246,0.3)]">
                <Image 
                  src={LOGO_URL} 
                  alt="FlowPro Hero Logo" 
                  fill 
                  className="object-contain"
                  priority
                />
              </div>
            </div>

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-[0.3em] mb-10 shadow-[0_0_20px_rgba(255,255,255,0.05)]">
              <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse"></span>
              Acesso Alpha Disponível
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-[9rem] font-black tracking-tighter leading-[0.85] mb-12 uppercase">
              ESCALE <br />
              <span className="shimmer-text italic">INFINITO</span>
            </h1>
            
            <p className="text-muted-foreground text-lg md:text-2xl max-w-3xl mx-auto mb-16 font-medium leading-relaxed">
              O primeiro ecossistema de <span className="text-white">vendas autônomas</span> que transforma seu faturamento com inteligência neural.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Button size="lg" className="h-20 px-12 text-xl font-black bg-primary hover:scale-110 hover:rotate-1 shadow-[0_15px_40px_rgba(139,92,246,0.4)] transition-all rounded-3xl w-full sm:w-auto group" asChild>
                <Link href="/quiz">
                  START FLOWPRO <ArrowRight className="ml-2 h-7 w-7 group-hover:translate-x-2 transition-transform" />
                </Link>
              </Button>
              <div className="flex items-center gap-4 px-6 py-4 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-md">
                <div className="flex -space-x-3">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-10 w-10 rounded-full border-2 border-[#050508] overflow-hidden">
                      <Image src={`https://picsum.photos/seed/${i+100}/100/100`} alt="user" width={40} height={40} />
                    </div>
                  ))}
                </div>
                <div className="text-left">
                  <p className="text-xs font-black uppercase tracking-widest text-white">4.2k+ Users</p>
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((s) => <Star key={s} className="h-3 w-3 fill-primary text-primary" />)}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] hero-gradient pointer-events-none -z-10"></div>
        </section>

        {/* Real-time Proof Marquee */}
        <div className="bg-primary/5 border-y border-white/5 py-6 overflow-hidden whitespace-nowrap backdrop-blur-sm">
          <div className="flex animate-marquee gap-16 items-center">
            {[...salesActivity, ...salesActivity].map((sale, i) => (
              <div key={i} className="flex items-center gap-4 bg-white/[0.03] px-6 py-2 rounded-full border border-white/5">
                <div className="h-2 w-2 rounded-full bg-green-500 shadow-[0_0_12px_#22c55e]"></div>
                <span className="text-[10px] font-black uppercase tracking-widest text-white/90">
                  {sale.name} • <span className="text-primary">R$ {sale.amount}</span> • <span className="text-muted-foreground">{sale.time}</span>
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Core Pillars */}
        <section id="tecnologia" className="py-40">
          <div className="container px-6 mx-auto">
            <div className="text-center mb-24">
              <h2 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter mb-6">A MÁQUINA POR <span className="text-primary">DENTRO</span></h2>
              <p className="text-muted-foreground max-w-xl mx-auto uppercase tracking-[0.2em] text-[10px] font-black">Performance brutal em cada camada do seu funil</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {pillars.map((p, i) => (
                <Card key={i} className="glass-card p-10 group relative overflow-hidden">
                  <div className="absolute -right-4 -top-4 opacity-[0.02] group-hover:opacity-[0.08] transition-opacity rotate-12">
                    {p.icon}
                  </div>
                  <div className={`mb-8 p-4 rounded-2xl bg-white/5 inline-block ${p.color} transition-all group-hover:scale-125 group-hover:rotate-12 group-hover:bg-primary/10 shadow-xl`}>
                    {p.icon}
                  </div>
                  <h3 className="text-2xl font-black mb-4 italic tracking-tight uppercase">{p.title}</h3>
                  <p className="text-muted-foreground leading-relaxed font-medium">{p.desc}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Elite Training / Showcase */}
        <section className="py-40 relative">
          <div className="container px-6 mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <div className="space-y-10">
                <Badge className="bg-primary/20 text-primary border border-primary/30">ALPHA ACADEMY</Badge>
                <h2 className="text-5xl md:text-7xl font-black italic leading-[0.9] uppercase">NÃO É SORTE. <br /><span className="text-primary">É CÓDIGO.</span></h2>
                <p className="text-muted-foreground text-lg leading-relaxed font-medium">
                  Mais do que uma ferramenta, entregamos a metodologia dos maiores players do mercado global. Aprenda a configurar sua IA para fechar contratos enquanto você vive a vida.
                </p>
                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <p className="text-4xl font-black text-white italic">94%</p>
                    <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mt-2">Taxa de Abertura</p>
                  </div>
                  <div>
                    <p className="text-4xl font-black text-primary italic">3.8x</p>
                    <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mt-2">ROI Médio</p>
                  </div>
                </div>
                <Button variant="outline" className="h-14 rounded-2xl border-white/10 hover:bg-white hover:text-black font-black uppercase tracking-widest px-8">VER CURRÍCULO</Button>
              </div>

              <div className="relative h-[600px] w-full rounded-[3rem] overflow-hidden border border-white/10 group">
                <Image 
                  src={PlaceHolderImages[0].imageUrl} 
                  alt="Interface" 
                  fill 
                  className="object-cover opacity-60 group-hover:scale-105 transition-transform duration-[2s]"
                  data-ai-hint="digital dashboard"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-transparent to-transparent"></div>
                <div className="absolute inset-0 bg-primary/10 mix-blend-overlay"></div>
                <div className="absolute bottom-12 left-12 right-12 p-8 glass-card border-white/20">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="h-3 w-3 rounded-full bg-red-500 animate-pulse"></div>
                    <span className="text-[10px] font-black uppercase tracking-[0.3em]">Live Simulation</span>
                  </div>
                  <p className="text-xl font-black italic uppercase tracking-tighter">"Lead qualificado em 12 segundos via IA Neural Alpha"</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Strategy */}
        <section id="planos" className="py-40 bg-white/[0.01] border-y border-white/5">
          <div className="container px-6 mx-auto">
            <div className="text-center mb-24">
              <h2 className="text-4xl md:text-6xl font-black italic uppercase mb-4">ESCOLHA SEU <span className="text-primary">COMBUSTÍVEL</span></h2>
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground">Vagas limitadas para o plano Vitalício</p>
            </div>

            <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10">
              {/* Plan 1 */}
              <div className="glass-card p-12 flex flex-col justify-between group">
                <div>
                  <h3 className="text-xs font-black uppercase tracking-[0.4em] mb-10 text-muted-foreground">Standard Access</h3>
                  <div className="mb-12">
                    <span className="text-6xl font-black italic">R$ 197</span>
                    <span className="text-muted-foreground text-sm font-bold">/mês</span>
                  </div>
                  <ul className="space-y-6 mb-16">
                    {['Acesso à Plataforma V1', 'IA de Atendimento Básica', 'Suporte via Ticket', 'Scripts Padrão'].map((f, i) => (
                      <li key={i} className="flex items-center gap-4 text-sm font-bold uppercase tracking-widest">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary/50"></div> {f}
                      </li>
                    ))}
                  </ul>
                </div>
                <Button variant="outline" className="w-full h-16 rounded-2xl border-white/10 hover:bg-white text-black font-black uppercase tracking-[0.2em] transition-all">ASSINAR MENSAL</Button>
              </div>

              {/* Plan 2 - Highlight */}
              <div className="relative group p-[2px] rounded-[var(--radius)] overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary via-accent to-primary animate-marquee bg-[length:200%_200%]"></div>
                <div className="relative bg-[#050508] p-12 flex flex-col justify-between h-full rounded-[calc(var(--radius)-2px)]">
                  <div className="absolute top-6 right-6 bg-primary text-white text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest shadow-lg">93% OFF</div>
                  <div>
                    <h3 className="text-xs font-black uppercase tracking-[0.4em] mb-4 text-primary">Alpha Founder Elite</h3>
                    <div className="mb-2">
                      <span className="text-xs text-muted-foreground line-through decoration-primary">De R$ 1.997,00</span>
                    </div>
                    <div className="mb-12">
                      <span className="text-7xl font-black italic text-white">R$ 497</span>
                      <span className="text-primary text-[10px] font-black block mt-3 tracking-[0.3em] uppercase">Taxa Única • Vitalício</span>
                    </div>
                    <ul className="space-y-6 mb-16">
                      {['Tudo do Standard', 'Acesso Vitalício Garantido', 'Mentoria Alpha Mensal', 'Scripts VIP Ilimitados', 'Prioridade em Novos Modelos'].map((f, i) => (
                        <li key={i} className="flex items-center gap-4 text-sm font-black uppercase tracking-widest text-white">
                          <Star className="h-4 w-4 text-primary fill-primary" /> {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Button className="w-full h-16 rounded-2xl bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-[0.2em] shadow-[0_15px_35px_rgba(139,92,246,0.5)] group">
                    DOMINAR AGORA <Zap className="ml-2 h-5 w-5 fill-white group-hover:scale-125 transition-transform" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="py-40">
          <div className="container px-6 mx-auto max-w-4xl">
            <h2 className="text-4xl md:text-5xl font-black italic mb-16 text-center uppercase tracking-tighter">SINCRONIA DE <span className="text-primary">DADOS</span> (FAQ)</h2>
            <Accordion type="single" collapsible className="space-y-6">
              {[
                { q: "A IA é integrada ao meu WhatsApp/Instagram?", a: "Sim. A FlowPro utiliza APIs oficiais para garantir que sua conta esteja 100% segura enquanto nossa IA conversa com seus leads." },
                { q: "Quanto tempo para configurar?", a: "Em menos de 15 minutos você completa o setup Alpha. Nossa interface é intuitiva e desenhada para velocidade." },
                { q: "O pagamento é realmente único?", a: "Para o plano Alpha Founder Elite, sim. Você garante acesso vitalício a todas as atualizações sem nunca pagar mensalidade." },
              ].map((item, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="glass-card border-white/5 rounded-[2rem] px-10 border-none">
                  <AccordionTrigger className="font-black hover:no-underline py-8 uppercase tracking-[0.2em] text-xs text-left">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-base leading-relaxed pb-8 font-medium italic border-t border-white/5 pt-6">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-32 border-t border-white/5 bg-[#030305] relative z-10">
        <div className="container px-6 mx-auto grid md:grid-cols-4 gap-20">
          <div className="md:col-span-2 space-y-8">
            <div className="relative h-12 w-40">
              <Image 
                src={LOGO_URL} 
                alt="FlowPro Footer Logo" 
                fill 
                className="object-contain"
              />
            </div>
            <p className="text-muted-foreground text-sm max-w-sm font-medium uppercase tracking-widest leading-loose">
              Acelerando o faturamento de milhares de negócios através de autonomia digital. O futuro não é opcional.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-12 md:col-span-2">
            <div className="space-y-6">
              <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">Sistemas</h4>
              <nav className="flex flex-col gap-4">
                <Link href="#" className="text-xs text-muted-foreground hover:text-white transition-all uppercase tracking-widest">Dashboard</Link>
                <Link href="#" className="text-xs text-muted-foreground hover:text-white transition-all uppercase tracking-widest">API Docs</Link>
                <Link href="#" className="text-xs text-muted-foreground hover:text-white transition-all uppercase tracking-widest">Termos</Link>
              </nav>
            </div>
            <div className="space-y-6">
              <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">Conexão</h4>
              <nav className="flex flex-col gap-4">
                <Link href="#" className="text-xs text-muted-foreground hover:text-white transition-all uppercase tracking-widest">Instagram</Link>
                <Link href="#" className="text-xs text-muted-foreground hover:text-white transition-all uppercase tracking-widest">Suporte</Link>
                <Link href="#" className="text-xs text-muted-foreground hover:text-white transition-all uppercase tracking-widest">Comunidade</Link>
              </nav>
            </div>
          </div>
        </div>
        <div className="container px-6 mx-auto mt-32 pt-10 border-t border-white/5 text-center">
          <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.5em]">
            © 2024 FLOWPRO NEURAL SYSTEMS • DESBLOQUEIE O INFINITO
          </p>
        </div>
      </footer>
    </div>
  );
}

function Badge({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={`px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.3em] rounded-full inline-block ${className}`}>
      {children}
    </span>
  );
}
