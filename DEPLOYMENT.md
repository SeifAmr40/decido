# Deployment Guide

This project is built using **TanStack Start** and the **Vite** bundler, utilizing the **Nitro** server engine under the hood. Nitro automatically compiles server-side code (SSR & server functions) and assets to targets matching your hosting provider.

Before deploying, ensure you configure the required environment variables in your hosting provider's dashboard.

---

## 🔑 Required Environment Variables

To connect your deployment to Supabase, you must set the following environment variables in your deployment dashboard:

| Variable Name | Scope | Description | Source |
|---|---|---|---|
| `VITE_SUPABASE_URL` | Client & Server | Your Supabase Project URL | Supabase Dashboard > Settings > API |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | Client & Server | Your Supabase Anon/Publishable API Key | Supabase Dashboard > Settings > API |
| `SUPABASE_URL` | Server | Your Supabase Project URL (fallback for SSR) | Supabase Dashboard > Settings > API |
| `SUPABASE_SERVICE_ROLE_KEY` | Server | Your Supabase Service Role Key (bypasses RLS) | Supabase Dashboard > Settings > API > service_role (secret) |

> [!WARNING]
> The `SUPABASE_SERVICE_ROLE_KEY` is a secret key that bypasses Row Level Security (RLS). Ensure it is configured securely in your server environment variables and **never** exposed to client-side code (do not prefix it with `VITE_`).

> [!NOTE]
> During local development, these environment variables are loaded from `.env`. Do **not** commit your `.env` file to version control.

---

## 🚀 1. Deploying to Vercel (Recommended)

Vercel provides zero-configuration support for Nitro-based projects.

### Git / Dashboard Deployment
1. Push your project to a Git repository (GitHub, GitLab, Bitbucket).
2. Go to the [Vercel Dashboard](https://vercel.com/) and click **Add New > Project**.
3. Import your repository.
4. Vercel will automatically detect the **TanStack Start / Nitro** configuration.
5. Expand the **Environment Variables** section and add:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_PUBLISHABLE_KEY`
6. Click **Deploy**. Vercel will build and host your app on Vercel Functions with automatic scaling.

---

## ⚡ 2. Deploying to Netlify

Netlify seamlessly supports server functions and static assets via the preset integration.

### Git / Dashboard Deployment
1. Push your project to a Git repository.
2. Go to the [Netlify Dashboard](https://app.netlify.com/) and click **Add new site > Import from Git**.
3. Netlify will read the local `netlify.toml` file automatically:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
4. Under **Environment Variables**, add:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_PUBLISHABLE_KEY`
5. Click **Deploy Site**.

---

## ☁️ 3. Deploying to Cloudflare Pages

Cloudflare Pages runs your server functions on V8-isolate Cloudflare Workers (`workerd` runtime).

### Git / Dashboard Deployment
1. Push your project to a Git repository.
2. Go to the [Cloudflare Dashboard](https://dash.cloudflare.com/) and navigate to **Workers & Pages > Create > Pages > Connect to Git**.
3. Select your repository.
4. In the **Build settings** section, configure:
   - **Framework preset:** `None` (or select `Vite` if prompted, but customize settings as below)
   - **Build command:** `npm run build`
   - **Build output directory:** `.output/public`
5. In **Environment variables (advanced)**, add:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_PUBLISHABLE_KEY`
6. Click **Save and Deploy**.

### 🛠️ CLI / Manual wrangler Deployment
If you prefer deploying via terminal commands using Wrangler:
1. Run a build targeting Cloudflare:
   ```bash
   npx cross-env NITRO_PRESET=cloudflare-pages npm run build
   ```
2. Deploy the generated `.output/public` folder:
   ```bash
   npx wrangler pages deploy .output/public
   ```

---

## 📦 Local Build Testing

You can test compiling the production bundles for different presets locally using the `NITRO_PRESET` environment variable.

- **Build for Vercel:**
  ```bash
  npx cross-env NITRO_PRESET=vercel npm run build
  ```
- **Build for Netlify:**
  ```bash
  npx cross-env NITRO_PRESET=netlify npm run build
  ```
- **Build for Cloudflare:**
  ```bash
  npx cross-env NITRO_PRESET=cloudflare-pages npm run build
  ```
