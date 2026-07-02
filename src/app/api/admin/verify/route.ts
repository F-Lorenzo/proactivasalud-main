import { NextRequest } from 'next/server'
import { requireAdminAuth } from '@/lib/adminAuth'

export async function POST(request: NextRequest) {
  const authError = requireAdminAuth(request)
  if (authError) return authError
  return Response.json({ ok: true })
}
