FROM node:latest as angular_build

RUN npm install -g @angular/cli


RUN mkdir /ng-emoji
COPY ./package.json /ng-emoji

WORKDIR /ng-emoji
RUN npm install
RUN npx ngcc

COPY ./src /ng-emoji/src
COPY ./dist /ng-emoji/dist
COPY ./angular.json /ng-emoji
COPY ./tsconfig.app.json /ng-emoji
COPY ./tsconfig.json /ng-emoji
# RUN npm run build-prod

FROM nginx:latest

COPY --from=angular_build /ng-emoji/dist /usr/share/nginx/html

