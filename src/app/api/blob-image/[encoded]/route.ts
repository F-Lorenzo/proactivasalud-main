import { NextRequest } from 'next/server'

const VERCEL_BLOB_PATTERN = /\.blob\.vercel-storage\.com$/

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ encoded: string }> }
) {
  const { encoded } = await params

  // Decode base64url → original blob URL
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

  // Extract the pathname (e.g. "blog/images/uuid.jpg")
  const blobPathname = parsed.pathname.slice(1)

  try {
    const { issueSignedToken, presignUrl } = await import('@vercel/blob')

    // Issue a short-lived signed token via the Vercel Blob API (OIDC auth)
    const signed = await issueSignedToken({
      operations: ['get'],
      pathname: blobPathname,
      validUntil: Date.now() + 300_000, // 5 minutes
    })

    // Build presigned URL — signature embedded, no auth header needed
    const { presignedUrl } = await presignUrl(signed, {
      operation: 'get',
      pathname: blobPathname,
      access: 'private',
    })

    const res = await fetch(presignedUrl, { cache: 'no-store' })
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
