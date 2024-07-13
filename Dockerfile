FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm install -g prisma@5.12.1

RUN npm install

COPY . .

RUN npx prisma migrate deploy --preview-feature

RUN npx prisma generate

CMD ["sh", "-c", "sleep 30 && npm start"]
