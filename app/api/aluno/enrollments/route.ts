import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifyToken } from '@/lib/auth'

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get('tenportal_token')?.value
    if (!token) {
      return NextResponse.json({ ok: false, error: 'Não autenticado' }, { status: 401 })
    }

    const payload = await verifyToken(token)
    if (!payload) {
      return NextResponse.json({ ok: false, error: 'Token inválido' }, { status: 401 })
    }

    // Get enrollments with products and progress
    const enrollments = await prisma.enrollment.findMany({
      where: { profileId: payload.id },
      include: {
        product: {
          select: {
            id: true,
            title: true,
            slug: true,
            description: true,
            coverImageUrl: true,
            price: true,
          },
        },
        progress: {
          select: {
            lessonId: true,
            completed: true,
            completedAt: true,
          },
        },
      },
      orderBy: { enrolledAt: 'desc' },
    })

    // Get modules and lessons for each enrolled product
    const products = await prisma.product.findMany({
      where: {
        id: { in: enrollments.map((e) => e.productId) },
        isActive: true,
      },
      include: {
        modules: {
          orderBy: { sortOrder: 'asc' },
          include: {
            lessons: {
              orderBy: { sortOrder: 'asc' },
              select: {
                id: true,
                title: true,
                lessonType: true,
                durationSeconds: true,
                isFree: true,
                sortOrder: true,
              },
            },
          },
        },
      },
    })

    // Transform data
    const data = enrollments.map((enrollment) => {
      const product = products.find((p) => p.id === enrollment.productId)
      const completedLessons = enrollment.progress.filter((p) => p.completed).length
      const totalLessons = product?.modules.reduce((acc, m) => acc + m.lessons.length, 0) || 0
      const progressPercent = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0

      return {
        id: enrollment.id,
        enrolledAt: enrollment.enrolledAt,
        origin: enrollment.origin,
        product: enrollment.product,
        modules: product?.modules || [],
        progress: enrollment.progress,
        stats: {
          completedLessons,
          totalLessons,
          progressPercent,
        },
      }
    })

    return NextResponse.json({ ok: true, data })
  } catch (e) {
    console.error('[ENROLLMENTS ERROR]', e)
    return NextResponse.json({ ok: false, error: 'Erro interno' }, { status: 500 })
  }
}

// POST: Enroll in a product (for free products or after payment)
export async function POST(req: NextRequest) {
  try {
    const token = req.cookies.get('tenportal_token')?.value
    if (!token) {
      return NextResponse.json({ ok: false, error: 'Não autenticado' }, { status: 401 })
    }

    const payload = await verifyToken(token)
    if (!payload) {
      return NextResponse.json({ ok: false, error: 'Token inválido' }, { status: 401 })
    }

    const { productId } = await req.json()
    if (!productId) {
      return NextResponse.json({ ok: false, error: 'productId é obrigatório' }, { status: 400 })
    }

    // Check if already enrolled
    const existing = await prisma.enrollment.findUnique({
      where: { profileId_productId: { profileId: payload.id, productId } },
    })

    if (existing) {
      return NextResponse.json({ ok: false, error: 'Já matriculado' }, { status: 400 })
    }

    // Create enrollment
    const enrollment = await prisma.enrollment.create({
      data: {
        profileId: payload.id,
        productId,
        origin: 'direct',
      },
      include: {
        product: true,
      },
    })

    return NextResponse.json({ ok: true, data: enrollment })
  } catch (e) {
    console.error('[ENROLL ERROR]', e)
    return NextResponse.json({ ok: false, error: 'Erro interno' }, { status: 500 })
  }
}