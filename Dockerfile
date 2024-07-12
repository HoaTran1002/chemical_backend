FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npx prisma generate

RUN npx prisma migrate dev --name init 

CMD ["sh", "-c", "sleep 30 && npx prisma migrate deploy && npm start"]
