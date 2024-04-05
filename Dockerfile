FROM node:12-alpine

WORKDIR /usr/src/app

RUN set -eux \
    && npm install -g serve@13.0.2

COPY ./package.json ./
COPY ./yarn.lock ./

RUN yarn install \
    && yarn cache clean

COPY ./tsconfig.json ./
COPY ./.env ./
COPY ./public ./public
COPY ./src ./src

RUN yarn build \
    && yarn cache clean \
    && rm -r public src node_modules
CMD [ "serve", "--no-clipboard", "-s", "build"]
