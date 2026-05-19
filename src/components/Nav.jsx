import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { useI18n, useT } from '@/i18n/useI18n'
import { SUPPORTED, LANG_LABELS } from '@/i18n/dictionary'

// Editorial navigation — paper bar that subtly tints with scroll.
// Serif italic wordmark, ruled separators, sky-accent CTA.

const LINKS = [
  ['#experiences', 'nav.experiences'],
  ['#itinerary',   'nav.itinerary'],
  ['#guides',      'nav.guides'],
  ['#gallery',     'nav.gallery'],
  ['#packages',    'nav.packages'],
]

export function Nav() {
  const t = useT()
  const { lang, setLang } = useI18n()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#F1F7FA]/90 backdrop-blur-md border-b border-[rgba(15,23,42,0.08)]'
          : 'bg-transparent'
      }`}>
        <div className="max-w-[1320px] mx-auto px-5 md:px-12 h-[68px] md:h-[78px] flex items-center justify-between gap-6">
          {/* Wordmark */}
          <a href="#" className="flex items-baseline gap-2 group">
            <span className={`serif-italic font-light text-[22px] md:text-[26px] tracking-tight transition-colors ${
              scrolled ? 'text-[#0F172A]' : 'text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)]'
            }`}>
              Raft Boys
            </span>
            <span className={`label-caps text-[9px] tracking-[0.35em] hidden md:inline transition-colors ${
              scrolled ? 'text-[#0284C7]' : 'text-[#67E8F9]'
            }`}>
              Est. 1999
            </span>
          </a>

          {/* Desktop links */}
          <nav className="hidden md:flex items-center gap-7">
            {LINKS.map(([href, key]) => (
              <a key={href} href={href}
                className={`label-caps text-[10.5px] tracking-[0.28em] transition-colors hover:text-[#0EA5E9] ${
                  scrolled ? 'text-[#475569]' : 'text-white/85 drop-shadow-[0_1px_4px_rgba(0,0,0,0.3)]'
                }`}>
                {t(key)}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            {/* Lang switcher */}
            <div className={`hidden md:flex items-center text-[11px] rounded-full border transition-colors ${
              scrolled ? 'border-[rgba(15,23,42,0.18)]' : 'border-white/30'
            }`}>
              {SUPPORTED.map(l => (
                <button key={l} onClick={() => setLang(l)}
                  className={`px-3 py-1 rounded-full transition-colors ${
                    lang === l
                      ? 'bg-[#0EA5E9] text-white font-semibold'
                      : scrolled ? 'text-[#475569] hover:text-[#0F172A]' : 'text-white/85 hover:text-white'
                  }`}>
                  {LANG_LABELS[l]}
                </button>
              ))}
            </div>

            {/* CTA */}
            <a href="#booking"
              className="hidden md:inline-flex items-center px-5 py-2.5 rounded-sm bg-[#0EA5E9] hover:bg-[#0284C7] text-white text-[12.5px] font-semibold tracking-wide transition-colors">
              {t('nav.book')}
            </a>

            {/* Mobile hamburger */}
            <button onClick={() => setOpen(true)}
              className={`md:hidden w-10 h-10 flex items-center justify-center rounded-sm transition-colors ${
                scrolled ? 'text-[#0F172A] hover:bg-[#0F172A]/5' : 'text-white hover:bg-white/10'
              }`}
              aria-label="Open menu">
              <Menu size={22} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile sheet */}
      {open && (
        <div className="fixed inset-0 z-[60] md:hidden bg-[#0F172A]/95 backdrop-blur-xl">
          <div className="max-w-[1320px] mx-auto px-5 h-[68px] flex items-center justify-between">
            <span className="serif-italic font-light text-[22px] text-white">Raft Boys</span>
            <button onClick={() => setOpen(false)} className="w-10 h-10 flex items-center justify-center text-white" aria-label="Close menu">
              <X size={22} />
            </button>
          </div>
          <nav className="px-5 mt-8 flex flex-col gap-1">
            {LINKS.map(([href, key]) => (
              <a key={href} href={href} onClick={() => setOpen(false)}
                className="serif text-[28px] font-medium text-white py-3 border-b border-white/10">
                {t(key)}
              </a>
            ))}
            <a href="#booking" onClick={() => setOpen(false)}
              className="serif-italic text-[28px] font-light text-[#67E8F9] py-3 border-b border-white/10">
              {t('nav.book')} →
            </a>
            <div className="flex items-center gap-3 mt-8">
              {SUPPORTED.map(l => (
                <button key={l} onClick={() => setLang(l)}
                  className={`label-caps text-[11px] px-4 py-2 rounded-full border ${
                    lang === l ? 'bg-[#0EA5E9] border-[#0EA5E9] text-white' : 'border-white/20 text-white/70'
                  }`}>
                  {LANG_LABELS[l]}
                </button>
              ))}
            </div>
          </nav>
        </div>
      )}
    </>
  )
}
