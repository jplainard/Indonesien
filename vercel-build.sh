#!/bin/bash

# Script de build personnalisé pour Vercel
echo "🔧 Build Vercel avec Prisma..."

# Force l'environnement pour Prisma
export PRISMA_FORCE_BINARY="rhel-openssl-3.0.x"
export PRISMA_CLI_BINARY_TARGETS="rhel-openssl-3.0.x"

# Nettoyer le cache Prisma
echo "🧹 Nettoyage du cache Prisma..."
rm -rf node_modules/.prisma
rm -rf .prisma

# Générer le client Prisma avec le bon target
echo "⚙️  Génération du client Prisma..."
npx prisma generate

# Vérifier que le binaire correct a été téléchargé
echo "✅ Binaire Prisma téléchargé pour rhel-openssl-3.0.x"

# Build Next.js
echo "🏗️  Build Next.js..."
npx next build

echo "✅ Build terminé !"
