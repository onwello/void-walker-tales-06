# Void Walker Tales

Built with Vite, React, TypeScript, Tailwind CSS, and shadcn/ui.

## Develop

```sh
npm install
npm run dev
```

## Build

```sh
npm run build
```

Output is in `dist/`.

## Deploy to Cloudflare (Workers + static assets)

### Option A: Wrangler CLI

1. Install Wrangler (if needed): `npm install -g wrangler`
2. Log in: `npx wrangler login`
3. Deploy:

```sh
npm run deploy
```

Or manually: `npm run build && npx wrangler deploy`

### Option B: Cloudflare dashboard (Git integration)

1. In [Cloudflare Dashboard](https://dash.cloudflare.com) go to **Workers & Pages** → **Create** → **Pages** (or **Workers**) → **Connect to Git**.
2. Select this repo.
3. Set **Build output directory**: `dist`.
4. **Use npm (required)** if the build fails with “lockfile had changes, but lockfile is frozen”:
   - **Build command**: `npm ci && npm run build`
   - **Settings** → **Environment variables** (Production and Preview): add **Variable** `SKIP_DEPENDENCY_INSTALL`, **Value** `1`.
5. Set **Deploy command** (if applicable): `npx wrangler deploy`
6. Save and deploy.

SPA client-side routing is handled by `wrangler.toml` via `not_found_handling = "single-page-application"`.

## Scripts

| Script           | Description                          |
| ---------------- | ------------------------------------ |
| `npm run dev`    | Start dev server (port 8080)         |
| `npm run build`  | Production build → `dist`            |
| `npm run preview`| Preview production build            |
| `npm run deploy` | Build + deploy to Cloudflare Workers |
| `npm run lint`   | Run ESLint                           |
