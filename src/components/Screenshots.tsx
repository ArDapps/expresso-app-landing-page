"use client";

import React from 'react';
import { useLanguage } from '@/lib/i18n';
import { motion } from 'framer-motion';

import Image from 'next/image';

export function Screenshots() {
  const { t } = useLanguage();

  const screenshots = [
    { src: "/assets/espresso-appstore-01.png", alt: "Espresso app – type a phone number to start a WhatsApp chat instantly" },
    { src: "/assets/espresso-appstore-02.png", alt: "Espresso app – clipboard detection prompts you to message a copied number on WhatsApp" },
    { src: "/assets/espresso-appstore-03.png", alt: "Espresso app – works with WhatsApp Business to message clients without saving contacts" },
    { src: "/assets/espresso-appstore-04.png", alt: "Espresso app – message yourself on WhatsApp to save links and notes" },
    { src: "/assets/espresso-appstore-05.png", alt: "Espresso app – one tap to open any WhatsApp conversation from a phone number" },
  ];

  return (
    <section className="py-16 sm:py-24 bg-muted/20 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4"
          >
            {t('screenshotsHeading')}
          </motion.h2>
          <p className="text-sm text-muted-foreground">
            {t('screenshotsSubtext') || 'Swipe to explore'}
          </p>
        </div>
      </div>

      {/* Horizontal scroll strip — centered container */}
      <div
        className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-8 px-4 sm:px-8 justify-start md:justify-center no-scrollbar"
        dir="ltr"
      >
        {/* Force LTR for the scroll strip to keep screenshots order consistent regardless of language */}
        {screenshots.map((screenshot, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.08 }}
            className="shrink-0 snap-center w-[200px] sm:w-[240px]"
          >
            <div className="iphone-mockup shadow-2xl transition-transform duration-300 hover:-translate-y-2">
              <Image
                src={screenshot.src}
                alt={screenshot.alt}
                width={460}
                height={996}
                priority={idx === 0}
                className="w-full h-auto object-cover"
              />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Scroll indicator dots */}
      <div className="flex justify-center gap-2 mt-4">
        {screenshots.map((_, idx) => (
          <div
            key={idx}
            className={`h-1.5 rounded-full bg-primary transition-all ${idx === 0 ? 'w-6 opacity-100' : 'w-1.5 opacity-30'}`}
          />
        ))}
      </div>
    </section>
  );
}
