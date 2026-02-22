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

## Build

```bash
npm run build
npm run preview
```
