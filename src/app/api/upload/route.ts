import { NextRequest } from 'next/server'
import fs from 'fs'
import path from 'path'
import { randomUUID } from 'crypto'

const IS_VERCEL = process.env.VERCEL === '1'
const ALLOWED = ['jpg', 'jpeg', 'png', 'webp', 'gif', 'avif']

export async function POST(request: NextRequest) {
  const formData = await request.formData()
  const file = formData.get('file') as File | null
  if (!file) return Response.json({ error: 'No file' }, { status: 400 })

  const ext = file.name.split('.').pop()?.toLowerCase() ?? 'jpg'
  if (!ALLOWED.includes(ext)) {
    return Response.json({ error: 'Tipo de archivo no permitido' }, { status: 400 })
  }

  if (IS_VERCEL) {
    const { put } = await import('@vercel/blob')
    const blobPath = `blog/images/${randomUUID()}.${ext}`
    const blob = await put(blobPath, file, {
      access: 'private',
      addRandomSuffix: false,
    })

    // Encode full blob URL as base64url → no special chars → next/image won't double-encode
    const encoded = Buffer.from(blob.url).toString('base64url')
    return Response.json({ url: `/api/blob-image/${encoded}` })
  }

  // Local dev: save to public/uploads/
  const buffer = Buffer.from(await file.arrayBuffer())
  const uploadsDir = path.join(process.cwd(), 'public', 'uploads')
  if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true })
  const filename = `${randomUUID()}.${ext}`
  fs.writeFileSync(path.join(uploadsDir, filename), buffer)
  return Response.json({ url: `/uploads/${filename}` })
}
