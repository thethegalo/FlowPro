import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  CheckCircle2, 
  Circle, 
  Flame, 
  MessageSquare, 
  BookOpen, 
  TrendingUp,
  ChevronRight,
  Zap
} from 'lucide-react';

export default function Dashboard() {
  const currentMissions = [
    { id: 1, title: 'Refine Your Offer', status: 'completed', category: 'Strategy' },
    { id: 2, title: 'Reach Out to 5 Leads', status: 'pending', category: 'Sales' },
    { id: 3, title: 'Optimize LinkedIn Profile', status: 'pending', category: 'Branding' },
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b bg-white/80 backdrop-blur-md">
        <div className="container flex h-16 items-center justify-between px-4 sm:px-6">
          <Link href="/dashboard" className="flex items-center gap-2">
            <Zap className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold tracking-tight">FlowPro</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/dashboard" className="text-sm font-semibold text-primary">Dashboard</Link>
            <Link href="/missions" className="text-sm font-medium hover:text-primary">Missions</Link>
            <Link href="/mentor" className="text-sm font-medium hover:text-primary">AI Mentor</Link>
            <Link href="/resources" className="text-sm font-medium hover:text-primary">Resources</Link>
          </nav>
          <div className="flex items-center gap-4">
            <Badge variant="secondary" className="bg-accent/10 text-accent gap-1">
              <Flame className="h-3 w-3" /> 5 Day Streak
            </Badge>
            <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
              <span className="text-xs font-bold text-primary">JD</span>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 p-4 md:p-8 space-y-8 container mx-auto max-w-7xl">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold font-headline">Welcome back, John</h1>
          <p className="text-muted-foreground">You are 4 tasks away from completing your weekly goal.</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Missions</CardTitle>
              <CheckCircle2 className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12 / 48</div>
              <Progress value={25} className="h-1 mt-2" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Client Outreach</CardTitle>
              <Users className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">142</div>
              <div className="text-xs text-accent font-semibold flex items-center gap-1 mt-1">
                <TrendingUp className="h-3 w-3" /> +12% from last week
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Active Deals</CardTitle>
              <Target className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="text-xs text-muted-foreground mt-1">Across 3 industries</p>
            </CardContent>
          </Card>
          <Card className="bg-primary text-primary-foreground">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 text-primary-foreground">
              <CardTitle className="text-sm font-medium">Daily Streak</CardTitle>
              <Flame className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5 Days</div>
              <p className="text-xs opacity-80 mt-1">Keep it up, you're on fire!</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-7">
          <Card className="md:col-span-4">
            <CardHeader>
              <CardTitle>Daily Missions</CardTitle>
              <CardDescription>Step-by-step tasks for today's execution.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {currentMissions.map((mission) => (
                <div key={mission.id} className="flex items-center justify-between p-4 rounded-xl border bg-card hover:bg-accent/5 transition-colors group cursor-pointer">
                  <div className="flex items-center gap-3">
                    {mission.status === 'completed' ? (
                      <CheckCircle2 className="h-5 w-5 text-accent" />
                    ) : (
                      <Circle className="h-5 w-5 text-muted-foreground group-hover:text-primary" />
                    )}
                    <div>
                      <h4 className={`font-semibold ${mission.status === 'completed' ? 'line-through text-muted-foreground' : ''}`}>
                        {mission.title}
                      </h4>
                      <p className="text-xs text-muted-foreground uppercase tracking-wider font-bold">{mission.category}</p>
                    </div>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-transform group-hover:translate-x-1" />
                </div>
              ))}
              <Button asChild variant="outline" className="w-full mt-4">
                <Link href="/missions">View All Missions</Link>
              </Button>
            </CardContent>
          </Card>

          <div className="md:col-span-3 space-y-6">
            <Card className="bg-accent/5 border-accent/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-accent" />
                  AI Action Plan
                </CardTitle>
                <CardDescription>Generated based on your profile.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4 italic">
                  "Focus on LinkedIn outreach targeting SaaS founders in Austin this week. Your unique angle: Efficiency over cost."
                </p>
                <Button size="sm" variant="accent" className="w-full">
                  Read Full Plan
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Links</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-4">
                <Button variant="outline" className="h-20 flex flex-col gap-1 items-center justify-center" asChild>
                  <Link href="/mentor">
                    <MessageSquare className="h-5 w-5 text-primary" />
                    <span>AI Mentor</span>
                  </Link>
                </Button>
                <Button variant="outline" className="h-20 flex flex-col gap-1 items-center justify-center" asChild>
                  <Link href="/resources">
                    <BookOpen className="h-5 w-5 text-accent" />
                    <span>Scripts</span>
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}