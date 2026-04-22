"use client";
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Download } from 'lucide-react';

export const HeaderInstallButton = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    // Detect if already installed
    if (window.matchMedia('(display-mode: standalone)').matches || (window.navigator as any).standalone) {
      setIsStandalone(true);
    }

    const handler = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstallable(true);
    };

    window.addEventListener('beforeinstallprompt', handler);

    // Fallback: If it's iOS, we can show instructions (Safari doesn't support beforeinstallprompt)
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
    if (isIOS && !isStandalone) {
      setIsInstallable(true);
    }

    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, [isStandalone]);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setIsInstallable(false);
      }
      setDeferredPrompt(null);
    } else {
      // Manual fallback for iOS/Safari or if prompt didn't fire
      alert('To install Kidokulture:\\n\\n1. Tap the Share button (square with arrow)\\n2. Scroll down and tap "Add to Home Screen"\\n3. Tap "Add" to finish!');
    }
  };

  if (isStandalone || !isInstallable) return null;

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleInstallClick}
      className="flex items-center gap-2 rounded-full bg-gradient-to-r from-orange-400 to-orange-500 px-6 py-2.5 text-sm font-black text-white shadow-[0_4px_14px_0_rgba(251,146,60,0.39)] hover:shadow-[0_6px_20px_rgba(251,146,60,0.23)] transition-all uppercase tracking-wider"
    >
      <Download className="h-4 w-4 stroke-[3px]" />
      Install App
    </motion.button>
  );
};
