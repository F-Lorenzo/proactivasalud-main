/** Shared CORS headers for the public, read-only articles API — safe to open
 * to any origin since it only ever exposes already-public blog content. */
export function withCors(response: Response): Response {
  response.headers.set('Access-Control-Allow-Origin', '*')
  response.headers.set('Access-Control-Allow-Methods', 'GET, OPTIONS')
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type')
  return response
}

export function corsPreflight(): Response {
  return withCors(new Response(null, { status: 204 }))
}
