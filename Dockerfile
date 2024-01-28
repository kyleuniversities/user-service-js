# Import base image
FROM node:16-alpine

# Set the working directory
WORKDIR /app

# Copy all files to container
COPY . .

# Install pm2
RUN npm install -g pm2

# Install dependencies
RUN npm run preinstall

# Expose ports
EXPOSE 3000
EXPOSE 5000

# Run app
CMD ["npm", "start"]