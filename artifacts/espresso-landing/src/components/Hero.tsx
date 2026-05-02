import React from 'react';
import { useLanguage } from '@/lib/i18n';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, ArrowLeft } from 'lucide-react';

export function Hero() {
  const { t, isRtl } = useLanguage();

  return (
    <section className="relative overflow-hidden pt-24 pb-32 sm:pt-32 sm:pb-40 lg:pb-48">
      {/* Background blobs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-3xl -z-10 pointer-events-none opacity-50" />
      
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          
          {/* Text Content */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex-1 text-center lg:text-start"
          >
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary font-medium text-sm mb-6 ${isRtl ? 'flex-row-reverse' : ''}`}>
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              {isRtl ? 'متوفر الآن على iOS' : 'Available now on iOS'}
            </div>
            
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-foreground mb-6 leading-[1.1]">
              {t('heroHeadline')}
            </h1>
            
            <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto lg:mx-0">
              {t('heroSubheadline')}
            </p>
            
            <div className={`flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start ${isRtl ? 'sm:flex-row-reverse lg:justify-end' : ''}`}>
              <a 
                href="https://apps.apple.com/eg/app/espresso-messages-for-whatsapp/id1331369255" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full sm:w-auto"
              >
                <Button size="lg" className="w-full h-14 px-8 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-lg shadow-lg hover:shadow-xl transition-all">
                  {t('cta')}
                </Button>
              </a>
            </div>
          </motion.div>
          
          {/* Visual / Mockup */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex-1 flex justify-center lg:justify-end relative"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent rounded-full blur-3xl -z-10" />
            <div className="w-[280px] sm:w-[320px] iphone-mockup shadow-2xl rotate-[-2deg] hover:rotate-0 transition-transform duration-500">
              <img 
                src="https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/3d/7d/fa/3d7dfad9-d806-2681-45ef-391be6d8b5a6/pr_source.png/460x996bb.jpg" 
                alt="Espresso App Screenshot" 
                className="w-full h-auto object-cover"
              />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
