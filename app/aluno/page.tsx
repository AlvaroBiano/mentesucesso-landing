'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import styles from './page.module.css'

interface Product {
  id: string
  title: string
  slug: string
  description: string
  coverImageUrl: string | null
  price: number
}

interface Module {
  id: string
  title: string
  description: string | null
  sortOrder: number
  lessons: {
    id: string
    title: string
    lessonType: string
    durationSeconds: number
    isFree: boolean
    sortOrder: number
  }[]
}

interface Enrollment {
  id: string
  enrolledAt: string
  origin: string
  product: Product
  modules: Module[]
  stats: {
    completedLessons: number
    totalLessons: number
    progressPercent: number
  }
}

export default function AlunoPage() {
  const [enrollments, setEnrollments] = useState<Enrollment[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [user, setUser] = useState<{ email: string; fullName: string } | null>(null)

  useEffect(() => {
    fetchEnrollments()
  }, [])

  async function fetchEnrollments() {
    try {
      const res = await fetch('/api/aluno/enrollments')
      const data = await res.json()
      
      if (data.ok) {
        setEnrollments(data.data)
        // Try to get user from me endpoint
        const meRes = await fetch('/api/auth/me')
        const meData = await meRes.json()
        if (meData.ok) {
          setUser(meData.data)
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

  async function handleLogout() {
    document.cookie = 'tenportal_token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;'
    window.location.href = '/login'
  }

  if (loading) {
    return (
      <div className={styles.layout}>
        <div className={styles.loading}>Carregando...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className={styles.layout}>
        <div className={styles.error}>
          <p>{error}</p>
          <Link href="/login" className={styles.btnPrimary}>Fazer Login</Link>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <Link href="/" className={styles.logo}>WORKSHOP<span>Portal</span></Link>
          <nav className={styles.nav}>
            <Link href="/aluno" className={styles.navLink}>Meus Cursos</Link>
            <Link href="/aluno/perfil" className={styles.navLink}>Meu Perfil</Link>
          </nav>
          <div className={styles.headerActions}>
            <button onClick={handleLogout} className={styles.logoutBtn}>Sair</button>
            <div className={styles.avatar}>{user?.fullName?.charAt(0) || 'A'}</div>
          </div>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.welcome}>
          <h1>Bem-vindo, <span className={styles.gold}>{user?.fullName?.split(' ')[0] || 'Aluno'}</span></h1>
          <p>Continue de onde parou ou escolha um novo conteúdo</p>
        </div>

        <h2 className={styles.sectionTitle}>Meus Cursos</h2>
        
        {enrollments.length === 0 ? (
          <div className={styles.emptyState}>
            <p>Você ainda não está matriculado em nenhum curso.</p>
            <Link href="/" className={styles.btnPrimary}>Ver Cursos Disponíveis</Link>
          </div>
        ) : (
          <div className={styles.grid}>
            {enrollments.map((enrollment) => (
              <Link 
                href={`/aluno/${enrollment.product.slug}`} 
                key={enrollment.id} 
                className={styles.card}
              >
                <div className={styles.cardImage}>
                  <img 
                    src={enrollment.product.coverImageUrl || 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=400&h=250&fit=crop'} 
                    alt={enrollment.product.title} 
                  />
                  <div className={styles.playOverlay}>
                    <svg viewBox="0 0 24 24" fill="currentColor" width="40" height="40">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                </div>
                <div className={styles.cardContent}>
                  <h3>{enrollment.product.title}</h3>
                  <p>{enrollment.modules.length} módulos · {enrollment.stats.totalLessons} aulas</p>
                  <div className={styles.progressBar}>
                    <div 
                      className={styles.progressFill} 
                      style={{ width: `${enrollment.stats.progressPercent}%` }} 
                    />
                  </div>
                  <span className={styles.progressLabel}>
                    {enrollment.stats.progressPercent}% completo · {enrollment.stats.completedLessons}/{enrollment.stats.totalLessons} aulas
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}