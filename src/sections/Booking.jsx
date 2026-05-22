import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  CheckCircle2, Send, MessageCircle, Phone, Mail, MapPin, Clock,
  ShieldCheck, Calendar, Sparkles,
} from 'lucide-react'
import { useT } from '@/i18n/useI18n'
import { BUSINESS } from '@/data/content'
import { IMG } from '@/data/assets'

// Conversion-focused booking spread:
//   • paper background, premium card form
//   • response-time guarantee + trust badges
//   • availability nudge for peak season
//   • WhatsApp escape hatch
//   • optimistic success state

export function Booking() {
  const t = useT()
  const [state, setState] = useState({
    name: '', email: '', phone: '', date: '',
    package: 'rafting', group: 2, dietary: '', message: '', consent: false,
  })
  const [errors, setErrors] = useState({})
  const [sending, setSending] = useState(false)
  const [done, setDone] = useState(false)

  const upd = (k) => (e) =>
    setState(s => ({ ...s, [k]: e.target.type === 'checkbox' ? e.target.checked : e.target.value }))

  const validate = () => {
    const e = {}
    if (!state.name.trim())                   e.name  = t('book.err.name')
    if (!/^\S+@\S+\.\S+$/.test(state.email))  e.email = t('book.err.email')
    if (!state.date)                          e.date  = t('book.err.date')
    if (Number(state.group) < 1)              e.group = t('book.err.group')
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const submit = (ev) => {
    ev.preventDefault()
    if (!validate()) return
    setSending(true)
    setTimeout(() => { setSending(false); setDone(true) }, 900)
  }

  const waMsg = `Hi Raft Boys — I'd like to reserve ${state.package} for ${state.group} on ${state.date || '…'}.`
  const waUrl = `https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent(waMsg)}`

  return (
    <section id="booking" className="relative bg-[#F1F7FA] text-[#0F172A] py-24 md:py-36">
      <div className="max-w-[1320px] mx-auto px-5 md:px-12">
        {/* Header */}
        <div className="grid md:grid-cols-12 gap-10 mb-14 md:mb-20">
          <div className="md:col-span-3">
            <div className="label-caps text-[#0284C7]">{t('book.eyebrow')}</div>
          </div>
          <div className="md:col-span-9">
            <h2 className="serif text-[clamp(36px,6vw,80px)] font-medium leading-[1.02] tracking-tight">
              {t('book.title')}{' '}
              <span className="serif-italic font-light text-[#0EA5E9]">{t('book.title.italic')}</span>
            </h2>
            <p className="serif italic text-[19px] md:text-[21px] text-[#334155] mt-6 max-w-[680px] leading-[1.45]">
              {t('book.lead')}
            </p>

            {/* Trust badges — prominent, motion-cued */}
            <motion.div
              initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-8 flex flex-wrap gap-3"
            >
              {[
                { icon: Clock,        text: t('book.guarantee') },
                { icon: ShieldCheck,  text: t('book.secure') },
                { icon: Sparkles,     text: t('book.availability') },
              ].map(({ icon: Icon, text }) => (
                <span key={text}
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-white border border-[rgba(14,165,233,0.25)] text-[12.5px] font-semibold text-[#0F172A] shadow-[0_4px_18px_-8px_rgba(14,165,233,0.35)]">
                  <Icon size={14} className="text-[#0EA5E9]" />
                  {text}
                </span>
              ))}
            </motion.div>
          </div>
        </div>

        <div className="grid md:grid-cols-12 gap-10 md:gap-14 items-start">
          {/* Left column: photo + trust stack + contact */}
          <div className="md:col-span-5 space-y-6">
            <div className="frame relative">
              <div className="aspect-[4/5] overflow-hidden">
                <img src={IMG.gallery[3]} alt="" loading="lazy"
                  className="w-full h-full object-cover" />
              </div>
              {/* Caption stripe */}
              <div className="absolute bottom-0 left-0 right-0 px-5 py-4 bg-gradient-to-t from-[#0F172A]/90 to-transparent">
                <div className="label-caps text-[#67E8F9] text-[10px]">№ Booking</div>
                <div className="serif italic text-[15px] text-white mt-0.5">A real person replies within 30 minutes.</div>
              </div>
            </div>

            {/* Trust stack */}
            <div className="bg-white border border-[rgba(15,23,42,0.08)] rounded-sm divide-y divide-[rgba(15,23,42,0.08)]">
              {[
                { icon: Clock,       t: t('book.guarantee'),    d: t('book.guarantee.d') },
                { icon: ShieldCheck, t: t('book.secure'),       d: t('book.secure.d') },
                { icon: Sparkles,    t: t('book.availability'), d: t('book.availability.d') },
              ].map(({ icon: Icon, t: title, d }) => (
                <div key={title} className="p-5 flex items-start gap-3.5">
                  <span className="w-9 h-9 rounded-full bg-[#0EA5E9]/10 border border-[#0EA5E9]/25 flex items-center justify-center shrink-0">
                    <Icon size={15} className="text-[#0284C7]" />
                  </span>
                  <div>
                    <div className="serif text-[15.5px] font-semibold text-[#0F172A] leading-tight">{title}</div>
                    <div className="text-[13.5px] text-[#475569] mt-1 leading-[1.55]">{d}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Contact card */}
            <div className="bg-white border border-[rgba(15,23,42,0.08)] rounded-sm p-6">
              <div className="label-caps text-[#0284C7] text-[10px] mb-4">{t('foot.contact')}</div>
              <ul className="space-y-3 text-[14.5px] text-[#334155]">
                <li className="flex items-start gap-3">
                  <MapPin size={16} className="text-[#0EA5E9] mt-0.5 shrink-0" />
                  <span>{BUSINESS.address}</span>
                </li>
                <li className="flex items-start gap-3">
                  <Phone size={16} className="text-[#0EA5E9] mt-0.5 shrink-0" />
                  <a href={`tel:${BUSINESS.phoneRaw}`} className="hover:text-[#0284C7] font-semibold">{BUSINESS.phone}</a>
                </li>
                <li className="flex items-start gap-3">
                  <Mail size={16} className="text-[#0EA5E9] mt-0.5 shrink-0" />
                  <a href={`mailto:${BUSINESS.email}`} className="hover:text-[#0284C7]">{BUSINESS.email}</a>
                </li>
              </ul>
              <a href={waUrl} target="_blank" rel="noopener noreferrer"
                className="mt-5 inline-flex items-center justify-center gap-2 w-full px-4 py-3.5 rounded-sm bg-[#25D366] text-white text-[14px] font-semibold hover:bg-[#1FBA59] transition-colors shadow-[0_8px_24px_-8px_rgba(37,211,102,0.55)]">
                <MessageCircle size={16} /> {t('book.f.whatsapp')}
              </a>
            </div>
          </div>

          {/* Right column: form */}
          <div className="md:col-span-7">
            <AnimatePresence mode="wait">
              {done ? (
                <motion.div key="done"
                  initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  className="bg-white border border-[rgba(15,23,42,0.08)] rounded-sm p-10 md:p-14 text-center shadow-[0_20px_60px_-30px_rgba(14,165,233,0.45)]">
                  <div className="inline-flex w-20 h-20 rounded-full bg-[#0EA5E9]/10 border-2 border-[#0EA5E9]/35 items-center justify-center mb-6">
                    <CheckCircle2 size={34} className="text-[#0EA5E9]" />
                  </div>
                  <h3 className="serif text-[clamp(32px,3.8vw,44px)] font-medium tracking-tight leading-tight">
                    {t('book.success.t')}
                  </h3>
                  <p className="serif italic text-[17px] text-[#475569] mt-5 max-w-[440px] mx-auto leading-[1.5]">
                    {t('book.success.d')}
                  </p>
                  <div className="mt-8 inline-flex items-center gap-2 text-[12.5px] text-[#0284C7] font-semibold">
                    <Clock size={14} /> {t('book.guarantee')}
                  </div>
                </motion.div>
              ) : (
                <motion.form key="form" onSubmit={submit}
                  initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="bg-white border border-[rgba(15,23,42,0.08)] rounded-sm p-7 md:p-10 space-y-6 shadow-[0_20px_60px_-30px_rgba(15,23,42,0.2)]">

                  <div className="grid sm:grid-cols-2 gap-5">
                    <Field label={t('book.f.name')} required error={errors.name}>
                      <input type="text" value={state.name} onChange={upd('name')} className={inp} placeholder="Jane Doe" />
                    </Field>
                    <Field label={t('book.f.email')} required error={errors.email}>
                      <input type="email" value={state.email} onChange={upd('email')} className={inp} placeholder="you@email.com" />
                    </Field>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <Field label={t('book.f.phone')}>
                      <input type="tel" value={state.phone} onChange={upd('phone')} className={inp} placeholder="+387 ..." />
                    </Field>
                    <Field label={t('book.f.date')} required error={errors.date} icon={Calendar}>
                      <input type="date" value={state.date} onChange={upd('date')} className={inp} />
                    </Field>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <Field label={t('book.f.package')}>
                      <select value={state.package} onChange={upd('package')} className={inp}>
                        <option value="rafting">{t('pkg.rafting.t')} — €50</option>
                        <option value="short_rafting">{t('pkg.short_rafting.t')} — €35</option>
                        <option value="canoe">{t('pkg.canoe.t')} — €50 / €60</option>
                        <option value="canyoning">{t('pkg.canyoning.t')} — €95</option>
                        <option value="hiking">{t('pkg.hiking.t')} — €45</option>
                        <option value="special">{t('pkg.special.t')} — {t('pkg.priceOnReq')}</option>
                      </select>
                    </Field>
                    <Field label={t('book.f.group')} required error={errors.group}>
                      <input type="number" min={1} max={40} value={state.group} onChange={upd('group')} className={inp} />
                    </Field>
                  </div>

                  <Field label={t('book.f.dietary')}>
                    <input type="text" value={state.dietary} onChange={upd('dietary')} className={inp}
                      placeholder={t('book.f.dietary.ph')} />
                  </Field>

                  <Field label={t('book.f.message')}>
                    <textarea rows={3} value={state.message} onChange={upd('message')} className={inp}
                      placeholder={t('book.f.message.ph')} />
                  </Field>

                  <label className="flex items-start gap-3 text-[13.5px] text-[#475569] cursor-pointer">
                    <input type="checkbox" checked={state.consent} onChange={upd('consent')}
                      className="mt-1 accent-[#0EA5E9] w-4 h-4" />
                    <span>{t('book.f.consent')}</span>
                  </label>

                  <div className="space-y-3">
                    <button type="submit" disabled={sending || !state.consent}
                      className="btn-river w-full justify-center text-[15px] disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none">
                      {sending ? (
                        <span className="inline-flex items-center gap-2">
                          <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          {t('book.f.sending')}
                        </span>
                      ) : (
                        <>{t('book.f.submit')} <Send size={15} /></>
                      )}
                    </button>

                    <div className="flex items-center gap-3 text-[12px] text-[#64748B]">
                      <span className="flex-1 h-px bg-[rgba(15,23,42,0.10)]" />
                      <span>{t('book.or')}</span>
                      <span className="flex-1 h-px bg-[rgba(15,23,42,0.10)]" />
                    </div>

                    <a href={waUrl} target="_blank" rel="noopener noreferrer"
                      className="inline-flex w-full items-center justify-center gap-2 px-4 py-3.5 rounded-sm bg-[#25D366] hover:bg-[#1FBA59] text-white text-[14px] font-semibold transition-colors">
                      <MessageCircle size={16} /> {t('book.f.whatsapp')}
                    </a>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}

const inp = 'w-full bg-[#F8FAFC] border border-[rgba(15,23,42,0.12)] rounded-sm px-4 py-3 text-[15px] text-[#0F172A] placeholder:text-[#94A3B8] focus:border-[#0EA5E9] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0EA5E9]/15 transition-all'

function Field({ label, error, required, children }) {
  return (
    <div>
      <label className="label-caps text-[#475569] text-[10.5px] mb-1.5 block">
        {label}{required && <span className="text-[#0EA5E9] ml-0.5">*</span>}
      </label>
      {children}
      {error && <p className="serif italic text-[12.5px] text-[#DC2626] mt-1.5">{error}</p>}
    </div>
  )
}
