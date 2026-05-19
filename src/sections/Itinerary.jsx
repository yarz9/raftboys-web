import { motion } from 'framer-motion'
import { useT } from '@/i18n/useI18n'
import { IMG } from '@/data/assets'
import { WaveDivider } from '@/components/WaveDivider'

// Magazine itinerary: six numbered stages of a day on the river,
// alternating image-left / image-right, with an oversized italic
// numeral acting as the structural anchor for each row. Replaces
// the SaaS-style horizontal timeline.

const STEPS = [
  { id: 1, key: 'itin.1', image: IMG.gallery[6] },
  { id: 2, key: 'itin.2', image: IMG.gallery[1] },
  { id: 3, key: 'itin.3', image: IMG.gallery[7] },
  { id: 4, key: 'itin.4', image: IMG.expRafting },
  { id: 5, key: 'itin.5', image: IMG.gallery[2] },
  { id: 6, key: 'itin.6', image: IMG.gallery[3] },
]

export function Itinerary() {
  const t = useT()
  return (
    <section id="itinerary" className="relative bg-[#0F172A] text-[#F1F7FA]">
      <WaveDivider variant="curve" fill="paper" flip height={100} />

      <div className="max-w-[1320px] mx-auto px-5 md:px-12 py-24 md:py-36">
        {/* Section header */}
        <div className="grid md:grid-cols-12 gap-10 mb-16 md:mb-20">
          <div className="md:col-span-3">
            <div className="label-caps text-[#67E8F9]">{t('itin.eyebrow')}</div>
          </div>
          <div className="md:col-span-9">
            <h2 className="serif text-[clamp(34px,5.8vw,76px)] font-medium leading-[1.02] tracking-tight">
              {t('itin.title')}{' '}
              <span className="serif-italic font-light text-[#67E8F9]">{t('itin.title.italic')}</span>
            </h2>
          </div>
        </div>

        {/* Steps */}
        <ol className="space-y-20 md:space-y-32">
          {STEPS.map((step, i) => {
            const flip = i % 2 === 1
            return (
              <li key={step.id} className="grid md:grid-cols-12 gap-8 md:gap-14 items-center">
                {/* Image */}
                <motion.div
                  initial={{ opacity: 0, x: flip ? 28 : -28 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                  className={`md:col-span-7 frame ${flip ? 'md:order-2' : ''}`}
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img src={step.image} alt={t(`${step.key}.t`)} loading="lazy"
                      className="w-full h-full object-cover" />
                  </div>
                </motion.div>

                {/* Text + numeral */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
                  className={`md:col-span-5 relative ${flip ? 'md:order-1 md:pr-4' : 'md:pl-4'}`}
                >
                  {/* Oversized italic numeral, decorative */}
                  <div aria-hidden className="numeral mb-2 select-none">
                    {String(step.id).padStart(2, '0')}
                  </div>

                  <h3 className="serif text-[clamp(24px,3vw,38px)] font-medium leading-tight mb-3">
                    {t(`${step.key}.t`)}
                  </h3>

                  <p className="text-[15px] md:text-[16px] leading-[1.7] text-[#F1F7FA]/80 max-w-[480px]">
                    {t(`${step.key}.d`)}
                  </p>

                  {/* Bottom rule */}
                  <div className="mt-6 w-12 h-px bg-[#67E8F9]/60" />
                </motion.div>
              </li>
            )
          })}
        </ol>
      </div>

      <WaveDivider variant="wave" fill="paper" height={100} />
    </section>
  )
}
