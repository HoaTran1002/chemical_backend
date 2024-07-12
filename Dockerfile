FROM node:20

WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install node modules
RUN npm install

# Copy the rest of the application code
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Delay to ensure MySQL is ready
CMD ["sh", "-c", "sleep 30 && npx prisma migrate deploy && npm start"]
