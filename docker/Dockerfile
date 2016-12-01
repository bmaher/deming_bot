FROM ubuntu:trusty
MAINTAINER Brian Maher "dev@bmaher.com"

RUN apt-get -qq update
RUN apt-get -qq install nginx curl
RUN curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
RUN apt-get -qq install nodejs

VOLUME /app
VOLUME /etc/letsencrypt

ADD nginx/global.conf /etc/nginx/conf.d/
ADD nginx/nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
EXPOSE 443
