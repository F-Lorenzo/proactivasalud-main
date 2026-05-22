'use client'

import { motion } from 'framer-motion'
import { ShieldCheck, HeartHandshake, Smartphone, Lock } from 'lucide-react'

const FEATURES = [
  {
    icon: ShieldCheck,
    title: 'Enfoque preventivo',
    desc:  'Cuidamos tu salud para prevenirla, no solo tratarla.',
    iconBg:    'bg-brand/10',
    iconColor: 'text-brand',
  },
  {
    icon: HeartHandshake,
    title: 'Acompañamiento real',
    desc:  'Contamos contigo al servicio de tus necesidades.',
    iconBg:    'bg-gold/20',
    iconColor: 'text-[#b8942c]',
  },
  {
    icon: Smartphone,
    title: 'Fácil y accesible',
    desc:  'Plataforma simple, clara y diseñada para vos.',
    iconBg:    'bg-sky-soft/20',
    iconColor: 'text-sky-soft',
  },
  {
    icon: Lock,
    title: 'Confidencial y segura',
    desc:  'Tu información siempre protegida.',
    iconBg:    'bg-orchid/15',
    iconColor: 'text-orchid',
  },
]

export function FeatureStrip() {
  return (
    <section className="py-14 bg-white border-y border-gray-50/80">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.09, ease: [0.22,1,0.36,1] }}
              whileHover={{ y: -4 }}
              className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100/70"
            >
              <div
                className={`w-12 h-12 ${f.iconBg} rounded-xl flex items-center justify-center mb-4
                            group-hover:scale-110 transition-transform duration-300`}
              >
                <f.icon className={`${f.iconColor} w-5 h-5`} />
              </div>
              <h3 className="font-semibold text-navy text-[14.5px] mb-1.5">{f.title}</h3>
              <p className="text-[13px] text-muted leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
