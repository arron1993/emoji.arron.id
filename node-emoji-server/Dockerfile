FROM node:latest 

RUN mkdir /emoji.arron.id
COPY ./package.json /emoji.arron.id

WORKDIR /emoji.arron.id
RUN npm install

COPY ./src /emoji.arron.id/src

WORKDIR /emoji.arron.id/src
CMD [ "node", "index.js" ]
EXPOSE 3000

