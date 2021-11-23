FROM node:14-slim

WORKDIR /usr/src/app

COPY ./package.json ./
COPY ./yarn.lock ./

RUN yarn install

COPY ./tsconfig.json ./
COPY ./.env ./
COPY ./public ./public
COPY ./src ./src

CMD [ "yarn", "start"]
