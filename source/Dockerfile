# Deployment de la aplicacion con Docker
FROM node:20.11.1-alpine3.19

WORKDIR /proyectos3

COPY package.json .
COPY package-lock.json .
COPY proyectos3 proyectos3

RUN npm install

CMD ["npm", "start"]