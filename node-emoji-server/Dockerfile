FROM node:latest 

RUN mkdir /squares.arron.id
COPY ./package.json /squares.arron.id

WORKDIR /squares.arron.id
RUN npm install

COPY ./src /squares.arron.id/src

WORKDIR /squares.arron.id/src
CMD [ "node", "index.js" ]
EXPOSE 3000

