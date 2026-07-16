import { NextRequest } from 'next/server'
import { timingSafeEqual } from 'crypto'

// Server-side only — never use NEXT_PUBLIC_ for this.
// No fallback: if ADMIN_PASSWORD isn't configured, auth fails closed.
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD

function safeCompare(a: string, b: string): boolean {
  const bufA = Buffer.from(a)
  const bufB = Buffer.from(b)
  if (bufA.length !== bufB.length) return false
  return timingSafeEqual(bufA, bufB)
}

// In-memory sliding-window rate limit — best-effort per serverless instance.
// Not a substitute for an edge/WAF-level limiter, but stops naive brute force.
// Only WRONG-password attempts count against the limit (recorded below on
// failure) — requireAdminAuth runs on every authenticated write call, so
// counting successes too would lock an active admin out of their own panel
// after ~10 legitimate actions (e.g. a handful of image uploads) in a minute.
const attempts = new Map<string, number[]>()
const WINDOW_MS = 60_000
const MAX_ATTEMPTS = 10

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const timestamps = (attempts.get(ip) ?? []).filter(t => now - t < WINDOW_MS)
  attempts.set(ip, timestamps)
  return timestamps.length >= MAX_ATTEMPTS
}

function recordFailedAttempt(ip: string): void {
  const now = Date.now()
  const timestamps = (attempts.get(ip) ?? []).filter(t => now - t < WINDOW_MS)
  timestamps.push(now)
  attempts.set(ip, timestamps)
}

export function requireAdminAuth(request: NextRequest): Response | null {
  if (!ADMIN_PASSWORD) {
    console.error('[adminAuth] ADMIN_PASSWORD is not set — refusing all admin requests')
    return Response.json({ error: 'Server misconfigured' }, { status: 500 })
  }

  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown'
  if (isRateLimited(ip)) {
    return Response.json({ error: 'Too many attempts' }, { status: 429 })
  }

  const auth = request.headers.get('x-admin-password')
  if (!auth || !safeCompare(auth, ADMIN_PASSWORD)) {
    recordFailedAttempt(ip)
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }
  return null
}
