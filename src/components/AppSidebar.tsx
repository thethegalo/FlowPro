
"use client";

import * as React from "react";
import { 
  LayoutDashboard, 
  Search, 
  FileText, 
  MessageSquare, 
  User, 
  Shield, 
  LogOut,
  ChevronRight,
  Wrench,
  Target,
  Sparkles,
  Terminal,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useUser, useAuth } from "@/firebase";
import { signOut } from "firebase/auth";
import Image from "next/image";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
} from "@/components/ui/sidebar";

const LOGO_URL = "https://s3.typebot.io/public/workspaces/cmml2oniw000g04l7gwmqelu1/typebots/cmn1vyjog000104la10d6sdzu/blocks/ywpf1hja4q4bxg9gzqobiz93?v=1774307470623";
const LOGO_ICON = "https://s3.typebot.io/public/workspaces/cmml2oniw000g04l7gwmqelu1/typebots/cmn1vyjog000104la10d6sdzu/blocks/d5tqr6czngeukjb8r6whrs5s?v=1774318273085";
const ADMIN_EMAIL = "thethegalo@gmail.com";

export function AppSidebar() {
  const { user } = useUser();
  const auth = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const handleSignOut = () => {
    signOut(auth).then(() => router.push('/'));
  };

  const menuItems = [
    { title: "Dashboard", icon: LayoutDashboard, url: "/dashboard" },
    { title: "Jornada 7 Dias", icon: () => <div className="relative h-5 w-5"><Image src={LOGO_ICON} alt="Icon" fill className="object-contain" /></div>, url: "/dashboard" },
    { title: "Captar Leads", icon: Search, url: "/leads" },
    { title: "Gerador Prompts", icon: Terminal, url: "/prompts" },
    { title: "IAs Recomendadas", icon: Sparkles, url: "/ai-tools" },
    { title: "Ferramentas", icon: Wrench, url: "/tools" },
    { title: "Simulador IA", icon: Target, url: "/simulator" },
    { title: "Biblioteca", icon: FileText, url: "/resources" },
    { title: "IA Mentor", icon: MessageSquare, url: "/mentor" },
  ];

  const isAdmin = user?.email === ADMIN_EMAIL;

  return (
    <Sidebar className="border-r border-white/5 bg-[#050508]">
      <SidebarHeader className="p-6">
        <Link href="/dashboard" className="flex items-center group">
          <div className="relative h-8 w-24 grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:drop-shadow-[0_0_8px_rgba(139,92,246,0.6)]">
            <Image 
              src={LOGO_URL} 
              alt="FlowPro Logo" 
              fill 
              className="object-contain"
            />
          </div>
        </Link>
      </SidebarHeader>

      <SidebarContent className="px-4">
        <SidebarGroup>
          <SidebarGroupLabel className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-4">Navegação Flow</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={pathname === item.url}
                    className={`h-12 rounded-xl transition-all ${pathname === item.url ? 'bg-primary/10 text-primary border border-primary/20' : 'hover:bg-white/5'}`}
                  >
                    <Link href={item.url} className="flex items-center gap-3">
                      {typeof item.icon === 'function' ? <item.icon /> : <item.icon className={`h-5 w-5 ${pathname === item.url ? 'text-primary' : 'text-muted-foreground'}`} />}
                      <span className="text-xs font-bold uppercase tracking-widest">{item.title}</span>
                      {pathname === item.url && <ChevronRight className="ml-auto h-4 w-4 text-primary" />}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {isAdmin && (
          <SidebarGroup className="mt-4">
            <SidebarGroupLabel className="text-[10px] font-black uppercase tracking-[0.2em] text-primary/60 mb-4">Controle Mestre</SidebarGroupLabel>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  asChild 
                  isActive={pathname === "/admin"}
                  className={`h-12 rounded-xl border border-primary/20 bg-primary/5 hover:bg-primary/10 transition-all`}
                >
                  <Link href="/admin" className="flex items-center gap-3 text-primary">
                    <Shield className="h-5 w-5" />
                    <span className="text-xs font-black uppercase tracking-widest">Painel Admin</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>
        )}
      </SidebarContent>

      <SidebarFooter className="p-6">
        <div className="bg-white/5 rounded-2xl p-4 space-y-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-black italic">
              {user?.email?.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="text-[10px] font-black uppercase truncate text-white">
                {user?.displayName || "Guerreiro Flow"}
              </p>
              <p className="text-[8px] font-bold uppercase text-muted-foreground truncate">
                {user?.email}
              </p>
            </div>
          </div>
          <SidebarSeparator className="bg-white/10" />
          <button 
            onClick={handleSignOut}
            className="flex items-center gap-2 w-full text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-destructive transition-colors group"
          >
            <LogOut className="h-4 w-4 group-hover:scale-110 transition-transform" />
            Sair da Conta
          </button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
