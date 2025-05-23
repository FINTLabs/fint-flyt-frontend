FROM node:22-alpine3.18 AS builder
WORKDIR /src
COPY package.json .
COPY yarn.lock .
RUN yarn install
COPY . /src
RUN yarn test:ci && yarn build


FROM node:22
WORKDIR /usr/src/app
RUN mkdir -p server
COPY server/package*.json server
COPY server/yarn.lock*.json server
COPY --from=builder /src/build/ build
RUN yarn --cwd server install
COPY server server
CMD [ "node", "server/index.js" ]
