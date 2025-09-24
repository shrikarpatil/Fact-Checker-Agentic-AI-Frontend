FROM node:20-alpine AS  builder

WORKDIR /app

COPY package.json package-lock.json* ./


RUN npm ci


COPY . .


RUN npm run build


FROM node:20-alpine AS runner

WORKDIR /app


COPY package.json package-lock.json* ./

RUN npm ci --omit=dev


COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.mjs ./next.config.mjs


EXPOSE 3000


CMD ["npm", "start"]