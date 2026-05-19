import { useEffect, useRef } from 'react'
import { useT } from '@/i18n/useI18n'
import { IMG } from '@/data/assets'

// Horizontal scroll-snap rail of full-bleed photos with handwritten
// captions. Replaces the SaaS masonry grid + lightbox.

const SHOTS = IMG.gallery.map((src, i) => ({
  src,
  capKey: `gal.cap${i + 1}`,
}))

export function Gallery() {
  const t = useT()
  const railRef = useRef(null)

  // Soft drag-to-scroll on desktop
  useEffect(() => {
    const el = railRef.current
    if (!el) return
    let isDown = false, startX = 0, scrollLeft = 0
    const down = (e) => { isDown = true; startX = e.pageX - el.offsetLeft; scrollLeft = el.scrollLeft; el.style.cursor = 'grabbing' }
    const up   = () => { isDown = false; el.style.cursor = 'grab' }
    const move = (e) => { if (!isDown) return; e.preventDefault(); el.scrollLeft = scrollLeft - (e.pageX - el.offsetLeft - startX) }
    el.addEventListener('mousedown', down); el.addEventListener('mouseup', up); el.addEventListener('mouseleave', up); el.addEventListener('mousemove', move)
    return () => { el.removeEventListener('mousedown', down); el.removeEventListener('mouseup', up); el.removeEventListener('mouseleave', up); el.removeEventListener('mousemove', move) }
  }, [])

  return (
    <section id="gallery" className="relative bg-[#F1F7FA] text-[#0F172A] py-24 md:py-36 overflow-hidden">
      <div className="max-w-[1320px] mx-auto px-5 md:px-12 mb-14 md:mb-20">
        <div className="grid md:grid-cols-12 gap-10">
          <div className="md:col-span-3">
            <div className="label-caps text-[#0284C7]">{t('gal.eyebrow')}</div>
          </div>
          <div className="md:col-span-9">
            <h2 className="serif text-[clamp(34px,5.8vw,76px)] font-medium leading-[1.02] tracking-tight">
              {t('gal.title')}{' '}
              <span className="serif-italic font-light text-[#0EA5E9]">{t('gal.title.italic')}</span>
            </h2>
            <div className="flex items-end justify-between gap-6 flex-wrap mt-6">
              <p className="serif italic text-[18px] md:text-[20px] text-[#475569] max-w-[640px] leading-[1.45]">
                {t('gal.lead')}
              </p>
              <span className="label-caps text-[#0284C7] text-[11px] tracking-[0.4em]">{t('gal.scroll')}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Horizontal rail — bleed to right edge of viewport */}
      <div
        ref={railRef}
        className="scroll-rail cursor-grab select-none pl-5 md:pl-12 pr-5 md:pr-12 pb-2"
        style={{ scrollSnapType: 'x mandatory' }}
      >
        {SHOTS.map((s, i) => (
          <figure
            key={i}
            className="frame relative"
            style={{ flex: '0 0 auto', width: 'min(82vw, 640px)', scrollSnapAlign: 'start' }}
          >
            <div className="aspect-[4/5] overflow-hidden">
              <img src={s.src} alt={t(s.capKey)} loading="lazy" draggable={false}
                className="w-full h-full object-cover transition-transform duration-[1400ms] hover:scale-[1.04]" />
            </div>
            <figcaption className="absolute bottom-0 left-0 right-0 px-5 py-4 bg-gradient-to-t from-[#0F172A]/85 to-transparent">
              <div className="label-caps text-[#67E8F9] text-[10px]">№ {String(i + 1).padStart(2, '0')}</div>
              <div className="serif italic text-[14.5px] text-white mt-0.5">{t(s.capKey)}</div>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}
