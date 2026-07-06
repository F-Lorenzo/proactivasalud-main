import { NextRequest } from 'next/server'
import { readArticles, writeArticles, slugify, sanitizeBlocks } from '@/lib/articles'
import { requireAdminAuth } from '@/lib/adminAuth'
import { sanitizeTextStyle } from '@/lib/textStyles'
import { stripRichText } from '@/lib/richText'
import type { Article } from '@/lib/articles'
import { randomUUID } from 'crypto'

export async function GET() {
  const articles = await readArticles()
  return Response.json(articles)
}

export async function POST(request: NextRequest) {
  const authError = requireAdminAuth(request)
  if (authError) return authError

  const body = await request.json() as Partial<Article>
  const articles = await readArticles()

  const title = body.title?.trim() || 'Sin título'
  const base = slugify(stripRichText(title)) || 'articulo'
  let finalSlug = base
  let i = 2
  while (articles.some(a => a.slug === finalSlug)) {
    finalSlug = `${base}-${i++}`
  }

  const article: Article = {
    id: randomUUID(),
    slug: finalSlug,
    title,
    excerpt: body.excerpt?.trim() ?? '',
    coverImage: body.coverImage ?? '',
    publishedAt: body.publishedAt ?? new Date().toISOString().slice(0, 10),
    blocks: sanitizeBlocks(body.blocks),
    titleStyle: sanitizeTextStyle(body.titleStyle),
    excerptStyle: sanitizeTextStyle(body.excerptStyle),
  }

  articles.unshift(article)
  await writeArticles(articles)

  return Response.json(article, { status: 201 })
}
