FROM node:10

# App directory
WORKDIR /usr/src/app

# Install app dependecies
COPY package*.json ./
RUN npm install
COPY . .

# Start app
CMD [ "npm", "start" ]