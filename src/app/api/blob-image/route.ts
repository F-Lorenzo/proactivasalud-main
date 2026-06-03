import { NextRequest } from 'next/server'

const VERCEL_BLOB_HOSTNAMES = ['public.blob.vercel-storage.com', 'blob.vercel-storage.com']

export async function GET(request: NextRequest) {
  const rawUrl = request.nextUrl.searchParams.get('url')
  if (!rawUrl) return new Response('Missing url param', { status: 400 })

  let blobUrl: URL
  try {
    blobUrl = new URL(rawUrl)
  } catch {
    return new Response('Invalid URL', { status: 400 })
  }

  // Only proxy Vercel Blob URLs
  if (!VERCEL_BLOB_HOSTNAMES.some(h => blobUrl.hostname.endsWith(h))) {
    return new Response('URL not allowed', { status: 403 })
  }

  const token = process.env.BLOB_READ_WRITE_TOKEN
  const headers: HeadersInit = token
    ? { Authorization: `Bearer ${token}` }
    : {}

  const upstream = await fetch(rawUrl, { headers, cache: 'no-store' })
  if (!upstream.ok) {
    return new Response('Failed to fetch blob', { status: upstream.status })
  }

  const contentType = upstream.headers.get('Content-Type') ?? 'image/jpeg'
  return new Response(upstream.body, {
    headers: {
      'Content-Type': contentType,
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  })
}
