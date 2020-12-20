FROM node:14.15.3

RUN mkdir /usr/src/app

WORKDIR /usr/src/app

RUN npm install -g @angular/cli

COPY package.json package.json

RUN npm install
