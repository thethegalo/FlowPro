import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
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
  ShieldCheck
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

const LOGO_URL = "https://s3.typebot.io/public/workspaces/cmml2oniw000g04l7gwmqelu1/typebots/cmn1vyjog000104la10d6sdzu/blocks/ywpf1hja4q4bxg9gzqobiz93?v=1774307470623";
const LOGO_ICON = "https://s3.typebot.io/public/workspaces/cmml2oniw000g04l7gwmqelu1/typebots/cmn1vyjog000104la10d6sdzu/blocks/d5tqr6czngeukjb8r6whrs5s?v=1774318273085";

const pillars = [
  { title: 'IA Neural Flow', icon: <Cpu className="h-6 w-6" />, desc: 'Abordagens personalizadas geradas em tempo real por nossa IA de elite.', color: 'text-purple-400' },
  { title: 'Radar de Leads', icon: <Search className="h-6 w-6" />, desc: 'Encontre clientes qualificados em qualquer nicho com apenas um clique.', color: 'text-blue-400' },
  { title: 'Jornada Escalável', icon: <Layers className="h-6 w-6" />, desc: 'O caminho exato da primeira venda à escala de múltiplos dígitos.', color: 'text-cyan-400' },
];

const stats = [
  { label: 'Usuários Ativos', value: '12K+', icon: <User className="h-4 w-4" /> },
  { label: 'Vendas Geradas', value: 'R$ 4.8M', icon: <TrendingUp className="h-4 w-4" /> },
  { label: 'Satisfação', value: '98%', icon: <Star className="h-4 w-4" /> },
];

const faqs = [
  { q: "O sistema funciona para quem não tem experiência?", a: "Totalmente. O FlowPro foi desenhado como uma jornada guiada passo a passo. Você só precisa seguir as missões diárias." },
  { q: "Como a IA ajuda no processo?", a: "Nossa IA analisa o nicho do lead e gera um script de abordagem que não parece spam, aumentando drasticamente suas chances de resposta." },
  { q: "Em quanto tempo vejo resultados?", a: "Nossa jornada foi feita para você realizar sua primeira venda em até 7 dias, desde que execute todas as tarefas propostas." },
  { q: "Preciso aparecer nas redes sociais?", a: "Não. Ensinamos estratégias de bastidores onde você pode prospectar e vender sem nunca mostrar o rosto." },
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[#050508] text-white overflow-x-hidden">
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
        <section className="relative pt-12 pb-16 md:pt-32 md:pb-48 overflow-hidden">
          <div className="container px-6 mx-auto relative z-20">
            <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
              <div className="flex-1 text-center lg:text-left space-y-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[8px] md:text-[10px] font-black uppercase tracking-[0.3em] mx-auto lg:mx-0">
                  <Zap className="h-3 w-3 text-primary animate-pulse" />
                  Ecossistema Flow Ativado
                </div>
                
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.85] uppercase">
                  A PRÓXIMA ERA <br />
                  <span className="shimmer-text italic">DAS VENDAS</span>
                </h1>
                
                <p className="text-muted-foreground text-sm md:text-2xl max-w-2xl mx-auto lg:mx-0 font-medium leading-relaxed">
                  Transforme seu faturamento com <span className="text-white">inteligência neural</span> e automação autônoma em apenas 7 dias.
                </p>

                <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start items-center">
                  <Button size="lg" className="h-16 md:h-20 px-8 md:px-12 text-lg md:text-xl font-black bg-primary hover:scale-110 hover:rotate-1 shadow-[0_15px_40px_rgba(139,92,246,0.4)] transition-all rounded-3xl w-full sm:w-auto group" asChild>
                    <Link href="/quiz">
                      COMEÇAR JORNADA <ArrowRight className="ml-2 h-6 w-6 md:h-7 md:w-7 group-hover:translate-x-2 transition-transform" />
                    </Link>
                  </Button>
                  
                  <div className="flex -space-x-3">
                    {[1,2,3,4].map(i => (
                      <div key={i} className="h-10 w-10 rounded-full border-2 border-[#050508] bg-white/10 overflow-hidden">
                        <img src={`https://picsum.photos/seed/${i+10}/100/100`} alt="user" className="w-full h-full object-cover" />
                      </div>
                    ))}
                    <div className="h-10 w-10 rounded-full border-2 border-[#050508] bg-primary flex items-center justify-center text-[10px] font-black">
                      +2k
                    </div>
                  </div>
                </div>
              </div>

              <div className="hidden lg:block flex-1 w-full relative aspect-square mx-auto">
                <div className="absolute inset-0 bg-primary/20 blur-[120px] rounded-full animate-pulse"></div>
                <Globe className="w-full h-full" speed={0.005} dark={1} />
              </div>
            </div>
          </div>
        </section>

        {/* SOCIAL PROOF STATS */}
        <section className="py-12 bg-white/[0.02] border-y border-white/5">
          <div className="container px-6 mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {stats.map((s, i) => (
                <div key={i} className="flex flex-col items-center md:items-start text-center md:text-left space-y-2">
                  <div className="flex items-center gap-2 text-primary">
                    {s.icon}
                    <span className="text-[10px] font-black uppercase tracking-widest">{s.label}</span>
                  </div>
                  <div className="text-4xl font-black italic uppercase tracking-tighter">{s.value}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FEATURES */}
        <section id="tecnologia" className="py-24 md:py-48 relative overflow-hidden">
          <div className="container px-6 mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter mb-6 text-white leading-none">TECNOLOGIA <span className="text-primary">FLOW</span></h2>
              <p className="text-muted-foreground max-w-xl mx-auto uppercase tracking-[0.2em] text-[10px] font-black">Infraestrutura neural para quem não aceita menos que a elite</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {pillars.map((p, i) => (
                <Card key={i} className="glass-card p-8 md:p-12 group transition-all duration-500 rounded-[2.5rem]">
                  <div className="mb-8 p-4 rounded-2xl bg-white/5 inline-block transition-transform group-hover:scale-125 group-hover:rotate-12 shadow-xl border border-white/10">
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
        <section className="hidden md:block py-20 relative overflow-visible">
          <div className="text-center mb-12">
             <Badge className="bg-primary/20 text-primary border-primary/30 uppercase tracking-[0.3em] text-[10px] px-4 py-1.5 mb-4">Command Center</Badge>
             <h2 className="text-3xl font-black italic uppercase tracking-tighter">O SEU PAINEL DE CONTROLE</h2>
          </div>
          <MacbookShowcase />
        </section>

        {/* FAQ */}
        <section id="faq" className="py-24 md:py-48">
          <div className="container px-6 mx-auto max-w-4xl">
            <h2 className="text-4xl md:text-6xl font-black italic mb-16 text-center uppercase tracking-tighter text-white">DÚVIDAS <span className="text-primary">FREQUENTES</span></h2>
            <Accordion type="single" collapsible className="space-y-6">
              {faqs.map((item, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="glass-card border-none rounded-[2rem] px-8 md:px-12">
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
        <section className="py-32 relative overflow-hidden border-t border-white/5">
          <div className="absolute inset-0 bg-primary/5 blur-3xl rounded-full scale-150 pointer-events-none"></div>
          <div className="container px-6 mx-auto text-center relative z-10">
            <h2 className="text-4xl md:text-7xl font-black italic uppercase tracking-tighter mb-10 text-white leading-tight">
              A ESCALA NÃO <br /><span className="text-primary shimmer-text">ESPERA POR VOCÊ.</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-12 font-medium uppercase tracking-[0.2em] text-[10px] px-4 leading-relaxed">
              O ecossistema neural está operando em alta frequência. Garanta sua posição agora.
            </p>
            <Button asChild size="lg" className="h-20 md:h-24 px-8 md:px-16 text-xl md:text-2xl font-black bg-primary hover:scale-110 hover:rotate-1 shadow-[0_15px_50px_rgba(139,92,246,0.5)] transition-all rounded-[2rem] group w-full sm:w-auto">
              <Link href="/quiz">
                QUERO ENTRAR NO FLOW <ArrowRight className="ml-3 h-8 w-8 group-hover:translate-x-2 transition-transform" />
              </Link>
            </Button>
            
            <div className="mt-16 flex flex-wrap justify-center gap-8 opacity-40 grayscale">
               <ShieldCheck className="h-8 w-8" />
               <CheckCircle2 className="h-8 w-8" />
               <Zap className="h-8 w-8" />
               <Layers className="h-8 w-8" />
            </div>
          </div>
        </section>
      </main>

      <footer className="py-20 border-t border-white/5 bg-[#030305] text-center">
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
