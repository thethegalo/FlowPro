
"use client";

import { useState, useEffect, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation';
import { useUser, useFirestore, useDoc, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';
import { motion, AnimatePresence } from 'framer-motion';
import { Check } from 'lucide-react';

const FloatingMentor = dynamic(() => import('@/components/FloatingMentor').then(mod => ({ default: mod.FloatingMentor })), { ssr: false });

export function ClientVisualEffects() {
  const pathname = usePathname();
  const { user } = useUser();
  const db = useFirestore();
  const [notification, setNotification] = useState<{ visible: boolean, value: number, type: string } | null>(null);

  const userDocRef = useMemoFirebase(() => {
    if (!db || !user) return null;
    return doc(db, 'users', user.uid);
  }, [db, user]);
  const { data: userData } = useDoc(userDocRef);

  const isAdmin = useMemo(() => user?.email === "thethegalo@gmail.com", [user]);
  const isAffiliate = useMemo(() => userData?.isAffiliate === true, [userData]);

  // Rotas onde a notificação NÃO deve aparecer
  const excludedPaths = ['/', '/adriel', '/dx', '/felipe', '/v/felipe', '/auth', '/quiz', '/masterclass'];
  const isExcluded = excludedPaths.includes(pathname);

  useEffect(() => {
    if ((!isAdmin && !isAffiliate) || isExcluded) return;

    const values = [27, 47, 57, 97, 127, 197, 287];
    const types = ['Pix Recorrência', 'Pix Avulso', 'Cartão Recorrência', 'Pix'];

    const triggerNotification = (forcedValue?: number) => {
      const value = forcedValue || values[Math.floor(Math.random() * values.length)];
      const type = types[Math.floor(Math.random() * types.length)];

      // Dispara evento para o dashboard atualizar o gráfico/saldo
      window.dispatchEvent(new CustomEvent('flow-new-sale', { detail: { value } }));

      // Toca o som
      const audio = new Audio('/sounds/pix.mp3');
      audio.play().catch(() => {});

      setNotification({ visible: true, value, type });
      setTimeout(() => setNotification(null), 5000);
    };

    // Listener para o botão de teste do Admin
    const handleTest = () => triggerNotification(197);
    window.addEventListener('flow-test-pix', handleTest);

    const scheduleNext = () => {
      // Intervalo entre 5 e 6 minutos
      const delay = (Math.floor(Math.random() * 60) + 300) * 1000;
      return setTimeout(() => {
        triggerNotification();
        scheduleNext();
      }, delay);
    };

    const timer = scheduleNext();
    return () => {
      clearTimeout(timer);
      window.removeEventListener('flow-test-pix', handleTest);
    };
  }, [isAdmin, isAffiliate, isExcluded]);

  return (
    <>
      {/* Background Ultra-Leve (Performance Mode) */}
      <div className="fixed inset-0 z-0 pointer-events-none bg-[#05050f]">
        <div 
          className="absolute top-[-10%] left-[-10%] w-[70%] h-[60%] rounded-full opacity-[0.15] blur-[120px] pointer-events-none"
          style={{ 
            background: 'radial-gradient(circle, rgba(124,58,237,1) 0%, rgba(124,58,237,0) 70%)',
            willChange: 'transform'
          }}
        />
        <div 
          className="absolute bottom-[-5%] right-[-5%] w-[50%] h-[50%] rounded-full opacity-[0.08] blur-[100px] pointer-events-none"
          style={{ 
            background: 'radial-gradient(circle, rgba(109,40,217,1) 0%, rgba(109,40,217,0) 70%)',
            willChange: 'transform'
          }}
        />
        <div 
          className="absolute inset-0 opacity-[0.03]" 
          style={{ 
            backgroundImage: `linear-gradient(rgba(139, 92, 246, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(139, 92, 246, 0.2) 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }} 
        />
      </div>
      
      <FloatingMentor />

      <AnimatePresence>
        {notification?.visible && (
          <motion.div 
            initial={{ x: 400, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 400, opacity: 0 }}
            className="fixed top-6 right-6 z-[9999] pointer-events-none"
          >
            <div className="bg-[#0a0a0f] border border-green-500/40 rounded-2xl p-4 shadow-[0_0_40px_rgba(34,197,94,0.2)] flex items-center gap-4 min-w-[280px]">
              <div className="h-12 w-12 bg-green-500/20 rounded-xl flex items-center justify-center shrink-0 shadow-[0_0_20px_rgba(34,197,94,0.3)]">
                <span className="text-2xl">💸</span>
              </div>
              <div className="flex-1">
                <p className="text-[10px] font-black uppercase tracking-widest text-green-400">{notification.type}</p>
                <p className="text-2xl font-black italic text-white tracking-tighter">R$ {notification.value}</p>
                <p className="text-[9px] text-white/40 uppercase font-bold">Recebido agora</p>
              </div>
              <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.8)]"></div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
