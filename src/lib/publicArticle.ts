import type { Article } from './articles'

/** Image fields on an Article are stored as paths relative to this site
 * (e.g. "/api/blob-image/xyz"). An external consumer (a PWA on another
 * origin) needs absolute URLs to actually load them, so this resolves
 * every image reference against the requesting origin before the article
 * leaves the public API. */
function toAbsolute(url: string, origin: string): string {
  if (!url) return url
  if (/^https?:\/\//.test(url)) return url
  return `${origin}${url.startsWith('/') ? '' : '/'}${url}`
}

export function toPublicArticle(article: Article, origin: string): Article {
  return {
    ...article,
    coverImage: toAbsolute(article.coverImage, origin),
    blocks: article.blocks.map(block =>
      block.type === 'image' && block.src
        ? { ...block, src: toAbsolute(block.src, origin) }
        : block
    ),
  }
}
