#!/bin/bash

# 🚀 Lanceur de scripts TypeScript - IndoFrench
# Exécute les scripts TypeScript avec ts-node

# Couleurs pour les messages
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

SCRIPT_DIR="/home/pilou/Indonesien/scripts"

echo "🚀 Lanceur de scripts TypeScript IndoFrench"
echo ""

# Fonction pour afficher l'aide
show_help() {
    echo "Scripts disponibles :"
    echo "  init-roles       # Initialiser les rôles dans la base de données"
    echo "  create-test-users # Créer des utilisateurs de test"
    echo "  test-auth        # Tester le système d'authentification"
    echo ""
    echo "Utilisation :"
    echo "  $0 <script-name>  # Exécuter un script spécifique"
    echo "  $0 --help        # Afficher cette aide"
    echo ""
    echo "Exemple :"
    echo "  $0 init-roles"
}

# Fonction pour vérifier les prérequis
check_prerequisites() {
    # Vérifier que ts-node est disponible
    if ! command -v npx &> /dev/null; then
        echo -e "${RED}❌ npx n'est pas disponible${NC}"
        return 1
    fi
    
    # Vérifier que le fichier tsconfig.json existe
    if [ ! -f "tsconfig.json" ]; then
        echo -e "${RED}❌ tsconfig.json introuvable${NC}"
        return 1
    fi
    
    # Vérifier que Prisma est configuré
    if [ ! -f "prisma/schema.prisma" ]; then
        echo -e "${RED}❌ Schema Prisma introuvable${NC}"
        return 1
    fi
    
    return 0
}

# Fonction pour exécuter un script
run_script() {
    local script_name="$1"
    local script_path="$SCRIPT_DIR/${script_name}.ts"
    
    if [ ! -f "$script_path" ]; then
        echo -e "${RED}❌ Script $script_name.ts introuvable${NC}"
        echo ""
        show_help
        return 1
    fi
    
    echo -e "${YELLOW}⚡ Exécution de $script_name.ts...${NC}"
    echo ""
    
    # Exécuter le script avec ts-node
    npx ts-node --project scripts/tsconfig.json "$script_path"
    local exit_code=$?
    
    if [ $exit_code -eq 0 ]; then
        echo ""
        echo -e "${GREEN}✅ Script $script_name.ts exécuté avec succès${NC}"
    else
        echo ""
        echo -e "${RED}❌ Erreur lors de l'exécution de $script_name.ts${NC}"
    fi
    
    return $exit_code
}

# Traitement des arguments
case "$1" in
    --help|-h)
        show_help
        ;;
    "")
        echo -e "${YELLOW}⚠️ Aucun script spécifié${NC}"
        echo ""
        show_help
        ;;
    *)
        if ! check_prerequisites; then
            echo -e "${RED}❌ Prérequis non satisfaits${NC}"
            exit 1
        fi
        
        run_script "$1"
        ;;
esac
