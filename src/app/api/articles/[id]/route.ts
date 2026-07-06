import { NextRequest } from 'next/server'
import { readArticles, writeArticles, slugify, sanitizeBlocks } from '@/lib/articles'
import { requireAdminAuth } from '@/lib/adminAuth'
import { sanitizeTextStyle } from '@/lib/textStyles'
import { stripRichText } from '@/lib/richText'
import type { Article } from '@/lib/articles'

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const article = (await readArticles()).find(a => a.id === id)
  if (!article) return Response.json({ error: 'Not found' }, { status: 404 })
  return Response.json(article)
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authError = requireAdminAuth(request)
  if (authError) return authError

  const { id } = await params
  const body = await request.json() as Partial<Article>
  const articles = await readArticles()
  const idx = articles.findIndex(a => a.id === id)
  if (idx === -1) return Response.json({ error: 'Not found' }, { status: 404 })

  const existing = articles[idx]
  const newTitle = body.title?.trim() ?? existing.title

  let finalSlug = existing.slug
  if (newTitle !== existing.title) {
    const base = slugify(stripRichText(newTitle)) || 'articulo'
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
    blocks: body.blocks !== undefined ? sanitizeBlocks(body.blocks) : existing.blocks,
    titleStyle: body.titleStyle !== undefined ? sanitizeTextStyle(body.titleStyle) : existing.titleStyle,
    excerptStyle: body.excerptStyle !== undefined ? sanitizeTextStyle(body.excerptStyle) : existing.excerptStyle,
  }
  await writeArticles(articles)
  return Response.json(articles[idx])
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authError = requireAdminAuth(request)
  if (authError) return authError

  const { id } = await params
  const articles = await readArticles()
  await writeArticles(articles.filter(a => a.id !== id))
  return Response.json({ ok: true })
}
