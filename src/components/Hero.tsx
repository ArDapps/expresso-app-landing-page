"use client";

import React, { useEffect, useState } from 'react';
import { useLanguage } from '@/lib/i18n';
import { motion, AnimatePresence, useMotionValue, useTransform, animate } from 'framer-motion';
import { Button } from '@/components/ui/button';

const ANDROID_APK_URL = '#android-apk';

function AppleIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 shrink-0">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
    </svg>
  );
}

function AndroidIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 shrink-0">
      <path d="M6 18c0 .55.45 1 1 1h1v3.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5V19h2v3.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5V19h1c.55 0 1-.45 1-1V8H6v10zM3.5 8C2.67 8 2 8.67 2 9.5v7c0 .83.67 1.5 1.5 1.5S5 17.33 5 16.5v-7C5 8.67 4.33 8 3.5 8zm17 0c-.83 0-1.5.67-1.5 1.5v7c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5v-7c0-.83-.67-1.5-1.5-1.5zm-4.97-5.84l1.3-1.3c.2-.2.2-.51 0-.71-.2-.2-.51-.2-.71 0l-1.48 1.48C13.85 1.23 12.95 1 12 1c-.96 0-1.86.23-2.66.63L7.85.15c-.2-.2-.51-.2-.71 0-.2.2-.2.51 0 .71l1.31 1.31C6.97 3.26 6 5.01 6 7h12c0-1.99-.97-3.75-2.47-4.84zM10 5H9V4h1v1zm5 0h-1V4h1v1z" />
    </svg>
  );
}

const PHONE_NUMBERS = ['+20 10 1234 5678', '+1 415 555 0198', '+44 7911 123456', '+971 50 123 4567'];

function TypingFlow() {
  const { isRtl } = useLanguage();
  const [phase, setPhase] = useState<'typing' | 'sending' | 'chat'>('typing');
  const [typed, setTyped] = useState('');
  const [numIdx, setNumIdx] = useState(0);
  const target = PHONE_NUMBERS[numIdx];

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    if (phase === 'typing') {
      if (typed.length < target.length) {
        timeout = setTimeout(() => setTyped(target.slice(0, typed.length + 1)), 60);
      } else {
        timeout = setTimeout(() => setPhase('sending'), 700);
      }
    } else if (phase === 'sending') {
      timeout = setTimeout(() => setPhase('chat'), 500);
    } else {
      timeout = setTimeout(() => {
        setPhase('typing');
        setTyped('');
        setNumIdx(i => (i + 1) % PHONE_NUMBERS.length);
      }, 2200);
    }

    return () => clearTimeout(timeout);
  }, [phase, typed, target]);

  return (
    <div className="relative w-full max-w-[340px] mx-auto lg:mx-0 select-none">
      {/* Input box */}
      <motion.div
        className="bg-card border border-border rounded-2xl p-4 shadow-xl"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-2 font-semibold">
          {isRtl ? 'رقم الهاتف' : 'Phone Number'}
        </p>
        <div className="flex items-center gap-2 font-mono text-sm text-foreground min-h-[24px]">
          <span className="text-primary opacity-60 text-base">+</span>
          <span>{typed}</span>
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
            className="inline-block w-0.5 h-4 bg-primary rounded"
          />
        </div>

        {/* Send button */}
        <motion.div
          className="mt-3 flex justify-end"
          animate={phase === 'sending' ? { scale: [1, 0.92, 1] } : {}}
          transition={{ duration: 0.2 }}
        >
          <div
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-300 ${
              phase !== 'typing'
                ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/30'
                : 'bg-primary/20 text-primary'
            }`}
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
            </svg>
            {isRtl ? 'إرسال' : 'Send'}
          </div>
        </motion.div>
      </motion.div>

      {/* Arrow connecting box to bubble */}
      <AnimatePresence>
        {phase === 'chat' && (
          <motion.div
            initial={{ opacity: 0, scaleY: 0 }}
            animate={{ opacity: 1, scaleY: 1 }}
            exit={{ opacity: 0 }}
            className="flex justify-center my-2"
            style={{ originY: 0 }}
          >
            <motion.div
              animate={{ y: [0, 4, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="flex flex-col items-center gap-0.5"
            >
              <div className="w-0.5 h-5 bg-primary/40 rounded" />
              <svg viewBox="0 0 10 6" className="w-2.5 h-2.5 text-primary/60 fill-current">
                <path d="M0 0l5 6 5-6z" />
              </svg>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat bubbles */}
      <AnimatePresence>
        {phase === 'chat' && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 300, damping: 24 }}
            className="bg-card border border-border rounded-2xl p-4 shadow-xl space-y-2"
          >
            {/* WhatsApp-style chat header */}
            <div className="flex items-center gap-2 border-b border-border pb-2 mb-3">
              <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-primary">
                  <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
                </svg>
              </div>
              <div>
                <p className="text-xs font-semibold text-foreground leading-none">{typed}</p>
                <p className="text-[10px] text-primary mt-0.5">{isRtl ? 'عبر واتساب' : 'via WhatsApp'}</p>
              </div>
            </div>

            {/* Outgoing bubble */}
            <motion.div
              initial={{ opacity: 0, x: isRtl ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className={`flex ${isRtl ? 'justify-start' : 'justify-end'}`}
            >
              <div className="bg-primary text-primary-foreground text-xs px-3 py-1.5 rounded-2xl rounded-br-sm max-w-[80%] shadow-sm">
                {isRtl ? 'مرحباً!' : 'Hey there!'}
                <span className="ml-2 text-primary-foreground/60 text-[10px]">✓✓</span>
              </div>
            </motion.div>

            {/* Incoming bubble */}
            <motion.div
              initial={{ opacity: 0, x: isRtl ? 20 : -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className={`flex ${isRtl ? 'justify-end' : 'justify-start'}`}
            >
              <div className="bg-muted text-foreground text-xs px-3 py-1.5 rounded-2xl rounded-bl-sm max-w-[80%] shadow-sm">
                {isRtl ? 'أهلاً! كيف يمكنني المساعدة؟' : 'Hi! How can I help?'}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* Floating orb */
function Orb({ x, y, size, delay, color }: { x: string; y: string; size: number; delay: number; color: string }) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{ left: x, top: y, width: size, height: size, background: color, filter: 'blur(60px)' }}
      animate={{ y: [0, -18, 0], opacity: [0.25, 0.45, 0.25] }}
      transition={{ duration: 5 + delay, repeat: Infinity, delay, ease: 'easeInOut' }}
    />
  );
}

/* Floating badge */
function FloatingBadge({ children, delay, className }: { children: React.ReactNode; delay: number; className?: string }) {
  return (
    <motion.div
      className={`absolute bg-card/90 border border-border backdrop-blur-sm rounded-2xl px-3 py-2 shadow-xl flex items-center gap-2 text-xs font-semibold pointer-events-none ${className}`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1, y: [0, -6, 0] }}
      transition={{ delay, duration: 4, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
    >
      {children}
    </motion.div>
  );
}

export function Hero() {
  const { t, isRtl } = useLanguage();

  return (
    <section className="relative overflow-hidden pt-16 pb-20 sm:pt-24 sm:pb-32 lg:pb-40">
      {/* Background orbs */}
      <Orb x="10%" y="10%" size={300} delay={0} color="rgba(37,211,102,0.18)" />
      <Orb x="60%" y="5%" size={250} delay={1.5} color="rgba(37,211,102,0.12)" />
      <Orb x="75%" y="55%" size={200} delay={0.8} color="rgba(37,211,102,0.15)" />
      <Orb x="5%" y="60%" size={180} delay={2} color="rgba(37,211,102,0.10)" />

      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 -z-10 opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

          {/* ── Left: Text ── */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65 }}
            className="flex-1 text-center lg:text-start w-full"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, type: 'spring', stiffness: 260, damping: 20 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary font-semibold text-xs mb-6"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
              </span>
              {isRtl ? 'iOS مدفوع • APK أندرويد مجاني' : 'iOS App • Free Android APK'}
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight text-foreground mb-5 leading-[1.08]"
            >
              {t('heroHeadline')}
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.55 }}
              className="text-base sm:text-lg text-muted-foreground mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed"
            >
              {t('heroSubheadline')}
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 justify-center lg:justify-start"
            >
              <a
                href="https://apps.apple.com/eg/app/espresso-messages-for-whatsapp/id1331369255"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto"
              >
                <Button
                  size="lg"
                  className="w-full h-12 px-6 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-sm shadow-lg shadow-primary/30 hover:shadow-primary/50 hover:scale-[1.02] active:scale-[0.98] transition-all gap-2"
                >
                  <AppleIcon />
                  {t('cta')}
                </Button>
              </a>
              <a
                href={ANDROID_APK_URL}
                download
                className="w-full sm:w-auto relative"
              >
                <span className="absolute -top-2.5 right-4 z-10 bg-primary text-primary-foreground text-[9px] font-black px-1.5 py-0.5 rounded-full tracking-widest uppercase shadow">
                  FREE
                </span>
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full h-12 px-6 rounded-full border-border hover:bg-muted text-foreground font-semibold text-sm transition-all gap-2"
                >
                  <AndroidIcon />
                  Android APK
                </Button>
              </a>
            </motion.div>

            {/* Social proof strip */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.75 }}
              className={`mt-8 flex items-center gap-3 justify-center lg:justify-start ${isRtl ? 'flex-row-reverse lg:justify-end' : ''}`}
            >
              <div className="flex -space-x-2">
                {['#25D366', '#128C7E', '#075E54', '#34B7F1', '#DCF8C6'].map((bg, i) => (
                  <div
                    key={i}
                    className="w-7 h-7 rounded-full border-2 border-background flex items-center justify-center text-[9px] font-bold text-white"
                    style={{ background: bg }}
                  >
                    {['A', 'M', 'S', 'R', 'K'][i]}
                  </div>
                ))}
              </div>
              <p className="text-xs text-muted-foreground">
                {isRtl ? 'يستخدمه آلاف المستخدمين يومياً' : 'Loved by thousands of users'}
              </p>
            </motion.div>
          </motion.div>

          {/* ── Right: Animated Visual ── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="flex-1 flex justify-center lg:justify-end relative w-full"
          >
            <div className="relative w-full max-w-[380px]">

              {/* Floating badge: WhatsApp Business */}
              <FloatingBadge delay={0.9} className="-top-4 -left-2 lg:-left-8 z-20">
                <div className="w-5 h-5 rounded-full bg-[#128C7E] flex items-center justify-center shrink-0">
                  <svg viewBox="0 0 24 24" fill="white" className="w-3 h-3">
                    <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
                  </svg>
                </div>
                <span className="text-foreground">WhatsApp Business</span>
                <span className="text-primary font-bold">✓</span>
              </FloatingBadge>

              {/* Floating badge: Clipboard */}
              <FloatingBadge delay={1.4} className="-bottom-4 -right-2 lg:-right-6 z-20">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-primary shrink-0">
                  <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z" />
                </svg>
                <span className="text-foreground">{isRtl ? 'كشف تلقائي' : 'Auto-detected'}</span>
              </FloatingBadge>

              {/* Main animated flow */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                className="relative z-10"
              >
                <TypingFlow />
              </motion.div>

              {/* Glow ring behind the card */}
              <div className="absolute inset-0 -z-10 rounded-3xl bg-primary/5 blur-2xl scale-110" />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
