export { es } from './es'
export { en } from './en'
export { pt } from './pt'
export type { Translations } from './es'

export const LANGUAGES = {
  es: { label: 'Español',   flagCode: 'ar', code: 'ESP' },
  en: { label: 'English',   flagCode: 'us', code: 'US' },
  pt: { label: 'Português', flagCode: 'br', code: 'BR' },
} as const

export type Lang = keyof typeof LANGUAGES
