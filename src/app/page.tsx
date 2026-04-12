"use client";

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  MessageSquare, 
  Target, 
  Route, 
  Star,
  ChevronRight,
  Plus
} from 'lucide-react';
import Image from 'next/image';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { MacbookShowcase } from '@/components/MacbookShowcase';
import { GlobePulse } from '@/components/ui/cobe-globe-pulse';

const LOGO_URL = "https://s3.typebot.io/public/workspaces/cmml2oniw000g04l7gwmqelu1/typebots/cmn1vyjog000104la10d6sdzu/blocks/ywpf1hja4q4bxg9gzqobiz93?v=1774307470623";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] }
};

const staggerContainer = {
  initial: {},
  whileInView: {
    transition: {
      staggerChildren: 0.1
    }
  },
  viewport: { once: true }
};

const cardIn = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: "easeOut" }
};

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen text-white bg-transparent overflow-x-hidden">
      
      {/* NAVBAR */}
      <nav className="fixed top-0 w-full h-[60px] bg-[#05050f]/70 backdrop-blur-[20px] border-b border-white/5 z-50 px-6 md:px-12 flex items-center justify-between">
        <div className="flex items-center gap-12">
          <Link href="/" className="flex items-center gap-2">
            <div className="relative h-5 w-20">
              <Image src={LOGO_URL} alt="FlowPro" fill className="object-contain" priority />
            </div>
          </Link>
          
          <div className="hidden md:flex items-center gap-8">
            <Link href="#arsenal" className="text-[13px] text-white/50 hover:text-white transition-colors">Arsenal</Link>
            <Link href="#painel" className="text-[13px] text-white/50 hover:text-white transition-colors">Plataforma</Link>
            <Link href="#faq" className="text-[13px] text-white/50 hover:text-white transition-colors">Dúvidas</Link>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <Link href="/auth" className="text-[13px] text-white/40 hover:text-white transition-colors font-medium">Fazer login</Link>
          <Button asChild className="bg-[#6d28d9] hover:bg-[#7c3aed] text-white font-medium text-[13px] h-9 px-5 rounded-lg border-none shadow-none">
            <Link href="/quiz">Quero escalar</Link>
          </Button>
        </div>
      </nav>

      <main className="pt-[60px]">
        
        {/* HERO SECTION */}
        <section className="max-w-[1100px] mx-auto px-6 md:px-12 py-24 md:py-32">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <motion.div 
              className="flex flex-col items-start text-left space-y-8 max-w-2xl"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <Badge className="bg-[#6d28d9]/15 border border-[#7c3aed]/30 text-[#c4b5fd] text-[12px] font-medium px-4 py-1.5 rounded-full flex items-center gap-2 shadow-none">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                ✦ Mais de 1.800 consultores ativos
              </Badge>

              <h1 className="text-[44px] md:text-[72px] font-extrabold tracking-[-2px] leading-[0.95] text-white">
                Seu primeiro cliente<br />
                <span className="bg-gradient-to-r from-[#a855f7] to-[#6366f1] bg-clip-text text-transparent">começa com um script.</span>
              </h1>

              <p className="text-[16px] md:text-[18px] text-white/45 leading-[1.6] max-w-[480px]">
                Encontre leads qualificados, gere abordagens com IA e realize sua primeira venda em tempo recorde.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-8 pt-4">
                <Button asChild size="lg" className="bg-[#7c3aed] hover:bg-[#6d28d9] text-white font-medium text-[14px] h-[48px] px-8 rounded-[10px] transition-all hover:-translate-y-0.5 shadow-[0_8px_24px_rgba(124,58,237,0.4)] border-none">
                  <Link href="/quiz">Começar jornada →</Link>
                </Button>

                <div className="flex items-center gap-3">
                  <div className="flex -space-x-2">
                    {[ '#7c3aed', '#ec4899', '#3b82f6', '#10b981' ].map((color, i) => (
                      <div key={i} className="h-7 w-7 rounded-full border-2 border-[#05050f]" style={{ backgroundColor: color }} />
                    ))}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[12px] font-semibold text-white">4.9 ★</span>
                    <span className="text-[11px] text-white/40 font-medium">847 avaliações</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* GLOBE PULSE - HIDDEN ON MOBILE */}
            <div className="hidden md:block flex-1 max-w-[450px] relative">
              <div className="absolute inset-0 bg-primary/10 blur-[100px] rounded-full animate-pulse pointer-events-none" />
              <GlobePulse className="w-full h-full relative z-10" />
            </div>
          </div>
        </section>

        {/* METRICS SECTION */}
        <section className="border-y border-white/5 py-16 md:py-24">
          <div className="max-w-[1100px] mx-auto px-6 md:px-12">
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-0"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              {[
                { val: "1.817+", label: "Ativos no Flow" },
                { val: "R$ 2,6M", label: "Gerado pela base" },
                { val: "3,8 dias", label: "Para primeira venda" }
              ].map((m, i) => (
                <div key={i} className={`flex flex-col items-start md:px-12 ${i !== 0 ? 'md:border-l border-white/5' : ''}`}>
                  <span className="text-[42px] md:text-[52px] font-extrabold text-white tracking-[-1.5px] leading-none">{m.val}</span>
                  <span className="text-[12px] text-white/30 font-medium uppercase tracking-widest mt-2">{m.label}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ARSENAL SECTION */}
        <section id="arsenal" className="max-w-[1100px] mx-auto px-6 md:px-12 py-24 md:py-32">
          <motion.div className="space-y-4 mb-16" {...fadeInUp}>
            <h2 className="text-[32px] md:text-[36px] font-bold tracking-[-0.5px] text-white">O seu arsenal.</h2>
            <p className="text-[14px] text-white/35">As ferramentas que transformam um "não" em um fechamento.</p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
          >
            {[
              { 
                icon: MessageSquare, 
                title: "Script IA pronto", 
                desc: "Cole o nome do lead, a IA escreve a mensagem de abordagem personalizada no WhatsApp para você." 
              },
              { 
                icon: Target, 
                title: "Radar de leads", 
                desc: "Encontre donos de negócio em qualquer nicho e região do mundo com nosso motor de busca neural." 
              },
              { 
                icon: Route, 
                title: "Jornada de 7 dias", 
                desc: "Processo que já fechou mais de 479 vendas. Com missões guiadas e memória automática." 
              }
            ].map((f, i) => (
              <motion.div key={i} variants={cardIn}>
                <Card className="bg-white/[0.03] border-white/[0.07] rounded-2xl p-8 group transition-all duration-300 hover:border-primary/25 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,0,0,0.3)] min-h-[200px] relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
                  <div className="h-9 w-9 rounded-lg bg-primary/15 border border-primary/20 flex items-center justify-center text-primary mb-8">
                    <f.icon className="h-[18px] w-[18px] text-[#a78bfa]" />
                  </div>
                  <h3 className="text-[15px] font-semibold text-white/90 mb-3">{f.title}</h3>
                  <p className="text-[13px] text-white/40 leading-[1.7]">{f.desc}</p>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* PAINEL DE CONTROLE */}
        <section id="painel" className="max-w-[1100px] mx-auto px-6 md:px-12 py-24 md:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            <motion.div className="lg:col-span-7 space-y-12" {...fadeInUp}>
              <h2 className="text-[32px] md:text-[36px] font-bold tracking-[-0.5px] text-white">O seu painel de controle.</h2>
              
              <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-[0_32px_80px_rgba(0,0,0,0.5)]">
                <MacbookShowcase />
              </div>
            </motion.div>

            <motion.div 
              className="lg:col-span-5 flex flex-col gap-4 pt-12"
              variants={staggerContainer}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true }}
            >
              {[
                { n: "01", t: "Monitoramento Live", d: "Acompanhe seus ganhos e volume de prospecção em tempo real." },
                { n: "02", t: "Integração WhatsApp", d: "Dispare scripts diretamente para o app sem fricção." },
                { n: "03", t: "Ranking de Consultores", d: "Veja o faturamento dos maiores players do ecossistema." }
              ].map((b, i) => (
                <motion.div key={i} variants={cardIn} className="bg-white/[0.03] border border-white/[0.07] rounded-xl p-6 flex gap-6">
                  <span className="text-[11px] font-bold text-primary/50 pt-1">{b.n}</span>
                  <div className="space-y-1">
                    <h4 className="text-[14px] font-semibold text-white/85">{b.t}</h4>
                    <p className="text-[12px] text-white/35 leading-[1.6]">{b.d}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* DEPOIMENTOS */}
        <section className="max-w-[1100px] mx-auto px-6 md:px-12 py-24 md:py-32">
          <motion.h2 className="text-[32px] md:text-[36px] font-bold tracking-[-0.5px] text-white mb-16" {...fadeInUp}>
            Quem já está na jornada.
          </motion.h2>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
          >
            {[
              { 
                text: "Eu nunca tinha vendido nada online. Usei o script de IA para falar com uma pizzaria e fechei meu primeiro contrato em menos de uma semana.",
                author: "Bruno Silva", context: "Consultor Fase 1"
              },
              { 
                text: "O Radar de Leads é bizarro. Achei 50 dentistas na minha cidade e a IA gerou abordagens que todos responderam. Já faturei R$ 3.500.",
                author: "Ana Oliveira", context: "Faturamento R$ 12k"
              },
              { 
                text: "A barreira de não saber o que falar sumiu. Copiei o script da IA, mandei no WhatsApp e o cliente fechou na hora. Simples assim.",
                author: "Marcos Reus", context: "Venda em 48h"
              }
            ].map((t, i) => (
              <motion.div key={i} variants={cardIn}>
                <Card className="bg-white/[0.03] border-white/[0.07] rounded-2xl p-8 space-y-6 hover:-translate-y-1.5 transition-all hover:border-primary/30 hover:shadow-[0_16px_48px_rgba(0,0,0,0.3)]">
                  <div className="text-[48px] text-primary/30 font-serif leading-none h-6">“</div>
                  <div className="flex gap-1 mb-2">
                    {[1,2,3,4,5].map(s => <Star key={s} className="h-3.5 w-3.5 fill-[#f59e0b] text-[#f59e0b]" />)}
                  </div>
                  <p className="text-[15px] text-white/65 leading-[1.8] italic">"{t.text}"</p>
                  <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                    <div className="h-8 w-8 rounded-full bg-white/10" />
                    <div>
                      <p className="text-[13px] font-bold text-white">{t.author}</p>
                      <p className="text-[11px] text-white/30 font-medium">{t.context}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* FAQ */}
        <section id="faq" className="max-w-[1100px] mx-auto px-6 md:px-12 py-24 md:py-32">
          <motion.h2 className="text-[32px] md:text-[36px] font-bold tracking-[-0.5px] text-white mb-12" {...fadeInUp}>
            Dúvidas frequentes.
          </motion.h2>
          
          <motion.div {...fadeInUp}>
            <Accordion type="single" collapsible className="w-full">
              {[
                { q: "O sistema funciona para quem não tem experiência?", a: "Sim. O FlowPro foi desenhado como uma jornada guiada passo a passo. Você só precisa seguir as missões diárias e copiar os scripts gerados." },
                { q: "Como a IA ajuda no processo de vendas?", a: "Nossa IA analisa o nicho do lead e gera um script de abordagem que não parece spam, aumentando drasticamente suas chances de resposta." },
                { q: "Em quanto tempo vejo os primeiros resultados?", a: "Nossa jornada foi feita para você realizar sua primeira venda em até 7 dias, desde que execute todas as tarefas propostas." },
                { q: "Preciso aparecer nas redes sociais?", a: "Não. Ensinamos estratégias de bastidores onde você pode prospectar e vender sem nunca mostrar o rosto." }
              ].map((item, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="border-b border-white/[0.07] py-4">
                  <AccordionTrigger className="text-[14px] font-medium text-white/80 hover:no-underline hover:text-white transition-colors py-4">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-[13px] text-white/45 leading-[1.7] pt-2 pb-4 max-w-2xl">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </section>

        {/* CTA FINAL */}
        <section className="max-w-[1100px] mx-auto px-6 md:px-12 py-32 flex flex-col items-center text-center space-y-10">
          <motion.div 
            className="space-y-10 flex flex-col items-center"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-[42px] md:text-[52px] font-extrabold tracking-[-1.5px] text-white leading-tight max-w-[600px]">
              A escala não espera por você.
            </h2>
            <p className="text-[15px] text-white/40 max-w-[400px]">
              Garanta sua posição no ecossistema e comece a faturar hoje.
            </p>
            <Button asChild size="lg" className="bg-[#7c3aed] hover:bg-[#6d28d9] text-white font-medium text-[14px] h-[48px] px-8 rounded-[10px] shadow-[0_8px_24px_rgba(124,58,237,0.4)] transition-all hover:-translate-y-0.5 border-none">
              <Link href="/quiz">Entrar no Flow agora →</Link>
            </Button>
          </motion.div>
        </section>

        {/* FOOTER */}
        <footer className="max-w-[1100px] mx-auto px-6 md:px-12 py-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="relative h-4 w-16 opacity-50 grayscale contrast-200">
              <Image src={LOGO_URL} alt="FlowPro" fill className="object-contain" />
            </div>
            <span className="text-[12px] text-white/20 font-medium">© 2025 FlowPro. Todos os direitos reservados.</span>
          </div>
          
          <div className="flex items-center gap-8">
            <Link href="#" className="text-[12px] text-white/25 hover:text-white transition-colors">Termos</Link>
            <Link href="#" className="text-[12px] text-white/25 hover:text-white transition-colors">Privacidade</Link>
          </div>
        </footer>

      </main>
    </div>
  );
}
