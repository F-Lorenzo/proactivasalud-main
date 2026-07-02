import { NextRequest } from 'next/server'

const VERCEL_BLOB_PATTERN = /\.blob\.vercel-storage\.com$/

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ encoded: string }> }
) {
  const { encoded } = await params

  let blobUrl: string
  try {
    blobUrl = Buffer.from(encoded, 'base64url').toString('utf-8')
  } catch {
    return new Response('Invalid encoded URL', { status: 400 })
  }

  let parsed: URL
  try {
    parsed = new URL(blobUrl)
  } catch {
    return new Response('Invalid URL', { status: 400 })
  }
  if (!VERCEL_BLOB_PATTERN.test(parsed.hostname)) {
    return new Response('URL not allowed', { status: 403 })
  }

  const token = process.env.BLOB_READ_WRITE_TOKEN
  if (!token) {
    return new Response('Missing blob token', { status: 500 })
  }

  try {
    const res = await fetch(blobUrl, {
      headers: { Authorization: `Bearer ${token}` },
      cache: 'no-store',
    })
    if (!res.ok) return new Response('Blob fetch failed', { status: res.status })

    return new Response(res.body, {
      headers: {
        'Content-Type': res.headers.get('Content-Type') ?? 'image/jpeg',
        'Cache-Control': 'public, max-age=3600',
      },
    })
  } catch (err) {
    console.error('[blob-image proxy]', err)
    return new Response('Error fetching image', { status: 500 })
  }
}
