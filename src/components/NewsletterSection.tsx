import Link from 'next/link'
import Image from 'next/image'
import { readArticles } from '@/lib/articles'

export async function NewsletterSection() {
  const all = await readArticles()
  const articles = all.slice(0, 3)

  return (
    <section id="recursos" className="py-20 px-6 lg:px-8 bg-ivory">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
          <div>
            <p className="text-brand text-sm font-semibold uppercase tracking-widest mb-2">
              Newsletter &amp; Recursos
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-navy leading-tight">
              Vivir mejor, cada semana
            </h2>
            <p className="text-muted mt-2 max-w-md">
              Consejos prácticos de nutrición, movimiento y bienestar emocional para la generación 50+.
            </p>
          </div>
          <Link
            href="/blog"
            className="flex-shrink-0 inline-flex items-center gap-1.5 text-brand font-semibold text-sm hover:opacity-75 transition-opacity"
          >
            Ver todos los artículos
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {articles.length === 0 ? (
          /* Empty state — solo visible si no hay artículos aún */
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { tag: 'Nutrición', title: 'Cómo alimentarte bien después de los 50', teaser: 'Una guía práctica con los nutrientes clave para mantener energía, masa muscular y vitalidad.' },
              { tag: 'Movimiento', title: 'Ejercicios suaves para cuidar tus articulaciones', teaser: 'Rutinas de bajo impacto que podés hacer en casa, adaptadas a tu ritmo y condición.' },
              { tag: 'Bienestar', title: 'El poder de los vínculos en la segunda mitad de la vida', teaser: 'Por qué las relaciones sociales son tan importantes para la salud como la dieta o el ejercicio.' },
            ].map((card, i) => (
              <PlaceholderCard key={i} {...card} />
            ))}
          </div>
        ) : (
          <div className={`grid gap-6 ${articles.length === 1 ? 'grid-cols-1 max-w-md' : articles.length === 2 ? 'grid-cols-1 md:grid-cols-2 max-w-2xl mx-auto' : 'grid-cols-1 md:grid-cols-3'}`}>
            {/* Featured first article */}
            {articles[0] && <ArticleCard article={articles[0]} featured={articles.length >= 2} />}
            {/* Rest */}
            {articles.slice(1).map(a => (
              <ArticleCard key={a.id} article={a} featured={false} />
            ))}
          </div>
        )}

        {/* Subscribe strip */}
        <div className="mt-14 rounded-3xl bg-brand/5 border border-brand/10 px-8 py-10 flex flex-col md:flex-row items-center gap-6 md:gap-10">
          <div className="flex-1 text-center md:text-left">
            <p className="font-display text-xl font-semibold text-navy mb-1">
              Recibí nuestros artículos en tu correo
            </p>
            <p className="text-muted text-sm">
              Una vez por semana, contenido relevante para tu bienestar. Sin spam.
            </p>
          </div>
          <Link
            href="/blog"
            className="flex-shrink-0 bg-brand text-white font-semibold px-7 py-3 rounded-full text-sm hover:bg-brand-dark transition-colors shadow-button"
          >
            Explorar el blog
          </Link>
        </div>

      </div>
    </section>
  )
}

// ─── Article card ─────────────────────────────────────────────────────────────

import type { Article } from '@/lib/articles'

function ArticleCard({ article, featured }: { article: Article; featured: boolean }) {
  const date = new Date(article.publishedAt).toLocaleDateString('es-AR', {
    day: 'numeric', month: 'long', year: 'numeric',
  })

  if (featured) {
    return (
      <Link
        href={`/blog/${article.slug}`}
        className="group md:col-span-1 bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-hover transition-shadow duration-300 flex flex-col"
      >
        <div className="relative h-52 bg-sage-pale flex-shrink-0 overflow-hidden">
          {article.coverImage ? (
            <Image
              src={article.coverImage}
              alt={article.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          ) : (
            <PlaceholderImage />
          )}
        </div>
        <div className="p-6 flex flex-col flex-1">
          <p className="text-xs text-muted mb-2">{date}</p>
          <h3 className="font-display text-lg font-semibold text-navy leading-snug mb-2 group-hover:text-brand transition-colors flex-1">
            {article.title}
          </h3>
          {article.excerpt && (
            <p className="text-muted text-sm line-clamp-2 mb-4">{article.excerpt}</p>
          )}
          <span className="inline-flex items-center gap-1 text-brand text-sm font-semibold">
            Leer artículo
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </Link>
    )
  }

  // Compact horizontal card
  return (
    <Link
      href={`/blog/${article.slug}`}
      className="group bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-hover transition-shadow duration-300 flex flex-col"
    >
      <div className="relative h-44 bg-sage-pale overflow-hidden">
        {article.coverImage ? (
          <Image
            src={article.coverImage}
            alt={article.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        ) : (
          <PlaceholderImage />
        )}
      </div>
      <div className="p-5 flex flex-col flex-1">
        <p className="text-xs text-muted mb-1.5">{date}</p>
        <h3 className="font-display text-base font-semibold text-navy leading-snug mb-2 group-hover:text-brand transition-colors flex-1">
          {article.title}
        </h3>
        <span className="inline-flex items-center gap-1 text-brand text-xs font-semibold mt-auto">
          Leer
          <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </span>
      </div>
    </Link>
  )
}

function PlaceholderImage() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <svg className="w-12 h-12 text-sage opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    </div>
  )
}

function PlaceholderCard({ tag, title, teaser }: { tag: string; title: string; teaser: string }) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-card opacity-50 select-none flex flex-col">
      <div className="h-44 bg-sage-pale flex items-center justify-center">
        <PlaceholderImage />
      </div>
      <div className="p-5 flex flex-col flex-1">
        <span className="inline-block bg-sage-pale text-brand text-[11px] font-semibold px-2.5 py-1 rounded-full mb-2 w-fit">
          {tag}
        </span>
        <p className="font-display text-sm font-semibold text-navy leading-snug mb-2">{title}</p>
        <p className="text-muted text-xs leading-relaxed">{teaser}</p>
      </div>
    </div>
  )
}
