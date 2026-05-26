'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import styles from './page.module.css'

export default function AdminPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/auth/me').then(r => r.json()).then(d => {
      if (!d.ok || !['admin'].includes(d.data?.user?.role)) {
        router.push('/login')
      } else {
        setUser(d.data.user)
        setLoading(false)
      }
    }).catch(() => {
      router.push('/login')
    })
  }, [router])

  if (loading) return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.spinner} />
      </div>
    </div>
  )

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Painel Admin</h1>
        <p className={styles.welcome}>Bem-vindo, {user?.fullName}</p>
        <p className={styles.email}>{user?.email}</p>
        <p className={styles.role}>ROLE: {user?.role}</p>
        <div className={styles.menu}>
          <a href="/admin/alunos" className={styles.menuItem}>Alunos</a>
          <a href="/admin/afiliados" className={styles.menuItem}>Afiliados</a>
          <a href="/admin/produtos" className={styles.menuItem}>Produtos</a>
        </div>
      </div>
    </div>
  )
}