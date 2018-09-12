# use a multi-stage build

# build the angular static files
FROM node:10-alpine as build-stage

# create /app directory
COPY . /app
WORKDIR /app 
RUN npm install

RUN npm run build -- --output-path=./dist/out

# configure an nginx server and copy across the following:
#   * angular static files
#   * nginx configuration
FROM nginx:1.15
COPY --from=build-stage /app/dist/out /usr/share/nginx/html
COPY --from=build-stage /app/nginx.conf /etc/nginx/conf.d/default.conf