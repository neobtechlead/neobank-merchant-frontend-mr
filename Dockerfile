# pull official base image
FROM node:18-alpine as builder

# Run container as unprivileged user
USER node

RUN mkdir -p /home/node/app

# set working directory
WORKDIR /home/node/app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /home/node/app/node_modules/.bin:$PATH

# copy package json into project (and create a directory at root for node_modules)
COPY package.json *yarn* ./

COPY --chown=node:node . .
RUN chown -R node:node /home/node/app

# Installs all node packages
RUN yarn --silent
RUN yarn global add react-scripts@3.4.1 --silent
RUN yarn global add postcss-cli@7.1.1 --silent


RUN yarn build

# production environment
FROM nginx:stable-alpine

RUN rm /etc/nginx/conf.d/*

# create cache directory for nginx 
#RUN mkdir -p /var/cache/nginx


RUN mkdir -p /var/cache/nginx

COPY ./.nginx/nginx.conf /etc/nginx/nginx.conf

## Remove default nginx index page
RUN rm -rf /usr/share/nginx/html/*

# copy build files to nginx delivery directory
COPY --from=builder /home/node/app/build /usr/share/nginx/html
EXPOSE 3000 80

CMD ["nginx", "-g", "daemon off;"]