import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifyToken } from '@/lib/auth'

// Update lesson progress
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: lessonId } = await params
    const token = req.cookies.get('tenportal_token')?.value
    if (!token) {
      return NextResponse.json({ ok: false, error: 'Não autenticado' }, { status: 401 })
    }

    const payload = await verifyToken(token)
    if (!payload) {
      return NextResponse.json({ ok: false, error: 'Token inválido' }, { status: 401 })
    }

    const { completed, watchedSeconds } = await req.json()

    // Find enrollment for this user and lesson's product
    const lesson = await prisma.lesson.findUnique({
      where: { id: lessonId },
      include: { module: true },
    })

    if (!lesson) {
      return NextResponse.json({ ok: false, error: 'Aula não encontrada' }, { status: 404 })
    }

    // Find enrollment
    const enrollment = await prisma.enrollment.findFirst({
      where: {
        profileId: payload.id,
        productId: lesson.module.productId,
      },
    })

    if (!enrollment) {
      return NextResponse.json({ ok: false, error: 'Não matriculado' }, { status: 403 })
    }

    // Update or create progress
    const progress = await prisma.progress.upsert({
      where: {
        enrollmentId_lessonId: {
          enrollmentId: enrollment.id,
          lessonId,
        },
      },
      update: {
        completed: completed || false,
        completedAt: completed ? new Date() : null,
      },
      create: {
        enrollmentId: enrollment.id,
        lessonId,
        completed: completed || false,
        completedAt: completed ? new Date() : null,
      },
    })

    // Update enrollment progress percent
    const totalLessons = await prisma.lesson.count({
      where: {
        module: { productId: lesson.module.productId },
      },
    })

    const completedLessons = await prisma.progress.count({
      where: {
        enrollmentId: enrollment.id,
        completed: true,
      },
    })

    const progressPercent = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0

    await prisma.enrollment.update({
      where: { id: enrollment.id },
      data: {
        progressPercent,
        lastLessonId: lessonId,
      },
    })

    return NextResponse.json({
      ok: true,
      data: {
        progress,
        stats: {
          completedLessons,
          totalLessons,
          progressPercent,
        },
      },
    })
  } catch (e) {
    console.error('[PROGRESS ERROR]', e)
    return NextResponse.json({ ok: false, error: 'Erro interno' }, { status: 500 })
  }
}

// Get lesson progress
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: lessonId } = await params
    const token = req.cookies.get('tenportal_token')?.value
    if (!token) {
      return NextResponse.json({ ok: false, error: 'Não autenticado' }, { status: 401 })
    }

    const payload = await verifyToken(token)
    if (!payload) {
      return NextResponse.json({ ok: false, error: 'Token inválido' }, { status: 401 })
    }

    const lesson = await prisma.lesson.findUnique({
      where: { id: lessonId },
      include: {
        module: {
          include: {
            product: true,
            lessons: {
              orderBy: { sortOrder: 'asc' },
              select: {
                id: true,
                title: true,
                sortOrder: true,
              },
            },
          },
        },
      },
    })

    if (!lesson) {
      return NextResponse.json({ ok: false, error: 'Aula não encontrada' }, { status: 404 })
    }

    // Get progress
    const progress = await prisma.progress.findFirst({
      where: {
        lessonId: lessonId,
        enrollment: {
          profileId: payload.id,
          productId: lesson.module.productId,
        },
      },
    })

    return NextResponse.json({
      ok: true,
      data: {
        lesson,
        progress,
        nextLesson: lesson.module.lessons.find((l) => l.sortOrder === lesson.sortOrder + 1),
        prevLesson: lesson.module.lessons.find((l) => l.sortOrder === lesson.sortOrder - 1),
      },
    })
  } catch (e) {
    console.error('[GET PROGRESS ERROR]', e)
    return NextResponse.json({ ok: false, error: 'Erro interno' }, { status: 500 })
  }
}