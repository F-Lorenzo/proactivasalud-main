export { es } from './es'
export { en } from './en'
export { pt } from './pt'
export type { Translations } from './es'

export const LANGUAGES = {
  es: { label: 'Español', flag: '🇦🇷' },
  en: { label: 'English', flag: '🇺🇸' },
  pt: { label: 'Português', flag: '🇧🇷' },
} as const

export type Lang = keyof typeof LANGUAGES
