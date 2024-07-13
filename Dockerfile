FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

CMD ["sh", "-c", "npx prisma migrate deploy --preview-feature && npx prisma generate && sleep 30 && npm start"]
