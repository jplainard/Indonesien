#!/bin/bash

# Script de déploiement Vercel pour IndoFrench
# Usage: ./deploy-vercel.sh [--production]

set -e

echo "🚀 Déploiement IndoFrench sur Vercel"

# Vérification des prérequis
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI n'est pas installé"
    echo "Installez-le avec: npm i -g vercel"
    exit 1
fi

# Vérification des dépendances
echo "📦 Vérification des dépendances..."
npm ci

# Génération des types Prisma
echo "🔧 Génération des types Prisma..."
npx prisma generate

# Build de test en local
echo "🏗️ Test du build..."
npm run build

# Déploiement
if [ "$1" = "--production" ]; then
    echo "🌍 Déploiement en production..."
    vercel --prod
else
    echo "🧪 Déploiement de test..."
    vercel
fi

echo "✅ Déploiement terminé !"
echo ""
echo "📋 Prochaines étapes :"
echo "1. Configurez les variables d'environnement dans le dashboard Vercel"
echo "2. Configurez votre base de données PostgreSQL"
echo "3. Testez votre application"
echo ""
echo "💡 Variables d'environnement requises :"
echo "   - DATABASE_URL"
echo "   - NEXTAUTH_SECRET"
echo "   - NEXTAUTH_URL"
echo "   - API keys pour les services de traduction"
