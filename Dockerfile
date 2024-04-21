# Use an official Node.js runtime as the base image
FROM node:20-alpine

# Set the working directory in the Docker container
WORKDIR /app

# Copy package.json and package-lock.json to the Docker container
COPY package*.json ./

# Install your project's dependencies in the Docker container
RUN npm install
RUN npm install -g serve
RUN npm install express
RUN npm install mongodb

# Copy the rest of your project's files to the Docker container
COPY . .

# Build your Vite application for production
RUN npm run build
RUN chmod +x server.js

EXPOSE 5000

# Specify the command to start your application
#CMD [ "npm", "run", "serve" ]
CMD [ "sh", "./start.sh" ]