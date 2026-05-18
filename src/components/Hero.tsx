import Image from 'next/image'
import { ChevronDown, CalendarDays, Users } from 'lucide-react'

const ACTIVITY_STRIP = [
  {
    src: 'https://images.unsplash.com/photo-1518310383802-640c2de311b2?auto=format&fit=crop&w=400&q=80',
    alt: 'Pareja argentina mayor de 50 cocinando juntos saludablemente',
    label: 'Nutrición',
  },
  {
    src: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=400&q=80',
    alt: 'Adulto mayor de 50 caminando activamente al aire libre',
    label: 'Movimiento',
  },
  {
    src: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
    alt: 'Persona argentina mayor de 50 en un momento de bienestar emocional',
    label: 'Bienestar',
  },
]

export function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden bg-surface pt-16 lg:pt-24">
      {/* Right-panel background tint */}
      <div
        aria-hidden="true"
        className="absolute inset-y-0 right-0 w-[45%] bg-brand-light/55 hidden lg:block"
      />

      <div className="relative flex-1 max-w-7xl mx-auto px-6 lg:px-8 w-full py-20 lg:py-0">
        <div className="grid lg:grid-cols-[55%_45%] items-center min-h-[calc(100vh-4rem)]">

          {/* ── Text ─────────────────────────────────────────────────────── */}
          <div className="flex flex-col gap-8 animate-fade-up lg:pr-12">

            {/* Eyebrow */}
            <div className="flex items-center gap-3">
              <div className="h-px w-10 bg-brand" aria-hidden="true" />
              <span className="font-body font-semibold text-sm tracking-widest uppercase text-brand">
                Proactiva Salud
              </span>
            </div>

            {/* Headline */}
            <h1 className="font-display text-5xl lg:text-[3.75rem] xl:text-7xl text-ink leading-[1.04] tracking-tight">
              Tu mejor etapa
              <br />
              <span className="text-brand">no terminó.</span>
              <br />
              Acaba de empezar.
            </h1>

            {/* Subheadline */}
            <p className="font-body text-xl text-ink-mid max-w-[44ch] leading-relaxed">
              Programa de bienestar integral para mayores de 50. Nutrición, movimiento, salud emocional y acompañamiento profesional — todo desde tu hogar.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#inscripcion"
                className="inline-flex items-center justify-center bg-brand text-white font-body font-semibold text-base px-8 py-4 rounded-full hover:bg-brand-dark transition-all duration-200 shadow-button hover:shadow-elevated"
              >
                Reservar mi cupo
              </a>
              <a
                href="#pilares"
                className="inline-flex items-center justify-center font-body font-semibold text-base text-brand px-8 py-4 rounded-full border-2 border-brand/20 hover:border-brand/50 hover:bg-brand-light transition-all duration-200"
              >
                Ver el programa
              </a>
            </div>

            {/* Pilot launch badge */}
            <div className="flex items-center gap-3 pt-2">
              <div className="flex items-center gap-2 bg-accent-light text-accent font-body font-semibold text-sm px-4 py-2.5 rounded-full">
                <CalendarDays size={16} aria-hidden="true" />
                Lanzamiento Junio 2026
              </div>
              <span className="font-body text-xs text-ink-soft">
                100 cupos disponibles
              </span>
            </div>
          </div>

          {/* ── Visual ───────────────────────────────────────────────────── */}
          <div className="relative hidden lg:flex items-center justify-center py-16">
            <div className="relative w-full max-w-sm">

              {/* Hero photo */}
              <div className="w-full aspect-[4/5] rounded-[2rem] overflow-hidden relative">
                <Image
                  src="/imagen-portada-proactiva.png"
                  alt="Imagen de portada Proactiva Salud"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 0px, 384px"
                />
              </div>

              {/* Pilot badge — top right */}
              <div className="absolute -top-4 -right-6 bg-brand text-white rounded-2xl px-5 py-3 shadow-elevated text-center">
                <p className="font-body text-2xl font-bold leading-none">100</p>
                <p className="font-body text-xs opacity-80 mt-0.5">cupos</p>
                <p className="font-body text-xs opacity-80">disponibles</p>
              </div>

              {/* Launch date badge — bottom left */}
              <div className="absolute -bottom-4 -left-4 bg-white rounded-xl px-4 py-3 shadow-hover flex items-center gap-2.5">
                <CalendarDays size={20} className="text-brand flex-shrink-0" aria-hidden="true" />
                <span className="font-body text-sm font-semibold text-ink leading-tight">
                  Inicio<br />Junio 2026
                </span>
              </div>

              {/* Participants badge — middle left */}
              <div className="absolute top-1/2 -translate-y-1/2 -left-14 bg-white rounded-xl px-3 py-2.5 shadow-hover flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[
                    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=60&q=80',
                    'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=60&q=80',
                    'https://images.unsplash.com/photo-1552058544-f2b08422138a?auto=format&fit=crop&w=60&q=80',
                  ].map((src, i) => (
                    <div key={i} className="w-7 h-7 rounded-full overflow-hidden border-2 border-white flex-shrink-0">
                      <Image
                        src={src}
                        alt="Participante del programa"
                        width={28}
                        height={28}
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
                <div>
                  <p className="font-body text-xs font-bold text-ink leading-none">+50</p>
                  <p className="font-body text-[10px] text-ink-soft leading-none mt-0.5">personas</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* ── Activity photo strip ──────────────────────────────────────── */}
      <div className="relative w-full bg-white border-t border-brand-light/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-3 divide-x divide-brand-light/50">
            {ACTIVITY_STRIP.map((item) => (
              <div key={item.label} className="flex items-center gap-4 py-5 px-4 first:pl-0 last:pr-0">
                <div className="relative w-14 h-14 rounded-2xl overflow-hidden flex-shrink-0">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    className="object-cover"
                    sizes="56px"
                  />
                </div>
                <div>
                  <p className="font-body font-bold text-ink text-sm">{item.label}</p>
                  <p className="font-body text-ink-soft text-xs mt-0.5">Incluido en todos los planes</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-24 left-1/2 -translate-x-1/2 text-ink-soft animate-bounce hidden lg:block"
        aria-hidden="true"
      >
        <ChevronDown size={24} />
      </div>
    </section>
  )
}
