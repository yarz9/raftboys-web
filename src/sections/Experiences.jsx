import { ArrowUpRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { useT } from '@/i18n/useI18n'
import { IMG } from '@/data/assets'

const ITEMS = [
  { key: 'rafting',   image: IMG.expRafting,   duration: '3.5 h', priceFrom: 65, big: true },
  { key: 'canoeing',  image: IMG.expCanoeing,  duration: '2.5 h', priceFrom: 45 },
  { key: 'hiking',    image: IMG.expHiking,    duration: 'Full day', priceFrom: 75 },
  { key: 'weekend',   image: IMG.expPackages,  duration: '2 days', priceFrom: 180 },
]

export function Experiences() {
  const t = useT()
  return (
    <section id="experiences" className="relative bg-[#F1F7FA] text-[#0F172A] pt-8 pb-24 md:pb-32">
      <div className="max-w-[1320px] mx-auto px-5 md:px-12">
        {/* Section header — editorial, left-aligned */}
        <motion.div
          initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="flex items-end justify-between gap-6 flex-wrap mb-12 md:mb-16 pt-16"
        >
          <div className="max-w-[700px]">
            <div className="label-caps text-[#475569] mb-3">{t('exp.eyebrow')}</div>
            <h2 className="serif text-[clamp(34px,5.6vw,72px)] font-medium leading-[1.02] tracking-tight">
              {t('exp.title')}
            </h2>
          </div>
        </motion.div>

        {/* Asymmetric grid: one hero card + three stacked small ones */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 md:gap-7">
          {/* Hero feature */}
          <FeatureCard item={ITEMS[0]} large t={t} className="lg:col-span-7 lg:row-span-2" />

          {/* Three small */}
          <FeatureCard item={ITEMS[1]} t={t} className="lg:col-span-5" />
          <FeatureCard item={ITEMS[2]} t={t} className="lg:col-span-5" />
          <FeatureCard item={ITEMS[3]} t={t} className="lg:col-span-12 lg:flex-row-card" />
        </div>
      </div>
    </section>
  )
}

function FeatureCard({ item, large = false, className = '', t }) {
  const isWide = className.includes('lg:col-span-12')

  return (
    <motion.a
      href="#booking"
      initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`group relative block frame no-underline text-[#0F172A] ${className}`}
    >
      <div className={`relative overflow-hidden ${
        large ? 'aspect-[4/5] md:aspect-[5/6]'
        : isWide ? 'aspect-[3/1] hidden md:block'
        : 'aspect-[5/4]'
      }`}>
        <img
          src={item.image}
          alt={t(`exp.${item.key}.t`)}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/85 via-[#0F172A]/15 to-transparent" />

        {/* Top-left index */}
        <span className="absolute top-4 left-4 md:top-5 md:left-5 label-caps text-[#F1F7FA]/90">
          N° {String(ITEMS.findIndex(i => i.key === item.key) + 1).padStart(2, '0')}
        </span>

        {/* Bottom block — title, body, tags */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-[#F1F7FA]">
          <h3 className={`serif font-medium leading-[1.05] tracking-tight ${
            large ? 'text-[clamp(28px,4vw,46px)]' : 'text-[clamp(22px,2.4vw,30px)]'
          }`}>
            {t(`exp.${item.key}.t`)}
          </h3>
          <p className={`mt-3 text-[#F1F7FA]/85 leading-relaxed max-w-[520px] ${large ? 'text-[15px]' : 'text-[13.5px]'}`}>
            {t(`exp.${item.key}.d`)}
          </p>

          <div className="mt-5 flex items-center gap-3 flex-wrap">
            <span className="tag on-deep">
              <span className="serif italic text-[#67E8F9]">⌛</span> {item.duration}
            </span>
            <span className="tag on-deep">
              <span className="serif italic text-[#67E8F9]">{t('exp.from')}</span> €{item.priceFrom}
            </span>
            <span className="ml-auto inline-flex items-center justify-center w-9 h-9 rounded-full bg-[#F1F7FA] text-[#0F172A] transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
              <ArrowUpRight size={15} />
            </span>
          </div>
        </div>
      </div>

      {/* For the wide bottom card on mobile, show a vertical version */}
      {isWide && (
        <div className="md:hidden relative aspect-[5/4] overflow-hidden">
          <img
            src={item.image}
            alt={t(`exp.${item.key}.t`)}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/85 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 text-[#F1F7FA]">
            <h3 className="serif text-[24px] font-medium leading-tight">{t(`exp.${item.key}.t`)}</h3>
            <p className="mt-2 text-[13px] text-[#F1F7FA]/85">{t(`exp.${item.key}.d`)}</p>
          </div>
        </div>
      )}
    </motion.a>
  )
}

// Compatibility shim for legacy sections (Gallery/Timeline/Packages/Map/FAQ/Booking)
// that still import { SectionHeader }. Editorial header on cool-paper.
export function SectionHeader({ eyebrow, title, sub }) {
  return (
    <div className="grid md:grid-cols-12 gap-8 mb-10">
      <div className="md:col-span-3">
        <div className="label-caps text-[#0284C7]">{eyebrow}</div>
      </div>
      <div className="md:col-span-9">
        <h2 className="serif text-[clamp(30px,5vw,60px)] font-medium leading-[1.05] tracking-tight">
          {title}
        </h2>
        {sub && <p className="serif italic text-[17px] text-[#475569] mt-4 max-w-[640px]">{sub}</p>}
      </div>
    </div>
  )
}
