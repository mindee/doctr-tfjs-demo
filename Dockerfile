FROM node:12-alpine

WORKDIR /usr/src/app

RUN set -eux \
    && npm install -g serve

COPY ./package.json ./
COPY ./yarn.lock ./

RUN yarn install

COPY ./tsconfig.json ./
COPY ./.env ./
COPY ./public ./public
COPY ./src ./src

RUN yarn build \
    && rm -r public src node_modules
CMD [ "serve", "--no-clipboard", "-s", "build"]
