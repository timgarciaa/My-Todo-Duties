ARG NODE_VERSION=20.11.1
FROM node:${NODE_VERSION}-alpine

WORKDIR /app

COPY ["package.json", "package-lock.json", "tsconfig.json", ".env", "./"]

COPY . .

RUN npm install

CMD npm run dev
