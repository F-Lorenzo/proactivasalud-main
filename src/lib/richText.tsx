/**
 * Lightweight inline-markup parser for paragraph blocks.
 * Supports **bold**, __underline__, *italic* and {{#RRGGBB}}colored{{/}} applied
 * to part of a paragraph. Bold (**) is matched before italic (*) so ** never
 * gets consumed by the * pattern.
 */
const COLOR_MARKER = /^\{\{#([0-9a-fA-F]{6})\}\}([\s\S]*)\{\{\/\}\}$/

export function renderRichText(text: string): React.ReactNode[] {
  if (!text) return []
  const regex = /(\*\*[^*]+\*\*|__[^_]+__|\*[^*]+\*|\{\{#[0-9a-fA-F]{6}\}\}[\s\S]*?\{\{\/\}\})/g
  const parts = text.split(regex).filter(part => part !== '')
  return parts.map((part, i) => {
    // Use content as part of the key to avoid reconciliation bugs when parts shift
    const key = `${i}-${part.slice(0, 10)}`
    if (part.startsWith('**') && part.endsWith('**') && part.length > 4) {
      return <strong key={key}>{part.slice(2, -2)}</strong>
    }
    if (part.startsWith('__') && part.endsWith('__') && part.length > 4) {
      return <u key={key}>{part.slice(2, -2)}</u>
    }
    if (part.startsWith('*') && part.endsWith('*') && part.length > 2) {
      return <em key={key}>{part.slice(1, -1)}</em>
    }
    const colorMatch = part.match(COLOR_MARKER)
    if (colorMatch) {
      return <span key={key} style={{ color: `#${colorMatch[1]}` }}>{colorMatch[2]}</span>
    }
    return part
  })
}

/**
 * Strips inline markup markers for plain-text contexts (alt text, <title>, slugs, previews).
 * Strips color tokens individually (not just matched pairs) so a dangling,
 * unpaired {{#hex}} or {{/}} — e.g. left behind by hand-editing the raw text —
 * never leaks its hex digits into a slug or other plain-text output.
 */
export function stripRichText(text: string): string {
  if (!text) return text
  return text
    .replace(/\{\{#[0-9a-fA-F]{6}\}\}|\{\{\/\}\}/g, '')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/__([^_]+)__/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
}
