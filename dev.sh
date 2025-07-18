#!/bin/bash

echo "🚀 Démarrage de l'environnement de développement..."

# Arrêter les containers existants
docker compose -f docker-compose.dev.yml down

# Reconstruire et démarrer les containers
docker compose -f docker-compose.dev.yml up --build

# Pour arrêter, utilisez Ctrl+C
