FROM node:20-alpine AS  builder

WORKDIR /app

COPY package.json package-lock.json* ./
COPY next.config.mjs .


RUN npm ci


COPY . .


RUN npm run build


FROM node:20-alpine AS runner

WORKDIR /app


COPY package.json package-lock.json* ./

RUN npm ci --omit=dev


COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.js ./next.config.js


EXPOSE 3000


CMD ["npm", "start"]
