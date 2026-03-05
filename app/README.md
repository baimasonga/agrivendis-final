# FleetFlow Dashboard (Supabase-ready)

Feature-complete multi-page logistics dashboard with interactive behavior across all sidebar modules.

## Run locally

```bash
cd app
npm install
cp .env.example .env
npm run dev
```

## Supabase setup

1. Create a Supabase project.
2. Set env values in `.env`:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
3. Run SQL scripts in order:
   1. `supabase/schema.sql`
   2. `supabase/seed.sql`

## Implemented functionality by page

- **Dashboard:** KPI cards and live dispatch snapshot.
- **Orders / Loads:** Status filter + create load.
- **Dispatch Board:** Kanban columns + status update per load.
- **Fleet:** Status filter + maintenance toggle.
- **Drivers:** Status filter + assign/release toggle.
- **Routes & Tracking:** Route progress increment actions.
- **Warehouses / Hubs:** Utilization adjustment controls.
- **Proof of Delivery:** File upload simulation that updates POD status.
- **Billing & Invoices:** Mark invoice paid actions.
- **Reports:** Auto-computed delivery, revenue, overdue metrics.
- **AI Ops Assistant:** Prompt/reply operational recommendations.
- **Settings:** Editable settings persisted to localStorage.


## Deploy on Vercel

This repository keeps the Vite app in `app/` (not repo root).
A root-level `vercel.json` is included so Vercel builds correctly:

- Install: `cd app && npm install`
- Build: `cd app && npm run build`
- Output: `app/dist`
- SPA rewrite: `/(.*) -> /index.html`

In Vercel dashboard:
1. Import the GitHub repo.
2. Leave Root Directory as project root (default).
3. Ensure environment variables are set:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`

## Build

```bash
npm run build
npm run preview
```
