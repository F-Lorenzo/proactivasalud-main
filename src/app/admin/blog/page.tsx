'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Image from 'next/image'
import type { Article, Block } from '@/lib/articles'

const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD ?? 'proactiva2025'

// ─── Helpers ──────────────────────────────────────────────────────────────────

function newParagraph(): Block {
  return { id: Math.random().toString(36).slice(2), type: 'paragraph', content: '' }
}

function newImage(): Block {
  return { id: Math.random().toString(36).slice(2), type: 'image', src: '', caption: '' }
}

function emptyDraft(): Omit<Article, 'id' | 'slug'> {
  return {
    title: '',
    excerpt: '',
    coverImage: '',
    publishedAt: new Date().toISOString().slice(0, 10),
    blocks: [newParagraph()],
  }
}

// ─── Image Upload ──────────────────────────────────────────────────────────────

async function uploadImage(file: File): Promise<string> {
  const fd = new FormData()
  fd.append('file', file)
  const res = await fetch('/api/upload', { method: 'POST', body: fd })
  if (!res.ok) throw new Error('Error al subir imagen')
  const data = await res.json() as { url: string }
  return data.url
}

// ─── Types ────────────────────────────────────────────────────────────────────

type Draft = Omit<Article, 'id' | 'slug'> & { id?: string; slug?: string }

// ─── Main component ───────────────────────────────────────────────────────────

export default function AdminBlogPage() {
  const [authed, setAuthed] = useState(false)
  const [pwInput, setPwInput] = useState('')
  const [pwError, setPwError] = useState(false)

  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [saveMsg, setSaveMsg] = useState('')

  const [draft, setDraft] = useState<Draft>(emptyDraft())
  const [editing, setEditing] = useState<string | null>(null) // article id or null = new

  const coverInputRef = useRef<HTMLInputElement>(null)

  // ── Auth ──
  function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    if (pwInput === ADMIN_PASSWORD) {
      setAuthed(true)
      loadArticles()
    } else {
      setPwError(true)
    }
  }

  // ── Load ──
  const loadArticles = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/articles')
      const data = await res.json() as Article[]
      setArticles(data)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (authed) loadArticles()
  }, [authed, loadArticles])

  // ── Select article to edit ──
  function selectArticle(article: Article) {
    setEditing(article.id)
    setDraft({ ...article })
    setSaveMsg('')
  }

  function newDraft() {
    setEditing(null)
    setDraft(emptyDraft())
    setSaveMsg('')
  }

  // ── Draft field helpers ──
  function setField<K extends keyof Draft>(key: K, value: Draft[K]) {
    setDraft(d => ({ ...d, [key]: value }))
  }

  // ── Blocks ──
  function updateBlock(id: string, patch: Partial<Block>) {
    setDraft(d => ({
      ...d,
      blocks: d.blocks.map(b => b.id === id ? { ...b, ...patch } : b),
    }))
  }

  function addBlock(type: 'paragraph' | 'image', afterId?: string) {
    const block = type === 'paragraph' ? newParagraph() : newImage()
    setDraft(d => {
      if (!afterId) return { ...d, blocks: [...d.blocks, block] }
      const idx = d.blocks.findIndex(b => b.id === afterId)
      const next = [...d.blocks]
      next.splice(idx + 1, 0, block)
      return { ...d, blocks: next }
    })
  }

  function removeBlock(id: string) {
    setDraft(d => ({ ...d, blocks: d.blocks.filter(b => b.id !== id) }))
  }

  function moveBlock(id: string, dir: -1 | 1) {
    setDraft(d => {
      const arr = [...d.blocks]
      const idx = arr.findIndex(b => b.id === id)
      const target = idx + dir
      if (target < 0 || target >= arr.length) return d
      ;[arr[idx], arr[target]] = [arr[target], arr[idx]]
      return { ...d, blocks: arr }
    })
  }

  // ── Image upload for block ──
  async function handleBlockImageUpload(blockId: string, file: File) {
    try {
      const url = await uploadImage(file)
      updateBlock(blockId, { src: url })
    } catch {
      alert('Error al subir la imagen')
    }
  }

  // ── Cover upload ──
  async function handleCoverUpload(file: File) {
    try {
      const url = await uploadImage(file)
      setField('coverImage', url)
    } catch {
      alert('Error al subir la imagen')
    }
  }

  // ── Save ──
  async function handleSave() {
    if (!draft.title.trim()) { alert('El artículo necesita un título'); return }
    setSaving(true)
    setSaveMsg('')
    try {
      let res: Response
      if (editing) {
        res = await fetch(`/api/articles/${editing}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(draft),
        })
      } else {
        res = await fetch('/api/articles', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(draft),
        })
      }
      if (!res.ok) throw new Error('Error al guardar')
      const saved = await res.json() as Article
      setSaveMsg('¡Guardado!')
      setEditing(saved.id)
      setDraft(saved)
      await loadArticles()
      setTimeout(() => setSaveMsg(''), 3000)
    } catch {
      alert('Error al guardar el artículo')
    } finally {
      setSaving(false)
    }
  }

  // ── Delete ──
  async function handleDelete(id: string) {
    if (!confirm('¿Eliminar este artículo? Esta acción no se puede deshacer.')) return
    await fetch(`/api/articles/${id}`, { method: 'DELETE' })
    if (editing === id) newDraft()
    await loadArticles()
  }

  // ─── Login screen ─────────────────────────────────────────────────────────
  if (!authed) {
    return (
      <div className="min-h-screen bg-ivory flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-elevated p-10 w-full max-w-sm">
          <div className="text-center mb-8">
            <div className="w-12 h-12 bg-brand rounded-2xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h1 className="font-display text-2xl font-bold text-navy">Admin Blog</h1>
            <p className="text-muted text-sm mt-1">Proactiva Salud</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-navy mb-1">Contraseña</label>
              <input
                type="password"
                value={pwInput}
                onChange={e => { setPwInput(e.target.value); setPwError(false) }}
                className={`w-full border rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition ${pwError ? 'border-red-400' : 'border-gray-200'}`}
                placeholder="••••••••"
                autoFocus
              />
              {pwError && <p className="text-red-500 text-xs mt-1">Contraseña incorrecta</p>}
            </div>
            <button
              type="submit"
              className="w-full bg-brand text-white font-semibold py-3 rounded-xl hover:bg-brand-dark transition-colors"
            >
              Ingresar
            </button>
          </form>
        </div>
      </div>
    )
  }

  // ─── Admin UI ─────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-ivory flex flex-col">
      {/* Top bar */}
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-40 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-brand rounded-lg flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </div>
          <span className="font-display font-bold text-navy text-lg">Admin Blog</span>
          <span className="text-muted text-sm">— Proactiva Salud</span>
        </div>
        <a href="/blog" target="_blank" className="text-brand text-sm font-semibold hover:opacity-80 transition-opacity flex items-center gap-1">
          Ver blog
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* ── Sidebar: article list ── */}
        <aside className="w-72 bg-white border-r border-gray-200 flex flex-col">
          <div className="p-4 border-b border-gray-100">
            <button
              onClick={newDraft}
              className="w-full bg-brand text-white text-sm font-semibold py-2.5 rounded-xl hover:bg-brand-dark transition-colors flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Nuevo artículo
            </button>
          </div>

          <div className="flex-1 overflow-y-auto">
            {loading ? (
              <div className="p-6 text-center text-muted text-sm">Cargando...</div>
            ) : articles.length === 0 ? (
              <div className="p-6 text-center text-muted text-sm">Sin artículos aún</div>
            ) : (
              articles.map(a => (
                <div
                  key={a.id}
                  onClick={() => selectArticle(a)}
                  className={`px-4 py-3 cursor-pointer border-b border-gray-50 hover:bg-ivory transition-colors group ${editing === a.id ? 'bg-sage-pale border-l-4 border-l-brand' : ''}`}
                >
                  <p className={`text-sm font-semibold leading-snug ${editing === a.id ? 'text-brand' : 'text-navy'}`}>
                    {a.title || 'Sin título'}
                  </p>
                  <div className="flex items-center justify-between mt-1">
                    <p className="text-xs text-muted">
                      {new Date(a.publishedAt).toLocaleDateString('es-AR', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </p>
                    <button
                      onClick={e => { e.stopPropagation(); handleDelete(a.id) }}
                      className="opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-600 transition-all p-1 rounded"
                      title="Eliminar"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </aside>

        {/* ── Editor ── */}
        <main className="flex-1 overflow-y-auto p-8">
          <div className="max-w-2xl mx-auto space-y-6">

            {/* Title */}
            <div>
              <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-1.5">Título del artículo</label>
              <input
                type="text"
                value={draft.title}
                onChange={e => setField('title', e.target.value)}
                placeholder="Escribe un título atractivo..."
                className="w-full border border-gray-200 rounded-xl px-4 py-3 font-display text-xl font-semibold text-navy placeholder-gray-300 outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition"
              />
            </div>

            {/* Excerpt */}
            <div>
              <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-1.5">Resumen / Bajada</label>
              <textarea
                value={draft.excerpt}
                onChange={e => setField('excerpt', e.target.value)}
                placeholder="Un párrafo corto que describe el artículo..."
                rows={2}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-navy placeholder-gray-300 outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition resize-none"
              />
            </div>

            {/* Date */}
            <div>
              <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-1.5">Fecha de publicación</label>
              <input
                type="date"
                value={draft.publishedAt}
                onChange={e => setField('publishedAt', e.target.value)}
                className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-navy outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition"
              />
            </div>

            {/* Cover image */}
            <div>
              <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-1.5">Imagen principal</label>
              <input ref={coverInputRef} type="file" accept="image/*" className="hidden" onChange={e => {
                const f = e.target.files?.[0]
                if (f) handleCoverUpload(f)
              }} />
              {draft.coverImage ? (
                <div className="relative rounded-2xl overflow-hidden" style={{ aspectRatio: '16/7' }}>
                  <Image src={draft.coverImage} alt="Portada" fill className="object-cover" sizes="672px" />
                  <button
                    onClick={() => setField('coverImage', '')}
                    className="absolute top-3 right-3 bg-white/90 text-red-500 rounded-full p-1.5 hover:bg-white shadow-sm transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => coverInputRef.current?.click()}
                  className="w-full border-2 border-dashed border-gray-200 rounded-2xl py-10 flex flex-col items-center gap-2 text-muted hover:border-brand hover:text-brand transition-colors"
                >
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="text-sm font-medium">Subir imagen principal</span>
                  <span className="text-xs">JPG, PNG, WebP</span>
                </button>
              )}
            </div>

            {/* Divider */}
            <div className="border-t border-gray-100 pt-2">
              <p className="text-xs font-semibold text-muted uppercase tracking-wider">Contenido del artículo</p>
            </div>

            {/* Content blocks */}
            <div className="space-y-4">
              {draft.blocks.map((block, idx) => (
                <BlockEditor
                  key={block.id}
                  block={block}
                  isFirst={idx === 0}
                  isLast={idx === draft.blocks.length - 1}
                  onUpdate={patch => updateBlock(block.id, patch)}
                  onRemove={() => removeBlock(block.id)}
                  onMove={dir => moveBlock(block.id, dir)}
                  onAddAfter={type => addBlock(type, block.id)}
                  onImageUpload={file => handleBlockImageUpload(block.id, file)}
                />
              ))}
            </div>

            {/* Add block buttons */}
            <div className="flex gap-3">
              <button
                onClick={() => addBlock('paragraph')}
                className="flex-1 flex items-center justify-center gap-2 border-2 border-dashed border-gray-200 rounded-xl py-3 text-sm text-muted font-medium hover:border-brand hover:text-brand transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Párrafo
              </button>
              <button
                onClick={() => addBlock('image')}
                className="flex-1 flex items-center justify-center gap-2 border-2 border-dashed border-gray-200 rounded-xl py-3 text-sm text-muted font-medium hover:border-brand hover:text-brand transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Imagen
              </button>
            </div>

            {/* Save */}
            <div className="flex items-center gap-4 pt-2 pb-12">
              <button
                onClick={handleSave}
                disabled={saving}
                className="bg-brand text-white font-semibold px-8 py-3 rounded-xl hover:bg-brand-dark transition-colors disabled:opacity-60 shadow-button"
              >
                {saving ? 'Guardando...' : editing ? 'Guardar cambios' : 'Publicar artículo'}
              </button>
              {saveMsg && (
                <span className="text-brand font-semibold text-sm flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                  {saveMsg}
                </span>
              )}
              {editing && (
                <a
                  href={`/blog/${draft.slug}`}
                  target="_blank"
                  className="text-muted text-sm hover:text-brand transition-colors flex items-center gap-1"
                >
                  Ver artículo
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

// ─── Block Editor Component ───────────────────────────────────────────────────

interface BlockEditorProps {
  block: Block
  isFirst: boolean
  isLast: boolean
  onUpdate: (patch: Partial<Block>) => void
  onRemove: () => void
  onMove: (dir: -1 | 1) => void
  onAddAfter: (type: 'paragraph' | 'image') => void
  onImageUpload: (file: File) => void
}

function BlockEditor({ block, isFirst, isLast, onUpdate, onRemove, onMove, onAddAfter, onImageUpload }: BlockEditorProps) {
  const fileRef = useRef<HTMLInputElement>(null)

  return (
    <div className="group relative bg-white border border-gray-200 rounded-2xl overflow-hidden hover:border-gray-300 transition-colors">
      {/* Block toolbar */}
      <div className="flex items-center justify-between px-4 py-2 bg-gray-50 border-b border-gray-100">
        <span className="text-xs font-semibold text-muted uppercase tracking-wider">
          {block.type === 'paragraph' ? 'Párrafo' : 'Imagen'}
        </span>
        <div className="flex items-center gap-1">
          <button
            onClick={() => onMove(-1)}
            disabled={isFirst}
            className="p-1.5 text-muted hover:text-navy disabled:opacity-30 transition-colors rounded"
            title="Subir"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            </svg>
          </button>
          <button
            onClick={() => onMove(1)}
            disabled={isLast}
            className="p-1.5 text-muted hover:text-navy disabled:opacity-30 transition-colors rounded"
            title="Bajar"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <button
            onClick={onRemove}
            className="p-1.5 text-muted hover:text-red-500 transition-colors rounded"
            title="Eliminar bloque"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      {/* Block content */}
      <div className="p-4">
        {block.type === 'paragraph' ? (
          <textarea
            value={block.content ?? ''}
            onChange={e => onUpdate({ content: e.target.value })}
            placeholder="Escribe el contenido del párrafo..."
            rows={4}
            className="w-full text-sm text-navy leading-relaxed placeholder-gray-300 outline-none resize-none"
          />
        ) : (
          <div className="space-y-3">
            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={e => {
              const f = e.target.files?.[0]
              if (f) onImageUpload(f)
            }} />
            {block.src ? (
              <div className="relative rounded-xl overflow-hidden bg-gray-50" style={{ aspectRatio: '16/9' }}>
                <Image src={block.src} alt={block.caption ?? ''} fill className="object-cover" sizes="600px" />
                <button
                  onClick={() => onUpdate({ src: '' })}
                  className="absolute top-2 right-2 bg-white/90 text-red-500 rounded-full p-1.5 hover:bg-white shadow-sm"
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ) : (
              <button
                onClick={() => fileRef.current?.click()}
                className="w-full border-2 border-dashed border-gray-200 rounded-xl py-8 flex flex-col items-center gap-2 text-muted hover:border-brand hover:text-brand transition-colors"
              >
                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="text-sm font-medium">Subir imagen</span>
              </button>
            )}
            <input
              type="text"
              value={block.caption ?? ''}
              onChange={e => onUpdate({ caption: e.target.value })}
              placeholder="Descripción de la imagen (opcional)"
              className="w-full text-xs text-muted border border-gray-100 rounded-lg px-3 py-2 outline-none focus:border-brand/50 transition"
            />
          </div>
        )}
      </div>

      {/* Add below */}
      <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -bottom-3.5 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
        <button
          onClick={() => onAddAfter('paragraph')}
          className="bg-white border border-gray-200 shadow-sm text-xs text-navy font-medium px-3 py-1 rounded-full hover:bg-sage-pale hover:border-brand transition-colors"
        >
          + Párrafo
        </button>
        <button
          onClick={() => onAddAfter('image')}
          className="bg-white border border-gray-200 shadow-sm text-xs text-navy font-medium px-3 py-1 rounded-full hover:bg-sage-pale hover:border-brand transition-colors"
        >
          + Imagen
        </button>
      </div>
    </div>
  )
}
