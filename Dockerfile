FROM node:8

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package*.json ./
RUN npm install

# Bundle app source
COPY . .

EXPOSE 9595

ENV PATH /app/node_modules/.bin:$PATH

ADD . /app

CMD [ "npm", "start" ]
