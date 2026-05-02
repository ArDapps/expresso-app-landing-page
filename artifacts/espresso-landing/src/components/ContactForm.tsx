import React from 'react';
import { useLanguage } from '@/lib/i18n';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export function ContactForm() {
  const { t, isRtl } = useLanguage();

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl sm:text-4xl font-bold mb-4"
            >
              {t('contactHeading')}
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-card border border-border p-8 rounded-3xl shadow-sm"
          >
            <form action="https://formsubmit.co/mrbeboteam@gmail.com" method="POST" className="space-y-6">
              {/* Hidden fields for FormSubmit */}
              <input type="hidden" name="_subject" value="Message from Espresso Landing Page" />
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="_next" value="" />

              <div className="space-y-2">
                <label htmlFor="name" className={`block text-sm font-medium text-foreground ${isRtl ? 'text-right' : 'text-left'}`}>
                  {t('contactName')}
                </label>
                <Input 
                  id="name" 
                  name="name" 
                  required 
                  className={`bg-background ${isRtl ? 'text-right' : 'text-left'}`} 
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className={`block text-sm font-medium text-foreground ${isRtl ? 'text-right' : 'text-left'}`}>
                  {t('contactEmail')}
                </label>
                <Input 
                  id="email" 
                  name="email" 
                  type="email" 
                  required 
                  className={`bg-background ${isRtl ? 'text-right' : 'text-left'}`} 
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className={`block text-sm font-medium text-foreground ${isRtl ? 'text-right' : 'text-left'}`}>
                  {t('contactMessage')}
                </label>
                <Textarea 
                  id="message" 
                  name="message" 
                  rows={5} 
                  required 
                  className={`bg-background resize-none ${isRtl ? 'text-right' : 'text-left'}`} 
                />
              </div>

              <Button type="submit" size="lg" className="w-full font-semibold text-md h-12 bg-primary hover:bg-primary/90">
                {t('contactSubmit')}
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
