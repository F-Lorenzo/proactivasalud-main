/**
 * Lightweight inline-markup parser for paragraph blocks.
 * Supports **bold**, __underline__ and *italic* applied to part of a paragraph.
 * Bold (**) is matched before italic (*) so ** never gets consumed by the * pattern.
 */
export function renderRichText(text: string): React.ReactNode[] {
  if (!text) return []
  const regex = /(\*\*[^*]+\*\*|__[^_]+__|\*[^*]+\*)/g
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
    return part
  })
}
