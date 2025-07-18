# Indonesien

Ce projet est un site web moderne proposant des services de traduction indonésien-français pour le monde de l'entreprise et le grand public.

## Technologies
- Next.js (React, TypeScript)
- Tailwind CSS
- Docker
- PostgreSQL
- GitHub (versionnage)

## Installation

1. Clonez le repository
```bash
git clone https://github.com/jplainard/Indonesien.git
cd Indonesien
```

2. Installez les dépendances
```bash
npm install
```

## Lancement du projet

### Avec Docker

#### Mode Développement
```bash
./dev.sh
```
L'application sera accessible sur http://localhost:3000

#### Mode Production
```bash
./prod.sh
```

### Sans Docker
```bash
npm run dev
```

## Objectif
Proposer une plateforme innovante et professionnelle pour la traduction entre l'indonésien et le français, adaptée aux besoins des entreprises et des particuliers.

# 🇮🇩↔️🇫🇷 IndoFrench - Traduction Professionnelle

**IndoFrench** est une plateforme moderne de traduction professionnelle entre l'indonésien et le français, développée avec Next.js 15, React 19, et les dernières technologies web.

## ✨ Fonctionnalités

- **🌐 Traduction Professionnelle** : Services IA avancés (OpenAI, Google Cloud)
- **🔐 Authentification Sécurisée** : NextAuth v5 avec Prisma
- **💳 Paiements Intégrés** : Stripe et PayPal
- **📄 Génération PDF** : Documents automatisés
- **🎨 Interface Moderne** : Tailwind CSS 4, Framer Motion, Radix UI
- **📊 Analytique** : Google Analytics intégré
- **🌍 Multilingue** : Support FR/ID/EN complet
- **🐳 Docker Ready** : Conteneurisation complète

## 🚀 Démarrage Rapide

### Prérequis
- Node.js 18.19.1+ 
- Docker & Docker Compose
- PostgreSQL 16

### Installation

1. **Cloner le projet**
```bash
git clone https://github.com/jplainard/IndoFrench.git
cd IndoFrench
```

2. **Installer les dépendances**
```bash
npm install --legacy-peer-deps
```

3. **Configuration environnement**
```bash
cp .env.example .env.local
# Éditer .env.local avec vos clés API
```

4. **Démarrer l'environnement de développement**
```bash
./dev.sh
# ou
npm run dev
```

5. **Accéder à l'application**
- Site web : [http://localhost:3000](http://localhost:3000)
- Base de données : [http://localhost:5432](http://localhost:5432)

## 📋 Scripts Disponibles

```bash
# Développement
npm run dev          # Démarrage avec Turbopack
./dev.sh            # Démarrage Docker complet

# Production
npm run build       # Construction optimisée
npm run start       # Serveur production

# Qualité
npm run lint        # Linting ESLint
npm test           # Tests Jest

# Base de données
npx prisma generate  # Génération client
npx prisma studio   # Interface admin
npx prisma db push  # Migration
```

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
