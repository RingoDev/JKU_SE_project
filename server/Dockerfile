FROM node:12

# Create app directory
WORKDIR /usr/src/app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package.json .
COPY yarn.lock .
COPY tsconfig.json .
COPY src src

RUN yarn install
RUN yarn build
# If you are building your code for production
# RUN npm ci --only=production

EXPOSE 3001
CMD [ "node", "dist/index.js" ]