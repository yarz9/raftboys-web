import { useState, useEffect, useCallback } from 'react'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useT } from '@/i18n/useI18n'
import { Reveal, RevealStagger, RevealItem } from '@/motion/primitives'
import { GALLERY } from '@/data/content'
import { SectionHeader } from './Experiences'

// Masonry-feeling grid with a bigger first tile + lightbox.
export function Gallery() {
  const t = useT()
  const [open, setOpen] = useState(null) // index | null

  const close = useCallback(() => setOpen(null), [])
  const next  = useCallback(() => setOpen(i => (i + 1) % GALLERY.length), [])
  const prev  = useCallback(() => setOpen(i => (i - 1 + GALLERY.length) % GALLERY.length), [])

  useEffect(() => {
    if (open === null) return
    const onKey = (e) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowRight') next()
      if (e.key === 'ArrowLeft') prev()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, close, next, prev])

  // Tile size variants for masonry feel
  const tileClass = (i) => {
    if (i === 0) return 'sm:col-span-2 sm:row-span-2 aspect-square sm:aspect-auto'
    if (i === 3) return 'sm:col-span-2 aspect-[2/1]'
    if (i === 5) return 'sm:row-span-2 aspect-square sm:aspect-auto'
    return 'aspect-square'
  }

  return (
    <section id="gallery" className="relative py-24 md:py-32 px-5 md:px-8 border-t border-white/5">
      <div className="relative max-w-[1280px] mx-auto">
        <Reveal>
          <SectionHeader
            eyebrow={t('gallery.eyebrow')}
            title={t('gallery.title')}
            sub={t('gallery.sub')}
          />
        </Reveal>

        <RevealStagger className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
          {GALLERY.map((g, i) => (
            <RevealItem key={i} className={tileClass(i)}>
              <button
                onClick={() => setOpen(i)}
                aria-label={t(g.captionKey)}
                className="relative w-full h-full overflow-hidden rounded-xl group focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
              >
                <img src={g.src} alt={t(g.captionKey)} loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#06100D]/85 via-[#06100D]/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />
                <div className="absolute bottom-3 left-3 right-3 text-left">
                  <span className="text-[10px] uppercase tracking-wider font-semibold text-emerald-400">Raft Boys</span>
                  <p className="text-[12px] text-white mt-1 leading-tight">{t(g.captionKey)}</p>
                </div>
              </button>
            </RevealItem>
          ))}
        </RevealStagger>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {open !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] bg-[#06100D]/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-10"
            onClick={close}
            role="dialog"
            aria-modal="true"
          >
            <button onClick={close} aria-label="Close gallery"
              className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/10 text-white hover:bg-white/20 flex items-center justify-center">
              <X size={18} />
            </button>
            <button onClick={(e) => { e.stopPropagation(); prev() }} aria-label="Previous"
              className="absolute left-3 md:left-8 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 text-white hover:bg-white/20 flex items-center justify-center">
              <ChevronLeft size={20} />
            </button>
            <button onClick={(e) => { e.stopPropagation(); next() }} aria-label="Next"
              className="absolute right-3 md:right-8 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 text-white hover:bg-white/20 flex items-center justify-center">
              <ChevronRight size={20} />
            </button>

            <motion.div
              key={open}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-[1400px] w-full"
            >
              <img src={GALLERY[open].src} alt={t(GALLERY[open].captionKey)}
                className="w-full max-h-[80vh] object-contain rounded-xl" />
              <p className="mt-4 text-center text-[13px] text-white/70">{t(GALLERY[open].captionKey)}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
