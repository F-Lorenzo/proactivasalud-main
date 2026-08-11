'use client'

import { motion } from 'framer-motion'
import { Users, MessageCircle, Building2, ShieldCheck, Check } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

export function MetricsStrip() {
  const { t } = useLanguage()

  const METRICS = [
    { icon: Users, value: t.metrics.m1Value, label: t.metrics.m1Label },
    { icon: MessageCircle, value: t.metrics.m2Value, label: t.metrics.m2Label },
    { icon: Building2, value: t.metrics.m3Value, label: t.metrics.m3Label },
  ]

  const TAKEAWAYS = [t.metrics.takeaway1, t.metrics.takeaway2, t.metrics.takeaway3]

  return (
    <section className="relative overflow-hidden py-16 lg:py-24 px-6 bg-gradient-to-b from-white to-ivory">
      {/* Decorative blobs */}
      <div aria-hidden className="pointer-events-none absolute -top-24 left-[6%] w-72 h-72 rounded-full bg-brand-light/10 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -bottom-24 right-[6%] w-64 h-64 rounded-full bg-brand/10 blur-3xl" />

      <div className="relative max-w-6xl mx-auto">
        {/* Header */}
        <div className="max-w-2xl mx-auto text-center mb-10 lg:mb-14">
          <span className="inline-flex items-center gap-2 mb-3 text-brand text-[13px] font-extrabold uppercase tracking-[0.12em]">
            <span className="w-2 h-2 rounded-full bg-brand-light" aria-hidden />
            {t.metrics.eyebrow}
          </span>
          <h2 className="font-display text-4xl lg:text-6xl font-bold text-navy tracking-tight leading-[1.02]">
            {t.metrics.title}
          </h2>
          <p className="mt-4 text-muted text-base lg:text-lg leading-relaxed">
            {t.metrics.intro}
          </p>
        </div>

        {/* Metric cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">
          {METRICS.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center gap-5 min-h-[160px] p-7 rounded-3xl border border-sage-pale bg-white/95 shadow-card"
            >
              <span className="flex-shrink-0 grid place-items-center w-16 h-16 rounded-full bg-sage-pale text-brand">
                <m.icon className="w-8 h-8" strokeWidth={2.2} aria-hidden />
              </span>
              <div>
                <strong className="block font-display text-4xl lg:text-5xl font-extrabold text-brand-light tracking-tight leading-none">
                  {m.value}
                </strong>
                <span className="block mt-2 text-ink text-[15px] leading-snug">{m.label}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Impact + Takeaways */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.65fr_0.85fr] gap-5">
          <div className="rounded-3xl border border-sage-pale bg-white/95 shadow-card p-7 lg:p-10">
            <h3 className="font-display text-2xl lg:text-3xl font-semibold text-navy tracking-tight mb-8">
              {t.metrics.impactTitle}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 items-center">
              {/* Gauge */}
              <div className="flex flex-col items-center text-center">
                <div
                  className="relative w-full max-w-[280px] overflow-hidden"
                  style={{ aspectRatio: '2 / 1' }}
                  role="img"
                  aria-label={`${t.metrics.gaugeValue} ${t.metrics.gaugeLabel}`}
                >
                  <div
                    aria-hidden
                    className="absolute inset-0 rounded-t-full"
                    style={{
                      background: 'conic-gradient(from 270deg at 50% 100%, var(--color-brand-light) 0deg 180deg, transparent 180deg 360deg)',
                    }}
                  />
                  <div
                    aria-hidden
                    className="absolute rounded-t-full bg-white"
                    style={{ inset: '24% 14% -1px' }}
                  />
                  <span className="absolute inset-x-0 bottom-0.5 font-display text-4xl lg:text-5xl font-extrabold text-brand-light tracking-tight">
                    {t.metrics.gaugeValue}
                  </span>
                </div>
                <p className="mt-3 font-semibold text-ink text-[15px]">{t.metrics.gaugeLabel}</p>
              </div>

              {/* Donut */}
              <div className="flex flex-col items-center text-center sm:border-l sm:border-sage-pale">
                <div
                  className="grid place-items-center w-[210px] max-w-[80%] rounded-full mx-auto"
                  style={{
                    aspectRatio: '1',
                    background: 'conic-gradient(var(--color-brand-light) 70%, var(--color-sage-pale) 0)',
                  }}
                  role="img"
                  aria-label={`${t.metrics.donutValue} ${t.metrics.donutLabel}`}
                >
                  <div className="grid place-items-center w-[66%] aspect-square rounded-full bg-white">
                    <strong className="font-display text-3xl lg:text-4xl font-extrabold text-brand-light tracking-tight">
                      {t.metrics.donutValue}
                    </strong>
                  </div>
                </div>
                <p className="mt-3 font-semibold text-ink text-[15px]">{t.metrics.donutLabel}</p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-sage-pale bg-white/95 shadow-card p-7 lg:p-10">
            <h3 className="font-display text-2xl lg:text-3xl font-semibold text-navy tracking-tight mb-6">
              {t.metrics.takeawaysTitle}
            </h3>
            <ul className="flex flex-col">
              {TAKEAWAYS.map((tk, i) => (
                <li
                  key={i}
                  className={`flex items-start gap-4 py-5 text-ink text-[15px] leading-relaxed ${i > 0 ? 'border-t border-sage-pale' : ''}`}
                >
                  <span className="flex-shrink-0 grid place-items-center w-9 h-9 rounded-full bg-sage-pale border border-sage-light/60 text-brand">
                    <Check className="w-5 h-5" strokeWidth={2.6} aria-hidden />
                  </span>
                  <span>{tk}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footnote */}
        <p className="flex items-start justify-center gap-2.5 max-w-2xl mx-auto mt-7 text-muted text-[13px] leading-relaxed text-center">
          <ShieldCheck className="flex-shrink-0 w-5 h-5 text-brand mt-0.5" strokeWidth={2} aria-hidden />
          <span>{t.metrics.footnote}</span>
        </p>
      </div>
    </section>
  )
}
