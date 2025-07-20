# 🔧 Guide de Maintenance - IndoFrench

Ce guide documente tous les scripts et outils de maintenance pour garantir le bon fonctionnement de l'application IndoFrench en développement et production.

## 📋 Vue d'Ensemble des Scripts

### 🚀 Scripts de Démarrage
| Script | Description | Usage |
|--------|-------------|-------|
| `quick-start.sh` | Démarrage intelligent avec vérifications | **Recommandé pour usage quotidien** |
| `dev.sh` | Démarrage Docker complet | Pour environnement isolé |
| `prod.sh` | Démarrage production | Pour déploiement |

### 🧹 Scripts de Maintenance
| Script | Description | Fréquence |
|--------|-------------|-----------|
| `scripts/dev-clean.sh` | Nettoyage environnement dev | Quotidien en cas de problème |
| `scripts/fix-common-issues.sh` | Diagnostic et réparation | Automatique ou à la demande |
| `init-roles.js` | Initialisation des rôles DB | Une fois ou après reset DB |

## 🔄 Tâches de Maintenance Régulières

### Quotidiennes ⏰
- [ ] Vérification des logs d'erreur dans `/var/log/` et Docker
- [ ] Monitoring des performances via le dashboard admin
- [ ] Backup automatique de la base de données
- [ ] Vérification de l'espace disque disponible
- [ ] Contrôle des nouvelles pages (404, erreurs)
- [ ] Test rapide des formulaires de contact
- [ ] Monitoring du dashboard admin accessible

### Hebdomadaires 📅
- [ ] Mise à jour des dépendances non-critiques avec `npm update`
- [ ] Nettoyage des fichiers temporaires et uploads anciens
- [ ] Vérification des certificats SSL et HTTPS
- [ ] Test des sauvegardes avec restauration partielle
- [ ] Test des nouveaux composants (Footer, Navigation enrichie)
- [ ] Vérification des animations Framer Motion sur toutes les pages
- [ ] Contrôle responsive design et compatibilité mobile

### Mensuelles 🗓️
- [ ] Audit de sécurité complet et mise à jour des packages
- [ ] Optimisation et analyse des performances de la base de données
- [ ] Audit de performance avec Lighthouse et GTmetrix
- [ ] Vérification approfondie des logs de sécurité
- [ ] Test complet des pages nouvellement créées (about, contact, pricing, etc.)
- [ ] Optimisation des images et assets statiques
- [ ] Audit UX/UI des nouvelles fonctionnalités avec tests utilisateurs

## 🚀 Scripts de Démarrage Détaillés

### 1. quick-start.sh - Script Principal

**Le script recommandé pour tous les usages quotidiens.**

```bash
# Usage de base
./quick-start.sh --dev-local    # Développement local (recommandé)
./quick-start.sh --dev          # Développement Docker
./quick-start.sh --prod         # Production
./quick-start.sh --clean        # Nettoyage complet
```

#### Fonctionnalités
- ✅ **Vérifications préalables** automatiques
- ✅ **Réparation d'erreurs** avant démarrage
- ✅ **Gestion de la base de données** automatique
- ✅ **Initialisation des rôles** si nécessaire
- ✅ **Choix du mode** (local, Docker, production)

#### Workflow Interne
1. Diagnostic de l'environnement
2. Nettoyage des processus existants
3. Vérification/correction des permissions
4. Démarrage PostgreSQL si nécessaire
5. Configuration de la base de données
6. Lancement de l'application

### 2. dev.sh - Docker Complet

```bash
./dev.sh [--clean]              # Avec nettoyage optionnel
```

#### Fonctionnalités
- ✅ **Environnement Docker** complet
- ✅ **Reconstruction automatique** des images
- ✅ **Gestion des conflits** de ports
- ✅ **Variables d'environnement** automatiques

### 3. prod.sh - Production

```bash
./prod.sh
```

#### Fonctionnalités
- ✅ **Optimisations production** activées
- ✅ **SSL/TLS** configuré
- ✅ **Monitoring** intégré
- ✅ **Backup automatique** de la DB

## 🧹 Scripts de Nettoyage

### 1. scripts/dev-clean.sh

**Script de nettoyage de l'environnement de développement.**

```bash
# Nettoyage standard
./scripts/dev-clean.sh

# Nettoyage complet (avec node_modules)
./scripts/dev-clean.sh --full
```

#### Actions Effectuées
- 🛑 **Arrêt des processus** Next.js en cours
- 🗂️ **Suppression des dossiers** de build (.next, out, dist)
- 📦 **Nettoyage du cache** npm
- 🔧 **Correction des permissions** automatique
- 📁 **Création des dossiers** nécessaires
- 🔄 **Réinstallation** des dépendances (mode --full)

#### Cas d'Usage
- **Quotidien** : Après changements importants de code
- **Hebdomadaire** : Nettoyage préventif
- **En cas d'erreur** : Build corrompu, permissions fausses

### 2. Nettoyage Manuel Avancé

```bash
# Nettoyage Docker complet
docker system prune -a
docker volume prune

# Reset complet du projet
rm -rf node_modules .next out dist
npm install
```

## 🔧 Scripts de Diagnostic et Réparation

### 1. scripts/fix-common-issues.sh

**Script intelligent de diagnostic et réparation automatique.**

```bash
# Réparation automatique complète
./scripts/fix-common-issues.sh --auto-repair

# Vérifications spécifiques
./scripts/fix-common-issues.sh --check-permissions
./scripts/fix-common-issues.sh --check-database
./scripts/fix-common-issues.sh --check-processes
```

#### Diagnostics Effectués

##### 🔍 Vérification des Processus
- Détection des processus Next.js zombies
- Nettoyage automatique des ports occupés
- Arrêt propre des services

##### 🔒 Vérification des Permissions
- Contrôle des permissions sur .next/
- Correction automatique des fichiers de config
- Réparation des permissions de scripts

##### 🗄️ Vérification de la Base de Données
- Test de connectivité PostgreSQL
- Démarrage automatique si arrêtée
- Vérification de l'état des conteneurs

##### 📦 Vérification des Dépendances
- Contrôle de l'existence de node_modules/
- Vérification du client Prisma
- Installation automatique si manquant

#### Messages de Sortie
- 🟢 **Vert** : Tout fonctionne
- 🟡 **Jaune** : Problème détecté et corrigé
- 🔴 **Rouge** : Erreur nécessitant intervention

### 2. Scripts de Test de Santé

```bash
# Test de l'authentification
node debug-login.js

# Test de la base de données
node test-db.mjs

# Test des APIs
curl http://localhost:3000/api/health
```

## 🗄️ Scripts de Base de Données

### 1. init-roles.js

**Initialisation des rôles utilisateur dans la base de données.**

```bash
node init-roles.js
```

#### Rôles Créés
- **utilisateur** (ID: 1) - Utilisateur standard
- **premium** (ID: 2) - Utilisateur premium
- **traducteur** (ID: 3) - Traducteur professionnel
- **moderateur** (ID: 4) - Modérateur de contenu
- **admin** (ID: 5) - Administrateur système

### 2. Scripts Prisma

```bash
# Génération du client
npx prisma generate

# Synchronisation du schéma
npx prisma db push

# Interface graphique
npx prisma studio

# Migration (production)
npx prisma migrate deploy
```

### 3. Backup et Restore

```bash
# Backup de la base de données
docker exec indonesien-db-1 pg_dump -U postgres indofrench > backup.sql

# Restore de la base de données
docker exec -i indonesien-db-1 psql -U postgres indofrench < backup.sql
```

## 📊 Monitoring et Logs

### 1. Surveillance des Processus

```bash
# Processus actifs
ps aux | grep -E "(next|node|docker)"

# Ports utilisés
lsof -i :3000
lsof -i :5432

# Utilisation des ressources
docker stats
```

### 2. Logs de Développement

```bash
# Logs en temps réel
docker-compose -f docker-compose.dev.yml logs -f

# Logs spécifiques
docker-compose -f docker-compose.dev.yml logs web
docker-compose -f docker-compose.dev.yml logs db

# Logs Next.js
tail -f .next/trace
```

### 3. Analyse des Erreurs

```bash
# Recherche d'erreurs dans les logs
grep -r "Error\|Exception" .next/
grep -r "EACCES\|ENOENT" .next/

# Vérification de l'intégrité
npm audit
docker system events
```

## 🚨 Procédures d'Urgence

### 1. Reset Complet du Projet

```bash
# 1. Arrêter tous les services
pkill -f "next"
docker-compose -f docker-compose.dev.yml down

# 2. Nettoyage complet
./scripts/dev-clean.sh --full

# 3. Reset Docker
docker system prune -a
docker volume prune

# 4. Redémarrage propre
./quick-start.sh --dev-local
```

### 2. Problèmes de Permissions Critiques

```bash
# Solution d'urgence
sudo chown -R $USER:$USER .
chmod -R 755 .
chmod +x scripts/*.sh
chmod +x *.sh

# Puis redémarrage
./quick-start.sh --dev-local
```

### 3. Base de Données Corrompue

```bash
# 1. Arrêter la DB
docker-compose -f docker-compose.dev.yml stop db

# 2. Supprimer le volume (ATTENTION: perte de données)
docker volume rm indonesien_pgdata_dev

# 3. Redémarrer
./quick-start.sh --dev-local
```

## 📅 Planning de Maintenance

### Quotidien
- [ ] Vérifier l'état avec `./scripts/fix-common-issues.sh`
- [ ] Démarrer avec `./quick-start.sh --dev-local`

### Hebdomadaire
- [ ] Nettoyage complet : `./scripts/dev-clean.sh --full`
- [ ] Vérification des logs d'erreur
- [ ] Mise à jour des dépendances : `npm update`

### Mensuel
- [ ] Backup de la base de données
- [ ] Nettoyage Docker : `docker system prune -a`
- [ ] Audit de sécurité : `npm audit`
- [ ] Vérification des performances

## 🎯 Bonnes Pratiques

### Pour le Développement
1. **Toujours utiliser** `./quick-start.sh --dev-local` pour démarrer
2. **Nettoyer régulièrement** avec `./scripts/dev-clean.sh`
3. **En cas de doute**, lancer `./scripts/fix-common-issues.sh --auto-repair`
4. **Arrêter proprement** avec Ctrl+C

### Pour la Production
1. **Toujours tester** en local avant déploiement
2. **Utiliser** `./prod.sh` pour les déploiements
3. **Surveiller** les logs en continu
4. **Backup régulier** de la base de données

### Pour le Débogage
1. **Consulter** [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) en premier
2. **Utiliser** les scripts de diagnostic avant intervention manuelle
3. **Documenter** les nouveaux problèmes rencontrés
4. **Partager** les solutions avec l'équipe

## 📞 Support et Escalade

### Niveaux de Support
1. **Niveau 1** : Scripts automatiques (`fix-common-issues.sh`)
2. **Niveau 2** : Nettoyage complet (`dev-clean.sh --full`)
3. **Niveau 3** : Reset complet du projet
4. **Niveau 4** : Intervention manuelle ou support technique

### Ressources d'Aide
- **Documentation** : [README.md](./README.md), [TROUBLESHOOTING.md](./TROUBLESHOOTING.md)
- **Logs** : Toujours inclure les logs dans les rapports de bug
- **GitHub Issues** : Pour les problèmes récurrents
- **Documentation en ligne** : docs.indofrench.com

---

**Maintenu par l'équipe IndoFrench** - Version 1.0.0
