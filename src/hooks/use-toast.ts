"use client"

import { useState, useEffect } from "react"

/**
 * FlowPro Custom Toast System
 * Optimized for mobile and multi-toast handling.
 */

type ToastVariant = 'default' | 'success' | 'error' | 'warning';

export interface Toast {
  id: string;
  title: string;
  description?: string;
  variant: ToastVariant;
}

// Internal singleton store to keep toasts synced
let toasts: Toast[] = [];
let listeners: Array<(toasts: Toast[]) => void> = [];

const notify = () => {
  listeners.forEach(listener => listener([...toasts]));
};

const addToast = (props: { title: string; description?: string; variant?: ToastVariant }) => {
  const id = Math.random().toString(36).substring(2, 9);
  const newToast: Toast = {
    id,
    title: props.title,
    description: props.description,
    variant: props.variant || 'default'
  };

  // LIMIT TO 3 VISIBLE TOASTS
  toasts = [newToast, ...toasts].slice(0, 3);
  notify();

  // Auto-dismiss after 3.5 seconds
  setTimeout(() => {
    toasts = toasts.filter(t => t.id !== id);
    notify();
  }, 3500);

  return id;
};

const dismissToast = (id: string) => {
  toasts = toasts.filter(t => t.id !== id);
  notify();
};

export const toast = Object.assign(
  (props: { title: string; description?: string; variant?: string }) => {
    const variantMap: Record<string, ToastVariant> = {
      'destructive': 'error',
      'success': 'success',
      'warning': 'warning',
      'default': 'default'
    };
    return addToast({
      title: props.title,
      description: props.description,
      variant: variantMap[props.variant || 'default'] || 'default'
    });
  },
  {
    success: (title: string, description?: string) => addToast({ title, description, variant: 'success' }),
    error: (title: string, description?: string) => addToast({ title, description, variant: 'error' }),
    warning: (title: string, description?: string) => addToast({ title, description, variant: 'warning' }),
    show: (title: string, description?: string) => addToast({ title, description, variant: 'default' }),
  }
);

export function useToast() {
  const [state, setState] = useState<Toast[]>(toasts);

  useEffect(() => {
    listeners.push(setState);
    return () => {
      listeners = listeners.filter(l => l !== setState);
    };
  }, []);

  return {
    toasts: state,
    dismiss: dismissToast,
    toast,
    success: toast.success,
    error: toast.error,
    warning: toast.warning,
    show: toast.show
  };
}