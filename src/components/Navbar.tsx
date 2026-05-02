"use client";

import React from 'react';
import { useLanguage } from '@/lib/i18n';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import Image from 'next/image';

export function Navbar() {
  const { lang, setLang, isRtl } = useLanguage();

  return (
    <motion.nav 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-50 w-full backdrop-blur-lg bg-background/80 border-b border-border/50"
    >
      <div className="container mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Image 
            src="/assets/logo.png" 
            alt="Espresso Messages app logo"
            width={40}
            height={40}
            className="w-10 h-10 rounded-xl shadow-sm"
          />
          <span className="font-bold text-xl tracking-tight hidden sm:inline-block">Espresso</span>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center bg-muted rounded-full p-1">
            <button
              onClick={() => setLang('en')}
              className={`px-3 py-1 text-sm font-medium rounded-full transition-colors ${
                lang === 'en' ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setLang('ar')}
              className={`px-3 py-1 text-sm font-medium rounded-full transition-colors ${
                lang === 'ar' ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              AR
            </button>
          </div>
          
          <a 
            href="https://apps.apple.com/eg/app/espresso-messages-for-whatsapp/id1331369255" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <Button size="sm" className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-sm">
              {lang === 'en' ? 'Get App' : 'حمّل التطبيق'}
            </Button>
          </a>
        </div>
      </div>
    </motion.nav>
  );
}
