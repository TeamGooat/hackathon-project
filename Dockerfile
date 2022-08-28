FROM node:alpine

WORKDIR /app

COPY . .

RUN yarn

WORKDIR /app/apps/server

RUN yarn prisma generate

WORKDIR /app

EXPOSE 3000 4000

CMD ["yarn", "dev"]