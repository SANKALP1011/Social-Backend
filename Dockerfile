# Base image
FROM node:14

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy application code
COPY . .

# Expose the port on which your application runs
EXPOSE 3002

# Install nodemon globally
RUN npm install -g nodemon

# Start the application with nodemon
CMD [ "nodemon", "app.js" ]
