// CLOZ.DIGITAL PREVIEW loading screen — shown on initial site load
// only. Fades out after critical assets are ready or 1.4s, whichever
// is later. Respects prefers-reduced-motion.

import { useEffect, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { useT } from '@/i18n/useI18n'

export function LoadingScreen() {
  const t = useT()
  const reduce = useReducedMotion()
  const [show, setShow] = useState(true)

  useEffect(() => {
    const minMs = reduce ? 200 : 1200
    const start = performance.now()
    let cancelled = false

    const finish = () => {
      const elapsed = performance.now() - start
      const wait = Math.max(0, minMs - elapsed)
      setTimeout(() => { if (!cancelled) setShow(false) }, wait)
    }

    if (document.readyState === 'complete') finish()
    else window.addEventListener('load', finish, { once: true })

    // Hard cap so a hung asset never blocks UI
    const cap = setTimeout(finish, reduce ? 600 : 2400)

    return () => { cancelled = true; clearTimeout(cap); window.removeEventListener('load', finish) }
  }, [reduce])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="loading"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduce ? 0.05 : 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[100] bg-[#06100D] flex items-center justify-center px-6"
          role="status"
          aria-live="polite"
        >
          {/* Ambient glow */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full"
              style={{ background: 'radial-gradient(circle, rgba(16,185,129,0.18) 0%, transparent 60%)' }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
            />
            <motion.div
              className="absolute top-1/3 right-1/4 w-[400px] h-[400px] rounded-full"
              style={{ background: 'radial-gradient(circle, rgba(20,184,180,0.18) 0%, transparent 60%)' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.4, delay: 0.15 }}
            />
          </div>

          <div className="relative flex flex-col items-center text-center">
            {/* Wordmark — animated */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduce ? 0.05 : 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="mb-4"
            >
              <div className="flex items-center gap-2.5">
                <ClozLogo />
                <span className="font-display font-bold text-[18px] tracking-[0.18em] uppercase text-white">
                  {t('loading.brand')}
                </span>
              </div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduce ? 0.05 : 0.7, delay: reduce ? 0 : 0.2 }}
              className="text-[13px] text-[#B4CDC2] max-w-[420px]"
            >
              {t('loading.sub')}
            </motion.p>

            {/* Pulsing thin bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: reduce ? 0 : 0.4, duration: 0.4 }}
              className="mt-6 w-[180px] h-[2px] rounded-full bg-white/5 overflow-hidden"
            >
              {!reduce && (
                <motion.div
                  className="h-full bg-gradient-to-r from-transparent via-[#10B981] to-transparent"
                  initial={{ x: '-100%' }}
                  animate={{ x: '100%' }}
                  transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
                />
              )}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Inline SVG monogram — replace with real Cloz Digital mark when ready.
function ClozLogo() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="clz-g" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
          <stop stopColor="#10B981" />
          <stop offset="0.5" stopColor="#14B8B4" />
          <stop offset="1" stopColor="#06B6D4" />
        </linearGradient>
      </defs>
      <path
        d="M12 2.5C6.75 2.5 2.5 6.75 2.5 12s4.25 9.5 9.5 9.5c4.6 0 8.43-3.27 9.31-7.62"
        stroke="url(#clz-g)" strokeWidth="2.4" strokeLinecap="round" fill="none"
      />
    </svg>
  )
}
