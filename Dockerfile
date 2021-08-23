FROM node:14-alpine

RUN mkdir /app
WORKDIR /app

EXPOSE 3000 5000

CMD [ "npm", "run", "dev"]