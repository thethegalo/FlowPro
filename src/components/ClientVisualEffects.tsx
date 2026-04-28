
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
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [mounted, setMounted] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);

  // 1. Inicialização do Áudio e Sistema de Unlock
  useEffect(() => {
    setMounted(true);
    
    if (typeof window !== 'undefined') {
      // Criar a instância uma única vez
      const audio = new Audio(PIX_SOUND_URL);
      audio.preload = 'auto';
      audioRef.current = audio;

      // Função para desbloquear o áudio no primeiro gesto do usuário (Regra do Navegador)
      const unlock = () => {
        if (audioRef.current && !isUnlocked) {
          audioRef.current.play()
            .then(() => {
              audioRef.current?.pause();
              audioRef.current!.currentTime = 0;
              setIsUnlocked(true);
              console.log("Audio Engine: Unlocked and Ready");
            })
            .catch(() => {
              // Silencioso: tenta novamente na próxima interação
            });
        }
        // Remover ouvintes após o primeiro sucesso
        if (isUnlocked) {
          window.removeEventListener('mousedown', unlock);
          window.removeEventListener('keydown', unlock);
          window.removeEventListener('touchstart', unlock);
        }
      };

      window.addEventListener('mousedown', unlock);
      window.addEventListener('keydown', unlock);
      window.addEventListener('touchstart', unlock);
      
      return () => {
        window.removeEventListener('mousedown', unlock);
        window.removeEventListener('keydown', unlock);
        window.removeEventListener('touchstart', unlock);
      };
    }
  }, [isUnlocked]);

  const userDocRef = useMemoFirebase(() => {
    if (!db || !user) return null;
    return doc(db, 'users', user.uid);
  }, [db, user]);
  const { data: userData } = useDoc(userDocRef);

  const isAdmin = useMemo(() => user?.email === "thethegalo@gmail.com", [user]);
  const isAffiliate = useMemo(() => userData?.isAffiliate === true, [userData]);

  // Rotas proibidas (onde a notificação não deve atrapalhar)
  const isExcluded = useMemo(() => {
    const excludedPaths = ['/', '/adriel', '/dx', '/felipe', '/v/felipe', '/auth', '/quiz', '/masterclass', '/paywall'];
    return excludedPaths.some(path => pathname === path || pathname.startsWith(path + '/'));
  }, [pathname]);

  // Função central de disparo (Som + Visual)
  const triggerNotification = (forcedValue?: number) => {
    const values = [27, 47, 57, 97, 127, 197, 287];
    const types = ['Pix Recorrência', 'Pix Avulso', 'Cartão Recorrência', 'Pix Aprovado'];
    const value = forcedValue || values[Math.floor(Math.random() * values.length)];
    const type = types[Math.floor(Math.random() * types.length)];

    // 1. Tocar o Som (Prioridade Máxima)
    if (audioRef.current) {
      audioRef.current.currentTime = 0; // Reiniciar do zero
      audioRef.current.play().catch(e => {
        console.warn("Audio Engine: Play blocked. Interaction required.");
      });
    }

    // 2. Sincronizar com o Dashboard (Saldo)
    window.dispatchEvent(new CustomEvent('flow-new-sale', { detail: { value } }));

    // 3. Exibir o Visual
    setNotification({ value, type });
    
    // Auto-close após 5 segundos
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  useEffect(() => {
    if (!mounted || isExcluded) return;
    if (!isAdmin && !isAffiliate) return;

    // Escutar eventos de teste do Admin
    const handleTest = () => triggerNotification(197.00);
    window.addEventListener('flow-test-pix', handleTest);

    // Ciclo de notificações aleatórias (Loop infinito)
    let timeoutId: NodeJS.Timeout;
    const scheduleNext = () => {
      const delay = (Math.floor(Math.random() * 40) + 40) * 1000; // 40 a 80 segundos
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
      {/* Background Atmosférico */}
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
            exit={{ x: 400, opacity: 0, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="fixed top-6 right-6 z-[999999] pointer-events-auto"
          >
            <div className="bg-[#0a0a14] border border-green-500/40 rounded-[1.5rem] p-5 shadow-[0_30px_70px_rgba(0,0,0,0.8),0_0_40px_rgba(34,197,94,0.1)] flex items-center gap-5 min-w-[320px] backdrop-blur-2xl relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-tr from-green-500/5 to-transparent pointer-events-none" />
              
              <div className="h-14 w-14 bg-green-500/10 rounded-2xl flex items-center justify-center shrink-0 border border-green-500/20 shadow-[inset_0_0_15px_rgba(34,197,94,0.1)]">
                <span className="text-3xl drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]">💰</span>
              </div>
              
              <div className="flex-1 space-y-0.5">
                <div className="flex items-center gap-2">
                  <p className="text-[10px] font-black uppercase tracking-[0.25em] text-green-400/80">{notification.type}</p>
                  <div className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_#22c55e]" />
                </div>
                <p className="text-3xl font-black italic text-white tracking-tighter leading-none">
                  R$ {notification.value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </p>
                <p className="text-[9px] text-white/30 uppercase font-black tracking-widest pt-1.5">Ecossistema FlowPro Ativo</p>
              </div>

              {/* Progress Bar Visual */}
              <motion.div 
                initial={{ width: "100%" }}
                animate={{ width: 0 }}
                transition={{ duration: 5, ease: "linear" }}
                className="absolute bottom-0 left-0 h-[3px] bg-green-500/60"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
