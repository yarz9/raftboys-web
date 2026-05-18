// Motion primitives — Reveal, RevealStagger/Item, MagneticButton,
// SpotlightCard, CountUp, ScrollProgress, Parallax.
// All respect prefers-reduced-motion.

import { useRef, useEffect, useState } from 'react'
import {
  motion, useReducedMotion, useScroll, useSpring, useMotionValue,
  useInView, useTransform,
} from 'framer-motion'

// ─── Reveal ──────────────────────────────────────────────────
export function Reveal({ as = 'div', delay = 0, y = 24, once = true, className = '', children, ...rest }) {
  const reduce = useReducedMotion()
  const T = motion[as] || motion.div
  if (reduce) return <T className={className} {...rest}>{children}</T>
  return (
    <T
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: '-80px 0px -80px 0px' }}
      transition={{ duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] }}
      {...rest}
    >{children}</T>
  )
}

export function RevealStagger({ children, className = '', delay = 0, gap = 0.08, once = true }) {
  const reduce = useReducedMotion()
  if (reduce) return <div className={className}>{children}</div>
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once, margin: '-60px 0px' }}
      variants={{ hidden: {}, show: { transition: { delayChildren: delay, staggerChildren: gap } } }}
    >{children}</motion.div>
  )
}

export function RevealItem({ className = '', y = 18, children, ...rest }) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y },
        show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
      }}
      {...rest}
    >{children}</motion.div>
  )
}

// ─── MagneticButton ──────────────────────────────────────────
export function MagneticButton({ as = 'button', href, className = '', pullStrength = 0.22, children, ...rest }) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 })
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 })

  const onMove = (e) => {
    if (reduce || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    x.set((e.clientX - (r.left + r.width / 2)) * pullStrength)
    y.set((e.clientY - (r.top + r.height / 2)) * pullStrength)
  }
  const onLeave = () => { x.set(0); y.set(0) }

  const Tag = href ? motion.a : motion[as] || motion.button
  return (
    <Tag
      ref={ref}
      href={href}
      style={{ x: sx, y: sy }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={className}
      {...rest}
    >{children}</Tag>
  )
}

// ─── SpotlightCard ───────────────────────────────────────────
export function SpotlightCard({ as: Tag = 'div', className = '', children, ...rest }) {
  const ref = useRef(null)
  const onMove = (e) => {
    const el = ref.current; if (!el) return
    const r = el.getBoundingClientRect()
    el.style.setProperty('--spot-x', `${e.clientX - r.left}px`)
    el.style.setProperty('--spot-y', `${e.clientY - r.top}px`)
    el.style.setProperty('--spot-opacity', '1')
  }
  const onLeave = () => { ref.current?.style.setProperty('--spot-opacity', '0') }
  return (
    <Tag
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`spotlight ${className}`}
      {...rest}
    >{children}</Tag>
  )
}

// ─── CountUp (scroll-triggered) ──────────────────────────────
export function CountUp({ to, duration = 1.4, suffix = '', prefix = '', className = '', decimals = 0 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px 0px' })
  const reduce = useReducedMotion()
  const [val, setVal] = useState(reduce ? to : 0)

  useEffect(() => {
    if (!inView || reduce) return
    const start = performance.now()
    let raf
    const tick = (now) => {
      const t = Math.min(1, (now - start) / (duration * 1000))
      const eased = 1 - Math.pow(1 - t, 3)
      setVal(to * eased)
      if (t < 1) raf = requestAnimationFrame(tick)
      else setVal(to)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, to, duration, reduce])

  const display = decimals > 0 ? val.toFixed(decimals) : Math.round(val).toLocaleString()
  return <span ref={ref} className={className}>{prefix}{display}{suffix}</span>
}

// ─── ScrollProgress ──────────────────────────────────────────
export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 220, damping: 30, mass: 0.4 })
  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX, transformOrigin: '0% 50%' }}
      className="fixed top-0 left-0 right-0 h-[2px] z-[80] pointer-events-none"
    >
      <div className="h-full w-full bg-gradient-to-r from-[#10B981] via-[#14B8B4] to-[#06B6D4]" />
    </motion.div>
  )
}

// ─── Parallax (image translateY based on scroll) ─────────────
export function Parallax({ children, offset = 60, className = '' }) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [-offset, offset])
  return (
    <motion.div ref={ref} style={{ y }} className={className}>{children}</motion.div>
  )
}
