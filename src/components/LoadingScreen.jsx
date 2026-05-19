// Editorial concept-preview overlay. Warm paper background, serif
// wordmark, slow horizontal "water-line" indicator instead of the
// usual progress bar. Fades out after window.load (+ 1.2s min,
// 2.6s hard cap). Respects prefers-reduced-motion.

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
      setTimeout(() => { if (!cancelled) setShow(false) }, Math.max(0, minMs - elapsed))
    }
    if (document.readyState === 'complete') finish()
    else window.addEventListener('load', finish, { once: true })
    const cap = setTimeout(finish, reduce ? 600 : 2600)
    return () => { cancelled = true; clearTimeout(cap); window.removeEventListener('load', finish) }
  }, [reduce])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="rb-loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduce ? 0.05 : 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center px-6"
          style={{
            background: 'radial-gradient(circle at 30% 30%, #F1F7FA 0%, #CFDBE4 60%, #BAE6FD 100%)',
          }}
          role="status"
          aria-live="polite"
        >
          {/* Faint serif RAFT BOYS watermark in the corner */}
          <span className="absolute top-6 left-6 serif italic text-[14px] text-[#475569]/50">Raft Boys</span>
          <span className="absolute top-6 right-6 label-caps text-[#475569]/60">Est. 1999</span>

          <div className="text-center max-w-[540px]">
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduce ? 0.05 : 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="label-caps text-[#475569]"
            >
              {t('loading.brand')}
            </motion.div>

            {/* Subtle water-line: an SVG sine slowly drifting */}
            <div className="mt-6 mx-auto w-[220px] h-[28px] overflow-hidden opacity-90" aria-hidden="true">
              <svg viewBox="0 0 220 28" className="w-full h-full">
                <motion.path
                  d="M0,14 Q27.5,4 55,14 T110,14 T165,14 T220,14"
                  stroke="#0284C7" strokeWidth="1.5" fill="none" strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: reduce ? 0.05 : 1.4, ease: 'easeInOut' }}
                />
                {!reduce && (
                  <motion.circle
                    cx="0" cy="14" r="2.5" fill="#0284C7"
                    animate={{ cx: [0, 220], cy: [14, 6, 14, 22, 14] }}
                    transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                  />
                )}
              </svg>
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: reduce ? 0.05 : 0.7, delay: reduce ? 0 : 0.35 }}
              className="mt-4 serif italic text-[16px] text-[#475569]"
            >
              {t('loading.sub')}
            </motion.p>
          </div>

          <span className="absolute bottom-6 left-6 right-6 text-center label-caps text-[#475569]/50">
            cloz.digital
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
