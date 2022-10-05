FROM node:14

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN yarn install --frozen-lockfile
# If you are building your code for production
# RUN npm ci --only=production

COPY . .

RUN yarn build
RUN yarn copy:files:docker

# Bundle app source

EXPOSE 8080
CMD [ "node", "build/index.js" ]