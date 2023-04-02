# Use the official Node.js image as the base image
FROM node:latest

# Create and set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files into the container
COPY package*.json ./

# Install the application dependencies
RUN npm install

# Copy the rest of the application files into the container
COPY . .

# Expose the port that the application will run on
EXPOSE 8000

# Start the Node.js application
CMD [ "npm", "start" ]