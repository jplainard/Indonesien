#!/bin/bash

# 🔧 Script de diagnostic et réparation automatique - IndoFrench
# Détecte et corrige automatiquement les problèmes courants

echo "🔍 Diagnostic de l'environnement IndoFrench..."

# Couleurs pour les messages
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Fonction pour vérifier et réparer les permissions
check_permissions() {
    echo "🔍 Vérification des permissions..."
    
    # Vérifier si le dossier .next existe et a les bonnes permissions
    if [ -d ".next" ]; then
        if [ ! -w ".next" ]; then
            echo -e "${YELLOW}⚠️ Problème de permissions détecté sur .next${NC}"
            echo "🔧 Correction des permissions..."
            chmod -R 755 .next 2>/dev/null || sudo chmod -R 755 .next
            echo -e "${GREEN}✅ Permissions corrigées${NC}"
        fi
    fi
    
    # Vérifier les permissions sur les fichiers de config
    local config_files=("package.json" "next.config.js" "tsconfig.json")
    for file in "${config_files[@]}"; do
        if [ -f "$file" ] && [ ! -w "$file" ]; then
            echo -e "${YELLOW}⚠️ Problème de permissions sur $file${NC}"
            chmod 644 "$file" 2>/dev/null || sudo chmod 644 "$file"
        fi
    done
}

# Fonction pour vérifier l'état des processus
check_processes() {
    echo "🔍 Vérification des processus en cours..."
    
    local next_processes=$(pgrep -f "next" | wc -l)
    if [ "$next_processes" -gt 0 ]; then
        echo -e "${YELLOW}⚠️ $next_processes processus Next.js détectés${NC}"
        echo "🛑 Arrêt des processus existants..."
        pkill -f "next" 2>/dev/null || true
        sleep 2
        echo -e "${GREEN}✅ Processus arrêtés${NC}"
    fi
}

# Fonction pour vérifier l'état de la base de données
check_database() {
    echo "🔍 Vérification de la base de données..."
    
    if ! command -v docker &> /dev/null; then
        echo -e "${RED}❌ Docker n'est pas installé${NC}"
        return 1
    fi
    
    local db_container=$(docker ps -q -f name=postgres)
    if [ -z "$db_container" ]; then
        echo -e "${YELLOW}⚠️ Conteneur PostgreSQL non trouvé${NC}"
        echo "🚀 Démarrage de PostgreSQL..."
        docker-compose -f docker-compose.dev.yml up -d db
        sleep 5
        echo -e "${GREEN}✅ PostgreSQL démarré${NC}"
    else
        echo -e "${GREEN}✅ PostgreSQL fonctionne${NC}"
    fi
}

# Fonction pour vérifier les dépendances
check_dependencies() {
    echo "🔍 Vérification des dépendances..."
    
    if [ ! -d "node_modules" ]; then
        echo -e "${YELLOW}⚠️ node_modules manquant${NC}"
        echo "📦 Installation des dépendances..."
        npm install
        echo -e "${GREEN}✅ Dépendances installées${NC}"
    fi
    
    # Vérifier si le client Prisma est généré
    if [ ! -d "node_modules/.prisma" ]; then
        echo -e "${YELLOW}⚠️ Client Prisma non généré${NC}"
        echo "🔧 Génération du client Prisma..."
        npx prisma generate
        echo -e "${GREEN}✅ Client Prisma généré${NC}"
    fi
}

# Fonction pour nettoyer les fichiers corrompus
clean_corrupted_files() {
    echo "🧹 Nettoyage des fichiers potentiellement corrompus..."
    
    # Nettoyer les caches
    rm -rf .next/cache 2>/dev/null || true
    rm -rf .next/server 2>/dev/null || true
    npm cache clean --force 2>/dev/null || true
    
    echo -e "${GREEN}✅ Nettoyage terminé${NC}"
}

# Fonction principale de réparation automatique
auto_repair() {
    echo "🔧 Réparation automatique en cours..."
    
    check_processes
    clean_corrupted_files
    check_permissions
    check_dependencies
    check_database
    
    echo -e "${GREEN}✅ Réparation automatique terminée${NC}"
}

# Menu principal
case "$1" in
    --auto-repair)
        auto_repair
        ;;
    --check-permissions)
        check_permissions
        ;;
    --check-database)
        check_database
        ;;
    --check-processes)
        check_processes
        ;;
    *)
        echo "🔧 Script de diagnostic et réparation IndoFrench"
        echo ""
        echo "Utilisation:"
        echo "  $0 --auto-repair      # Réparation automatique complète"
        echo "  $0 --check-permissions  # Vérifier les permissions"
        echo "  $0 --check-database     # Vérifier la base de données"
        echo "  $0 --check-processes    # Vérifier les processus"
        echo ""
        echo "Lancement du diagnostic automatique..."
        auto_repair
        ;;
esac
