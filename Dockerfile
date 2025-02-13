FROM node:22.13.1

WORKDIR /home/node/app 
ENV NODE_ENV=production

RUN id node || useradd -m -g node -s /bin/bash node

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

USER node

RUN mkdir -p /home/node/app/database &&  chown -R node:node /home/node/app/database

COPY package*.json ./



RUN npm install --omit=dev

COPY --chown=node:node . .
 

EXPOSE 3000


CMD ["npm", "run", "dev"];
