
import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { FirebaseClientProvider } from '@/firebase';
import { CustomCursor } from '@/components/CustomCursor';
import { FloatingMentor } from '@/components/FloatingMentor';
import { EtheralShadow } from '@/components/ui/etheral-shadow';

export const metadata: Metadata = {
  title: 'FlowPro | AI Sales Companion',
  description: 'Transforme seu processo de vendas com planos de ação gerados por IA, missões diárias e mentoria especializada.',
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
    <html lang="pt-BR" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@300;400;500;600&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased min-h-screen bg-[#05050f] text-foreground selection:bg-primary/30 selection:text-white margin-0 overflow-x-hidden">
        <FirebaseClientProvider>
          {/* FUNDO FIXO GLOBAL */}
          <div className="fixed inset-0 z-0 pointer-events-none">
            <EtheralShadow
              color="rgba(109, 40, 217, 0.9)"
              animation={{ scale: 45, speed: 55 }}
              noise={{ opacity: 0.35, scale: 1.5 }}
              sizing="fill"
            />
          </div>

          {/* CONTEÚDO PRINCIPAL */}
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
