FROM node:20-alpine AS build
WORKDIR /app
COPY skill-map/package*.json ./
RUN npm install
COPY skill-map/ ./
CMD ["nmp", "run", "build"]