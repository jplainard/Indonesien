#!/bin/bash

# 🧹 Script de nettoyage pour développement - IndoFrench
# Résout les problèmes de permissions et builds corrompus

echo "🧹 Nettoyage de l'environnement de développement..."

# Arrêter tous les processus Next.js en cours
echo "🛑 Arrêt des processus Next.js..."
pkill -f "next dev" 2>/dev/null || true
pkill -f "next build" 2>/dev/null || true
pkill -f "next start" 2>/dev/null || true

# Attendre que les processus se terminent
sleep 2

# Nettoyer les dossiers de build
echo "🗂️ Suppression des dossiers de build..."
rm -rf .next 2>/dev/null || true
rm -rf out 2>/dev/null || true
rm -rf dist 2>/dev/null || true

# Nettoyer le cache npm
echo "📦 Nettoyage du cache npm..."
npm cache clean --force 2>/dev/null || true

# Nettoyer node_modules si nécessaire (optionnel)
if [ "$1" = "--full" ]; then
    echo "🗂️ Suppression complète de node_modules..."
    rm -rf node_modules
    rm -rf package-lock.json
    echo "📦 Réinstallation des dépendances..."
    npm install
fi

# Fixer les permissions
echo "🔧 Correction des permissions..."
find . -type f -name "*.js" -o -name "*.ts" -o -name "*.tsx" -o -name "*.json" | xargs chmod 644 2>/dev/null || true
find . -type d | xargs chmod 755 2>/dev/null || true
chmod +x scripts/*.sh 2>/dev/null || true

# Créer les dossiers nécessaires avec les bonnes permissions
mkdir -p .next/cache 2>/dev/null || true
chmod 755 .next 2>/dev/null || true
chmod 755 .next/cache 2>/dev/null || true

echo "✅ Nettoyage terminé!"
echo "🚀 Vous pouvez maintenant lancer: npm run dev"
