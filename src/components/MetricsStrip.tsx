'use client'

import { motion } from 'framer-motion'
import { Users, Building2, Heart, TrendingDown } from 'lucide-react'

const METRICS = [
  { icon: Users,       value: '+25.000',     label: 'Personas 50+ activas' },
  { icon: Building2,   value: '+120',         label: 'Empresas y organizaciones' },
  { icon: Heart,       value: '+1.200.000',   label: 'Interacciones de bienestar' },
  { icon: TrendingDown,value: '-32%',         label: 'Reducción promedio de ausentismo*' },
]

export function MetricsStrip() {
  return (
    <section
      className="py-20 relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #0D5C4F 0%, #0e6b5c 55%, #0a4035 100%)' }}
    >
      {/* Decorative blobs */}
      <div aria-hidden className="pointer-events-none absolute -top-20 -right-20 w-80 h-80 rounded-full bg-white/5 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -bottom-20 left-1/4 w-64 h-64 rounded-full bg-white/5 blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-6">
          {METRICS.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.11, ease: [0.22,1,0.36,1] }}
              className="flex flex-col items-center text-center gap-3"
            >
              <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                <m.icon className="text-white/85 w-5 h-5" />
              </div>
              <p className="font-display text-4xl lg:text-5xl font-bold text-white leading-none">
                {m.value}
              </p>
              <p className="text-white/60 text-[13px] leading-snug">{m.label}</p>
            </motion.div>
          ))}
        </div>
        <p className="text-center text-white/25 text-[11px] mt-10 tracking-wide">
          *En programas en desarrollo. Datos proyectados.
        </p>
      </div>
    </section>
  )
}
