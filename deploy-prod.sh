#!/bin/bash

# Script de déploiement production pour le site Indo-French
set -e

echo "🚀 Déploiement en production..."

# Configuration des variables d'environnement
export NODE_ENV=production
export POSTGRES_DB=${POSTGRES_DB:-indofrench}
export POSTGRES_USER=${POSTGRES_USER:-postgres}
export POSTGRES_PASSWORD=${POSTGRES_PASSWORD:-$(openssl rand -base64 32)}
export NEXTAUTH_SECRET=${NEXTAUTH_SECRET:-$(openssl rand -base64 32)}
export NEXTAUTH_URL=${NEXTAUTH_URL:-http://localhost:3000}

echo "📋 Variables d'environnement configurées"

# Vérifier que Docker est installé
if ! command -v docker &> /dev/null; then
    echo "❌ Docker n'est pas installé. Veuillez l'installer d'abord."
    exit 1
fi

if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose n'est pas installé. Veuillez l'installer d'abord."
    exit 1
fi

echo "✅ Docker et Docker Compose sont disponibles"

# Arrêter les conteneurs existants
echo "🛑 Arrêt des conteneurs existants..."
docker-compose -f docker-compose.prod.yml down --remove-orphans || true

# Nettoyer les images obsolètes
echo "🧹 Nettoyage des images obsolètes..."
docker system prune -f || true

# Construire les nouvelles images
echo "🔨 Construction des images..."
docker-compose -f docker-compose.prod.yml build --no-cache

# Démarrer les services
echo "🚀 Démarrage des services..."
docker-compose -f docker-compose.prod.yml up -d

# Attendre que la base de données soit prête
echo "⏳ Attente de la base de données..."
timeout 60 bash -c 'until docker-compose -f docker-compose.prod.yml exec -T db pg_isready -U $POSTGRES_USER -d $POSTGRES_DB; do sleep 2; done'

# Exécuter les migrations Prisma
echo "🗄️ Exécution des migrations de base de données..."
docker-compose -f docker-compose.prod.yml exec -T web npx prisma migrate deploy
docker-compose -f docker-compose.prod.yml exec -T web npx prisma db seed || echo "⚠️ Seeding optionnel échoué"

# Vérifier que les services sont en cours d'exécution
echo "🔍 Vérification des services..."
sleep 10

if docker-compose -f docker-compose.prod.yml ps | grep -q "Up"; then
    echo "✅ Services démarrés avec succès!"
    echo ""
    echo "🎉 Déploiement réussi – Site Indo-French en ligne."
    echo ""
    echo "� Application disponible :"
    echo "   - Web : http://localhost"
    echo "   - API : http://localhost/api"
    echo ""
    echo "🗄️ PostgreSQL :"
    echo "   - Host : localhost:5432"
    echo "   - Database : $POSTGRES_DB"
    echo "   - User : $POSTGRES_USER"
    echo ""
    echo "📊 Monitoring & utilitaires :"
    echo "   - Logs app : docker-compose -f docker-compose.prod.yml logs -f web"
    echo "   - Logs DB  : docker-compose -f docker-compose.prod.yml logs -f db"
    echo "   - Statut   : docker-compose -f docker-compose.prod.yml ps"
    echo "   - Stats    : docker stats"
    echo "   - Backup   : make backup"
    echo "   - Restore  : make restore"
    echo ""
    echo "🔑 Clés et secrets (sécurisez-les !) :"
    echo "   - POSTGRES_PASSWORD : $POSTGRES_PASSWORD"
    echo "   - NEXTAUTH_SECRET   : $NEXTAUTH_SECRET"
    echo "   - DATABASE_URL      : $DATABASE_URL"
    echo "   ⚠️ Sauvegardez ces clés de manière sécurisée!"
else
    echo "❌ Erreur lors du démarrage des services"
    echo "📋 Logs des erreurs:"
    docker-compose -f docker-compose.prod.yml logs
    exit 1
fi
