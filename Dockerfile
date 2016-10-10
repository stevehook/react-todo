FROM node:latest
ENV REFRESHED_AT 2016-10-04

RUN mkdir -p /app/ui

WORKDIR /app/ui
ADD package.json /app/ui/package.json
RUN npm install
