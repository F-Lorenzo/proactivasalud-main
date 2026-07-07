import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Heart, Users, ShieldCheck, Sparkles } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Nosotros — Proactiva Salud',
  description:
    'Conocé al equipo de Proactiva Salud: profesionales comprometidos con la prevención y el bienestar integral para mayores de 50.',
}

const VALUES = [
  {
    icon: Heart,
    title: 'Acompañamiento cercano',
    description:
      'Brindamos un seguimiento continuo, claro y confiable, adaptado a cada persona y su etapa de vida.',
  },
  {
    icon: ShieldCheck,
    title: 'Prevención primero',
    description:
      'Nuestro enfoque se anticipa a los problemas de salud promoviendo hábitos saludables antes de que aparezcan.',
  },
  {
    icon: Users,
    title: 'Equipo profesional',
    description:
      'Somos un equipo multidisciplinario comprometido con el bienestar físico, emocional y social de cada persona.',
  },
  {
    icon: Sparkles,
    title: 'Bienestar integral',
    description:
      'Trabajamos sobre nutrición, movimiento, salud emocional y autonomía para una calidad de vida plena.',
  },
]

export default function QuienesSomos() {
  return (
    <>
      <Header />
      <main id="main">

        {/* ── Hero ────────────────────────────────────────────────────── */}
        <section className="relative pt-40 pb-24 lg:pt-48 lg:pb-28 bg-surface overflow-hidden">
          <div
            aria-hidden
            className="pointer-events-none absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(141,170,145,0.22) 0%, transparent 70%)' }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute bottom-0 -left-32 w-[420px] h-[420px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(13,92,79,0.08) 0%, transparent 70%)' }}
          />

          <div className="relative max-w-3xl mx-auto px-6 lg:px-8 text-center flex flex-col items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="h-px w-10 bg-brand" aria-hidden="true" />
              <span className="font-body font-semibold text-sm tracking-widest uppercase text-brand">
                Nosotros
              </span>
              <div className="h-px w-10 bg-brand" aria-hidden="true" />
            </div>

            <h1 className="font-display text-3xl lg:text-[2.6rem] text-ink leading-snug tracking-tight">
              Creemos que los{' '}
              <span className="text-brand">pequeños hábitos</span>{' '}
              sostenidos en el tiempo, pueden transformar la salud, el bienestar
              y la calidad de vida de las personas.
            </h1>

            <Link
              href="/#inscripcion"
              className="inline-flex items-center gap-2 bg-brand text-white font-body font-semibold text-sm px-7 py-3.5 rounded-full hover:bg-brand-dark transition-all duration-200 shadow-button hover:shadow-elevated"
            >
              Empezar mi cambio saludable
            </Link>
          </div>

          {/* Showcase image */}
          <div className="relative max-w-6xl mx-auto px-6 lg:px-8 mt-14 lg:mt-16">
            <div className="relative aspect-[16/9] sm:aspect-[2/1] rounded-[2rem] overflow-hidden shadow-elevated">
              <Image
                src="/nosotros_nitida.png"
                alt="Plataforma Proactiva Salud: nutrición, salud emocional y bienestar físico en un mismo panel de seguimiento"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 1152px"
              />
            </div>
            <div className="absolute -bottom-6 left-6 sm:left-10 bg-white rounded-2xl px-6 py-4 shadow-elevated">
              <p className="font-display text-3xl font-bold text-brand leading-none">+50</p>
              <p className="font-body text-sm text-ink-mid mt-1">años, mejor calidad de vida</p>
            </div>
          </div>
        </section>

        {/* ── Body copy ───────────────────────────────────────────────── */}
        <section className="py-16 lg:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid lg:grid-cols-[1fr_1fr] gap-16 items-start">

              <div className="flex flex-col gap-5">
                <p className="font-body text-base text-ink-mid leading-relaxed text-justify">
                  Somos <strong className="font-semibold text-ink">una plataforma de salud preventiva y acompañamiento humano</strong>{' '}
                  diseñada para anticipar riesgos y generar impacto real en la vida de las personas. Integramos
                  nutrición, bienestar físico, salud emocional, teleconsulta y seguimiento continuo
                  para transformar el modelo reactivo actual de atención en un sistema más cercano,
                  eficiente y sostenible.
                </p>
                <p className="font-body text-base text-ink-mid leading-relaxed text-justify">
                  En Proactiva Salud creemos que{' '}
                  <strong className="font-semibold text-ink">el verdadero valor de la salud está en llegar antes</strong>.
                  Combinando cuidado activo, tecnología simple más atención cercana y continua para
                  ayudar a sostener hábitos saludables. Esta mejora en el bienestar integral, reduce
                  el uso permanente y evitable del sistema médico.
                </p>
              </div>

              <div className="flex flex-col gap-5">
                <p className="font-body text-base text-ink-mid leading-relaxed text-justify">
                  Nuestro modelo{' '}
                  <strong className="font-semibold text-ink">transforma el cuidado cotidiano en impacto real positivo</strong>:
                  más adherencia al programa, más seguimiento y más prevención, redundan en una mejor
                  atención para personas que desean vivir mejor. Asimismo, el ecosistema digital
                  brinda soluciones diferenciadas para instituciones o empresas, que ofrecen
                  servicios de salud o seguros de vida.
                </p>
                <div className="h-px bg-brand-light" aria-hidden="true" />
                <p className="font-body text-base text-brand font-semibold leading-relaxed italic">
                  "El verdadero valor de la salud está en llegar antes."
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* ── Values ──────────────────────────────────────────────────── */}
        <section className="py-16 lg:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">

            <div className="max-w-2xl mb-12">
              <p className="font-body text-brand text-xs tracking-widest uppercase font-semibold mb-3">
                Nuestros valores
              </p>
              <h2 className="font-display text-2xl text-ink leading-tight">
                Lo que nos guía cada día
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {VALUES.map(({ icon: Icon, title, description }) => (
                <div
                  key={title}
                  className="bg-gradient-to-br from-brand-dark to-brand rounded-3xl p-7 flex flex-col gap-4 hover:shadow-elevated transition-shadow duration-300"
                >
                  <div className="w-11 h-11 rounded-2xl bg-white/20 flex items-center justify-center text-white flex-shrink-0">
                    <Icon size={20} aria-hidden="true" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <h3 className="font-body font-bold text-white text-base">{title}</h3>
                    <p className="font-body text-white/80 text-base leading-relaxed">{description}</p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* ── CTA ─────────────────────────────────────────────────────── */}
        <section className="py-16 lg:py-24 bg-brand-dark">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center flex flex-col items-center gap-6">
            <h2 className="font-display text-2xl text-white leading-tight max-w-[26ch]">
              Empezá hoy a vivir con más energía y bienestar
            </h2>
            <Link
              href="/#inscripcion"
              className="inline-flex items-center justify-center bg-white text-brand font-body font-semibold text-sm px-9 py-3.5 rounded-full hover:bg-brand-light transition-colors shadow-elevated"
            >
              Empezar mi cambio saludable
            </Link>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
