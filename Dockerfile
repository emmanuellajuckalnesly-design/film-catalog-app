# Stage 1 : Build
FROM node:20-alpine AS builder

WORKDIR /app

# Copier les fichiers de dépendances
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le code source
COPY . .

# Build l'app React
RUN npm run build

# Stage 2 : Production
FROM node:20-alpine

WORKDIR /app

# Installer un serveur HTTP léger
RUN npm install -g serve

# Copier le build depuis le stage 1
COPY --from=builder /app/dist ./dist

# Exposer le port
EXPOSE 3000

# Commande pour démarrer l'app
CMD ["serve", "-s", "dist", "-l", "3000"]
