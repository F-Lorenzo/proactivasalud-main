import { NextRequest, NextResponse } from 'next/server'

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

  try {
    const { getDownloadUrl } = await import('@vercel/blob')
    const { url: signedUrl } = await getDownloadUrl(blobUrl)
    // Redirect to the signed URL — browser fetches image directly from Vercel Blob CDN
    return NextResponse.redirect(signedUrl, { status: 302 })
  } catch (err) {
    console.error('[blob-image proxy] getDownloadUrl failed:', err)
    return new Response('Error fetching image', { status: 500 })
  }
}
