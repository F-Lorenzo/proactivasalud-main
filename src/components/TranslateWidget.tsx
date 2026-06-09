'use client'

import { useEffect, useState } from 'react'

declare global {
  interface Window {
    googleTranslateElementInit: () => void
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    google: any
  }
}

const LANGS = [
  { code: 'es', emoji: '🇦🇷', label: 'Español' },
  { code: 'en', emoji: '🇺🇸', label: 'English' },
  { code: 'pt', emoji: '🇧🇷', label: 'Português' },
]

export function TranslateWidget() {
  const [active, setActive] = useState('es')
  const [ready, setReady] = useState(false)

  useEffect(() => {
    // Hide Google's default top banner via global styles
    const style = document.createElement('style')
    style.id = 'gt-hide-banner'
    style.textContent = `
      .goog-te-banner-frame { display: none !important; }
      .skiptranslate { display: none !important; }
      body { top: 0 !important; }
      #google_translate_element { display: none !important; }
    `
    document.head.appendChild(style)

    // Callback invoked by Google's script once loaded
    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        { pageLanguage: 'es', includedLanguages: 'en,pt', autoDisplay: false },
        'google_translate_element'
      )
      setReady(true)
    }

    const script = document.createElement('script')
    script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit'
    script.async = true
    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
      document.getElementById('gt-hide-banner')?.remove()
    }
  }, [])

  function handleSelect(code: string) {
    setActive(code)

    if (code === 'es') {
      // Reset to original language — clear Google's cookie and reload
      document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/'
      document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=' + location.hostname
      window.location.reload()
      return
    }

    // Wait for the hidden <select> that Google Translate injects, then trigger change
    const tryTranslate = (attempts = 0) => {
      const select = document.querySelector('.goog-te-combo') as HTMLSelectElement | null
      if (select) {
        select.value = code
        select.dispatchEvent(new Event('change'))
      } else if (attempts < 20) {
        setTimeout(() => tryTranslate(attempts + 1), 150)
      }
    }
    tryTranslate()
  }

  return (
    <>
      {/* Mount point for Google Translate (hidden) */}
      <div id="google_translate_element" />

      {/* Flag buttons */}
      <div className="flex items-center gap-0.5" role="group" aria-label="Idioma del artículo">
        {LANGS.map(lang => (
          <button
            key={lang.code}
            onClick={() => handleSelect(lang.code)}
            disabled={!ready && lang.code !== 'es'}
            title={lang.label}
            aria-pressed={active === lang.code}
            className={`
              text-2xl leading-none p-1.5 rounded-xl transition-all duration-150 select-none
              ${active === lang.code
                ? 'scale-110 ring-2 ring-brand ring-offset-1 opacity-100'
                : 'opacity-50 hover:opacity-90 hover:scale-105'}
              disabled:cursor-not-allowed
            `}
          >
            {lang.emoji}
          </button>
        ))}
      </div>
    </>
  )
}
