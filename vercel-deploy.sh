#!/bin/bash

# Script de déploiement Vercel pour IndoFrench
# Usage: ./vercel-deploy.sh [preview|production]

set -e

# Configuration
PROJECT_NAME="indofrench"
VERCEL_ORG_ID="team_rdOci5LmyLOUDXvWJ2sAtFvr"
VERCEL_PROJECT_ID="prj_0srWaovaKeRV8UZ6fNInqkL1OPNY"

# Couleurs pour l'affichage
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🚀 Script de déploiement Vercel - IndoFrench${NC}"
echo "=============================================="

# Vérifier les prérequis
echo -e "${YELLOW}📋 Vérification des prérequis...${NC}"

# Vérifier si Vercel CLI est installé
if ! command -v vercel &> /dev/null; then
    echo -e "${RED}❌ Vercel CLI n'est pas installé.${NC}"
    echo -e "${YELLOW}💡 Installation avec: npm install -g vercel${NC}"
    echo -e "${YELLOW}⚠️  Souhaitez-vous l'installer maintenant ? (y/n)${NC}"
    read -r response
    if [[ "$response" =~ ^[Yy]$ ]]; then
        npm install -g vercel
        echo -e "${GREEN}✅ Vercel CLI installé avec succès${NC}"
    else
        echo -e "${RED}❌ Déploiement annulé${NC}"
        exit 1
    fi
fi

# Vérifier si l'utilisateur est connecté à Vercel
if ! vercel whoami &> /dev/null; then
    echo -e "${YELLOW}🔐 Connexion à Vercel requise...${NC}"
    vercel login
fi

echo -e "${GREEN}✅ Utilisateur connecté:${NC} $(vercel whoami)"

# Déterminer le type de déploiement
DEPLOYMENT_TYPE=${1:-preview}
if [[ "$DEPLOYMENT_TYPE" != "preview" && "$DEPLOYMENT_TYPE" != "production" ]]; then
    echo -e "${RED}❌ Type de déploiement invalide. Utilisez 'preview' ou 'production'${NC}"
    exit 1
fi

echo -e "${BLUE}📦 Type de déploiement: ${DEPLOYMENT_TYPE}${NC}"

# Nettoyer et préparer le projet
echo -e "${YELLOW}🧹 Nettoyage du projet...${NC}"
rm -rf .next
rm -rf node_modules/.cache
npm run db:generate

# Vérifier les variables d'environnement requises
echo -e "${YELLOW}🔍 Vérification des variables d'environnement...${NC}"
if [[ ! -f ".env.vercel.example" ]]; then
    echo -e "${RED}❌ Fichier .env.vercel.example manquant${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Fichier d'exemple des variables trouvé${NC}"
echo -e "${YELLOW}⚠️  Assurez-vous que toutes les variables sont configurées dans le dashboard Vercel${NC}"

# Build local pour vérifier les erreurs
echo -e "${YELLOW}🔨 Build de vérification...${NC}"
if npm run build; then
    echo -e "${GREEN}✅ Build local réussi${NC}"
else
    echo -e "${RED}❌ Erreurs de build détectées${NC}"
    echo -e "${YELLOW}🔧 Exécution des corrections automatiques...${NC}"
    npm run lint --fix 2>/dev/null || true
    npm run type-check || {
        echo -e "${RED}❌ Erreurs TypeScript persistantes${NC}"
        echo -e "${YELLOW}💡 Vérifiez les erreurs ci-dessus avant de déployer${NC}"
        read -p "Continuer malgré les erreurs ? (y/n): " -n 1 -r
        echo
        if [[ ! $REPLY =~ ^[Yy]$ ]]; then
            exit 1
        fi
    }
fi

# Déploiement
echo -e "${BLUE}🚀 Déploiement vers Vercel...${NC}"

if [[ "$DEPLOYMENT_TYPE" == "production" ]]; then
    echo -e "${RED}⚠️  DÉPLOIEMENT EN PRODUCTION${NC}"
    echo -e "${YELLOW}Cette action déploiera vers l'URL de production.${NC}"
    read -p "Êtes-vous sûr ? (y/n): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo -e "${YELLOW}Déploiement annulé${NC}"
        exit 0
    fi
    
    # Déploiement en production
    vercel --prod --yes
    DEPLOY_STATUS=$?
else
    # Déploiement preview
    vercel --yes
    DEPLOY_STATUS=$?
fi

# Vérification du déploiement
if [[ $DEPLOY_STATUS -eq 0 ]]; then
    echo -e "${GREEN}✅ Déploiement réussi !${NC}"
    
    # Récupérer l'URL du déploiement
    if [[ "$DEPLOYMENT_TYPE" == "production" ]]; then
        DEPLOY_URL=$(vercel ls | grep "$PROJECT_NAME" | grep "Ready" | head -1 | awk '{print $2}')
        echo -e "${GREEN}🌐 URL de production: https://$DEPLOY_URL${NC}"
    else
        echo -e "${GREEN}🌐 URL de preview disponible ci-dessus${NC}"
    fi
    
    echo -e "${BLUE}📊 Informations utiles:${NC}"
    echo "• Dashboard: https://vercel.com/dashboard"
    echo "• Logs: vercel logs"
    echo "• Analytics: https://vercel.com/analytics"
    
else
    echo -e "${RED}❌ Échec du déploiement${NC}"
    echo -e "${YELLOW}💡 Vérifiez les logs avec: vercel logs${NC}"
    exit 1
fi

echo -e "${GREEN}🎉 Déploiement terminé avec succès !${NC}"
