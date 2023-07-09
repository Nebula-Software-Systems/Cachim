FROM node:16-alpine AS build

ARG ENV_TO_RUN
WORKDIR /app

COPY . .
RUN npm install
RUN ./node_modules/.bin/ng build --configuration ${ENV_TO_RUN} --output-path=inmemoryvisualizer

FROM nginx:alpine
COPY --from=build /app/inmemoryvisualizer /usr/share/nginx/html
EXPOSE 80
