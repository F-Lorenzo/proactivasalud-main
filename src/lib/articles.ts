import fs from 'fs'
import path from 'path'

export interface Block {
  id: string
  type: 'paragraph' | 'image'
  content?: string
  src?: string
  caption?: string
}

export interface Article {
  id: string
  slug: string
  title: string
  excerpt: string
  coverImage: string
  publishedAt: string
  blocks: Block[]
}

const IS_VERCEL = process.env.VERCEL === '1'
const DATA_PATH = path.join(process.cwd(), 'data', 'articles.json')
const BLOB_ARTICLES_PATH = 'blog/articles.json'

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

async function readArticlesBlob(): Promise<Article[]> {
  try {
    const { list, get } = await import('@vercel/blob')
    const { blobs } = await list({ prefix: BLOB_ARTICLES_PATH })
    if (blobs.length === 0) return []

    // Use SDK get() — handles OIDC auth automatically in Vercel production
    const result = await get(blobs[0].url, { access: 'private', useCache: false })
    if (!result?.stream) return []

    // Read stream → text → JSON
    const reader = (result.stream as unknown as ReadableStream<Uint8Array>).getReader()
    const chunks: Uint8Array[] = []
    for (;;) {
      const { done, value } = await reader.read()
      if (done) break
      if (value) chunks.push(value)
    }
    const totalLength = chunks.reduce((n, c) => n + c.length, 0)
    const merged = new Uint8Array(totalLength)
    let offset = 0
    for (const chunk of chunks) { merged.set(chunk, offset); offset += chunk.length }
    const text = new TextDecoder().decode(merged)
    return JSON.parse(text) as Article[]
  } catch {
    return []
  }
}

async function writeArticlesBlob(articles: Article[]): Promise<void> {
  const { put } = await import('@vercel/blob')
  await put(BLOB_ARTICLES_PATH, JSON.stringify(articles), {
    access: 'private',
    contentType: 'application/json',
    addRandomSuffix: false,
  })
}

// ─── Public API ───────────────────────────────────────────────────────────────

export async function readArticles(): Promise<Article[]> {
  if (IS_VERCEL) return readArticlesBlob()
  return readArticlesFs()
}

export async function writeArticles(articles: Article[]): Promise<void> {
  if (IS_VERCEL) return writeArticlesBlob(articles)
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
