'use client'

import { motion } from 'framer-motion'
import { ShieldCheck, HeartHandshake, Smartphone, Lock } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

const ICONS = [
  {
    icon: ShieldCheck,
    cardBg:    'bg-[#c6dfc9]',
    border:    'border-[#8DAA91]/60',
    iconBg:    'bg-[#0D5C4F]/15',
    iconColor: 'text-brand',
    titleColor:'text-brand',
  },
  {
    icon: HeartHandshake,
    cardBg:    'bg-[#f7e8b0]',
    border:    'border-[#D8B75C]/60',
    iconBg:    'bg-[#D8B75C]/35',
    iconColor: 'text-[#8a6210]',
    titleColor:'text-[#7a5a18]',
  },
  {
    icon: Smartphone,
    cardBg:    'bg-[#b8d2f5]',
    border:    'border-[#7FA7E8]/60',
    iconBg:    'bg-[#7FA7E8]/35',
    iconColor: 'text-[#2a5599]',
    titleColor:'text-[#1e4080]',
  },
  {
    icon: Lock,
    cardBg:    'bg-[#d8caf0]',
    border:    'border-[#A58AD4]/60',
    iconBg:    'bg-[#A58AD4]/30',
    iconColor: 'text-[#5c3aa8]',
    titleColor:'text-[#4a2d90]',
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
