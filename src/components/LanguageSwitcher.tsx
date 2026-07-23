'use client'

import Image from 'next/image'
import { useLanguage } from '@/contexts/LanguageContext'
import { LANGUAGES, type Lang } from '@/lib/i18n'

export function LanguageSwitcher() {
  const { lang, setLang } = useLanguage()

  return (
    <div className="flex items-center gap-1.5" aria-label="Seleccionar idioma">
      {(Object.entries(LANGUAGES) as [Lang, { label: string; flagCode: string }][]).map(
        ([langCode, { label, flagCode }]) => (
          <button
            key={langCode}
            onClick={() => setLang(langCode)}
            title={label}
            aria-label={label}
            aria-pressed={lang === langCode}
            className={`relative w-7 h-7 rounded-full overflow-hidden flex-shrink-0 transition-all duration-200 cursor-pointer ${
              lang === langCode
                ? 'ring-2 ring-brand ring-offset-2 scale-110'
                : 'ring-1 ring-black/10 opacity-55 hover:opacity-90'
            }`}
          >
            <Image
              src={`https://flagcdn.com/w80/${flagCode}.png`}
              alt={label}
              fill
              sizes="28px"
              className="object-cover"
            />
          </button>
        )
      )}
    </div>
  )
}
