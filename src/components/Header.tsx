'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import { LanguageSwitcher } from './LanguageSwitcher'

const B2C = 'https://proactivasalud-b2-c.vercel.app/'
const B2B = 'https://proactivasalud-b2-b.vercel.app/'

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { t } = useLanguage()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const NAV = [
    { label: t.nav.inicio,    href: '/' },
    { label: t.nav.personas,  href: B2C },
    { label: t.nav.empresas,  href: B2B },
    { label: t.nav.programas, href: '/#programas' },
    { label: t.nav.nosotros,  href: '/quienes-somos' },
    { label: t.nav.blog,      href: '/#recursos' },
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm' : 'bg-white/90 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-[72px]">

          {/* ── Logo ── */}
          <Link href="/" className="flex items-center gap-3 flex-shrink-0">
            <Image
              src="/ProActiva-NUEVA.png"
              alt="Proactiva Salud"
              width={296}
              height={88}
              className="h-[6.5rem] w-auto object-contain"
              priority
            />
          </Link>

          {/* ── Desktop nav ── */}
          <nav className="hidden lg:flex items-center gap-7" aria-label="Navegación principal">
            {NAV.map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                className="text-[15px] font-bold text-black hover:text-brand transition-colors duration-200"
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* ── Desktop right: switcher + CTA ── */}
          <div className="hidden lg:flex items-center gap-3">
            <LanguageSwitcher />
            <motion.a
              href="https://proactivasalud-b2-b.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-brand text-white text-[13.5px] font-semibold px-6 py-2.5 rounded-full hover:bg-brand-dark transition-colors shadow-sm"
            >
              {t.nav.solicitarDemo}
            </motion.a>
          </div>

          {/* ── Mobile right: switcher + burger ── */}
          <div className="lg:hidden flex items-center gap-2">
            <LanguageSwitcher />
            <button
              className="p-2 text-navy rounded-lg hover:bg-navy/5 transition-colors"
              onClick={() => setMenuOpen(o => !o)}
              aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* ── Mobile menu ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="lg:hidden bg-white border-t border-gray-100 overflow-hidden"
          >
            <div className="px-6 py-5 space-y-1">
              {NAV.map(({ label, href }) => (
                <Link
                  key={label}
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className="block py-3 text-[15px] font-bold text-black hover:text-brand transition-colors border-b border-gray-50 last:border-0"
                >
                  {label}
                </Link>
              ))}
              <a
                href="https://proactivasalud-b2-b.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMenuOpen(false)}
                className="block mt-4 w-full text-center bg-brand text-white py-3.5 rounded-full font-semibold text-[15px]"
              >
                {t.nav.solicitarDemo}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
