.PHONY: help build up down restart logs clean test status

# Cores para output
GREEN=\033[0;32m
YELLOW=\033[1;33m
RED=\033[0;31m
NC=\033[0m # No Color

# Variáveis
IMAGE_NAME=jelani-bros-game
CONTAINER_NAME=jelani-bros-game
PORT=8080

help: ## Mostra esta mensagem de ajuda
	@echo "$(GREEN)🎮 Jelani Bros - Comandos Make$(NC)"
	@echo ""
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "  $(YELLOW)%-15s$(NC) %s\n", $$1, $$2}'
	@echo ""

build: ## Constrói a imagem Docker
	@echo "$(GREEN)🔨 Construindo imagem Docker...$(NC)"
	docker-compose build
	@echo "$(GREEN)✅ Imagem construída com sucesso!$(NC)"

up: ## Inicia o jogo
	@echo "$(GREEN)🚀 Iniciando o jogo...$(NC)"
	docker-compose up -d
	@echo "$(GREEN)✅ Jogo rodando em http://localhost:$(PORT)$(NC)"
	@echo "$(YELLOW)� Menu Principal: http://localhost:$(PORT)/$(NC)"
	@echo "$(YELLOW)�🎮 Fase 1: http://localhost:$(PORT)/jelani_bros_game.html$(NC)"
	@echo "$(YELLOW)🎮 Fase 2: http://localhost:$(PORT)/jelani_bros_fase2.html$(NC)"

down: ## Para o jogo
	@echo "$(RED)🛑 Parando o jogo...$(NC)"
	docker-compose down
	@echo "$(GREEN)✅ Jogo parado!$(NC)"

restart: down up ## Reinicia o jogo

logs: ## Mostra os logs do container
	@echo "$(GREEN)📋 Logs do container:$(NC)"
	docker-compose logs -f

clean: ## Remove containers, imagens e volumes
	@echo "$(RED)🗑️  Limpando tudo...$(NC)"
	docker-compose down --rmi all -v
	@echo "$(GREEN)✅ Limpeza concluída!$(NC)"

test: ## Testa o build
	@echo "$(GREEN)🧪 Testando build...$(NC)"
	docker build -t $(IMAGE_NAME):test .
	@echo "$(GREEN)✅ Build OK!$(NC)"

status: ## Mostra o status dos containers
	@echo "$(GREEN)📊 Status dos containers:$(NC)"
	@docker-compose ps

dev: ## Modo desenvolvimento (com hot-reload)
	@echo "$(GREEN)🔧 Iniciando em modo desenvolvimento...$(NC)"
	docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d
	@echo "$(GREEN)✅ Modo dev ativo!$(NC)"

shell: ## Abre shell no container
	@echo "$(GREEN)🐚 Abrindo shell...$(NC)"
	docker exec -it $(CONTAINER_NAME) sh

stats: ## Mostra uso de recursos
	@echo "$(GREEN)📈 Uso de recursos:$(NC)"
	docker stats $(CONTAINER_NAME) --no-stream

# Comandos de produção
prod-build: ## Build para produção
	@echo "$(GREEN)🏭 Build de produção...$(NC)"
	docker build -t $(IMAGE_NAME):latest -t $(IMAGE_NAME):$$(date +%Y%m%d) .
	@echo "$(GREEN)✅ Build de produção completo!$(NC)"

prod-push: ## Push para Docker Hub
	@echo "$(GREEN)📤 Fazendo push para Docker Hub...$(NC)"
	@read -p "Docker Hub username: " username; \
	docker tag $(IMAGE_NAME):latest $$username/$(IMAGE_NAME):latest; \
	docker push $$username/$(IMAGE_NAME):latest
	@echo "$(GREEN)✅ Push completo!$(NC)"

# Comandos auxiliares
install-deps: ## Instala dependências (Docker)
	@echo "$(GREEN)📦 Verificando dependências...$(NC)"
	@command -v docker >/dev/null 2>&1 || { echo "$(RED)❌ Docker não instalado!$(NC)"; exit 1; }
	@command -v docker-compose >/dev/null 2>&1 || { echo "$(RED)❌ Docker Compose não instalado!$(NC)"; exit 1; }
	@echo "$(GREEN)✅ Todas as dependências OK!$(NC)"

open: ## Abre o jogo no navegador
	@echo "$(GREEN)🌐 Abrindo navegador...$(NC)"
	@command -v xdg-open >/dev/null && xdg-open http://localhost:$(PORT)/ || \
	command -v open >/dev/null && open http://localhost:$(PORT)/ || \
	echo "$(YELLOW)⚠️  Abra manualmente: http://localhost:$(PORT)/$(NC)"

# Alvo padrão
.DEFAULT_GOAL := help
