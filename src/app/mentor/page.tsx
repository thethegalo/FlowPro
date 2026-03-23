"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Zap, Send, User, Bot, ArrowLeft, Loader2 } from 'lucide-react';
import { salesMentorChat } from '@/ai/flows/sales-mentor-chatbot';

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

export default function MentorPage() {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: "Hello! I'm your AI Sales Mentor. How can I help you crush your sales targets today?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await salesMentorChat({ question: userMessage });
      setMessages(prev => [...prev, { role: 'assistant', content: response.advice }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: "I'm sorry, I'm having trouble connecting to my brain right now. Please try again later." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      <header className="px-4 h-16 flex items-center border-b bg-white">
        <Link href="/dashboard" className="mr-4 text-muted-foreground hover:text-primary transition-colors">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div className="flex items-center gap-2">
          <Bot className="h-5 w-5 text-primary" />
          <h1 className="text-xl font-bold">AI Sales Mentor</h1>
        </div>
      </header>

      <main className="flex-1 flex flex-col container max-w-4xl mx-auto p-4 md:p-6 overflow-hidden">
        <Card className="flex-1 flex flex-col overflow-hidden shadow-xl border-none">
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`flex gap-3 max-w-[85%] ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
                    <div className={`h-8 w-8 rounded-full shrink-0 flex items-center justify-center ${m.role === 'user' ? 'bg-accent text-white' : 'bg-primary text-white'}`}>
                      {m.role === 'user' ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                    </div>
                    <div className={`p-4 rounded-2xl shadow-sm text-sm leading-relaxed ${m.role === 'user' ? 'bg-accent text-white rounded-tr-none' : 'bg-secondary/50 text-foreground rounded-tl-none'}`}>
                      {m.content}
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex gap-3">
                    <div className="h-8 w-8 rounded-full bg-primary text-white flex items-center justify-center animate-pulse">
                      <Bot className="h-4 w-4" />
                    </div>
                    <div className="bg-secondary/50 p-4 rounded-2xl rounded-tl-none flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin text-primary" />
                      <span className="text-xs font-medium text-muted-foreground">Thinking...</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>
          
          <div className="p-4 border-t bg-white">
            <div className="flex gap-2">
              <Input 
                placeholder="Ask me anything about sales strategy, closing, or outreach..." 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                className="flex-1 bg-secondary/20 border-none h-12 rounded-xl focus-visible:ring-primary"
              />
              <Button onClick={handleSend} disabled={isLoading} size="icon" className="h-12 w-12 rounded-xl shadow-lg hover:shadow-primary/20 transition-all">
                <Send className="h-5 w-5" />
              </Button>
            </div>
            <p className="text-[10px] text-center mt-3 text-muted-foreground">
              Powered by FlowPro AI Mentor Engine
            </p>
          </div>
        </Card>
      </main>
    </div>
  );
}