import React from 'react';
import { useLanguage } from '@/lib/i18n';
import { motion } from 'framer-motion';
import { MessageCircle, Briefcase, Clipboard, UserCircle, Zap } from 'lucide-react';

export function Features() {
  const { t, isRtl } = useLanguage();

  const features = [
    {
      icon: <MessageCircle className="w-6 h-6 text-primary" />,
      titleKey: 'feature1Title',
      descKey: 'feature1Desc',
    },
    {
      icon: <Briefcase className="w-6 h-6 text-primary" />,
      titleKey: 'feature2Title',
      descKey: 'feature2Desc',
    },
    {
      icon: <Clipboard className="w-6 h-6 text-primary" />,
      titleKey: 'feature3Title',
      descKey: 'feature3Desc',
    },
    {
      icon: <UserCircle className="w-6 h-6 text-primary" />,
      titleKey: 'feature4Title',
      descKey: 'feature4Desc',
    },
    {
      icon: <Zap className="w-6 h-6 text-primary" />,
      titleKey: 'feature5Title',
      descKey: 'feature5Desc',
    }
  ];

  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl font-bold mb-4"
          >
            {t('featuresHeading')}
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-card border border-border p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
            >
              <div className={`flex items-center gap-4 mb-4 ${isRtl ? 'flex-row-reverse' : ''}`}>
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  {feature.icon}
                </div>
                <h3 className={`text-xl font-semibold ${isRtl ? 'text-right' : 'text-left'}`}>
                  {t(feature.titleKey)}
                </h3>
              </div>
              <p className={`text-muted-foreground ${isRtl ? 'text-right' : 'text-left'}`}>
                {t(feature.descKey)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
