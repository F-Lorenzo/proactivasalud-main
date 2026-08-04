import { NextRequest } from 'next/server'
import { readArticles, writeArticles, slugify, sanitizeBlocks } from '@/lib/articles'
import { requireAdminAuth } from '@/lib/adminAuth'
import { sanitizeTextStyle } from '@/lib/textStyles'
import { stripRichText } from '@/lib/richText'
import { withCors, corsPreflight } from '@/lib/cors'
import { toPublicArticle } from '@/lib/publicArticle'
import type { Article } from '@/lib/articles'

// Public read — accepts either the internal id or the blog slug, so a PWA
// can fetch a single article the same way /blog/[slug] does.
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const article = (await readArticles()).find(a => a.id === id || a.slug === id)
  if (!article) return withCors(Response.json({ error: 'Not found' }, { status: 404 }))
  return withCors(Response.json(toPublicArticle(article, request.nextUrl.origin)))
}

export async function OPTIONS() {
  return corsPreflight()
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

  // Regenerate whenever the current slug no longer matches what a clean
  // derivation of the title would produce — covers both a real title edit
  // and self-healing a slug left corrupted by an older bug (e.g. a stray
  // {{#hex}} marker that used to leak into the slug).
  const desiredBase = slugify(stripRichText(newTitle)) || 'articulo'
  const slugMatchesTitle = new RegExp(`^${desiredBase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(-\\d+)?$`).test(existing.slug)

  let finalSlug = existing.slug
  if (!slugMatchesTitle) {
    finalSlug = desiredBase
    let i = 2
    while (articles.some((a, j) => j !== idx && a.slug === finalSlug)) {
      finalSlug = `${desiredBase}-${i++}`
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
