# Deployment de la aplicacion con Docker
FROM node:20.11.1-alpine3.19
WORKDIR /proyectos3

# Copiar los archivos necesarios para la aplicacion
COPY package.json .
COPY package-lock.json .
COPY proyectos3 proyectos3

# Archivo de configuracion de la base de datos para prisma
COPY prisma prisma
RUN echo "MYSQL_URL=\"mysql://proyectos3:PR0Y3C7053@172.19.0.2:3306/proyectos3\"" > .env

# Instalar las dependencias de la aplicacion
RUN npm install
RUN npx prisma generate

# Comando para iniciar la aplicacion
CMD ["npm", "start"]