"use client";

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Play, 
  ArrowLeft, 
  LayoutDashboard, 
  GraduationCap, 
  Target, 
  GitBranch, 
  Zap, 
  CheckCircle2,
  Clock,
  Menu
} from 'lucide-react';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from '@/components/AppSidebar';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const VIDEOS = [
  {
    id: "lE19AjHqX1s",
    title: "Módulo 1: Captar Leads em Escala",
    desc: "Aprenda como utilizar o Radar Neural para encontrar os alvos mais lucrativos do seu nicho.",
    icon: <Target className="h-5 w-5" />,
    duration: "12:45"
  },
  {
    id: "NBbxaiPi07c",
    title: "Módulo 2: Funil de Vendas de Alta Conversão",
    desc: "A estrutura exata para transformar abordagens frias em fechamentos no PIX.",
    icon: <GitBranch className="h-5 w-5" />,
    duration: "15:20"
  }
];

export default function MasterclassPage() {
  const [activeVideo, setActiveVideo] = useState(VIDEOS[0]);

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-transparent relative overflow-hidden">
        <AppSidebar />
        
        <main className="flex-1 flex flex-col min-w-0 relative z-10">
          <header className="h-[48px] border-b border-white/5 flex items-center justify-between px-6 bg-transparent sticky top-0 z-50">
            <div className="flex items-center gap-3">
              <SidebarTrigger className="md:hidden">
                <Menu className="h-5 w-5 text-white/50" />
              </SidebarTrigger>
              <GraduationCap className="h-[14px] w-[14px] text-primary/70" />
              <h1 className="text-[13px] font-medium text-white/50">Masterclass: Escala Infinitos</h1>
            </div>
            <div className="bg-[#581c87]/40 border border-[#7c3aed]/30 text-[#c4b5fd] text-[11px] font-medium rounded-[6px] px-[10px] py-[4px] uppercase tracking-[0.5px]">
              ACESSO VIP
            </div>
          </header>

          <div className="flex-1 container max-w-6xl mx-auto p-4 md:p-8 lg:p-12 space-y-8">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Link href="/dashboard" className="text-white/30 hover:text-primary transition-colors">
                  <ArrowLeft className="h-4 w-4" />
                </Link>
                <Badge variant="outline" className="bg-primary/10 border-primary/20 text-primary text-[8px] font-black uppercase tracking-widest px-3 py-1">
                  Treinamento de Elite
                </Badge>
              </div>
              <h2 className="text-3xl md:text-5xl font-black italic uppercase tracking-tighter text-white">
                ESCALA <span className="text-primary">INFINITOS</span>
              </h2>
              <p className="text-muted-foreground text-xs md:text-sm uppercase font-bold tracking-widest max-w-2xl">
                O método exato para dominar o ecossistema FlowPro e faturar alto com IA.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* PLAYER PRINCIPAL */}
              <div className="lg:col-span-8 space-y-6">
                <div className="aspect-video w-full bg-black rounded-[2rem] border border-white/10 overflow-hidden shadow-2xl relative">
                  <iframe
                    src={`https://www.youtube.com/embed/${activeVideo.id}?autoplay=0&rel=0&modestbranding=1`}
                    title={activeVideo.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  />
                </div>
                
                <div className="p-8 bg-white/[0.02] border border-white/5 rounded-[2rem] space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-black italic uppercase text-white">{activeVideo.title}</h3>
                    <Badge variant="outline" className="border-white/10 text-[10px] text-white/40 gap-1">
                      <Clock className="h-3 w-3" /> {activeVideo.duration}
                    </Badge>
                  </div>
                  <p className="text-sm text-white/60 leading-relaxed font-medium">
                    {activeVideo.desc}
                  </p>
                  <div className="pt-4 flex flex-wrap gap-3">
                    <div className="flex items-center gap-2 text-[10px] font-black uppercase text-green-500 tracking-widest bg-green-500/10 px-3 py-1.5 rounded-lg border border-green-500/20">
                      <CheckCircle2 className="h-3.5 w-3.5" /> Conteúdo Validado
                    </div>
                    <div className="flex items-center gap-2 text-[10px] font-black uppercase text-primary tracking-widest bg-primary/10 px-3 py-1.5 rounded-lg border border-primary/20">
                      <Zap className="h-3.5 w-3.5 fill-primary" /> Foco em Resultado
                    </div>
                  </div>
                </div>
              </div>

              {/* LISTA DE AULAS */}
              <div className="lg:col-span-4 space-y-6">
                <div className="space-y-4">
                  <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 ml-2">Conteúdo do Treinamento</h4>
                  <div className="grid gap-3">
                    {VIDEOS.map((video) => (
                      <button
                        key={video.id}
                        onClick={() => setActiveVideo(video)}
                        className={cn(
                          "w-full text-left p-5 rounded-2xl border transition-all duration-300 group flex items-start gap-4",
                          activeVideo.id === video.id 
                            ? "bg-primary/20 border-primary text-white shadow-lg shadow-primary/10" 
                            : "bg-white/[0.02] border-white/5 text-white/40 hover:bg-white/[0.05]"
                        )}
                      >
                        <div className={cn(
                          "h-10 w-10 rounded-xl flex items-center justify-center shrink-0 transition-colors",
                          activeVideo.id === video.id ? "bg-primary text-white" : "bg-white/5 text-white/20 group-hover:text-primary"
                        )}>
                          {activeVideo.id === video.id ? <Play className="h-4 w-4 fill-white" /> : video.icon}
                        </div>
                        <div className="space-y-1">
                          <p className="text-[11px] font-black uppercase leading-tight">{video.title}</p>
                          <p className="text-[9px] font-bold opacity-50 uppercase tracking-widest">{video.duration} de aula</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <Card className="glass-card border-primary/20 bg-primary/5 p-6 rounded-[2rem] space-y-4">
                  <div className="h-10 w-10 rounded-xl bg-primary flex items-center justify-center">
                    <Zap className="h-5 w-5 text-white fill-white" />
                  </div>
                  <div className="space-y-1">
                    <h5 className="text-sm font-bold uppercase italic">Ação Imediata</h5>
                    <p className="text-[10px] text-white/50 leading-relaxed font-medium">
                      Assista e aplique simultaneamente. O conhecimento sem execução é apenas entretenimento. Use o Radar após o Módulo 1.
                    </p>
                  </div>
                  <Button asChild className="w-full h-11 bg-white text-black hover:bg-primary hover:text-white rounded-xl font-black uppercase tracking-widest text-[10px]">
                    <Link href="/leads">ABRIR RADAR AGORA</Link>
                  </Button>
                </Card>
              </div>

            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
