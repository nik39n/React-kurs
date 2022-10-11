FROM node:16-alpine

RUN npm install nodemon -g
WORKDIR /app


COPY package*.json ./

RUN npm install
RUN npm install react-ajax --save
RUN npm install react-use-websocket
RUN npm install chart.js react-chartjs-2
RUN npm install @faker-js/faker

COPY . .

EXPOSE 3000
CMD [ "npm", "run" , "dev"]