'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowRight, HeartHandshake } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

const AVATARS = [
  { initial: 'A', bg: '#0D5C4F' },
  { initial: 'M', bg: '#8DAA91' },
  { initial: 'C', bg: '#D8B75C' },
  { initial: 'R', bg: '#A58AD4' },
  { initial: 'L', bg: '#7FA7E8' },
]

const fadeUp = {
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
}

export function HeroSection() {
  const { t } = useLanguage()
  return (
    <section className="relative min-h-screen flex items-center bg-white overflow-hidden pt-[72px]">

      {/* ── Background blobs ── */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 -right-40 w-[700px] h-[700px] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(141,170,145,0.18) 0%, transparent 70%)' }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 -left-32 w-[500px] h-[500px] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(13,92,79,0.07) 0%, transparent 70%)' }}
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-0 w-full">
        <div className="grid lg:grid-cols-[1fr_1fr] gap-10 xl:gap-20 items-center min-h-[calc(100vh-72px)]">

          {/* ── Left ── */}
          <motion.div
            variants={{ animate: { transition: { staggerChildren: 0.11 } } }}
            initial="initial"
            animate="animate"
            className="flex flex-col gap-7 py-16 lg:py-0"
          >
            {/* Eyebrow */}
            <motion.div variants={fadeUp} transition={{ duration: 0.6, ease: [0.22,1,0.36,1] }}>
              <span className="inline-flex items-center gap-2 text-[11.5px] font-semibold tracking-[0.16em] text-brand uppercase bg-sage-pale px-4 py-2 rounded-full">
                <span aria-hidden className="w-1.5 h-1.5 rounded-full bg-brand" />
                {t.hero.eyebrow}
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={fadeUp}
              transition={{ duration: 0.65, ease: [0.22,1,0.36,1] }}
              className="font-display text-[2.7rem] sm:text-5xl lg:text-[3.4rem] xl:text-[4rem] font-semibold text-navy leading-[1.08] tracking-tight"
            >
              {t.hero.headline1}<br />
              {t.hero.headline2}<br />
              <em className="not-italic italic text-brand">{t.hero.headlineAccent}</em>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.6, ease: [0.22,1,0.36,1] }}
              className="text-[17px] text-muted leading-relaxed max-w-[44ch]"
            >
              {t.hero.subtitle}
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.6, ease: [0.22,1,0.36,1] }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <motion.a
                href="https://proactivasalud-b2-c.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center justify-center gap-2 bg-brand text-white px-8 py-4 rounded-full font-semibold text-[15px] hover:bg-brand-dark transition-colors shadow-sm group"
              >
                {t.hero.cta1}
                <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
              </motion.a>
              <motion.a
                href="https://proactivasalud-b2-b.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center justify-center gap-2 border-2 border-navy/18 text-navy px-8 py-4 rounded-full font-semibold text-[15px] hover:border-brand hover:text-brand transition-colors"
              >
                {t.hero.cta2}
              </motion.a>
            </motion.div>

            {/* Social proof */}
            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.6, ease: [0.22,1,0.36,1] }}
              className="flex items-center gap-4 pt-1"
            >
              <div className="flex -space-x-2.5">
                {AVATARS.map(({ initial, bg }, i) => (
                  <div
                    key={i}
                    aria-hidden
                    className="w-9 h-9 rounded-full border-2 border-white flex items-center justify-center text-white text-[11px] font-bold flex-shrink-0"
                    style={{ background: bg }}
                  >
                    {initial}
                  </div>
                ))}
              </div>
              <div>
                <p className="text-[13.5px] font-semibold text-navy">{t.hero.socialTitle}</p>
                <p className="text-[12px] text-muted">{t.hero.socialSub}</p>
              </div>
            </motion.div>
          </motion.div>

          {/* ── Right — image panel ── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.85, delay: 0.25, ease: [0.22,1,0.36,1] }}
            className="relative hidden lg:flex items-center justify-center py-16"
          >
            {/* Halo glow */}
            <div
              aria-hidden
              className="absolute inset-[-8%] rounded-[50%]"
              style={{ background: 'radial-gradient(ellipse, rgba(141,170,145,0.28) 0%, transparent 65%)' }}
            />

            {/* Main photo */}
            <div className="relative w-full max-w-[400px] rounded-[32px] overflow-hidden aspect-[4/5] shadow-2xl">
              <Image
                src="/pareja-playa.png"
                alt="Pareja feliz en la playa, generación silver"
                fill
                className="object-cover"
                priority
                sizes="(max-width:1024px) 0px, 400px"
              />
              {/* Subtle vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-navy/20 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Floating glassmorphism card */}
            <motion.div
              animate={{ y: [0, -9, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute bottom-24 -left-8 bg-white/90 backdrop-blur-md rounded-2xl px-4 py-3.5 shadow-xl flex items-center gap-3 max-w-[220px]"
            >
              <div className="w-10 h-10 bg-sage-pale rounded-xl flex items-center justify-center flex-shrink-0">
                <HeartHandshake size={20} className="text-brand" />
              </div>
              <div>
                <p className="text-[12.5px] font-semibold text-navy leading-tight">
                  {t.hero.floatingTitle}
                </p>
                <p className="text-[11px] text-muted mt-0.5">{t.hero.floatingSub}</p>
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
