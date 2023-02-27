FROM --platform=linux/amd64 node:18-alpine as dev-deps
WORKDIR /app
COPY package.json .
RUN yarn install --frozen-lockfile

FROM --platform=linux/amd64 node:18-alpine as builder
WORKDIR /app
COPY --from=dev-deps /app/node_modules ./node_modules
COPY . .
RUN yarn build

FROM --platform=linux/amd64 node:18-alpine as prod-deps
WORKDIR /app
COPY package.json package.json
RUN yarn install --frozen-lockfile

FROM --platform=linux/amd64 node:18-alpine as prod
EXPOSE 3000
WORKDIR /app

ENV NOTION_API_KEY=${NOTION_API_KEY}
ENV APP_ENVIRONMENT=${APP_ENVIRONMENT}
ENV NOTION_HOME_ID=${NOTION_HOME_ID}
ENV NOTION_ABOUT_ID=${NOTION_ABOUT_ID}
ENV NOTION_BLOG_ID=${NOTION_BLOG_ID}
ENV NOTION_PORTFOLIO_ID=${NOTION_PORTFOLIO_ID}
ENV NOTION_LINK_TREE_ID=${NOTION_LINK_TREE_ID}
ENV DEVELOPMENT_STAGE=${DEVELOPMENT_STAGE}
ENV PRODUCTION_STAGE=${PRODUCTION_STAGE}

COPY --from=prod-deps /app/node_modules ./node_modules
COPY --from=builder /app/.output ./.output
CMD ["node", ".output/server/index.mjs"]