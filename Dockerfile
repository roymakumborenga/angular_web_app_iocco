### STAGE 1: Build ###
FROM node:12.14 AS build
WORKDIR /office-admin-web
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

### STAGE 2: Run ###
FROM nginx:1.16.1
COPY --from=build /office-admin-web/dist /usr/share/nginx/html

