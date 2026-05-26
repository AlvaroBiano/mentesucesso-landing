import type { Metadata } from 'next'
import './globals.css'
import LandingContent from './LandingContent'

export const metadata: Metadata = {
  title: 'Sucesso e Mentalidade Financeira | Workshop Completo',
  description: 'Workshop completo com base científica sobre arquitetura mental e dinheiro. 5h+ de conteúdo transformador.',
}

export default function Home() {
  return <LandingContent />
}