#!/bin/bash

echo "🚀 Démarrage de l'environnement de production..."

# Arrêter les containers existants
docker compose -f docker-compose.prod.yml down

# Reconstruire et démarrer les containers en mode détaché
docker compose -f docker-compose.prod.yml up --build -d

echo "✅ L'application est démarrée en mode production"
echo "Pour voir les logs: docker compose -f docker-compose.prod.yml logs -f"
echo "Pour arrêter: docker compose -f docker-compose.prod.yml down"
