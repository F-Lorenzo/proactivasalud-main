'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import { LANGUAGES, type Lang } from '@/lib/i18n'

export function LanguageSwitcher() {
  const { lang, setLang } = useLanguage()

  return (
    <div className="flex items-center gap-1" aria-label="Seleccionar idioma">
      {(Object.entries(LANGUAGES) as [Lang, { label: string; code: string }][]).map(
        ([langCode, { label, code }]) => (
          <button
            key={langCode}
            onClick={() => setLang(langCode)}
            title={label}
            aria-label={label}
            aria-pressed={lang === langCode}
            className={`rounded-full px-2 py-1 text-[12px] font-semibold tracking-wide transition-all duration-200 cursor-pointer flex-shrink-0 ${
              lang === langCode
                ? 'text-brand border-2 border-brand'
                : 'text-muted/70 border-2 border-transparent hover:text-brand/70'
            }`}
          >
            {code}
          </button>
        )
      )}
    </div>
  )
}
