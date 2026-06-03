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

async function readArticlesBlob(): Promise<Article[]> {
  try {
    const { list, issueSignedToken, presignUrl } = await import('@vercel/blob')

    // 1. Find the blob via API (OIDC-authenticated)
    const { blobs } = await list({ prefix: BLOB_ARTICLES_PATH })
    if (blobs.length === 0) return []

    // 2. Issue a short-lived signed token for reading (goes via blob.vercel-storage.com API)
    const signed = await issueSignedToken({
      operations: ['get'],
      pathname: BLOB_ARTICLES_PATH,
      validUntil: Date.now() + 60_000, // 1 minute
    })

    // 3. Build a presigned URL — the HMAC signature is embedded, no auth header needed
    const { presignedUrl } = await presignUrl(signed, {
      operation: 'get',
      pathname: BLOB_ARTICLES_PATH,
      access: 'private',
    })

    // 4. Plain fetch
    const res = await fetch(presignedUrl, { cache: 'no-store' })
    if (!res.ok) return []
    return (await res.json()) as Article[]
  } catch (err) {
    console.error('[readArticlesBlob]', err)
    return []
  }
}

async function writeArticlesBlob(articles: Article[]): Promise<void> {
  const { put } = await import('@vercel/blob')
  await put(BLOB_ARTICLES_PATH, JSON.stringify(articles), {
    access: 'private',
    contentType: 'application/json',
    addRandomSuffix: false,
    allowOverwrite: true,
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
