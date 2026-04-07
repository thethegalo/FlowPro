
"use client";

import { useState, useMemo, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { 
  Send, 
  Bot, 
  Loader2, 
  X, 
  Minus,
  Sparkles
} from 'lucide-react';
import { salesMentorChat } from '@/ai/flows/sales-mentor-chatbot';
import { useUser, useFirestore, useDoc, useMemoFirebase } from '@/firebase';
import { doc, updateDoc, increment, serverTimestamp } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';
import { usePathname } from 'next/navigation';

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

const ADMIN_EMAIL = "thethegalo@gmail.com";

export function FloatingMentor() {
  const { user } = useUser();
  const db = useFirestore();
  const { toast } = useToast();
  const pathname = usePathname();
  
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: "Olá! Sou seu Mentor Flow. Como posso te ajudar a fechar mais vendas agora?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const userDocRef = useMemoFirebase(() => {
    if (!db || !user) return null;
    return doc(db, 'users', user.uid);
  }, [db, user]);
  const { data: userData } = useDoc(userDocRef);

  const isUnlimited = useMemo(() => {
    return user?.email === ADMIN_EMAIL || userData?.plan === 'vitalicio';
  }, [user, userData]);

  const messagesRemaining = useMemo(() => {
    if (isUnlimited) return null;
    const lastAction = userData?.lastActionAt;
    const today = new Date().toDateString();
    const lastDate = lastAction ? (lastAction.toDate ? lastAction.toDate().toDateString() : new Date(lastAction).toDateString()) : '';
    const used = today === lastDate ? (userData?.dailyUsage?.messagesUsed || 0) : 0;
    return Math.max(0, 10 - used);
  }, [userData, isUnlimited]);

  if (['/', '/auth', '/quiz'].includes(pathname)) return null;

  const checkLimitAndTrack = async () => {
    if (!db || !user || !userData) return false;
    if (isUnlimited) return true;

    if (userData.plan === 'nenhum') {
      toast({ variant: "destructive", title: "Acesso Restrito", description: "Assine um plano para liberar o Mentor." });
      return false;
    }

    const lastAction = userData.lastActionAt;
    const today = new Date().toDateString();
    const lastDate = lastAction ? (lastAction.toDate ? lastAction.toDate().toDateString() : new Date(lastAction).toDateString()) : '';
    const isNewDay = today !== lastDate;
    const currentUsage = isNewDay ? 0 : (userData.dailyUsage?.messagesUsed || 0);

    if (currentUsage >= 10) {
      toast({ variant: "destructive", title: "Limite Atingido", description: "Atingiu o limite diário de mensagens." });
      return false;
    }

    try {
      await updateDoc(doc(db, 'users', user.uid), {
        lastActionAt: serverTimestamp(),
        'dailyUsage.messagesUsed': isNewDay ? 1 : increment(1),
      });
      return true;
    } catch (e) {
      return true;
    }
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    
    const userMessage = input.trim();
    const canProceed = await checkLimitAndTrack();
    if (!canProceed) return;

    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);
    
    try {
      const response = await salesMentorChat({ question: userMessage });
      if (response && response.advice) {
        setMessages(prev => [...prev, { role: 'assistant', content: response.advice }]);
      } else {
        throw new Error('Resposta vazia');
      }
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: "Erro na conexão neural. Tente novamente em alguns instantes." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end gap-4">
      {isOpen && (
        <Card className="w-[320px] sm:w-[400px] h-[500px] flex flex-col overflow-hidden glass-card border-primary/30 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)] animate-in slide-in-from-bottom-10">
          <div className="bg-primary/10 border-b border-white/5 p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <Bot className="h-5 w-5 text-white" />
              </div>
              <div>
                <h4 className="text-[10px] font-black uppercase tracking-widest text-white italic">Sales Mentor IA</h4>
                {messagesRemaining !== null ? (
                  <p className="text-[8px] font-bold text-muted-foreground uppercase">{messagesRemaining} envios restantes</p>
                ) : (
                  <p className="text-[8px] font-bold text-purple-400 uppercase">Acesso Vitalício Ativo</p>
                )}
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="h-8 w-8 rounded-full hover:bg-white/5">
              <Minus className="h-4 w-4" />
            </Button>
          </div>

          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-3 rounded-2xl text-[11px] leading-relaxed font-medium ${
                    m.role === 'user' 
                    ? 'bg-primary text-white rounded-tr-none' 
                    : 'bg-white/5 border border-white/10 text-white/90 rounded-tl-none'
                  }`}>
                    {m.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white/5 p-3 rounded-2xl rounded-tl-none flex items-center gap-2 border border-white/10 animate-pulse">
                    <Loader2 className="h-3 w-3 animate-spin text-primary" />
                    <span className="text-[8px] font-black uppercase tracking-widest text-muted-foreground">Neural Thinking...</span>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          <div className="p-4 border-t border-white/5 bg-white/[0.02]">
            <div className="flex gap-2">
              <Input 
                placeholder="Como fechar essa venda?" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                disabled={isLoading}
                className="flex-1 bg-white/5 border-white/10 h-10 rounded-xl text-xs focus-visible:ring-primary"
              />
              <Button onClick={handleSend} disabled={isLoading || (messagesRemaining === 0 && !isUnlimited)} size="icon" className="h-10 w-10 rounded-xl bg-primary">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`h-16 w-16 rounded-full bg-primary flex items-center justify-center shadow-[0_0_30px_rgba(124,58,255,0.5)] transition-all active:scale-95 group ${isOpen ? 'rotate-90' : 'hover:scale-110'}`}
      >
        {isOpen ? <X className="h-8 w-8 text-white" /> : <Bot className="h-8 w-8 text-white animate-pulse" />}
        {!isOpen && (
          <div className="absolute -top-1 -right-1 h-5 w-5 bg-green-500 rounded-full border-2 border-[#050508] flex items-center justify-center animate-bounce">
            <Sparkles className="h-3 w-3 text-white" />
          </div>
        )}
      </button>
    </div>
  );
}
