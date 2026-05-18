import { useEffect, useState } from 'react'
import { useI18n, useT } from '@/i18n/useI18n'
import { SUPPORTED, LANG_LABELS } from '@/i18n/dictionary'
import { Menu, X, Waves } from 'lucide-react'

export function Nav() {
  const t = useT()
  const { lang, setLang } = useI18n()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { key: 'nav.experiences', to: '#experiences' },
    { key: 'nav.packages',    to: '#packages' },
    { key: 'nav.guides',      to: '#guides' },
    { key: 'nav.gallery',     to: '#gallery' },
    { key: 'nav.contact',     to: '#booking' },
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all ${
        scrolled ? 'glass-strong' : 'bg-transparent'
      }`}
    >
      <div className="max-w-[1280px] mx-auto px-5 md:px-8 h-16 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-2 text-white font-display font-bold tracking-tight">
          <span className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center shadow-[0_4px_14px_rgba(16,185,129,0.4)]">
            <Waves size={16} strokeWidth={2.5} className="text-white" />
          </span>
          <span className="text-[16px]">Raft Boys</span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-7">
          {links.map(l => (
            <a key={l.to} href={l.to} className="text-[13px] text-white/80 hover:text-white transition-colors">
              {t(l.key)}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {/* Language toggle */}
          <div className="hidden md:inline-flex items-center bg-white/5 border border-white/10 rounded-full p-0.5 text-[11px]">
            {SUPPORTED.map(l => (
              <button key={l} onClick={() => setLang(l)}
                aria-pressed={lang === l}
                className={`px-2.5 py-1 rounded-full font-semibold transition-all ${
                  lang === l ? 'bg-emerald-500 text-white' : 'text-white/60 hover:text-white'
                }`}>
                {LANG_LABELS[l]}
              </button>
            ))}
          </div>

          {/* Desktop book CTA */}
          <a href="#booking" className="hidden md:inline-flex btn-primary !py-2 !px-4">
            {t('nav.book')}
          </a>

          {/* Mobile menu trigger */}
          <button onClick={() => setOpen(true)}
            className="md:hidden p-2 text-white/80 hover:text-white"
            aria-label="Open menu">
            <Menu size={20} />
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-[60] md:hidden bg-[#06100D]/95 backdrop-blur-xl animate-fade-in">
          <div className="flex items-center justify-between px-5 h-16">
            <span className="text-white font-display font-bold">Raft Boys</span>
            <button onClick={() => setOpen(false)} className="p-2 text-white/80" aria-label="Close menu">
              <X size={20} />
            </button>
          </div>
          <nav className="px-5 pt-4 flex flex-col gap-1">
            {links.map(l => (
              <a key={l.to} href={l.to} onClick={() => setOpen(false)}
                className="py-3 text-[16px] text-white/90 hover:text-white border-b border-white/5">
                {t(l.key)}
              </a>
            ))}
            <div className="mt-5 flex items-center justify-between">
              <div className="flex items-center bg-white/5 border border-white/10 rounded-full p-0.5">
                {SUPPORTED.map(l => (
                  <button key={l} onClick={() => setLang(l)}
                    className={`px-3 py-1 rounded-full text-[11px] font-semibold ${
                      lang === l ? 'bg-emerald-500 text-white' : 'text-white/60'
                    }`}>
                    {LANG_LABELS[l]}
                  </button>
                ))}
              </div>
            </div>
            <a href="#booking" onClick={() => setOpen(false)}
              className="mt-6 btn-primary w-full justify-center">
              {t('nav.book')}
            </a>
          </nav>
        </div>
      )}
    </header>
  )
}
