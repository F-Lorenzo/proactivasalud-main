import fs from 'fs'
import path from 'path'
import { unstable_cache } from 'next/cache'
import { sanitizeTextStyle, type TextStyle } from './textStyles'

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
    // Expire the data cache immediately (not stale-while-revalidate) so the
    // next readArticles() call after a write returns fresh data.
    const { revalidateTag, revalidatePath } = await import('next/cache')
    revalidateTag('articles', { expire: 0 })
    // Also bust the page-level Full Route Cache — revalidateTag alone only
    // invalidates the underlying data, not already-rendered page HTML.
    revalidatePath('/', 'layout')
    return
  }
  writeArticlesFs(articles)
}

const ALLOWED_COL_SPANS = new Set([1, 2, 3, 4])

/** Validates/strips untrusted block data from the write API — keeps only the
 * shape the admin block editor could have produced. */
export function sanitizeBlocks(blocks: unknown): Block[] {
  if (!Array.isArray(blocks)) return []
  const clean: Block[] = []
  for (const b of blocks) {
    if (!b || typeof b !== 'object') continue
    const block = b as Record<string, unknown>
    if (typeof block.id !== 'string') continue
    if (block.type !== 'paragraph' && block.type !== 'image') continue

    const out: Block = { id: block.id, type: block.type }
    if (typeof block.content === 'string') out.content = block.content
    if (typeof block.src === 'string') out.src = block.src
    if (typeof block.caption === 'string') out.caption = block.caption
    if (typeof block.colSpan === 'number' && ALLOWED_COL_SPANS.has(block.colSpan)) {
      out.colSpan = block.colSpan as 1 | 2 | 3 | 4
    }
    const style = sanitizeTextStyle(block.style)
    if (style) out.style = style

    clean.push(out)
  }
  return clean
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
