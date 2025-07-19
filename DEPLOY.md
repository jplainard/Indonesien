# 🚀 Guide de Déploiement en Production

## Prérequis

- Docker 20.10+
- Docker Compose 2.0+
- Make (optionnel, pour les raccourcis)

## Déploiement Rapide

### 1. Configuration des variables d'environnement

Copiez le fichier d'exemple et modifiez les valeurs :

```bash
cp .env.production.example .env.production
nano .env.production
```

### 2. Déploiement automatique

```bash
# Avec le script de déploiement
./deploy-prod.sh

# Ou avec Make
make prod
```

## Commandes de Gestion

### Avec Make (recommandé)

```bash
# Voir toutes les commandes disponibles
make help

# Démarrer en production
make prod

# Voir les logs
make prod-logs

# Arrêter les services
make prod-stop

# Vérifier l'état
make health

# Sauvegarder la base de données
make backup

# Nettoyer Docker
make clean
```

### Avec Docker Compose

```bash
# Démarrer
docker-compose -f docker-compose.prod.yml up -d

# Arrêter
docker-compose -f docker-compose.prod.yml down

# Voir les logs
docker-compose -f docker-compose.prod.yml logs -f

# Reconstruire
docker-compose -f docker-compose.prod.yml build --no-cache
```

## Services Déployés

### Application Web (Next.js)
- **Port:** 3000 (interne)
- **URL:** http://localhost (via Nginx)
- **Health Check:** `/api/health`

### Base de Données (PostgreSQL)
- **Port:** 5432
- **Database:** indofrench
- **User:** postgres

### Reverse Proxy (Nginx)
- **Port HTTP:** 80
- **Port HTTPS:** 443 (si SSL configuré)
- **Features:** Rate limiting, compression, sécurité

## Monitoring et Maintenance

### Vérification de l'état
```bash
# État des conteneurs
docker-compose -f docker-compose.prod.yml ps

# Logs en temps réel
docker-compose -f docker-compose.prod.yml logs -f web

# Utilisation des ressources
docker stats
```

### Sauvegarde

```bash
# Sauvegarde automatique
make backup

# Sauvegarde manuelle
docker-compose -f docker-compose.prod.yml exec db pg_dump -U postgres indofrench > backup.sql
```

### Restauration

```bash
# Avec Make
make restore

# Manuel
docker-compose -f docker-compose.prod.yml exec -T db psql -U postgres -d indofrench < backup.sql
```

## Mise à jour

```bash
# 1. Sauvegarder
make backup

# 2. Arrêter les services
make prod-stop

# 3. Mettre à jour le code
git pull origin main

# 4. Redéployer
make prod
```

## Sécurité

### Variables d'environnement sensibles
- `POSTGRES_PASSWORD`: Mot de passe de la base de données
- `NEXTAUTH_SECRET`: Clé secrète pour l'authentification
- Générez des mots de passe forts avec : `openssl rand -base64 32`

### SSL/TLS (recommandé pour la production)
1. Placez vos certificats dans le dossier `ssl/`
2. Modifiez `nginx.conf` pour activer HTTPS
3. Redémarrez les services

### Firewall
```bash
# Autoriser seulement les ports nécessaires
sudo ufw allow 80
sudo ufw allow 443
sudo ufw enable
```

## Dépannage

### Conteneur qui ne démarre pas
```bash
# Voir les logs détaillés
docker-compose -f docker-compose.prod.yml logs web

# Reconstruire sans cache
docker-compose -f docker-compose.prod.yml build --no-cache web
```

### Problèmes de base de données
```bash
# Vérifier la connectivité
docker-compose -f docker-compose.prod.yml exec db pg_isready -U postgres

# Accéder à la console PostgreSQL
docker-compose -f docker-compose.prod.yml exec db psql -U postgres -d indofrench
```

### Nettoyage en cas de problème
```bash
# Arrêter tout
docker-compose -f docker-compose.prod.yml down -v

# Nettoyer complètement
make clean

# Redéployer
make prod
```

## Performance

### Optimisations appliquées
- ✅ Build multi-stage Docker
- ✅ Compression Gzip
- ✅ Cache des assets statiques
- ✅ Rate limiting
- ✅ Health checks
- ✅ Utilisateur non-root
- ✅ Optimisations PostgreSQL

### Monitoring recommandé
- Grafana + Prometheus
- Sentry pour le monitoring d'erreurs
- Logs centralisés avec ELK stack

## Scalabilité

Pour scaler l'application :

```bash
# Augmenter le nombre d'instances web
docker-compose -f docker-compose.prod.yml up -d --scale web=3
```

Note: Nginx fait automatiquement du load balancing entre les instances.
