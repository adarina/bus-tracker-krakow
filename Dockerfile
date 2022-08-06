FROM node:14.18.1-alpine As node-builder
WORKDIR /src
COPY . .
RUN npm install
RUN npm run build -- --configuration --output-path dist

COPY . .
RUN npm run build  

FROM nginx:1.15.2-alpine
COPY --from=node-builder /src/dist /usr/share/nginx/html
COPY nginx.site.template /etc/nginx/conf.d/default.conf