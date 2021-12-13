FROM node:14

WORKDIR /application

COPY package.json ./

COPY yarn.lock ./

EXPOSE 3000

COPY . .
