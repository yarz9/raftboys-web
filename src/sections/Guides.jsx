import { Award } from 'lucide-react'
import { useT } from '@/i18n/useI18n'
import { Reveal, RevealStagger, RevealItem } from '@/motion/primitives'
import { GUIDES } from '@/data/content'
import { SectionHeader } from './Experiences'

export function Guides() {
  const t = useT()
  return (
    <section id="guides" className="relative py-24 md:py-32 px-5 md:px-8 border-t border-white/5 bg-[#0A1612]">
      <div className="relative max-w-[1280px] mx-auto">
        <Reveal>
          <SectionHeader
            eyebrow={t('guides.eyebrow')}
            title={t('guides.title')}
            sub={t('guides.sub')}
          />
        </Reveal>

        <RevealStagger className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {GUIDES.map((g) => (
            <RevealItem key={g.name}>
              <div className="group relative rounded-2xl overflow-hidden border border-white/8 bg-[#0F1F1A] hover-lift">
                <div className="aspect-[4/5] overflow-hidden relative">
                  <img src={g.image} alt={g.name} loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#06100D] via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <h3 className="font-display font-bold text-[20px] text-white">{g.name}</h3>
                    <p className="text-[12px] text-emerald-400 font-medium">{t(g.role)}</p>
                  </div>
                </div>
                <div className="p-5 border-t border-white/5">
                  <p className="text-[12px] text-white/70 mb-3">{t(g.yearsKey)}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {g.certs.map(c => (
                      <span key={c} className="inline-flex items-center gap-1 text-[10px] uppercase tracking-wider font-semibold bg-white/5 border border-white/10 text-white/75 px-2 py-1 rounded-full">
                        <Award size={10} className="text-emerald-400" />{c}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </RevealItem>
          ))}
        </RevealStagger>
      </div>
    </section>
  )
}
