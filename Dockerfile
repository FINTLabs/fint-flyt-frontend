ARG BASE_PATH=/

FROM node:22.21.1-alpine
WORKDIR /src
ARG BASE_PATH
ENV BASE_PATH=$BASE_PATH
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile
COPY . .
RUN yarn build

ENV PORT=8000
EXPOSE 8000
CMD ["yarn", "start"]
