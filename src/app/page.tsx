import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { 
  ArrowRight, 
  Cpu,
  Layers,
  Search,
  User
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

const faqs = [
  { q: "O sistema funciona para quem não tem experiência?", a: "Totalmente. O FlowPro foi desenhado como uma jornada guiada passo a passo. Você só precisa seguir as missões diárias." },
  { q: "Como a IA ajuda no processo?", a: "Nossa IA analisa o nicho do lead e gera um script de abordagem que não parece spam, aumentando drasticamente suas chances de resposta." },
  { q: "Em quanto tempo vejo resultados?", a: "Nossa jornada foi feita para você realizar sua primeira venda em até 7 dias, desde que execute todas as tarefas propostas." },
  { q: "Preciso aparecer nas redes sociais?", a: "Não. Ensinamos estratégias de bastidores onde você pode prospectar e vender sem nunca mostrar o rosto." },
  { q: "O acesso é vitalício?", a: "Oferecemos planos Vitalícios para a Fase 1 (Jornada de 7 Dias) e planos Mensais para quem deseja escala ilimitada com IA avançada." },
  { q: "Como encontro os clientes?", a: "O Radar de Leads integrado busca empresas reais direto do Google com telefone e endereço, filtrando pelo seu nicho de escolha." },
  { q: "Tenho suporte se tiver dúvidas?", a: "Sim. Além do Mentor IA 24h por dia para tirar qualquer dúvida técnica ou estratégica." },
  { q: "O que é o Método Flow?", a: "É um ecossistema de vendas que une prospecção fria, IA neural e automação para criar um Flow constante de caixa." }
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[#050508] text-white overflow-x-hidden">
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-primary/20 rounded-full blur-[140px] animate-pulse-glow"></div>
        <div className="absolute inset-0 grid-background opacity-20"></div>
      </div>

      <header className="px-4 md:px-6 h-20 flex items-center justify-between sticky top-0 z-50 bg-[#050508]/70 backdrop-blur-xl border-b border-white/5">
        <Link href="/" className="flex items-center group relative shrink-0">
          <div className="relative h-8 w-24 md:h-12 md:w-40 transition-all duration-500 group-hover:scale-105 group-hover:drop-shadow-[0_0_15px_rgba(139,92,246,0.6)] grayscale group-hover:grayscale-0">
            <Image src={LOGO_URL} alt="FlowPro Logo" fill className="object-contain" priority />
          </div>
        </Link>
        
        <div className="flex items-center gap-4 md:gap-10">
          <Link href="/auth" className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] hover:text-primary transition-all text-white/70">
            <User className="h-3 w-3 md:hidden" />
            <span className="hidden md:inline">Área do Aluno</span>
            <span className="md:hidden">Entrar</span>
          </Link>
          <Button asChild className="bg-white text-black hover:bg-primary hover:text-white font-black rounded-full px-4 md:px-8 h-9 md:h-10 transition-all duration-500 hover:scale-105 active:scale-95 shadow-xl text-[9px] md:text-sm">
            <Link href="/quiz">COMEÇAR</Link>
          </Button>
        </div>
      </header>

      <main className="relative z-10">
        <section className="relative pt-12 pb-16 md:pt-32 md:pb-40 lg:pb-56 overflow-hidden">
          <div className="container px-6 mx-auto relative z-20">
            <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
              <div className="flex-1 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[8px] md:text-[10px] font-black uppercase tracking-[0.3em] mb-6 md:mb-10 mx-auto lg:mx-0">
                  <div className="relative h-3 w-3">
                    <Image src={LOGO_ICON} alt="Icon" fill className="object-contain animate-pulse" />
                  </div>
                  Sincronia Flow Ativa
                </div>
                
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.85] mb-8 md:mb-12 uppercase">
                  ESCALE <br />
                  <span className="shimmer-text italic pr-4">INFINITO</span>
                </h1>
                
                <p className="text-muted-foreground text-sm md:text-2xl max-w-2xl mx-auto lg:mx-0 mb-10 md:mb-16 font-medium leading-relaxed">
                  O ecossistema de <span className="text-white">vendas autônomas</span> que transforma seu faturamento em 7 dias com inteligência neural.
                </p>

                <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start items-center">
                  <Button size="lg" className="h-16 md:h-20 px-8 md:px-12 text-lg md:text-xl font-black bg-primary hover:scale-110 hover:rotate-1 shadow-[0_15px_40px_rgba(139,92,246,0.4)] transition-all rounded-3xl w-full sm:w-auto group" asChild>
                    <Link href="/quiz">
                      PRONTO PARA ESCALAR! <ArrowRight className="ml-2 h-6 w-6 md:h-7 md:w-7 group-hover:translate-x-2 transition-transform" />
                    </Link>
                  </Button>
                </div>
              </div>

              <div className="hidden lg:block flex-1 w-full max-w-[320px] md:max-w-none relative aspect-square mx-auto">
                <Globe className="w-full h-full" speed={0.005} dark={1} />
              </div>
            </div>
          </div>
        </section>

        <div className="bg-primary/5 border-y border-white/5 py-4 md:py-6 overflow-hidden whitespace-nowrap pointer-events-none">
          <div className="flex animate-marquee gap-10 md:gap-16 items-center">
            {[...salesActivity, ...salesActivity].map((sale, i) => (
              <div key={i} className="flex items-center gap-3 md:gap-4 bg-white/[0.03] px-4 md:px-6 py-2 rounded-full border border-white/5">
                <div className="h-1.5 w-1.5 md:h-2 md:w-2 rounded-full bg-green-500 shadow-[0_0_12px_#22c55e]"></div>
                <span className="text-[8px] md:text-[10px] font-black uppercase tracking-widest text-white/90">
                  {sale.name} • <span className="text-primary">R$ {sale.amount}</span> • <span className="text-muted-foreground">{sale.time}</span>
                </span>
              </div>
            ))}
          </div>
        </div>

        <section id="tecnologia" className="py-20 md:py-40">
          <div className="container px-6 mx-auto">
            <div className="text-center mb-16 md:mb-24">
              <h2 className="text-3xl md:text-6xl font-black italic uppercase tracking-tighter mb-4 md:mb-6 text-white leading-none">SISTEMA <span className="text-primary">FLOW</span></h2>
              <p className="text-muted-foreground max-w-xl mx-auto uppercase tracking-[0.2em] text-[8px] md:text-[10px] font-black">Performance brutal em cada camada do seu funil</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
              {pillars.map((p, i) => (
                <Card key={i} className="glass-card p-8 md:p-10 group relative overflow-hidden rounded-[1.5rem] md:rounded-[2rem]">
                  <div className="mb-6 md:mb-8 p-3 md:p-4 rounded-2xl bg-white/5 inline-block transition-all group-hover:scale-125 group-hover:rotate-12 shadow-xl">
                    {p.icon}
                  </div>
                  <h3 className="text-xl md:text-2xl font-black mb-3 md:mb-4 italic tracking-tight uppercase text-white">{p.title}</h3>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed font-medium">{p.desc}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="hidden md:block py-10 md:py-20 relative overflow-visible">
          <MacbookShowcase />
        </section>

        <section id="faq" className="py-20 md:py-40">
          <div className="container px-6 mx-auto max-w-4xl">
            <h2 className="text-3xl md:text-5xl font-black italic mb-12 md:mb-16 text-center uppercase tracking-tighter text-white">SINCRONIA <span className="text-primary">FLOW</span></h2>
            <Accordion type="single" collapsible className="space-y-4 md:space-y-6">
              {faqs.map((item, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="glass-card border-none rounded-[1.5rem] md:rounded-[2rem] px-6 md:px-10">
                  <AccordionTrigger className="font-black hover:no-underline py-6 md:py-8 uppercase tracking-[0.1em] md:tracking-[0.2em] text-[10px] md:text-xs text-left text-white">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-sm md:text-base leading-relaxed pb-6 md:pb-8 font-medium italic">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        <section className="py-20 md:py-32 relative overflow-hidden border-t border-white/5">
          <div className="absolute inset-0 bg-primary/5 blur-3xl rounded-full scale-150 pointer-events-none"></div>
          <div className="container px-6 mx-auto text-center relative z-10">
            <h2 className="text-3xl md:text-6xl font-black italic uppercase tracking-tighter mb-6 md:mb-8 text-white leading-tight">
              NÃO APENAS VENDA. <span className="text-primary shimmer-text">DOMINE.</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-10 md:mb-12 font-medium uppercase tracking-[0.2em] text-[8px] md:text-[10px] px-4">
              O Flow não espera por ninguém. A próxima janela de escala neural está aberta para quem executa.
            </p>
            <div className="flex justify-center px-4">
              <Button asChild size="lg" className="h-16 md:h-20 px-8 md:px-16 text-lg md:text-xl font-black bg-primary hover:scale-110 hover:rotate-1 shadow-[0_15px_40px_rgba(139,92,246,0.4)] transition-all rounded-3xl group w-full sm:w-auto">
                <Link href="/quiz">
                  ENTRAR NO FLOW AGORA <ArrowRight className="ml-2 h-6 w-6 md:h-7 md:w-7 group-hover:translate-x-2 transition-transform" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-12 md:py-20 border-t border-white/5 bg-[#030305] text-center">
        <p className="text-[8px] md:text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em] md:tracking-[0.5em] px-4">
          © 2026 FLOWPRO NEURAL SYSTEMS
        </p>
      </footer>
    </div>
  );
}
