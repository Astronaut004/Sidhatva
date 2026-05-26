FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci --omit=dev

COPY . .

RUN mkdir -p uploads/products

EXPOSE 5000

CMD ["node", "server.js"]
