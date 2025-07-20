# 🏗️ Architecture Technique - IndoFrench

Ce document décrit l'architecture technique complète de la plateforme IndoFrench, incluant les améliorations de stabilité et les scripts de maintenance.

## 📊 Vue d'Ensemble de l'Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                    🌐 Frontend (Next.js 15)                    │
├─────────────────────────────────────────────────────────────────┤
│  📱 Interface Utilisateur    │  🔐 Authentification  │  📊 Admin │
│  • Traduction               │  • JWT + Cookies      │  • Stats  │
│  • Upload de fichiers       │  • Gestion de session │  • Users  │
│  • Dashboard                │  • Rôles & permissions│  • Mods   │
└─────────────────────────────────────────────────────────────────┘
                                    │
                               ┌────▼────┐
                               │ API LAYER│
                               └────┬────┘
┌─────────────────────────────────────────────────────────────────┐
│                     🚀 Backend (Next.js API)                   │
├─────────────────────────────────────────────────────────────────┤
│  🔗 API Routes              │  🤖 Services IA        │  📄 Utils │
│  • /api/auth/*              │  • OpenAI Integration  │  • Upload │
│  • /api/users/*             │  • Google Cloud       │  • PDF    │
│  • /api/translate/*         │  • Custom Models      │  • Email  │
│  • /api/admin/*             │  • Quality Check      │  • Logs   │
└─────────────────────────────────────────────────────────────────┘
                                    │
                               ┌────▼────┐
                               │ ORM LAYER│
                               └────┬────┘
┌─────────────────────────────────────────────────────────────────┐
│                   🗄️ Base de Données (PostgreSQL)               │
├─────────────────────────────────────────────────────────────────┤
│  👥 Users    │  🔐 Auth     │  📝 Translations │  📊 Analytics   │
│  • Profiles  │  • Sessions  │  • Projects      │  • Usage Stats  │
│  • Roles     │  • Tokens    │  • Files         │  • Performance  │
│  • Settings  │  • Logs      │  • History       │  • Reports      │
└─────────────────────────────────────────────────────────────────┘
                                    │
┌─────────────────────────────────────────────────────────────────┐
│                    🐳 Infrastructure (Docker)                   │
├─────────────────────────────────────────────────────────────────┤
│  🛠️ Dev Environment         │  🏭 Production         │  🔧 Maintenance │
│  • Hot Reload               │  • Nginx Proxy         │  • Auto-repair  │
│  • Live Database            │  • SSL/TLS             │  • Monitoring   │
│  • Volume Mapping           │  • Load Balancing      │  • Backups      │
│  • Debug Tools              │  • Health Checks       │  • Scripts      │
└─────────────────────────────────────────────────────────────────┘
```

## 🛠️ Stack Technologique

### Frontend
- **Framework** : Next.js 15 (App Router)
- **Runtime** : React 19
- **Langage** : TypeScript 5
- **Styling** : Tailwind CSS 4
- **Animations** : Framer Motion
- **Icons** : Lucide React
- **UI Components** : Radix UI (planifié)

### Backend
- **API** : Next.js API Routes
- **Authentification** : JWT + HttpOnly Cookies
- **ORM** : Prisma 6
- **Validation** : Zod (planifié)
- **Upload** : Multer + AWS S3 (planifié)

### Base de Données
- **SGBD** : PostgreSQL 16
- **ORM** : Prisma Client
- **Migrations** : Prisma Migrate
- **Admin** : Prisma Studio

### Infrastructure
- **Containerisation** : Docker + Docker Compose
- **Reverse Proxy** : Nginx (production)
- **CI/CD** : GitHub Actions (planifié)
- **Monitoring** : Custom scripts + Docker stats

## 🏗️ Architecture des Dossiers

```
Indonesien/
├── 📁 src/                          # Code source principal
│   ├── 📁 app/                      # Next.js App Router
│   │   ├── 📄 layout.tsx            # Layout racine
│   │   ├── 📄 page.tsx              # Page d'accueil
│   │   ├── 📄 globals.css           # Styles globaux
│   │   ├── � not-found.tsx         # Page 404
│   │   ├── 📄 error.tsx             # Page d'erreur 500
│   │   ├── �📁 api/                  # API Routes
│   │   │   ├── 📁 auth/             # Authentification
│   │   │   │   ├── 📄 login/route.ts
│   │   │   │   ├── 📄 register/route.ts
│   │   │   │   ├── 📄 logout/route.ts
│   │   │   │   └── 📄 me/route.ts
│   │   │   ├── 📁 users/            # Gestion utilisateurs
│   │   │   │   ├── � route.ts      # CRUD utilisateurs
│   │   │   │   └── 📄 [id]/route.ts # Utilisateur spécifique
│   │   │   ├── �📁 translate/        # Services de traduction
│   │   │   ├── 📁 upload/           # Upload de fichiers
│   │   │   ├── 📁 stats/            # Statistiques
│   │   │   ├── 📁 roles/            # Gestion des rôles
│   │   │   └── 📁 health/           # Health check
│   │   ├── 📁 auth/                 # Pages d'authentification
│   │   │   └── 📄 page.tsx          # Connexion/Inscription
│   │   ├── 📁 dashboard/            # Tableau de bord utilisateur
│   │   │   └── 📄 page.tsx          # Dashboard principal
│   │   ├── 📁 translate/            # Interface de traduction
│   │   │   └── 📄 page.tsx          # Service de traduction
│   │   ├── 📁 upload/               # Interface d'upload
│   │   │   └── 📄 page.tsx          # Upload de fichiers
│   │   ├── 📁 mes-traductions/      # Historique traductions
│   │   │   └── 📄 page.tsx          # Liste des traductions
│   │   ├── 📁 profile/              # Profil utilisateur
│   │   │   └── 📄 page.tsx          # Gestion du profil
│   │   ├── 📁 settings/             # Paramètres utilisateur
│   │   │   └── 📄 page.tsx          # Configuration personnelle
│   │   ├── 📁 about/                # Page à propos
│   │   │   └── 📄 page.tsx          # Présentation entreprise
│   │   ├── 📁 contact/              # Page contact
│   │   │   └── 📄 page.tsx          # Formulaire de contact
│   │   ├── 📁 pricing/              # Page tarifs
│   │   │   └── 📄 page.tsx          # Plans et tarification
│   │   ├── 📁 help/                 # Centre d'aide
│   │   │   └── 📄 page.tsx          # FAQ et support
│   │   └── 📁 admin/                # Interface d'administration
│   │       ├── 📄 page.tsx          # Dashboard admin principal
│   │       └── 📁 users/            # Gestion utilisateurs admin
│   │           └── 📄 page.tsx      # Administration des comptes
│   ├── � components/               # Composants React réutilisables
│   │   ├── � Navigation.tsx        # Navigation principale avec menu adaptatif
│   │   ├── � Footer.tsx            # Pied de page complet avec liens
│   │   ├── � MainLayout.tsx        # Layout principal avec particules
│   │   ├── 📄 TestAuth.tsx          # Test d'authentification
│   │   └── 📄 UserManagementSection.tsx # Gestion utilisateurs
│   ├── 📁 lib/                      # Utilitaires et configuration
│   │   ├── 📄 prisma.ts             # Configuration Prisma
│   │   └── 📄 fileTranslation.ts    # Utilitaires de traduction
│   ├── 📁 config/                   # Configuration application
│   │   └── 📄 index.ts              # Config centralisée
│   └── 📁 generated/                # Code généré automatiquement
├── 📁 scripts/                      # Scripts de maintenance
│   ├── 🔧 dev-clean.sh              # Nettoyage développement
│   ├── 🔧 fix-common-issues.sh      # Diagnostic et réparation
│   ├── 📄 init-roles.ts             # Initialisation rôles
│   ├── 📄 create-test-users.ts      # Utilisateurs de test
│   └── 📄 test-auth.ts              # Tests d'authentification
├── 📁 prisma/                       # Schéma base de données
│   └── 📄 schema.prisma             # Modèles de données
├── 📁 public/                       # Assets statiques
│   ├── 🖼️ hero-bg.jpg              # Images
│   ├── 🖼️ translation-bg.svg
│   └── 📁 locales/                  # Traductions
│       ├── 📁 fr/, 📁 en/, 📁 id/
├── 🐳 docker-compose.dev.yml        # Configuration Docker dev
├── 🐳 docker-compose.prod.yml       # Configuration Docker prod
├── 🐳 Dockerfile                    # Image Docker multi-stage
├── 🚀 quick-start.sh                # Démarrage intelligent
├── 🛠️ dev.sh                       # Script développement
├── 🏭 prod.sh                      # Script production
├── ⚙️ next.config.js               # Configuration Next.js
├── ⚙️ tailwind.config.js           # Configuration Tailwind
├── ⚙️ tsconfig.json                # Configuration TypeScript
└── 📚 Documentation/                # Documentation complète
    ├── 📄 README.md
    ├── 📄 TROUBLESHOOTING.md
    ├── 📄 MAINTENANCE.md
    └── 📄 ARCHITECTURE.md (ce fichier)
```

## 🔐 Architecture de Sécurité

### Authentification
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   🌐 Client     │    │   🛡️ Server     │    │   🗄️ Database   │
│                 │    │                 │    │                 │
│ 1. Login Form   │───▶│ 2. Validate     │───▶│ 3. Check User   │
│                 │    │    Credentials  │    │                 │
│ 4. Receive      │◀───│ 5. Generate     │◀───│ 6. User Found   │
│    HTTP Cookie  │    │    JWT Token    │    │                 │
│                 │    │                 │    │                 │
│ 7. Auto Send    │───▶│ 8. Verify       │    │                 │
│    on Requests  │    │    JWT Token    │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

#### Mécanismes de Sécurité
- **JWT Tokens** : Signés avec secret robuste
- **HttpOnly Cookies** : Protection contre XSS
- **SameSite Strict** : Protection contre CSRF
- **Secure Flag** : HTTPS uniquement en production
- **Password Hashing** : bcrypt avec 12 salt rounds
- **Role-Based Access** : Contrôle granulaire des permissions

### Gestion des Rôles
```
Admin (ID: 5)
├── Modérateur (ID: 4)
│   ├── Traducteur (ID: 3)
│   │   ├── Premium (ID: 2)
│   │   │   └── Utilisateur (ID: 1)
```

## 🐳 Architecture Docker

### Multi-Stage Dockerfile
```dockerfile
# Stage 1: Base
FROM node:20-alpine AS base
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Stage 2: Development
FROM base AS dev
USER nextjs
COPY --chown=nextjs:nodejs . .
CMD ["npm", "run", "dev"]

# Stage 3: Production Builder
FROM base AS builder
COPY . .
RUN npm run build

# Stage 4: Production Runner
FROM base AS runner
USER nextjs
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
CMD ["node", "server.js"]
```

### Docker Compose (Développement)
```yaml
services:
  web:
    build:
      target: dev
    volumes:
      - .:/app:cached           # Code source
      - /app/node_modules       # Node modules persistant
      - /app/.next              # Build cache persistant
    user: "1001:1001"           # Utilisateur non-root
    depends_on:
      db:
        condition: service_healthy

  db:
    image: postgres:16
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 10s
      timeout: 5s
      retries: 5
```

## 🛠️ Architecture des Scripts de Maintenance

### Hiérarchie des Scripts
```
🚀 quick-start.sh (Point d'entrée principal)
├── 🔧 scripts/fix-common-issues.sh (Diagnostic)
│   ├── ✅ check_processes()
│   ├── ✅ check_permissions()
│   ├── ✅ check_database()
│   └── ✅ check_dependencies()
├── 🧹 scripts/dev-clean.sh (Nettoyage)
│   ├── 🛑 Stop processes
│   ├── 🗂️ Clean builds
│   ├── 📦 Clean caches
│   └── 🔧 Fix permissions
└── 🛠️ dev.sh / prod.sh (Docker)
    ├── 🐳 Docker Compose
    ├── 🔄 Auto-rebuild
    └── 📊 Health monitoring
```

### Flux de Démarrage Automatique
```
┌─────────────────┐
│ User launches   │
│ ./quick-start.sh│
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Auto-diagnosis  │
│ & repair        │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Environment     │
│ preparation     │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Service         │
│ startup         │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Health checks   │
│ & validation    │
└─────────────────┘
```

## 📊 Architecture de Monitoring

### Health Checks
```typescript
// API Health Check
GET /api/health
{
  "status": "OK",
  "timestamp": "2025-07-20T10:00:00Z",
  "service": "IndoFrench API",
  "database": "connected",
  "version": "1.0.0"
}
```

### Monitoring des Processus
```bash
# Scripts de surveillance
./scripts/fix-common-issues.sh --check-processes
./scripts/fix-common-issues.sh --check-database
./scripts/fix-common-issues.sh --check-permissions
```

### Logs Structurés
```
📁 Logs/
├── 📄 next-dev.log        # Développement Next.js
├── 📄 docker.log          # Conteneurs Docker
├── 📄 postgres.log        # Base de données
├── 📄 auth.log            # Authentification
└── 📄 error.log           # Erreurs système
```

## 🔄 CI/CD Architecture (Planifié)

### Pipeline GitHub Actions
```yaml
Development → Staging → Production
     │           │           │
     ▼           ▼           ▼
  Unit Tests → Integration → End-to-End
     │         Tests         Tests
     ▼           │           │
  Code Quality   │           ▼
  Checks         ▼       Deploy to
     │       Deploy to    Production
     ▼       Staging         │
  Security       │           ▼
  Scan           ▼       Health Check
     │       Smoke Tests      │
     ▼           │           ▼
  Build Docker   ▼       Monitor &
  Images     Notify Team   Alert
```

## 🚀 Performance et Optimisations

### Frontend Optimisations
- **Code Splitting** : Composants lazy-loaded
- **Image Optimization** : Next.js Image component
- **CSS Optimization** : Tailwind CSS purging
- **Bundle Analysis** : webpack-bundle-analyzer

### Backend Optimisations
- **Database Indexing** : Index sur les requêtes fréquentes
- **Connection Pooling** : Prisma connection pooling
- **Caching Strategy** : Redis (planifié)
- **API Rate Limiting** : Protection contre abus

### Infrastructure Optimisations
- **Multi-stage Docker** : Images légères en production
- **Volume Caching** : node_modules persistant
- **Health Checks** : Monitoring continu
- **Auto-scaling** : Horizontal scaling (planifié)

## 🔧 Configuration Avancée

### Next.js Configuration
```javascript
// next.config.js
{
  output: 'standalone',           // Docker optimization
  experimental: {
    optimizeCss: true,           // CSS optimization
    optimizeImages: true,        // Image optimization
  },
  webpack: (config, { dev }) => {
    if (dev) {
      config.watchOptions = {
        poll: 1000,              // WSL compatibility
        aggregateTimeout: 300,
        ignored: /node_modules/,
      };
    }
    return config;
  }
}
```

### Prisma Configuration
```prisma
// schema.prisma
generator client {
  provider = "prisma-client-js"
  output   = "./generated/client"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

### Docker Configuration
```yaml
# Production optimizations
services:
  web:
    deploy:
      replicas: 2
      resources:
        limits:
          memory: 512M
        reservations:
          memory: 256M
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000/api/health"]
      interval: 30s
      timeout: 10s
      retries: 3
```

## 🎯 Roadmap Architectural

### Version 1.1 (Q2 2025)
- [ ] Redis pour le caching
- [ ] Queue system avec Bull
- [ ] File upload vers AWS S3
- [ ] Monitoring avancé avec Prometheus

### Version 1.2 (Q3 2025)
- [ ] Microservices architecture
- [ ] API Gateway
- [ ] Service mesh
- [ ] Auto-scaling

### Version 2.0 (Q4 2025)
- [ ] Kubernetes deployment
- [ ] Multi-region setup
- [ ] Advanced analytics
- [ ] Machine learning integration

## 📚 Références Techniques

### Documentation
- **Next.js** : https://nextjs.org/docs
- **Prisma** : https://prisma.io/docs
- **Docker** : https://docs.docker.com
- **PostgreSQL** : https://postgresql.org/docs

### Standards Suivis
- **Security** : OWASP Top 10
- **API Design** : RESTful principles
- **Code Style** : ESLint + Prettier
- **Git Flow** : Conventional commits

---

**Architecture maintenue par l'équipe IndoFrench** - Version 1.0.0
