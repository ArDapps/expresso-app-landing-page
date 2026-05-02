import React from 'react';
import { useLanguage } from '@/lib/i18n';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

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
              {isRtl ? 'متوفر الآن على iOS' : 'Available now on iOS'}
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight text-foreground mb-5 leading-[1.1]">
              {t('heroHeadline')}
            </h1>

            <p className="text-base sm:text-lg text-muted-foreground mb-8 max-w-xl mx-auto lg:mx-0">
              {t('heroSubheadline')}
            </p>

            <div className={`flex flex-col sm:flex-row items-center gap-3 justify-center lg:justify-start ${isRtl ? 'sm:flex-row-reverse lg:justify-end' : ''}`}>
              <a
                href="https://apps.apple.com/eg/app/espresso-messages-for-whatsapp/id1331369255"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto"
              >
                <Button size="lg" className="w-full h-13 px-8 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-base shadow-lg hover:shadow-xl transition-all">
                  {t('cta')}
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
