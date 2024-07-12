FROM node:20

WORKDIR /app


COPY package*.json ./


RUN npm install


COPY . .


RUN npx prisma generate


RUN npx prisma migrate deploy --preview-feature


CMD ["sh", "-c", "sleep 30 && npm start"]
