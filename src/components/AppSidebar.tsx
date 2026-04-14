
"use client";

import * as React from "react";
import { 
  LayoutDashboard, 
  Search, 
  MessageSquare, 
  Shield, 
  LogOut,
  Wrench,
  Terminal,
  Trophy,
  GitBranch,
  CreditCard,
  Lock,
  Clock
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useUser, useAuth, useFirestore, useMemoFirebase, useDoc } from "@/firebase";
import { signOut } from "firebase/auth";
import Image from "next/image";
import { doc } from "firebase/firestore";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";

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

const LOGO_ICON = "https://s3.typebot.io/public/workspaces/cmml2oniw000g04l7gwmqelu1/typebots/cmn1vyjog000104la10d6sdzu/blocks/d5tqr6czngeukjb8r6whrs5s?v=1774318273085";
const ADMIN_EMAIL = "thethegalo@gmail.com";

export function AppSidebar() {
  const { user } = useUser();
  const auth = useAuth();
  const db = useFirestore();
  const router = useRouter();
  const pathname = usePathname();
  const { warning } = useToast();

  const isAdmin = React.useMemo(() => user?.email === ADMIN_EMAIL, [user]);

  const userDocRef = useMemoFirebase(() => {
    if (!db || !user) return null;
    return doc(db, 'users', user.uid);
  }, [db, user]);
  const { data: userData } = useDoc(userDocRef);

  const isApproved = userData?.status === 'approved' || isAdmin;
  const isPending = userData?.status === 'pending' && !isAdmin;

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

  const handleLockedClick = (e: React.MouseEvent) => {
    if (!isApproved) {
      e.preventDefault();
      warning("Acesso Pendente", "Seu perfil está em análise manual. Aguarde a liberação do mestre para usar as ferramentas.");
    }
  };

  const menuItems = [
    { title: "Dashboard", icon: LayoutDashboard, url: "/dashboard" },
    { title: "Funil de Vendas", icon: GitBranch, url: "/funil" },
    { title: "Ranking Vendedores", icon: Trophy, url: "/vendedores" },
    { title: "Captar Leads", icon: Search, url: "/leads" },
    { title: "Scripts WhatsApp", icon: MessageSquare, url: "/abordagens" },
    { title: "Gerador Prompts", icon: Terminal, url: "/prompts" },
    { title: "Cartão Digital", icon: CreditCard, url: "/cartao" },
    { title: "Ferramentas", icon: Wrench, url: "/tools" },
  ];

  return (
    <Sidebar 
      style={{ "--sidebar-width": "220px" } as React.CSSProperties}
      className="border-r border-white/5 bg-transparent"
    >
      <div className="flex h-full flex-col bg-[#080814]/70 backdrop-blur-[24px]">
        <SidebarHeader className="p-4 pt-6 pb-2">
          <Link href="/dashboard" className="flex items-center gap-2 px-1">
            <div className="relative h-[22px] w-[22px] bg-gradient-to-br from-[#7c3aed] to-[#6d28d9] rounded-lg flex items-center justify-center shadow-lg">
              <Image 
                src={LOGO_ICON} 
                alt="Icon" 
                width={12} 
                height={12}
                className="object-contain filter brightness-0 invert"
              />
            </div>
            <span className="text-white font-semibold text-[14px] tracking-[-0.2px] font-headline leading-none">FlowPro</span>
          </Link>
        </SidebarHeader>

        <SidebarContent className="px-2 py-2">
          {isPending && (
            <div className="mx-4 mt-4 p-3 rounded-xl bg-destructive/10 border border-destructive/20 flex flex-col items-center text-center gap-2">
              <Lock className="h-4 w-4 text-destructive" />
              <p className="text-[9px] font-black uppercase text-destructive tracking-widest">Acesso Bloqueado</p>
              <p className="text-[8px] text-white/40 font-medium uppercase leading-tight">Aguardando liberação manual</p>
            </div>
          )}

          <SidebarGroup className="p-0 mt-[20px]">
            <SidebarGroupLabel className="text-[10px] font-medium uppercase tracking-[1.2px] text-white/25 px-4 pt-0 pb-1.5 h-auto">Sistema de Operação</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="gap-0.5">
                {menuItems.map((item) => {
                  const isActive = pathname === item.url;
                  return (
                    <SidebarMenuItem key={item.title} className="px-2">
                      <SidebarMenuButton 
                        asChild 
                        isActive={isActive}
                        className={cn(
                          "h-8 rounded-md px-3 flex items-center gap-2.5 transition-all duration-120 group border-none",
                          !isApproved ? 'opacity-25 grayscale cursor-not-allowed' : '',
                          isActive 
                            ? 'bg-[#8b5cf6]/12 text-white/90' 
                            : 'text-white/55 hover:bg-white/5 hover:text-white/75'
                        )}
                      >
                        <Link href={isApproved ? item.url : "#"} onClick={handleLockedClick}>
                          <item.icon className={cn(
                            "size-[15px] shrink-0 transition-colors duration-300",
                            isActive ? 'text-[#a78bfa]' : 'text-white/35'
                          )} />
                          <span className="text-[13px] font-[450] leading-none">{item.title}</span>
                          {!isApproved && <Lock className="ml-auto h-2.5 w-2.5 opacity-20" />}
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          {isAdmin && (
            <SidebarGroup className="p-0 mt-[20px]">
              <SidebarGroupLabel className="text-[10px] font-medium uppercase tracking-[1.2px] text-white/25 px-4 pt-0 pb-1.5 h-auto">Controle Mestre</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu className="gap-0.5">
                  <SidebarMenuItem className="px-2">
                    <SidebarMenuButton 
                      asChild 
                      isActive={pathname === "/admin"}
                      className={cn(
                        "h-8 rounded-md px-3 flex items-center gap-2.5 transition-all group border-none",
                        pathname === "/admin"
                          ? 'bg-[#8b5cf6]/12 text-white/90'
                          : 'text-white/55 hover:bg-white/5 hover:text-white/75'
                      )}
                    >
                      <Link href="/admin">
                        <Shield className={cn("size-[15px] shrink-0", pathname === "/admin" ? "text-[#a78bfa]" : "text-white/35")} />
                        <span className="text-[13px] font-[450] leading-none">Painel Admin</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          )}
        </SidebarContent>

        <SidebarFooter className="p-4 mt-auto border-t border-white/5">
          <div className="flex flex-col gap-4">
            {isPending && (
              <Badge variant="outline" className="w-fit border-amber-500/20 text-amber-500 text-[8px] font-black uppercase bg-amber-500/5 gap-1.5 px-2">
                <Clock className="h-2.5 w-2.5" /> Sob Auditoria
              </Badge>
            )}
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="h-[26px] w-[26px] rounded-full bg-[#4c1d95] flex items-center justify-center text-white text-[10px] font-bold shrink-0">
                  {formattedName.charAt(0).toUpperCase()}
                </div>
                <div className="flex flex-col min-w-0">
                  <p className="text-[12px] font-medium text-white/90 truncate leading-none mb-1">
                    {formattedName}
                  </p>
                  <span className={cn(
                    "text-[9px] font-black tracking-tight leading-none uppercase",
                    isPending ? "text-destructive" : "text-[#a78bfa]"
                  )}>
                    {isAdmin ? 'ADMIN MASTER' : isPending ? 'PENDENTE' : (userData?.plan?.toUpperCase() || 'FREE')}
                  </span>
                </div>
              </div>
              
              <button 
                onClick={handleSignOut}
                className="p-1 text-white/40 hover:text-white transition-colors ml-2"
                title="Sair"
              >
                <LogOut className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </SidebarFooter>
      </div>
    </Sidebar>
  );
}
