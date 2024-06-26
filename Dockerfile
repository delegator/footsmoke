FROM mcr.microsoft.com/playwright:v1.45.0-jammy

WORKDIR /var/footsmoke

COPY package.json .
COPY package-lock.json .
COPY playwright.config.ts .
COPY tests/smoke.spec.ts tests/smoke.spec.ts

RUN npm ci

CMD ["npx", "--yes", "playwright", "test"]
