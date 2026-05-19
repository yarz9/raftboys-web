import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, Send, MessageCircle, Phone, Mail, MapPin, Clock } from 'lucide-react'
import { useT } from '@/i18n/useI18n'
import { BUSINESS } from '@/data/content'
import { IMG } from '@/data/assets'

// Editorial booking spread — paper background, large image on left,
// honest form on right. No floating glass cards. Real responses,
// real validation, plain language.

export function Booking() {
  const t = useT()
  const [state, setState] = useState({ name: '', email: '', phone: '', date: '', package: 'classic', group: 2, dietary: '', message: '', consent: false })
  const [errors, setErrors] = useState({})
  const [sending, setSending] = useState(false)
  const [done, setDone] = useState(false)

  const upd = (k) => (e) => setState(s => ({ ...s, [k]: e.target.type === 'checkbox' ? e.target.checked : e.target.value }))

  const validate = () => {
    const e = {}
    if (!state.name.trim())            e.name  = t('book.err.name')
    if (!/^\S+@\S+\.\S+$/.test(state.email)) e.email = t('book.err.email')
    if (!state.date)                   e.date  = t('book.err.date')
    if (Number(state.group) < 1)       e.group = t('book.err.group')
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const submit = (ev) => {
    ev.preventDefault()
    if (!validate()) return
    setSending(true)
    // Simulated submit for the concept preview.
    setTimeout(() => { setSending(false); setDone(true) }, 900)
  }

  const waUrl = `https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent(`Hi Raft Boys — I'd like to reserve ${state.package} for ${state.group} on ${state.date || '…'}.`)}`

  return (
    <section id="booking" className="relative bg-[#F1F7FA] text-[#0F172A] py-24 md:py-36">
      <div className="max-w-[1320px] mx-auto px-5 md:px-12">
        {/* Header */}
        <div className="grid md:grid-cols-12 gap-10 mb-14 md:mb-20">
          <div className="md:col-span-3">
            <div className="label-caps text-[#0284C7]">{t('book.eyebrow')}</div>
          </div>
          <div className="md:col-span-9">
            <h2 className="serif text-[clamp(34px,5.8vw,76px)] font-medium leading-[1.02] tracking-tight">
              {t('book.title')}{' '}
              <span className="serif-italic font-light text-[#0EA5E9]">{t('book.title.italic')}</span>
            </h2>
            <p className="serif italic text-[18px] md:text-[20px] text-[#475569] mt-6 max-w-[640px] leading-[1.45]">
              {t('book.lead')}
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-12 gap-10 md:gap-14 items-start">
          {/* Photo column + contact card */}
          <div className="md:col-span-5 space-y-6">
            <div className="frame">
              <div className="aspect-[4/5] overflow-hidden">
                <img src={IMG.gallery[3]} alt="" loading="lazy"
                  className="w-full h-full object-cover" />
              </div>
            </div>

            <div className="bg-white border border-[rgba(15,23,42,0.08)] rounded-sm p-6 md:p-7">
              <div className="label-caps text-[#0284C7] text-[10px] mb-4">{t('foot.contact')}</div>
              <ul className="space-y-3.5 text-[14.5px] text-[#334155]">
                <li className="flex items-start gap-3">
                  <MapPin size={16} className="text-[#0EA5E9] mt-0.5 shrink-0" />
                  <span>{BUSINESS.address}</span>
                </li>
                <li className="flex items-start gap-3">
                  <Phone size={16} className="text-[#0EA5E9] mt-0.5 shrink-0" />
                  <a href={`tel:${BUSINESS.phoneRaw}`} className="hover:text-[#0284C7]">{BUSINESS.phone}</a>
                </li>
                <li className="flex items-start gap-3">
                  <Mail size={16} className="text-[#0EA5E9] mt-0.5 shrink-0" />
                  <a href={`mailto:${BUSINESS.email}`} className="hover:text-[#0284C7]">{BUSINESS.email}</a>
                </li>
                <li className="flex items-start gap-3">
                  <Clock size={16} className="text-[#0EA5E9] mt-0.5 shrink-0" />
                  <span>{t('foot.hours')}</span>
                </li>
              </ul>
              <a href={waUrl} target="_blank" rel="noopener noreferrer"
                className="mt-6 inline-flex items-center justify-center gap-2 w-full px-4 py-3 rounded-sm bg-[#25D366] text-white text-[14px] font-semibold hover:bg-[#1FBA59] transition-colors">
                <MessageCircle size={16} /> {t('book.f.whatsapp')}
              </a>
            </div>
          </div>

          {/* Form */}
          <div className="md:col-span-7">
            <AnimatePresence mode="wait">
              {done ? (
                <motion.div key="done"
                  initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                  className="bg-white border border-[rgba(15,23,42,0.08)] rounded-sm p-10 md:p-14 text-center">
                  <div className="inline-flex w-16 h-16 rounded-full bg-[#0EA5E9]/10 border-2 border-[#0EA5E9]/30 items-center justify-center mb-6">
                    <CheckCircle2 size={28} className="text-[#0EA5E9]" />
                  </div>
                  <h3 className="serif text-[clamp(28px,3.4vw,38px)] font-medium tracking-tight leading-tight">
                    {t('book.success.t')}
                  </h3>
                  <p className="serif italic text-[16px] text-[#475569] mt-4 max-w-[440px] mx-auto">
                    {t('book.success.d')}
                  </p>
                </motion.div>
              ) : (
                <motion.form key="form" onSubmit={submit}
                  initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                  className="bg-white border border-[rgba(15,23,42,0.08)] rounded-sm p-7 md:p-10 space-y-6">

                  <div className="grid sm:grid-cols-2 gap-5">
                    <Field label={t('book.f.name')} error={errors.name}>
                      <input type="text" value={state.name} onChange={upd('name')} className={inp} placeholder="Jane Doe" />
                    </Field>
                    <Field label={t('book.f.email')} error={errors.email}>
                      <input type="email" value={state.email} onChange={upd('email')} className={inp} placeholder="you@email.com" />
                    </Field>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <Field label={t('book.f.phone')}>
                      <input type="tel" value={state.phone} onChange={upd('phone')} className={inp} placeholder="+387 ..." />
                    </Field>
                    <Field label={t('book.f.date')} error={errors.date}>
                      <input type="date" value={state.date} onChange={upd('date')} className={inp} />
                    </Field>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <Field label={t('book.f.package')}>
                      <select value={state.package} onChange={upd('package')} className={inp}>
                        <option value="classic">{t('pkg.classic.t')}</option>
                        <option value="premium">{t('pkg.premium.t')}</option>
                        <option value="expedition">{t('pkg.expedition.t')}</option>
                      </select>
                    </Field>
                    <Field label={t('book.f.group')} error={errors.group}>
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
                      className="mt-1 accent-[#0EA5E9]" />
                    <span>{t('book.f.consent')}</span>
                  </label>

                  <button type="submit" disabled={sending || !state.consent}
                    className="btn-river w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed">
                    {sending ? t('book.f.sending') : <>{t('book.f.submit')} <Send size={15} /></>}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}

const inp = 'w-full bg-[#F8FAFC] border border-[rgba(15,23,42,0.12)] rounded-sm px-3.5 py-2.5 text-[14.5px] text-[#0F172A] placeholder:text-[#94A3B8] focus:border-[#0EA5E9] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0EA5E9]/15 transition-all'

function Field({ label, error, children }) {
  return (
    <div>
      <label className="label-caps text-[#475569] text-[10px] mb-1.5 block">{label}</label>
      {children}
      {error && <p className="serif italic text-[12.5px] text-[#DC2626] mt-1.5">{error}</p>}
    </div>
  )
}
