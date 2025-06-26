FROM node:22.12

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Erstelle den Production-Build
RUN npm run build --configuration=production

# Installiere einen simplen Webserver, um das gebaute Angular-Projekt zu hosten
RUN npm install -g http-server

# Starte den Server im richtigen Verzeichnis (dist/travel-frontend)
CMD ["http-server", "dist/travel-frontend"]
