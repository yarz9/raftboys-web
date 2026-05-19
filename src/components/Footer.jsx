import { MapPin, Phone, Mail, Heart } from 'lucide-react'
import { useT } from '@/i18n/useI18n'
import { BUSINESS } from '@/data/content'

// Editorial footer — deep navy, serif sign-off, ruled lists.

export function Footer() {
  const t = useT()
  const year = new Date().getFullYear()
  return (
    <footer className="relative bg-[#0F172A] text-[#F1F7FA]">
      <svg viewBox="0 0 1440 80" preserveAspectRatio="none" aria-hidden="true"
        className="block w-full" style={{ height: 80, transform: 'scaleY(-1)' }}>
        <path d="M0,0 C480,80 960,80 1440,0 L1440,80 L0,80 Z" fill="#F1F7FA" />
      </svg>

      <div className="max-w-[1320px] mx-auto px-5 md:px-12 pt-12 md:pt-20 pb-10">
        <div className="text-center mb-16 md:mb-20">
          <div className="label-caps text-[#67E8F9] text-[11px] mb-4">Raft Boys · Est. 1999</div>
          <p className="serif italic font-light text-[clamp(36px,5.6vw,68px)] leading-[1.05] tracking-tight text-[#F1F7FA] max-w-[900px] mx-auto">
            {t('foot.sign')}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-10 md:gap-14 border-t border-[rgba(244,239,230,0.15)] pt-12">
          <div>
            <div className="label-caps text-[#67E8F9] text-[10px] mb-4">{t('foot.address')}</div>
            <div className="serif text-[16px] leading-[1.6] text-[#F1F7FA]/90">
              <div>{BUSINESS.name}</div>
              <div className="text-[#F1F7FA]/70 mt-1">{BUSINESS.address}</div>
            </div>
          </div>

          <div>
            <div className="label-caps text-[#67E8F9] text-[10px] mb-4">{t('foot.contact')}</div>
            <ul className="space-y-2.5 text-[14.5px] text-[#F1F7FA]/85">
              <li className="flex items-center gap-2.5">
                <Phone size={13} className="text-[#67E8F9]" />
                <a href={`tel:${BUSINESS.phoneRaw}`} className="hover:text-white">{BUSINESS.phone}</a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail size={13} className="text-[#67E8F9]" />
                <a href={`mailto:${BUSINESS.email}`} className="hover:text-white">{BUSINESS.email}</a>
              </li>
              <li className="flex items-center gap-2.5">
                <MapPin size={13} className="text-[#67E8F9]" />
                <a href={BUSINESS.mapsUrl} target="_blank" rel="noopener noreferrer"
                  className="hover:text-white">Open in Google Maps</a>
              </li>
            </ul>
          </div>

          <div>
            <div className="label-caps text-[#67E8F9] text-[10px] mb-4">{t('foot.season')}</div>
            <p className="serif italic text-[15.5px] text-[#F1F7FA]/80 leading-[1.55]">
              {t('foot.hours')}
            </p>
          </div>
        </div>

        <div className="mt-12 pt-7 border-t border-[rgba(244,239,230,0.10)] flex flex-col md:flex-row items-center justify-between gap-4 text-[12.5px] text-[#F1F7FA]/55">
          <div>© {year} {BUSINESS.name}. {t('foot.copy')}</div>
          <div className="flex items-center gap-2">
            <Heart size={11} className="text-[#67E8F9]" />
            <span>{t('foot.preview')}</span>
            <a href="https://cloz.digital" target="_blank" rel="noopener noreferrer"
              className="font-semibold text-[#67E8F9] hover:text-white">cloz.digital</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
