# Use an official Node.js runtime as a parent image
FROM node:14

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install npm packages
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the React.js application
RUN npm run build

# Expose port 3000
EXPOSE 3000

# Start the React.js application
CMD ["npm", "start"]
