import { NextRequest } from 'next/server'
import { readArticles, writeArticles, slugify } from '@/lib/articles'
import type { Article } from '@/lib/articles'

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const article = readArticles().find(a => a.id === id)
  if (!article) return Response.json({ error: 'Not found' }, { status: 404 })
  return Response.json(article)
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const body = await request.json() as Partial<Article>
  const articles = readArticles()
  const idx = articles.findIndex(a => a.id === id)
  if (idx === -1) return Response.json({ error: 'Not found' }, { status: 404 })

  const existing = articles[idx]
  const newTitle = body.title?.trim() ?? existing.title

  let finalSlug = existing.slug
  if (newTitle !== existing.title) {
    const base = slugify(newTitle) || 'articulo'
    finalSlug = base
    let i = 2
    while (articles.some((a, j) => j !== idx && a.slug === finalSlug)) {
      finalSlug = `${base}-${i++}`
    }
  }

  articles[idx] = {
    ...existing,
    ...body,
    id: existing.id,
    slug: finalSlug,
    title: newTitle,
  }

  writeArticles(articles)
  return Response.json(articles[idx])
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const articles = readArticles()
  const filtered = articles.filter(a => a.id !== id)
  writeArticles(filtered)
  return Response.json({ ok: true })
}
