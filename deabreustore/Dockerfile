FROM node:23-alpine

WORKDIR /app/deabreustore

RUN npm config set strict-ssl false

COPY . .

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]
