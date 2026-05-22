import Link from 'next/link'
import Image from 'next/image'
import { Heart } from 'lucide-react'

const LINKS: Record<string, { label: string; href: string }[]> = {
  'Personas 50+': [
    { label: 'Programas de salud',   href: '#programas' },
    { label: 'Salud emocional',      href: '#programas' },
    { label: 'Nutrición',            href: '#programas' },
    { label: 'Actividad física',     href: '#programas' },
    { label: 'Comunidad',            href: '#programas' },
  ],
  'Empresas': [
    { label: 'Programas corporativos', href: '#empresas' },
    { label: 'Métricas de impacto',    href: '#empresas' },
    { label: 'Solicitar demo',         href: '#demo'     },
  ],
  'Proactiva': [
    { label: 'Nosotros',             href: '#nosotros' },
    { label: 'Blog',                 href: '#recursos' },
    { label: 'Privacidad',           href: '/privacidad' },
    { label: 'Términos',             href: '/terminos'   },
  ],
}

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-navy py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Top grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

          {/* Brand */}
          <div className="col-span-2 lg:col-span-1 space-y-5">
            <Image
              src="/ProActiva-NUEVA.png"
              alt="Proactiva Salud"
              width={148}
              height={44}
              className="h-12 w-auto object-contain brightness-0 invert"
            />
            <p className="text-white/40 text-[13px] leading-relaxed max-w-[22ch]">
              Bienestar integral para la generación silver. Human Care Platform.
            </p>
          </div>

          {/* Nav columns */}
          {Object.entries(LINKS).map(([title, links]) => (
            <div key={title}>
              <p className="text-white/25 text-[11px] font-semibold uppercase tracking-[0.14em] mb-4">
                {title}
              </p>
              <ul className="flex flex-col gap-2.5">
                {links.map(link => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-white/45 text-[13px] hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/25 text-[12px]">
            © {year} Proactiva Salud. Todos los derechos reservados.
          </p>
          <p className="text-white/25 text-[12px] flex items-center gap-1.5">
            Hecho con <Heart size={11} className="text-brand fill-brand" aria-hidden /> para la generación silver
          </p>
        </div>

      </div>
    </footer>
  )
}
