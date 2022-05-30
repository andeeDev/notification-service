FROM node:18.1.0-alpine3.14 AS build

WORKDIR /app
COPY package*.json ./
RUN npm i
COPY . ./

# build js & remove devDependencies from node_modules
RUN npm run build && npm prune --production


FROM node:18.1.0-alpine3.14


ENV NODE_ENV=production
WORKDIR /app

COPY --from=build /app/dist /app/dist
COPY --from=build /app/node_modules /app/node_modules


ENTRYPOINT [ "node" ]
CMD [ "dist/main.js" ]