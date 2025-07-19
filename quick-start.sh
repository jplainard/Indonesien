#!/bin/bash

# 🚀 Script de démarrage rapide avec vérifications automatiques
# Usage: ./quick-start.sh [--dev|--prod|--clean]

set -e  # Arrêter le script en cas d'erreur

echo "🚀 IndoFrench - Démarrage rapide"
echo "================================="

# Fonction de nettoyage
cleanup() {
    echo "🧹 Nettoyage en cours..."
    pkill -f "next" 2>/dev/null || true
    docker-compose -f docker-compose.dev.yml down 2>/dev/null || true
}

# Piéger les signaux pour nettoyer en cas d'arrêt
trap cleanup EXIT INT TERM

# Mode de fonctionnement
MODE=${1:-"--dev"}

case "$MODE" in
    "--clean")
        echo "🧹 Nettoyage complet..."
        ./scripts/dev-clean.sh --full
        exit 0
        ;;
    "--prod")
        echo "🏭 Mode production"
        # Vérifications de production
        ./scripts/fix-common-issues.sh --auto-repair
        npm run build
        docker-compose -f docker-compose.prod.yml up --build
        ;;
    "--dev"|*)
        echo "💻 Mode développement"
        
        # Vérifications automatiques
        echo "🔍 Vérifications préalables..."
        ./scripts/fix-common-issues.sh --auto-repair
        
        # Démarrage en mode développement local
        echo "🚀 Démarrage du serveur de développement..."
        
        # Option 1: Développement local (sans Docker)
        if [ "$MODE" = "--dev-local" ]; then
            # Démarrer seulement la base de données
            docker-compose -f docker-compose.dev.yml up -d db
            
            # Attendre que la DB soit prête
            echo "⏳ Attente de PostgreSQL..."
            sleep 5
            
            # Vérifier la connexion à la DB
            npx prisma db push
            
            # Initialiser les rôles
            node init-roles.js 2>/dev/null || true
            
            # Démarrer Next.js localement
            npm run dev
        else
            # Option 2: Développement avec Docker
            ./dev.sh
        fi
        ;;
esac
