# 🔧 Guide de Résolution des Problèmes Courants - IndoFrench

Ce guide présente les solutions définitives pour éviter les problèmes récurrents de développement et de production.

## 🚨 Problèmes Courants et Solutions

### 1. Erreurs de Permissions (EACCES)
**Problème :** `EACCES: permission denied, open '/app/.next/...`

**Solutions automatiques :**
```bash
# Réparation automatique complète
./scripts/fix-common-issues.sh --auto-repair

# Nettoyage complet du cache
./scripts/dev-clean.sh --full
```

### 2. Fichiers Corrompus dans .next
**Problème :** `ENOENT: no such file or directory, open '.next/server/app/page.js'`

**Solutions :**
```bash
# Nettoyage rapide
./scripts/dev-clean.sh

# Redémarrage propre
./quick-start.sh --clean
```

### 3. Processus Next.js Bloqués
**Problème :** Port déjà utilisé ou processus fantômes

**Solution automatique :**
```bash
./scripts/fix-common-issues.sh --check-processes
```

### 4. Problèmes de Base de Données
**Problème :** Connexion impossible à PostgreSQL

**Solution automatique :**
```bash
./scripts/fix-common-issues.sh --check-database
```

## 🚀 Scripts de Démarrage

### Développement Local (Recommandé)
```bash
# Démarrage avec vérifications automatiques
./quick-start.sh --dev-local

# Ou directement
npm run dev  # (après avoir lancé la DB)
```

### Développement avec Docker
```bash
./quick-start.sh --dev
# ou
./dev.sh
```

### Production
```bash
./quick-start.sh --prod
```

## 🔧 Scripts de Maintenance

### Nettoyage Quotidien
```bash
# Nettoyage léger (gardé les node_modules)
./scripts/dev-clean.sh

# Nettoyage complet (réinstalle tout)
./scripts/dev-clean.sh --full
```

### Diagnostic et Réparation
```bash
# Diagnostic complet automatique
./scripts/fix-common-issues.sh

# Vérifications spécifiques
./scripts/fix-common-issues.sh --check-permissions
./scripts/fix-common-issues.sh --check-database
./scripts/fix-common-issues.sh --check-processes
```

## 📦 Améliorations Apportées

### 1. Configuration Docker
- ✅ Utilisateur non-root (nextjs:1001)
- ✅ Permissions correctes automatiques
- ✅ Volumes avec cache optimisé
- ✅ Health checks pour PostgreSQL

### 2. Configuration Next.js
- ✅ Watch options pour WSL/Linux
- ✅ Cache management amélioré
- ✅ Build cleaning automatique

### 3. Scripts Automatiques
- ✅ Détection et réparation automatique des erreurs
- ✅ Nettoyage intelligent des caches
- ✅ Vérifications de santé système

### 4. Monitoring des Processus
- ✅ Détection des processus zombies
- ✅ Nettoyage automatique des ports
- ✅ Redémarrage intelligent

## 🎯 Workflow Recommandé

### Démarrage Quotidien
1. `./quick-start.sh --dev-local` (le plus stable)
2. Si problème : `./scripts/fix-common-issues.sh --auto-repair`
3. Si échec : `./scripts/dev-clean.sh && ./quick-start.sh --dev-local`

### En cas de Problème
1. **Ctrl+C** pour arrêter proprement
2. `./scripts/fix-common-issues.sh --auto-repair`
3. `./quick-start.sh --dev-local`

### Nettoyage Hebdomadaire
```bash
./scripts/dev-clean.sh --full
./quick-start.sh --dev-local
```

## 🚨 En Cas d'Urgence

### Reset Complet
```bash
# Arrêter tous les processus
pkill -f "next" || true
docker-compose -f docker-compose.dev.yml down

# Nettoyage complet
rm -rf .next node_modules
npm install
./quick-start.sh --dev-local
```

### Vérification de l'État
```bash
# Vérifier les processus actifs
ps aux | grep next

# Vérifier les ports utilisés
lsof -i :3000
lsof -i :5432

# Vérifier Docker
docker ps
```

## 💡 Conseils de Prévention

1. **Toujours utiliser** `./quick-start.sh` au lieu de `npm run dev` directement
2. **Arrêter proprement** avec Ctrl+C avant de fermer le terminal
3. **Nettoyer régulièrement** avec `./scripts/dev-clean.sh`
4. **Éviter** de modifier manuellement les fichiers dans `.next/`
5. **Utiliser** le mode développement local pour plus de stabilité

## 📞 Support

Si vous continuez à avoir des problèmes malgré ces solutions :

1. Exécutez `./scripts/fix-common-issues.sh` et partagez la sortie
2. Vérifiez les logs avec `docker-compose logs` si vous utilisez Docker
3. Consultez les logs Next.js dans le terminal

Ces solutions devraient éliminer définitivement les problèmes récurrents ! 🎉
