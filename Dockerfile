ARG BASE_PATH=/

FROM node:22.22.0-alpine
WORKDIR /src
ARG BASE_PATH
ENV BASE_PATH=$BASE_PATH
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

ENV PORT=8000
EXPOSE 8000
CMD ["npm", "run", "serve"]
