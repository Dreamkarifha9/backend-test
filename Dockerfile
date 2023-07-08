# syntax:docker/dockerfile:1

FROM node:16.16.0-bullseye-slim as base
ENV TZ=Asia/Bangkok
ENV NODE_ENV=development

WORKDIR /app

COPY [ "package.json", "yarn.lock*", "./"]

RUN yarn install

# RUN --mount=type=cache,id=yarn-store-pkg,target=/root/.yarn YARN_CACHE_FOLDER=/root/.yarn yarn add global @nestjs/cli
# RUN --mount=type=cache,id=yarn-store-pkg,target=/root/.yarn YARN_CACHE_FOLDER=/root/.yarn yarn install

# uninstall the current bcrypt modules

RUN yarn remove bcrypt

RUN yarn add bcrypt

COPY . .

RUN yarn add global @nestjs/cli
RUN yarn build

EXPOSE 3000
CMD ["yarn", "start:prod"]