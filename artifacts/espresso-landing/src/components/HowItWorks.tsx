import React from 'react';
import { useLanguage } from '@/lib/i18n';
import { motion } from 'framer-motion';
import { Copy, Maximize, MessageSquare } from 'lucide-react';

export function HowItWorks() {
  const { t } = useLanguage();

  const steps = [
    { icon: <Copy className="w-7 h-7 text-primary" />, titleKey: 'step1Title', descKey: 'step1Desc', num: '01' },
    { icon: <Maximize className="w-7 h-7 text-primary" />, titleKey: 'step2Title', descKey: 'step2Desc', num: '02' },
    { icon: <MessageSquare className="w-7 h-7 text-primary" />, titleKey: 'step3Title', descKey: 'step3Desc', num: '03' },
  ];

  return (
    <section className="py-16 sm:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4"
          >
            {t('howItWorksHeading')}
          </motion.h2>
        </div>

        {/* Mobile: vertical numbered list. Desktop: horizontal row */}
        <div className="flex flex-col md:flex-row gap-6 md:gap-0 relative">
          {/* connector line desktop only */}
          <div className="hidden md:block absolute top-10 left-[calc(16.66%+2rem)] right-[calc(16.66%+2rem)] h-0.5 bg-border" />

          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15 }}
              className="flex-1 flex md:flex-col items-start md:items-center gap-4 md:gap-0 md:text-center relative z-10"
            >
              {/* Step icon + number */}
              <div className="shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-card border-2 border-primary flex flex-col items-center justify-center shadow-lg shadow-primary/10 md:mx-auto md:mb-6">
                {step.icon}
                <span className="text-xs font-bold text-primary mt-1">{step.num}</span>
              </div>
              {/* Mobile connector line */}
              {idx < steps.length - 1 && (
                <div className="md:hidden absolute left-8 top-16 w-0.5 h-6 bg-border" />
              )}
              <div className="flex-1 md:flex-none">
                <h3 className="text-base sm:text-lg font-bold mb-1 md:mb-3">{t(step.titleKey)}</h3>
                <p className="text-sm sm:text-base text-muted-foreground md:max-w-xs">{t(step.descKey)}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
