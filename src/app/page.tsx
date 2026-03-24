
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { 
  Zap, 
  ArrowRight, 
  Star,
  Cpu,
  Layers,
  Search
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

const pillars = [
  { title: 'IA Neural Flow', icon: <Cpu className="h-6 w-6" />, desc: 'Abordagens personalizadas geradas em tempo real por nossa IA.', color: 'text-purple-400' },
  { title: 'Captador de Leads', icon: <Search className="h-6 w-6" />, desc: 'Encontre clientes qualificados em qualquer nicho com um clique.', color: 'text-blue-400' },
  { title: 'Jornada de 7 Dias', icon: <Layers className="h-6 w-6" />, desc: 'O caminho exato da primeira venda à escala brutal.', color: 'text-cyan-400' },
];

const salesActivity = [
  { name: 'Lucas M.', amount: '497,00', time: '2 min ago' },
  { name: 'Ana Silva', amount: '1.290,00', time: '5 min ago' },
  { name: 'GXP Vendas', amount: '297,00', time: 'Agora' },
  { name: 'Beatriz R.', amount: '890,00', time: '12 min ago' },
  { name: 'Carlos J.', amount: '147,00', time: '15 min ago' },
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[#050508] text-white">
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-primary/20 rounded-full blur-[140px] animate-pulse-glow"></div>
        <div className="absolute inset-0 grid-background opacity-20"></div>
      </div>

      <header className="px-6 h-20 flex items-center justify-between sticky top-0 z-50 bg-[#050508]/70 backdrop-blur-xl border-b border-white/5">
        <Link href="/" className="flex items-center group relative">
          <div className="relative h-10 w-32 md:h-12 md:w-40 transition-all duration-500 group-hover:scale-105 group-hover:drop-shadow-[0_0_15px_rgba(139,92,246,0.6)] grayscale group-hover:grayscale-0">
            <Image src={LOGO_URL} alt="FlowPro Logo" fill className="object-contain" priority />
          </div>
        </Link>
        <div className="hidden md:flex items-center gap-10">
          <Link href="#tecnologia" className="text-[10px] font-black uppercase tracking-[0.2em] hover:text-primary transition-all">Tecnologia</Link>
          <Link href="/auth" className="text-[10px] font-black uppercase tracking-[0.2em] hover:text-primary transition-all">Área do Aluno</Link>
        </div>
        <Button asChild className="bg-white text-black hover:bg-primary hover:text-white font-black rounded-full px-8 h-10 transition-all duration-500 hover:scale-105 active:scale-95 shadow-xl">
          <Link href="/quiz">COMEÇAR JORNADA</Link>
        </Button>
      </header>

      <main className="relative z-10">
        <section className="relative pt-24 pb-32 lg:pt-32 lg:pb-56 overflow-hidden">
          <div className="container px-6 mx-auto relative z-20">
            <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
              <div className="flex-1 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-[0.3em] mb-10">
                  <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse"></span>
                  Acesso Flow Disponível
                </div>
                
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.85] mb-12 uppercase">
                  ESCALE <br />
                  <span className="shimmer-text italic">INFINITO</span>
                </h1>
                
                <p className="text-muted-foreground text-lg md:text-2xl max-w-2xl mx-auto lg:mx-0 mb-16 font-medium leading-relaxed">
                  O ecossistema de <span className="text-white">vendas autônomas</span> que transforma seu faturamento em 7 dias com inteligência neural.
                </p>

                <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start items-center">
                  <Button size="lg" className="h-20 px-12 text-xl font-black bg-primary hover:scale-110 hover:rotate-1 shadow-[0_15px_40px_rgba(139,92,246,0.4)] transition-all rounded-3xl w-full sm:w-auto group" asChild>
                    <Link href="/quiz">
                      INICIAR QUIZ IA <ArrowRight className="ml-2 h-7 w-7 group-hover:translate-x-2 transition-transform" />
                    </Link>
                  </Button>
                </div>
              </div>

              <div className="flex-1 w-full max-w-[500px] lg:max-w-none relative aspect-square">
                <Globe className="w-full h-full" speed={0.005} dark={1} />
              </div>
            </div>
          </div>
        </section>

        <div className="bg-primary/5 border-y border-white/5 py-6 overflow-hidden whitespace-nowrap">
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

        <section id="tecnologia" className="py-40">
          <div className="container px-6 mx-auto">
            <div className="text-center mb-24">
              <h2 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter mb-6 text-white">SISTEMA <span className="text-primary">FLOW</span></h2>
              <p className="text-muted-foreground max-w-xl mx-auto uppercase tracking-[0.2em] text-[10px] font-black">Performance brutal em cada camada do seu funil</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {pillars.map((p, i) => (
                <Card key={i} className="glass-card p-10 group relative overflow-hidden rounded-[2rem]">
                  <div className="mb-8 p-4 rounded-2xl bg-white/5 inline-block ${p.color} transition-all group-hover:scale-125 group-hover:rotate-12 shadow-xl">
                    {p.icon}
                  </div>
                  <h3 className="text-2xl font-black mb-4 italic tracking-tight uppercase text-white">{p.title}</h3>
                  <p className="text-muted-foreground leading-relaxed font-medium">{p.desc}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <MacbookShowcase />

        <section id="faq" className="py-40">
          <div className="container px-6 mx-auto max-w-4xl">
            <h2 className="text-4xl md:text-5xl font-black italic mb-16 text-center uppercase tracking-tighter text-white">SINCRONIA <span className="text-primary">FLOW</span></h2>
            <Accordion type="single" collapsible className="space-y-6">
              {[
                { q: "O sistema funciona para quem não tem experiência?", a: "Totalmente. O FlowPro foi desenhado como uma jornada guiada de 7 dias." },
                { q: "Como a IA ajuda no processo?", a: "Nossa IA gera scripts de abordagem personalizados para cada lead que você encontra." },
              ].map((item, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="glass-card border-none rounded-[2rem] px-10">
                  <AccordionTrigger className="font-black hover:no-underline py-8 uppercase tracking-[0.2em] text-xs text-left text-white">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-base leading-relaxed pb-8 font-medium italic">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
      </main>

      <footer className="py-20 border-t border-white/5 bg-[#030305] text-center">
        <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.5em]">
          © 2024 FLOWPRO NEURAL SYSTEMS
        </p>
      </footer>
    </div>
  );
}
