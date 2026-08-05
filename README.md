# Portfolio Monorepo

Portfolio personal construido como monorepo con **frontend en Next.js 14** y **API en Express**, orquestados con **Turborepo** y npm workspaces. La base de datos es **PostgreSQL** (Supabase en producción) y las imágenes se sirven desde **Cloudinary**.

## Stack

| Capa | Tecnologías |
|---|---|
| Frontend | Next.js 14 (App Router), React 18, TypeScript, Tailwind CSS |
| Backend | Node.js, Express, TypeScript, Prisma 7, Zod |
| Base de datos | PostgreSQL (local con Docker/Postgres o Supabase en producción) |
| Cache / rate-limit | Redis (opcional; la API degrada sin él) |
| Imágenes | Cloudinary (URLs), Devicon CDN (iconos de tecnologías) |
| Orquestación | Turborepo + npm workspaces |
| CI / Backup | GitHub Actions, Cloudflare R2 |

## Estructura del proyecto

```
portfolio/
├── apps/
│   ├── frontend/              # Next.js 14 (App Router)
│   └── backend/               # API Express + Prisma
│       ├── api/index.ts       # Entrada serverless para Vercel
│       ├── prisma/
│       │   ├── schema.prisma  # Esquema de la base de datos
│       │   ├── seed-data.json # Datos editables (proyectos, skills, etc.)
│       │   └── seed.ts        # Lee seed-data.json y puebla la BD
│       └── src/               # Rutas, controladores, repositorios, config
├── scripts/                   # Utilidades (backup, guardas anti-borrado)
├── .github/workflows/         # CI/CD y backup semanal a R2
├── package.json               # Scripts raíz del monorepo
└── turbo.json
```

## Requisitos

- Node.js **>= 18** (npm 10 recomendado)
- PostgreSQL local (o una base en Supabase para producción)
- Opcional: Redis, cuenta Cloudinary, cuenta Resend

## Configuración

### Backend

Copia y ajusta `apps/backend/.env.example` → `.env`:

```
PORT=4000
NODE_ENV=development
DATABASE_URL=postgresql://usuario:clave@localhost:5432/portfolio-tests
DIRECT_URL=postgresql://usuario:clave@localhost:5432/portfolio-tests
CORS_ORIGIN=http://localhost:3000
FRONTEND_URL=http://localhost:3000
REVALIDATE_SECRET=tu_secret_revalidate

# Resend (opcional, para el formulario de contacto)
RESEND_API_KEY=
CONTACT_EMAIL=
CONTACT_EMAIL_FROM="Portfolio <onboarding@resend.dev>"

# Rate limiting de /api/v1/contact (opcional)
CONTACT_RATE_LIMIT_REQUESTS=5
CONTACT_RATE_LIMIT_WINDOW=3600000

# Redis (opcional; vacío = la API degrada sin caché)
REDIS_URL=
```

> **DATABASE_URL vs DIRECT_URL**: el runtime y el seed usan `DATABASE_URL`. Para migraciones con `prisma migrate`, Prisma usa `DIRECT_URL`. Con Supabase: usa el **transaction pooler (6543)** en `DATABASE_URL` y el **session pooler (5432)** en `DIRECT_URL`, ambos con `?sslmode=require`.

### Frontend

Copia `apps/frontend/.env.example` → `.env.local`:

```
NEXT_PUBLIC_API_URL=http://localhost:4000/api/v1
REVALIDATE_SECRET=tu_secret_revalidate
```

## Instalación

```bash
npm install
```

## Desarrollo

```bash
npm run dev                 # Frontend (3000) + Backend (4000)
```

| App | URL |
|---|---|
| Frontend | http://localhost:3000 |
| Backend (API) | http://localhost:4000/api/v1 |

## Base de datos y datos de contenido

Los datos del portfolio (proyectos, skills, certificados, experiencia, tecnologías) viven en un **archivo JSON editable**: `apps/backend/prisma/seed-data.json`. No necesitas panel de administración.

```jsonc
// seed-data.json — ejemplo
{
  "projects": [
    {
      "slug": "api-ecommerce",
      "title": "API E-Commerce",
      "description": "Descripción del proyecto.",
      "imageUrl": "https://res.cloudinary.com/tu-cloud/image/upload/portfolio/projects/ecommerce-api.jpg",
      "githubUrl": "https://github.com/tuusuario/ecommerce-api",
      "liveUrl": "https://demo.com",
      "featured": true,
      "technologies": ["Node.js", "TypeScript", "Express"]
    }
  ]
}
```

Las relaciones se conectan **por nombre** (arrays `technologies` / `skills`), que deben coincidir exactamente con las entradas definidas en el mismo archivo.

### Aplicar cambios

El seed borra todo y lo recrea desde el JSON. Para la base local:

```bash
cd apps/backend
npm run db:seed
```

Para **Supabase (producción)** usa la URL del session pooler:

```bash
cd apps/backend
$env:DATABASE_URL="postgresql://postgres.qpuaqnuedkcxebkivytp:TUCLAVE@aws-1-us-west-2.pooler.supabase.com:5432/postgres?sslmode=require"
npm run db:seed
```

### Migraciones

```bash
npm run db:migrate        # prisma migrate dev (crea/ejecuta migraciones)
npm run db:migrate:prod   # prisma migrate deploy (producción)
```

> ⚠️ `db:push` y `db:reset` pasan por `scripts/guard-prod-db.mjs`, que **bloquea** su ejecución si `DATABASE_URL` apunta a producción. No fuerces estos comandos contra Supabase.

## Scripts del monorepo

| Comando | Descripción |
|---|---|
| `npm run dev` | Frontend + backend en desarrollo |
| `npm run build` / `start` | Build / start de producción |
| `npm run lint` | Lint en todos los workspaces |
| `npm test` | Tests (backend: 24 tests con Vitest + Supertest) |
| `npm run db:seed` | Poblar la BD desde `seed-data.json` |
| `npm run db:migrate` | Migraciones de desarrollo |
| `npm run db:backup` | Dump local de la BD (PowerShell) |

## Despliegue en Vercel

Dos proyectos en Vercel apuntando a este repo:

1. **`api`** — root `apps/backend`, framework *Other*, build `npm install && prisma generate`, entry `api/index.ts`.
2. **`frontend`** — root `apps/frontend`, Next.js.

### Variables de entorno en Vercel

**Backend (`api`)**

| Variable | Valor |
|---|---|
| `DATABASE_URL` | Supabase transaction pooler (6543) con `?sslmode=require` |
| `DIRECT_URL` | Supabase session pooler (5432) con `?sslmode=require` |
| `CORS_ORIGIN` | URL del frontend en Vercel |
| `FRONTEND_URL` | URL del frontend en Vercel |
| `REVALIDATE_SECRET` | Secreto compartido (opcional) |
| `RESEND_API_KEY`, `CONTACT_EMAIL`, `CONTACT_EMAIL_FROM` | Opcionales (formulario de contacto) |

**Frontend**

| Variable | Valor |
|---|---|
| `NEXT_PUBLIC_API_URL` | URL de la API desplegada (ej. `https://tu-api.vercel.app/api/v1`) |

## Backup automático (GitHub Actions + Cloudflare R2)

El workflow `.github/workflows/backup.yml` genera un dump de la BD (`pg_dump`) y lo sube a **Cloudflare R2** cada **domingo 03:00 UTC**, con retención de 8 semanas. Puedes ejecutarlo manualmente desde *Actions*.

Requiere estos **secrets en GitHub** (*Settings → Secrets and variables → Actions*):

| Secret | Descripción |
|---|---|
| `DATABASE_URL` | URL de Supabase **session pooler (5432)** con `?sslmode=require` (para `pg_dump`) |
| `R2_ACCOUNT_ID` | Account ID de Cloudflare |
| `R2_ACCESS_KEY_ID` | Access Key ID del token R2 |
| `R2_SECRET_ACCESS_KEY` | Secret Access Key del token R2 |
| `R2_BUCKET` | Nombre del bucket R2 (ej. `portfolio-backups`) |

## Imágenes

- **Proyectos y certificados**: URL de Cloudinary guardada en el campo `imageUrl` de `seed-data.json`. Sube el archivo en tu cuenta Cloudinary con un public_id que coincida con la URL.
- **Iconos de tecnologías**: CDN de Devicon, resuelto por `apps/frontend/src/helpers/devicon.ts` (incluye casos especiales como `graphql` y `aws`). Si un icono no existe en Devicon, usa `"icon": null` en el JSON.
