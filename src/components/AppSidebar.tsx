"use client";

import * as React from "react";
import { 
  LayoutDashboard, 
  Search, 
  MessageSquare, 
  User, 
  Shield, 
  LogOut,
  ChevronRight,
  Wrench,
  Target,
  Sparkles,
  Terminal,
  Trophy,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useUser, useAuth, useFirestore, useMemoFirebase, useDoc } from "@/firebase";
import { signOut } from "firebase/auth";
import Image from "next/image";
import { doc } from "firebase/firestore";

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
  const db = useFirestore();
  const router = useRouter();
  const pathname = usePathname();

  const isAdmin = React.useMemo(() => user?.email === ADMIN_EMAIL, [user]);

  const userDocRef = useMemoFirebase(() => {
    if (!db || !user) return null;
    return doc(db, 'users', user.uid);
  }, [db, user]);
  const { data: userData } = useDoc(userDocRef);

  const formattedName = React.useMemo(() => {
    if (isAdmin) return 'Lucas';
    if (userData?.name) return userData.name;
    if (user?.displayName) return user.displayName;
    if (user?.email) return user.email.split('@')[0];
    return 'Usuário';
  }, [userData?.name, user?.displayName, user?.email, isAdmin]);

  const handleSignOut = () => {
    signOut(auth).then(() => router.push('/'));
  };

  const menuItems = [
    { title: "Dashboard", icon: LayoutDashboard, url: "/dashboard" },
    { title: "Jornada 7 Dias", icon: () => <div className="relative h-5 w-5 animate-bounce group-hover:scale-110 transition-transform"><Image src={LOGO_ICON} alt="Icon" fill className="object-contain" /></div>, url: "/dashboard" },
    { title: "Ranking Vendedores", icon: Trophy, url: "/vendedores" },
    { title: "Captar Leads", icon: Search, url: "/leads" },
    { title: "Scripts WhatsApp", icon: MessageSquare, url: "/abordagens" },
    { title: "Gerador Prompts", icon: Terminal, url: "/prompts" },
    { title: "Ferramentas", icon: Wrench, url: "/tools" },
  ];

  const isApproved = userData?.status === 'approved' || isAdmin;

  return (
    <Sidebar className="border-r border-white/5 bg-[#050508] transition-all duration-500 animate-in slide-in-from-left-full">
      <SidebarHeader className="p-6">
        <Link href="/dashboard" className="flex items-center group">
          <div className="relative h-10 w-32 transition-all duration-500 group-hover:drop-shadow-[0_0_12px_rgba(139,92,246,0.8)]">
            <Image 
              src={LOGO_URL} 
              alt="FlowPro Logo" 
              fill 
              className="object-contain filter-none"
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
                    disabled={!isApproved}
                    className={`h-12 rounded-xl transition-all group duration-300 ${!isApproved ? 'opacity-30' : ''} ${pathname === item.url ? 'bg-primary/20 text-primary border border-primary/30 shadow-[0_0_15px_rgba(124,58,255,0.1)]' : 'hover:bg-primary/10 hover:text-white border border-transparent hover:border-primary/20'}`}
                  >
                    <Link href={isApproved ? item.url : "#"} className="flex items-center gap-3">
                      {typeof item.icon === 'function' ? <item.icon /> : <item.icon className={`h-5 w-5 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3 ${pathname === item.url ? 'text-primary' : 'text-muted-foreground'}`} />}
                      <span className="text-[11px] font-bold uppercase tracking-widest whitespace-nowrap">{item.title}</span>
                      {pathname === item.url && <ChevronRight className="ml-auto h-4 w-4 text-primary animate-pulse" />}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {isAdmin && (
          <SidebarGroup className="mt-4">
            <div className="sidebar-separator-gradient mb-4" />
            <SidebarGroupLabel className="text-[10px] font-black uppercase tracking-[0.2em] text-primary/60 mb-4">Controle Mestre</SidebarGroupLabel>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  asChild 
                  isActive={pathname === "/admin"}
                  className={`h-12 rounded-xl border border-primary/20 bg-primary/5 hover:bg-primary/15 transition-all shadow-[0_0_20px_rgba(124,58,255,0.05)]`}
                >
                  <Link href="/admin" className="flex items-center gap-3 text-primary">
                    <Shield className="h-5 w-5 animate-pulse" />
                    <span className="text-[11px] font-black uppercase tracking-widest">Painel Admin</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>
        )}
      </SidebarContent>

      <SidebarFooter className="p-6">
        <div className="bg-white/5 rounded-2xl p-4 space-y-4 border border-white/10 relative overflow-hidden group">
          <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="flex items-center gap-3 relative z-10">
            <div className="relative">
              <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-black italic border border-primary/30">
                {formattedName.charAt(0).toUpperCase()}
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-green-500 border-2 border-[#050508]">
                <div className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-75" />
              </div>
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="text-[10px] font-black uppercase truncate text-white">
                {formattedName}
              </p>
              <p className="text-[8px] font-bold uppercase text-muted-foreground truncate">
                PLANO: {isAdmin ? 'VITALÍCIO' : (userData?.plan ? (userData.plan.toUpperCase() === 'NENHUM' ? 'BLOQUEADO' : userData.plan.toUpperCase()) : 'BUSCANDO...')}
              </p>
            </div>
          </div>
          <div className="sidebar-separator-gradient" />
          <button 
            onClick={handleSignOut}
            className="flex items-center gap-2 w-full text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-destructive transition-all duration-300 group/logout"
          >
            <LogOut className="h-4 w-4 group-hover/logout:-translate-x-1 transition-transform" />
            Sair da Conta
          </button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
