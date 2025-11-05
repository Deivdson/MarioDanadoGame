# 🎮 Jelani Bros

Um jogo de plataforma 2D emocionante criado com Phaser 3, onde você controla o Jelani em uma aventura épica!

## 🌟 Características

- **3 Fases Desafiadoras**: Fase 1 (iniciante), Fase 2 (extremo) e Fase 3 (com NPC e escudo)
- **Sistema de Vidas**: 3 vidas iniciais + itens de recuperação (Xuxu)
- **Sistema de Diálogo**: Converse com NPCs
- **Sistema de Escudo**: Proteção contra um ataque
- **Movimentação Fluida**: Movimento, pulo e agachamento
- **Inimigos Animados**: Inimigos com movimentação automática
- **Sprites Personalizados**: Jelani (jogador), Enemy (inimigos), Xuxu (vida), Minichurros (NPC)

## 🎯 Como Jogar

### Controles:
- **← →** (Setas Esquerda/Direita): Mover o personagem
- **↑** (Seta para Cima): Pular
- **↓** (Seta para Baixo): Agachar (reduz altura do personagem)

### Objetivo:
- Alcance a área de vitória (dourada na Fase 1, verde na Fase 2)
- Evite os inimigos
- Colete os Xuxus para ganhar vidas extras

## 🐳 Executar com Docker (Recomendado)

### Opção 1: Script Interativo (Mais Fácil)
```bash
./docker-run.sh
```

Escolha uma opção:
1. Construir e iniciar o jogo
2. Iniciar o jogo (sem rebuild)
3. Parar o jogo
4. Ver logs
5. Remover containers e imagens

### Opção 2: Comandos Docker Compose

**Iniciar o jogo:**
```bash
docker-compose up -d
```

**Parar o jogo:**
```bash
docker-compose down
```

**Ver logs:**
```bash
docker-compose logs -f
```

**Reconstruir e iniciar:**
```bash
docker-compose up --build -d
```

### Acessar o Jogo
Após iniciar o Docker:
- **Menu Principal**: http://localhost:8080/ ou http://localhost:8080/index.html
- **Fase 1**: http://localhost:8080/jelani_bros_game.html
- **Fase 2**: http://localhost:8080/jelani_bros_fase2.html
- **Fase 3**: http://localhost:8080/jelani_bros_fase3.html

## 🖥️ Executar Localmente (Sem Docker)

### Com Python 3:
```bash
python3 -m http.server 8080
```

### Com Python 2:
```bash
python -m SimpleHTTPServer 8080
```

### Com Node.js (http-server):
```bash
npx http-server -p 8080
```

Depois acesse: http://localhost:8080/

## 📁 Estrutura do Projeto

```
.
├── index.html                 # Menu principal do jogo
├── jelani_bros_game.html      # Fase 1 (progressiva)
├── jelani_bros_fase2.html     # Fase 2 (desafio extremo)
├── jelani_bros_fase3.html     # Fase 3 (NPC e escudo)
├── script.js                  # Script alternativo
├── style.css                  # Estilos (se houver)
├── assets/
│   ├── jelani.png            # Sprite do jogador
│   ├── enemy.gif             # Sprite animado dos inimigos
│   ├── xuxu.png              # Item de recuperação de vida
│   └── minichurros.jpg       # NPC que entrega o escudo
├── Dockerfile                # Configuração Docker
├── docker-compose.yml        # Orquestração Docker
├── nginx.conf               # Configuração nginx
├── docker-run.sh            # Script helper Docker
└── README.md                # Este arquivo
```

## 🚀 Tecnologias Utilizadas

- **Phaser 3** - Framework de jogos HTML5
- **JavaScript** - Lógica do jogo
- **HTML5 Canvas** - Renderização gráfica
- **Docker + Nginx** - Containerização e servidor web
- **Docker Compose** - Orquestração de containers

## 📋 Requisitos

### Para Docker:
- Docker 20.10+
- Docker Compose 1.29+

### Para execução local:
- Navegador moderno (Chrome, Firefox, Edge)
- Servidor web local (Python, Node.js, etc.)

## 🎨 Créditos

Desenvolvido com ❤️ usando Phaser 3