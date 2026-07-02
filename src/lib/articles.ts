import fs from 'fs'
import path from 'path'
import { unstable_cache } from 'next/cache'
import type { TextStyle } from './textStyles'

export interface Block {
  id: string
  type: 'paragraph' | 'image'
  content?: string
  src?: string
  caption?: string
  /** How many grid columns this block spans (1–4). Default: 4 (full width) */
  colSpan?: 1 | 2 | 3 | 4
  /** Typography override for paragraph blocks */
  style?: TextStyle
}

export interface Article {
  id: string
  slug: string
  title: string
  excerpt: string
  coverImage: string
  publishedAt: string
  blocks: Block[]
  titleStyle?: TextStyle
  excerptStyle?: TextStyle
}

const IS_VERCEL = process.env.VERCEL === '1'
const DATA_PATH = path.join(process.cwd(), 'data', 'articles.json')
export const BLOB_ARTICLES_PATH = 'blog/articles.json'

// ─── Filesystem (local dev) ───────────────────────────────────────────────────

function readArticlesFs(): Article[] {
  try {
    return JSON.parse(fs.readFileSync(DATA_PATH, 'utf-8')) as Article[]
  } catch {
    return []
  }
}

function writeArticlesFs(articles: Article[]): void {
  fs.writeFileSync(DATA_PATH, JSON.stringify(articles, null, 2), 'utf-8')
}

// ─── Vercel Blob (production) ─────────────────────────────────────────────────

async function fetchArticlesBlob(): Promise<Article[]> {
  try {
    const { list, issueSignedToken, presignUrl } = await import('@vercel/blob')

    const { blobs } = await list({ prefix: BLOB_ARTICLES_PATH })
    if (blobs.length === 0) return []

    const signed = await issueSignedToken({
      operations: ['get'],
      pathname: BLOB_ARTICLES_PATH,
      validUntil: Date.now() + 60_000,
    })

    const { presignedUrl } = await presignUrl(signed, {
      operation: 'get',
      pathname: BLOB_ARTICLES_PATH,
      access: 'private',
    })

    const res = await fetch(presignedUrl)
    if (!res.ok) return []
    return (await res.json()) as Article[]
  } catch (err) {
    console.error('[readArticlesBlob]', err)
    return []
  }
}

// Cache blob reads for 60 s — deduplicates multiple calls within the same
// request and across requests until content changes (invalidated on write).
const readArticlesCached = unstable_cache(
  fetchArticlesBlob,
  ['articles'],
  { revalidate: 60, tags: ['articles'] }
)

// ─── Public API ───────────────────────────────────────────────────────────────

export async function readArticles(): Promise<Article[]> {
  if (IS_VERCEL) return readArticlesCached()
  return readArticlesFs()
}

export async function writeArticles(articles: Article[]): Promise<void> {
  if (IS_VERCEL) {
    const { put } = await import('@vercel/blob')
    await put(BLOB_ARTICLES_PATH, JSON.stringify(articles), {
      access: 'private',
      contentType: 'application/json',
      addRandomSuffix: false,
      allowOverwrite: true,
    })
    // Invalidate the cache so next read reflects the new data
    const { revalidateTag } = await import('next/cache')
    revalidateTag('articles')
    return
  }
  writeArticlesFs(articles)
}

export function slugify(title: string): string {
  return title
    .toLowerCase()
    .normalize('NFD')
    // eslint-disable-next-line no-misleading-character-class
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}
