#!/bin/bash

# Script d'initialisation de la base de données pour Vercel
# Usage: ./init-vercel-db.sh

echo "🗄️ Initialisation de la base de données sur Vercel..."

# Vérifier que DATABASE_URL est configuré
if [ -z "$DATABASE_URL" ]; then
    echo "❌ ERROR: DATABASE_URL n'est pas configuré"
    echo "Configurez d'abord DATABASE_URL dans Vercel Dashboard"
    exit 1
fi

echo "✅ DATABASE_URL détecté"

# Pousser le schéma vers la base de données
echo "📤 Envoi du schéma Prisma vers la base de données..."
npx prisma db push

# Générer le client Prisma
echo "🔧 Génération du client Prisma..."
npx prisma generate

# Créer les rôles par défaut
echo "👥 Création des rôles utilisateur..."
node init-roles.js

echo "✅ Base de données initialisée avec succès !"
echo ""
echo "🚀 Prochaines étapes :"
echo "1. Faire un déploiement : vercel --prod"
echo "2. Tester le site"
