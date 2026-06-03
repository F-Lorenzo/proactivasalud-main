import { NextRequest } from 'next/server'
import { readArticles, writeArticles, slugify } from '@/lib/articles'
import type { Article } from '@/lib/articles'
import { randomUUID } from 'crypto'

export async function GET() {
  const articles = await readArticles()
  return Response.json(articles)
}

export async function POST(request: NextRequest) {
  const body = await request.json() as Partial<Article>
  const articles = await readArticles()

  const title = body.title?.trim() || 'Sin título'
  const base = slugify(title) || 'articulo'
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
    blocks: body.blocks ?? [],
  }

  articles.unshift(article)
  await writeArticles(articles)

  return Response.json(article, { status: 201 })
}
