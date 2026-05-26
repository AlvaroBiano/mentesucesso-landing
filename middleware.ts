import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.AUTH_SECRET || 'a8f3e9b2c7d1f0a4e6b8c3d9e2f1a5b7c4e8d2f6a1b3c7e9d0f2a4b6c8e0d2f4'

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