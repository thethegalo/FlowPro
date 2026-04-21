
"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Send, 
  Bot, 
  Loader2, 
  X, 
  Minus,
  Sparkles
} from 'lucide-react';
import { salesMentorChat } from '@/ai/flows/sales-mentor-chatbot';
import { useUser, useFirestore } from '@/firebase';
import { doc, updateDoc, increment, serverTimestamp } from 'firebase/firestore';
import { usePathname } from 'next/navigation';

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

export function FloatingMentor() {
  const { user } = useUser();
  const db = useFirestore();
  const pathname = usePathname();
  
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: "Olá! Sou seu Mentor Flow. Como posso te ajudar a fechar mais vendas agora?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    
    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);
    
    // Rastreamento de uso sem limites
    if (db && user) {
      updateDoc(doc(db, 'users', user.uid), {
        lastActionAt: serverTimestamp(),
        'dailyUsage.messagesUsed': increment(1),
      }).catch(() => {});
    }

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

  if (['/', '/auth', '/quiz'].includes(pathname)) return null;

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
                <p className="text-[8px] font-bold text-purple-400 uppercase">Acesso Ilimitado Ativo</p>
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
                    <span className="text-[8px] font-black uppercase tracking-widest text-muted-foreground">Pensando...</span>
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
              <Button onClick={handleSend} disabled={isLoading} size="icon" className="h-10 w-10 rounded-xl bg-primary">
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
