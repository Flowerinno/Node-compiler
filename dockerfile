FROM node:latest

# Install dependencies for Docker
RUN apt-get update && \
    apt-get install sudo && \
    sudo apt install -y apt-transport-https ca-certificates curl software-properties-common && \
    curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add - && \
    sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu focal stable" && \
    sudo apt install -y docker.io && \
    sudo service docker start

WORKDIR /

COPY . .

RUN npm install

CMD ["node", "server.js"]