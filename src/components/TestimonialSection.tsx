'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Quote } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

export function TestimonialSection() {
  const { t } = useLanguage()
  return (
    <section className="py-24 bg-ivory-dark">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* ── Left — photo ── */}
          <motion.div
            initial={{ opacity: 0, x: -28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.72, ease: [0.22,1,0.36,1] }}
            className="relative"
          >
            <div className="relative rounded-[32px] overflow-hidden aspect-[4/3] shadow-xl">
              <Image
                src="/viejos-felices.png"
                alt="Adultos mayores felices usando Proactiva Salud en tablet"
                fill
                className="object-cover"
                sizes="(max-width:1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/15 to-transparent pointer-events-none" />
            </div>

            {/* Decorative dot grid */}
            <div aria-hidden className="absolute -bottom-5 -right-5 grid grid-cols-4 gap-2 opacity-25">
              {Array.from({ length: 16 }).map((_, i) => (
                <div key={i} className="w-2 h-2 rounded-full bg-brand" />
              ))}
            </div>
          </motion.div>

          {/* ── Right — quote ── */}
          <motion.div
            initial={{ opacity: 0, x: 28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.72, delay: 0.13, ease: [0.22,1,0.36,1] }}
            className="flex flex-col gap-7"
          >
            <Quote className="text-brand w-12 h-12 opacity-50" />

            <blockquote className="font-display text-[1.6rem] lg:text-[1.85rem] font-medium italic text-navy leading-[1.4]">
              "{t.testimonial.quote}"
            </blockquote>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-sage to-brand flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                M
              </div>
              <div>
                <p className="font-semibold text-navy text-[15px]">{t.testimonial.name}</p>
                <p className="text-sm text-muted">{t.testimonial.role}</p>
              </div>
            </div>

            {/* Slider dots */}
            <div className="flex items-center gap-2 mt-1">
              <div className="w-8 h-2 bg-brand rounded-full" />
              <div className="w-2 h-2 bg-brand/25 rounded-full" />
              <div className="w-2 h-2 bg-brand/25 rounded-full" />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
