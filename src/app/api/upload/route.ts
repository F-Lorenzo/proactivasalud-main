import { NextRequest } from 'next/server'
import { requireAdminAuth } from '@/lib/adminAuth'
import { sniffImageType, extensionMatches } from '@/lib/imageSniff'
import fs from 'fs'
import path from 'path'
import { randomUUID } from 'crypto'

const IS_VERCEL = process.env.VERCEL === '1'
const ALLOWED = ['jpg', 'jpeg', 'png', 'webp', 'gif', 'avif']
const MAX_SIZE_BYTES = 8 * 1024 * 1024 // 8 MB

export async function POST(request: NextRequest) {
  const authError = requireAdminAuth(request)
  if (authError) return authError

  const formData = await request.formData()
  const file = formData.get('file') as File | null
  if (!file) return Response.json({ error: 'No file' }, { status: 400 })

  if (file.size > MAX_SIZE_BYTES) {
    return Response.json({ error: 'El archivo supera el límite de 8 MB' }, { status: 400 })
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
