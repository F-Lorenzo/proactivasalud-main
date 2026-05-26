'use client'

import { motion } from 'framer-motion'
import { Activity, Brain, Apple, Bike, Users } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

const PILLAR_ICONS = [
  { icon: Activity, iconBg: 'bg-brand/10',    iconColor: 'text-brand' },
  { icon: Brain,    iconBg: 'bg-orchid/15',   iconColor: 'text-orchid' },
  { icon: Apple,    iconBg: 'bg-gold/20',     iconColor: 'text-[#b8942c]' },
  { icon: Bike,     iconBg: 'bg-sky-soft/20', iconColor: 'text-sky-soft' },
  { icon: Users,    iconBg: 'bg-sage/20',     iconColor: 'text-[#5a8860]' },
]

export function PillarsSection() {
  const { t } = useLanguage()
  const PILLARS = [
    { ...PILLAR_ICONS[0], title: t.pillars.p1Title, desc: t.pillars.p1Desc },
    { ...PILLAR_ICONS[1], title: t.pillars.p2Title, desc: t.pillars.p2Desc },
    { ...PILLAR_ICONS[2], title: t.pillars.p3Title, desc: t.pillars.p3Desc },
    { ...PILLAR_ICONS[3], title: t.pillars.p4Title, desc: t.pillars.p4Desc },
    { ...PILLAR_ICONS[4], title: t.pillars.p5Title, desc: t.pillars.p5Desc },
  ]

  return (
    <section className="py-24 bg-white" id="programas">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, ease: [0.22,1,0.36,1] }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl lg:text-5xl font-semibold text-navy leading-tight">
            {t.pillars.title}
            <br />
            <span className="text-brand">{t.pillars.titleAccent}</span>
          </h2>
        </motion.div>

        {/* Pillars grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
          {PILLARS.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22,1,0.36,1] }}
              whileHover={{ y: -6 }}
              className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 text-center cursor-default"
            >
              <div
                className={`w-14 h-14 ${p.iconBg} rounded-xl flex items-center justify-center mx-auto mb-4
                            group-hover:scale-110 transition-transform duration-300`}
              >
                <p.icon className={`${p.iconColor} w-6 h-6`} />
              </div>
              <h3 className="font-semibold text-navy text-[14.5px] mb-2">{p.title}</h3>
              <p className="text-[12.5px] text-muted leading-relaxed">{p.desc}</p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
