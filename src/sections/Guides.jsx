import { Award } from 'lucide-react'
import { useT } from '@/i18n/useI18n'
import { Reveal, RevealStagger, RevealItem } from '@/motion/primitives'
import { GUIDES } from '@/data/content'

export function Guides() {
  const t = useT()
  return (
    <section id="guides" className="relative py-24 md:py-32 px-5 md:px-8 border-t border-white/5 bg-[#0F172A]">
      <div className="relative max-w-[1280px] mx-auto">
        <Reveal>
          <div className="grid md:grid-cols-12 gap-10 mb-12">
            <div className="md:col-span-3">
              <div className="label-caps text-[#67E8F9]">{t('guides.eyebrow')}</div>
            </div>
            <div className="md:col-span-9">
              <h2 className="serif text-[clamp(34px,5.8vw,72px)] font-medium leading-[1.02] tracking-tight text-white">
                {t('guides.title')}
              </h2>
              <p className="serif italic text-[18px] text-white/70 mt-5 max-w-[640px]">{t('guides.lead')}</p>
            </div>
          </div>
        </Reveal>

        <RevealStagger className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {GUIDES.map((g) => (
            <RevealItem key={g.name}>
              <div className="group relative rounded-2xl overflow-hidden border border-white/8 bg-[#1E293B] hover-lift">
                <div className="aspect-[4/5] overflow-hidden relative">
                  <img src={g.image} alt={g.name} loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <h3 className="font-display font-bold text-[20px] text-white">{g.name}</h3>
                    <p className="text-[12px] text-sky-400 font-medium">{t(g.role)}</p>
                  </div>
                </div>
                <div className="p-5 border-t border-white/5">
                  <p className="text-[12px] text-white/70 mb-3">{t(g.yearsKey)}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {g.certs.map(c => (
                      <span key={c} className="inline-flex items-center gap-1 text-[10px] uppercase tracking-wider font-semibold bg-white/5 border border-white/10 text-white/75 px-2 py-1 rounded-full">
                        <Award size={10} className="text-sky-400" />{c}
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
