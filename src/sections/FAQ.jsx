import { useState } from 'react'
import { Plus, Minus } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useT } from '@/i18n/useI18n'
import { Reveal } from '@/motion/primitives'
import { FAQ_KEYS } from '@/data/content'
import { SectionHeader } from './Experiences'

export function FAQ() {
  const t = useT()
  const [open, setOpen] = useState(0)

  return (
    <section className="relative py-24 md:py-32 px-5 md:px-8 border-t border-white/5">
      <div className="relative max-w-[820px] mx-auto">
        <Reveal>
          <SectionHeader
            eyebrow={t('faq.eyebrow')}
            title={t('faq.title')}
            sub={t('faq.sub')}
            centered
          />
        </Reveal>

        <Reveal delay={0.1} className="mt-12 space-y-2">
          {FAQ_KEYS.map((k, i) => (
            <div key={k} className="bg-[#1E293B] border border-white/8 rounded-xl overflow-hidden">
              <button
                onClick={() => setOpen(open === i ? -1 : i)}
                aria-expanded={open === i}
                className="w-full text-left flex items-center justify-between gap-4 px-5 py-4 hover:bg-white/[0.025] transition-colors"
              >
                <span className="text-[14px] font-medium text-white">{t(`faq.${k}.q`)}</span>
                {open === i
                  ? <Minus size={15} className="text-sky-400 shrink-0" />
                  : <Plus size={15} className="text-white/40 shrink-0" />}
              </button>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-5 text-[13.5px] text-white/70 leading-relaxed border-t border-white/5 pt-4">
                      {t(`faq.${k}.a`)}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
