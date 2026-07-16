/** Formats an article's publishedAt (YYYY-MM-DD) as a localized es-AR date. */
export function formatArticleDate(dateStr: string, month: 'long' | 'short' = 'long'): string {
  return new Date(dateStr).toLocaleDateString('es-AR', { day: 'numeric', month, year: 'numeric' })
}
