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

  // blobPathname: e.g. "blog/images/uuid.png"
  const blobPathname = parsed.pathname.slice(1)

  try {
    const { issueSignedToken, presignUrl } = await import('@vercel/blob')

    const signedToken = await issueSignedToken({
      operations: ['get'],
      pathname: blobPathname,
      validUntil: Date.now() + 300_000, // 5 min
    })

    const { presignedUrl } = await presignUrl(signedToken, {
      operation: 'get',
      pathname: blobPathname,
      access: 'private',
    })

    const res = await fetch(presignedUrl, { cache: 'no-store' })
    if (!res.ok) {
      console.error('[blob-image] presigned fetch status', res.status)
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
