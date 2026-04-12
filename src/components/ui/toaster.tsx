
"use client"

import { useToast, type Toast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X, AlertTriangle } from "lucide-react";
import Image from "next/image";

const LOGO_ICON = "https://s3.typebot.io/public/workspaces/cmml2oniw000g04l7gwmqelu1/typebots/cmn1vyjog000104la10d6sdzu/blocks/d5tqr6czngeukjb8r6whrs5s?v=1774318273085";

export function Toaster() {
  const { toasts, dismiss } = useToast();

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-3 pointer-events-none items-end">
      <AnimatePresence mode="popLayout">
        {toasts.map((t) => (
          <ToastItem key={t.id} toast={t} onDismiss={() => dismiss(t.id)} />
        ))}
      </AnimatePresence>
    </div>
  );
}

function ToastItem({ toast, onDismiss }: { toast: Toast, onDismiss: () => void }) {
  const getIcon = () => {
    switch (toast.variant) {
      case 'success': return <Check className="h-4 w-4 text-[#22c55e]" />;
      case 'error': return <X className="h-4 w-4 text-[#ef4444]" />;
      case 'warning': return <AlertTriangle className="h-4 w-4 text-[#f59e0b]" />;
      default: return <Image src={LOGO_ICON} alt="FlowPro" width={16} height={16} className="brightness-0 invert opacity-80" />;
    }
  };

  const getVariantStyles = () => {
    switch (toast.variant) {
      case 'success': return "border-l-[2px] border-l-[#22c55e]";
      case 'error': return "border-l-[2px] border-l-[#ef4444]";
      case 'warning': return "border-l-[2px] border-l-[#f59e0b]";
      default: return "";
    }
  };

  return (
    <motion.div
      layout
      initial={{ x: "110%", opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: "110%", opacity: 0 }}
      transition={{ 
        x: { duration: 0.3, ease: [0.34, 1.56, 0.64, 1] },
        opacity: { duration: 0.2 }
      }}
      className={`
        pointer-events-auto relative w-[320px] overflow-hidden
        bg-[rgba(15,10,30,0.85)] backdrop-blur-[20px]
        border border-[rgba(139,92,246,0.25)] rounded-[12px]
        p-[14px_18px] shadow-[0_8px_32px_rgba(0,0,0,0.4)]
        flex gap-4 items-start
        ${getVariantStyles()}
      `}
    >
      <div className="h-8 w-8 rounded-[8px] bg-[rgba(124,58,237,0.15)] border border-[rgba(139,92,246,0.2)] flex items-center justify-center shrink-0">
        {getIcon()}
      </div>

      <div className="flex-1 min-w-0">
        <h4 className="text-[13px] font-semibold text-[rgba(255,255,255,0.9)] leading-tight truncate">
          {toast.title}
        </h4>
        {toast.description && (
          <p className="text-[12px] text-[rgba(255,255,255,0.45)] mt-[2px] leading-snug">
            {toast.description}
          </p>
        )}
      </div>

      <button 
        onClick={onDismiss}
        className="text-white/20 hover:text-white/40 transition-colors shrink-0 mt-0.5"
      >
        <X className="h-3.5 w-3.5" />
      </button>

      {/* Progress Bar Animation */}
      <motion.div 
        initial={{ width: "100%" }}
        animate={{ width: 0 }}
        transition={{ duration: 3.5, ease: "linear" }}
        className="absolute bottom-0 left-0 h-[2px] bg-[#7c3aed]"
      />
    </motion.div>
  );
}
