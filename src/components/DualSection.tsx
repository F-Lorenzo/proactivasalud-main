'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { CircleCheck, ArrowRight } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

export function DualSection() {
  const { t } = useLanguage()
  const B2C = [t.dual.b2cItem1, t.dual.b2cItem2, t.dual.b2cItem3, t.dual.b2cItem4, t.dual.b2cItem5]
  const B2B = [t.dual.b2bItem1, t.dual.b2bItem2, t.dual.b2bItem3, t.dual.b2bItem4, t.dual.b2bItem5]

  return (
    <section className="py-24 bg-ivory" id="personas">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8">

          {/* ── B2C Card ── */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22,1,0.36,1] }}
            className="bg-sage-pale rounded-[32px] overflow-hidden flex flex-col"
          >
            {/* Photo */}
            <div className="relative h-60 overflow-hidden">
              <Image
                src="/hombre-laptop-celu.png"
                alt="Persona 50+ usando la plataforma Proactiva en su celular"
                fill
                className="object-cover"
                sizes="(max-width:1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-sage/30 to-transparent" />
              <div className="absolute top-4 left-4">
                <span className="bg-white/90 backdrop-blur-sm text-brand text-[11px] font-bold px-3 py-1.5 rounded-full tracking-wide uppercase">
                  {t.dual.b2cBadge}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-8 flex flex-col flex-1">
              <h3 className="font-display text-[1.85rem] font-semibold text-navy mb-6 leading-tight">
                {t.dual.b2cTitle1}<br />{t.dual.b2cTitle2}
              </h3>
              <ul className="space-y-3 flex-1">
                {B2C.map(item => (
                  <li key={item} className="flex items-center gap-3">
                    <CircleCheck className="text-brand w-5 h-5 flex-shrink-0" />
                    <span className="text-[14px] text-navy/80">{item}</span>
                  </li>
                ))}
              </ul>
              <motion.a
                href="https://proactivasalud-b2-c.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="mt-8 self-start inline-flex items-center gap-2 bg-brand text-white px-7 py-3.5 rounded-full font-semibold text-[14px] hover:bg-brand-dark transition-colors group"
              >
                {t.dual.b2cCta}
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </motion.a>
            </div>
          </motion.div>

          {/* ── B2B Card ── */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.12, ease: [0.22,1,0.36,1] }}
            className="bg-orchid-pale rounded-[32px] overflow-hidden flex flex-col"
            id="empresas"
          >
            {/* Photo */}
            <div className="relative h-60 overflow-hidden">
              <Image
                src="/portrait-of-a-cheerful-senior-businesswoman-sitting-at-office-desk.png"
                alt="Empresaria senior sonriendo en su oficina"
                fill
                className="object-cover"
                sizes="(max-width:1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-orchid/30 to-transparent" />
              <div className="absolute top-4 left-4">
                <span className="bg-white/90 backdrop-blur-sm text-orchid text-[11px] font-semibold px-3 py-1.5 rounded-full tracking-wide uppercase">
                  {t.dual.b2bBadge}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-8 flex flex-col flex-1">
              <h3 className="font-display text-[1.85rem] font-semibold text-navy mb-6 leading-tight">
                {t.dual.b2bTitle1}<br />{t.dual.b2bTitle2}
              </h3>
              <ul className="space-y-3 flex-1">
                {B2B.map(item => (
                  <li key={item} className="flex items-center gap-3">
                    <CircleCheck className="text-orchid w-5 h-5 flex-shrink-0" />
                    <span className="text-[14px] text-navy/80">{item}</span>
                  </li>
                ))}
              </ul>
              <motion.a
                href="https://proactivasalud-b2-b.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="mt-8 self-start inline-flex items-center gap-2 bg-navy text-white px-7 py-3.5 rounded-full font-semibold text-[14px] hover:bg-navy/85 transition-colors group"
              >
                {t.dual.b2bCta}
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </motion.a>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
