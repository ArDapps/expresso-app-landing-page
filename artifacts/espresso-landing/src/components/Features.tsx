import React from 'react';
import { useLanguage } from '@/lib/i18n';
import { motion } from 'framer-motion';
import { MessageCircle, Briefcase, Clipboard, UserCircle, Zap, Send } from 'lucide-react';

export function Features() {
  const { t, isRtl } = useLanguage();

  const features = [
    { icon: <MessageCircle className="w-6 h-6 text-primary" />, titleKey: 'feature1Title', descKey: 'feature1Desc' },
    { icon: <Briefcase className="w-6 h-6 text-primary" />, titleKey: 'feature2Title', descKey: 'feature2Desc' },
    { icon: <Clipboard className="w-6 h-6 text-primary" />, titleKey: 'feature3Title', descKey: 'feature3Desc' },
    { icon: <UserCircle className="w-6 h-6 text-primary" />, titleKey: 'feature4Title', descKey: 'feature4Desc' },
    { icon: <Zap className="w-6 h-6 text-primary" />, titleKey: 'feature5Title', descKey: 'feature5Desc' },
    { icon: <Send className="w-6 h-6 text-primary" />, titleKey: 'feature6Title', descKey: 'feature6Desc' },
  ];

  return (
    <section className="py-16 sm:py-24 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4"
          >
            {t('featuresHeading')}
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08 }}
              className="bg-card border border-border p-5 sm:p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
            >
              <div className={`flex items-center gap-3 mb-3 ${isRtl ? 'flex-row-reverse' : ''}`}>
                <div className="w-11 h-11 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  {feature.icon}
                </div>
                <h3 className={`text-lg font-semibold ${isRtl ? 'text-right' : 'text-left'}`}>
                  {t(feature.titleKey)}
                </h3>
              </div>
              <p className={`text-sm sm:text-base text-muted-foreground leading-relaxed ${isRtl ? 'text-right' : 'text-left'}`}>
                {t(feature.descKey)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
