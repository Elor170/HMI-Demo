# Use the official Node.js image from the Docker Hub
FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

ENV NODE_ENV=production
ENV PORT=5173
ENV VITE_STREAMER_SERVER=http://localhost:3001

EXPOSE $PORT

# Define the command to run the app
CMD ["npm", "run", "preview"]
