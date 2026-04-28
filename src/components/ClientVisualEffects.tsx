
"use client";

import { useState, useEffect, useMemo, useRef } from 'react';
import dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation';
import { useUser, useFirestore, useDoc, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';
import { motion, AnimatePresence } from 'framer-motion';

const FloatingMentor = dynamic(() => import('@/components/FloatingMentor').then(mod => ({ default: mod.FloatingMentor })), { ssr: false });

const PIX_SOUND_URL = 'https://s3.typebot.io/public/workspaces/cmml2oniw000g04l7gwmqelu1/typebots/cmn1vyjog000104la10d6sdzu/blocks/osid4179qrv1mrt7943r2618?v=1774318273085';

export function ClientVisualEffects() {
  const pathname = usePathname();
  const { user } = useUser();
  const db = useFirestore();
  const [notification, setNotification] = useState<{ value: number, type: string } | null>(null);
  const [mounted, setMounted] = useState(false);
  
  // Referência persistente para o objeto de áudio
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const hasInteracted = useRef(false);

  useEffect(() => {
    setMounted(true);
    
    // Inicializa o áudio e prepara o carregamento
    const audio = new Audio(PIX_SOUND_URL);
    audio.preload = 'auto';
    audioRef.current = audio;

    // Função de desbloqueio definitivo (Gatekeeper Bypass)
    const unlockAudio = () => {
      if (hasInteracted.current || !audioRef.current) return;
      
      // Tentativa de execução silenciosa para liberar o canal
      audioRef.current.play()
        .then(() => {
          audioRef.current?.pause();
          audioRef.current!.currentTime = 0;
          hasInteracted.current = true;
          console.log("FlowPro Audio Engine: UNLOCKED");
          
          // Limpeza de listeners
          window.removeEventListener('mousedown', unlockAudio);
          window.removeEventListener('keydown', unlockAudio);
          window.removeEventListener('touchstart', unlockAudio);
          window.removeEventListener('click', unlockAudio);
        })
        .catch(() => {
          // Bloqueado pelo navegador, aguardando próxima interação
        });
    };

    window.addEventListener('mousedown', unlockAudio);
    window.addEventListener('keydown', unlockAudio);
    window.addEventListener('touchstart', unlockAudio);
    window.addEventListener('click', unlockAudio);
    
    return () => {
      window.removeEventListener('mousedown', unlockAudio);
      window.removeEventListener('keydown', unlockAudio);
      window.removeEventListener('touchstart', unlockAudio);
      window.removeEventListener('click', unlockAudio);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const userDocRef = useMemoFirebase(() => {
    if (!db || !user) return null;
    return doc(db, 'users', user.uid);
  }, [db, user]);
  const { data: userData } = useDoc(userDocRef);

  const isAdmin = useMemo(() => user?.email === "thethegalo@gmail.com", [user]);
  const isAffiliate = useMemo(() => userData?.isAffiliate === true, [userData]);

  const isExcluded = useMemo(() => {
    const excludedPaths = ['/', '/adriel', '/dx', '/felipe', '/v/felipe', '/auth', '/quiz', '/masterclass', '/paywall'];
    return excludedPaths.some(path => pathname === path || pathname.startsWith(path + '/'));
  }, [pathname]);

  const triggerNotification = (forcedValue?: number) => {
    const values = [27.00, 47.00, 97.00, 197.00, 287.00, 497.00];
    const types = ['Pix Recorrência', 'Pix Aprovado', 'Venda Confirmada', 'Comissão Ativa'];
    const value = forcedValue || values[Math.floor(Math.random() * values.length)];
    const type = types[Math.floor(Math.random() * types.length)];

    // 1. DISPARO DO SOM (EXECUTADO VIA REF PARA BYPASS DE RE-RENDER)
    if (audioRef.current) {
      try {
        audioRef.current.currentTime = 0;
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch(e => console.warn("Audio play blocked by browser policy. Interacting with page required."));
        }
      } catch (e) {
        console.error("Audio engine failure:", e);
      }
    }

    // 2. SINCRONIZAÇÃO COM DASHBOARD
    window.dispatchEvent(new CustomEvent('flow-new-sale', { detail: { value } }));

    // 3. EXIBIÇÃO VISUAL (Z-INDEX MÁXIMO)
    setNotification({ value, type });
    
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  useEffect(() => {
    if (!mounted || isExcluded) return;
    if (!isAdmin && !isAffiliate) return;

    const handleTest = () => triggerNotification(197.00);
    window.addEventListener('flow-test-pix', handleTest);

    let timeoutId: NodeJS.Timeout;
    const scheduleNext = () => {
      // Notificações a cada 30-60 segundos para feedback constante
      const delay = (Math.floor(Math.random() * 30) + 30) * 1000;
      timeoutId = setTimeout(() => {
        triggerNotification();
        scheduleNext();
      }, delay);
    };

    scheduleNext();

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('flow-test-pix', handleTest);
    };
  }, [isAdmin, isAffiliate, isExcluded, mounted]);

  if (!mounted) return null;

  return (
    <>
      {/* Camada Atmosférica */}
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
            initial={{ x: 450, opacity: 0, scale: 0.8 }}
            animate={{ x: 0, opacity: 1, scale: 1 }}
            exit={{ x: 450, opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            className="fixed top-8 right-8 z-[2000000] pointer-events-auto"
          >
            <div className="bg-[#0a0a14] border border-green-500/40 rounded-[2rem] p-6 shadow-[0_40px_100px_rgba(0,0,0,0.9),0_0_50px_rgba(34,197,94,0.15)] flex items-center gap-6 min-w-[340px] backdrop-blur-[32px] relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-tr from-green-500/[0.03] to-transparent pointer-events-none" />
              
              <div className="h-16 w-16 bg-green-500/10 rounded-[1.25rem] flex items-center justify-center shrink-0 border border-green-500/20 shadow-inner">
                <span className="text-4xl drop-shadow-[0_0_12px_rgba(34,197,94,0.6)]">💰</span>
              </div>
              
              <div className="flex-1 space-y-1">
                <div className="flex items-center gap-2">
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-green-400">{notification.type}</p>
                  <div className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_12px_#22c55e]" />
                </div>
                <p className="text-4xl font-black italic text-white tracking-tighter leading-none">
                  R$ {notification.value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </p>
                <div className="flex items-center gap-2 pt-2 opacity-30">
                  <div className="h-[1px] flex-1 bg-white/20" />
                  <p className="text-[8px] font-black uppercase tracking-widest">FlowPro Live</p>
                  <div className="h-[1px] flex-1 bg-white/20" />
                </div>
              </div>

              <motion.div 
                initial={{ width: "100%" }}
                animate={{ width: 0 }}
                transition={{ duration: 5, ease: "linear" }}
                className="absolute bottom-0 left-0 h-[4px] bg-green-500/80"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
