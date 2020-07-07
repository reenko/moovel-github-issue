FROM node:10.15.2-alpine

# Create app directory
WORKDIR /app

RUN npm install -g typescript ts-node

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

ENV NODE_ENV production

CMD ["node", "./dist/server.js"]
