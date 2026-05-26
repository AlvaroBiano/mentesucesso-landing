'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import styles from './page.module.css'

interface Lesson {
  id: string
  title: string
  description: string | null
  contentUrl: string | null
  lessonType: string
  durationSeconds: number
  sortOrder: number
  isFree: boolean
  module: {
    id: string
    title: string
    product: {
      id: string
      title: string
      slug: string
    }
    lessons: {
      id: string
      title: string
      sortOrder: number
    }[]
  }
}

interface Progress {
  lessonId: string
  completed: boolean
}

export default function LessonPage() {
  const params = useParams()
  const lessonId = params.id as string
  
  const [lesson, setLesson] = useState<Lesson | null>(null)
  const [progress, setProgress] = useState<Progress | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchLesson()
  }, [lessonId])

  async function fetchLesson() {
    try {
      const res = await fetch(`/api/lessons/${lessonId}/progress`)
      const data = await res.json()
      
      if (data.ok) {
        setLesson(data.data.lesson)
        setProgress(data.data.progress)
      } else {
        setError(data.error || 'Erro ao carregar aula')
      }
    } catch (e) {
      setError('Erro de conexão')
    } finally {
      setLoading(false)
    }
  }

  async function markComplete() {
    if (!lesson) return
    
    try {
      const res = await fetch(`/api/lessons/${lessonId}/progress`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: true }),
      })
      const data = await res.json()
      
      if (data.ok) {
        setProgress({ lessonId, completed: true })
      }
    } catch (e) {
      console.error('Error marking complete:', e)
    }
  }

  function getNextLesson() {
    if (!lesson) return null
    const lessons = lesson.module.lessons
    return lessons.find((l) => l.sortOrder === lesson.sortOrder + 1) || null
  }

  function getPrevLesson() {
    if (!lesson) return null
    const lessons = lesson.module.lessons
    return lessons.find((l) => l.sortOrder === lesson.sortOrder - 1) || null
  }

  function formatDuration(seconds: number): string {
    if (seconds === 0) return ''
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  if (loading) {
    return (
      <div className={styles.layout}>
        <div className={styles.loading}>Carregando aula...</div>
      </div>
    )
  }

  if (error || !lesson) {
    return (
      <div className={styles.layout}>
        <div className={styles.error}>
          <p>{error || 'Aula não encontrada'}</p>
          <Link href="/aluno" className={styles.btnPrimary}>Voltar</Link>
        </div>
      </div>
    )
  }

  const nextLesson = getNextLesson()
  const prevLesson = getPrevLesson()

  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <Link href={`/aluno/${lesson.module.product.slug}`} className={styles.logo}>
            WORKSHOP<span>Portal</span>
          </Link>
          <div className={styles.breadcrumb}>
            <span>{lesson.module.product.title}</span>
            <span className={styles.separator}>/</span>
            <span>{lesson.module.title}</span>
          </div>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.videoContainer}>
          {lesson.lessonType === 'vimeo' && lesson.contentUrl ? (
            <div className={styles.videoPlaceholder}>
              <p>Player Vimeo - Configure o ID do vídeo em contentUrl</p>
            </div>
          ) : lesson.lessonType === 'vimeo' ? (
            <div className={styles.videoPlaceholder}>
              <svg viewBox="0 0 24 24" fill="currentColor" width="80" height="80">
                <path d="M8 5v14l11-7z"/>
              </svg>
              <p>Vídeo em preparo</p>
              <span>Aula {lesson.sortOrder} do módulo</span>
            </div>
          ) : lesson.lessonType === 'pdf' ? (
            <div className={styles.pdfPlaceholder}>
              <svg viewBox="0 0 24 24" fill="currentColor" width="60" height="60">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z"/>
                <polyline points="14 2 14 8 20 8"/>
              </svg>
              <p>Material PDF</p>
              <span>Baixe o conteúdo abaixo</span>
            </div>
          ) : (
            <div className={styles.contentPlaceholder}>
              <p>{lesson.title}</p>
            </div>
          )}
        </div>

        <div className={styles.lessonInfo}>
          <div className={styles.lessonHeader}>
            <div>
              <h1>{lesson.title}</h1>
              <p className={styles.moduleName}>{lesson.module.title}</p>
            </div>
            <div className={styles.lessonMeta}>
              {lesson.durationSeconds > 0 && (
                <span className={styles.duration}>{formatDuration(lesson.durationSeconds)}</span>
              )}
              {progress?.completed && (
                <span className={styles.completedBadge}>
                  <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                  </svg>
                  Concluída
                </span>
              )}
            </div>
          </div>

          {lesson.description && (
            <p className={styles.description}>{lesson.description}</p>
          )}

          <div className={styles.actions}>
            {!progress?.completed && (
              <button onClick={markComplete} className={styles.btnComplete}>
                <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                </svg>
                Marcar como Concluída
              </button>
            )}
          </div>

          <div className={styles.navigation}>
            {prevLesson ? (
              <Link href={`/aluno/lesson/${prevLesson.id}`} className={styles.navBtn}>
                <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                  <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
                </svg>
                Anterior
              </Link>
            ) : (
              <span />
            )}
            
            {nextLesson ? (
              <Link href={`/aluno/lesson/${nextLesson.id}`} className={styles.navBtnPrimary}>
                Próxima Aula
                <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                  <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
                </svg>
              </Link>
            ) : (
              <Link href={`/aluno/${lesson.module.product.slug}`} className={styles.navBtnPrimary}>
                Voltar ao Curso
                <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                  <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
                </svg>
              </Link>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}