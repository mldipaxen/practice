FROM node:20-alpine AS builder

WORKDIR /app
COPY . .

RUN npm install
RUN npm run build

FROM node:20-alpine

RUN npm install -g http-server

WORKDIR /app

COPY --from=builder /app/build ./build

EXPOSE 3000

# Запуск сервера на порту 3000
CMD ["http-server", "build", "-p", "3000"]
