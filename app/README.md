# FleetFlow Dashboard (Supabase-ready)

A React + TypeScript implementation of the logistics dashboard shown in the supplied reference mockups.

## Features

- Sidebar navigation matching FleetFlow structure
- Dashboard cards + live operations panel
- Orders/Loads table
- Fleet table
- Drivers table
- Routes map placeholder panel
- Warehouses cards
- Supabase integration with local fallback seed data

## Setup

```bash
npm install
cp .env.example .env
npm run dev
```

Fill in your Supabase credentials in `.env`:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

## Supabase schema

Run `supabase/schema.sql` in your project SQL editor.

## Build

```bash
npm run build
npm run preview
```
