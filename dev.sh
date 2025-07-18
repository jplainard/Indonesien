#!/bin/bash

echo "🚀 Démarrage de l'environnement de développement..."

# Désactiver BuildKit pour contourner les problèmes potentiels de WSL
export DOCKER_BUILDKIT=0

# Arrêter les conteneurs existants pour éviter les conflits
docker compose -f docker-compose.dev.yml down --remove-orphans

# Démarrer les services en reconstruisant l'image
docker compose -f docker-compose.dev.yml up --build

# Pour arrêter, utilisez Ctrl+C
