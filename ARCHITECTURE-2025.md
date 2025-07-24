# 🏗️ Architecture - IndoFrench (2025)

## Vue d'ensemble

IndoFrench est une plateforme moderne de traduction construite avec Next.js 15, React 19, et une architecture full-stack optimisée pour les performances et la scalabilité.

## 📚 Stack Technique

### Frontend
- **Next.js 15** - Framework React avec App Router
- **React 19** - Interface utilisateur moderne
- **TypeScript** - Typage statique strict
- **Tailwind CSS** - Styling responsive
- **Framer Motion** - Animations fluides
- **Lucide React** - Icônes modernes

### Backend
- **Next.js API Routes** - API RESTful intégrée
- **Prisma ORM** - Gestion de base de données type-safe
- **PostgreSQL** - Base de données relationnelle
- **JWT** - Authentification sécurisée
- **bcrypt** - Hashage des mots de passe

### Déploiement & Infrastructure
- **Vercel** - Plateforme de déploiement (recommandé)
- **Docker** - Containerisation
- **GitHub Actions** - CI/CD
- **Neon/Supabase** - Base de données managée

### Outils de Développement
- **ESLint** - Linting du code
- **Prettier** - Formatage du code
- **TypeScript Compiler** - Vérification de types
- **Jest** - Tests unitaires
- **Prisma Studio** - Interface DB

## 🗂️ Structure du Projet

```
Indonesien/
├── 📁 src/
│   ├── 📁 app/                    # App Router Next.js 15
│   │   ├── 📁 api/               # API Routes Backend
│   │   │   ├── 📁 auth/          # Authentification JWT
│   │   │   │   ├── login/        # Connexion utilisateur
│   │   │   │   ├── register/     # Inscription
│   │   │   │   ├── logout/       # Déconnexion
│   │   │   │   └── me/           # Profil utilisateur
│   │   │   ├── 📁 translate/     # Services de traduction IA
│   │   │   ├── 📁 users/         # Gestion utilisateurs
│   │   │   ├── 📁 upload/        # Upload de fichiers
│   │   │   ├── 📁 upload-debug/  # Debug upload
│   │   │   ├── 📁 my-translations/ # Historique traductions
│   │   │   ├── 📁 save-translation/ # Sauvegarde traductions
│   │   │   └── 📁 stats/         # Statistiques et analytics
│   │   ├── 📁 admin/             # Interface administration
│   │   ├── 📁 auth/              # Pages authentification
│   │   ├── 📁 dashboard/         # Tableau de bord utilisateur
│   │   ├── 📁 translate/         # Interface de traduction
│   │   ├── 📁 upload/            # Interface d'upload
│   │   ├── 📁 mes-traductions/   # Historique traductions
│   │   ├── 📁 profile/           # Profil utilisateur
│   │   ├── 📁 settings/          # Paramètres
│   │   ├── 📁 about/             # À propos
│   │   ├── 📁 contact/           # Contact
│   │   ├── 📁 pricing/           # Tarifs et plans
│   │   ├── 📁 enterprise/        # Solutions entreprise
│   │   ├── 📁 integrations/      # Intégrations
│   │   ├── 📁 support/           # Support client
│   │   ├── 📁 blog/              # Blog et actualités
│   │   ├── 📁 legal/             # CGU, confidentialité
│   │   └── 📄 layout.tsx         # Layout principal
│   ├── 📁 components/            # Composants React réutilisables
│   │   ├── 📄 MainLayout.tsx     # Layout principal
│   │   ├── 📄 Navigation.tsx     # Navigation globale
│   │   ├── 📄 Sidebar.tsx        # Barre latérale
│   │   ├── 📄 Footer.tsx         # Pied de page
│   │   └── 📁 ui/                # Composants UI de base
│   ├── 📁 lib/                   # Utilitaires et configuration
│   │   ├── 📄 prisma.ts          # Configuration Prisma
│   │   ├── 📄 auth.ts            # Logique d'authentification
│   │   ├── 📄 utils.ts           # Fonctions utilitaires
│   │   └── 📄 translations.ts    # Services de traduction
│   ├── 📁 config/                # Configuration de l'application
│   │   ├── 📄 database.ts        # Configuration DB
│   │   ├── 📄 env.ts             # Variables d'environnement
│   │   └── 📄 constants.ts       # Constantes globales
│   └── 📄 middleware.ts          # Middleware Next.js
├── 📁 prisma/                    # Schema et migrations
│   ├── 📄 schema.prisma          # Modèle de données
│   └── 📁 migrations/            # Migrations de base de données
├── 📁 public/                    # Assets statiques
│   ├── 📁 images/                # Images et médias
│   ├── 📁 icons/                 # Icônes et favicons
│   ├── 📁 locales/               # Fichiers de traduction
│   └── 📄 manifest.json          # Manifest PWA
├── 📁 scripts/                   # Scripts d'automatisation
│   ├── 📄 dev-clean.sh           # Nettoyage développement
│   ├── 📄 fix-common-issues.sh   # Réparation automatique
│   ├── 📄 create-test-users.ts   # Utilisateurs de test
│   └── 📄 init-roles.ts          # Initialisation des rôles
├── 📁 uploads/                   # Stockage fichiers uploadés
├── 📁 test/                      # Tests et données de test
│   └── 📁 data/                  # Fichiers de test
├── 📁 .github/                   # Configuration GitHub
│   └── 📁 workflows/             # Actions CI/CD
├── 📄 vercel-deploy.sh           # Script déploiement Vercel
├── 📄 vercel.json                # Configuration Vercel
├── 📄 docker-compose.dev.yml     # Docker développement
├── 📄 docker-compose.prod.yml    # Docker production
├── 📄 Dockerfile                 # Image Docker
├── 📄 next.config.ts             # Configuration Next.js
├── 📄 tailwind.config.ts         # Configuration Tailwind
├── 📄 tsconfig.json              # Configuration TypeScript
├── 📄 eslint.config.mjs          # Configuration ESLint
├── 📄 package.json               # Dépendances et scripts
└── 📄 .env.example               # Variables d'environnement
```

## 🔄 Flux de Données

### Authentification
1. **JWT Tokens** stockés en cookies HttpOnly
2. **Middleware** de vérification sur routes protégées
3. **Rôles utilisateurs** : user, admin, enterprise

### Traduction
1. **Upload de fichiers** → validation → stockage temporaire
2. **Traitement IA** → API externes (Google, OpenAI, HuggingFace)
3. **Sauvegarde** → base de données avec métadonnées
4. **Téléchargement** → fichiers traduits

### Base de Données
```sql
Users ←→ Translations (1:N)
Users ←→ Sessions (1:N)
Users → Roles (N:1)
```

## 🔧 Configuration par Environnement

### Développement Local
- Base de données PostgreSQL locale via Docker
- Hot reload avec Next.js dev server
- Variables d'environnement `.env.development`

### Staging/Preview (Vercel)
- Base de données cloud (Neon)
- Déploiement automatique sur push
- Variables d'environnement Vercel

### Production
- Infrastructure optimisée (CDN, caching)
- Monitoring et analytics
- Sauvegrades automatiques

## 🚀 Optimisations

### Performance
- **Static Generation** pour pages statiques
- **Server Components** par défaut
- **Image Optimization** avec next/image
- **Bundle Splitting** automatique

### Sécurité
- **CSRF Protection** intégrée
- **Sanitization** des inputs
- **Rate Limiting** sur APIs
- **Headers de sécurité** configurés

### SEO
- **Metadata API** Next.js 15
- **Sitemap** généré automatiquement
- **Schema.org** structured data
- **Open Graph** tags

## 📊 Monitoring

### Métriques
- **Vercel Analytics** - Performance et usage
- **Error Tracking** - Logs d'erreurs
- **Database Monitoring** - Requêtes et performance

### Logs
- **Structured Logging** avec Winston
- **Error Boundaries** React
- **API Request Logging**

## 🔄 Processus de Déploiement

### Automatisé (Recommandé)
1. Push vers `main` → Déploiement Vercel automatique
2. Pull Request → Preview deployment
3. Scripts de vérification → Tests avant déploiement

### Manuel
1. `npm run pre-deploy` → Vérifications
2. `npm run vercel:prod` → Déploiement
3. Vérification post-déploiement

---

**Architecture maintenue par** : L'équipe IndoFrench  
**Dernière mise à jour** : 24 juillet 2025
