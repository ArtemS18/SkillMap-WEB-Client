FROM node:20-alpine AS build
WORKDIR /app

ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

COPY skill-map/package*.json ./
RUN npm install
COPY skill-map/ ./
CMD ["npm", "run", "build"]