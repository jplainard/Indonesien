# 🇮🇩↔️🇫🇷 IndoFrench - Plateforme de Traduction Professionnelle

**IndoFrench** est une plateforme complète de traduction professionnelle entre l'indonésien et le français, développée avec Next.js 15, React 19, et les dernières technologies web. Offrant des solutions pour particuliers et entreprises avec API, intégrations et support dédié.

## 🌟 Fonctionnalités Principales

- **Traduction IA Avancée** : Modèles spécialisés indonésien-français
- **Interface Moderne** : React 19 avec animations Framer Motion  
- **Solutions Entreprise** : API, SLA, support 24/7, infrastructure dédiée
- **Sécurité Renforcée** : Conformité RGPD, chiffrement bout-en-bout
- **Intégrations** : WordPress, Shopify, Slack, Google Sheets, Office 365
- **Documentation Complète** : Guides, API, SDK, tutoriels
- **Support Multi-format** : Texte, PDF, Word, Excel, PowerPoint

## 🚀 Démarrage Rapide

### Option 1 : Démarrage Automatique (Recommandé)
```bash
# Démarrage avec vérifications automatiques
./quick-start.sh --dev-local

# Ou pour Docker
./quick-start.sh --dev

# Production
./quick-start.sh --prod
```

### Option 2 : Démarrage Manuel
```bash
# 1. Cloner le repository
git clone https://github.com/jplainard/Indonesien.git
cd Indonesien

# 2. Installer les dépendances
npm install

# 3. Démarrer la base de données
docker-compose -f docker-compose.dev.yml up -d db

# 4. Configurer la base de données
npx prisma db push
node init-roles.js

# 5. Démarrer le serveur
npm run dev
```

## 🛠️ Scripts de Maintenance

### Scripts Principaux
- **`./quick-start.sh`** - Démarrage intelligent avec vérifications
- **`./scripts/dev-clean.sh`** - Nettoyage de l'environnement de développement
- **`./scripts/fix-common-issues.sh`** - Diagnostic et réparation automatique

### En cas de problème
```bash
# Réparation automatique complète
./scripts/fix-common-issues.sh --auto-repair

# Nettoyage complet
./scripts/dev-clean.sh --full

# Redémarrage propre
./quick-start.sh --clean
```

## 📋 Architecture et Technologies

### Stack Technique
- **Frontend** : Next.js 15, React 19, TypeScript
- **Styling** : Tailwind CSS, Framer Motion
- **Backend** : Next.js API Routes
- **Base de données** : PostgreSQL + Prisma ORM
- **Authentification** : JWT + HttpOnly Cookies
- **Containerisation** : Docker + Docker Compose
- **Déploiement** : Scripts automatisés

### Structure du Projet
```
Indonesien/
├── 📁 src/
│   ├── 📁 app/                 # App Router Next.js 15
│   │   ├── 📁 api/            # API Routes Backend
│   │   │   ├── 📁 auth/       # Authentification JWT
│   │   │   ├── 📁 translate/  # Services de traduction IA
│   │   │   ├── 📁 users/      # Gestion utilisateurs
│   │   │   ├── 📁 upload/     # Upload de fichiers
│   │   │   └── 📁 stats/      # Statistiques et analytics
│   │   ├── 📁 admin/          # Interface administration
│   │   ├── � auth/           # Pages authentification
│   │   ├── 📁 dashboard/      # Tableau de bord utilisateur
│   │   ├── 📁 translate/      # Interface de traduction
│   │   ├── 📁 upload/         # Interface d'upload
│   │   ├── 📁 mes-traductions/ # Historique traductions
│   │   ├── 📁 profile/        # Profil utilisateur
│   │   ├── 📁 settings/       # Paramètres
│   │   ├── 📁 about/          # À propos
│   │   ├── 📁 contact/        # Contact
│   │   ├── 📁 pricing/        # Tarifs et plans
│   │   ├── 📁 help/           # Centre d'aide
│   │   ├── 📁 enterprise/     # Solutions entreprise
│   │   ├── 📁 docs/           # Documentation
│   │   │   └── 📁 api/        # Documentation API
│   │   ├── 📁 careers/        # Carrières
│   │   ├── 📁 news/           # Actualités
│   │   ├── 📁 status/         # Statut système
│   │   ├── 📁 privacy/        # Politique confidentialité
│   │   ├── 📁 terms/          # Conditions d'utilisation
│   │   ├── 📁 legal/          # Mentions légales
│   │   ├── 📁 gdpr/           # Conformité RGPD
│   │   ├── 📄 page.tsx        # Page d'accueil
│   │   ├── 📄 layout.tsx      # Layout principal
│   │   ├── � globals.css     # Styles globaux
│   │   └── 📄 not-found.tsx   # Page 404
│   ├── 📁 components/         # Composants réutilisables
│   │   ├── 📄 MainLayout.tsx  # Layout principal
│   │   ├── 📄 Navigation.tsx  # Navigation responsive
│   │   ├── � Footer.tsx      # Footer complet
│   │   ├── 📄 AuthCheck.tsx   # Vérification auth
│   │   └── 📄 LoadingSpinner.tsx # Indicateur chargement
│   ├── 📁 lib/               # Utilitaires et config
│   │   ├── 📄 auth.ts        # Logique authentification
│   │   ├── 📄 jwt.ts         # Gestion tokens JWT
│   │   ├── 📄 prisma.ts      # Client Prisma
│   │   └── 📄 utils.ts       # Fonctions utilitaires
│   └── 📁 config/            # Configuration
├── 📁 prisma/                # Schema base de données
├── 📁 scripts/               # Scripts maintenance
├── 📁 public/                # Assets statiques
├── 📁 uploads/               # Fichiers uploadés
└── 📁 test/                  # Tests et données de test
```

## 📖 Pages et Fonctionnalités Disponibles

### 🏠 Pages Principales
- **`/`** - Page d'accueil avec présentation et démo
- **`/translate`** - Interface de traduction principale
- **`/upload`** - Upload et traduction de fichiers
- **`/dashboard`** - Tableau de bord utilisateur avec statistiques
- **`/mes-traductions`** - Historique des traductions

### � Gestion Utilisateur
- **`/auth`** - Connexion et inscription
- **`/profile`** - Profil utilisateur et préférences
- **`/settings`** - Paramètres et configuration

### 🏢 Pages Entreprise
- **`/about`** - À propos de l'entreprise et équipe
- **`/contact`** - Formulaire de contact et informations
- **`/pricing`** - Plans tarifaires (Gratuit, Pro, Enterprise)
- **`/enterprise`** - Solutions entreprise dédiées
- **`/careers`** - Offres d'emploi et candidatures

### � Support et Documentation
- **`/help`** - Centre d'aide et FAQ
- **`/docs`** - Documentation générale
- **`/docs/api`** - Documentation API complète
- **`/status`** - Statut des services en temps réel
- **`/news`** - Actualités et blog

### ⚖️ Pages Légales (Conformité RGPD)
- **`/privacy`** - Politique de confidentialité
- **`/terms`** - Conditions d'utilisation
- **`/legal`** - Mentions légales
- **`/gdpr`** - Droits RGPD et gestion données

### 🔐 Administration (Accès Restreint)
- **`/admin`** - Dashboard administrateur
- **`/admin/users`** - Gestion des utilisateurs
│   │   ├── 📁 contact/        # Page contact
│   │   ├── 📁 pricing/        # Page tarifs
│   │   ├── 📁 help/           # Centre d'aide
│   │   ├── 📄 not-found.tsx   # Page 404
│   │   └── 📄 error.tsx       # Page d'erreur 500
│   ├── 📁 components/         # Composants React
│   │   ├── 📄 Navigation.tsx  # Navigation principale
│   │   ├── 📄 Footer.tsx      # Pied de page
│   │   └── 📄 MainLayout.tsx  # Layout principal
│   ├── 📁 lib/               # Utilities et configuration
│   └── 📁 config/            # Configuration app
├── 📁 scripts/               # Scripts de maintenance
│   ├── 🔧 dev-clean.sh       # Nettoyage développement
│   ├── 🔧 fix-common-issues.sh # Réparation automatique
│   ├── 🔧 init-roles.ts      # Initialisation des rôles
│   └── 🔧 create-test-users.ts # Utilisateurs de test
├── 📁 prisma/               # Schéma base de données
├── 📁 public/               # Assets statiques
├── 🐳 docker-compose.dev.yml # Configuration Docker dev
├── 🐳 docker-compose.prod.yml # Configuration Docker prod
├── 🚀 quick-start.sh        # Script de démarrage intelligent
├── 🛠️ dev.sh               # Script développement Docker
├── 🏭 prod.sh              # Script production
└── 📚 TROUBLESHOOTING.md   # Guide de résolution
```

## ✨ Fonctionnalités Principales

### 🌐 Services de Traduction
- **Traduction IA Avancée** : Intégration OpenAI et Google Cloud
- **Traduction Humaine** : Réseau de traducteurs professionnels
- **Support Multi-formats** : Documents, images, audio, vidéo
- **Qualité Garantie** : Système de notation et révision

### 🔐 Système d'Authentification
- **JWT Sécurisé** : Tokens avec HttpOnly cookies
- **Gestion des Rôles** : Utilisateur, Premium, Traducteur, Modérateur, Admin
- **Session Management** : Gestion avancée des sessions
- **Sécurité Renforcée** : Protection CSRF, rate limiting

### 📱 Interface Utilisateur Complète
- **Pages Principales** :
  - 🏠 **Accueil** : Présentation et statistiques en temps réel
  - 🔐 **Authentification** : Connexion/Inscription sécurisée
  - 📊 **Dashboard** : Tableau de bord personnalisé
  - 🌐 **Traduction** : Interface de traduction en temps réel
  - 📤 **Upload** : Upload et traitement de fichiers
  - 📋 **Mes Traductions** : Historique et gestion des projets

- **Pages Institutionnelles** :
  - ℹ️ **À Propos** : Présentation de l'entreprise et équipe
  - 📞 **Contact** : Formulaire de contact et informations
  - 💰 **Tarifs** : Plans et tarification transparente
  - ❓ **Aide** : Centre d'aide et FAQ interactive

- **Espace Utilisateur** :
  - 👤 **Profil** : Gestion du profil utilisateur
  - ⚙️ **Paramètres** : Configuration personnalisée
  - 🔔 **Notifications** : Gestion des préférences

- **Administration** :
  - 🛠️ **Dashboard Admin** : Vue d'ensemble et statistiques
  - 👥 **Gestion Utilisateurs** : Administration des comptes
  - 📊 **Analytics** : Statistiques détaillées et monitoring

- **Gestion d'Erreurs** :
  - 🚫 **404** : Page non trouvée avec suggestions
  - ⚠️ **500** : Erreur serveur avec diagnostic

### 🎨 Interface Professionnelle
- **Design Moderne** : Interface responsive avec Tailwind CSS
- **Animations Fluides** : Framer Motion pour les interactions
- **Navigation Intuitive** : Menu adaptatif avec indicateurs visuels
- **Footer Complet** : Liens organisés et newsletter
- **Thème Cohérent** : Identité visuelle uniformisée

### 🛠️ Outils de Développement

#### Scripts de Maintenance Automatisés
- **`quick-start.sh`** - Démarrage intelligent avec vérifications
- **`scripts/dev-clean.sh`** - Nettoyage environnement développement
- **`scripts/fix-common-issues.sh`** - Diagnostic et réparation automatique

#### Fonctionnalités de Stabilité
- **Auto-repair** : Détection et correction automatique des erreurs
- **Permission Management** : Gestion automatique des permissions fichiers
- **Process Monitoring** : Surveillance des processus Node.js
- **Database Health Checks** : Vérification état PostgreSQL

## 🚀 Guide de Démarrage

### Option 1 : Démarrage Automatique (Recommandé)
```bash
# Clone et setup automatique
git clone https://github.com/jplainard/Indonesien.git
cd Indonesien

# Démarrage intelligent avec toutes les vérifications
./quick-start.sh --dev-local
```

### Option 2 : Démarrage Docker
```bash
# Avec Docker Compose
./quick-start.sh --dev

# Ou directement
./dev.sh
```

### Option 3 : Démarrage Manuel
```bash
# 1. Installation des dépendances
npm install

# 2. Configuration environnement
cp .env.example .env.local
# Éditer .env.local avec vos paramètres

# 3. Base de données
docker-compose -f docker-compose.dev.yml up -d db
npx prisma db push
node init-roles.js

# 4. Démarrage serveur
npm run dev
```

## 📋 Scripts et Commandes

### Scripts de Démarrage
```bash
./quick-start.sh --dev-local   # Mode développement local (recommandé)
./quick-start.sh --dev         # Mode développement Docker
./quick-start.sh --prod        # Mode production
./quick-start.sh --clean       # Nettoyage complet
```

### Scripts de Maintenance
```bash
# Diagnostic et réparation automatique
./scripts/fix-common-issues.sh --auto-repair

# Nettoyage développement
./scripts/dev-clean.sh           # Nettoyage standard
./scripts/dev-clean.sh --full    # Nettoyage complet avec node_modules

# Vérifications spécifiques
./scripts/fix-common-issues.sh --check-permissions
./scripts/fix-common-issues.sh --check-database
./scripts/fix-common-issues.sh --check-processes
```

### Scripts NPM
```bash
# Développement
npm run dev              # Serveur de développement Next.js
npm run build           # Build de production
npm run start           # Serveur de production
npm run lint            # Vérification ESLint
npm run type-check      # Vérification TypeScript

# Base de données
npx prisma db push      # Synchroniser le schéma
npx prisma studio       # Interface graphique DB
npx prisma generate     # Générer le client Prisma

# Utilitaires
node init-roles.js      # Initialiser les rôles
node debug-login.js     # Debug authentification
```

## 🔧 Résolution de Problèmes

### Problèmes Courants

#### 1. Erreurs de Permissions (EACCES)
```bash
# Solution automatique
./scripts/fix-common-issues.sh --auto-repair

# Solution manuelle
sudo chown -R $USER:$USER .
chmod -R 755 .
```

#### 2. Build Corrompu (.next)
```bash
# Nettoyage rapide
./scripts/dev-clean.sh

# Nettoyage complet
./scripts/dev-clean.sh --full
```

#### 3. Processus Bloqués
```bash
# Vérification et nettoyage automatique
./scripts/fix-common-issues.sh --check-processes

# Manuel
pkill -f "next"
lsof -ti:3000 | xargs kill -9
```

#### 4. Base de Données Inaccessible
```bash
# Vérification automatique
./scripts/fix-common-issues.sh --check-database

# Redémarrage manuel
docker-compose -f docker-compose.dev.yml restart db
```

### Workflow de Débogage Recommandé

1. **Premier niveau** : `./scripts/fix-common-issues.sh --auto-repair`
2. **Deuxième niveau** : `./scripts/dev-clean.sh && ./quick-start.sh --dev-local`
3. **Reset complet** : `./scripts/dev-clean.sh --full && ./quick-start.sh --dev-local`

Pour plus de détails, consultez [TROUBLESHOOTING.md](./TROUBLESHOOTING.md)

## 🏗️ Architecture Technique

### Stack Technologique
- **Frontend** : Next.js 15, React 19, TypeScript 5
- **Styling** : Tailwind CSS 4, Framer Motion, Lucide Icons
- **Backend** : Next.js API Routes, Prisma ORM
- **Base de données** : PostgreSQL 16
- **Authentification** : JWT + HttpOnly Cookies
- **Containerisation** : Docker + Docker Compose
- **CI/CD** : GitHub Actions

### Configuration Docker Optimisée
- **Multi-stage builds** : Optimisation des images
- **Non-root user** : Sécurité renforcée (nextjs:1001)
- **Volume management** : Cache persistant pour node_modules
- **Health checks** : Surveillance PostgreSQL
- **Permission handling** : Gestion automatique des permissions

### Améliorations de Stabilité
- **Auto-recovery** : Détection et correction d'erreurs
- **Permission management** : Correction automatique
- **Process monitoring** : Surveillance des processus
- **Cache optimization** : Gestion intelligente du cache Next.js

## 🚀 APIs et Endpoints

### Authentification
- `POST /api/auth/register` - Inscription utilisateur
- `POST /api/auth/login` - Connexion
- `POST /api/auth/logout` - Déconnexion
- `GET /api/auth/me` - Informations utilisateur actuel

### Gestion Utilisateurs
- `GET /api/users` - Liste des utilisateurs (admin)
- `GET /api/users/[id]` - Détails utilisateur
- `PUT /api/users/[id]` - Modification utilisateur
- `DELETE /api/users/[id]` - Suppression utilisateur

### Services
- `GET /api/health` - État du système
- `GET /api/stats` - Statistiques plateforme
- `GET /api/roles` - Liste des rôles
- `POST /api/upload` - Upload de fichiers

## 🌐 Accès à l'Application

Une fois démarrée, l'application est accessible via :

### URLs Principales
- **🏠 Site principal** : http://localhost:3000
- **🔐 Authentification** : http://localhost:3000/auth
- **📊 Dashboard utilisateur** : http://localhost:3000/dashboard
- **🌐 Service de traduction** : http://localhost:3000/translate
- **📤 Upload de fichiers** : http://localhost:3000/upload
- **📋 Mes traductions** : http://localhost:3000/mes-traductions

### Pages Institutionnelles
- **ℹ️ À propos** : http://localhost:3000/about
- **📞 Contact** : http://localhost:3000/contact
- **💰 Tarifs** : http://localhost:3000/pricing
- **❓ Centre d'aide** : http://localhost:3000/help

### Espace Utilisateur
- **👤 Profil** : http://localhost:3000/profile
- **⚙️ Paramètres** : http://localhost:3000/settings

### Administration (Accès Admin)
- **🛠️ Dashboard Admin** : http://localhost:3000/admin
- **👥 Gestion utilisateurs** : http://localhost:3000/admin/users

### APIs et Services
- **🏥 Health Check** : http://localhost:3000/api/health
- **📊 Statistiques** : http://localhost:3000/api/stats
- **👤 Authentification** : http://localhost:3000/api/auth/*
- **👥 Gestion utilisateurs** : http://localhost:3000/api/users/*

## 📚 Documentation Complète

- **[TROUBLESHOOTING.md](./TROUBLESHOOTING.md)** - Guide de résolution des problèmes
- **[DEMARRAGE-RAPIDE.md](./DEMARRAGE-RAPIDE.md)** - Guide de démarrage rapide
- **[INSTALLATION-OUTILS.md](./INSTALLATION-OUTILS.md)** - Installation des outils de développement
- **[BRAND-GUIDE.md](./BRAND-GUIDE.md)** - Guide de la marque
- **[DEPLOY.md](./DEPLOY.md)** - Guide de déploiement

## 🤝 Contribution

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/AmazingFeature`)
3. Commit vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

## 📞 Support

- **Email** : support@indofrench.com
- **Documentation** : [docs.indofrench.com](https://docs.indofrench.com)
- **Issues GitHub** : [github.com/jplainard/Indonesien/issues](https://github.com/jplainard/Indonesien/issues)

---

**Développé avec ❤️ pour la communauté franco-indonésienne**

## 🛠️ Stack Technique

### **Frontend**
- **Next.js 15.4.1** - App Router, Turbopack
- **React 19.1.0** - Dernière génération
- **TypeScript 5** - Typage strict
- **Tailwind CSS 4** - Styling moderne

### **Backend & Base de Données**
- **Prisma 6.12.0** - ORM moderne
- **PostgreSQL 16** - Base de données
- **NextAuth 5.0** - Authentification

### **Services Externes**
- **OpenAI API** - Traduction IA
- **Google Cloud Translate** - Traduction
- **Stripe** - Paiements
- **Nodemailer** - Emails

### **UI/UX**
- **Radix UI** - Composants accessibles
- **Framer Motion** - Animations
- **Lucide React** - Icônes modernes
- **Headless UI** - Composants headless

## 📁 Structure du Projet

```
├── src/app/                 # Application Next.js (App Router)
├── prisma/                  # Schémas base de données
├── public/locales/          # Fichiers de traduction
├── docker-compose.*.yml     # Configuration Docker
├── .env.example            # Variables d'environnement
├── INSTALLATION-OUTILS.md  # Documentation installation
└── dev.sh                 # Script de développement
```

## 🔧 Configuration

### Variables d'Environnement Requises

Consultez `.env.example` pour la liste complète. Les principales :

```bash
# Base
NEXTAUTH_SECRET=your-secret
DATABASE_URL=postgresql://...

# APIs
OPENAI_API_KEY=sk-...
STRIPE_SECRET_KEY=sk_...
GOOGLE_CLOUD_CREDENTIALS=...
```

### Base de Données

```bash
# Première configuration
npx prisma generate
npx prisma db push

# Interface d'administration
npx prisma studio
```

## 🐳 Docker

### Développement
```bash
docker compose -f docker-compose.dev.yml up --build
```

### Production
```bash
docker compose -f docker-compose.prod.yml up --build
```

## 📊 Monitoring et Tests

- **Tests** : Jest + Testing Library
- **Linting** : ESLint + TypeScript
- **Analytics** : Google Analytics 4
- **Monitoring** : Logs intégrés

## 🔒 Sécurité

- **Rate Limiting** : Protection DDoS
- **Helmet** : Sécurisation en-têtes
- **JWT** : Tokens sécurisés
- **Hachage** : bcryptjs pour mots de passe

## 📚 Documentation

- [📖 Installation Complète](./INSTALLATION-OUTILS.md)
- [🔧 Configuration](./docs/configuration.md)
- [🚀 Déploiement](./docs/deployment.md)
- [🧪 Tests](./docs/testing.md)

## 🤝 Contribution

1. Fork le projet
2. Créer une branche (`git checkout -b feature/AmazingFeature`)
3. Commit (`git commit -m 'Add AmazingFeature'`)
4. Push (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📄 Licence

Distribué sous licence MIT. Voir `LICENSE` pour plus d'informations.

## 📞 Support

- **Issues** : [GitHub Issues](https://github.com/jplainard/IndoFrench/issues)
- **Discussions** : [GitHub Discussions](https://github.com/jplainard/IndoFrench/discussions)

---

**Développé avec ❤️ pour connecter les cultures indonésienne et française**
