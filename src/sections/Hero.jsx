import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useT } from '@/i18n/useI18n'
import { IMG } from '@/data/assets'

// Hero — full-bleed cinematic photo, slow horizontal drift, serif
// headline with an italic stress word. No magnetic CTAs, no trust
// tile cluster — those move to the editorial intro that follows.

export function Hero() {
  const t = useT()
  const reduce = useReducedMotion()

  return (
    <section id="top" className="relative min-h-[100svh] flex items-end overflow-hidden bg-[#0F172A] text-[#F1F7FA]">
      {/* Layered background */}
      <div className="absolute inset-0">
        <div className={`absolute inset-0 ${reduce ? '' : 'drift'}`}>
          <img
            src={IMG.heroPoster}
            alt=""
            className="w-full h-full object-cover scale-110"
            loading="eager"
            fetchpriority="high"
          />
        </div>
        {/* Editorial gradient: dark bottom, soft top, vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-[#0F172A]/55 to-[#0F172A]/15" />
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#0F172A]/60 to-transparent" />
      </div>

      {/* Top-left dateline (editorial signature) */}
      <div className="absolute top-24 left-5 md:left-12 z-10 max-w-[420px]">
        <motion.div
          initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="label-caps text-[#67E8F9] mb-2"
        >
          {t('hero.locale')}
        </motion.div>
      </div>

      {/* Headline + CTA block, anchored bottom-left */}
      <div className="relative w-full max-w-[1320px] mx-auto px-5 md:px-12 pb-20 md:pb-28 z-10">
        <motion.h1
          initial={reduce ? {} : { opacity: 0, y: 24 }}
          animate={reduce ? {} : { opacity: 1, y: 0 }}
          transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          className="serif font-medium text-[clamp(48px,9vw,128px)] leading-[0.95] tracking-tight max-w-[1100px]"
        >
          <span>{t('hero.h1.a')}</span>{' '}<br className="hidden md:block" />
          <span>{t('hero.h1.b')}</span>{' '}
          <span className="serif-italic font-light text-[#67E8F9]">{t('hero.h1.italic')}</span>
        </motion.h1>

        <motion.p
          initial={reduce ? {} : { opacity: 0, y: 16 }}
          animate={reduce ? {} : { opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="mt-7 text-[15px] md:text-[17px] leading-relaxed text-[#F1F7FA]/80 max-w-[560px]"
        >
          {t('hero.sub')}
        </motion.p>

        <motion.div
          initial={reduce ? {} : { opacity: 0, y: 12 }}
          animate={reduce ? {} : { opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.55 }}
          className="mt-9 flex flex-col sm:flex-row items-start gap-4"
        >
          <a href="#booking" className="btn-river no-underline">
            {t('hero.cta')} <ArrowRight size={16} />
          </a>
          <a href="#experiences" className="link-arrow on-deep no-underline pr-7">
            {t('hero.cta.alt')} <ArrowRight size={14} />
          </a>
        </motion.div>
      </div>

      {/* Bottom corner marks (editorial trim) */}
      <span aria-hidden className="absolute bottom-6 right-6 hidden md:block label-caps text-[#F1F7FA]/40">
        № 01 — Raft Boys, Konjic
      </span>
    </section>
  )
}
