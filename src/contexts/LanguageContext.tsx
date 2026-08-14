'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import type { ReactNode } from 'react'
import { es } from '@/lib/i18n/es'
import { en } from '@/lib/i18n/en'
import { pt } from '@/lib/i18n/pt'
import type { Translations } from '@/lib/i18n/es'
import type { Lang } from '@/lib/i18n'

const translations: Record<Lang, Translations> = { es, en, pt }

// Shared with personas.proactivasalud.com and empresas.proactivasalud.com so
// a language change on any of the three sites carries over to the others.
// Cookie name and semantics (root-domain cookie, 1-year expiry, values
// 'es' | 'en' | 'pt') are the protocol the three repos agree on.
const COOKIE_NAME = 'ps_lang'
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365

function readCookie(name: string): string | null {
  const match = document.cookie.match(new RegExp('(?:^|; )' + name + '=([^;]*)'))
  return match ? decodeURIComponent(match[1]) : null
}

function writeCookie(name: string, value: string) {
  // A cookie's `domain` attribute must be a suffix of the current host, or
  // the browser silently drops the whole Set-Cookie — so only scope it to
  // the root domain on the real *.proactivasalud.com deployments. Locally
  // and on *.vercel.app previews this falls back to a host-only cookie.
  const host = location.hostname
  const domainAttr = host.endsWith('proactivasalud.com') ? '; domain=.proactivasalud.com' : ''
  document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=${COOKIE_MAX_AGE}; SameSite=Lax${domainAttr}`
}

interface LanguageContextType {
  lang: Lang
  setLang: (lang: Lang) => void
  t: Translations
}

const LanguageContext = createContext<LanguageContextType>({
  lang: 'es',
  setLang: () => {},
  t: es,
})

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>('es')

  useEffect(() => {
    const fromCookie = readCookie(COOKIE_NAME) as Lang | null
    const fromStorage = localStorage.getItem('proactiva-lang') as Lang | null
    const saved = (fromCookie && fromCookie in translations) ? fromCookie : fromStorage
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time restore from storage on mount, not state mirroring
    if (saved && saved in translations) setLangState(saved)
  }, [])

  function setLang(newLang: Lang) {
    setLangState(newLang)
    localStorage.setItem('proactiva-lang', newLang)
    writeCookie(COOKIE_NAME, newLang)
  }

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  return useContext(LanguageContext)
}
