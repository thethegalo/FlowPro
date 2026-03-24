
"use client";

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Zap, Send, User, Bot, ArrowLeft, Loader2, AlertCircle } from 'lucide-react';
import { salesMentorChat } from '@/ai/flows/sales-mentor-chatbot';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from '@/components/AppSidebar';
import { useUser, useFirestore, useDoc, useMemoFirebase } from '@/firebase';
import { doc, updateDoc, increment, serverTimestamp } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

const ADMIN_EMAIL = "thethegalo@gmail.com";

export default function MentorPage() {
  const { user } = useUser();
  const db = useFirestore();
  const { toast } = useToast();
  
  const userDocRef = useMemoFirebase(() => {
    if (!db || !user) return null;
    return doc(db, 'users', user.uid);
  }, [db, user]);
  const { data: userData } = useDoc(userDocRef);

  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: "Olá! Sou seu Mentor de Vendas Flow. Como posso te ajudar a fechar mais vendas hoje?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const isUnlimited = user?.email === ADMIN_EMAIL || userData?.plan === 'vitalicio';

  const checkLimitAndTrack = async () => {
    if (!db || !user || !userData) return true;
    if (isUnlimited) return true;
    if (userData.plan !== 'mensal') return true;

    const lastAction = userData.lastActionAt;
    const today = new Date().toDateString();
    const lastDate = lastAction ? (lastAction.toDate ? lastAction.toDate().toDateString() : new Date(lastAction).toDateString()) : '';
    
    const isNewDay = today !== lastDate;
    const currentUsage = isNewDay ? 0 : (userData.dailyUsage?.messagesUsed || 0);

    if (currentUsage >= 10) {
      toast({ 
        variant: "destructive", 
        title: "Limite Atingido", 
        description: "Você atingiu o limite diário de mensagens do plano mensal." 
      });
      return false;
    }

    try {
      const userRef = doc(db, 'users', user.uid);
      const updates: any = {
        lastActionAt: serverTimestamp(),
        'dailyUsage.messagesUsed': isNewDay ? 1 : increment(1),
      };
      
      if (isNewDay) {
        updates['dailyUsage.leadsUsed'] = 0;
      }

      await updateDoc(userRef, updates);
      return true;
    } catch (e) {
      return true;
    }
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const canProceed = await checkLimitAndTrack();
    if (!canProceed) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);
    try {
      const response = await salesMentorChat({ question: userMessage });
      setMessages(prev => [...prev, { role: 'assistant', content: response.advice }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: "Desculpe, tive um problema na conexão neural. Tente novamente." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const messagesRemaining = useMemo(() => {
    if (isUnlimited || userData?.plan !== 'mensal') return null;
    const lastAction = userData.lastActionAt;
    const today = new Date().toDateString();
    const lastDate = lastAction ? (lastAction.toDate ? lastAction.toDate().toDateString() : new Date(lastAction).toDateString()) : '';
    const used = today === lastDate ? (userData.dailyUsage?.messagesUsed || 0) : 0;
    return Math.max(0, 10 - used);
  }, [userData, isUnlimited]);

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-[#050508]">
        <AppSidebar />
        
        <main className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
          <header className="h-16 border-b border-white/5 flex items-center justify-between px-6 bg-[#050508]/80 backdrop-blur-md shrink-0">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="text-muted-foreground hover:text-white" />
              <div className="h-4 w-px bg-white/10 hidden md:block" />
              <h1 className="text-sm font-black italic uppercase tracking-widest flex items-center gap-2">
                <Bot className="h-4 w-4 text-primary" /> IA Sales Mentor
              </h1>
            </div>
            {messagesRemaining !== null && (
              <Badge variant="outline" className="text-[8px] font-black uppercase border-white/10">
                {messagesRemaining} Mensagens hoje
              </Badge>
            )}
          </header>

          <div className="flex-1 flex flex-col container max-w-4xl mx-auto p-4 md:p-6 overflow-hidden">
            <Card className="flex-1 flex flex-col overflow-hidden glass-card border-white/5 rounded-[2rem]">
              <ScrollArea className="flex-1 p-6">
                <div className="space-y-6">
                  {messages.map((m, i) => (
                    <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`flex gap-4 max-w-[85%] ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
                        <div className={`h-10 w-10 rounded-2xl shrink-0 flex items-center justify-center ${m.role === 'user' ? 'bg-accent text-white shadow-lg shadow-accent/20' : 'bg-primary text-white shadow-lg shadow-primary/20'}`}>
                          {m.role === 'user' ? <User className="h-5 w-5" /> : <Bot className="h-5 w-5" />}
                        </div>
                        <div className={`p-5 rounded-2xl text-sm leading-relaxed font-medium ${m.role === 'user' ? 'bg-accent/10 border border-accent/20 text-white rounded-tr-none' : 'bg-white/5 border border-white/10 text-white/90 rounded-tl-none'}`}>
                          {m.content}
                        </div>
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="flex gap-4">
                        <div className="h-10 w-10 rounded-2xl bg-primary text-white flex items-center justify-center animate-pulse">
                          <Bot className="h-5 w-5" />
                        </div>
                        <div className="bg-white/5 p-5 rounded-2xl rounded-tl-none flex items-center gap-3 border border-white/10">
                          <Loader2 className="h-4 w-4 animate-spin text-primary" />
                          <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Neural Engine Pensando...</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>
              
              <div className="p-6 border-t border-white/5 bg-white/[0.02]">
                {messagesRemaining === 0 && !isUnlimited && (
                  <div className="mb-4 p-3 rounded-xl bg-destructive/10 border border-destructive/20 flex items-center gap-3 text-destructive text-[10px] font-black uppercase tracking-widest">
                    <AlertCircle className="h-4 w-4" /> Limite diário atingido. Faça upgrade para o Vitalício.
                  </div>
                )}
                <div className="flex gap-3">
                  <Input 
                    placeholder="Pergunte sobre abordagens, fechamento ou scripts..." 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    disabled={messagesRemaining === 0 && !isUnlimited}
                    className="flex-1 bg-white/5 border-white/10 h-14 rounded-2xl focus-visible:ring-primary font-medium"
                  />
                  <Button onClick={handleSend} disabled={isLoading || (messagesRemaining === 0 && !isUnlimited)} className="h-14 w-14 rounded-2xl bg-primary shadow-xl shadow-primary/30">
                    <Send className="h-5 w-5" />
                  </Button>
                </div>
                <p className="text-[8px] text-center mt-4 text-muted-foreground uppercase font-black tracking-[0.3em]">
                  Powered by FlowPro Neural Engine v2.0
                </p>
              </div>
            </Card>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
