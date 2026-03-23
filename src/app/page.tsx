import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Rocket, Target, Users, Zap, CheckCircle2, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function Home() {
  const heroImage = PlaceHolderImages.find(img => img.id === 'hero-sales');

  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-16 flex items-center border-b bg-white/50 backdrop-blur-md sticky top-0 z-50">
        <Link className="flex items-center justify-center gap-2 group" href="/">
          <div className="bg-primary p-1.5 rounded-lg group-hover:scale-110 transition-transform">
            <Zap className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight">FlowPro</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6 items-center">
          <Link className="text-sm font-medium hover:text-primary transition-colors hidden sm:block" href="#features">
            Features
          </Link>
          <Link className="text-sm font-medium hover:text-primary transition-colors hidden sm:block" href="#pricing">
            Pricing
          </Link>
          <Button asChild variant="ghost" size="sm">
            <Link href="/login">Log In</Link>
          </Button>
          <Button asChild size="sm">
            <Link href="/register">Get Started</Link>
          </Button>
        </nav>
      </header>

      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-b from-white to-background">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="grid gap-6 lg:grid-cols-[1fr_500px] lg:gap-12 xl:grid-cols-[1fr_600px] items-center">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <div className="inline-block rounded-lg bg-accent/10 px-3 py-1 text-sm font-semibold text-accent mb-2">
                    Revolutionize Your Sales Workflow
                  </div>
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none font-headline">
                    Turn Conversations into <span className="text-primary">Conversions</span>
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl font-body">
                    The ultimate AI-powered sales companion. Get a personalized action plan, daily missions, and an AI mentor to crush your targets.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button asChild size="lg" className="h-12 px-8">
                    <Link href="/register">
                      Start Your Free Profile <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="h-12 px-8">
                    <Link href="#demo">View Demo</Link>
                  </Button>
                </div>
              </div>
              <div className="relative group">
                <div className="absolute -inset-4 bg-primary/20 rounded-3xl blur-2xl group-hover:bg-primary/30 transition-all duration-500"></div>
                <Image
                  src={heroImage?.imageUrl || ''}
                  alt={heroImage?.description || 'Sales Hero'}
                  width={600}
                  height={400}
                  className="mx-auto aspect-video overflow-hidden rounded-2xl object-cover object-center shadow-2xl relative"
                  data-ai-hint="sales success"
                />
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">Built for Execution</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed font-body">
                  Everything you need to stop guessing and start selling.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-6 py-12 lg:grid-cols-3">
              <Card className="border-none shadow-md bg-background/50 hover:shadow-lg transition-shadow">
                <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                  <div className="p-3 rounded-2xl bg-primary/10 text-primary">
                    <Target className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-bold">Personalized Profile</h3>
                  <p className="text-muted-foreground text-sm">A deep-dive quiz that maps your strengths and market potential.</p>
                </CardContent>
              </Card>
              <Card className="border-none shadow-md bg-background/50 hover:shadow-lg transition-shadow">
                <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                  <div className="p-3 rounded-2xl bg-accent/10 text-accent">
                    <Zap className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-bold">AI Action Plans</h3>
                  <p className="text-muted-foreground text-sm">Instant, tailored roadmaps generated by our advanced AI engines.</p>
                </CardContent>
              </Card>
              <Card className="border-none shadow-md bg-background/50 hover:shadow-lg transition-shadow">
                <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                  <div className="p-3 rounded-2xl bg-primary/10 text-primary">
                    <Rocket className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-bold">Daily Missions</h3>
                  <p className="text-muted-foreground text-sm">Step-by-step tasks designed to maintain momentum and consistency.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section id="pricing" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">Unlock Premium Performance</h2>
              <p className="max-w-[600px] text-muted-foreground md:text-xl font-body">Choose the plan that fits your growth ambitions.</p>
            </div>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mt-12">
              <Card className="relative overflow-hidden border-2 hover:border-primary/50 transition-colors">
                <CardContent className="p-8 space-y-6">
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold">Monthly Growth</h3>
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-bold">$29</span>
                      <span className="text-muted-foreground">/mo</span>
                    </div>
                  </div>
                  <ul className="space-y-3">
                    {['Unlimited AI Mentor Chat', 'Daily Mission Tracker', 'Full Script Library', 'Weekly Progress Reports'].map(feature => (
                      <li key={feature} className="flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5 text-accent" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full py-6" asChild>
                    <Link href="/register?plan=monthly">Get Started</Link>
                  </Button>
                </CardContent>
              </Card>
              <Card className="relative overflow-hidden border-2 border-primary bg-primary/5 hover:bg-primary/10 transition-colors">
                <div className="absolute top-0 right-0 bg-primary text-white px-3 py-1 text-xs font-bold rounded-bl-lg">BEST VALUE</div>
                <CardContent className="p-8 space-y-6">
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold">Lifetime Legacy</h3>
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-bold">$199</span>
                      <span className="text-muted-foreground">one-time</span>
                    </div>
                  </div>
                  <ul className="space-y-3">
                    {['Everything in Monthly', 'Exclusive Early Access', 'Legacy Badge', 'Priority AI Processing'].map(feature => (
                      <li key={feature} className="flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5 text-accent" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full py-6 bg-primary" asChild>
                    <Link href="/register?plan=lifetime">Claim Your Spot</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <footer className="w-full py-6 border-t bg-white">
        <div className="container px-4 md:px-6 mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">© 2024 FlowPro. All rights reserved.</p>
          <nav className="flex gap-4 sm:gap-6">
            <Link className="text-xs hover:underline underline-offset-4" href="#">Terms</Link>
            <Link className="text-xs hover:underline underline-offset-4" href="#">Privacy</Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}