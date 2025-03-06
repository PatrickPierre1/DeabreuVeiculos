FROM node:23-alpine

WORKDIR /app/DeabreuStore

RUN npm config set strict-ssl false

COPY . .

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start"]
