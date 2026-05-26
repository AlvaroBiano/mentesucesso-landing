import { NextRequest, NextResponse } from 'next/server'

const PROTECTED = ['/admin', '/aluno', '/afiliado']

export function middleware(req: NextRequest) {
  const token = req.cookies.get('tenportal_token')?.value
  const path = req.nextUrl.pathname

  if (PROTECTED.some(p => path.startsWith(p)) && !token) {
    const loginUrl = new URL('/login', req.url)
    loginUrl.searchParams.set('redirect', path)
    return NextResponse.redirect(loginUrl)
  }
  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/aluno/:path*', '/afiliado/:path*']
}