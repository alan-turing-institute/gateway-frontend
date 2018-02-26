FROM node

RUN npm install webpack -g

ENV APP_NAME "Gateway"
ENV APP_USER "app"
ENV HOME /home/$APP_USER
ENV APP_DIR $HOME/$APP_NAME

WORKDIR $APP_DIR
COPY package.json $APP_DIR/package.json
RUN npm install
RUN npm cache verify 
COPY . $APP_DIR
WORKDIR $APP_DIR

EXPOSE 8080
CMD ["npm", "start", "--host=0.0.0.0 --port 8080"]
# RUN chown -R $APP_USER:$APP_USER $HOME/*