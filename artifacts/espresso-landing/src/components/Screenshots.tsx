import React from 'react';
import { useLanguage } from '@/lib/i18n';
import { motion } from 'framer-motion';

export function Screenshots() {
  const { t } = useLanguage();

  const screenshots = [
    "https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/3d/7d/fa/3d7dfad9-d806-2681-45ef-391be6d8b5a6/pr_source.png/460x996bb.jpg",
    "https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/7a/93/62/7a93626c-05c8-2f46-a577-67e903cf66ed/pr_source.png/460x996bb.jpg",
    "https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/9f/68/c9/9f68c955-4005-870a-19c3-24aa6a67a57e/pr_source.png/460x996bb.jpg",
    "https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/84/32/1b/84321bdd-c491-e61f-e07a-b25b4b33de6e/pr_source.png/460x996bb.jpg",
    "https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/2f/d6/e5/2fd6e5a3-2090-7011-9328-fd5669f4c2dc/pr_source.png/460x996bb.jpg"
  ];

  return (
    <section className="py-24 bg-muted/30 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl font-bold mb-4"
          >
            {t('screenshotsHeading')}
          </motion.h2>
        </div>

        {/* CSS-only infinite horizontal scroll or flex wrap */}
        <div className="flex justify-center flex-wrap gap-8">
          {screenshots.map((src, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="w-[240px] shrink-0"
            >
              <div className="iphone-mockup shadow-xl transition-transform hover:-translate-y-2 duration-300">
                <img src={src} alt={`App Screenshot ${idx + 1}`} className="w-full h-auto object-cover" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
