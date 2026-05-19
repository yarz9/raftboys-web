import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { useT } from '@/i18n/useI18n'
import { IMG } from '@/data/assets'

// Editorial vertical comparison — three image+specs rows stacked.
// Replaces the SaaS 3-card floating layout.

const PACKAGES = [
  { key: 'classic',    priceFrom: 65,  image: IMG.gallery[0], featured: false },
  { key: 'premium',    priceFrom: 95,  image: IMG.gallery[1], featured: true  },
  { key: 'expedition', priceFrom: 180, image: IMG.gallery[5], featured: false },
]

export function Packages() {
  const t = useT()
  return (
    <section id="packages" className="relative bg-[#F1F7FA] text-[#0F172A] py-24 md:py-36">
      <div className="max-w-[1280px] mx-auto px-5 md:px-12">
        <div className="grid md:grid-cols-12 gap-10 mb-16 md:mb-20">
          <div className="md:col-span-3">
            <div className="label-caps text-[#0284C7]">{t('pkg.eyebrow')}</div>
          </div>
          <div className="md:col-span-9">
            <h2 className="serif text-[clamp(34px,5.8vw,76px)] font-medium leading-[1.02] tracking-tight">
              {t('pkg.title')}{' '}
              <span className="serif-italic font-light text-[#0EA5E9]">{t('pkg.title.italic')}</span>
            </h2>
            <p className="serif italic text-[18px] md:text-[20px] text-[#475569] mt-6 max-w-[640px] leading-[1.45]">
              {t('pkg.lead')}
            </p>
          </div>
        </div>

        <ol className="space-y-16 md:space-y-20">
          {PACKAGES.map((p, i) => (
            <motion.li
              key={p.key}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="grid md:grid-cols-12 gap-8 md:gap-12 items-center"
            >
              <div className={`md:col-span-6 frame ${i % 2 === 1 ? 'md:order-2' : ''}`}>
                <div className="aspect-[5/4] overflow-hidden relative">
                  <img src={p.image} alt={t(`pkg.${p.key}.t`)} loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-[1200ms] hover:scale-[1.03]" />
                  {p.featured && (
                    <span className="absolute top-4 left-4 label-caps bg-[#0EA5E9] text-white px-3 py-1.5 rounded-full text-[10px]">
                      {t('pkg.favourite')}
                    </span>
                  )}
                </div>
              </div>

              <div className={`md:col-span-6 ${i % 2 === 1 ? 'md:order-1 md:pr-6' : 'md:pl-6'}`}>
                <div className="serif italic text-[#0284C7] text-[22px] md:text-[26px] leading-none mb-3 select-none">
                  №&nbsp;0{i + 1}
                </div>
                <h3 className="serif text-[clamp(26px,3.4vw,42px)] font-medium leading-tight tracking-tight">
                  {t(`pkg.${p.key}.t`)}
                </h3>
                <div className="label-caps text-[#475569] mt-3 text-[11px]">
                  {t(`pkg.${p.key}.dur`)}
                </div>
                <p className="text-[15px] md:text-[16px] leading-[1.7] text-[#334155] mt-5 max-w-[520px]">
                  {t(`pkg.${p.key}.inc`)}
                </p>
                <p className="serif italic text-[14px] text-[#64748B] mt-4 max-w-[520px]">
                  {t(`pkg.${p.key}.who`)}
                </p>

                <div className="mt-8 flex items-center gap-6 flex-wrap">
                  <div>
                    <div className="label-caps text-[#64748B] text-[10px]">{t('pkg.from')}</div>
                    <div className="serif text-[40px] md:text-[48px] font-medium leading-none text-[#0F172A] mt-1">
                      €{p.priceFrom}
                      <span className="serif italic text-[14px] text-[#64748B] ml-1">/ person</span>
                    </div>
                  </div>
                  <a href="#booking" className="btn-river ml-auto md:ml-0">
                    {t('pkg.cta')} <ArrowUpRight size={16} />
                  </a>
                </div>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  )
}
