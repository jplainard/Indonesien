# 📜 Guide des Scripts - IndoFrench

## Vue d'ensemble

Ce document liste tous les scripts disponibles dans le projet IndoFrench, leurs usages et leurs paramètres.

## 🚀 Scripts de Déploiement

### Script Vercel Principal
```bash
./vercel-deploy.sh [preview|production]
```

**Fonctionnalités :**
- ✅ Vérification automatique des prérequis
- ✅ Installation automatique de Vercel CLI si nécessaire
- ✅ Authentification Vercel
- ✅ Build de vérification local
- ✅ Corrections ESLint automatiques
- ✅ Déploiement sécurisé avec confirmations
- ✅ Informations post-déploiement

**Exemples :**
```bash
# Déploiement preview
./vercel-deploy.sh preview

# Déploiement production
./vercel-deploy.sh production

# Ou via npm
npm run vercel:deploy    # preview
npm run vercel:prod      # production
```

### Scripts Docker
```bash
# Développement
./dev.sh

# Production
./deploy-prod.sh
./prod.sh
```

## 🛠️ Scripts de Développement

### Démarrage Rapide
```bash
./quick-start.sh [--dev-local|--dev|--prod|--clean]
```

**Options :**
- `--dev-local` : Développement local sans Docker
- `--dev` : Développement avec Docker
- `--prod` : Production avec Docker
- `--clean` : Nettoyage avant démarrage

### Scripts de Maintenance et Diagnostic

#### `scripts/dev-clean.sh`
**Nettoyage de l'environnement de développement**
```bash
# Nettoyage standard
./scripts/dev-clean.sh

# Nettoyage complet avec réinstallation
./scripts/dev-clean.sh --full
```

**Actions effectuées :**
- Arrêt des processus Next.js
- Suppression des dossiers de build (.next, out, dist, .vercel)
- Nettoyage des caches (npm, TypeScript)
- Correction des permissions
- Réinstallation des dépendances (mode --full)

#### `scripts/fix-common-issues.sh`
**Diagnostic et réparation automatique**
```bash
# Diagnostic complet automatique
./scripts/fix-common-issues.sh

# Vérifications spécifiques
./scripts/fix-common-issues.sh --check-permissions
./scripts/fix-common-issues.sh --check-database
./scripts/fix-common-issues.sh --check-processes
./scripts/fix-common-issues.sh --check-vercel
./scripts/fix-common-issues.sh --check-environment
```

**Vérifications effectuées :**
- ✅ Processus en cours
- ✅ Permissions des fichiers
- ✅ Dépendances npm
- ✅ Base de données PostgreSQL
- ✅ Variables d'environnement
- ✅ Configuration Vercel

#### `scripts/run-script.sh`
**Lanceur de scripts TypeScript**
```bash
# Exécuter un script spécifique
./scripts/run-script.sh init-roles
./scripts/run-script.sh create-test-users
./scripts/run-script.sh test-auth

# Afficher l'aide
./scripts/run-script.sh --help
```

### Scripts TypeScript (Database)

#### `scripts/init-roles.ts`
Initialise les rôles utilisateur dans la base de données.

#### `scripts/create-test-users.ts`
Crée des utilisateurs de test pour chaque rôle.

#### `scripts/test-auth.ts`
Teste le système d'authentification.

### Nettoyage et Maintenance
```bash
# Nettoyage de développement
./scripts/dev-clean.sh [--full]

# Réparation automatique
./scripts/fix-common-issues.sh [--auto-repair]
```

**Fonctionnalités dev-clean.sh :**
- Suppression des caches Node.js et Next.js
- Nettoyage des modules temporaires
- Reset des permissions
- Option `--full` pour nettoyage complet

**Fonctionnalités fix-common-issues.sh :**
- Diagnostic automatique des problèmes
- Réparation des erreurs courantes
- Vérification des dépendances
- Correction des permissions

## 📦 Scripts NPM

### Développement
```bash
npm run dev              # Serveur de développement
npm run build           # Build de production
npm run start           # Serveur de production
npm run lint            # ESLint
npm run lint --fix      # ESLint avec corrections
npm run type-check      # Vérification TypeScript
```

### Base de Données
```bash
npm run db:generate     # Générer le client Prisma
npm run db:push         # Synchroniser le schéma
npm run db:studio       # Interface Prisma Studio
npm run db:migrate      # Migrations de développement
npm run db:reset        # Reset complet de la DB
npm run db:seed         # Initialiser les rôles
```

### Tests et Qualité
```bash
npm run test            # Tests Jest
npm run test:watch      # Tests en mode watch
npm run test:coverage   # Coverage des tests
npm run format          # Formatage Prettier
npm run format:check    # Vérification formatage
npm run audit:security  # Audit de sécurité npm
```

### Vercel
```bash
npm run vercel:install  # Installation CLI Vercel
npm run vercel:setup    # Configuration initiale
npm run vercel:deploy   # Déploiement preview
npm run vercel:prod     # Déploiement production
npm run vercel:env      # Gestion variables d'env
npm run vercel:logs     # Logs de déploiement
npm run pre-deploy      # Vérifications pré-déploiement
```

### Docker
```bash
npm run docker:dev      # Container de développement
npm run docker:prod     # Container de production
```

### Maintenance
```bash
npm run clean           # Nettoyage léger
npm run clean:full      # Nettoyage complet
npm run fix             # Réparations automatiques
npm run quick-start     # Démarrage intelligent
```

## 🧪 Scripts de Test

### Scripts de Test API
```bash
# Test d'upload de fichiers
./test-upload.sh

# Test d'authentification
node test-auth-api.mjs

# Test de base de données
node test-db.mjs

# Assignation de tests
./test-assign.sh
```

### Scripts d'Initialisation
```bash
# Créer des utilisateurs de test
node create-test-users.js
node scripts/create-test-users.ts

# Initialiser les rôles
node init-roles.js
node scripts/init-roles.ts

# Test d'authentification
node scripts/test-auth.ts
```

## 🔧 Scripts de Configuration

### Validation des Pages
```bash
./validate-pages.sh
```
Vérifie que toutes les pages sont accessibles et fonctionnelles.

### Scripts de Debug
```bash
# Debug de connexion
node debug-login.js

# Test simple
./test-simple.sh  # (si disponible)
```

## 📋 Ordre Recommandé d'Utilisation

### Premier démarrage
```bash
1. git clone https://github.com/jplainard/Indonesien.git
2. cd Indonesien
3. npm install
4. ./quick-start.sh --dev-local
```

### Développement quotidien
```bash
1. npm run dev                    # Démarrer le serveur
2. npm run lint                   # Vérifier le code
3. npm run test                   # Lancer les tests
4. git add . && git commit        # Commit des changements
```

### Avant déploiement
```bash
1. npm run pre-deploy            # Vérifications complètes
2. npm run vercel:deploy         # Test en preview
3. npm run vercel:prod           # Déploiement production
```

### En cas de problème
```bash
1. ./scripts/fix-common-issues.sh --auto-repair
2. ./scripts/dev-clean.sh --full
3. ./quick-start.sh --clean
```

## 🚨 Dépannage

### Erreurs Courantes

**"Command not found"**
```bash
chmod +x ./script-name.sh
```

**"Permission denied"**
```bash
sudo chmod +x scripts/*.sh
chmod +x *.sh
```

**"Module not found"**
```bash
npm run clean:full
npm install
npm run db:generate
```

**"Database connection error"**
```bash
npm run db:push
npm run db:seed
```

## 📝 Logs et Debug

### Localisation des logs
- **Scripts shell** : Sortie console directe
- **Scripts npm** : `npm run script-name --verbose`
- **Vercel** : `npm run vercel:logs`
- **Docker** : `docker logs container-name`

### Mode Debug
```bash
# Variables d'environnement pour debug
DEBUG=1 ./script-name.sh
NODE_ENV=development npm run command
```

---

**Documentation maintenue par** : L'équipe de développement IndoFrench  
**Dernière mise à jour** : 24 juillet 2025
