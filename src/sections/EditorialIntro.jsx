import { motion } from 'framer-motion'
import { useT } from '@/i18n/useI18n'

// Magazine-style opener: a single oversized italic serif pull-quote
// + a byline + one paragraph of body. Replaces the trust-tile
// cluster that's typical of SaaS heroes.

export function EditorialIntro() {
  const t = useT()
  return (
    <section className="relative bg-[#F1F7FA] text-[#0F172A]">
      <div className="max-w-[1100px] mx-auto px-5 md:px-12 py-24 md:py-36">
        <div className="grid md:grid-cols-12 gap-10 md:gap-16 items-start">
          {/* Left rail — eyebrow */}
          <div className="md:col-span-3">
            <motion.div
              initial={{ opacity: 0, x: -8 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="label-caps text-[#475569] mb-2">{t('intro.eyebrow')}</div>
              <div className="serif italic text-[14px] text-[#64748B]">N° 01</div>
            </motion.div>
          </div>

          {/* Right — the quote + body */}
          <div className="md:col-span-9">
            <motion.blockquote
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
              className="pull-quote text-[clamp(28px,4.4vw,52px)] text-[#0F172A] mb-8"
            >
              <span className="serif-italic text-[#0EA5E9] mr-1">"</span>
              {t('intro.quote')}
              <span className="serif-italic text-[#0EA5E9] ml-1">"</span>
            </motion.blockquote>

            <motion.div
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="serif italic text-[14px] text-[#475569] mb-10"
            >
              {t('intro.byline')}
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8, delay: 0.25 }}
              className="drop-cap text-[17px] md:text-[18px] leading-[1.7] text-[#1E293B] max-w-[640px]"
            >
              {t('intro.body')}
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  )
}
