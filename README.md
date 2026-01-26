# Portfolio Monorepo

Este portfolio está diseñado como un monorepo que contiene tanto el frontend (Next.js) como el backend (Express), permitiendo una gestión unificada del código y despliegue independiente de cada servicio usando Turborepo.

## Estructura del Proyecto

```
portfolio/
├── apps/
│   ├── frontend/      # Aplicación Next.js
│   └── backend/       # API Express
├── packages/          # Paquetes compartidos (futuro)
├── package.json       # Configuración raíz del monorepo
└── turbo.json         # Configuración de Turborepo
```

## Tecnologías

### Frontend
- **Next.js 14** - Framework React para producción
- **TypeScript** - Tipado estático
- **Tailwind CSS** - Framework de utilidades CSS

### Backend
- **Express** - Framework web para Node.js
- **TypeScript** - Tipado estático
- **CORS** - Middleware para habilitar CORS

### Herramientas de Monorepo
- **Turborepo** - Sistema de build de alto rendimiento
- **npm workspaces** - Gestión de dependencias

## Instalación

```bash
# Instalar todas las dependencias del monorepo
npm install
```

## Desarrollo

```bash
# Ejecutar ambas aplicaciones en modo desarrollo
npm run dev

# Ejecutar solo el frontend
cd apps/frontend && npm run dev

# Ejecutar solo el backend
cd apps/backend && npm run dev
```

El frontend estará disponible en `http://localhost:3000`
El backend estará disponible en `http://localhost:3001`

## Build

```bash
# Construir todas las aplicaciones
npm run build

# Construir solo el frontend
cd apps/frontend && npm run build

# Construir solo el backend
cd apps/backend && npm run build
```

## Producción

```bash
# Iniciar todas las aplicaciones en modo producción
npm run start
```

## Despliegue Independiente

Cada aplicación puede ser desplegada de forma independiente:

### Frontend (Next.js)
- Vercel
- Netlify
- AWS Amplify
- Cualquier plataforma que soporte Next.js

### Backend (Express)
- Railway
- Render
- Heroku
- AWS EC2/ECS
- DigitalOcean

## Scripts Disponibles

- `npm run dev` - Inicia ambas aplicaciones en modo desarrollo
- `npm run build` - Construye ambas aplicaciones
- `npm run start` - Inicia ambas aplicaciones en modo producción
- `npm run lint` - Ejecuta el linter en ambas aplicaciones
- `npm run clean` - Limpia los archivos de build

## Variables de Entorno

### Backend
Copia `.env.example` a `.env` en `apps/backend/`:
```
PORT=3001
NODE_ENV=development
```
