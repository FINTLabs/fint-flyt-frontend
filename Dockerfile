FROM node:16.14.0-alpine AS builder
WORKDIR /src
COPY package.json .
COPY yarn.lock .
RUN yarn install
COPY . /src
RUN yarn test:ci && yarn build


