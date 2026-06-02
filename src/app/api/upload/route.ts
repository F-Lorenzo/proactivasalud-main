import { NextRequest } from 'next/server'
import fs from 'fs'
import path from 'path'
import { randomUUID } from 'crypto'

export async function POST(request: NextRequest) {
  const formData = await request.formData()
  const file = formData.get('file') as File | null
  if (!file) return Response.json({ error: 'No file' }, { status: 400 })

  const buffer = Buffer.from(await file.arrayBuffer())
  const ext = file.name.split('.').pop()?.toLowerCase() ?? 'jpg'
  const allowed = ['jpg', 'jpeg', 'png', 'webp', 'gif', 'avif']
  if (!allowed.includes(ext)) {
    return Response.json({ error: 'Tipo de archivo no permitido' }, { status: 400 })
  }

  const uploadsDir = path.join(process.cwd(), 'public', 'uploads')
  if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true })

  const filename = `${randomUUID()}.${ext}`
  fs.writeFileSync(path.join(uploadsDir, filename), buffer)

  return Response.json({ url: `/uploads/${filename}` })
}
