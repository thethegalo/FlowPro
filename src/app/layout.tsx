import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { FirebaseClientProvider } from '@/firebase';
import { CustomCursor } from '@/components/CustomCursor';
import { FloatingMentor } from '@/components/FloatingMentor';
import { AnimatedBackground } from '@/components/AnimatedBackground';

export const metadata: Metadata = {
  title: 'FlowPro | AI Sales Companion',
  description: 'Transform your sales process with AI-powered action plans, daily missions, and expert mentorship.',
  icons: {
    icon: 'https://s3.typebot.io/public/workspaces/cmml2oniw000g04l7gwmqelu1/typebots/cmn1vyjog000104la10d6sdzu/blocks/d5tqr6czngeukjb8r6whrs5s?v=1774318273085',
    shortcut: 'https://s3.typebot.io/public/workspaces/cmml2oniw000g04l7gwmqelu1/typebots/cmn1vyjog000104la10d6sdzu/blocks/d5tqr6czngeukjb8r6whrs5s?v=1774318273085',
    apple: 'https://s3.typebot.io/public/workspaces/cmml2oniw000g04l7gwmqelu1/typebots/cmn1vyjog000104la10d6sdzu/blocks/d5tqr6czngeukjb8r6whrs5s?v=1774318273085',
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=JetBrains+Mono:wght@300;400;500;600&family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased min-h-screen bg-[#05050f]">
        <FirebaseClientProvider>
          <AnimatedBackground />
          <div className="relative z-10 flex flex-col min-h-screen">
            <CustomCursor />
            {children}
            <FloatingMentor />
            <Toaster />
          </div>
        </FirebaseClientProvider>
      </body>
    </html>
  );
}
