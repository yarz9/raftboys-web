import { MapPin, ExternalLink } from 'lucide-react'
import { useT } from '@/i18n/useI18n'
import { Reveal } from '@/motion/primitives'
import { BUSINESS } from '@/data/content'
import { SectionHeader } from './Experiences'

export function MapSection() {
  const t = useT()
  // Static Google Maps embed â€” no API key required, zero JS, zero
  // tracking until the user clicks "Open in Google Maps".
  const embed = `https://www.google.com/maps?q=${encodeURIComponent('Konjic, Bosnia and Herzegovina')}&output=embed&z=10`
  const directions = `https://www.google.com/maps/dir/?api=1&destination=${BUSINESS.geo.lat},${BUSINESS.geo.lng}`

  return (
    <section className="relative py-24 md:py-32 px-5 md:px-8 border-t border-white/5">
      <div className="relative max-w-[1280px] mx-auto">
        <Reveal>
          <SectionHeader
            eyebrow={t('map.eyebrow')}
            title={t('map.title')}
            sub={t('map.sub')}
          />
        </Reveal>

        <Reveal delay={0.1} className="mt-12 grid lg:grid-cols-5 gap-5">
          <div className="lg:col-span-3 rounded-2xl overflow-hidden border border-white/8 bg-[#1E293B] h-[420px] relative">
            <iframe
              title="Raft Boys â€” Konjic, Bosnia and Herzegovina"
              src={embed}
              width="100%" height="100%"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full grayscale-[0.2] contrast-110"
              style={{ filter: 'invert(0.92) hue-rotate(180deg) saturate(0.7) brightness(0.9)' }}
              allowFullScreen
            />
          </div>

          <div className="lg:col-span-2 flex flex-col gap-4">
            <div className="card-premium">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center shrink-0">
                  <MapPin size={16} className="text-sky-400" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-[15px] text-white">{BUSINESS.name}</h3>
                  <p className="text-[12px] text-white/65 mt-0.5">{BUSINESS.address}</p>
                </div>
              </div>
              <a href={directions} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-sky-400 hover:text-sky-300">
                {t('map.directions')} <ExternalLink size={11} />
              </a>
            </div>

            <div className="card-premium">
              <h4 className="font-display font-semibold text-[14px] text-white mb-2.5">How to find us</h4>
              <ul className="text-[13px] text-white/70 leading-relaxed space-y-1.5">
                <li>Â· 1 hour from Sarajevo (highway A1)</li>
                <li>Â· 1.5 hours from Mostar</li>
                <li>Â· 4 hours from Dubrovnik</li>
                <li>Â· Free pickup from Konjic centre</li>
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
