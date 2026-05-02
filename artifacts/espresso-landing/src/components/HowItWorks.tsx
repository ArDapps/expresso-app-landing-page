import React from 'react';
import { useLanguage } from '@/lib/i18n';
import { motion } from 'framer-motion';
import { Copy, Maximize, MessageSquare } from 'lucide-react';

export function HowItWorks() {
  const { t, isRtl } = useLanguage();

  const steps = [
    {
      icon: <Copy className="w-8 h-8 text-primary" />,
      titleKey: 'step1Title',
      descKey: 'step1Desc',
    },
    {
      icon: <Maximize className="w-8 h-8 text-primary" />,
      titleKey: 'step2Title',
      descKey: 'step2Desc',
    },
    {
      icon: <MessageSquare className="w-8 h-8 text-primary" />,
      titleKey: 'step3Title',
      descKey: 'step3Desc',
    }
  ];

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl font-bold mb-4"
          >
            {t('howItWorksHeading')}
          </motion.h2>
        </div>

        <div className="relative">
          {/* Connector Line */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-border -translate-y-1/2" />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
            {steps.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className="flex flex-col items-center text-center"
              >
                <div className="w-20 h-20 rounded-2xl bg-card border-2 border-primary flex items-center justify-center mb-6 shadow-lg shadow-primary/10">
                  {step.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{t(step.titleKey)}</h3>
                <p className="text-muted-foreground max-w-xs">{t(step.descKey)}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
