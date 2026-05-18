import { ShieldCheck, Globe, Users, CreditCard } from 'lucide-react'
import { useT } from '@/i18n/useI18n'

export function TrustBar() {
  const t = useT()
  const items = [
    { icon: ShieldCheck, label: t('strip.since') },
    { icon: Globe,       label: t('strip.langs') },
    { icon: Users,       label: t('strip.groups') },
    { icon: CreditCard,  label: t('strip.payment') },
  ]
  return (
    <section id="trust" className="relative border-y border-white/5 bg-[#0A1612]">
      <div className="max-w-[1280px] mx-auto px-5 md:px-8 py-6">
        <div className="flex items-center justify-between gap-x-8 gap-y-4 flex-wrap">
          {items.map(it => (
            <div key={it.label} className="flex items-center gap-2 text-[12px] text-white/70">
              <it.icon size={14} className="text-emerald-400 shrink-0" />
              <span>{it.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
