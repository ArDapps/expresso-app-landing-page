"use client";

import React, { useEffect, useState, useRef } from 'react';
import { useLanguage } from '@/lib/i18n';
import { motion, AnimatePresence, useInView } from 'framer-motion';

const RECIPIENTS = [
  { num: '+20 10 1234 5678', name: 'Ahmed' },
  { num: '+44 7911 123456', name: 'Sarah' },
  { num: '+1 415 555 0198', name: 'James' },
  { num: '+971 50 123 4567', name: 'Layla' },
  { num: '+49 170 1234567', name: 'Lukas' },
];

const MESSAGE_EN = "Hi! Just checking in — hope you're having a great day 👋";
const MESSAGE_AR = 'مرحباً! فقط أتحقق منك — أتمنى أن يكون يومك رائعاً 👋';

type Phase = 'idle' | 'typing-msg' | 'adding-recipients' | 'sending' | 'done' | 'pause';

function Orb({ x, y, size, delay, opacity = 0.18 }: { x: string; y: string; size: number; delay: number; opacity?: number }) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        left: x, top: y, width: size, height: size,
        background: `rgba(37,211,102,${opacity})`,
        filter: 'blur(70px)',
      }}
      animate={{ y: [0, -16, 0], opacity: [opacity * 0.7, opacity * 1.4, opacity * 0.7] }}
      transition={{ duration: 6 + delay, repeat: Infinity, delay, ease: 'easeInOut' }}
    />
  );
}

function CheckCircle({ show }: { show: boolean }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 400, damping: 20 }}
          className="flex-shrink-0 w-5 h-5 rounded-full bg-primary flex items-center justify-center"
        >
          <svg viewBox="0 0 12 10" fill="none" className="w-3 h-3">
            <path d="M1 5l3.5 3.5L11 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function BroadcastVisual({ playing }: { playing: boolean }) {
  const { isRtl, t } = useLanguage();
  const [phase, setPhase] = useState<Phase>('idle');
  const [typedMsg, setTypedMsg] = useState('');
  const [visibleRecipients, setVisibleRecipients] = useState<number>(0);
  const [sentSet, setSentSet] = useState<Set<number>>(new Set());
  const [progress, setProgress] = useState(0);

  const message = isRtl ? MESSAGE_AR : MESSAGE_EN;

  useEffect(() => {
    if (!playing) return;
    setPhase('typing-msg');
    setTypedMsg('');
    setVisibleRecipients(0);
    setSentSet(new Set());
    setProgress(0);
  }, [playing]);

  // Typing the message char by char
  useEffect(() => {
    if (phase !== 'typing-msg') return;
    if (typedMsg.length < message.length) {
      const t = setTimeout(() => setTypedMsg(message.slice(0, typedMsg.length + 1)), 28);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => setPhase('adding-recipients'), 400);
      return () => clearTimeout(t);
    }
  }, [phase, typedMsg, message]);

  // Add recipients one by one
  useEffect(() => {
    if (phase !== 'adding-recipients') return;
    if (visibleRecipients < RECIPIENTS.length) {
      const t = setTimeout(() => setVisibleRecipients(v => v + 1), 260);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => setPhase('sending'), 500);
      return () => clearTimeout(t);
    }
  }, [phase, visibleRecipients]);

  // Send to each recipient with staggered delay
  useEffect(() => {
    if (phase !== 'sending') return;
    const timers: ReturnType<typeof setTimeout>[] = [];
    RECIPIENTS.forEach((_, i) => {
      timers.push(setTimeout(() => {
        setSentSet(prev => new Set([...prev, i]));
        setProgress(Math.round(((i + 1) / RECIPIENTS.length) * 100));
      }, i * 350));
    });
    timers.push(setTimeout(() => setPhase('done'), RECIPIENTS.length * 350 + 300));
    return () => timers.forEach(clearTimeout);
  }, [phase]);

  // Restart after pause
  useEffect(() => {
    if (phase !== 'done') return;
    const t = setTimeout(() => setPhase('pause'), 2500);
    return () => clearTimeout(t);
  }, [phase]);

  useEffect(() => {
    if (phase !== 'pause') return;
    const t = setTimeout(() => {
      setPhase('typing-msg');
      setTypedMsg('');
      setVisibleRecipients(0);
      setSentSet(new Set());
      setProgress(0);
    }, 800);
    return () => clearTimeout(t);
  }, [phase]);

  const isSending = phase === 'sending' || phase === 'done';
  const isDone = phase === 'done';

  return (
    <div className="w-full max-w-[360px] mx-auto lg:mx-0 space-y-3 select-none">

      {/* Message compose box */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-card border border-border rounded-2xl p-4 shadow-xl"
      >
        <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-2 font-semibold">
          {t('multiSendLabel1')}
        </p>
        <div className="text-sm text-foreground leading-relaxed min-h-[44px]">
          {typedMsg}
          {phase === 'typing-msg' && (
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
              className="inline-block w-0.5 h-4 bg-primary rounded ml-0.5 align-middle"
            />
          )}
        </div>
      </motion.div>

      {/* Recipients list */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.65 }}
        className="bg-card border border-border rounded-2xl p-4 shadow-xl"
      >
        <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-3 font-semibold">
          {t('multiSendLabel2')}
        </p>
        <div className="space-y-2">
          {RECIPIENTS.map((r, i) => (
            <AnimatePresence key={r.num}>
              {i < visibleRecipients && (
                <motion.div
                  initial={{ opacity: 0, x: -16, height: 0 }}
                  animate={{ opacity: 1, x: 0, height: 'auto' }}
                  transition={{ type: 'spring', stiffness: 300, damping: 28 }}
                  className="flex items-center gap-2.5"
                >
                  {/* Avatar */}
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold text-white flex-shrink-0"
                    style={{ background: `hsl(${(i * 67) % 360} 60% 45%)` }}
                  >
                    {r.name[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-foreground leading-none">{r.name}</p>
                    <p className="text-[11px] text-muted-foreground font-mono mt-0.5">{r.num}</p>
                  </div>
                  {/* Sent status */}
                  <div className="flex items-center gap-1 flex-shrink-0">
                    {isSending && !sentSet.has(i) && (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                        className="w-4 h-4 rounded-full border-2 border-primary border-t-transparent"
                      />
                    )}
                    <CheckCircle show={sentSet.has(i)} />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          ))}
        </div>

        {/* Progress bar + Send button */}
        <AnimatePresence>
          {isSending && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 pt-3 border-t border-border"
            >
              {/* Progress bar */}
              <div className="h-1.5 bg-border rounded-full overflow-hidden mb-2">
                <motion.div
                  className="h-full bg-primary rounded-full"
                  initial={{ width: '0%' }}
                  animate={{ width: `${progress}%` }}
                  transition={{ ease: 'easeOut', duration: 0.3 }}
                />
              </div>
              <div className={`flex items-center justify-between text-[11px] ${isRtl ? 'flex-row-reverse' : ''}`}>
                <span className="text-muted-foreground">
                  {isDone ? t('multiSendDone') : t('multiSendSending')}
                </span>
                <span className={`font-semibold ${isDone ? 'text-primary' : 'text-muted-foreground'}`}>
                  {sentSet.size}/{RECIPIENTS.length}
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Done burst */}
      <AnimatePresence>
        {isDone && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300 }}
            className="flex items-center justify-center gap-2 py-2"
          >
            <span className="text-primary font-bold text-sm">{t('multiSendDone')}</span>
            <motion.span
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{ duration: 0.5, repeat: 2 }}
              className="text-lg"
            >
              🎉
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function MultiSend() {
  const { t, isRtl } = useLanguage();
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: false, margin: '-10% 0px' });
  const [playKey, setPlayKey] = useState(0);
  const wasInView = useRef(false);

  useEffect(() => {
    if (inView && !wasInView.current) {
      wasInView.current = true;
      setPlayKey(k => k + 1);
    }
    if (!inView) wasInView.current = false;
  }, [inView]);

  return (
    <section ref={ref} className="relative overflow-hidden py-16 sm:py-24">
      {/* Background orbs */}
      <Orb x="70%" y="0%" size={320} delay={0} opacity={0.13} />
      <Orb x="-5%" y="40%" size={260} delay={1.2} opacity={0.10} />
      <Orb x="50%" y="70%" size={200} delay={0.5} opacity={0.09} />

      {/* Subtle dot grid */}
      <div
        className="absolute inset-0 -z-10 opacity-[0.025]"
        style={{
          backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className={`flex flex-col lg:flex-row items-center gap-12 lg:gap-20 ${isRtl ? 'lg:flex-row-reverse' : ''}`}>

          {/* ── Text side ── */}
          <motion.div
            initial={{ opacity: 0, x: isRtl ? 30 : -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-8%' }}
            transition={{ duration: 0.65 }}
            className="flex-1 text-center lg:text-start"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, type: 'spring', stiffness: 260, damping: 20 }}
              className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary font-semibold text-xs mb-5 ${isRtl ? 'flex-row-reverse' : ''}`}
            >
              {/* Broadcast icon */}
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
                <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
              </svg>
              {t('multiSendBadge')}
            </motion.div>

            {/* Heading */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground mb-5 leading-[1.1]"
            >
              {t('multiSendHeading')}
            </motion.h2>

            {/* Subtext */}
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.55 }}
              className="text-base sm:text-lg text-muted-foreground mb-8 max-w-lg mx-auto lg:mx-0 leading-relaxed"
            >
              {t('multiSendSub')}
            </motion.p>

            {/* Feature pills */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className={`flex flex-wrap gap-2 justify-center lg:justify-start mb-8 ${isRtl ? 'lg:justify-end' : ''}`}
            >
              {[
                { icon: '⚡', en: 'Instant delivery', ar: 'تسليم فوري' },
                { icon: '📋', en: 'Paste any list', ar: 'الصق أي قائمة' },
                { icon: '✅', en: 'Live status', ar: 'حالة مباشرة' },
                { icon: '🔒', en: 'No contacts saved', ar: 'لا حفظ للأرقام' },
              ].map(p => (
                <span
                  key={p.en}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-card border border-border text-xs font-medium text-foreground"
                >
                  <span>{p.icon}</span>
                  {isRtl ? p.ar : p.en}
                </span>
              ))}
            </motion.div>

            {/* CTA */}
            <motion.a
              href="https://apps.apple.com/eg/app/espresso-messages-for-whatsapp/id1331369255"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className={`inline-flex items-center gap-2 px-7 py-3 rounded-full bg-primary text-primary-foreground font-semibold text-sm shadow-lg shadow-primary/30 hover:shadow-primary/50 hover:bg-primary/90 hover:scale-[1.03] active:scale-[0.97] transition-all ${isRtl ? 'flex-row-reverse' : ''}`}
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
              </svg>
              {t('multiSendCta')}
            </motion.a>
          </motion.div>

          {/* ── Animated visual side ── */}
          <motion.div
            initial={{ opacity: 0, x: isRtl ? -30 : 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-8%' }}
            transition={{ delay: 0.25, duration: 0.7 }}
            className="flex-1 w-full flex justify-center lg:justify-end relative"
          >
            {/* Glow ring */}
            <div className="absolute inset-0 rounded-3xl bg-primary/5 blur-3xl scale-110 -z-10" />

            {/* Floating "bulk" badge */}
            <motion.div
              className="absolute -top-5 right-4 lg:-right-4 bg-card border border-border rounded-xl px-3 py-2 shadow-xl flex items-center gap-2 text-xs font-semibold z-20"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1, y: [0, -6, 0] }}
              transition={{ delay: 0.8, duration: 4, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
            >
              <span className="text-primary font-bold text-sm">{RECIPIENTS.length}</span>
              <span className="text-muted-foreground">{isRtl ? 'رسائل دفعة واحدة' : 'messages at once'}</span>
            </motion.div>

            {/* Floating "time saved" badge */}
            <motion.div
              className="absolute -bottom-4 left-2 lg:-left-6 bg-card border border-border rounded-xl px-3 py-2 shadow-xl flex items-center gap-2 text-xs font-semibold z-20"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1, y: [0, -5, 0] }}
              transition={{ delay: 1.4, duration: 5, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
            >
              <span>⏱️</span>
              <span className="text-muted-foreground">{isRtl ? 'وفّر ساعات من وقتك' : 'Save hours of work'}</span>
            </motion.div>

            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
              className="w-full"
            >
              <BroadcastVisual key={playKey} playing={inView} />
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
