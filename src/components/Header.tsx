'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export function Header() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/92 backdrop-blur-md shadow-card'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 h-32 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center group">
          <Image
            src="/ProActiva-NUEVA.png"
            alt="Proactiva Salud"
            width={160}
            height={48}
            className="h-28 w-auto object-contain"
            priority
          />
        </Link>

        {/* Nav */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Navegación principal">
          <Link
            href="/"
            className="font-body text-sm text-ink-mid hover:text-brand transition-colors"
          >
            Inicio
          </Link>
          <Link
            href="/#pilares"
            className="font-body text-sm text-ink-mid hover:text-brand transition-colors"
          >
            El programa
          </Link>
          <Link
            href="/#planes"
            className="font-body text-sm text-ink-mid hover:text-brand transition-colors"
          >
            Planes
          </Link>
          <Link
            href="/#piloto"
            className="font-body text-sm text-ink-mid hover:text-brand transition-colors"
          >
            El piloto
          </Link>
          <Link
            href="/quienes-somos"
            className="font-body text-sm text-ink-mid hover:text-brand transition-colors"
          >
            Quiénes somos
          </Link>
        </nav>

        {/* CTA */}
        <Link
          href="/#inscripcion"
          className="bg-brand text-white font-body font-semibold text-sm px-5 py-2.5 rounded-full hover:bg-brand-dark transition-all duration-200 shadow-button hover:shadow-hover"
        >
          Reservar mi cupo
        </Link>
      </div>
    </header>
  )
}
