# Используем образ node:17-alpine для сборки приложения
FROM node:17-alpine as builder

# Создаем рабочую директорию в папке /app
WORKDIR /app

# Копируем файлы package.json и package-lock.json
COPY package.json /app/
COPY package-lock.json /app/

# Устанавливаем все зависимости
RUN npm ci && npm cache clean --force

# Копируем все остальные файлы в рабочую директорию
COPY . /app

# Собираем проект
RUN npm run build

# Начинаем финальный образ с node:17-alpine
FROM node:17-alpine

# Создаем рабочую директорию в папке /app
WORKDIR /app

# Копируем собранные файлы из предыдущего этапа
COPY --from=builder /app/.output /app/.output

# Устанавливаем переменные окружения для хоста и порта
ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=3000

# Открываем порт 3000 для сервера
EXPOSE 3000

# Запускаем проект с помощью node
CMD [ "node", ".output/server/index.mjs" ]
