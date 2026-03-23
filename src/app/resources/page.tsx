"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Copy, 
  ArrowLeft, 
  BookOpen, 
  Check, 
  Search,
  Filter,
  MessageSquare,
  Zap,
  Phone,
  Mail
} from 'lucide-react';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

const SCRIPTS = {
  outreach: [
    { title: 'Cold DM - LinkedIn', content: "Hi [Name], saw your recent post about [Topic]. Found it really insightful! I noticed you're working on [Project]. We recently helped [Competitor] achieve [Result] in this area. Would love to share how we did it. Open to a 5-min chat?" },
    { title: 'The "Problem-First" Email', content: "Subject: Solving [Specific Pain Point] for [Company]\n\nHi [Name],\n\nI've been following [Company] and noticed [Specific Challenge]. Most teams handle this by [Inefficient Method], which usually costs them [Metric]. We take a different approach that [Benefit].\n\nWorth a quick look?" },
  ],
  closing: [
    { title: 'The Transition Close', content: "Based on everything we've discussed, it seems like [Solution] is the best fit for your goals. Shall we move forward with the next steps to get this implemented by [Deadline]?" },
    { title: 'Handling "It\'s too expensive"', content: "I hear you on the cost. If we look at the investment vs. the [Potential Revenue/Savings] of $[Amount] we projected, the ROI happens in [Timeframe]. Does that change how you look at the budget?" },
  ],
  followup: [
    { title: 'The "Value Add" Follow-up', content: "Hi [Name], ran across this article on [Topic] and thought of our conversation about [Pain Point]. I think page 3 specifically applies to your situation. Hope it helps!\n\nBest, [My Name]" },
  ]
};

export default function ResourcesPage() {
  const { toast } = useToast();
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    toast({
      title: "Copied!",
      description: "Script copied to clipboard.",
    });
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="px-4 h-16 flex items-center border-b bg-white sticky top-0 z-50">
        <Link href="/dashboard" className="mr-4 text-muted-foreground hover:text-primary transition-colors">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div className="flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-accent" />
          <h1 className="text-xl font-bold">Sales Library</h1>
        </div>
      </header>

      <main className="flex-1 container max-w-5xl mx-auto p-4 md:p-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold font-headline">Actionable Scripts</h2>
            <p className="text-muted-foreground">Proven templates ready for your daily missions.</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="gap-2">
              <Filter className="h-4 w-4" /> Filter
            </Button>
            <Button variant="outline" size="sm" className="gap-2">
              <Search className="h-4 w-4" /> Search
            </Button>
          </div>
        </div>

        <Tabs defaultValue="outreach" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-secondary/20 p-1 h-12">
            <TabsTrigger value="outreach" className="gap-2"><Mail className="h-4 w-4" /> Outreach</TabsTrigger>
            <TabsTrigger value="closing" className="gap-2"><Zap className="h-4 w-4" /> Closing</TabsTrigger>
            <TabsTrigger value="followup" className="gap-2"><Phone className="h-4 w-4" /> Follow-up</TabsTrigger>
          </TabsList>

          {Object.entries(SCRIPTS).map(([key, list]) => (
            <TabsContent key={key} value={key} className="mt-6 space-y-4">
              {list.map((script, idx) => (
                <Card key={idx} className="group hover:border-primary/50 transition-all shadow-sm">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <div>
                      <CardTitle className="text-lg">{script.title}</CardTitle>
                      <CardDescription>Click to copy and personalize.</CardDescription>
                    </div>
                    <Button 
                      size="sm" 
                      variant={copiedId === `${key}-${idx}` ? "accent" : "outline"}
                      onClick={() => copyToClipboard(script.content, `${key}-${idx}`)}
                      className="gap-2"
                    >
                      {copiedId === `${key}-${idx}` ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      {copiedId === `${key}-${idx}` ? "Copied" : "Copy"}
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <pre className="bg-secondary/20 p-4 rounded-xl text-sm whitespace-pre-wrap font-body text-muted-foreground leading-relaxed border border-transparent group-hover:border-primary/10 group-hover:bg-white transition-all">
                      {script.content}
                    </pre>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          ))}
        </Tabs>

        <Card className="bg-primary text-primary-foreground overflow-hidden">
          <CardContent className="p-8 flex flex-col md:flex-row items-center gap-6">
            <div className="bg-white/10 p-4 rounded-2xl">
              <MessageSquare className="h-10 w-10 text-white" />
            </div>
            <div className="space-y-2 text-center md:text-left">
              <h3 className="text-2xl font-bold">Need a custom script?</h3>
              <p className="opacity-80">Ask your AI Mentor to draft one based on a specific situation.</p>
            </div>
            <Button asChild className="ml-auto bg-white text-primary hover:bg-white/90" size="lg">
              <Link href="/mentor">Chat with Mentor</Link>
            </Button>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}