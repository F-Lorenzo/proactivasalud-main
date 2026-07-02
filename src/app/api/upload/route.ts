import { NextRequest } from 'next/server'
import { requireAdminAuth } from '@/lib/adminAuth'
import { sniffImageType, extensionMatches } from '@/lib/imageSniff'
import fs from 'fs'
import path from 'path'
import { randomUUID } from 'crypto'

const IS_VERCEL = process.env.VERCEL === '1'
const ALLOWED = ['jpg', 'jpeg', 'png', 'webp', 'gif', 'avif']
const ALLOWED_MIME = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/avif']

// Vercel serverless functions reject request bodies above ~4.5MB at the
// platform level (413), before our code ever runs. Files under this size go
// through this route as FormData (server reads + validates the real bytes);
// larger files use the client-direct-upload flow below, which never sends
// the file through this function at all.
const SMALL_UPLOAD_MAX_BYTES = 4 * 1024 * 1024
const LARGE_UPLOAD_MAX_BYTES = 15 * 1024 * 1024

export async function POST(request: NextRequest) {
  const contentType = request.headers.get('content-type') ?? ''

  // ── Large files: client uploads directly to Vercel Blob. This route only
  // issues a short-lived, scoped token — the file bytes never pass through
  // our serverless function, so we can't sniff them here; Vercel Blob still
  // enforces allowedContentTypes/maximumSizeInBytes at the storage layer. ──
  if (!contentType.includes('multipart/form-data')) {
    if (!IS_VERCEL) {
      return Response.json({ error: 'La subida de archivos grandes solo está disponible en producción' }, { status: 400 })
    }

    const body = await request.json()

    // Only the token-issuance event needs our own auth — the upload-completed
    // callback is a server-to-server call from Vercel Blob, verified internally
    // by the SDK, and never carries our x-admin-password header.
    if (body?.type === 'blob.generate-client-token') {
      const authError = requireAdminAuth(request)
      if (authError) return authError
    }

    try {
      const { handleUpload } = await import('@vercel/blob/client')
      const jsonResponse = await handleUpload({
        body,
        request,
        onBeforeGenerateToken: async (pathname) => {
          if (!pathname.startsWith('blog/images/')) {
            throw new Error('Invalid upload path')
          }
          return {
            allowedContentTypes: ALLOWED_MIME,
            maximumSizeInBytes: LARGE_UPLOAD_MAX_BYTES,
            addRandomSuffix: false,
          }
        },
      })
      return Response.json(jsonResponse)
    } catch (err) {
      console.error('[upload] client-token flow error:', String(err))
      return Response.json({ error: 'Error al subir la imagen' }, { status: 400 })
    }
  }

  // ── Small files: classic upload through this function, bytes verified server-side ──
  const authError = requireAdminAuth(request)
  if (authError) return authError

  const formData = await request.formData()
  const file = formData.get('file') as File | null
  if (!file) return Response.json({ error: 'No file' }, { status: 400 })

  if (file.size > SMALL_UPLOAD_MAX_BYTES) {
    return Response.json({ error: 'El archivo supera el límite de 4 MB para este método' }, { status: 400 })
  }

  const declaredExt = file.name.split('.').pop()?.toLowerCase() ?? ''
  if (!ALLOWED.includes(declaredExt)) {
    return Response.json({ error: 'Tipo de archivo no permitido' }, { status: 400 })
  }

  // Verify the actual file bytes, not just the filename extension
  const buffer = Buffer.from(await file.arrayBuffer())
  const sniffed = sniffImageType(buffer)
  if (!sniffed || !extensionMatches(declaredExt, sniffed)) {
    return Response.json({ error: 'El contenido del archivo no coincide con una imagen válida' }, { status: 400 })
  }
  const ext = sniffed === 'jpg' ? 'jpg' : sniffed

  if (IS_VERCEL) {
    const { put } = await import('@vercel/blob')
    const blobPath = `blog/images/${randomUUID()}.${ext}`
    const blob = await put(blobPath, buffer, {
      access: 'private',
      addRandomSuffix: false,
    })
    const encoded = Buffer.from(blob.url).toString('base64url')
    return Response.json({ url: `/api/blob-image/${encoded}` })
  }

  // Local dev: save to public/uploads/
  const uploadsDir = path.join(process.cwd(), 'public', 'uploads')
  if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true })
  const filename = `${randomUUID()}.${ext}`
  fs.writeFileSync(path.join(uploadsDir, filename), buffer)
  return Response.json({ url: `/uploads/${filename}` })
}
