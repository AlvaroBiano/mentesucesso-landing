# SPEC — Plataforma TEN Workshop

**Versão:** 1.0
**Data:** 2026-05-26
**Stack:** Next.js 14 · Prisma · PostgreSQL (VPS) · Vercel

---

## 1. Visão Geral

Sistema de plataforma de membros com 3 módulos principais:

| Módulo | Acesso | Descrição |
|---|---|---|
| **Landing** | Livre | Landing page do workshop com CTAs direto WhatsApp |
| **Área do Aluno** | Login | Biblioteca de cursos comprados + player de vídeo |
| **Painel Admin** | Login admin | Gestão completa de alunos, produtos, afiliados, financeiro |

---

## 2. O que já existe

### ✅ Funcional
- Landing page com WhatsApp CTA (3 botões, sem modal)
- Login com email + senha (`alvaro@tenlife.com.br` / `AlvaroAdmin2025!`)
- Middleware de proteção de rotas
- API de autenticação com JWT (cookie HttpOnly)
- Página `/admin` básica criada
- Database PostgreSQL no VPS (`tenportal-postgres`)
- Schema `Profile` com `email, cpf, full_name, role, password_hash`
- Deploy Vercel com auto-deploy via GitHub

### ⚠️ Parcial / Pendente
- Cookie não está sendo armazenado no browser (mesmo após raw Set-Cookie fix)
- Página `/admin` não tem conteúdo real ainda
- `/aluno` e `/afiliado` não existem
- Schema do banco é mínimo (só `profiles`)
- Não há gestão de produtos, módulos, aulas
- Não há sistema de afiliados
- Notificações internas não existem
- Progresso de vídeo não existe
- Fingerprint de dispositivo não implementado

---

## 3. Stack Confirmada

```
Frontend:    Next.js 14 App Router + CSS (sem Tailwind ainda)
Backend:     API Routes (Next.js) + Prisma ORM
Database:    PostgreSQL 15 — container tenportal-postgres (VPS 187.77.59.230:54321)
             Usuário: tenportal | Senha: OmK/nEG5ea51alE/Yv/Q0BsRMm0=
Hospedagem:  Vercel (frontend) + VPS (database)
Auth:        JWT via cookie HttpOnly (7 dias)
Env vars:    DATABASE_URL, AUTH_SECRET setadas no Vercel dashboard
```

---

## 4. Arquitetura de Diretórios

```
mentesucesso-landing/
├── app/
│   ├── page.tsx                    # Landing page (redirect para LandingContent)
│   ├── LandingContent.tsx          # Componente da landing
│   ├── globals.css                 # Design system completo
│   ├── login/
│   │   ├── page.tsx                # Login + cadastro
│   │   └── page.module.css
│   ├── admin/
│   │   ├── page.tsx                # Painel admin (básico existente)
│   │   └── page.module.css
│   ├── aluno/
│   │   ├── page.tsx                # Biblioteca do aluno
│   │   ├── [slug]/page.tsx         # Player do curso
│   │   └── page.module.css
│   ├── afiliado/
│   │   ├── page.tsx                # Dashboard do afiliado
│   │   └── page.module.css
│   └── api/
│       ├── auth/
│       │   ├── login/route.ts      # Login (funcionando — curl confirma)
│       │   ├── register/route.ts    # Cadastro
│       │   └── me/route.ts         # Verificar sessão
│       ├── admin/
│       │   ├── students/route.ts   # CRUD alunos
│       │   └── products/route.ts  # CRUD produtos
│       └── hooks/                   # Future: webhooks
├── middleware.ts                   # Proteção de rotas
├── prisma/
│   ├── schema.prisma               # Schema atual (mínimo)
│   └── schema-full.prisma          # Schema completo (futuro)
├── lib/
│   ├── prisma.ts
│   ├── auth.ts                     # JWT sign/verify
│   └── api-response.ts
└── SPEC.md                         # Este documento
```

---

## 5. Database — Schema Atual

### Tabela atual: `profiles`

```sql
CREATE TABLE profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  cpf TEXT UNIQUE,
  password_hash TEXT NOT NULL,
  role TEXT DEFAULT 'student',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

Admin existente: `alvaro@tenlife.com.br` / `AlvaroAdmin2025!`

---

## 6. Database — Schema Completo (v2 — a implementar)

```sql
-- ===== ENUMS =====
CREATE TYPE user_role AS ENUM ('student', 'affiliate', 'admin', 'super_admin');
CREATE TYPE product_type AS ENUM ('workshop', 'course', 'ebook');
CREATE TYPE product_status AS ENUM ('draft', 'published', 'archived');
CREATE TYPE order_status AS ENUM ('pending', 'approved', 'refunded', 'cancelled');
CREATE TYPE lesson_type AS ENUM ('vimeo', 'youtube', 'pdf', 'text');
CREATE TYPE affiliate_status AS ENUM ('pending', 'active', 'blocked');
CREATE TYPE withdrawal_status AS ENUM ('requested', 'approved', 'paid', 'rejected');

-- ===== USERS =====
CREATE TABLE profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT UNIQUE NOT NULL,
    full_name TEXT,
    cpf TEXT UNIQUE,
    whatsapp TEXT,                    -- DDI+DDD+Número
    password_hash TEXT NOT NULL,
    role user_role DEFAULT 'student',
    must_change_password BOOLEAN DEFAULT false,
    is_active BOOLEAN DEFAULT true,
    banned_at TIMESTAMPTZ,
    ban_reason TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    last_login_at TIMESTAMPTZ
);

-- ===== PRODUCTS =====
CREATE TABLE products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    cover_url TEXT,
    trailer_vimeo_id TEXT,
    price_cents INTEGER NOT NULL DEFAULT 19900,
    type product_type DEFAULT 'workshop',
    status product_status DEFAULT 'draft',
    is_affiliable BOOLEAN DEFAULT true,
    affiliate_commission_pct NUMERIC(5,2) DEFAULT 40.00,
    max_devices INTEGER DEFAULT 2,
    access_days INTEGER,             -- NULL = vitalício
    published_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ===== MODULES =====
CREATE TABLE modules (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    sort_order INTEGER DEFAULT 0,
    drip_days INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ===== LESSONS =====
CREATE TABLE lessons (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    module_id UUID NOT NULL REFERENCES modules(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    sort_order INTEGER DEFAULT 0,
    type lesson_type NOT NULL,
    vimeo_id TEXT,
    youtube_url TEXT,
    file_url TEXT,
    content_md TEXT,
    duration_sec INTEGER DEFAULT 0,
    is_free_preview BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ===== DEVICES (fingerprint-based) =====
CREATE TABLE devices (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    fingerprint_hash TEXT NOT NULL,
    device_name TEXT,
    os TEXT,
    browser TEXT,
    is_approved BOOLEAN DEFAULT false,
    is_primary BOOLEAN DEFAULT false,
    revoked_at TIMESTAMPTZ,
    registered_at TIMESTAMPTZ DEFAULT NOW(),
    last_seen_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(profile_id, fingerprint_hash)
);

-- ===== ORDERS =====
CREATE TABLE orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_number TEXT UNIQUE NOT NULL,
    profile_id UUID NOT NULL REFERENCES profiles(id),
    product_id UUID NOT NULL REFERENCES products(id),
    affiliate_id UUID REFERENCES profiles(id),
    amount_cents INTEGER NOT NULL,
    commission_cents INTEGER DEFAULT 0,
    status order_status DEFAULT 'pending',
    payment_proof_url TEXT,
    approved_by UUID REFERENCES profiles(id),
    approved_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ===== PRODUCT ACCESS =====
CREATE TABLE product_access (
    profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    product_id UUID REFERENCES products(id) ON DELETE CASCADE,
    granted_at TIMESTAMPTZ DEFAULT NOW(),
    expires_at TIMESTAMPTZ,
    PRIMARY KEY (profile_id, product_id)
);

-- ===== PROGRESS =====
CREATE TABLE lesson_progress (
    profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    lesson_id UUID REFERENCES lessons(id) ON DELETE CASCADE,
    completed BOOLEAN DEFAULT false,
    watched_sec INTEGER DEFAULT 0,
    last_position_sec INTEGER DEFAULT 0,
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    PRIMARY KEY (profile_id, lesson_id)
);

-- ===== AFFILIATES =====
CREATE TABLE affiliates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id UUID UNIQUE NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    code TEXT UNIQUE NOT NULL,
    commission_pct NUMERIC(5,2) DEFAULT 40.00,
    balance_cents BIGINT DEFAULT 0,
    pending_cents BIGINT DEFAULT 0,
    total_earned_cents BIGINT DEFAULT 0,
    pix_key TEXT,
    pix_type TEXT,
    status affiliate_status DEFAULT 'pending',
    cookie_days INTEGER DEFAULT 30,
    quarantine_days INTEGER DEFAULT 7,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ===== AFFILIATE TRACKING =====
CREATE TABLE affiliate_clicks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    affiliate_id UUID NOT NULL REFERENCES affiliates(id) ON DELETE CASCADE,
    visitor_fingerprint TEXT NOT NULL,
    ip_address INET,
    referrer TEXT,
    converted_to_order UUID,
    clicked_at TIMESTAMPTZ DEFAULT NOW()
);

-- ===== WITHDRAWALS =====
CREATE TABLE affiliate_withdrawals (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    affiliate_id UUID NOT NULL REFERENCES affiliates(id) ON DELETE CASCADE,
    amount_cents INTEGER NOT NULL,
    pix_key TEXT NOT NULL,
    status withdrawal_status DEFAULT 'requested',
    notes TEXT,
    requested_at TIMESTAMPTZ DEFAULT NOW(),
    paid_at TIMESTAMPTZ,
    paid_by UUID REFERENCES profiles(id)
);

-- ===== NOTIFICATIONS =====
CREATE TABLE notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    type TEXT NOT NULL,
    title TEXT NOT NULL,
    body TEXT,
    action_url TEXT,
    read_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ===== SETTINGS =====
CREATE TABLE settings (
    key TEXT PRIMARY KEY,
    value JSONB NOT NULL,
    description TEXT,
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    updated_by UUID REFERENCES profiles(id)
);

-- Seed settings
INSERT INTO settings (key, value) VALUES
    ('max_devices_per_user', '2'),
    ('platform_name', '"WORKSHOP | Grupo Braga & Biano"'),
    ('default_affiliate_commission', '40'),
    ('affiliate_cookie_days', '30'),
    ('maintenance_mode', 'false')
ON CONFLICT DO NOTHING;
```

---

## 7. Fluxo de Autenticação (a corrigir)

```
[Usuário] → POST /api/auth/login
    email + password + fingerprint (futuro)
         ↓
[API] valida credenciais com bcrypt
         ↓
[API] cria JWT com role + id
         ↓
[API] seta cookie: Set-Cookie: tenportal_token=...; Secure; HttpOnly; SameSite=Lax
         ↓
[Middleware] verifica token JWT no cookie
    Se válido + role correto → permite acesso
    Se inválido → redirect /login
```

**Problema atual:** Cookie não está sendo armazenado pelo browser. Investigar:
- Vercel Edge Runtime pode ter limitação de headers Set-Cookie via `headers.set()`
- Testar com `sameSite: 'none'` + `secure: true` (cross-site)
- Alternativa: usar `Response` com `cookies.set()` no route handler, não via `headers.set()`

---

## 8. Painel Admin — Funcionalidades

| Seção | Funcionalidades |
|---|---|
| **Dashboard** | KPIs: alunos, pedidos pendentes, receita |
| **Alunos** | Lista, buscar, aprovar/banir, reset senha, ver dispositivos |
| **Produtos** | CRUD workshops/cursos (módulos, aulas, Vimeo/YouTube/PDF) |
| **Pedidos** | Aprovar pagamento, vincular a aluno |
| **Afiliados** | Cadastrar, definir %, ver cliques, aprovar saques |
| **Configurações** | Nome da plataforma, limites, PIX |

---

## 9. Área do Aluno — Funcionalidades

| Seção | Descrição |
|---|---|
| **Biblioteca** | Grid de cursos comprados com capa e progresso |
| **Player** | Sidebar módulos/aulas + Vimeo/YouTube embed + materiais |
| **Progresso** | Marca automaticamente (a cada 10s de vídeo) |
| **Notificações** | Sino no header com badge |
| **Perfil** | Dados, dispositivos autorizados, alterar senha |

---

## 10. Sistema de Afiliados

### Fluxo
1. Admin cadastra afiliado → gera código único (`BRAGA40`)
2. Afiliado recebe link: `site.com/?ref=BRAGA40`
3. Cookie de rastreamento de **30 dias**
4. Venda aprovada → comissão calculada
5. Quarentena anti-chargeback: **7 dias**
6. Afiliado solicita saque via PIX
7. Admin paga e marca como "pago"

### Dashboard do Afiliado
- Link + código
- Cliques, conversões, taxa
- Saldo pendente / disponível / total
- Solicitar saque

---

## 11. Identidade Visual

Mantida a paleta atual (não confundir com a proposta do chat):

```css
--gold: #D4AF37           /* Principal accent */
--gold-light: #E8C547
--dark: #0D0D0D            /* Background escuro */
--black: #1A1A1A
--cream: #F5F0E1          /* Background claro */
--white: #FFFFFF
```

**Fontes:** Playfair Display (headings) + Inter (body)

**Estilo geral:** Premium, escuro com dourado — não o verde/azul do chat original.

---

## 12. Plano de Implementação

### Fase 1 — Fundação ✅ (parcial)
- [x] Login funcionando via API
- [ ] Cookie sendo armazenado no browser (BLOQUEANDO)
- [ ] Middleware completo com verificação de role
- [ ] Schema v2 do banco criado via Prisma migrate
- [ ] Página `/admin` com conteúdo real

### Fase 2 — Admin Core (próxima)
- [ ] Dashboard admin com KPIs
- [ ] CRUD de produtos (workshops/cursos)
- [ ] CRUD de módulos e aulas
- [ ] Página `/aluno` (biblioteca) funcionando
- [ ] Página `/afiliado` (dashboard) funcionando

### Fase 3 — Player e Progresso
- [ ] Player com embed Vimeo/YouTube
- [ ] Marcação automática de progresso
- [ ] Continuar de onde parou

### Fase 4 — Afiliados
- [ ] Sistema de rastreamento de cliques
- [ ] Comissões automáticas
- [ ] Dashboard do afiliado completo
- [ ] Sistema de saques

### Fase 5 — Polimento
- [ ] Notificações internas
- [ ] Responsividade mobile/TV
- [ ] Fingerprint de dispositivo (substituir limite 2 por fingerprint)
- [ ] PWA

---

## 13. Perguntas em Aberto

1. **Vídeos:** Você tem Vimeo Pro? Embed domínio-restrito ou são públicos?
2. **Comissão de afiliados:** 40% padrão?
3. **Período anti-chargeback:** 7 dias quarenta?
4. **Limite de dispositivos:** Manter por fingerprint (2 por padrão) ou simplificar?
5. **Nome da plataforma:** Manter "WORKSHOP | Grupo Braga & Biano"?
6. **Primeiro produto:** "Sucesso e Mentalidade Financeira" com preço R$ 199?

---

## 14. Dependências Atuais

```json
{
  "next": "14.x",
  "react": "18.x",
  "@prisma/client": "5.x",
  "bcryptjs": "2.x",
  "jsonwebtoken": "9.x",
  "swr": "2.x"
}
```

Banco: `postgresql://tenportal:OmK%2FnEG5ea51alE%2FYv%2FQ0BsRMm0%3D@187.77.59.230:54321/tenportal`