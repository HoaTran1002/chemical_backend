FROM node:20

WORKDIR /app

COPY package*.json ./
RUN rm -rf package-lock.json
RUN npm install -g npm@latest

RUN npm cache clean --force

RUN npm prune
RUN npm install -g prisma@5.12.1

RUN npm install

RUN npm install @types/cors --save-dev



COPY . .

CMD ["sh", "-c", "npx prisma migrate deploy --preview-feature && npx prisma generate && sleep 30 && npm start"]
