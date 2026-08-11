'use client'

import { useEffect, useRef } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'

declare global {
  interface Window {
    googleTranslateElementInit: () => void
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    google: any
  }
}

function applyLang(target: string) {
  if (target === 'es') {
    if (!document.cookie.includes('googtrans=')) return
    document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/'
    document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=' + location.hostname
    window.location.reload()
    return
  }
  const tryTranslate = (attempts = 0) => {
    const select = document.querySelector('.goog-te-combo') as HTMLSelectElement | null
    if (select) {
      if (select.value === target) return
      select.value = target
      select.dispatchEvent(new Event('change'))
    } else if (attempts < 20) {
      setTimeout(() => tryTranslate(attempts + 1), 150)
    }
  }
  tryTranslate()
}

/**
 * Silently drives Google Translate for CMS content (blog posts have no
 * per-language variant, unlike the rest of the site's manually translated
 * UI strings) using the same site-wide language selector as the header
 * flags — so switching language anywhere on the site also translates blog
 * pages, instead of requiring the separate, disconnected per-page control
 * this replaced.
 */
export function AutoTranslate() {
  const { lang } = useLanguage()
  const langRef = useRef(lang)
  const readyRef = useRef(false)

  useEffect(() => {
    langRef.current = lang
  }, [lang])

  useEffect(() => {
    const style = document.createElement('style')
    style.id = 'gt-hide-banner-auto'
    style.textContent = `
      .goog-te-banner-frame { display: none !important; }
      .skiptranslate { display: none !important; }
      body { top: 0 !important; }
      #google_translate_element_auto { display: none !important; }
    `
    document.head.appendChild(style)

    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        { pageLanguage: 'es', includedLanguages: 'en,pt', autoDisplay: false },
        'google_translate_element_auto'
      )
      readyRef.current = true
      applyLang(langRef.current)
    }

    const script = document.createElement('script')
    script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit'
    script.async = true
    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
      document.getElementById('gt-hide-banner-auto')?.remove()
    }
  }, [])

  useEffect(() => {
    if (readyRef.current) applyLang(lang)
  }, [lang])

  return <div id="google_translate_element_auto" />
}
