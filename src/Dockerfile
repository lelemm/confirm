FROM node:slim as builder
WORKDIR /app
COPY package.json ./
COPY tsconfig.json ./
COPY src ./src
RUN npm install
RUN npm run build

FROM node:slim as final
WORKDIR /app

COPY package.json ./
RUN npm install --only=production
COPY --from=builder /app/build .

CMD [ "node", "index.js" ]

EXPOSE 8000