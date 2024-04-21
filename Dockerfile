# Use an official Node.js runtime as the base image
FROM node:14

# Set the working directory in the Docker container
WORKDIR /app

# Copy package.json and package-lock.json to the Docker container
COPY package*.json ./

# Install your project's dependencies in the Docker container
RUN npm install
RUN npm install -g serve

# Copy the rest of your project's files to the Docker container
COPY public/ ./
COPY src/ ./
COPY index.html ./
COPY vite.config.js ./

# Build your Vite application for production
RUN npm run build

EXPOSE 5000

# Specify the command to start your application
CMD [ "npm", "run", "serve" ]