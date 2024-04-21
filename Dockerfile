# Use an official Node.js runtime as the base image
FROM node:14

# Set the working directory in the Docker container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the Docker container
COPY package*.json ./

# Install your project's dependencies in the Docker container
RUN npm install

# Copy the rest of your project's files to the Docker container
COPY public/ ./
COPY src/ ./
COPY index.html ./
COPY vite.config.js ./

# Build your Vite application for production
RUN npm run build

# Specify the command to start your application
CMD [ "npm", "run", "serve" ]