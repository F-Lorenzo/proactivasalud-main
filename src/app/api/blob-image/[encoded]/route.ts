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

  // Use the SDK so it resolves auth from env automatically (BLOB_READ_WRITE_TOKEN or OIDC)
  try {
    const { head } = await import('@vercel/blob')
    // head() verifies the blob exists and resolves auth — if this throws, we have an auth problem
    await head(blobUrl)

    // Fetch the blob directly; Vercel Blob private URLs accept Bearer auth
    const token = process.env.BLOB_READ_WRITE_TOKEN ?? ''
    const res = await fetch(blobUrl, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      cache: 'no-store',
    })

    if (!res.ok) {
      console.error('[blob-image] fetch status', res.status, blobUrl)
      return new Response('Blob fetch failed', { status: res.status })
    }

    return new Response(res.body, {
      headers: {
        'Content-Type': res.headers.get('Content-Type') ?? 'image/jpeg',
        'Cache-Control': 'public, max-age=3600',
      },
    })
  } catch (err) {
    console.error('[blob-image proxy] error:', String(err))
    return new Response(`Error: ${String(err)}`, { status: 500 })
  }
}
