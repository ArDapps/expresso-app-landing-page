"use client";

import React from 'react';
import { useLanguage } from '@/lib/i18n';
import { motion } from 'framer-motion';

export function BusinessCallout() {
  const { t, isRtl } = useLanguage();

  return (
    <section className="py-24 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-5xl font-bold mb-6"
          >
            {t('businessCalloutHeading')}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl opacity-90 leading-relaxed mb-10"
          >
            {t('businessCalloutText')}
          </motion.p>
        </div>
      </div>
    </section>
  );
}
