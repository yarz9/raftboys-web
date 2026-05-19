import { useState } from 'react'
import { Plus, Minus, MessageCircle } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useT } from '@/i18n/useI18n'
import { BUSINESS } from '@/data/content'

// Editorial FAQ — ruled list of questions on paper, each opens with
// a soft height animation. No accordion cards, no chips.

const ITEMS = ['exp', 'swim', 'wear', 'age', 'rain', 'book']

export function FAQ() {
  const t = useT()
  const [open, setOpen] = useState('exp')
  const waUrl = `https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent('Hi Raft Boys — quick question:')}`

  return (
    <section id="faq" className="relative bg-[#F1F7FA] text-[#0F172A] py-24 md:py-36">
      <div className="max-w-[1180px] mx-auto px-5 md:px-12">
        <div className="grid md:grid-cols-12 gap-10 mb-16 md:mb-20">
          <div className="md:col-span-3">
            <div className="label-caps text-[#0284C7]">{t('faq.eyebrow')}</div>
          </div>
          <div className="md:col-span-9">
            <h2 className="serif text-[clamp(36px,6vw,80px)] font-medium leading-[1.02] tracking-tight">
              {t('faq.title')}{' '}
              <span className="serif-italic font-light text-[#0EA5E9]">{t('faq.title.italic')}</span>
            </h2>
          </div>
        </div>

        <ul className="border-t border-[rgba(15,23,42,0.12)]">
          {ITEMS.map((k, i) => {
            const isOpen = open === k
            const num = String(i + 1).padStart(2, '0')
            return (
              <li key={k} className="border-b border-[rgba(15,23,42,0.12)]">
                <button
                  onClick={() => setOpen(isOpen ? null : k)}
                  className="w-full flex items-start gap-6 md:gap-10 py-7 md:py-8 text-left group"
                  aria-expanded={isOpen}
                >
                  <span className="serif italic text-[#0EA5E9] text-[18px] md:text-[20px] mt-1 select-none w-10 shrink-0">
                    {num}
                  </span>
                  <span className="flex-1 serif text-[20px] md:text-[26px] font-medium leading-[1.25] tracking-tight pr-6">
                    {t(`faq.${k}.q`)}
                  </span>
                  <span className={`shrink-0 w-9 h-9 rounded-full border border-[rgba(15,23,42,0.2)] flex items-center justify-center transition-colors ${isOpen ? 'bg-[#0EA5E9] border-[#0EA5E9] text-white' : 'text-[#0F172A] group-hover:border-[#0EA5E9] group-hover:text-[#0EA5E9]'}`}>
                    {isOpen ? <Minus size={15} /> : <Plus size={15} />}
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="pl-0 md:pl-[64px] pb-8 md:pb-10 max-w-[820px] text-[16px] md:text-[17.5px] leading-[1.75] text-[#334155]">
                        {t(`faq.${k}.a`)}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            )
          })}
        </ul>

        {/* CTA — still curious? */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6 }}
          className="mt-14 md:mt-20 flex flex-col md:flex-row items-center justify-between gap-6 bg-white border border-[rgba(15,23,42,0.08)] rounded-sm p-7 md:p-10"
        >
          <div>
            <h3 className="serif text-[24px] md:text-[30px] font-medium tracking-tight leading-tight">
              {t('faq.cta')}
            </h3>
            <p className="serif italic text-[15px] md:text-[16.5px] text-[#475569] mt-2 max-w-[520px]">
              {t('faq.cta.d')}
            </p>
          </div>
          <a href={waUrl} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-sm bg-[#25D366] hover:bg-[#1FBA59] text-white text-[14px] font-semibold transition-colors shadow-[0_10px_28px_-12px_rgba(37,211,102,0.6)]">
            <MessageCircle size={16} /> WhatsApp
          </a>
        </motion.div>
      </div>
    </section>
  )
}
