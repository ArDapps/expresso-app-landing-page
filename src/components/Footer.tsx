"use client";

import React from 'react';
import { useLanguage } from '@/lib/i18n';
import Image from 'next/image';
import { Mail, Shield, FileText } from 'lucide-react';

export function Footer() {
  const { t, isRtl } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-card py-16">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand Column */}
          <div className={`flex flex-col gap-4 ${isRtl ? 'items-end text-right' : 'items-start text-left'}`}>
            <div className={`flex items-center gap-3 ${isRtl ? 'flex-row-reverse' : ''}`}>
              <Image 
                src="/assets/logo.png" 
                alt="Espresso Messages app logo"
                width={40}
                height={40}
                className="w-10 h-10 rounded-xl shadow-sm"
              />
              <span className="font-bold text-2xl tracking-tight text-foreground">Espresso</span>
            </div>
            <p className="text-muted-foreground text-sm max-w-xs">
              {t('footerDescription')}
            </p>
          </div>

          {/* Quick Links Column */}
          <div className={`flex flex-col gap-4 ${isRtl ? 'items-end text-right' : 'items-start text-left'}`}>
            <h4 className="font-bold text-foreground uppercase tracking-wider text-xs">
              {isRtl ? 'روابط سريعة' : 'Quick Links'}
            </h4>
            <nav className="flex flex-col gap-3">
              <a href="#contact" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                <Mail className="w-4 h-4" />
                {t('footerContact')}
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                <Shield className="w-4 h-4" />
                {t('footerPrivacy')}
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                <FileText className="w-4 h-4" />
                {t('footerTerms')}
              </a>
            </nav>
          </div>

          {/* App Store Column */}
          <div className={`flex flex-col gap-4 ${isRtl ? 'items-end text-right' : 'items-start text-left'}`}>
            <h4 className="font-bold text-foreground uppercase tracking-wider text-xs">
              {isRtl ? 'التطبيقات' : 'Download'}
            </h4>
            <div className="flex flex-col gap-3 w-full max-w-[200px]">
              <a 
                href="https://apps.apple.com/eg/app/espresso-messages-for-whatsapp/id1331369255" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-foreground text-background px-4 py-2 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
              >
                App Store
              </a>
              <a 
                href="#android-apk" 
                className="border border-border bg-background px-4 py-2 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 hover:bg-muted transition-colors"
              >
                Android APK
              </a>
            </div>
          </div>
        </div>
        
        <div className={`pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4 ${isRtl ? 'sm:flex-row-reverse' : ''}`}>
          <div className="text-sm text-muted-foreground order-2 sm:order-1">
            &copy; {year} Bahaa Taha. {isRtl ? 'جميع الحقوق محفوظة.' : 'All rights reserved.'}
          </div>
          <div className="flex items-center gap-6 order-1 sm:order-2">
            <span className="text-xs text-muted-foreground italic">
              {isRtl ? 'بني بحب للمسوقين والأفراد' : 'Built with love for marketers & individuals'}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
