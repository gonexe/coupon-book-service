FROM node:16-alpine

# Install bash
RUN apk add --no-cache bash

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Compile TypeScript
RUN npx tsc

# Expose the port the app runs on
EXPOSE 3000

# Command to run migrations and then start the server
CMD ["sh", "-c", "npx sequelize-cli db:migrate --config sequelize-config.js && npx ts-node src/server.ts"]