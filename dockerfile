FROM node:latest

# Install dependencies for Docker
WORKDIR /

COPY . .

RUN npm install

CMD ["node", "server.js"]