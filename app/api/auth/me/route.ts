import { NextRequest } from 'next/server'
import { verifyToken } from '@/lib/auth'
import { success, unauthorized } from '@/lib/api-response'

export async function GET(req: NextRequest) {
  const token = req.cookies.get('tenportal_token')?.value
  if (!token) return unauthorized('Não autenticado')
  const user = verifyToken(token)
  if (!user) return unauthorized('Token inválido')
  return success({ user })
}