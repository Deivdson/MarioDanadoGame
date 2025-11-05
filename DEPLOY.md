# 🐳 Guia de Deploy - Jelani Bros Game

## Deployment com Docker

### Pré-requisitos
- Docker instalado
- Docker Compose instalado
- Porta 8080 disponível (ou modifique no docker-compose.yml)

## 🚀 Deploy Rápido

### 1. Clone ou navegue até o diretório do projeto
```bash
cd /caminho/do/projeto
```

### 2. Execute o script de deploy
```bash
./docker-run.sh
```
Escolha a opção **1** (Construir e iniciar o jogo)

### 3. Acesse o jogo
- Fase 1: http://localhost:8080/jelani_bros_game.html
- Fase 2: http://localhost:8080/jelani_bros_fase2.html

## 📝 Comandos Manuais

### Construir a imagem Docker
```bash
docker build -t jelani-bros-game .
```

### Executar o container
```bash
docker run -d -p 8080:80 --name jelani-game jelani-bros-game
```

### Parar o container
```bash
docker stop jelani-game
```

### Remover o container
```bash
docker rm jelani-game
```

### Ver logs
```bash
docker logs -f jelani-game
```

## 🔧 Configurações Avançadas

### Alterar a porta
Edite o arquivo `docker-compose.yml`:
```yaml
ports:
  - "3000:80"  # Agora acesse via localhost:3000
```

### Desenvolvimento com Hot Reload
Descomente no `docker-compose.yml`:
```yaml
volumes:
  - ./:/usr/share/nginx/html:ro
```

### Variáveis de Ambiente
Adicione no `docker-compose.yml`:
```yaml
environment:
  - GAME_MODE=production
  - DEBUG=false
```

## 🌐 Deploy em Produção

### Docker Hub
```bash
# Login
docker login

# Tag
docker tag jelani-bros-game seuusuario/jelani-bros-game:1.0

# Push
docker push seuusuario/jelani-bros-game:1.0
```

### AWS ECS / Azure Container Instances / Google Cloud Run
Use o arquivo `docker-compose.yml` como base para seus serviços de container cloud.

### Kubernetes
Exemplo básico de deployment:
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: jelani-game
spec:
  replicas: 2
  selector:
    matchLabels:
      app: jelani-game
  template:
    metadata:
      labels:
        app: jelani-game
    spec:
      containers:
      - name: jelani-game
        image: jelani-bros-game:latest
        ports:
        - containerPort: 80
---
apiVersion: v1
kind: Service
metadata:
  name: jelani-game-service
spec:
  type: LoadBalancer
  ports:
  - port: 80
    targetPort: 80
  selector:
    app: jelani-game
```

## 🐛 Troubleshooting

### Porta já em uso
```bash
# Verificar processo usando a porta
lsof -i :8080

# Ou usar outra porta no docker-compose.yml
ports:
  - "8081:80"
```

### Container não inicia
```bash
# Ver logs detalhados
docker-compose logs

# Verificar status
docker-compose ps
```

### Problemas de permissão
```bash
# Dar permissão ao script
chmod +x docker-run.sh

# Executar com sudo (se necessário)
sudo docker-compose up -d
```

### Rebuild forçado
```bash
# Remover tudo e reconstruir
docker-compose down --rmi all -v
docker-compose up --build -d
```

## 📊 Monitoramento

### Ver uso de recursos
```bash
docker stats jelani-bros-game
```

### Inspecionar container
```bash
docker inspect jelani-bros-game
```

### Executar comandos dentro do container
```bash
docker exec -it jelani-bros-game sh
```

## 🔒 Segurança

### Scan de vulnerabilidades
```bash
docker scan jelani-bros-game
```

### Usar imagem base específica
No Dockerfile:
```dockerfile
FROM nginx:1.25.3-alpine
```

## 📈 Performance

### Otimizações no nginx.conf
- Compressão gzip habilitada
- Cache de assets configurado
- Tipos MIME corretos

### Melhorias futuras
- CDN para assets estáticos
- Service Worker para PWA
- Minificação de JavaScript/CSS

## 🆘 Suporte

Para problemas ou dúvidas:
1. Verifique os logs: `docker-compose logs`
2. Consulte a documentação do Docker
3. Abra uma issue no repositório

---

Desenvolvido com 🐳 Docker + 🎮 Phaser 3
