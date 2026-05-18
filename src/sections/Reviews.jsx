import { useState } from 'react'
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useT } from '@/i18n/useI18n'
import { Reveal } from '@/motion/primitives'
import { REVIEWS } from '@/data/content'
import { SectionHeader } from './Experiences'

export function Reviews() {
  const t = useT()
  const [idx, setIdx] = useState(0)
  const total = REVIEWS.length

  const go = (delta) => setIdx(i => (i + delta + total) % total)

  return (
    <section className="relative py-24 md:py-32 px-5 md:px-8 border-t border-white/5 bg-[#0A1612]">
      <div className="relative max-w-[1280px] mx-auto">
        <Reveal>
          <SectionHeader
            eyebrow={t('reviews.eyebrow')}
            title={t('reviews.title')}
            sub={t('reviews.sub')}
            centered
          />
        </Reveal>

        <Reveal delay={0.1} className="mt-12 max-w-[820px] mx-auto">
          <div className="relative">
            {/* Slide */}
            <div className="card-premium with-sheen min-h-[280px] !p-8 md:!p-12 text-center">
              <Quote size={28} className="text-emerald-400/50 mx-auto mb-5" />
              <AnimatePresence mode="wait">
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  <p className="text-[16px] md:text-[19px] text-white leading-relaxed">
                    {t(REVIEWS[idx].quoteKey)}
                  </p>
                  <div className="mt-6 flex flex-col items-center gap-2">
                    <div className="flex gap-0.5">
                      {Array.from({ length: REVIEWS[idx].rating }).map((_, i) => (
                        <Star key={i} size={14} className="text-emerald-400 fill-emerald-400" />
                      ))}
                    </div>
                    <div className="text-[12px] text-white/65">
                      {REVIEWS[idx].name} · {REVIEWS[idx].country} · {new Date(REVIEWS[idx].date).toLocaleDateString()}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Controls */}
            <div className="mt-6 flex items-center justify-center gap-3">
              <button onClick={() => go(-1)}
                aria-label="Previous review"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 text-white/80 hover:text-white hover:bg-white/10 flex items-center justify-center transition-colors">
                <ChevronLeft size={16} />
              </button>
              <div className="flex items-center gap-1.5">
                {REVIEWS.map((_, i) => (
                  <button key={i} onClick={() => setIdx(i)}
                    aria-label={`Go to review ${i + 1}`}
                    className={`h-1.5 rounded-full transition-all ${
                      i === idx ? 'w-8 bg-emerald-400' : 'w-1.5 bg-white/15 hover:bg-white/30'
                    }`} />
                ))}
              </div>
              <button onClick={() => go(1)}
                aria-label="Next review"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 text-white/80 hover:text-white hover:bg-white/10 flex items-center justify-center transition-colors">
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </Reveal>

        {/* Aggregate proof */}
        <Reveal delay={0.2} className="mt-10 flex items-center justify-center gap-6 flex-wrap text-[12px] text-white/55">
          <div className="flex items-center gap-2">
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => <Star key={i} size={12} className="text-emerald-400 fill-emerald-400" />)}
            </div>
            <span>4.9 average rating</span>
          </div>
          <span className="opacity-30">·</span>
          <span>300+ five-star reviews on TripAdvisor + Google</span>
        </Reveal>
      </div>
    </section>
  )
}
