# Use official Node.js image as a base
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY frontend/package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY frontend/ .

# Build the React application
# RUN npm run build

# # Install a simple HTTP server to serve the build
# RUN npm install -g serve

# Expose the application port
EXPOSE 8089

# Serve the React application
# CMD ["serve", "-s", "build", "-l", "99"]
CMD ["npm", "run", "dev"]
