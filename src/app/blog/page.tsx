import Link from 'next/link'
import Image from 'next/image'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { readArticles } from '@/lib/articles'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog — Proactiva Salud',
  description: 'Artículos sobre bienestar, salud y calidad de vida para la generación silver.',
}

export const dynamic = 'force-dynamic'

export default function BlogPage() {
  const articles = readArticles()

  return (
    <>
      <Header />
      <main id="main" className="min-h-screen bg-ivory pt-[72px]">
        {/* Hero strip */}
        <section className="bg-brand text-white py-16 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-sage-light text-sm font-semibold uppercase tracking-widest mb-3">
              Recursos y bienestar
            </p>
            <h1 className="font-display text-4xl md:text-5xl font-bold leading-tight mb-4">
              Blog Proactiva
            </h1>
            <p className="text-white/80 text-lg max-w-xl mx-auto">
              Consejos, guías y artículos para vivir mejor en cada etapa de la vida.
            </p>
          </div>
        </section>

        {/* Articles grid */}
        <section className="max-w-6xl mx-auto px-6 py-16">
          {articles.length === 0 ? (
            <div className="text-center py-24">
              <p className="text-muted text-lg">Aún no hay artículos publicados.</p>
              <p className="text-muted mt-2 text-sm">
                Publicá el primero desde el{' '}
                <Link href="/admin/blog" className="text-brand underline">
                  panel de administración
                </Link>
                .
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articles.map(article => (
                <Link
                  key={article.id}
                  href={`/blog/${article.slug}`}
                  className="group bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-hover transition-shadow duration-300"
                >
                  <div className="relative h-52 bg-sage-pale overflow-hidden">
                    {article.coverImage ? (
                      <Image
                        src={article.coverImage}
                        alt={article.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <svg className="w-16 h-16 text-sage opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <p className="text-xs text-muted mb-2">
                      {new Date(article.publishedAt).toLocaleDateString('es-AR', {
                        year: 'numeric', month: 'long', day: 'numeric',
                      })}
                    </p>
                    <h2 className="font-display text-xl font-semibold text-navy mb-2 leading-snug group-hover:text-brand transition-colors">
                      {article.title}
                    </h2>
                    {article.excerpt && (
                      <p className="text-muted text-sm line-clamp-3">{article.excerpt}</p>
                    )}
                    <span className="mt-4 inline-flex items-center gap-1 text-brand text-sm font-semibold">
                      Leer más
                      <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  )
}
