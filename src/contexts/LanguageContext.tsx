'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import type { ReactNode } from 'react'
import { es } from '@/lib/i18n/es'
import { en } from '@/lib/i18n/en'
import { pt } from '@/lib/i18n/pt'
import type { Translations } from '@/lib/i18n/es'
import type { Lang } from '@/lib/i18n'

const translations: Record<Lang, Translations> = { es, en, pt }

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
    const saved = localStorage.getItem('proactiva-lang') as Lang | null
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time restore from storage on mount, not state mirroring
    if (saved && saved in translations) setLangState(saved)
  }, [])

  function setLang(newLang: Lang) {
    setLangState(newLang)
    localStorage.setItem('proactiva-lang', newLang)
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
