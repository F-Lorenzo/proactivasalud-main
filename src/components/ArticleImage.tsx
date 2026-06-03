'use client'

/**
 * Drop-in replacement for next/image for article images served via
 * the /api/blob-image proxy. Uses unoptimized=true so the browser
 * fetches directly from the proxy route (which handles OIDC auth)
 * instead of routing through /_next/image which lacks Vercel request context.
 */

import NextImage, { type ImageProps } from 'next/image'

export function ArticleImage(props: ImageProps) {
  return <NextImage {...props} unoptimized />
}
