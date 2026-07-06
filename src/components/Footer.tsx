'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Heart } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

export function Footer() {
  const year = new Date().getFullYear()
  const { t } = useLanguage()

  const LINKS = [
    {
      title: t.footer.personas,
      links: [
        { label: t.footer.link_programasSalud,   href: '#programas' },
        { label: t.footer.link_saludEmocional,    href: '#programas' },
        { label: t.footer.link_nutricion,         href: '#programas' },
        { label: t.footer.link_actividadFisica,   href: '#programas' },
        { label: t.footer.link_comunidad,         href: '#programas' },
      ],
    },
    {
      title: t.footer.empresas,
      links: [
        { label: t.footer.link_programasCorporativos, href: '#empresas' },
        { label: t.footer.link_metricasImpacto,       href: '#empresas' },
        { label: t.footer.link_solicitarDemo,          href: '#demo'     },
      ],
    },
    {
      title: t.footer.proactiva,
      links: [
        { label: t.footer.link_nosotros,   href: '#nosotros'    },
        { label: t.footer.link_blog,       href: '#recursos'    },
        { label: t.footer.link_privacidad, href: '/privacidad'  },
        { label: t.footer.link_terminos,   href: '/terminos'    },
      ],
    },
  ]

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
              Bienestar integral {t.footer.tagline}. Human Care Platform.
            </p>
          </div>

          {/* Nav columns */}
          {LINKS.map(({ title, links }) => (
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
            © {year} Proactiva Salud. {t.footer.copyright}
          </p>
          <p className="text-white/25 text-[12px] flex items-center gap-1.5">
            Hecho con <Heart size={11} className="text-brand fill-brand" aria-hidden /> {t.footer.tagline}
          </p>
        </div>

      </div>
    </footer>
  )
}
