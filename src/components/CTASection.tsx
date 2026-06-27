'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

export function CtaSection() {
  const { t } = useLanguage()
  return (
    <section className="py-16 px-6 lg:px-8 bg-white" id="demo">
      <div className="max-w-7xl mx-auto">
        <div
          className="rounded-[40px] overflow-hidden relative"
          style={{ background: 'linear-gradient(135deg, #0D5C4F 0%, #0e6b5c 50%, #093d33 100%)' }}
        >
          {/* Blobs */}
          <div aria-hidden className="pointer-events-none absolute -top-16 -right-16 w-72 h-72 rounded-full bg-white/5 blur-3xl" />
          <div aria-hidden className="pointer-events-none absolute bottom-0 left-1/3 w-56 h-56 rounded-full bg-white/5 blur-3xl" />

          <div className="relative flex flex-col lg:flex-row items-start lg:items-center gap-10 lg:gap-16 p-10 lg:p-16">

            {/* Text */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, ease: [0.22,1,0.36,1] }}
              className="flex-1 space-y-4"
            >
              <h2 className="font-display text-[2.2rem] lg:text-[2.8rem] font-semibold text-white leading-[1.1]">
                {t.cta.title}
                <br />
                <span className="text-sage-light">{t.cta.titleAccent}</span>
              </h2>
              <p className="text-white/65 text-[16px] leading-relaxed max-w-md">
                {t.cta.subtitle}
              </p>
            </motion.div>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, delay: 0.14, ease: [0.22,1,0.36,1] }}
              className="flex flex-col gap-3 flex-shrink-0"
            >
              <motion.a
                href="https://proactivasalud-b2-c.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 bg-white text-brand px-7 py-3.5 rounded-full font-semibold text-[14.5px] hover:bg-ivory transition-colors group whitespace-nowrap"
              >
                {t.cta.btn1}
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </motion.a>
              <motion.a
                href="https://proactivasalud-b2-b.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 bg-white/10 border border-white/25 text-white px-7 py-3.5 rounded-full font-semibold text-[14.5px] hover:bg-white/20 transition-colors group"
              >
                {t.cta.btn2}
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </motion.a>
            </motion.div>

            {/* Accent photo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.75, delay: 0.2, ease: [0.22,1,0.36,1] }}
              className="hidden lg:block relative rounded-2xl overflow-hidden w-48 h-48 flex-shrink-0 self-center"
            >
              <Image
                src="/pareja_ejercitando_2.jpg"
                alt="Pareja activa haciendo ejercicio"
                fill
                className="object-cover"
                sizes="192px"
              />
              <div className="absolute inset-0 bg-brand/20 pointer-events-none" />
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  )
}

// Backward-compat alias
export { CtaSection as CTASection }
