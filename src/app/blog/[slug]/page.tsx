import Link from 'next/link'
import { ArticleImage as Image } from '@/components/ArticleImage'
import { notFound } from 'next/navigation'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { readArticles } from '@/lib/articles'
import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const article = (await readArticles()).find(a => a.slug === slug)
  if (!article) return {}
  return {
    title: `${article.title} — Proactiva Salud`,
    description: article.excerpt,
  }
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params
  const article = (await readArticles()).find(a => a.slug === slug)
  if (!article) notFound()

  return (
    <>
      <Header />
      <main id="main" className="min-h-screen bg-white pt-[72px]">
        {/* Cover */}
        {article.coverImage && (
          <div className="relative w-full h-72 md:h-[420px] bg-sage-pale overflow-hidden">
            <Image
              src={article.coverImage}
              alt={article.title}
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          </div>
        )}

        <article className="max-w-2xl mx-auto px-6 py-12">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1 text-brand text-sm font-semibold mb-8 hover:opacity-80 transition-opacity"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Volver al blog
          </Link>

          <p className="text-muted text-sm mb-3">
            {new Date(article.publishedAt).toLocaleDateString('es-AR', {
              year: 'numeric', month: 'long', day: 'numeric',
            })}
          </p>

          <h1 className="font-display text-3xl md:text-4xl font-bold text-navy leading-tight mb-4">
            {article.title}
          </h1>

          {article.excerpt && (
            <p className="text-lg text-muted leading-relaxed mb-10 border-l-4 border-brand pl-4">
              {article.excerpt}
            </p>
          )}

          <div className="space-y-8">
            {article.blocks.map(block => {
              if (block.type === 'paragraph') {
                return (
                  <p key={block.id} className="text-[17px] text-ink-mid leading-relaxed whitespace-pre-wrap">
                    {block.content}
                  </p>
                )
              }
              if (block.type === 'image' && block.src) {
                return (
                  <figure key={block.id} className="my-10">
                    <div className="relative w-full rounded-2xl overflow-hidden bg-sage-pale" style={{ aspectRatio: '16/9' }}>
                      <Image
                        src={block.src}
                        alt={block.caption ?? ''}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 672px"
                      />
                    </div>
                    {block.caption && (
                      <figcaption className="text-center text-sm text-muted mt-3 italic">
                        {block.caption}
                      </figcaption>
                    )}
                  </figure>
                )
              }
              return null
            })}
          </div>

          <div className="mt-16 p-8 bg-sage-pale rounded-2xl text-center">
            <p className="font-display text-xl font-semibold text-navy mb-2">
              ¿Querés saber más sobre Proactiva Salud?
            </p>
            <p className="text-muted mb-6">
              Descubrí nuestros programas de bienestar para la generación 50+.
            </p>
            <Link
              href="/"
              className="inline-block bg-brand text-white font-semibold px-8 py-3 rounded-full hover:bg-brand-dark transition-colors"
            >
              Conocer programas
            </Link>
          </div>
        </article>
      </main>
      <Footer />
    </>
  )
}
