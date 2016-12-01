FROM ubuntu:trusty
MAINTAINER Brian Maher "dev@bmaher.com"

RUN apt-get -qq update
RUN apt-get -qq install nginx
RUN curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
RUN apt-get -qq install nodejs

VOLUME /app

ADD nginx/global.conf /etc/nginx/conf.d/
ADD nginx/nginx.conf /etc/nginx/nginx.conf
ADD /etc/letsencrypt/live/bmaher.com/fullchain.pem /etc/nginx/ssl
ADD /etc/letsencrypt/live/bmaher.com/privkey.pem /etc/nginx/ssl

EXPOSE 80
EXPOSE 443
