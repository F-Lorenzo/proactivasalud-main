import Link from 'next/link'
import Image from 'next/image'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-ink py-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Top row */}
        <div className="grid md:grid-cols-[1fr_auto_auto] gap-10 mb-10">
          {/* Brand */}
          <div>
            <div className="mb-4">
              <Image
                src="/ProActiva-NUEVA.png"
                alt="Proactiva Salud"
                width={160}
                height={48}
                className="h-16 w-auto object-contain brightness-0 invert"
              />
            </div>
            <p className="font-body text-white/45 text-sm max-w-xs leading-relaxed">
              Programa integral de bienestar para mayores de 50. Piloto de lanzamiento — Junio 2026.
            </p>
          </div>

          {/* Nav */}
          <div>
            <p className="font-body text-white/25 text-xs uppercase tracking-widest mb-4">
              Programa
            </p>
            <ul className="flex flex-col gap-2.5">
              {[
                { label: 'Quiénes somos', href: '/quienes-somos' },
                { label: 'Los 5 pilares', href: '/#pilares' },
                { label: 'Planes', href: '/#planes' },
                { label: 'El piloto', href: '/#piloto' },
                { label: 'Inscribirse', href: '/#inscripcion' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-body text-white/50 text-sm hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="font-body text-white/25 text-xs uppercase tracking-widest mb-4">
              Contacto
            </p>
            <p className="font-body text-white/45 text-sm leading-relaxed max-w-[18ch]">
              Completá el formulario y te contactamos a la brevedad.
            </p>
            <a
              href="#inscripcion"
              className="inline-block mt-3 font-body text-brand-muted text-sm font-semibold hover:text-white transition-colors"
            >
              Ir al formulario →
            </a>
          </div>
        </div>

        {/* Divider + legal */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="font-body text-white/25 text-xs">
            © {year} Proactiva Salud. Todos los derechos reservados.
          </p>
          <div className="flex gap-6">
            <Link href="/privacidad" className="font-body text-white/25 text-xs hover:text-white/50 transition-colors">
              Política de privacidad
            </Link>
            <Link href="/terminos" className="font-body text-white/25 text-xs hover:text-white/50 transition-colors">
              Términos y condiciones
            </Link>
          </div>
        </div>

      </div>
    </footer>
  )
}
