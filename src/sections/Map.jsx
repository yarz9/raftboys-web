import { MapPin, ExternalLink, Navigation } from 'lucide-react'
import { useT } from '@/i18n/useI18n'
import { BUSINESS } from '@/data/content'

// Editorial map spread — paper background, embedded Google Maps tile
// framed editorially, plus a typographic dateline of distances.

export function Map() {
  const t = useT()
  const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${BUSINESS.geo.lat},${BUSINESS.geo.lng}`
  return (
    <section id="map" className="relative bg-[#F1F7FA] text-[#0F172A] py-24 md:py-36">
      <div className="max-w-[1320px] mx-auto px-5 md:px-12">
        <div className="grid md:grid-cols-12 gap-10 mb-14 md:mb-16">
          <div className="md:col-span-3">
            <div className="label-caps text-[#0284C7]">{t('map.eyebrow')}</div>
          </div>
          <div className="md:col-span-9">
            <h2 className="serif text-[clamp(36px,6vw,80px)] font-medium leading-[1.02] tracking-tight">
              {t('map.title')}{' '}
              <span className="serif-italic font-light text-[#0EA5E9]">{t('map.title.italic')}</span>
            </h2>
            <p className="serif italic text-[19px] md:text-[21px] text-[#334155] mt-6 max-w-[680px] leading-[1.45]">
              {t('map.lead')}
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-12 gap-10 md:gap-14">
          {/* Map tile */}
          <div className="md:col-span-8 frame">
            <div className="aspect-[16/10] relative bg-[#E2ECF2]">
              <iframe
                title="Raft Boys location — Džajići, Konjic"
                src={`https://www.google.com/maps?q=${BUSINESS.geo.lat},${BUSINESS.geo.lng}&z=11&output=embed`}
                width="100%" height="100%" loading="lazy" referrerPolicy="no-referrer-when-downgrade"
                style={{ border: 0, filter: 'saturate(0.85) contrast(1.05)' }} />
            </div>
          </div>

          {/* Address + distances */}
          <div className="md:col-span-4 space-y-7">
            <div>
              <div className="label-caps text-[#0284C7] text-[10px] mb-2">{t('foot.address')}</div>
              <div className="serif text-[22px] md:text-[24px] font-medium leading-[1.3]">
                {BUSINESS.name} <span className="serif italic font-light text-[#475569]">— {BUSINESS.address}</span>
              </div>
            </div>

            <ul className="space-y-3 border-t border-[rgba(15,23,42,0.12)] pt-5">
              {[
                ['Sarajevo',   '~1 h',   '60 km'],
                ['Mostar',     '~1.5 h', '75 km'],
                ['Dubrovnik',  '~3 h',   '210 km'],
                ['Split',      '~3 h',   '210 km'],
              ].map(([city, time, dist]) => (
                <li key={city} className="flex items-baseline justify-between gap-4 text-[14.5px]">
                  <span className="serif text-[16px] text-[#0F172A]">{city}</span>
                  <span className="flex-1 border-b border-dashed border-[rgba(15,23,42,0.18)] mx-2 mb-1" />
                  <span className="serif italic text-[#475569]">{time}</span>
                  <span className="label-caps text-[#0284C7] text-[10px] tabular-nums">{dist}</span>
                </li>
              ))}
            </ul>

            <a href={mapsUrl} target="_blank" rel="noopener noreferrer"
              className="btn-river inline-flex">
              <Navigation size={15} /> {t('map.dir')} <ExternalLink size={13} />
            </a>

            <p className="serif italic text-[14px] text-[#64748B] flex items-start gap-2 pt-3 border-t border-[rgba(15,23,42,0.12)]">
              <MapPin size={14} className="text-[#0EA5E9] mt-1 shrink-0" />
              Free pickup from Konjic centre with every reservation.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export const MapSection = Map
