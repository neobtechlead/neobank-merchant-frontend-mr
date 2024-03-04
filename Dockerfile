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

# Copy the application code without assigning write permissions to the executable
COPY --chown=node:node . .

# Ensure the node user has write permissions for the necessary directories during the build
RUN chmod -R 755 /home/node/app

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

COPY ./.nginx/nginx.conf /etc/nginx/nginx.conf

## Remove default nginx index page
RUN rm -rf /usr/share/nginx/html/*

# copy build files to nginx delivery directory
COPY --from=builder /home/node/app/build /usr/share/nginx/html
COPY --from=builder /home/node/app/public/assets /usr/share/nginx/html/assets

# Ensure the node user has read-only permissions
RUN chown -R nginx:nginx /usr/share/nginx/html
RUN chmod -R 755 /usr/share/nginx/html

EXPOSE 3000 80

CMD ["nginx", "-g", "daemon off;"]
