'use client'

import Image from 'next/image'
import { useLanguage } from '@/contexts/LanguageContext'
import { LANGUAGES, type Lang } from '@/lib/i18n'

export function LanguageSwitcher() {
  const { lang, setLang } = useLanguage()

  return (
    <div className="flex items-center gap-1" aria-label="Seleccionar idioma">
      {(Object.entries(LANGUAGES) as [Lang, { label: string; flagCode: string }][]).map(
        ([code, { label, flagCode }]) => (
          <button
            key={code}
            onClick={() => setLang(code)}
            title={label}
            aria-label={label}
            aria-pressed={lang === code}
            className={`relative rounded-md overflow-hidden transition-all duration-200 cursor-pointer flex-shrink-0 ${
              lang === code
                ? 'opacity-100 scale-110 ring-2 ring-brand ring-offset-1'
                : 'opacity-45 hover:opacity-80 hover:scale-105'
            }`}
          >
            <Image
              src={`https://flagcdn.com/w40/${flagCode}.png`}
              alt={label}
              width={28}
              height={20}
              className="block"
              unoptimized
            />
          </button>
        )
      )}
    </div>
  )
}
