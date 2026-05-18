import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Loader2, CheckCircle2, AlertCircle, MessageCircle, Send, Calendar, Users, Mail, Phone, User } from 'lucide-react'
import { useI18n, useT } from '@/i18n/useI18n'
import { Reveal } from '@/motion/primitives'
import { PACKAGES, BUSINESS } from '@/data/content'
import { SectionHeader } from './Experiences'

const DRAFT_KEY = 'raftboys_booking_draft_v1'
// Optional. When set, the form POSTs JSON to this endpoint. Otherwise
// we treat the submission as successful client-side (concept preview).
// In production, point this at a serverless function / Resend / Cloz
// Digital's /api/public/inquiry.
const ENDPOINT = import.meta.env.VITE_BOOKING_ENDPOINT || ''

function todayISO() {
  const d = new Date()
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

export function Booking() {
  const t = useT()
  const { lang } = useI18n()

  const [form, setForm] = useState(() => {
    const defaults = {
      name: '', email: '', phone: '',
      date: '', package: 'classic', group: 2,
      dietary: '', message: '', consent: true,
      website_url: '', // honeypot
    }
    try {
      const raw = localStorage.getItem(DRAFT_KEY)
      if (raw) return { ...defaults, ...JSON.parse(raw), website_url: '' }
    } catch {}
    return defaults
  })
  const [phase, setPhase] = useState('idle') // idle | sending | success | error
  const [error, setError] = useState('')

  // Persist draft (except honeypot)
  useEffect(() => {
    try {
      const { website_url, ...persist } = form
      const hasContent = Object.values(persist).some(v => typeof v === 'string' ? v.trim() : !!v)
      if (hasContent) localStorage.setItem(DRAFT_KEY, JSON.stringify(persist))
    } catch {}
  }, [form])

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const validate = () => {
    if (!form.name.trim() || form.name.trim().length < 2) return t('book.err.name')
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) return t('book.err.email')
    if (!form.date) return t('book.err.date')
    if (!form.group || form.group < 1) return t('book.err.group')
    return ''
  }

  const submit = async (e) => {
    e.preventDefault()
    setError('')
    if (form.website_url) { setPhase('success'); return } // silently swallow bot
    const err = validate()
    if (err) { setError(err); return }

    setPhase('sending')

    const payload = { ...form, lang, source: 'raftboys_website', submitted_at: new Date().toISOString() }

    // If a real endpoint is configured, POST. Otherwise treat as
    // success after a short delay — concept-preview mode.
    if (ENDPOINT) {
      try {
        const res = await fetch(ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })
        if (!res.ok) throw new Error(`Server returned ${res.status}`)
      } catch (e2) {
        // Network failure → still let the visitor through to WhatsApp.
        // The non-negotiable rule from the Cloz inquiry endpoint:
        // never lose a prospect because of an SMTP/network issue.
        setError(t('book.err.network'))
        setPhase('error')
        return
      }
    } else {
      // Concept-preview: simulate a server roundtrip.
      await new Promise(r => setTimeout(r, 700))
    }

    try { localStorage.removeItem(DRAFT_KEY) } catch {}
    setPhase('success')
  }

  const waText = encodeURIComponent(
    `Hi Raft Boys — I'd like to book the ${t(`pkg.${form.package}.t`)} on ${form.date || '[date]'} for ${form.group} ${form.group === 1 ? 'person' : 'people'}.\n\nName: ${form.name}\nEmail: ${form.email}`
  )
  const waUrl = `https://wa.me/${BUSINESS.whatsapp}?text=${waText}`

  return (
    <section id="booking" className="relative py-24 md:py-32 px-5 md:px-8 border-t border-white/5 section-glow">
      <div className="relative max-w-[1100px] mx-auto">
        <Reveal>
          <SectionHeader
            eyebrow={t('book.eyebrow')}
            title={t('book.title')}
            sub={t('book.sub')}
            centered
          />
        </Reveal>

        <Reveal delay={0.1} className="mt-12">
          <div className="grid lg:grid-cols-5 gap-6">
            {/* Form */}
            <form onSubmit={submit} className="lg:col-span-3 card-premium !p-6 md:!p-8" noValidate>
              {/* Honeypot */}
              <input type="text" tabIndex={-1} autoComplete="off" aria-hidden="true"
                value={form.website_url} onChange={e => set('website_url', e.target.value)}
                style={{ position: 'absolute', left: '-9999px' }} />

              <AnimatePresence mode="wait">
                {phase === 'success' ? (
                  <motion.div key="ok"
                    initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                    className="py-10 text-center"
                  >
                    <div className="relative inline-flex">
                      <div className="absolute inset-0 rounded-full bg-emerald-500/20 animate-glow-pulse" />
                      <div className="relative w-16 h-16 rounded-full bg-emerald-500/10 border-2 border-emerald-500/30 flex items-center justify-center">
                        <CheckCircle2 size={28} className="text-emerald-400" />
                      </div>
                    </div>
                    <h3 className="mt-6 font-display font-bold text-[22px] text-white">{t('book.success.t')}</h3>
                    <p className="mt-3 text-[14px] text-white/65 max-w-[420px] mx-auto leading-relaxed">{t('book.success.d')}</p>
                    <a href={waUrl} target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 mt-7 text-[13px] text-emerald-400 hover:text-emerald-300 font-semibold">
                      <MessageCircle size={14} /> {t('book.f.whatsapp')}
                    </a>
                  </motion.div>
                ) : (
                  <motion.div key="form"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="space-y-4"
                  >
                    {error && (
                      <div className="bg-rose-500/10 border border-rose-500/30 rounded-md px-3 py-2.5 flex items-center gap-2 text-[12.5px] text-rose-200">
                        <AlertCircle size={13} /> <span>{error}</span>
                      </div>
                    )}

                    <div className="grid sm:grid-cols-2 gap-3">
                      <Field label={t('book.f.name')} icon={User} required>
                        <Input value={form.name} onChange={e => set('name', e.target.value)} autoComplete="name" />
                      </Field>
                      <Field label={t('book.f.email')} icon={Mail} required>
                        <Input type="email" value={form.email} onChange={e => set('email', e.target.value)} autoComplete="email" />
                      </Field>
                    </div>

                    <Field label={t('book.f.phone')} icon={Phone}>
                      <Input value={form.phone} onChange={e => set('phone', e.target.value)} autoComplete="tel" placeholder="+387 …" />
                    </Field>

                    <div className="grid sm:grid-cols-3 gap-3">
                      <Field label={t('book.f.date')} icon={Calendar} required>
                        <Input type="date" min={todayISO()} value={form.date} onChange={e => set('date', e.target.value)} />
                      </Field>
                      <Field label={t('book.f.package')}>
                        <Select value={form.package} onChange={e => set('package', e.target.value)}>
                          {PACKAGES.map(p => (
                            <option key={p.key} value={p.key}>{t(`pkg.${p.key}.t`)} — €{p.priceFrom}</option>
                          ))}
                        </Select>
                      </Field>
                      <Field label={t('book.f.group')} icon={Users} required>
                        <Input type="number" min="1" max="40" value={form.group}
                          onChange={e => set('group', Math.max(1, Math.min(40, parseInt(e.target.value) || 1)))} />
                      </Field>
                    </div>

                    <Field label={t('book.f.dietary')}>
                      <Input value={form.dietary} onChange={e => set('dietary', e.target.value)} placeholder={t('book.f.dietary.ph')} />
                    </Field>

                    <Field label={t('book.f.message')}>
                      <textarea value={form.message} onChange={e => set('message', e.target.value)} rows={3}
                        placeholder={t('book.f.message.ph')}
                        className="w-full bg-[#06100D] border border-white/10 rounded-md px-3 py-2.5 text-[13.5px] text-white placeholder:text-white/30 focus:border-emerald-400 focus:outline-none resize-none" />
                    </Field>

                    <label className="flex items-start gap-2 text-[12px] text-white/65 pt-1">
                      <input type="checkbox" checked={form.consent} onChange={e => set('consent', e.target.checked)}
                        className="mt-0.5 accent-emerald-500" />
                      <span>{t('book.f.consent')}</span>
                    </label>

                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                      <button type="submit" disabled={phase === 'sending' || !form.consent}
                        className="btn-primary justify-center flex-1 disabled:opacity-50 disabled:cursor-not-allowed">
                        {phase === 'sending'
                          ? <><Loader2 size={14} className="animate-spin" />{t('book.f.sending')}</>
                          : <><Send size={14} />{t('book.f.submit')}</>}
                      </button>
                      <a href={waUrl} target="_blank" rel="noopener noreferrer"
                        className="btn-ghost justify-center sm:!w-auto !bg-[#25D366]/15 !border-[#25D366]/30 !text-[#25D366] hover:!bg-[#25D366]/25">
                        <MessageCircle size={14} /> WhatsApp
                      </a>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>

            {/* Sidebar — quick facts */}
            <div className="lg:col-span-2 space-y-4">
              <div className="card-premium">
                <h4 className="font-display font-semibold text-[14px] text-white mb-3">{BUSINESS.name}</h4>
                <ul className="space-y-2.5 text-[13px] text-white/75">
                  <li className="flex items-start gap-2.5">
                    <Phone size={14} className="text-emerald-400 mt-0.5 shrink-0" />
                    <a href={`tel:${BUSINESS.phoneRaw}`} className="hover:text-white">{BUSINESS.phone}</a>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Mail size={14} className="text-emerald-400 mt-0.5 shrink-0" />
                    <a href={`mailto:${BUSINESS.email}`} className="hover:text-white">{BUSINESS.email}</a>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Calendar size={14} className="text-emerald-400 mt-0.5 shrink-0" />
                    <span>{BUSINESS.hours}</span>
                  </li>
                </ul>
              </div>

              <div className="rounded-2xl p-5 bg-gradient-to-br from-emerald-500/12 via-cyan-500/8 to-transparent border border-emerald-500/20">
                <h4 className="font-display font-semibold text-[14px] text-white mb-2">⚡ Reply within 30 minutes</h4>
                <p className="text-[12.5px] text-white/70 leading-relaxed">
                  During business hours, a real person from our team replies to every booking request within 30 minutes — usually faster.
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function Field({ label, icon: Icon, required, children }) {
  return (
    <label className="block">
      <span className="flex items-center gap-1.5 text-[10.5px] text-white/55 uppercase tracking-wider font-semibold mb-1.5">
        {Icon && <Icon size={11} />}
        {label}{required && <span className="text-emerald-400 ml-0.5">*</span>}
      </span>
      {children}
    </label>
  )
}
function Input({ ...props }) {
  return (
    <input {...props}
      className="w-full bg-[#06100D] border border-white/10 rounded-md px-3 py-2.5 text-[13.5px] text-white placeholder:text-white/30 focus:border-emerald-400 focus:outline-none transition-colors" />
  )
}
function Select({ children, ...props }) {
  return (
    <select {...props}
      className="w-full bg-[#06100D] border border-white/10 rounded-md px-3 py-2.5 text-[13.5px] text-white focus:border-emerald-400 focus:outline-none transition-colors appearance-none">
      {children}
    </select>
  )
}
