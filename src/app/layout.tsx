import type {Metadata, Viewport} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { FirebaseClientProvider } from '@/firebase';
import { CustomCursor } from '@/components/CustomCursor';
import { FloatingMentor } from '@/components/FloatingMentor';
import { EtheralShadow } from '@/components/ui/etheral-shadow';
import { Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google';

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-plus-jakarta',
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jetbrains-mono',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: 'FlowPro — Seu Primeiro Cliente Começa com um Script',
  description: 'Encontre leads qualificados, gere scripts prontos com IA e comece a vender em até 7 dias.',
  icons: {
    icon: 'https://s3.typebot.io/public/workspaces/cmml2oniw000g04l7gwmqelu1/typebots/cmn1vyjog000104la10d6sdzu/blocks/d5tqr6czngeukjb8r6whrs5s?v=1774318273085',
    shortcut: 'https://s3.typebot.io/public/workspaces/cmml2oniw000g04l7gwmqelu1/typebots/cmn1vyjog000104la10d6sdzu/blocks/d5tqr6czngeukjb8r6whrs5s?v=1774318273085',
    apple: 'https://s3.typebot.io/public/workspaces/cmml2oniw000g04l7gwmqelu1/typebots/cmn1vyjog000104la10d6sdzu/blocks/d5tqr6czngeukjb8r6whrs5s?v=1774318273085',
  },
  openGraph: {
    title: 'FlowPro — IA para Vendas',
    description: 'Radar de Leads + Script IA + Jornada de 7 Dias',
    url: 'https://www.flowprosystems.shop',
    siteName: 'FlowPro',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`dark ${plusJakartaSans.variable} ${jetBrainsMono.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preload" href="https://framerusercontent.com/images/ceBGguIpUU8luwByxuQz79t7To.png" as="image" />
      </head>
      <body className="font-body antialiased min-h-screen bg-[#05050f] text-foreground selection:bg-primary/30 selection:text-white margin-0 overflow-x-hidden">
        <FirebaseClientProvider>
          <div className="fixed inset-0 z-0 pointer-events-none">
            <EtheralShadow
              color="rgba(109, 40, 217, 0.9)"
              animation={{ scale: 45, speed: 55 }}
              noise={{ opacity: 0.35, scale: 1.5 }}
              sizing="fill"
            />
          </div>

          <div className="relative z-10 flex flex-col min-h-screen bg-transparent">
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
