import { NextResponse, type NextRequest } from 'next/server'

// Passthrough middleware: exposes the request path as a header so the
// root layout can set <html lang> correctly per locale. No redirects
// or rewrites — routing behaviour is unchanged.
export function middleware(request: NextRequest) {
  const headers = new Headers(request.headers)
  headers.set('x-pathname', request.nextUrl.pathname)
  return NextResponse.next({ request: { headers } })
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)'],
}
