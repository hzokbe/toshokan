FROM node:lts-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install -g serve

COPY dist ./dist

EXPOSE 5173

CMD ["serve", "-s", "dist", "-l", "5173"]
