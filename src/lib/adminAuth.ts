import { NextRequest } from 'next/server'

// Server-side only — never use NEXT_PUBLIC_ for this
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? 'proactiva2025'

export function requireAdminAuth(request: NextRequest): Response | null {
  const auth = request.headers.get('x-admin-password')
  if (!auth || auth !== ADMIN_PASSWORD) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }
  return null
}
