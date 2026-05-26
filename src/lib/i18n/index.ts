export { es } from './es'
export { en } from './en'
export { pt } from './pt'
export type { Translations } from './es'

export const LANGUAGES = {
  es: { label: 'Español',   flagCode: 'ar' },
  en: { label: 'English',   flagCode: 'us' },
  pt: { label: 'Português', flagCode: 'br' },
} as const

export type Lang = keyof typeof LANGUAGES
