export interface TextStyle {
  font?: string
  weight?: number
  size?: number
}

export const FONT_OPTIONS = [
  { label: 'Playfair Display (serif elegante)', value: 'var(--font-playfair)' },
  { label: 'Inter (sans moderna)',               value: 'var(--font-inter)' },
  { label: 'Montserrat (sans geométrica)',        value: 'var(--font-montserrat)' },
  { label: 'Merriweather (serif editorial)',      value: 'var(--font-merriweather)' },
  { label: 'Lora (serif cálida)',                 value: 'var(--font-lora)' },
] as const

export const WEIGHT_OPTIONS = [
  { label: 'Regular',    value: 400 },
  { label: 'Medium',     value: 500 },
  { label: 'Semibold',   value: 600 },
  { label: 'Bold',       value: 700 },
  { label: 'Extrabold',  value: 800 },
] as const

export const TITLE_SIZE_OPTIONS = [16, 18, 20, 24, 28, 32, 36, 40, 48, 56] as const
export const SUBTITLE_SIZE_OPTIONS = [14, 15, 16, 18, 20, 22, 24] as const
export const TEXT_SIZE_OPTIONS = [13, 14, 15, 16, 17, 18, 20, 22] as const

export function textStyleToCss(style?: TextStyle): React.CSSProperties {
  if (!style) return {}
  return {
    ...(style.font ? { fontFamily: style.font } : {}),
    ...(style.weight ? { fontWeight: style.weight } : {}),
    ...(style.size ? { fontSize: `${style.size}px` } : {}),
  }
}
