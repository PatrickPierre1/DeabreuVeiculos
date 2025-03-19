FROM node:23-alpine

WORKDIR /app/deabreupainel

RUN npm config set strict-ssl false

COPY . .

RUN npm install

COPY . .

EXPOSE 3001

CMD ["npm", "run", "dev"]
