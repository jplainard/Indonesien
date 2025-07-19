#!/bin/bash

echo "🚀 Démarrage de l'environnement de développement..."

# Fonction de nettoyage en cas d'erreur
cleanup_on_error() {
    echo "❌ Erreur détectée, nettoyage automatique..."
    ./scripts/dev-clean.sh
    exit 1
}

# Piéger les erreurs
trap cleanup_on_error ERR

# Nettoyer d'abord si nécessaire
if [ "$1" = "--clean" ]; then
    echo "🧹 Nettoyage préalable..."
    ./scripts/dev-clean.sh
fi

# Désactiver BuildKit pour contourner les problèmes potentiels de WSL
export DOCKER_BUILDKIT=0

# Arrêter les conteneurs existants pour éviter les conflits
docker compose -f docker-compose.dev.yml down --remove-orphans

# Démarrer les services en reconstruisant l'image
docker compose -f docker-compose.dev.yml up --build

# Pour arrêter, utilisez Ctrl+C
