FROM node:20

RUN npm cache clean --force

WORKDIR /app

COPY package*.json ./

RUN npm install -g prisma@5.12.1

COPY . .

CMD ["sh", "-c", "npm install && npx prisma migrate deploy --preview-feature && npx prisma generate && sleep 30 && npm start"]
