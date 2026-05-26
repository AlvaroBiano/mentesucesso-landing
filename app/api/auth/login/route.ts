import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'
import { signToken } from '@/lib/auth'

export async function POST(req: NextRequest) {
  try {
    const { email, password }: { email: string; password: string; deviceHash: string } = await req.json()

    if (!email || !password) {
      return NextResponse.json({ ok: false, error: 'Email e senha são obrigatórios' }, { status: 400 })
    }

    const profile = await prisma.profile.findUnique({ where: { email } })
    if (!profile) {
      return NextResponse.json({ ok: false, error: 'Email ou senha incorretos' }, { status: 401 })
    }

    const valid = await bcrypt.compare(password, profile.passwordHash)
    if (!valid) {
      return NextResponse.json({ ok: false, error: 'Email ou senha incorretos' }, { status: 401 })
    }

    const token = await signToken({
      id: profile.id,
      email: profile.email,
      role: (profile.role as 'student' | 'affiliate' | 'admin')
    })

    const cookieValue = `tenportal_token=${token}; Path=/; Expires=${new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toUTCString()}; Secure; HttpOnly; SameSite=Lax`
    const response = NextResponse.json({
      ok: true,
      data: { user: { id: profile.id, email: profile.email, fullName: profile.fullName, role: profile.role } }
    })
    response.headers.set('Set-Cookie', cookieValue)
    return response
  } catch (e) {
    console.error('[LOGIN ERROR]', e)
    return NextResponse.json({ ok: false, error: 'Erro ao fazer login' }, { status: 500 })
  }
}