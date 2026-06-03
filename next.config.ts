import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    // Allow local proxy routes (e.g. /api/blob-image?url=... and /api/blob-image/<b64>)
    localPatterns: [
      {
        pathname: '/api/blob-image/**',
        search: '*',
      },
      {
        pathname: '/api/blob-image',
        search: '*',
      },
      {
        pathname: '/uploads/**',
      },
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'flagcdn.com',
      },
      {
        protocol: 'https',
        hostname: '*.public.blob.vercel-storage.com',
      },
      {
        protocol: 'https',
        hostname: '*.blob.vercel-storage.com',
      },
    ],
  },
}

export default nextConfig
