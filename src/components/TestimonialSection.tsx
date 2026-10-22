'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

export function TestimonialSection() {
  const { t } = useLanguage()
  const reduceMotion = useReducedMotion()
  const [index, setIndex] = useState(0)

  const { items, prev, next, goTo } = t.testimonial
  const count = items.length
  if (count === 0) return null

  // The list can differ in length per language, so the index is wrapped on read.
  const active = index % count
  const go = (to: number) => setIndex((to + count) % count)

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
                src="/friends-using-tablet-near-fence.jpg"
                alt="Tres amigos sonriendo mientras miran una tablet al aire libre"
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

            {/* Slides share one grid cell so the tallest sets the height and the layout never jumps */}
            <div className="grid">
              {items.map((item, i) => (
                <motion.div
                  key={i}
                  inert={i !== active}
                  aria-hidden={i !== active}
                  animate={{
                    opacity: i === active ? 1 : 0,
                    x: reduceMotion || i === active ? 0 : 16,
                  }}
                  transition={{ duration: reduceMotion ? 0 : 0.4, ease: [0.22,1,0.36,1] }}
                  className="col-start-1 row-start-1 flex flex-col gap-7"
                >
                  <blockquote className="font-display text-[1.6rem] lg:text-[1.85rem] font-medium italic text-navy leading-[1.4]">
                    &ldquo;{item.quote}&rdquo;
                  </blockquote>

                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-sage to-brand flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                      {item.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-semibold text-navy text-[15px]">{item.name}</p>
                      <p className="text-sm text-muted">{item.role}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Controls — only worth showing once there is more than one testimonial */}
            {count > 1 && (
              <div className="flex items-center justify-between gap-4 mt-1">
                <div className="flex items-center">
                  {items.map((item, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => go(i)}
                      aria-label={`${goTo} ${i + 1}`}
                      aria-current={i === active}
                      className="p-1.5 group"
                    >
                      <span
                        className={`block h-2 rounded-full transition-all duration-300 ${
                          i === active ? 'w-8 bg-brand' : 'w-2 bg-brand/25 group-hover:bg-brand/50'
                        }`}
                      />
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => go(active - 1)}
                    aria-label={prev}
                    className="w-10 h-10 rounded-full border border-brand/30 text-brand flex items-center justify-center hover:bg-brand hover:text-white transition-colors"
                  >
                    <ChevronLeft size={18} aria-hidden />
                  </button>
                  <button
                    type="button"
                    onClick={() => go(active + 1)}
                    aria-label={next}
                    className="w-10 h-10 rounded-full border border-brand/30 text-brand flex items-center justify-center hover:bg-brand hover:text-white transition-colors"
                  >
                    <ChevronRight size={18} aria-hidden />
                  </button>
                </div>
              </div>
            )}
          </motion.div>

        </div>
      </div>
    </section>
  )
}
