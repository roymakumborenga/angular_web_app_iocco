### STAGE 1: Build ###
FROM node:12.14 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
### STAGE 2: Run ###
FROM nginx:2.7.0
COPY --from=build /app/dist/office-admin-web /usr/share/nginx/html

