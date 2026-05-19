import { motion } from 'framer-motion'
import { Shield, Star, Users, UtensilsCrossed } from 'lucide-react'
import { useT } from '@/i18n/useI18n'

// Trust strip — prominent four-up stat row with icons.

const STATS = [
  { icon: Shield,           figure: '25+',           key: 'strip.since',   color: '#0EA5E9' },
  { icon: Star,             figure: '4.9',           key: 'strip.reviews', color: '#0284C7' },
  { icon: Users,            figure: 'EN · BHS',      key: 'strip.langs',   color: '#06B6D4' },
  { icon: UtensilsCrossed,  figure: '✓',             key: 'strip.lunch',   color: '#0EA5E9' },
]

export function TrustBar() {
  const t = useT()
  return (
    <section className="relative bg-[#F1F7FA] text-[#0F172A] -mt-px">
      <div className="max-w-[1320px] mx-auto px-5 md:px-12">
        <div className="border-y border-[rgba(15,23,42,0.10)] py-10 md:py-12">
          <ul className="grid grid-cols-2 md:grid-cols-4 gap-y-10 md:gap-y-0 md:divide-x divide-[rgba(15,23,42,0.10)]">
            {STATS.map(({ icon: Icon, figure, key, color }, i) => (
              <motion.li
                key={key}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col items-center text-center px-4 md:px-6"
              >
                <Icon size={22} strokeWidth={1.6} style={{ color }} className="mb-3" />
                <div className="serif text-[28px] md:text-[34px] font-medium leading-none text-[#0F172A] tracking-tight">
                  {figure}
                </div>
                <div className="label-caps text-[#475569] text-[10.5px] mt-3 leading-snug">
                  {t(key)}
                </div>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
