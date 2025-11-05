# Usando nginx como servidor web leve
FROM nginx:alpine

# Remover configuração padrão do nginx
RUN rm -rf /usr/share/nginx/html/*

# Copiar todos os arquivos do jogo para o diretório do nginx
COPY . /usr/share/nginx/html/

# Copiar configuração customizada do nginx (opcional)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expor porta 80
EXPOSE 80

# Comando para iniciar o nginx
CMD ["nginx", "-g", "daemon off;"]
