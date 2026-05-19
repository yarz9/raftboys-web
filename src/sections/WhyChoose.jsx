import { motion } from 'framer-motion'
import { useT } from '@/i18n/useI18n'
import { IMG } from '@/data/assets'

// Editorial split: a sticky photograph on one side, four numbered
// reasons scrolling beside it on the other. No card grid.

const REASONS = ['safety', 'certified', 'lunch', 'honest']

export function WhyChoose() {
  const t = useT()
  return (
    <section className="relative bg-[#F1F7FA] text-[#0F172A] py-24 md:py-36">
      <div className="max-w-[1320px] mx-auto px-5 md:px-12">

        {/* Header */}
        <div className="grid md:grid-cols-12 gap-10 mb-16 md:mb-24">
          <div className="md:col-span-3">
            <div className="label-caps text-[#475569] mb-2">{t('why.eyebrow')}</div>
          </div>
          <div className="md:col-span-9">
            <h2 className="serif text-[clamp(36px,6vw,80px)] font-medium leading-[1.02] tracking-tight">
              {t('why.title')}{' '}
              <span className="serif-italic font-light text-[#0284C7]">{t('why.title.italic')}</span>
            </h2>
            <p className="serif italic text-[19px] md:text-[21px] text-[#334155] mt-6 max-w-[640px] leading-[1.45]">
              {t('why.lead')}
            </p>
          </div>
        </div>

        {/* Sticky photo on left, numbered list on right */}
        <div className="grid md:grid-cols-12 gap-10 md:gap-16">
          {/* Sticky image */}
          <div className="md:col-span-5 hidden md:block">
            <div className="sticky-figure frame">
              <img
                src={IMG.gallery[4]}
                alt=""
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover"
              />
              {/* Caption stripe */}
              <div className="absolute bottom-0 left-0 right-0 px-5 py-4 bg-gradient-to-t from-[#0F172A]/85 to-transparent">
                <div className="label-caps text-[#67E8F9]">№ Field shot</div>
                <div className="serif italic text-[14px] text-[#F1F7FA]">The light just before the lunch beach</div>
              </div>
            </div>
          </div>

          {/* Mobile-only inline image */}
          <div className="md:hidden frame">
            <div className="aspect-[4/3] overflow-hidden">
              <img src={IMG.gallery[4]} alt="" loading="lazy"
                className="w-full h-full object-cover" />
            </div>
          </div>

          {/* Reasons */}
          <ol className="md:col-span-7 space-y-12 md:space-y-16">
            {REASONS.map((key, i) => (
              <motion.li
                key={key}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.05 * i }}
              >
                <div className="flex items-baseline gap-5">
                  <span className="serif italic text-[#0EA5E9] text-[24px] md:text-[28px] font-medium select-none">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div className="flex-1">
                    <h3 className="serif text-[clamp(22px,2.6vw,32px)] font-medium leading-[1.15] mb-3">
                      {t(`why.${key}.t`)}
                    </h3>
                    <p className="text-[15px] md:text-[16px] leading-[1.7] text-[#475569] max-w-[560px]">
                      {t(`why.${key}.d`)}
                    </p>
                  </div>
                </div>
                <div className="ml-12 md:ml-14 mt-7 h-px bg-[#0F172A]/10" />
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
