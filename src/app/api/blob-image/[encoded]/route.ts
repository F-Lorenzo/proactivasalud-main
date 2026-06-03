import { NextRequest } from 'next/server'

const VERCEL_BLOB_PATTERN = /\.blob\.vercel-storage\.com$/

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ encoded: string }> }
) {
  const { encoded } = await params

  // Decode base64url → original blob URL (no special chars = no double-encoding by next/image)
  let blobUrl: string
  try {
    blobUrl = Buffer.from(encoded, 'base64url').toString('utf-8')
  } catch {
    return new Response('Invalid encoded URL', { status: 400 })
  }

  // Validate it's a Vercel Blob URL
  let parsed: URL
  try {
    parsed = new URL(blobUrl)
  } catch {
    return new Response('Invalid URL', { status: 400 })
  }
  if (!VERCEL_BLOB_PATTERN.test(parsed.hostname)) {
    return new Response('URL not allowed', { status: 403 })
  }

  try {
    // Use @vercel/blob SDK's get() — it handles OIDC auth automatically in production
    const { get } = await import('@vercel/blob')
    const result = await get(blobUrl, { access: 'private' })

    if (!result) {
      return new Response('Blob not found', { status: 404 })
    }

    const contentType = result.blob.contentType ?? 'image/jpeg'

    // Stream blob content back to client
    if (result.stream) {
      return new Response(result.stream as unknown as ReadableStream, {
        headers: {
          'Content-Type': contentType,
          'Cache-Control': 'public, max-age=31536000, immutable',
        },
      })
    }

    return new Response('No content', { status: 204 })
  } catch (err) {
    // Fallback: try with explicit token header if SDK auth fails
    const token = process.env.BLOB_READ_WRITE_TOKEN
    if (token) {
      const res = await fetch(blobUrl, {
        headers: { Authorization: `Bearer ${token}` },
        cache: 'no-store',
      })
      if (!res.ok) return new Response('Blob fetch failed', { status: res.status })
      return new Response(res.body, {
        headers: {
          'Content-Type': res.headers.get('Content-Type') ?? 'image/jpeg',
          'Cache-Control': 'public, max-age=31536000, immutable',
        },
      })
    }
    console.error('blob-image proxy error:', err)
    return new Response('Error fetching image', { status: 500 })
  }
}
