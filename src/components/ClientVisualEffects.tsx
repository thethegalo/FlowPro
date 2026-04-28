
"use client";

import { useState, useEffect, useMemo, useRef } from 'react';
import dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation';
import { useUser, useFirestore, useDoc, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';
import { motion, AnimatePresence } from 'framer-motion';

const FloatingMentor = dynamic(() => import('@/components/FloatingMentor').then(mod => ({ default: mod.FloatingMentor })), { ssr: false });

export function ClientVisualEffects() {
  const pathname = usePathname();
  const { user } = useUser();
  const db = useFirestore();
  const [notification, setNotification] = useState<{ value: number, type: string } | null>(null);
  const notificationTimerRef = useRef<NodeJS.Timeout | null>(null);
  const [mounted, setMounted] = useState(false);

  // Garante que o componente só renderize conteúdo visual no cliente
  useEffect(() => {
    setMounted(true);
  }, []);

  const userDocRef = useMemoFirebase(() => {
    if (!db || !user) return null;
    return doc(db, 'users', user.uid);
  }, [db, user]);
  const { data: userData } = useDoc(userDocRef);

  const isAdmin = useMemo(() => user?.email === "thethegalo@gmail.com", [user]);
  const isAffiliate = useMemo(() => userData?.isAffiliate === true, [userData]);

  // Rotas onde a notificação NÃO deve aparecer
  const excludedPaths = ['/', '/adriel', '/dx', '/felipe', '/v/felipe', '/auth', '/quiz', '/masterclass'];
  const isExcluded = useMemo(() => {
    return excludedPaths.some(path => pathname === path || pathname.startsWith(path + '/'));
  }, [pathname]);

  useEffect(() => {
    if (!mounted) return;

    if ((!isAdmin && !isAffiliate) || isExcluded) {
      setNotification(null);
      return;
    }

    const values = [27, 47, 57, 97, 127, 197, 287];
    const types = ['Pix Recorrência', 'Pix Avulso', 'Cartão Recorrência', 'Pix'];

    const triggerNotification = (forcedValue?: number) => {
      const value = forcedValue || values[Math.floor(Math.random() * values.length)];
      const type = types[Math.floor(Math.random() * types.length)];

      // Dispara evento para o dashboard
      window.dispatchEvent(new CustomEvent('flow-new-sale', { detail: { value } }));

      // Toca o som (Pix)
      const audio = new Audio('https://s3.typebot.io/public/workspaces/cmml2oniw000g04l7gwmqelu1/typebots/cmn1vyjog000104la10d6sdzu/blocks/osid4179qrv1mrt7943r2618?v=1774318273085');
      audio.play().catch(() => {});

      if (notificationTimerRef.current) clearTimeout(notificationTimerRef.current);

      setNotification({ value, type });
      
      notificationTimerRef.current = setTimeout(() => {
        setNotification(null);
      }, 6000);
    };

    const handleTest = () => triggerNotification(197);
    window.addEventListener('flow-test-pix', handleTest);

    const scheduleNext = () => {
      const delay = (Math.floor(Math.random() * 180) + 240) * 1000;
      return setTimeout(() => {
        triggerNotification();
        scheduleNext();
      }, delay);
    };

    const timer = scheduleNext();

    return () => {
      clearTimeout(timer);
      if (notificationTimerRef.current) clearTimeout(notificationTimerRef.current);
      window.removeEventListener('flow-test-pix', handleTest);
    };
  }, [isAdmin, isAffiliate, isExcluded, pathname, mounted]);

  // Previne Hydration Mismatch retornando nulo até que o cliente esteja pronto
  if (!mounted) return null;

  return (
    <>
      {/* Background Atmosférico de Baixo Consumo */}
      <div className="fixed inset-0 z-0 pointer-events-none bg-[#05050f]">
        <div 
          className="absolute top-[-10%] left-[-10%] w-[70%] h-[60%] rounded-full opacity-[0.12] blur-[120px]"
          style={{ backgroundImage: 'radial-gradient(circle, #7c3aed 0%, transparent 70%)' }}
        />
        <div 
          className="absolute bottom-[-5%] right-[-5%] w-[50%] h-[50%] rounded-full opacity-[0.06] blur-[100px]"
          style={{ backgroundImage: 'radial-gradient(circle, #4c1d95 0%, transparent 70%)' }}
        />
      </div>
      
      <FloatingMentor />

      <AnimatePresence>
        {notification && (
          <motion.div 
            initial={{ x: 400, opacity: 0, scale: 0.9 }}
            animate={{ x: 0, opacity: 1, scale: 1 }}
            exit={{ x: 400, opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed top-8 right-8 z-[100000] pointer-events-auto"
          >
            <div className="bg-[#0a0a14] border border-green-500/40 rounded-3xl p-5 shadow-[0_20px_60px_rgba(0,0,0,0.8),0_0_30px_rgba(34,197,94,0.15)] flex items-center gap-5 min-w-[320px] backdrop-blur-xl relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-tr from-green-500/5 to-transparent pointer-events-none" />
              
              <div className="h-14 w-14 bg-green-500/20 rounded-2xl flex items-center justify-center shrink-0 border border-green-500/20 shadow-inner">
                <span className="text-3xl animate-bounce">💸</span>
              </div>
              
              <div className="flex-1 space-y-0.5">
                <div className="flex items-center gap-2">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-green-400">{notification.type}</p>
                  <div className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,1)]" />
                </div>
                <p className="text-3xl font-black italic text-white tracking-tighter leading-none">
                  R$ {notification.value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </p>
                <p className="text-[10px] text-white/40 uppercase font-bold tracking-widest pt-1">Sincronizado via FlowPro</p>
              </div>

              <motion.div 
                initial={{ width: "100%" }}
                animate={{ width: 0 }}
                transition={{ duration: 6, ease: "linear" }}
                className="absolute bottom-0 left-0 h-1 bg-green-500/40"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
