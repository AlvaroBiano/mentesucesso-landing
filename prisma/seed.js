import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting seed...')

  // Criar produto principal
  const product = await prisma.product.upsert({
    where: { slug: 'sucesso-mentalidade-financeira' },
    update: {},
    create: {
      title: 'Sucesso e Mentalidade Financeira',
      slug: 'sucesso-mentalidade-financeira',
      description: 'Descubra por que seu dinheiro SEMPRE desaparece. Você não tem um problema de competência financeira. Você tem um problema de arquitetura mental — e a ciência explica exatamente porquê.',
      coverImageUrl: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800',
      productType: 'workshop',
      price: 199,
      isActive: true,
    },
  })
  console.log(`✅ Product created: ${product.title}`)

  // Módulos
  const modulesData = [
    { title: 'Fundamentos Essenciais', description: 'Base teórica e prática para começar sua transformação', sortOrder: 1 },
    { title: 'Técnicas Avançadas', description: 'Métodos avançados de comunicação e influência', sortOrder: 2 },
    { title: 'Mentalidade de Sucesso', description: 'Como desenvolver mentalidade de Winner', sortOrder: 3 },
    { title: 'Comunicação e Influência', description: 'Arte da persuasão e comunicação eficaz', sortOrder: 4 },
    { title: 'Estratégia e Crescimento', description: 'Planejamento estratégico para crescimento pessoal', sortOrder: 5 },
    { title: 'Conteúdo Bônus', description: 'Materiais extras para aprofundamento', sortOrder: 6 },
  ]

  const lessonsData = [
    // Módulo 1 - Fundamentos
    [
      { title: 'Aula 1: Introdução ao Workshop', lessonType: 'vimeo', durationSeconds: 900, sortOrder: 1, isFree: true },
      { title: 'Aula 2: Entendendo o Mercado', lessonType: 'vimeo', durationSeconds: 1200, sortOrder: 2 },
      { title: 'Aula 3: Primeiros Passos', lessonType: 'vimeo', durationSeconds: 1100, sortOrder: 3 },
      { title: 'Aula 4: Fundamentos da Venda', lessonType: 'vimeo', durationSeconds: 1300, sortOrder: 4 },
      { title: 'Aula 5: Apresentação Pessoal', lessonType: 'vimeo', durationSeconds: 1000, sortOrder: 5 },
    ],
    // Módulo 2 - Técnicas
    [
      { title: 'Aula 1: Comunicação Avançada', lessonType: 'vimeo', durationSeconds: 1100, sortOrder: 1 },
      { title: 'Aula 2: Storytelling', lessonType: 'vimeo', durationSeconds: 1200, sortOrder: 2 },
      { title: 'Aula 3: Técnicas de Persuasão', lessonType: 'vimeo', durationSeconds: 1500, sortOrder: 3 },
      { title: 'Aula 4: Fechamento de Vendas', lessonType: 'vimeo', durationSeconds: 1400, sortOrder: 4 },
    ],
    // Módulo 3 - Mentalidade
    [
      { title: 'Aula 1: O Poder da Mentalidade', lessonType: 'vimeo', durationSeconds: 1000, sortOrder: 1 },
      { title: 'Aula 2: Crenças Limitantes', lessonType: 'vimeo', durationSeconds: 1300, sortOrder: 2 },
      { title: 'Aula 3: Visualização e Meta', lessonType: 'vimeo', durationSeconds: 1200, sortOrder: 3 },
    ],
    // Módulo 4 - Comunicação
    [
      { title: 'Aula 1: Linguagem Corporal', lessonType: 'vimeo', durationSeconds: 1100, sortOrder: 1 },
      { title: 'Aula 2: Tom de Voz', lessonType: 'vimeo', durationSeconds: 900, sortOrder: 2 },
      { title: 'Aula 3: Escuta Ativa', lessonType: 'vimeo', durationSeconds: 1000, sortOrder: 3 },
    ],
    // Módulo 5 - Estratégia
    [
      { title: 'Aula 1: Planejamento Estratégico', lessonType: 'vimeo', durationSeconds: 1400, sortOrder: 1 },
      { title: 'Aula 2: Gestão de Tempo', lessonType: 'vimeo', durationSeconds: 1200, sortOrder: 2 },
      { title: 'Aula 3: Scaling', lessonType: 'vimeo', durationSeconds: 1500, sortOrder: 3 },
    ],
    // Módulo 6 - Bônus
    [
      { title: 'Bônus 1: Pdf Completo do Workshop', lessonType: 'pdf', durationSeconds: 0, sortOrder: 1, isFree: true },
      { title: 'Bônus 2: Áudio Motivacional', lessonType: 'audio', durationSeconds: 600, sortOrder: 2 },
      { title: 'Bônus 3: Checklist de Implementação', lessonType: 'pdf', durationSeconds: 0, sortOrder: 3 },
    ],
  ]

  for (let i = 0; i < modulesData.length; i++) {
    const modData = modulesData[i]
    const module = await prisma.module.upsert({
      where: { id: `module-${i + 1}` },
      update: { title: modData.title, description: modData.description },
      create: {
        id: `module-${i + 1}`,
        productId: product.id,
        title: modData.title,
        description: modData.description,
        sortOrder: modData.sortOrder,
      },
    })

    for (const lessonData of lessonsData[i]) {
      await prisma.lesson.upsert({
        where: { id: `${module.id}-lesson-${lessonData.sortOrder}` },
        update: { title: lessonData.title },
        create: {
          id: `${module.id}-lesson-${lessonData.sortOrder}`,
          moduleId: module.id,
          title: lessonData.title,
          lessonType: lessonData.lessonType,
          durationSeconds: lessonData.durationSeconds,
          sortOrder: lessonData.sortOrder,
          isFree: lessonData.isFree || false,
        },
      })
    }
    console.log(`  ✅ Module ${i + 1}: ${modData.title}`)
  }

  // Criar admin de teste
  const bcrypt = await import('bcryptjs')
  const adminHash = await bcrypt.hash('admin123', 10)

  await prisma.profile.upsert({
    where: { email: 'admin@tenlife.com.br' },
    update: {},
    create: {
      email: 'admin@tenlife.com.br',
      fullName: 'Administrador',
      cpf: '00000000000',
      passwordHash: adminHash,
      role: 'admin',
    },
  })
  console.log('✅ Admin created: admin@tenlife.com.br / admin123')

  // Settings
  await prisma.setting.upsert({
    where: { key: 'platform' },
    update: {},
    create: {
      key: 'platform',
      value: {
        name: 'WORKSHOP',
        subtitle: 'Método TEN',
        maxDevicesPerUser: 2,
        affiliateCookieDays: 30,
        commissionQuarantineDays: 7,
      },
      description: 'Configurações gerais da plataforma',
    },
  })

  await prisma.setting.upsert({
    where: { key: 'colors' },
    update: {},
    create: {
      key: 'colors',
      value: {
        verdePrincipal: '#0F5132',
        verdeClaro: '#198754',
        azulProfundo: '#0A2540',
        azulAccent: '#1E88E5',
        dourado: '#D4AF37',
        douradoClaro: '#F1C40F',
        bgDark: '#0A0E1A',
        bgCard: '#141B2D',
        textLight: '#E8E8E8',
      },
      description: 'Paleta de cores',
    },
  })

  console.log('✅ Settings created')
  console.log('🎉 Seed completed!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })