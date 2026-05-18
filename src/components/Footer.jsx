import { MapPin, Mail, Phone, Waves, Heart } from 'lucide-react'
import { useT } from '@/i18n/useI18n'
import { BUSINESS } from '@/data/content'

export function Footer() {
  const t = useT()
  return (
    <footer className="relative border-t border-white/5 bg-[#06100D]">
      <div className="max-w-[1280px] mx-auto px-5 md:px-8 py-14">
        <div className="grid md:grid-cols-12 gap-10">
          {/* Brand */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center">
                <Waves size={16} strokeWidth={2.5} className="text-white" />
              </span>
              <span className="font-display font-bold text-[16px] text-white">{BUSINESS.name}</span>
            </div>
            <p className="text-[13px] text-white/65 leading-relaxed max-w-[360px]">{t('foot.tagline')}</p>
            <div className="mt-5 space-y-2 text-[12.5px] text-white/65">
              <div className="flex items-center gap-2"><MapPin size={12} className="text-emerald-400" /> {BUSINESS.address}</div>
              <div className="flex items-center gap-2"><Phone size={12} className="text-emerald-400" /> <a href={`tel:${BUSINESS.phoneRaw}`} className="hover:text-white">{BUSINESS.phone}</a></div>
              <div className="flex items-center gap-2"><Mail size={12} className="text-emerald-400" /> <a href={`mailto:${BUSINESS.email}`} className="hover:text-white">{BUSINESS.email}</a></div>
            </div>
          </div>

          {/* Nav cols */}
          <div className="md:col-span-3">
            <h4 className="text-[11px] uppercase tracking-[0.15em] text-white/40 font-semibold mb-4">{t('nav.experiences')}</h4>
            <ul className="space-y-2.5 text-[13px]">
              <li><a href="#experiences" className="text-white/70 hover:text-white">{t('exp.rafting.t')}</a></li>
              <li><a href="#experiences" className="text-white/70 hover:text-white">{t('exp.canoeing.t')}</a></li>
              <li><a href="#experiences" className="text-white/70 hover:text-white">{t('exp.hiking.t')}</a></li>
              <li><a href="#experiences" className="text-white/70 hover:text-white">{t('exp.packages.t')}</a></li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <h4 className="text-[11px] uppercase tracking-[0.15em] text-white/40 font-semibold mb-4">{t('nav.packages')}</h4>
            <ul className="space-y-2.5 text-[13px]">
              <li><a href="#packages" className="text-white/70 hover:text-white">{t('pkg.classic.t')}</a></li>
              <li><a href="#packages" className="text-white/70 hover:text-white">{t('pkg.premium.t')}</a></li>
              <li><a href="#packages" className="text-white/70 hover:text-white">{t('pkg.weekend.t')}</a></li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <h4 className="text-[11px] uppercase tracking-[0.15em] text-white/40 font-semibold mb-4">{t('nav.contact')}</h4>
            <ul className="space-y-2.5 text-[13px]">
              <li><a href="#booking" className="text-white/70 hover:text-white">{t('nav.book')}</a></li>
              <li><a href="#gallery" className="text-white/70 hover:text-white">{t('nav.gallery')}</a></li>
              <li><a href="#guides" className="text-white/70 hover:text-white">{t('nav.guides')}</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <span className="text-[12px] text-white/50">
            © {new Date().getFullYear()} {BUSINESS.name}. {t('foot.copy')}
          </span>
          <span className="inline-flex items-center gap-1.5 text-[11px] text-white/50">
            <Heart size={11} className="text-emerald-400" />
            {t('foot.preview')}
            <a href="https://cloz.digital" target="_blank" rel="noopener noreferrer"
              className="font-semibold text-emerald-400 hover:text-emerald-300 ml-1">cloz.digital</a>
          </span>
        </div>
      </div>
    </footer>
  )
}
