import React from 'react';
import { useLanguage } from '@/lib/i18n';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

// ─── UPDATE THIS URL when you have the APK ready ───────────────────────────
const ANDROID_APK_URL = '#android-apk';
// ────────────────────────────────────────────────────────────────────────────

function AppleIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 shrink-0">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
    </svg>
  );
}

function AndroidIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 shrink-0">
      <path d="M17.523 15.341A5.469 5.469 0 0 0 19 11.5C19 8.462 16.538 6 13.5 6h-3C7.462 6 5 8.462 5 11.5c0 1.424.548 2.718 1.439 3.685l-.976 2.25a.75.75 0 0 0 1.374.596L7.75 16h8.5l.913 2.031a.75.75 0 1 0 1.374-.596l-.014-.031zM8.75 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5zm6.5 0a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5zM6.5 5.5l-1.25-2.5M17.5 5.5l1.25-2.5"/>
      <path d="M6 5.5 4.5 3m13.5 2.5L19.5 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
    </svg>
  );
}

export function Hero() {
  const { t, isRtl } = useLanguage();

  return (
    <section className="relative overflow-hidden pt-16 pb-20 sm:pt-24 sm:pb-32 lg:pb-40">
      {/* Background blob */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] sm:w-[800px] sm:h-[800px] bg-primary/10 rounded-full blur-3xl -z-10 pointer-events-none opacity-50" />

      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-20">

          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex-1 text-center lg:text-start w-full"
          >
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary font-medium text-sm mb-5 ${isRtl ? 'flex-row-reverse' : ''}`}>
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              {isRtl ? 'متوفر الآن على iOS وأندرويد' : 'Available for iOS & Android'}
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight text-foreground mb-5 leading-[1.1]">
              {t('heroHeadline')}
            </h1>

            <p className="text-base sm:text-lg text-muted-foreground mb-8 max-w-xl mx-auto lg:mx-0">
              {t('heroSubheadline')}
            </p>

            {/* Download Buttons */}
            <div className={`flex flex-col sm:flex-row items-stretch sm:items-center gap-3 justify-center lg:justify-start ${isRtl ? 'sm:flex-row-reverse lg:justify-end' : ''}`}>
              {/* iOS */}
              <a
                href="https://apps.apple.com/eg/app/espresso-messages-for-whatsapp/id1331369255"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto"
              >
                <Button
                  size="lg"
                  className={`w-full h-13 px-6 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-base shadow-lg hover:shadow-xl transition-all gap-2 ${isRtl ? 'flex-row-reverse' : ''}`}
                >
                  <AppleIcon />
                  {t('cta')}
                </Button>
              </a>

              {/* Android APK */}
              <a
                href={ANDROID_APK_URL}
                download
                className="w-full sm:w-auto"
                aria-label="Download Espresso for Android"
              >
                <Button
                  size="lg"
                  variant="outline"
                  className={`w-full h-13 px-6 rounded-full border-2 border-primary/60 text-foreground hover:border-primary hover:bg-primary/10 font-semibold text-base transition-all gap-2 ${isRtl ? 'flex-row-reverse' : ''}`}
                >
                  <AndroidIcon />
                  {t('ctaAndroid')}
                </Button>
              </a>
            </div>
          </motion.div>

          {/* Phone Mockup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex-1 flex justify-center lg:justify-end relative w-full"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent rounded-full blur-3xl -z-10" />
            <div className="w-[220px] sm:w-[260px] lg:w-[300px] iphone-mockup shadow-2xl rotate-[-2deg] hover:rotate-0 transition-transform duration-500">
              <img
                src="https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/3d/7d/fa/3d7dfad9-d806-2681-45ef-391be6d8b5a6/pr_source.png/460x996bb.jpg"
                alt="Espresso app – send a WhatsApp message to any phone number without saving it as a contact"
                width="460"
                height="996"
                className="w-full h-auto object-cover"
                fetchPriority="high"
              />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
