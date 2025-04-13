# Etapa 1: Build
FROM node:18 AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Etapa 2: Servir los archivos estáticos con Nginx
FROM nginx:alpine

# Copiamos el build de Vue al directorio donde Nginx sirve archivos
COPY --from=build /app/dist /usr/share/nginx/html

# (Opcional) Copiar configuración personalizada de Nginx si tienes
# COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
