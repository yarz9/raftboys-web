import { motion } from 'framer-motion'
import { ArrowUpRight, Check, ShieldCheck } from 'lucide-react'
import { useT } from '@/i18n/useI18n'
import { IMG } from '@/data/assets'

// Four real Raft Boys offerings with the prices that appear on
// raftboys.ba. Image per package matches the activity in the copy.

const PACKAGES = [
  {
    key: 'rafting',
    priceFrom: 50,
    image: IMG.expRafting,           // whitewater action shot
    featured: true,                  // rafting is their flagship
    features: ['pickup', 'briefing', 'gear', 'lunch', 'photos'],
  },
  {
    key: 'canoe',
    priceFrom: 50,
    image: IMG.expCanoeing,          // canoe / calm-water shot
    featured: false,
    features: ['pickup', 'briefing', 'gear', 'photos'],
  },
  {
    key: 'hiking',
    priceFrom: 45,
    image: IMG.expHiking,            // Prenj mountain shot
    featured: false,
    features: ['pickup', 'briefing', 'hike', 'photos'],
  },
  {
    key: 'special',
    priceFrom: null,                 // contact for pricing
    image: IMG.expPackages,          // expedition / lifestyle shot
    featured: false,
    features: ['pickup', 'briefing', 'gear', 'hike', 'lodging', 'two_meals', 'photos'],
  },
]

export function Packages() {
  const t = useT()
  return (
    <section id="packages" className="relative bg-[#F1F7FA] text-[#0F172A] py-24 md:py-36">
      <div className="max-w-[1280px] mx-auto px-5 md:px-12">
        {/* Header */}
        <div className="grid md:grid-cols-12 gap-10 mb-16 md:mb-20">
          <div className="md:col-span-3">
            <div className="label-caps text-[#0284C7]">{t('pkg.eyebrow')}</div>
          </div>
          <div className="md:col-span-9">
            <h2 className="serif text-[clamp(36px,6vw,80px)] font-medium leading-[1.02] tracking-tight">
              {t('pkg.title')}{' '}
              <span className="serif-italic font-light text-[#0EA5E9]">{t('pkg.title.italic')}</span>
            </h2>
            <p className="serif italic text-[19px] md:text-[21px] text-[#334155] mt-6 max-w-[680px] leading-[1.45]">
              {t('pkg.lead')}
            </p>
          </div>
        </div>

        {/* Three rows */}
        <ol className="space-y-20 md:space-y-28">
          {PACKAGES.map((p, i) => (
            <motion.li
              key={p.key}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
              className="grid md:grid-cols-12 gap-8 md:gap-14 items-center"
            >
              {/* Image */}
              <div className={`md:col-span-6 frame group relative ${i % 2 === 1 ? 'md:order-2' : ''}`}>
                <div className="aspect-[5/4] overflow-hidden">
                  <img src={p.image} alt={t(`pkg.${p.key}.t`)} loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.04]" />
                </div>
                {p.featured && (
                  <span className="absolute top-5 left-5 inline-flex items-center gap-1.5 bg-[#0EA5E9] text-white px-3.5 py-1.5 rounded-full text-[10.5px] font-bold tracking-[0.18em] uppercase shadow-[0_8px_24px_-8px_rgba(14,165,233,0.7)]">
                    ★ {t('pkg.featured')}
                  </span>
                )}
                <span className="absolute bottom-5 left-5 serif italic text-[#67E8F9] text-[15px] bg-[#0F172A]/55 backdrop-blur-sm px-3 py-1.5 rounded-sm">
                  №&nbsp;0{i + 1}
                </span>
              </div>

              {/* Specs */}
              <div className={`md:col-span-6 ${i % 2 === 1 ? 'md:order-1 md:pr-6' : 'md:pl-6'}`}>
                <h3 className="serif text-[clamp(28px,3.6vw,46px)] font-medium leading-[1.05] tracking-tight">
                  {t(`pkg.${p.key}.t`)}
                </h3>
                <div className="label-caps text-[#0284C7] mt-3 text-[11px]">
                  {t(`pkg.${p.key}.dur`)}
                </div>
                <p className="serif italic text-[16px] text-[#475569] mt-4 max-w-[520px] leading-[1.55]">
                  {t(`pkg.${p.key}.who`)}
                </p>

                {/* Feature checklist */}
                <ul className="mt-6 grid sm:grid-cols-2 gap-x-5 gap-y-2.5 max-w-[560px]">
                  {p.features.map(f => (
                    <li key={f} className="flex items-start gap-2.5 text-[14.5px] text-[#334155] leading-[1.45]">
                      <span className="mt-1 w-4 h-4 rounded-full bg-[#0EA5E9]/12 border border-[#0EA5E9]/30 flex items-center justify-center shrink-0">
                        <Check size={10} className="text-[#0284C7]" strokeWidth={3} />
                      </span>
                      {t(`pkg.feat.${f}`)}
                    </li>
                  ))}
                </ul>

                {/* Price + CTA */}
                <div className="mt-8 flex items-end gap-6 flex-wrap">
                  <div>
                    <div className="label-caps text-[#64748B] text-[10px]">
                      {p.priceFrom != null ? t('pkg.from') : t('pkg.priceOnReq')}
                    </div>
                    {p.priceFrom != null ? (
                      <div className="serif text-[42px] md:text-[52px] font-medium leading-none text-[#0F172A] mt-1.5 tracking-tight">
                        €{p.priceFrom}
                        <span className="serif italic text-[15px] text-[#64748B] ml-1 font-normal">/ person</span>
                      </div>
                    ) : (
                      <div className="serif italic text-[28px] md:text-[34px] leading-none text-[#0F172A] mt-1.5">
                        {t('pkg.priceOnReq')}
                      </div>
                    )}
                  </div>
                  <a href="#booking" className="btn-river ml-auto md:ml-0">
                    {t('pkg.cta')} <ArrowUpRight size={16} />
                  </a>
                </div>

                {/* Trust line */}
                <div className="mt-5 inline-flex items-center gap-2 text-[12.5px] text-[#475569]">
                  <ShieldCheck size={14} className="text-[#0EA5E9]" />
                  {t('pkg.trust')}
                </div>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  )
}
