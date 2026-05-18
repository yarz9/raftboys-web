import { Waves, LifeBuoy, Mountain, Compass, ArrowRight, Clock, Flame } from 'lucide-react'
import { useT } from '@/i18n/useI18n'
import { Reveal, RevealStagger, RevealItem, SpotlightCard } from '@/motion/primitives'
import { EXPERIENCES } from '@/data/content'

const ICON_MAP = { Waves, LifeBuoy, Mountain, Compass }

export function Experiences() {
  const t = useT()
  return (
    <section id="experiences" className="relative py-24 md:py-32 px-5 md:px-8 section-glow">
      <div className="relative max-w-[1280px] mx-auto">
        <Reveal>
          <SectionHeader
            eyebrow={t('exp.eyebrow')}
            title={t('exp.title')}
            sub={t('exp.sub')}
          />
        </Reveal>

        <RevealStagger className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {EXPERIENCES.map(e => {
            const Icon = ICON_MAP[e.iconName] || Waves
            return (
              <RevealItem key={e.key}>
                <SpotlightCard className="card-premium !p-0 overflow-hidden h-full flex flex-col img-tint-hover">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img src={e.image} alt={t(`exp.${e.key}.t`)} loading="lazy"
                      className="w-full h-full object-cover img-tint" />
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <div className="flex items-center gap-2 text-[10px] uppercase tracking-wider text-emerald-400 font-semibold mb-2">
                      <Icon size={11} /> {t('exp.from')} {e.priceUnit}{e.priceFrom}
                    </div>
                    <h3 className="font-display font-semibold text-[17px] text-white mb-1.5 leading-tight">
                      {t(`exp.${e.key}.t`)}
                    </h3>
                    <p className="text-[12.5px] text-white/65 leading-relaxed flex-1">{t(`exp.${e.key}.d`)}</p>

                    <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between text-[11px] text-white/55">
                      <span className="flex items-center gap-1.5"><Clock size={11} /> {e.duration}</span>
                      <span className="flex items-center gap-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Flame key={i} size={10} className={i < e.intensity ? 'text-emerald-400' : 'text-white/15'} />
                        ))}
                      </span>
                    </div>

                    <a href="#booking" className="mt-4 inline-flex items-center gap-1 text-[12px] font-semibold text-emerald-400 hover:text-emerald-300 transition-colors">
                      {t('exp.cta')} <ArrowRight size={12} />
                    </a>
                  </div>
                </SpotlightCard>
              </RevealItem>
            )
          })}
        </RevealStagger>
      </div>
    </section>
  )
}

export function SectionHeader({ eyebrow, title, sub, centered }) {
  return (
    <div className={`max-w-[760px] ${centered ? 'mx-auto text-center' : ''}`}>
      {eyebrow && <div className="chip mb-4">{eyebrow}</div>}
      <h2 className="font-display font-bold text-[34px] md:text-[48px] leading-[1.08] tracking-tight">
        <span className="text-gradient-static">{title}</span>
      </h2>
      {sub && <p className="mt-5 text-[15px] md:text-[16px] text-white/65 leading-relaxed">{sub}</p>}
    </div>
  )
}
