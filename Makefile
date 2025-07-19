# Makefile pour le projet IndoFrench

.PHONY: help build dev prod stop clean logs backup restore health

# Variables
COMPOSE_DEV = docker-compose.dev.yml
COMPOSE_PROD = docker-compose.prod.yml

# Aide
help:
	@echo "🇮🇩🇫🇷 Commandes disponibles pour IndoFrench:"
	@echo ""
	@echo "📦 DÉVELOPPEMENT:"
	@echo "  make dev      - Démarrer en mode développement"
	@echo "  make dev-logs - Voir les logs de développement"
	@echo "  make dev-stop - Arrêter le développement"
	@echo ""
	@echo "🚀 PRODUCTION:"
	@echo "  make prod     - Déployer en production"
	@echo "  make prod-logs- Voir les logs de production"
	@echo "  make prod-stop- Arrêter la production"
	@echo "  make build    - Construire les images"
	@echo ""
	@echo "🔧 MAINTENANCE:"
	@echo "  make health   - Vérifier l'état des services"
	@echo "  make clean    - Nettoyer Docker"
	@echo "  make backup   - Sauvegarder la base de données"
	@echo "  make restore  - Restaurer la base de données"
	@echo ""

# Développement
dev:
	@echo "🔧 Démarrage en mode développement..."
	docker-compose -f $(COMPOSE_DEV) up -d
	@echo "✅ Application disponible sur http://localhost:3000"

dev-logs:
	docker-compose -f $(COMPOSE_DEV) logs -f

dev-stop:
	docker-compose -f $(COMPOSE_DEV) down

# Production
prod:
	@echo "🚀 Déploiement en production..."
	./deploy-prod.sh

build:
	@echo "🔨 Construction des images..."
	docker-compose -f $(COMPOSE_PROD) build --no-cache

prod-logs:
	docker-compose -f $(COMPOSE_PROD) logs -f

prod-stop:
	docker-compose -f $(COMPOSE_PROD) down

# Maintenance
health:
	@echo "🔍 Vérification de l'état des services..."
	@docker-compose -f $(COMPOSE_PROD) ps
	@echo ""
	@echo "🌐 Test de connectivité:"
	@curl -s http://localhost:80/health || echo "❌ Service non accessible"

clean:
	@echo "🧹 Nettoyage Docker..."
	docker system prune -f
	docker volume prune -f

backup:
	@echo "💾 Sauvegarde de la base de données..."
	mkdir -p backups
	docker-compose -f $(COMPOSE_PROD) exec -T db pg_dump -U postgres indofrench > backups/backup_$(shell date +%Y%m%d_%H%M%S).sql
	@echo "✅ Sauvegarde créée dans le dossier backups/"

restore:
	@echo "📥 Restauration de la base de données..."
	@echo "⚠️ Cette opération va écraser la base de données actuelle!"
	@read -p "Nom du fichier de sauvegarde (dans backups/): " backup_file && \
	docker-compose -f $(COMPOSE_PROD) exec -T db psql -U postgres -d indofrench < backups/$$backup_file

# Tests
test:
	npm test

lint:
	npm run lint

# Migrations
migrate:
	docker-compose -f $(COMPOSE_PROD) exec web npx prisma migrate deploy

seed:
	docker-compose -f $(COMPOSE_PROD) exec web npx prisma db seed
