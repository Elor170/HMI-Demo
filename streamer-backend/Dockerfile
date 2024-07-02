FROM node:20-slim

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .


RUN npm run build

ENV NODE_ENV=production
ENV PORT=3000

EXPOSE $PORT

# Define the command to run the app
CMD ["npm", "start"]
