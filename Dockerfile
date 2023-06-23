# Base image
FROM node:14


WORKDIR /app


COPY package*.json ./


RUN npm install


COPY . .


EXPOSE 3002


RUN npm install -g nodemon


CMD [ "nodemon", "app.js" ]
