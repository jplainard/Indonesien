#!/bin/bash

# 🔄 Script de redémarrage rapide pour le serveur web - IndoFrench
# Kill les processus existants et relance l'application
#
# Usage:
#   ./scripts/restart-web.sh                    # Redémarrage en mode dev (bloquant)
#   ./scripts/restart-web.sh --background       # Redémarrage en arrière-plan
#   ./scripts/restart-web.sh --docker           # Redémarrage avec Docker
#   ./scripts/restart-web.sh --docker -b        # Docker en arrière-plan
#   ./scripts/restart-web.sh --stop             # Arrêter seulement
#
# Options:
#   -d, --docker      : Utiliser Docker
#   -b, --background  : Lancer en arrière-plan
#   -f, --foreground  : Lancer en premier plan (par défaut)
#   -s, --stop        : Arrêter seulement les serveurs
#   &                 : Équivalent à --background

# Afficher l'aide si demandée
if [ "$1" = "--help" ] || [ "$1" = "-h" ]; then
    echo "🔄 Script de redémarrage rapide pour le serveur web"
    echo ""
    echo "Usage:"
    echo "  ./scripts/restart-web.sh [OPTIONS]"
    echo ""
    echo "Options:"
    echo "  -d, --docker      Utiliser Docker pour le démarrage"
    echo "  -b, --background  Lancer en arrière-plan (rend la main)"
    echo "  -f, --foreground  Lancer en premier plan (par défaut)"
    echo "  -s, --stop        Arrêter seulement les serveurs"
    echo "  -h, --help        Afficher cette aide"
    echo ""
    echo "Exemples:"
    echo "  ./scripts/restart-web.sh              # Dev en premier plan"
    echo "  ./scripts/restart-web.sh -b           # Dev en arrière-plan"
    echo "  ./scripts/restart-web.sh --docker     # Docker en premier plan"
    echo "  ./scripts/restart-web.sh -d -b        # Docker en arrière-plan"
    echo "  ./scripts/restart-web.sh --stop       # Arrêter seulement"
    exit 0
fi

echo "🔄 Redémarrage du serveur web..."

# Fonction pour arrêter tous les processus web
stop_web_processes() {
    echo "🛑 Arrêt des processus Next.js..."
    pkill -f "next dev" 2>/dev/null || true
    pkill -f "next build" 2>/dev/null || true
    pkill -f "next start" 2>/dev/null || true
    pkill -f "npm run dev" 2>/dev/null || true
    
    # Arrêter aussi les processus Docker web si ils existent
    docker stop indonesien-web-1 2>/dev/null || true
    
    echo "⏳ Attente de l'arrêt complet..."
    sleep 3
}

# Fonction pour nettoyer rapidement
quick_clean() {
    echo "🧹 Nettoyage rapide..."
    rm -rf .next/cache 2>/dev/null || true
    
    # Créer les dossiers nécessaires
    mkdir -p .next/cache 2>/dev/null || true
    chmod 755 .next 2>/dev/null || true
}

# Fonction pour démarrer selon le mode
start_web() {
    local mode=${1:-"dev"}
    local background=${2:-"false"}
    
    case $mode in
        "docker")
            echo "🐳 Démarrage avec Docker..."
            if [ "$background" = "true" ]; then
                nohup ./dev.sh > dev-docker.log 2>&1 &
                echo "📝 Logs Docker disponibles dans: dev-docker.log"
                echo "🔍 Pour voir les logs: tail -f dev-docker.log"
            else
                ./dev.sh
            fi
            ;;
        "dev"|*)
            echo "🚀 Démarrage en mode développement..."
            if [ "$background" = "true" ]; then
                nohup npm run dev > dev-server.log 2>&1 &
                local pid=$!
                echo "🎯 Serveur démarré en arrière-plan (PID: $pid)"
                echo "📝 Logs disponibles dans: dev-server.log"
                echo "🔍 Pour voir les logs: tail -f dev-server.log"
                echo "🛑 Pour arrêter: kill $pid ou ./scripts/restart-web.sh --stop"
                
                # Attendre un peu pour s'assurer que le serveur démarre
                sleep 3
                if ps -p $pid > /dev/null; then
                    echo "✅ Serveur démarré avec succès sur http://localhost:3000"
                else
                    echo "❌ Erreur lors du démarrage, vérifiez dev-server.log"
                fi
            else
                npm run dev
            fi
            ;;
    esac
}

# Main script
if [ "$1" = "--stop" ] || [ "$1" = "-s" ]; then
    echo "🛑 Arrêt des serveurs..."
    stop_web_processes
    echo "✅ Serveurs arrêtés"
    exit 0
fi

stop_web_processes
quick_clean

# Déterminer le mode et les options
background="false"
mode="dev"

for arg in "$@"; do
    case $arg in
        "--docker"|"-d")
            mode="docker"
            ;;
        "--background"|"-b"|"&")
            background="true"
            ;;
        "--foreground"|"-f")
            background="false"
            ;;
    esac
done

# Démarrer selon les paramètres
start_web "$mode" "$background"
