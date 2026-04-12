
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
import { cn } from "@/lib/utils";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
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
    { title: "Ranking Vendedores", icon: Trophy, url: "/vendedores" },
    { title: "Captar Leads", icon: Search, url: "/leads" },
    { title: "Scripts WhatsApp", icon: MessageSquare, url: "/abordagens" },
    { title: "Gerador Prompts", icon: Terminal, url: "/prompts" },
    { title: "Ferramentas", icon: Wrench, url: "/tools" },
  ];

  const isApproved = userData?.status === 'approved' || isAdmin;

  return (
    <Sidebar className="border-r border-[#8b5cf6]/15 bg-white/[0.03] backdrop-blur-[20px] transition-all duration-500 relative overflow-hidden before:absolute before:top-0 before:left-0 before:right-0 before:h-[1px] before:bg-gradient-to-r before:from-transparent before:via-[#7c3aed]/30 before:to-transparent">
      <SidebarHeader className="p-6">
        <Link href="/dashboard" className="flex items-center gap-3 group">
          <div className="relative h-8 w-8 bg-gradient-to-br from-[#7c3aed] to-[#a855f7] rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(124,58,237,0.4)]">
            <Image 
              src={LOGO_ICON} 
              alt="Icon" 
              width={18} 
              height={18}
              className="object-contain filter brightness-0 invert"
            />
          </div>
          <span className="text-white font-bold text-lg tracking-tight uppercase italic">FlowPro</span>
        </Link>
        <div className="h-px w-full bg-white/5 mt-4" />
      </SidebarHeader>

      <SidebarContent className="px-2">
        <SidebarGroup>
          <SidebarGroupLabel className="text-[9px] font-black uppercase tracking-[0.2em] text-white/30 px-4 mb-2">Sistema de Operação</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => {
                const isActive = pathname === item.url;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton 
                      asChild 
                      isActive={isActive}
                      disabled={!isApproved}
                      className={cn(
                        "h-11 rounded-none px-4 transition-all duration-150 group",
                        !isApproved ? 'opacity-20 pointer-events-none' : '',
                        isActive 
                          ? 'bg-[#a855f7]/10 text-white border-l-2 border-[#a855f7]' 
                          : 'text-white/60 hover:bg-[#a855f7]/[0.07] border-l-2 border-transparent'
                      )}
                    >
                      <Link href={isApproved ? item.url : "#"} className="flex items-center gap-3">
                        <item.icon className={cn(
                          "h-4 w-4 transition-colors duration-300",
                          isActive ? 'text-[#c084fc]' : 'text-white/40 group-hover:text-white/70'
                        )} />
                        <span className="text-[11px] font-bold uppercase tracking-widest">{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {isAdmin && (
          <SidebarGroup className="mt-4">
            <SidebarGroupLabel className="text-[9px] font-black uppercase tracking-[0.2em] text-[#7c3aed]/60 px-4 mb-2">Controle Mestre</SidebarGroupLabel>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  asChild 
                  isActive={pathname === "/admin"}
                  className={cn(
                    "h-11 rounded-none px-4 transition-all group",
                    pathname === "/admin"
                      ? 'bg-[#7c3aed]/10 text-white border-l-2 border-[#7c3aed]'
                      : 'text-white/60 hover:bg-[#7c3aed]/[0.07] border-l-2 border-transparent'
                  )}
                >
                  <Link href="/admin" className="flex items-center gap-3">
                    <Shield className={cn("h-4 w-4", pathname === "/admin" ? "text-[#7c3aed]" : "text-white/40")} />
                    <span className="text-[11px] font-black uppercase tracking-widest">Painel Admin</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>
        )}
      </SidebarContent>

      <SidebarFooter className="p-4 mt-auto">
        <div className="bg-white/5 rounded-2xl p-4 space-y-4 border border-white/10 relative overflow-hidden group/footer">
          <div className="absolute inset-0 bg-gradient-to-br from-[#7c3aed]/10 to-transparent opacity-0 group-hover/footer:opacity-100 transition-opacity duration-500" />
          
          <div className="flex items-center gap-3 relative z-10">
            <div className="relative">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[#7c3aed] to-[#4c1d95] flex items-center justify-center text-white font-black italic shadow-lg">
                {formattedName.charAt(0).toUpperCase()}
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-[#22c55e] border-2 border-[#05050f]">
                <div className="absolute inset-0 rounded-full bg-[#22c55e] animate-pulse" />
              </div>
            </div>
            
            <div className="flex-1 overflow-hidden">
              <p className="text-[11px] font-black uppercase truncate text-white leading-none mb-1">
                {formattedName}
              </p>
              <div className="flex items-center gap-1.5">
                <div className="h-1 w-1 rounded-full bg-[#22c55e] animate-pulse" />
                <span className="text-[8px] font-black uppercase text-[#22c55e] tracking-widest">
                  {isAdmin ? 'VITALÍCIO' : (userData?.plan?.toUpperCase() || 'BUSCANDO...')}
                </span>
              </div>
            </div>
          </div>

          <div className="h-px w-full bg-white/5" />
          
          <button 
            onClick={handleSignOut}
            className="flex items-center gap-2 w-full text-[10px] font-black uppercase tracking-widest text-white/40 hover:text-red-400 transition-all duration-300 group/logout relative z-10"
          >
            <LogOut className="h-3.5 w-3.5 group-hover/logout:-translate-x-1 transition-transform" />
            Sair da Conta
          </button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
