'use client'

import { motion } from 'framer-motion'
import { UserCheck, Heart, Monitor, Shield, Microscope } from 'lucide-react'

const ITEMS = [
  { icon: UserCheck,   label: 'Profesionales especializados' },
  { icon: Heart,       label: 'Atención personalizada y cercana' },
  { icon: Monitor,     label: 'Plataforma simple e intuitiva' },
  { icon: Shield,      label: 'Seguridad y privacidad garantizadas' },
  { icon: Microscope,  label: 'Programas basados en evidencia científica' },
]

export function FooterFeatures() {
  return (
    <section className="py-12 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {ITEMS.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.07, ease: [0.22,1,0.36,1] }}
              className="flex flex-col items-center text-center gap-3"
            >
              <div className="w-10 h-10 bg-sage-pale rounded-xl flex items-center justify-center">
                <item.icon className="text-brand w-5 h-5" />
              </div>
              <span className="text-[12.5px] text-muted font-medium leading-snug">{item.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
