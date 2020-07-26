# MarvelBackAPI

## Install

node v12.18.3
npm 6.14.6

`npm install`

## Development server

Run `npm start`

## Dockerize

Run `docker build -t marvel-back-api .` then `docker run --name marvel-back-api -d -p 3000:3000 marvel-back-api`

## Endpoint

Characters list API

`http://localhost:3000/api/characters/list?limit=10&offset=0`
