import { Check, ArrowRight, Sparkles } from 'lucide-react'
import { useT } from '@/i18n/useI18n'
import { Reveal, RevealStagger, RevealItem } from '@/motion/primitives'
import { PACKAGES } from '@/data/content'
import { SectionHeader } from './Experiences'

export function Packages() {
  const t = useT()
  return (
    <section id="packages" className="relative py-24 md:py-32 px-5 md:px-8 border-t border-white/5 bg-[#0A1612]">
      <div className="relative max-w-[1280px] mx-auto">
        <Reveal>
          <SectionHeader
            eyebrow={t('pkg.eyebrow')}
            title={t('pkg.title')}
            sub={t('pkg.sub')}
            centered
          />
        </Reveal>

        <RevealStagger className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-5 max-w-[1100px] mx-auto">
          {PACKAGES.map(p => (
            <RevealItem key={p.key}>
              <div
                className={`relative rounded-2xl p-7 border h-full flex flex-col transition-all hover-lift ${
                  p.highlight
                    ? 'bg-gradient-to-b from-emerald-500/10 to-transparent border-emerald-500/40 md:-translate-y-3 shadow-[0_20px_60px_rgba(16,185,129,0.18)]'
                    : 'bg-[#0F1F1A] border-white/8'
                }`}
              >
                {p.highlight && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 chip !bg-emerald-500 !text-white !border-emerald-400/50 shadow-[0_6px_18px_rgba(16,185,129,0.5)]">
                    <Sparkles size={11} /> {t('pkg.featured')}
                  </span>
                )}

                <h3 className="font-display font-bold text-[22px] text-white mb-1">{t(`pkg.${p.key}.t`)}</h3>
                <p className="text-[12.5px] text-white/65 mb-5">{t(`pkg.${p.key}.d`)}</p>

                <div className="mb-5">
                  <span className={`font-display font-bold text-[38px] tracking-tight ${p.highlight ? 'text-gradient' : 'text-white'}`}>
                    €{p.priceFrom}
                  </span>
                  <span className="text-[12px] text-white/55 ml-2">{p.priceUnit.replace('€ ', '')}</span>
                </div>

                <div className="text-[11px] uppercase tracking-wider text-emerald-400 font-semibold mb-3">
                  {t(`pkg.duration.${p.durationKey}`)}
                </div>

                <ul className="space-y-2.5 mb-7 flex-1">
                  {p.features.map(f => (
                    <li key={f} className="flex items-start gap-2.5 text-[13px] text-white/80 leading-snug">
                      <Check size={13} className="text-emerald-400 mt-0.5 shrink-0" />
                      <span>{t(`feat.${f}`)}</span>
                    </li>
                  ))}
                </ul>

                <a href="#booking"
                  className={`mt-auto inline-flex items-center justify-center gap-2 w-full py-3 rounded-full text-[13px] font-semibold transition-all ${
                    p.highlight ? 'btn-primary' : 'btn-ghost'
                  }`}>
                  {t('pkg.cta')} <ArrowRight size={13} />
                </a>
              </div>
            </RevealItem>
          ))}
        </RevealStagger>
      </div>
    </section>
  )
}
