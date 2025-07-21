#!/bin/bash

# Script pour migrer la base de données sur Vercel
echo "🚀 Migration de la base de données Vercel..."

# Charger les variables d'environnement
echo "📋 Chargement des variables d'environnement..."
if [ -f ".env.production" ]; then
    export $(grep -v '^#' .env.production | xargs)
    echo "✅ Variables d'environnement chargées"
else
    echo "❌ Fichier .env.production non trouvé"
    exit 1
fi

# Générer le client Prisma
echo "🔧 Génération du client Prisma..."
npx prisma generate

# Exécuter les migrations
echo "📦 Exécution des migrations..."
npx prisma db push --force-reset

# Vérifier les tables créées
echo "🔍 Vérification des tables créées..."
npx prisma db seed 2>/dev/null || echo "⚠️  Pas de seed configuré"

echo "✅ Migration terminée !"
echo "🌐 Vous pouvez maintenant tester votre site : https://indonesien.vercel.app"
