FROM node:slim as builder
WORKDIR /app
COPY package.json ./
COPY tsconfig.json ./
COPY . .
RUN npm install
RUN npm run build

FROM node:slim as final
WORKDIR /app

COPY package.json ./
RUN npm install --only=production
COPY --from=builder /app/build .
COPY --from=builder /app/public ./public/

CMD [ "node", "index.js" ]

EXPOSE 8000