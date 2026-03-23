import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Zap, 
  ArrowRight, 
  ShieldCheck, 
  TrendingUp, 
  MessageSquare, 
  Target, 
  Cpu, 
  Globe,
  Flame,
  Star
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
  const pillars = [
    { title: 'Neural Outreach', icon: <Globe className="h-6 w-6" />, desc: 'Captação inteligente em escala global.', color: 'text-blue-400' },
    { title: 'Conversion AI', icon: <Target className="h-6 w-6" />, desc: 'Scripts que aprendem com cada objeção.', color: 'text-purple-400' },
    { title: 'Market Sync', icon: <TrendingUp className="h-6 w-6" />, desc: 'Integração nativa com os maiores hubs.', color: 'text-green-400' },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#050507] text-white">
      {/* Dynamic Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[120px] animate-pulse-glow"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent/10 rounded-full blur-[120px] animate-pulse-glow" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Navigation */}
      <header className="px-6 h-20 flex items-center justify-between sticky top-0 z-50 bg-[#050507]/60 backdrop-blur-md border-b border-white/5">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="bg-primary p-1.5 rounded-lg rotate-3 group-hover:rotate-12 transition-transform shadow-[0_0_15px_rgba(139,92,246,0.5)]">
            <Zap className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-black tracking-tighter italic">FLOWPRO</span>
        </Link>
        <div className="hidden md:flex items-center gap-8">
          <Link href="#features" className="text-xs font-bold uppercase tracking-widest hover:text-primary transition-colors">Tecnologia</Link>
          <Link href="#pricing" className="text-xs font-bold uppercase tracking-widest hover:text-primary transition-colors">Planos</Link>
          <Link href="#faq" className="text-xs font-bold uppercase tracking-widest hover:text-primary transition-colors">Dúvidas</Link>
        </div>
        <Button asChild className="bg-white text-black hover:bg-primary hover:text-white font-bold rounded-full px-6 transition-all duration-500">
          <Link href="/quiz">COMEÇAR AGORA</Link>
        </Button>
      </header>

      <main className="relative z-10">
        {/* Hero Section */}
        <section className="relative pt-20 pb-32 lg:pt-32 lg:pb-48 overflow-hidden">
          <div className="container px-4 mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-[0.2em] mb-8 animate-bounce">
              <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse"></span>
              A Nova Era das Vendas Chegou
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.9] mb-8">
              VENDA MAIS <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-400 to-primary bg-[length:200%_auto] animate-marquee">DORMINDO</span>
            </h1>
            
            <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-12 font-medium leading-relaxed">
              O ecossistema definitivo que une <span className="text-white">IA Neural</span> e <span className="text-white">Estratégia de Escala</span> para transformar cliques em lucro real, 24 horas por dia.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" className="h-16 px-10 text-lg font-black bg-primary hover:scale-105 hover:rotate-1 shadow-[0_10px_30px_rgba(139,92,246,0.3)] transition-all rounded-2xl w-full sm:w-auto" asChild>
                <Link href="/quiz">ATIVAR MINHA IA <ArrowRight className="ml-2 h-6 w-6" /></Link>
              </Button>
              <div className="flex -space-x-3 items-center">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-10 w-10 rounded-full border-2 border-[#050507] bg-secondary flex items-center justify-center overflow-hidden">
                    <Image src={`https://picsum.photos/seed/${i+40}/100/100`} alt="user" width={40} height={40} />
                  </div>
                ))}
                <span className="pl-6 text-xs font-bold text-muted-foreground">+2.4k ativos</span>
              </div>
            </div>
          </div>

          {/* Floating Element */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] hero-gradient pointer-events-none -z-10"></div>
        </section>

        {/* Live Results Marquee */}
        <div className="bg-primary/10 border-y border-primary/20 py-4 overflow-hidden whitespace-nowrap">
          <div className="flex animate-marquee gap-12 items-center">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-green-500 shadow-[0_0_10px_#22c55e]"></div>
                <span className="text-xs font-black uppercase tracking-widest text-white/80">
                  Venda de <span className="text-white">R$ {Math.floor(Math.random() * 500) + 100},00</span> confirmada • Agora
                </span>
              </div>
            ))}
            {/* Repeat for seamless loop */}
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i+10} className="flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-green-500 shadow-[0_0_10px_#22c55e]"></div>
                <span className="text-xs font-black uppercase tracking-widest text-white/80">
                  Venda de <span className="text-white">R$ {Math.floor(Math.random() * 500) + 100},00</span> confirmada • Agora
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Pillars Section */}
        <section id="features" className="py-32">
          <div className="container px-4 mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {pillars.map((p, i) => (
                <Card key={i} className="glass-card p-8 group hover:-translate-y-2">
                  <div className={`mb-6 p-3 rounded-2xl bg-white/5 inline-block ${p.color} transition-transform group-hover:scale-110 group-hover:rotate-6`}>
                    {p.icon}
                  </div>
                  <h3 className="text-xl font-black mb-3 italic tracking-tight">{p.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Premium Education - Animated Gallery */}
        <section className="py-32 relative overflow-hidden">
          <div className="container px-4 mx-auto">
            <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
              <div className="max-w-xl">
                <h2 className="text-4xl md:text-6xl font-black italic mb-6">A CIÊNCIA DA <span className="text-primary">ESCALA</span></h2>
                <p className="text-muted-foreground">Não é apenas uma ferramenta. É o treinamento de elite que ensina você a dominar a inteligência por trás dos algoritmos.</p>
              </div>
              <Button variant="outline" className="rounded-full border-white/10 hover:bg-white/5">VER CURRÍCULO COMPLETO</Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-[600px]">
              <div className="md:col-span-8 relative rounded-3xl overflow-hidden glass-card group">
                <Image 
                  src={PlaceHolderImages[0].imageUrl} 
                  alt="Training" 
                  fill 
                  className="object-cover opacity-50 group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                <div className="absolute bottom-10 left-10">
                  <Badge className="mb-4 bg-primary">MASTERCLASS</Badge>
                  <h3 className="text-3xl font-black italic uppercase">Engenharia de Prompts para Vendas</h3>
                </div>
              </div>
              <div className="md:col-span-4 grid grid-rows-2 gap-6">
                {[1, 2].map((i) => (
                  <div key={i} className="relative rounded-3xl overflow-hidden glass-card group">
                    <Image 
                      src={PlaceHolderImages[i].imageUrl} 
                      alt="Module" 
                      fill 
                      className="object-cover opacity-30 group-hover:opacity-60 transition-opacity"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center p-6">
                        <Flame className="h-8 w-8 text-primary mx-auto mb-2 animate-float" />
                        <h4 className="font-black italic text-sm tracking-widest uppercase">Módulo 0{i+1}</h4>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Pricing - Kinetic Cards */}
        <section id="pricing" className="py-32 bg-white/2">
          <div className="container px-4 mx-auto">
            <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
              {/* Plan 1 */}
              <div className="glass-card p-10 flex flex-col justify-between relative overflow-hidden group">
                <div className="absolute top-0 right-0 h-32 w-32 bg-primary/10 blur-3xl -z-10 group-hover:bg-primary/20 transition-all"></div>
                <div>
                  <h3 className="text-lg font-black uppercase tracking-[0.3em] mb-8 text-white/50">Explorer</h3>
                  <div className="mb-10">
                    <span className="text-5xl font-black italic">R$ 147</span>
                    <span className="text-muted-foreground">/mês</span>
                  </div>
                  <ul className="space-y-4 mb-10">
                    {['Acesso à Plataforma', 'IA de Atendimento', 'Suporte em 24h', 'Relatórios Mensais'].map((f, i) => (
                      <li key={i} className="flex items-center gap-3 text-sm font-medium">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary"></div> {f}
                      </li>
                    ))}
                  </ul>
                </div>
                <Button variant="outline" className="w-full h-14 rounded-2xl border-white/10 hover:bg-white text-black font-bold">ASSINAR MENSAL</Button>
              </div>

              {/* Plan 2 - Highlight */}
              <div className="bg-primary p-[2px] rounded-[calc(var(--radius)+2px)] animate-float" style={{ animationDelay: '-3s' }}>
                <div className="bg-[#050507] p-10 flex flex-col justify-between h-full rounded-[var(--radius)] relative overflow-hidden group">
                  <div className="absolute -top-4 -right-4 bg-primary text-white text-[10px] font-black px-6 py-2 rotate-12 shadow-xl">VITALÍCIO</div>
                  <div>
                    <h3 className="text-lg font-black uppercase tracking-[0.3em] mb-8 text-primary">Alpha Elite</h3>
                    <div className="mb-2">
                      <span className="text-xs text-muted-foreground line-through">De R$ 597,90</span>
                    </div>
                    <div className="mb-10">
                      <span className="text-5xl font-black italic">R$ 297</span>
                      <span className="text-primary text-xs font-bold block mt-2 tracking-widest uppercase">Única Vez</span>
                    </div>
                    <ul className="space-y-4 mb-10">
                      {['Tudo do Explorer', 'Acesso Vitalício', 'Mentoria em Grupo', 'Scripts VIP (Ouro)', 'Prioridade Global'].map((f, i) => (
                        <li key={i} className="flex items-center gap-3 text-sm font-bold">
                          <Star className="h-4 w-4 text-primary fill-primary" /> {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Button className="w-full h-14 rounded-2xl bg-primary hover:bg-primary/90 text-white font-black shadow-[0_10px_30px_rgba(139,92,246,0.4)]">QUERO O OURO</Button>
                </div>
              </div>
            </div>
            <div className="mt-12 text-center">
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest flex items-center justify-center gap-2">
                <ShieldCheck className="h-4 w-4 text-green-500" /> Site Seguro • Pagamento Instantâneo via Pix ou Cartão
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="py-32">
          <div className="container px-4 mx-auto max-w-3xl">
            <h2 className="text-4xl font-black italic mb-12 text-center uppercase tracking-tighter">Sincronização de <span className="text-primary">Dúvidas</span></h2>
            <Accordion type="single" collapsible className="space-y-4">
              {[
                { q: "Preciso ter conhecimento técnico?", a: "Não. Nossa IA foi desenhada para ser 'Plug & Play'. Se você sabe usar o WhatsApp, sabe usar a FlowPro." },
                { q: "Em quanto tempo vejo resultados?", a: "Temos alunos que recuperam o investimento em menos de 48 horas aplicando as estratégias Alpha." },
                { q: "O acesso vitalício inclui atualizações?", a: "Sim. Assinando o plano Alpha Vitalício, você recebe todas as melhorias da IA para sempre." },
              ].map((item, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="glass-card border-none rounded-2xl px-6">
                  <AccordionTrigger className="font-bold hover:no-underline py-6 uppercase tracking-widest text-xs">{item.q}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-sm leading-relaxed pb-6">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-20 border-t border-white/5 relative z-10 bg-[#050507]">
        <div className="container px-4 mx-auto grid md:grid-cols-4 gap-12">
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <Zap className="h-6 w-6 text-primary" />
              <span className="text-2xl font-black tracking-tighter italic">FLOWPRO</span>
            </Link>
            <p className="text-muted-foreground text-sm max-w-sm font-medium">
              Acelerando o futuro das vendas digitais através de inteligência artificial autônoma. Não vendemos ferramentas, vendemos tempo e escala.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 md:col-span-2">
            <div className="space-y-4">
              <h4 className="text-xs font-black uppercase tracking-widest text-primary">Navegação</h4>
              <nav className="flex flex-col gap-2">
                <Link href="#" className="text-xs text-muted-foreground hover:text-white transition-colors">Tecnologia</Link>
                <Link href="#" className="text-xs text-muted-foreground hover:text-white transition-colors">Área de Membros</Link>
                <Link href="#" className="text-xs text-muted-foreground hover:text-white transition-colors">Termos de Uso</Link>
              </nav>
            </div>
            <div className="space-y-4">
              <h4 className="text-xs font-black uppercase tracking-widest text-primary">Social</h4>
              <nav className="flex flex-col gap-2">
                <Link href="#" className="text-xs text-muted-foreground hover:text-white transition-colors">Instagram</Link>
                <Link href="#" className="text-xs text-muted-foreground hover:text-white transition-colors">YouTube</Link>
                <Link href="#" className="text-xs text-muted-foreground hover:text-white transition-colors">Discord</Link>
              </nav>
            </div>
          </div>
        </div>
        <div className="container px-4 mx-auto mt-20 pt-8 border-t border-white/5 text-center">
          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.3em]">
            © 2024 FLOWPRO AI ACCELERATOR • TODOS OS DIREITOS RESERVADOS
          </p>
        </div>
      </footer>
    </div>
  );
}

function Badge({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={`px-2 py-1 text-[10px] font-black uppercase tracking-widest rounded ${className}`}>
      {children}
    </span>
  );
}