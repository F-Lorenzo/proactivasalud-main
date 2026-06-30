/**
 * Lightweight inline-markup parser for paragraph blocks.
 * Supports **bold**, __underline__ and *italic* applied to part of a paragraph,
 * written by the admin's selection toolbar (src/app/admin/blog/page.tsx).
 */
export function renderRichText(text: string): React.ReactNode[] {
  if (!text) return []
  const regex = /(\*\*[^*]+\*\*|__[^_]+__|\*[^*]+\*)/g
  const parts = text.split(regex).filter(part => part !== '')
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**') && part.length > 4) {
      return <strong key={i}>{part.slice(2, -2)}</strong>
    }
    if (part.startsWith('__') && part.endsWith('__') && part.length > 4) {
      return <u key={i}>{part.slice(2, -2)}</u>
    }
    if (part.startsWith('*') && part.endsWith('*') && part.length > 2) {
      return <em key={i}>{part.slice(1, -1)}</em>
    }
    return part
  })
}
