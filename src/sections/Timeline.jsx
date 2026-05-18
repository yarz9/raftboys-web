import { Coffee, ListChecks, Sailboat, Zap, UtensilsCrossed, Home } from 'lucide-react'
import { useT } from '@/i18n/useI18n'
import { Reveal, RevealStagger, RevealItem } from '@/motion/primitives'
import { TIMELINE_STEPS } from '@/data/content'
import { SectionHeader } from './Experiences'

const ICON_MAP = {
  arrive: Coffee, brief: ListChecks, launch: Sailboat,
  rapids: Zap, lunch: UtensilsCrossed, return: Home,
}

export function Timeline() {
  const t = useT()
  return (
    <section className="relative py-24 md:py-32 px-5 md:px-8 border-t border-white/5">
      <div className="relative max-w-[1280px] mx-auto">
        <Reveal>
          <SectionHeader
            eyebrow={t('timeline.eyebrow')}
            title={t('timeline.title')}
            sub={t('timeline.sub')}
            centered
          />
        </Reveal>

        <div className="mt-14 relative">
          {/* Vertical line for mobile, horizontal for desktop */}
          <div
            aria-hidden="true"
            className="hidden lg:block absolute top-9 left-12 right-12 h-[2px] bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent"
          />
          <RevealStagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-5">
            {TIMELINE_STEPS.map((key, i) => {
              const Icon = ICON_MAP[key]
              return (
                <RevealItem key={key} className="relative">
                  <div className="flex flex-col items-center text-center">
                    <div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-emerald-500/15 to-cyan-500/10 border border-emerald-500/30 flex items-center justify-center mb-4 z-10 backdrop-blur-sm">
                      <Icon size={22} className="text-emerald-400" strokeWidth={1.8} />
                      <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-emerald-500 text-white text-[10px] font-bold flex items-center justify-center shadow-[0_4px_14px_rgba(16,185,129,0.5)]">
                        {i + 1}
                      </span>
                    </div>
                    <h3 className="font-display font-semibold text-[14px] text-white mb-1">{t(`timeline.${key}.t`)}</h3>
                    <p className="text-[12px] text-white/60 leading-relaxed max-w-[180px] mx-auto">{t(`timeline.${key}.d`)}</p>
                  </div>
                </RevealItem>
              )
            })}
          </RevealStagger>
        </div>
      </div>
    </section>
  )
}
