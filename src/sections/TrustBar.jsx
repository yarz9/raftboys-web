import { useT } from '@/i18n/useI18n'

// Quiet rule of facts between sections. Not a card, not a chip
// cluster â€” a typographic ruled line.

export function TrustBar() {
  const t = useT()
  const items = [
    t('strip.since'),
    t('strip.reviews'),
    t('strip.langs'),
    t('strip.lunch'),
  ]
  return (
    <section className="relative bg-[#F1F7FA] text-[#475569]">
      <div className="max-w-[1320px] mx-auto px-5 md:px-12">
        <div className="border-t border-b border-[rgba(14,26,26,0.10)] py-6">
          <ul className="flex items-center justify-between gap-x-6 gap-y-3 flex-wrap label-caps text-[11px]">
            {items.map((it, i) => (
              <li key={i} className="flex items-center gap-3">
                <span aria-hidden className="w-1.5 h-1.5 rounded-full bg-[#0EA5E9]" />
                <span>{it}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
