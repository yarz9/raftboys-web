import { ShieldCheck, Award, Wrench, Heart, Bus, Tag } from 'lucide-react'
import { useT } from '@/i18n/useI18n'
import { Reveal, RevealStagger, RevealItem, SpotlightCard } from '@/motion/primitives'
import { WHY_REASONS } from '@/data/content'
import { SectionHeader } from './Experiences'

const ICON_MAP = {
  safety: ShieldCheck,
  certified: Award,
  equipment: Wrench,
  hospitality: Heart,
  transport: Bus,
  price: Tag,
}

export function WhyChoose() {
  const t = useT()
  return (
    <section className="relative py-24 md:py-32 px-5 md:px-8 border-t border-white/5">
      <div className="relative max-w-[1280px] mx-auto">
        <Reveal>
          <SectionHeader
            eyebrow={t('why.eyebrow')}
            title={t('why.title')}
            sub={t('why.sub')}
          />
        </Reveal>

        <RevealStagger className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {WHY_REASONS.map(key => {
            const Icon = ICON_MAP[key]
            return (
              <RevealItem key={key}>
                <SpotlightCard className="card-premium h-full">
                  <div className="w-11 h-11 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-4">
                    <Icon size={18} className="text-emerald-400" strokeWidth={1.8} />
                  </div>
                  <h3 className="font-display font-semibold text-[16px] text-white mb-2">{t(`why.${key}.t`)}</h3>
                  <p className="text-[13px] text-white/65 leading-relaxed">{t(`why.${key}.d`)}</p>
                </SpotlightCard>
              </RevealItem>
            )
          })}
        </RevealStagger>
      </div>
    </section>
  )
}
