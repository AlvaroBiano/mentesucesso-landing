'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import styles from './page.module.css'

interface Lesson {
  id: string
  title: string
  lessonType: string
  durationSeconds: number
  isFree: boolean
  sortOrder: number
}

interface Module {
  id: string
  title: string
  description: string | null
  sortOrder: number
  lessons: Lesson[]
}

interface Product {
  id: string
  title: string
  slug: string
  description: string
  coverImageUrl: string | null
}

interface Enrollment {
  id: string
  enrolledAt: string
  product: Product
  modules: Module[]
  stats: {
    completedLessons: number
    totalLessons: number
    progressPercent: number
  }
}

export default function CoursePage() {
  const params = useParams()
  const slug = params.slug as string
  
  const [enrollment, setEnrollment] = useState<Enrollment | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [expandedModules, setExpandedModules] = useState<Set<string>>(new Set())

  useEffect(() => {
    fetchEnrollment()
  }, [slug])

  async function fetchEnrollment() {
    try {
      const res = await fetch('/api/aluno/enrollments')
      const data = await res.json()
      
      if (data.ok) {
        const found = data.data.find((e: Enrollment) => e.product.slug === slug)
        if (found) {
          setEnrollment(found)
          // Expand first module by default
          if (found.modules.length > 0) {
            setExpandedModules(new Set([found.modules[0].id]))
          }
        } else {
          setError('Você não está matriculado neste curso')
        }
      } else {
        setError(data.error || 'Erro ao carregar')
      }
    } catch (e) {
      setError('Erro de conexão')
    } finally {
      setLoading(false)
    }
  }

  function toggleModule(moduleId: string) {
    const newExpanded = new Set(expandedModules)
    if (newExpanded.has(moduleId)) {
      newExpanded.delete(moduleId)
    } else {
      newExpanded.add(moduleId)
    }
    setExpandedModules(newExpanded)
  }

  function formatDuration(seconds: number): string {
    if (seconds === 0) return 'PDF'
    const mins = Math.floor(seconds / 60)
    return `${mins} min`
  }

  if (loading) {
    return (
      <div className={styles.layout}>
        <div className={styles.loading}>Carregando curso...</div>
      </div>
    )
  }

  if (error || !enrollment) {
    return (
      <div className={styles.layout}>
        <div className={styles.error}>
          <p>{error || 'Curso não encontrado'}</p>
          <Link href="/aluno" className={styles.btnPrimary}>Voltar aos Meus Cursos</Link>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <Link href="/aluno" className={styles.logo}>WORKSHOP<span>Portal</span></Link>
          <nav className={styles.nav}>
            <Link href="/aluno" className={styles.navLink}>Meus Cursos</Link>
            <Link href="/aluno/perfil" className={styles.navLink}>Meu Perfil</Link>
          </nav>
        </div>
      </header>

      <div className={styles.courseLayout}>
        {/* Sidebar */}
        <aside className={styles.sidebar}>
          <div className={styles.courseInfo}>
            <img 
              src={enrollment.product.coverImageUrl || 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=400&h=250&fit=crop'} 
              alt={enrollment.product.title}
              className={styles.courseImage}
            />
            <h2>{enrollment.product.title}</h2>
            <div className={styles.progressStats}>
              <span className={styles.progressPercent}>{enrollment.stats.progressPercent}%</span>
              <span className={styles.progressLabel}>completo</span>
            </div>
            <div className={styles.progressBar}>
              <div 
                className={styles.progressFill} 
                style={{ width: `${enrollment.stats.progressPercent}%` }} 
              />
            </div>
            <p className={styles.lessonsCount}>
              {enrollment.stats.completedLessons} de {enrollment.stats.totalLessons} aulas completas
            </p>
          </div>

          <nav className={styles.modulesNav}>
            {enrollment.modules.map((module, moduleIndex) => (
              <div key={module.id} className={styles.moduleGroup}>
                <button 
                  className={`${styles.moduleHeader} ${expandedModules.has(module.id) ? styles.expanded : ''}`}
                  onClick={() => toggleModule(module.id)}
                >
                  <span className={styles.moduleNumber}>{moduleIndex + 1}</span>
                  <span className={styles.moduleTitle}>{module.title}</span>
                  <svg 
                    className={styles.chevron} 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2"
                  >
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </button>
                
                {expandedModules.has(module.id) && (
                  <ul className={styles.lessonsList}>
                    {module.lessons.map((lesson) => (
                      <li key={lesson.id} className={styles.lessonItem}>
                        <Link href={`/aluno/lesson/${lesson.id}`} className={styles.lessonLink}>
                          <span className={styles.lessonIcon}>
                            {lesson.lessonType === 'vimeo' ? (
                              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                            ) : (
                              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z"/><polyline points="14 2 14 8 20 8"/></svg>
                            )}
                          </span>
                          <span className={styles.lessonTitle}>{lesson.title}</span>
                          <span className={styles.lessonDuration}>{formatDuration(lesson.durationSeconds)}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className={styles.main}>
          <div className={styles.welcomeSection}>
            <h1>{enrollment.product.title}</h1>
            <p>{enrollment.product.description}</p>
            
            <div className={styles.statsGrid}>
              <div className={styles.statCard}>
                <span className={styles.statNumber}>{enrollment.modules.length}</span>
                <span className={styles.statLabel}>Módulos</span>
              </div>
              <div className={styles.statCard}>
                <span className={styles.statNumber}>{enrollment.stats.totalLessons}</span>
                <span className={styles.statLabel}>Aulas</span>
              </div>
              <div className={styles.statCard}>
                <span className={styles.statNumber}>{enrollment.stats.completedLessons}</span>
                <span className={styles.statLabel}>Concluídas</span>
              </div>
            </div>

            {enrollment.modules.length > 0 && enrollment.modules[0].lessons.length > 0 && (
              <Link 
                href={`/aluno/lesson/${enrollment.modules[0].lessons[0].id}`}
                className={styles.btnStart}
              >
                <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                  <path d="M8 5v14l11-7z"/>
                </svg>
                {enrollment.stats.progressPercent > 0 ? 'Continuar' : 'Começar'} Curso
              </Link>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}