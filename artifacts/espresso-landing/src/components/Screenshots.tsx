import React from 'react';
import { useLanguage } from '@/lib/i18n';
import { motion } from 'framer-motion';

export function Screenshots() {
  const { t } = useLanguage();

  const screenshots = [
    { src: "https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/3d/7d/fa/3d7dfad9-d806-2681-45ef-391be6d8b5a6/pr_source.png/460x996bb.jpg", alt: "Espresso app – type a phone number to start a WhatsApp chat instantly" },
    { src: "https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/7a/93/62/7a93626c-05c8-2f46-a577-67e903cf66ed/pr_source.png/460x996bb.jpg", alt: "Espresso app – clipboard detection prompts you to message a copied number on WhatsApp" },
    { src: "https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/9f/68/c9/9f68c955-4005-870a-19c3-24aa6a67a57e/pr_source.png/460x996bb.jpg", alt: "Espresso app – works with WhatsApp Business to message clients without saving contacts" },
    { src: "https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/84/32/1b/84321bdd-c491-e61f-e07a-b25b4b33de6e/pr_source.png/460x996bb.jpg", alt: "Espresso app – message yourself on WhatsApp to save links and notes" },
    { src: "https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/2f/d6/e5/2fd6e5a3-2090-7011-9328-fd5669f4c2dc/pr_source.png/460x996bb.jpg", alt: "Espresso app – one tap to open any WhatsApp conversation from a phone number" },
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

      {/* Horizontal scroll strip — full bleed, no container constraint */}
      <div
        className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-6 px-4 sm:px-8"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {/* Left spacer so first card isn't flush against edge */}
        <div className="shrink-0 w-2 sm:w-8" aria-hidden />

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
              <img
                src={screenshot.src}
                alt={screenshot.alt}
                width="460"
                height="996"
                loading={idx === 0 ? 'eager' : 'lazy'}
                className="w-full h-auto object-cover"
              />
            </div>
          </motion.div>
        ))}

        {/* Right spacer */}
        <div className="shrink-0 w-2 sm:w-8" aria-hidden />
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
