# 🎮 Jelani Bros - Quick Start Guide

## 🚀 Início Rápido (3 comandos)

```bash
# 1. Entre no diretório
cd "/caminho/do/jogo"

# 2. Execute o script
./docker-run.sh

# 3. Escolha opção 1 e acesse:
# http://localhost:8080/
```

## 📦 Arquivos Criados para Docker

| Arquivo | Descrição |
|---------|-----------|
| `Dockerfile` | Configuração da imagem Docker com Nginx Alpine |
| `docker-compose.yml` | Orquestração do container |
| `nginx.conf` | Configuração do servidor web Nginx |
| `.dockerignore` | Arquivos ignorados no build |
| `docker-run.sh` | Script helper com menu interativo |
| `DEPLOY.md` | Guia completo de deployment |

## 🎯 Links Rápidos

- **Menu Principal**: http://localhost:8080/
- **Fase 1**: http://localhost:8080/jelani_bros_game.html
- **Fase 2**: http://localhost:8080/jelani_bros_fase2.html

## ⚡ Comandos Essenciais

```bash
# Iniciar
docker-compose up -d

# Parar
docker-compose down

# Ver logs
docker-compose logs -f

# Rebuild
docker-compose up --build -d
```

## 🎮 Controles do Jogo

| Tecla | Ação |
|-------|------|
| ← → | Mover |
| ↑ | Pular |
| ↓ | Agachar |

## 💚 Itens

- **Xuxu (verde)**: +1 Vida
- **Área Dourada**: Vitória Fase 1
- **Área Verde**: Vitória Fase 2

## 🏆 Características

- ✅ 2 Fases diferentes
- ✅ Sistema de vidas
- ✅ Inimigos animados
- ✅ Itens de recuperação
- ✅ Movimentação fluida
- ✅ Flip automático do sprite
- ✅ Agachamento funcional

## 🐛 Problemas Comuns

**Porta 8080 ocupada?**
```bash
# Use outra porta
docker run -d -p 3000:80 jelani-bros-game
```

**Script sem permissão?**
```bash
chmod +x docker-run.sh
```

**Docker não instalado?**
```bash
# Linux (Ubuntu/Debian)
sudo apt-get install docker.io docker-compose

# MacOS
brew install docker docker-compose

# Windows
# Baixe Docker Desktop
```

## 📊 Especificações Técnicas

- **Engine**: Phaser 3.55.2
- **Servidor**: Nginx Alpine
- **Container**: Docker
- **Resolução Fase 1**: 800x400
- **Resolução Fase 2**: 1200x600

## 🌟 Próximos Passos

1. Acesse o menu: http://localhost:8080/
2. Leia as instruções no menu
3. Complete a Fase 1
4. Desafie-se na Fase 2
5. Customize os níveis editando os arquivos HTML

---

**Desenvolvido com ❤️ | Phaser 3 + Docker + Nginx**
