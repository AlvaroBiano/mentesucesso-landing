import { NextRequest, NextResponse } from 'next/server'
import { verifyToken } from './lib/auth'

const PROTECTED = ['/admin', '/aluno', '/afiliado']
const ADMIN_ONLY = ['/admin']

export function middleware(req: NextRequest) {
  const token = req.cookies.get('tenportal_token')?.value
  const path = req.nextUrl.pathname

  if (PROTECTED.some(p => path.startsWith(p))) {
    if (!token) {
      return NextResponse.redirect(new URL('/login', req.url))
    }
    if (ADMIN_ONLY.some(p => path.startsWith(p))) {
      const user = token ? verifyToken(token) : null
      if (!user || user.role !== 'admin') {
        return NextResponse.redirect(new URL('/login', req.url))
      }
    }
  }
  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/aluno/:path*', '/afiliado/:path*']
}