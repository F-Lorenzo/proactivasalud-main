'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import { LANGUAGES, type Lang } from '@/lib/i18n'

export function LanguageSwitcher() {
  const { lang, setLang } = useLanguage()

  return (
    <div className="flex items-center gap-0.5" aria-label="Seleccionar idioma">
      {(Object.entries(LANGUAGES) as [Lang, { label: string; flag: string }][]).map(
        ([code, { label, flag }]) => (
          <button
            key={code}
            onClick={() => setLang(code)}
            title={label}
            aria-label={label}
            aria-pressed={lang === code}
            className={`text-xl leading-none px-1.5 py-1 rounded-lg transition-all duration-200 cursor-pointer ${
              lang === code
                ? 'opacity-100 scale-110 bg-brand-light/60'
                : 'opacity-35 hover:opacity-70 hover:scale-105 hover:bg-brand-light/40'
            }`}
          >
            {flag}
          </button>
        )
      )}
    </div>
  )
}
