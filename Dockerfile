FROM node:22.21.1-alpine AS builder
WORKDIR /src
COPY package.json .
COPY yarn.lock .
RUN yarn install
COPY . /src
RUN yarn build

ENV PORT=8000
EXPOSE 8000
CMD ["yarn", "start"]
