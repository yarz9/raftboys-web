import { motion } from 'framer-motion'
import { useT } from '@/i18n/useI18n'

// One enormous editorial pull-quote, surrounded by three smaller
// supporting quotes in the margins. No carousel, no cards, no
// "300+ five-star reviews" KPI — that fact gets a quiet bottom-rail.

export function Reviews() {
  const t = useT()
  return (
    <section className="relative bg-[#0F172A] text-[#F1F7FA] overflow-hidden">
      {/* Top wave */}
      <svg viewBox="0 0 1440 80" preserveAspectRatio="none" aria-hidden="true"
        className="block w-full" style={{ height: 100, transform: 'scaleY(-1)' }}>
        <path d="M0,0 C480,80 960,80 1440,0 L1440,80 L0,80 Z" fill="#F1F7FA" />
      </svg>

      <div className="max-w-[1240px] mx-auto px-5 md:px-12 py-24 md:py-36">

        <div className="label-caps text-[#67E8F9] text-center mb-10">
          {t('rev.eyebrow')}
        </div>

        {/* The big quote */}
        <motion.figure
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-[1080px] mx-auto"
        >
          {/* Decorative open quote */}
          <div className="serif text-[#0EA5E9] text-[120px] md:text-[180px] leading-[0.5] mb-2 select-none" aria-hidden>"</div>

          <blockquote className="pull-quote text-[clamp(32px,5.4vw,68px)] leading-[1.12] tracking-tight text-[#F1F7FA]">
            {t('rev.big.text')}
          </blockquote>

          <figcaption className="mt-10">
            <div className="serif italic text-[18px] text-[#F1F7FA]">{t('rev.big.author')}</div>
            <div className="label-caps text-[#67E8F9] mt-1 text-[10px]">{t('rev.big.where')}</div>
          </figcaption>
        </motion.figure>

        {/* Supporting trio — small column blockquotes */}
        <div className="mt-24 md:mt-32 grid md:grid-cols-3 gap-10 md:gap-14 max-w-[1100px] mx-auto">
          {[
            { q: 'rev.q1', w: 'rev.q1.who' },
            { q: 'rev.q2', w: 'rev.q2.who' },
            { q: 'rev.q3', w: 'rev.q3.who' },
          ].map((r, i) => (
            <motion.figure key={i}
              initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: 0.1 * i }}
              className="border-l-2 border-[#0EA5E9]/40 pl-5"
            >
              <blockquote className="serif italic text-[16px] md:text-[17px] leading-[1.5] text-[#F1F7FA]/90">
                {t(r.q)}
              </blockquote>
              <figcaption className="mt-3 label-caps text-[#67E8F9]">{t(r.w)}</figcaption>
            </motion.figure>
          ))}
        </div>

        {/* Tally rail */}
        <div className="mt-24 md:mt-32 flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6 text-center">
          <span className="serif text-[36px] md:text-[44px] text-[#67E8F9] leading-none">
            {t('rev.tally.score')}
          </span>
          <span aria-hidden className="hidden md:block w-px h-8 bg-[#F1F7FA]/30" />
          <span className="serif italic text-[15px] md:text-[16px] text-[#F1F7FA]/70">
            {t('rev.tally.note')}
          </span>
        </div>
      </div>

      {/* Bottom wave */}
      <svg viewBox="0 0 1440 80" preserveAspectRatio="none" aria-hidden="true"
        className="block w-full" style={{ height: 100 }}>
        <path d="M0,0 C480,80 960,80 1440,0 L1440,80 L0,80 Z" fill="#F1F7FA" />
      </svg>
    </section>
  )
}
