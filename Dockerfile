# We're using a multi-stage build process to reduce the final image size.
# The builder stage installs all dependencies and builds the Next.js application.
# The runner stage starts with a clean Node.js image and copies only the necessary files
# from the builder stage. This includes the build output, package.json, node_modules, and public assets.

FROM node:18-alpine as builder

# Set the working directory in the container to /app
WORKDIR /app

# Copy package.json and package-lock.json files to the working directory
COPY package.json package-lock.json ./

# Install the application dependencies
RUN npm install --only=production

# Copy the rest of the application
COPY . .

# Set environment variables
ARG GHOST_URL
ARG GHOST_KEY
ARG STAGING_USERNAME
ARG STAGING_PASSWORD
ENV GHOST_URL=$GHOST_URL
ENV GHOST_KEY=$GHOST_KEY
ENV STAGING_USERNAME=$STAGING_USERNAME
ENV STAGING_PASSWORD=$STAGING_PASSWORD


# Build the Next.js application
RUN npm run build


# Start the second stage
FROM node:18-alpine as runner

WORKDIR /app

# Copy the build output from the previous stage
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/public ./public

# Expose port 3000 for the application to listen on
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
