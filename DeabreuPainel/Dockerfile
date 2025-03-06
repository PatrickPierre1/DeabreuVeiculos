FROM node:23-alpine

WORKDIR /app/DeabreuPainel

RUN npm config set strict-ssl false

COPY . .

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3001

CMD ["npm", "run", "start"]
