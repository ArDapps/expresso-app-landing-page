import React from 'react';
import { useLanguage } from '@/lib/i18n';

export function Footer() {
  const { isRtl } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-card py-12">
      <div className="container mx-auto px-4 sm:px-6">
        <div className={`flex flex-col md:flex-row items-center justify-between gap-6 ${isRtl ? 'md:flex-row-reverse' : ''}`}>
          <div className={`flex items-center gap-3 ${isRtl ? 'flex-row-reverse' : ''}`}>
            <img 
              src="https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/35/af/72/35af7266-1879-2c24-5eb2-b045552a382b/AppIcon-0-0-1x_U007epad-0-1-85-220.png/1200x630wa.png" 
              alt="Espresso App Icon" 
              className="w-8 h-8 rounded-lg shadow-sm grayscale"
            />
            <span className="font-semibold text-muted-foreground">Espresso</span>
          </div>
          
          <div className="text-sm text-muted-foreground">
            &copy; {year} Bahaa Taha. {isRtl ? 'جميع الحقوق محفوظة.' : 'All rights reserved.'}
          </div>
        </div>
      </div>
    </footer>
  );
}
