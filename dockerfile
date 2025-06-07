FROM node:20-alpine
WORKDIR /app

# Install dependencies pertama untuk caching
COPY package*.json ./
RUN npm install --production

# Copy aplikasi
COPY . .

EXPOSE 3000
CMD ["node", "server.js"]