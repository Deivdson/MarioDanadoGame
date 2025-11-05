#!/bin/bash

# Script para facilitar execução do jogo com Docker

echo "🎮 Jelani Bros - Docker Setup"
echo "=============================="
echo ""

# Verificar se Docker está instalado
if ! command -v docker &> /dev/null; then
    echo "❌ Docker não está instalado!"
    echo "Instale o Docker em: https://docs.docker.com/get-docker/"
    exit 1
fi

# Verificar se Docker Compose está instalado
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose não está instalado!"
    echo "Instale o Docker Compose em: https://docs.docker.com/compose/install/"
    exit 1
fi

echo "✅ Docker e Docker Compose encontrados"
echo ""

# Menu de opções
echo "Escolha uma opção:"
echo "1) Construir e iniciar o jogo"
echo "2) Iniciar o jogo (sem rebuild)"
echo "3) Parar o jogo"
echo "4) Ver logs"
echo "5) Remover containers e imagens"
echo ""
read -p "Opção: " opcao

case $opcao in
    1)
        echo ""
        echo "🔨 Construindo e iniciando o jogo..."
        docker-compose up --build -d
        echo ""
        echo "✅ Jogo iniciado com sucesso!"
        echo "🌐 Acesse: http://localhost:8080/jelani_bros_game.html"
        echo "🎮 Fase 2: http://localhost:8080/jelani_bros_fase2.html"
        ;;
    2)
        echo ""
        echo "🚀 Iniciando o jogo..."
        docker-compose up -d
        echo ""
        echo "✅ Jogo iniciado!"
        echo "🌐 Acesse: http://localhost:8080/jelani_bros_game.html"
        ;;
    3)
        echo ""
        echo "🛑 Parando o jogo..."
        docker-compose down
        echo "✅ Jogo parado!"
        ;;
    4)
        echo ""
        echo "📋 Logs do container:"
        docker-compose logs -f
        ;;
    5)
        echo ""
        echo "🗑️  Removendo containers e imagens..."
        docker-compose down --rmi all -v
        echo "✅ Limpeza concluída!"
        ;;
    *)
        echo "❌ Opção inválida!"
        exit 1
        ;;
esac
