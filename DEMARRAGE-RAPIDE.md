# 🚀 Guide de Démarrage Rapide - IndoFrench

Ce guide vous permet de démarrer rapidement avec **IndoFrench**, la plateforme de traduction indonésien-français.

## 🎯 Démarrage Ultra-Rapide (Recommandé)

### Option 1 : Script Automatique
```bash
# 1. Cloner et accéder au projet
git clone https://github.com/jplainard/Indonesien.git
cd Indonesien

# 2. Démarrage automatique avec vérifications
./quick-start.sh --dev-local
```

**C'est tout !** 🎉 Votre application sera accessible sur http://localhost:3000

### Option 2 : Si vous avez des problèmes
```bash
# Diagnostic et réparation automatique
./scripts/fix-common-issues.sh --auto-repair

# Puis redémarrage
./quick-start.sh --dev-local
```

## 📋 Checklist de Configuration Détaillée

### ✅ Étape 1 : Prérequis Système
- [ ] Node.js 18.19.1+ installé
- [ ] Docker et Docker Compose installés
- [ ] Git configuré
- [ ] WSL activé (Windows uniquement)

### ✅ Étape 2 : Installation Manuelle (si nécessaire)
```bash
# 1. Cloner le repository
git clone https://github.com/jplainard/Indonesien.git
cd Indonesien

# 2. Installer les dépendances
npm install

# 3. Copier la configuration
cp .env.example .env.local
```

### ✅ Étape 3 : Configuration Environnement

Éditez `.env.local` avec vos valeurs :

#### 🔐 Authentification (Obligatoire)
```bash
JWT_SECRET="votre-secret-super-long-et-aleatoire"
NEXTAUTH_URL="http://localhost:3000"
```

#### 🗄️ Base de Données (Obligatoire)
```bash
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/indofrench"
```

#### 🤖 APIs de Traduction (Obligatoire pour traduction)
```bash
OPENAI_API_KEY="sk-votre-cle-openai"
GOOGLE_CLOUD_PROJECT_ID="votre-projet-gcp"
GOOGLE_CLOUD_CREDENTIALS="path/to/credentials.json"
```

#### 💳 Paiements (Optionnel en dev)
```bash
STRIPE_SECRET_KEY="sk_test_votre-cle-stripe"
STRIPE_PUBLISHABLE_KEY="pk_test_votre-cle-publique"
```

## 🛠️ Scripts de Démarrage Disponibles

### Scripts Principaux
```bash
# Démarrage automatique (RECOMMANDÉ)
./quick-start.sh --dev-local    # Mode développement local
./quick-start.sh --dev          # Mode développement Docker
./quick-start.sh --prod         # Mode production
./quick-start.sh --clean        # Nettoyage complet

# Scripts de maintenance
./scripts/dev-clean.sh          # Nettoyage développement
./scripts/dev-clean.sh --full   # Nettoyage complet avec node_modules
./scripts/fix-common-issues.sh  # Diagnostic et réparation
```

### Scripts Classiques
```bash
# Docker complet
./dev.sh                        # Développement avec Docker
./prod.sh                       # Production avec Docker

# Node.js local
npm run dev                     # Serveur de développement
npm run build                   # Build de production
npm run start                   # Serveur de production
```

### ✅ Étape 4 : Démarrage (Méthodes)

#### Option A : Démarrage Automatique (Recommandé)
```bash
./quick-start.sh --dev-local
```
✅ **Avantages** : Vérifications automatiques, stable, réparation d'erreurs

#### Option B : Docker Complet
```bash
./dev.sh
```
✅ **Avantages** : Environnement isolé, production-like

#### Option C : Node.js Local
```bash
# 1. Démarrer seulement la DB
docker-compose -f docker-compose.dev.yml up -d db

# 2. Configurer la DB
npx prisma db push
node init-roles.js

# 3. Démarrer Next.js
npm run dev
```
✅ **Avantages** : Plus rapide, debugging facile

### ✅ Étape 5 : Vérification du Fonctionnement

#### Tests Automatiques
```bash
# Vérification de l'état du système
curl http://localhost:3000/api/health

# Test de l'authentification
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"testpassword","name":"Test User"}'
```

#### Interface Web
Vérifiez que ces pages se chargent :
- [ ] http://localhost:3000 (Page d'accueil)
- [ ] http://localhost:3000/auth (Authentification)
- [ ] http://localhost:3000/dashboard (Tableau de bord)

## 🚨 En Cas de Problème

### Réparation Automatique
```bash
# Solution universelle
./scripts/fix-common-issues.sh --auto-repair
```

### Problèmes Courants

#### 1. Port déjà utilisé
```bash
# Trouver et tuer le processus
lsof -ti:3000 | xargs kill -9
# Ou utiliser le script
./scripts/fix-common-issues.sh --check-processes
```

#### 2. Erreurs de permissions
```bash
# Correction automatique
./scripts/fix-common-issues.sh --check-permissions
```

#### 3. Build corrompu
```bash
# Nettoyage complet
./scripts/dev-clean.sh --full
./quick-start.sh --dev-local
```

#### 4. Base de données inaccessible
```bash
# Vérification et redémarrage
./scripts/fix-common-issues.sh --check-database
```

## 🌐 Accès aux Services

Une fois démarré, vous aurez accès à :

### URLs Principales
- **🏠 Site Web** : http://localhost:3000
- **🔑 Authentification** : http://localhost:3000/auth
- **📊 Dashboard** : http://localhost:3000/dashboard
- **👤 Admin** : http://localhost:3000/admin
- **📤 Upload** : http://localhost:3000/upload

### APIs Disponibles
- **🏥 Health Check** : http://localhost:3000/api/health
- **🔐 Auth API** : http://localhost:3000/api/auth/*
- **👥 Users API** : http://localhost:3000/api/users
- **📈 Stats API** : http://localhost:3000/api/stats

### Services de Base
- **🗄️ PostgreSQL** : localhost:5432
- **🔍 Prisma Studio** : http://localhost:5555 (si lancé avec `npx prisma studio`)

## 🛠️ Commandes Essentielles

### Maintenance Quotidienne
```bash
# Démarrage journalier
./quick-start.sh --dev-local

# En cas de problème
./scripts/fix-common-issues.sh --auto-repair

# Nettoyage hebdomadaire
./scripts/dev-clean.sh --full
```

### Développement
```bash
# Logs en temps réel
docker-compose -f docker-compose.dev.yml logs -f

# Redémarrage services
docker-compose -f docker-compose.dev.yml restart

# Base de données
npx prisma studio              # Interface graphique
npx prisma db push            # Appliquer le schéma
node init-roles.js            # Initialiser les rôles
```

### Debugging
```bash
# Vérifier les processus
ps aux | grep next

# Vérifier les ports
lsof -i :3000
lsof -i :5432

# Logs Docker
docker-compose logs db
docker-compose logs web
```

## 📚 Ressources Utiles

### Documentation
- **[README.md](./README.md)** - Documentation complète
- **[TROUBLESHOOTING.md](./TROUBLESHOOTING.md)** - Guide de résolution de problèmes
- **[INSTALLATION-OUTILS.md](./INSTALLATION-OUTILS.md)** - Installation des outils

### Comptes de Test
Une fois l'application démarrée, vous pouvez créer des comptes via :
- Interface web : http://localhost:3000/auth
- API directe : `POST /api/auth/register`

### Scripts Utiles
```bash
# Créer des utilisateurs de test
node scripts/create-test-users.ts

# Debug d'authentification
node debug-login.js

# Test de la base de données
node test-db.mjs
```

## ✅ Checklist de Validation

Avant de commencer le développement, vérifiez :

- [ ] ✅ Le site se charge sur http://localhost:3000
- [ ] ✅ L'API health répond : http://localhost:3000/api/health
- [ ] ✅ Vous pouvez créer un compte sur /auth
- [ ] ✅ PostgreSQL est accessible
- [ ] ✅ Aucune erreur dans les logs

## 🎯 Prochaines Étapes

1. **Explorez l'interface** : Naviguez sur le site
2. **Créez un compte** : Testez l'authentification
3. **Consultez le code** : Familiarisez-vous avec la structure
4. **Lisez la doc** : Parcourez [README.md](./README.md) pour plus de détails

## 💡 Conseils de Productivité

- **Utilisez toujours** `./quick-start.sh --dev-local` pour démarrer
- **Nettoyez régulièrement** avec `./scripts/dev-clean.sh`
- **En cas de doute**, lancez `./scripts/fix-common-issues.sh --auto-repair`
- **Consultez** [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) pour les problèmes courants

---

🎉 **Félicitations !** Votre environnement IndoFrench est maintenant opérationnel !

Pour toute question, consultez la documentation ou créez une issue sur GitHub.
npm run dev          # Démarrage développement
npm run build        # Construction production
npm run start        # Serveur production
```

### Base de Données
```bash
npx prisma studio    # Interface graphique
npx prisma generate  # Régénérer le client
npx prisma db push   # Appliquer changements
```

### Qualité Code
```bash
npm run lint         # Vérification ESLint
npm test            # Tests Jest
npm run type-check  # Vérification TypeScript
```

### Docker
```bash
# Développement
docker compose -f docker-compose.dev.yml up --build

# Production
docker compose -f docker-compose.prod.yml up --build

# Arrêt
docker compose down
```

## 🔍 Vérification Installation

### ✅ Tests de Fonctionnement

1. **Site accessible** : http://localhost:3000 affiche la page d'accueil
2. **Base de données** : `docker ps` montre le conteneur PostgreSQL
3. **APIs** : Logs sans erreurs dans la console
4. **Build** : `npm run build` se termine sans erreur

### 🚨 Résolution Problèmes Courants

#### Port 3000 déjà utilisé
```bash
# Tuer le processus
lsof -ti:3000 | xargs kill -9

# Ou utiliser un autre port
PORT=3001 npm run dev
```

#### Erreurs Docker
```bash
# Nettoyer les conteneurs
docker compose down --volumes
docker system prune -a

# Redémarrer
./dev.sh
```

#### Erreurs de dépendances
```bash
# Nettoyer et réinstaller
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
```

#### Erreurs Prisma
```bash
# Réinitialiser
npx prisma generate
npx prisma db push --force-reset
```

## 📚 Documentation Complète

- **[📖 Installation Détaillée](./INSTALLATION-OUTILS.md)** - Guide complet des outils
- **[🔧 Configuration Avancée](./README.md)** - Toutes les options
- **[🐳 Docker Setup](./docker-compose.dev.yml)** - Configuration conteneurs

## 🆘 Support

Si vous rencontrez des problèmes :

1. Vérifiez les logs : `docker compose logs`
2. Consultez [INSTALLATION-OUTILS.md](./INSTALLATION-OUTILS.md)
3. Créez une issue sur GitHub

---

**⚡ En 5 minutes, vous devriez avoir un environnement fonctionnel !**

# Lancer le projet en développement

Pour démarrer l'environnement de développement avec Docker :

```bash
docker compose -f docker-compose.dev.yml up --build
```

Cela démarre :
- Le serveur Next.js en mode développement (hot reload)
- La base de données PostgreSQL

# Lancer le projet en production

Pour la production, utilisez :

```bash
docker compose -f docker-compose.prod.yml up --build
```

# Nettoyage

- Le fichier `docker-compose.simple.yml` a été supprimé car il faisait doublon avec la prod.
- Utilisez uniquement :
  - `docker-compose.dev.yml` pour le développement
  - `docker-compose.prod.yml` pour la production

# Astuce

Pour arrêter les conteneurs :

```bash
docker compose -f docker-compose.dev.yml down
```
