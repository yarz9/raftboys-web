import { motion, useReducedMotion } from 'framer-motion'
import { ArrowDown, ArrowRight, Sparkles } from 'lucide-react'
import { useT } from '@/i18n/useI18n'
import { MagneticButton, CountUp } from '@/motion/primitives'
import { IMG } from '@/data/assets'

export function Hero() {
  const t = useT()
  const reduce = useReducedMotion()

  const stagger = {
    hidden: { opacity: 1 },
    show: { opacity: 1, transition: { staggerChildren: reduce ? 0 : 0.08, delayChildren: reduce ? 0 : 0.1 } },
  }
  const item = reduce
    ? { hidden: { opacity: 1 }, show: { opacity: 1 } }
    : { hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } } }

  return (
    <section id="top" className="relative min-h-[100svh] flex items-center overflow-hidden">
      {/* ── Cinematic background ── */}
      <div className="absolute inset-0">
        {IMG.heroVideo ? (
          <video
            autoPlay muted loop playsInline preload="metadata"
            poster={IMG.heroPoster}
            className="w-full h-full object-cover"
          >
            <source src={IMG.heroVideo} type="video/mp4" />
          </video>
        ) : (
          <motion.img
            src={IMG.heroPoster}
            alt=""
            className="w-full h-full object-cover"
            initial={{ scale: 1.08 }}
            animate={{ scale: 1 }}
            transition={{ duration: reduce ? 0 : 2.4, ease: 'easeOut' }}
          />
        )}
        {/* Dark cinematic gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#06100D]/30 via-[#06100D]/55 to-[#06100D]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#06100D]/70 via-transparent to-transparent" />
        {/* Accent ambient glow */}
        <motion.div
          className="absolute -top-32 -right-20 w-[800px] h-[800px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(16,185,129,0.18) 0%, transparent 60%)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.6, delay: 0.2 }}
        />
      </div>

      {/* ── Content ── */}
      <div className="relative max-w-[1280px] mx-auto w-full px-5 md:px-8 pt-28 pb-20">
        <motion.div variants={stagger} initial="hidden" animate="show" className="max-w-[820px]">
          <motion.div variants={item} className="chip mb-6">
            <Sparkles size={11} />
            <span>{t('hero.eyebrow')}</span>
          </motion.div>

          <motion.h1 variants={item} className="font-display font-bold leading-[1.04] tracking-tight text-white text-[44px] sm:text-[58px] md:text-[78px]">
            {t('hero.h1.a')}<br />
            <span className="text-gradient">{t('hero.h1.b')}</span>
          </motion.h1>

          <motion.p variants={item} className="mt-7 text-[16px] md:text-[18px] text-white/75 leading-relaxed max-w-[620px]">
            {t('hero.sub')}
          </motion.p>

          <motion.div variants={item} className="mt-10 flex flex-col sm:flex-row gap-3">
            <MagneticButton href="#booking" className="btn-primary no-underline">
              {t('hero.cta.primary')}
              <ArrowRight size={15} />
            </MagneticButton>
            <MagneticButton href="#packages" className="btn-ghost no-underline" pullStrength={0.18}>
              {t('hero.cta.secondary')}
            </MagneticButton>
          </motion.div>

          {/* Trust badges */}
          <motion.div variants={item} className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-[720px]">
            <TrustTile label={t('hero.trust.years')}   sub={t('hero.trust.years.sub')}   accent />
            <TrustTile label={<><CountUp to={300} />+</>} sub={t('hero.trust.reviews.sub')} />
            <TrustTile label={t('hero.trust.guides')}  sub={t('hero.trust.guides.sub')} />
            <TrustTile label={t('hero.trust.lunch')}   sub={t('hero.trust.lunch.sub')} />
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll cue */}
      {!reduce && (
        <motion.a href="#trust"
          aria-label="Scroll"
          className="hidden md:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-1.5 text-white/55 hover:text-white"
          initial={{ opacity: 0 }} animate={{ opacity: 0.65 }} transition={{ delay: 1.2, duration: 0.6 }}
        >
          <span className="text-[10px] uppercase tracking-[0.25em]">{t('hero.scroll')}</span>
          <motion.span animate={{ y: [0, 6, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}>
            <ArrowDown size={14} />
          </motion.span>
        </motion.a>
      )}
    </section>
  )
}

function TrustTile({ label, sub, accent }) {
  return (
    <div className="glass rounded-xl px-4 py-3">
      <div className={`font-display font-bold text-[18px] leading-none ${accent ? 'text-gradient' : 'text-white'}`}>
        {label}
      </div>
      <div className="text-[11px] text-white/55 mt-1.5 leading-tight">{sub}</div>
    </div>
  )
}
