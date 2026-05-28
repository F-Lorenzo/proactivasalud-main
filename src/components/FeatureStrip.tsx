'use client'

import { motion } from 'framer-motion'
import { ShieldCheck, HeartHandshake, Smartphone, Lock } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

const ICONS = [
  {
    // Emerald oscuro — verde bosque
    icon: ShieldCheck,
    cardBg:    'bg-[#b5d4b9]',
    border:    'border-[#0D5C4F]/30',
    iconBg:    'bg-[#0D5C4F]/18',
    iconColor: 'text-[#0a4a3f]',
    titleColor:'text-[#0a4a3f]',
  },
  {
    // Sage cálido — verde salvia
    icon: HeartHandshake,
    cardBg:    'bg-[#c8ddc4]',
    border:    'border-[#8DAA91]/50',
    iconBg:    'bg-[#8DAA91]/40',
    iconColor: 'text-[#3d6645]',
    titleColor:'text-[#3d6645]',
  },
  {
    // Menta-teal — verde fresco
    icon: Smartphone,
    cardBg:    'bg-[#a8d8c6]',
    border:    'border-[#1a7060]/35',
    iconBg:    'bg-[#1a7060]/20',
    iconColor: 'text-[#0e5548]',
    titleColor:'text-[#0e5548]',
  },
  {
    // Lima suave — verde claro
    icon: Lock,
    cardBg:    'bg-[#d2e8b8]',
    border:    'border-[#6a9e58]/40',
    iconBg:    'bg-[#6a9e58]/25',
    iconColor: 'text-[#3d6830]',
    titleColor:'text-[#3d6830]',
  },
]

export function FeatureStrip() {
  const { t } = useLanguage()
  const FEATURES = [
    { ...ICONS[0], title: t.features.f1Title, desc: t.features.f1Desc },
    { ...ICONS[1], title: t.features.f2Title, desc: t.features.f2Desc },
    { ...ICONS[2], title: t.features.f3Title, desc: t.features.f3Desc },
    { ...ICONS[3], title: t.features.f4Title, desc: t.features.f4Desc },
  ] as const

  return (
    <section className="py-14 bg-ivory border-y border-ivory-dark/60">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {FEATURES.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.09, ease: [0.22,1,0.36,1] }}
              whileHover={{ y: -4 }}
              className={`group ${f.cardBg} rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 border ${f.border}`}
            >
              <div
                className={`w-12 h-12 ${f.iconBg} rounded-xl flex items-center justify-center mb-4
                            group-hover:scale-110 transition-transform duration-300`}
              >
                <f.icon className={`${f.iconColor} w-5 h-5`} />
              </div>
              <h3 className={`font-semibold ${f.titleColor} text-[14.5px] mb-1.5`}>{f.title}</h3>
              <p className="text-[13px] text-navy/60 leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
