FROM node:12

WORKDIR /usr/src/app

COPY . .

RUN npm install

COPY . .

CMD [ "node", "src/index.js" ]