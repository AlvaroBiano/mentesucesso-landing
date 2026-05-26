import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.AUTH_SECRET || process.env.JWT_SECRET || 'dev-secret-replace-in-production'

const PROTECTED = ['/admin', '/aluno', '/afiliado']
const ADMIN_ONLY = ['/admin']

function verifyToken(token: string) {
  try {
    return jwt.verify(token, JWT_SECRET) as { id: string; email: string; role: string }
  } catch { return null }
}

export function middleware(req: NextRequest) {
  const token = req.cookies.get('tenportal_token')?.value
  const path = req.nextUrl.pathname

  if (PROTECTED.some(p => path.startsWith(p))) {
    if (!token) {
      return NextResponse.redirect(new URL('/login', req.url))
    }
    if (ADMIN_ONLY.some(p => path.startsWith(p))) {
      const user = verifyToken(token)
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