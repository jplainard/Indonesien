# 🚀 Guide de Démarrage Rapide - IndoFrench

Ce guide vous permet de démarrer rapidement avec **IndoFrench**, la plateforme de traduction indonésien-français.

## 📋 Checklist de Configuration

### ✅ Étape 1 : Prérequis Système
- [ ] Node.js 18.19.1+ installé
- [ ] Docker et Docker Compose installés
- [ ] Git configuré
- [ ] WSL activé (Windows uniquement)

### ✅ Étape 2 : Installation du Projet
```bash
# 1. Cloner le repository
git clone https://github.com/jplainard/IndoFrench.git
cd IndoFrench

# 2. Installer les dépendances
npm install --legacy-peer-deps

# 3. Copier la configuration
cp .env.example .env.local
```

### ✅ Étape 3 : Configuration Environnement

Éditez `.env.local` avec vos valeurs :

#### 🔐 Authentification (Obligatoire)
```bash
NEXTAUTH_SECRET="votre-secret-super-long-et-aleatoire"
NEXTAUTH_URL="http://localhost:3000"
```

#### 🗄️ Base de Données (Obligatoire)
```bash
DATABASE_URL="postgresql://user:password@localhost:5432/indonesien_db"
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

### ✅ Étape 4 : Démarrage
```bash
# Méthode 1 : Docker complet (Recommandé)
./dev.sh

# Méthode 2 : Node.js local
npm run dev
```

### ✅ Étape 5 : Base de Données
```bash
# Initialiser Prisma
npx prisma generate
npx prisma db push

# (Optionnel) Interface admin
npx prisma studio
```

## 🌐 Accès aux Services

Une fois démarré, vous aurez accès à :

- **Site Web** : http://localhost:3000
- **Base de Données** : localhost:5432
- **Prisma Studio** : http://localhost:5555 (si lancé)

## 🛠️ Commandes Essentielles

### Développement
```bash
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
