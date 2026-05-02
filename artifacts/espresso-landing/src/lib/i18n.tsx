"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'ar';

type Dictionary = {
  [key: string]: {
    en: string;
    ar: string;
  }
};

export const dict: Dictionary = {
  heroHeadline: {
    en: "Message Anyone on WhatsApp — No Contact Needed",
    ar: "راسل أي شخص على واتساب — بدون حفظ الرقم"
  },
  heroSubheadline: {
    en: "Espresso lets you open a WhatsApp conversation with any phone number, instantly. No saving. No hassle.",
    ar: "إسبريسو يفتح لك محادثة واتساب مع أي رقم هاتف فوراً. بدون حفظ. بدون تعقيد."
  },
  cta: {
    en: "Download on the App Store",
    ar: "حمّل من App Store"
  },
  ctaAndroid: {
    en: "Free APK for Android",
    ar: "APK مجاني لأندرويد"
  },
  multiSendHeading: {
    en: "Send to Many. Save No One.",
    ar: "أرسل للجميع. بدون حفظ أي رقم."
  },
  multiSendSub: {
    en: "Paste a list of numbers, write your message once, and Espresso blasts it across every WhatsApp conversation in seconds.",
    ar: "الصق قائمة أرقام، اكتب رسالتك مرة واحدة، وإسبريسو يرسلها لجميع المحادثات فوراً."
  },
  multiSendBadge: {
    en: "Multi-Send",
    ar: "إرسال جماعي"
  },
  multiSendCta: {
    en: "Get on the App Store",
    ar: "احصل عليه من App Store"
  },
  multiSendLabel1: {
    en: "Your message",
    ar: "رسالتك"
  },
  multiSendLabel2: {
    en: "Recipients",
    ar: "المستلمون"
  },
  multiSendSending: {
    en: "Sending…",
    ar: "جارٍ الإرسال…"
  },
  multiSendDone: {
    en: "All delivered!",
    ar: "تم التسليم بالكامل!"
  },
  featuresHeading: {
    en: "Everything You Need",
    ar: "كل ما تحتاجه"
  },
  howItWorksHeading: {
    en: "How It Works",
    ar: "كيف يعمل"
  },
  screenshotsHeading: {
    en: "See It in Action",
    ar: "شاهده في العمل"
  },
  contactHeading: {
    en: "Get in Touch",
    ar: "تواصل معنا"
  },
  businessCalloutHeading: {
    en: "Works With Business",
    ar: "متوافق مع الأعمال"
  },
  businessCalloutText: {
    en: "Whether you use normal WhatsApp or WhatsApp Business, Espresso works perfectly with both. Switching between them is just a tap away.",
    ar: "سواء كنت تستخدم واتساب العادي أو واتساب للأعمال، إسبريسو يعمل بشكل مثالي مع كليهما. التبديل بينهما يتم بنقرة واحدة."
  },
  contactName: {
    en: "Name",
    ar: "الاسم"
  },
  contactEmail: {
    en: "Email",
    ar: "البريد الإلكتروني"
  },
  contactMessage: {
    en: "Message",
    ar: "الرسالة"
  },
  contactNamePlaceholder: {
    en: "Enter your full name",
    ar: "أدخل اسمك بالكامل"
  },
  contactEmailPlaceholder: {
    en: "Enter your email address",
    ar: "أدخل بريدك الإلكتروني"
  },
  contactMessagePlaceholder: {
    en: "How can we help you?",
    ar: "كيف يمكننا مساعدتك؟"
  },
  contactSubmit: {
    en: "Send Message",
    ar: "إرسال الرسالة"
  },
  footerPrivacy: {
    en: "Privacy Policy",
    ar: "سياسة الخصوصية"
  },
  footerTerms: {
    en: "Terms of Service",
    ar: "شروط الخدمة"
  },
  footerContact: {
    en: "Contact",
    ar: "اتصل بنا"
  },
  footerDescription: {
    en: "The fastest way to message anyone on WhatsApp without saving their number.",
    ar: "أسرع طريقة لمراسلة أي شخص على واتساب بدون حفظ رقمه."
  },
  feature1Title: {
    en: "Message without saving",
    ar: "راسل بدون حفظ"
  },
  feature1Desc: {
    en: "Type or paste any phone number and open a WhatsApp chat instantly.",
    ar: "اكتب أو الصق أي رقم وافتح محادثة واتساب فوراً."
  },
  feature2Title: {
    en: "WhatsApp & Business",
    ar: "واتساب وبيزنس"
  },
  feature2Desc: {
    en: "Fully compatible with both WhatsApp and WhatsApp Business.",
    ar: "يعمل مع واتساب العادي وواتساب بيزنس."
  },
  feature3Title: {
    en: "Smart clipboard detection",
    ar: "اكتشاف ذكي للحافظة"
  },
  feature3Desc: {
    en: "Copy any number and Espresso instantly offers to open a chat.",
    ar: "انسخ أي رقم وسيعرض إسبريسو فتح محادثة فوراً."
  },
  feature4Title: {
    en: "Message yourself",
    ar: "راسل نفسك"
  },
  feature4Desc: {
    en: "Save links, images, and notes to your own WhatsApp chat.",
    ar: "احفظ روابط وصور وملاحظات في محادثتك الخاصة."
  },
  feature5Title: {
    en: "One tap, instant chat",
    ar: "نقرة واحدة، محادثة فورية"
  },
  feature5Desc: {
    en: "No steps, no friction. Just tap and start chatting.",
    ar: "لا خطوات، لا تعقيد. فقط انقر وابدأ."
  },
  feature6Title: {
    en: "Multi-Send to many",
    ar: "إرسال جماعي للكثيرين"
  },
  feature6Desc: {
    en: "Paste a list of numbers and send your message to all of them at once — no contacts needed.",
    ar: "الصق قائمة أرقام وأرسل رسالتك للجميع دفعة واحدة — بدون حفظ أي جهة اتصال."
  },
  step1Title: {
    en: "1. Copy any number",
    ar: "1. انسخ أي رقم"
  },
  step1Desc: {
    en: "From your call log, a text message, or a website.",
    ar: "من سجل المكالمات، رسالة نصية، أو موقع إلكتروني."
  },
  step2Title: {
    en: "2. Open Espresso",
    ar: "2. افتح إسبريسو"
  },
  step2Desc: {
    en: "Espresso automatically detects the copied number.",
    ar: "إسبريسو يكتشف الرقم المنسوخ تلقائياً."
  },
  step3Title: {
    en: "3. Start Chatting",
    ar: "3. ابدأ المحادثة"
  },
  step3Desc: {
    en: "One tap opens a direct WhatsApp chat with that number.",
    ar: "نقرة واحدة تفتح محادثة واتساب مباشرة مع ذلك الرقم."
  }
};

type LanguageContextType = {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => string;
  isRtl: boolean;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Language>('en');

  useEffect(() => {
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang]);

  const t = (key: string): string => {
    const entry = dict[key];
    if (!entry) return key;
    return entry[lang];
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, isRtl: lang === 'ar' }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
