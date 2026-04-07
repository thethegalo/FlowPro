
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowRight, 
  Cpu,
  Layers,
  Search,
  User,
  Star,
  Zap,
  CheckCircle2,
  TrendingUp,
  ShieldCheck,
  MessageSquare,
  MapPin,
  Calendar,
  Quote
} from 'lucide-react';
import Image from 'next/image';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Globe } from '@/components/ui/cobe-globe';
import { MacbookShowcase } from '@/components/MacbookShowcase';
import { DashboardParticles } from '@/components/DashboardParticles';

const LOGO_URL = "https://s3.typebot.io/public/workspaces/cmml2oniw000g04l7gwmqelu1/typebots/cmn1vyjog000104la10d6sdzu/blocks/ywpf1hja4q4bxg9gzqobiz93?v=1774307470623";

const stats = [
  { label: 'Scripts Gerados', value: '3.200+', icon: <MessageSquare className="h-4 w-4" />, sub: 'Só esta semana' },
  { label: 'Vendas Alunos', value: 'R$ 4.8M', icon: <TrendingUp className="h-4 w-4" />, sub: 'Total acumulado' },
  { label: 'Primeira Venda', value: '7 DIAS', icon: <Calendar className="h-4 w-4" />, sub: 'Tempo médio' },
];

const pillars = [
  { 
    title: 'Script IA Pronto', 
    icon: <Cpu className="h-6 w-6" />, 
    desc: 'Cole o nome do lead, a IA escreve a mensagem de abordagem personalizada no WhatsApp para você.', 
    color: 'text-purple-400' 
  },
  { 
    title: 'Radar de Leads', 
    icon: <Search className="h-6 w-6" />, 
    desc: 'Encontre donos de negócio em qualquer cidade e nicho em segundos com nosso motor de busca neural.', 
    color: 'text-blue-400' 
  },
  { 
    title: 'Jornada de 7 Dias', 
    icon: <Layers className="h-6 w-6" />, 
    desc: 'Um passo por dia até fechar sua primeira venda, com missões guiadas e mentorias automáticas.', 
    color: 'text-cyan-400' 
  },
];

const testimonials = [
  {
    name: "Bruno Silva",
    result: "R$ 1.200 no 4º dia",
    text: "Eu nunca tinha vendido nada online. Usei o script de IA para falar com uma pizzaria local e fechei meu primeiro contrato em menos de uma semana.",
    avatar: "https://picsum.photos/seed/b1/100/100"
  },
  {
    name: "Ana Oliveira",
    result: "3 clientes em 10 dias",
    text: "O Radar de Leads é bizarro. Achei 50 dentistas na minha cidade e a IA gerou abordagens que todos responderam. Já faturei R$ 3.500.",
    avatar: "https://picsum.photos/seed/a2/100/100"
  },
  {
    name: "Marcos Reus",
    result: "Primeira venda em 48h",
    text: "A barreira de não saber o que falar sumiu. Copiei o script da IA, mandei no WhatsApp e o cliente fechou na hora. Simples assim.",
    avatar: "https://picsum.photos/seed/m3/100/100"
  }
];

const faqs = [
  { q: "O sistema funciona para quem não tem experiência?", a: "Totalmente. O FlowPro foi desenhado como uma jornada guiada passo a passo. Você só precisa seguir as missões diárias e copiar os scripts gerados." },
  { q: "Como a IA ajuda no processo?", a: "Nossa IA analisa o nicho do lead e gera um script de abordagem que não parece spam, aumentando drasticamente suas chances de resposta." },
  { q: "Em quanto tempo vejo resultados?", a: "Nossa jornada foi feita para você realizar sua primeira venda em até 7 dias, desde que execute todas as tarefas propostas." },
  { q: "Preciso aparecer nas redes sociais?", a: "Não. Ensinamos estratégias de bastidores onde você pode prospectar e vender sem nunca mostrar o rosto." },
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[#050508] text-white overflow-x-hidden relative">
      <DashboardParticles />
      
      {/* Atmosphere Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-primary/20 rounded-full blur-[140px] animate-pulse-glow"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-accent/10 rounded-full blur-[120px]"></div>
        <div className="absolute inset-0 grid-background opacity-20"></div>
      </div>

      <header className="px-4 md:px-6 h-20 flex items-center justify-between sticky top-0 z-50 bg-[#050508]/70 backdrop-blur-xl border-b border-white/5">
        <Link href="/" className="flex items-center group relative shrink-0">
          <div className="relative h-8 w-24 md:h-12 md:w-40 transition-all duration-500 group-hover:scale-105 group-hover:drop-shadow-[0_0_15px_rgba(139,92,246,0.6)]">
            <Image src={LOGO_URL} alt="FlowPro Logo" fill className="object-contain filter-none" priority />
          </div>
        </Link>
        
        <div className="flex items-center gap-4 md:gap-10">
          <Link href="/auth" className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] hover:text-primary transition-all text-white/70">
            <span className="hidden md:inline">Área do Aluno</span>
            <span className="md:hidden">Entrar</span>
          </Link>
          <Button asChild className="bg-white text-black hover:bg-primary hover:text-white font-black rounded-full px-4 md:px-8 h-9 md:h-10 transition-all duration-500 hover:scale-105 active:scale-95 shadow-xl text-[9px] md:text-sm">
            <Link href="/quiz">QUERO ESCALAR</Link>
          </Button>
        </div>
      </header>

      <main className="relative z-10">
        {/* HERO SECTION */}
        <section className="relative pt-16 pb-24 md:pt-32 md:pb-48 overflow-hidden">
          <div className="container px-6 mx-auto relative z-20">
            <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
              <div className="flex-1 text-center lg:text-left space-y-10">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-[8px] md:text-[10px] font-black uppercase tracking-[0.3em] mx-auto lg:mx-0 text-primary">
                  <Zap className="h-3 w-3 animate-pulse" />
                  Motor Neural de Vendas Ativado
                </div>
                
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.85] uppercase">
                  SEU PRIMEIRO CLIENTE <br />
                  <span className="shimmer-text italic">COMEÇA COM UM SCRIPT.</span>
                </h1>
                
                <p className="text-muted-foreground text-sm md:text-2xl max-w-2xl mx-auto lg:mx-0 font-medium leading-relaxed">
                  Encontre leads qualificados em qualquer nicho, <span className="text-white">gere mensagens prontas com IA</span> e comece a vender em até 7 dias — mesmo sem experiência.
                </p>

                <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start items-center">
                  <div className="relative group">
                    <div className="absolute -inset-1 bg-primary rounded-[2.5rem] blur-xl opacity-40 group-hover:opacity-100 animate-pulse transition duration-1000"></div>
                    <Button size="lg" className="relative h-16 md:h-20 px-8 md:px-12 text-lg md:text-xl font-black bg-primary hover:scale-105 transition-all rounded-3xl w-full sm:w-auto group overflow-hidden" asChild>
                      <Link href="/quiz">
                        COMEÇAR JORNADA <ArrowRight className="ml-2 h-6 w-6 md:h-7 md:w-7 group-hover:translate-x-2 transition-transform" />
                      </Link>
                    </Button>
                  </div>
                  
                  <div className="flex -space-x-3">
                    {[1,2,3,4].map(i => (
                      <div key={i} className="h-10 w-10 rounded-full border-2 border-[#050508] bg-white/10 overflow-hidden">
                        <img src={`https://picsum.photos/seed/${i+50}/100/100`} alt="user" className="w-full h-full object-cover" />
                      </div>
                    ))}
                    <div className="h-10 w-10 rounded-full border-2 border-[#050508] bg-primary flex items-center justify-center text-[10px] font-black">
                      +12k
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex-1 w-full relative aspect-square mx-auto max-w-[600px]">
                <div className="absolute inset-0 bg-primary/30 blur-[140px] rounded-full animate-pulse scale-150"></div>
                <Globe className="w-full h-full" speed={0.008} dark={1} />
              </div>
            </div>
          </div>
        </section>

        {/* SOCIAL PROOF STATS */}
        <section className="py-16 bg-gradient-to-b from-transparent via-primary/5 to-transparent border-y border-white/5">
          <div className="container px-6 mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {stats.map((s, i) => (
                <div key={i} className="flex flex-col items-center md:items-start text-center md:text-left space-y-2 group">
                  <div className="flex items-center gap-3 text-primary mb-2">
                    <div className="p-3 rounded-xl bg-primary/10 border border-primary/20 group-hover:scale-110 transition-transform">
                      {s.icon}
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest opacity-70">{s.label}</span>
                  </div>
                  <div className="text-5xl font-black italic uppercase tracking-tighter">{s.value}</div>
                  <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">{s.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FEATURES */}
        <section id="tecnologia" className="py-24 md:py-48 relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(124,58,237,0.1),transparent_50%)]"></div>
          <div className="container px-6 mx-auto relative z-10">
            <div className="text-center mb-24">
              <h2 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter mb-6 text-white leading-none">O SEU <span className="text-primary">ARSENAL</span></h2>
              <p className="text-muted-foreground max-w-xl mx-auto uppercase tracking-[0.2em] text-[10px] font-black">As ferramentas que transformam um "não" em um "fechado"</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {pillars.map((p, i) => (
                <Card key={i} className="glass-card p-10 md:p-12 group transition-all duration-500 rounded-[2.5rem] border-white/10 hover:border-primary/50">
                  <div className="mb-10 p-5 rounded-2xl bg-primary/10 inline-block transition-transform group-hover:scale-110 group-hover:rotate-6 shadow-2xl border border-primary/20">
                    {p.icon}
                  </div>
                  <h3 className="text-2xl font-black mb-4 italic tracking-tight uppercase text-white">{p.title}</h3>
                  <p className="text-base text-muted-foreground leading-relaxed font-medium">{p.desc}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* MACBOOK SHOWCASE */}
        <section className="py-24 relative overflow-visible bg-gradient-to-b from-transparent via-blue-900/10 to-transparent">
          <div className="text-center mb-16">
             <Badge className="bg-primary/20 text-primary border-primary/30 uppercase tracking-[0.3em] text-[10px] px-4 py-1.5 mb-4">Command Center</Badge>
             <h2 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter">O SEU PAINEL DE CONTROLE</h2>
             <p className="text-muted-foreground text-xs uppercase font-bold tracking-widest mt-4">Toda a inteligência do mercado na palma da sua mão</p>
          </div>
          <div className="scale-110 md:scale-125 lg:scale-150 transition-transform py-20">
            <MacbookShowcase />
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="py-32 relative">
          <div className="container px-6 mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter mb-6 text-white leading-none">QUEM <span className="text-primary">EXECUTA</span> GANHA</h2>
              <p className="text-muted-foreground max-w-xl mx-auto uppercase tracking-[0.2em] text-[10px] font-black">Alunos comuns que começaram com o mesmo script que você vai gerar</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((t, i) => (
                <Card key={i} className="glass-card p-10 rounded-[2.5rem] space-y-6 border-white/5 flex flex-col justify-between">
                  <div className="space-y-6">
                    <Quote className="h-10 w-10 text-primary opacity-20" />
                    <p className="text-lg font-medium italic text-white/80 leading-relaxed">"{t.text}"</p>
                  </div>
                  <div className="flex items-center gap-4 pt-6 border-t border-white/5">
                    <div className="h-14 w-14 rounded-2xl bg-white/5 border border-white/10 overflow-hidden shrink-0">
                      <img src={t.avatar} alt={t.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <p className="font-black uppercase italic text-white leading-none mb-1">{t.name}</p>
                      <p className="text-[10px] font-black text-primary uppercase tracking-widest">{t.result}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="py-24 md:py-48 bg-gradient-to-t from-primary/5 to-transparent">
          <div className="container px-6 mx-auto max-w-4xl">
            <h2 className="text-4xl md:text-6xl font-black italic mb-16 text-center uppercase tracking-tighter text-white">DÚVIDAS <span className="text-primary">FREQUENTES</span></h2>
            <Accordion type="single" collapsible className="space-y-6">
              {faqs.map((item, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="glass-card border-none rounded-[2rem] px-8 md:px-12 hover:bg-white/[0.05] transition-colors">
                  <AccordionTrigger className="font-black hover:no-underline py-8 md:py-10 uppercase tracking-[0.2em] text-xs md:text-sm text-left text-white">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-sm md:text-lg leading-relaxed pb-8 md:pb-10 font-medium italic border-t border-white/5 pt-6">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="py-32 relative overflow-hidden border-t border-white/5 bg-[#030305]">
          <div className="absolute inset-0 bg-primary/5 blur-3xl rounded-full scale-150 pointer-events-none"></div>
          <div className="container px-6 mx-auto text-center relative z-10">
            <h2 className="text-4xl md:text-7xl font-black italic uppercase tracking-tighter mb-10 text-white leading-tight">
              A ESCALA NÃO <br /><span className="text-primary shimmer-text">ESPERA POR VOCÊ.</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-12 font-medium uppercase tracking-[0.2em] text-[10px] px-4 leading-relaxed">
              O ecossistema neural está operando em alta frequência. Garanta sua posição agora e gere seu primeiro script.
            </p>
            
            <div className="relative inline-block group">
              <div className="absolute -inset-1 bg-primary rounded-[2.5rem] blur-2xl opacity-30 group-hover:opacity-70 animate-pulse transition duration-1000"></div>
              <Button asChild size="lg" className="relative h-20 md:h-24 px-8 md:px-16 text-xl md:text-2xl font-black bg-primary hover:scale-105 transition-all rounded-[2.5rem] group w-full sm:w-auto">
                <Link href="/quiz">
                  ENTRAR NO FLOW AGORA <ArrowRight className="ml-3 h-8 w-8 group-hover:translate-x-2 transition-transform" />
                </Link>
              </Button>
            </div>
            
            <div className="mt-20 flex flex-wrap justify-center gap-12 opacity-30 grayscale hover:grayscale-0 transition-all duration-700">
               <ShieldCheck className="h-10 w-10" />
               <CheckCircle2 className="h-10 w-10" />
               <Zap className="h-10 w-10" />
               <Layers className="h-10 w-10" />
            </div>
          </div>
        </section>
      </main>

      <footer className="py-20 border-t border-white/5 bg-[#030305] text-center relative z-10">
        <div className="relative h-10 w-32 mx-auto mb-8 opacity-50">
          <Image src={LOGO_URL} alt="FlowPro Logo" fill className="object-contain" />
        </div>
        <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.5em] px-4 leading-relaxed">
          © 2026 FLOWPRO NEURAL SYSTEMS • TODOS OS DIREITOS RESERVADOS
        </p>
      </footer>
    </div>
  );
}
