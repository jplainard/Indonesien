#!/bin/bash

# Script de validation des pages créées
# Vérifie que toutes les pages du footer existent

echo "🔍 Validation des pages IndoFrench..."
echo "======================================"

# Définir le répertoire des pages
PAGES_DIR="src/app"

# Liste des pages à vérifier
declare -a PAGES=(
    "about/page.tsx"
    "contact/page.tsx" 
    "pricing/page.tsx"
    "help/page.tsx"
    "enterprise/page.tsx"
    "careers/page.tsx"
    "news/page.tsx"
    "docs/page.tsx"
    "docs/api/page.tsx"
    "status/page.tsx"
    "privacy/page.tsx"
    "terms/page.tsx"
    "legal/page.tsx"
    "gdpr/page.tsx"
    "not-found.tsx"
    "error.tsx"
)

# Compteurs
FOUND=0
MISSING=0

echo "📄 Vérification des pages..."
echo ""

for page in "${PAGES[@]}"; do
    if [ -f "$PAGES_DIR/$page" ]; then
        echo "✅ $page"
        ((FOUND++))
    else
        echo "❌ $page - MANQUANT"
        ((MISSING++))
    fi
done

echo ""
echo "📊 Résultat de la validation"
echo "=========================="
echo "✅ Pages trouvées: $FOUND"
echo "❌ Pages manquantes: $MISSING"
echo "📈 Total vérifié: $((FOUND + MISSING))"

if [ $MISSING -eq 0 ]; then
    echo ""
    echo "🎉 VALIDATION RÉUSSIE!"
    echo "Toutes les pages sont présentes et le site est complet."
    echo ""
    echo "🚀 Actions suivantes recommandées:"
    echo "- Tester la navigation entre les pages"
    echo "- Vérifier le responsive design"
    echo "- Valider les formulaires de contact"
    echo "- Optimiser le contenu pour le SEO"
else
    echo ""
    echo "⚠️  Des pages sont manquantes."
    echo "Veuillez créer les pages manquantes avant de continuer."
fi

# Vérification des composants essentiels
echo ""
echo "🔧 Vérification des composants..."
echo "================================"

COMPONENTS=(
    "components/MainLayout.tsx"
    "components/Navigation.tsx"
    "components/Footer.tsx"
)

for component in "${COMPONENTS[@]}"; do
    if [ -f "src/$component" ]; then
        echo "✅ $component"
    else
        echo "❌ $component - MANQUANT"
    fi
done

echo ""
echo "🌐 Pour accéder au site:"
echo "========================"
echo "Local: http://localhost:3001"
echo "Ou lancez: npm run dev"
echo ""
