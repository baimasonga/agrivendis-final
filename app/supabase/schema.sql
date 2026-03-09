create table if not exists loads (
  id text primary key,
  customer text not null,
  pickup text not null,
  dropoff text not null,
  eta timestamptz not null,
  status text not null check (status in ('In Transit','Assigned','Loading','Delivered','Unassigned')),
  driver text not null,
  truck text not null,
  rate numeric(12,2) not null,
  margin numeric(5,2) not null,
  priority text not null check (priority in ('Low','Medium','High')),
  created_at timestamptz default now()
);

create table if not exists fleet_vehicles (
  plate text primary key,
  model text not null,
  status text not null check (status in ('Available','In Use','Maintenance','Critical')),
  driver text not null,
  location text not null,
  gps text not null,
  created_at timestamptz default now()
);

create table if not exists drivers (
  name text primary key,
  status text not null check (status in ('Available','On Trip','Off Duty')),
  hosrisk text not null check (hosrisk in ('Low','Medium','High')),
  rating numeric(2,1) not null,
  currentlocation text not null,
  created_at timestamptz default now()
);

create table if not exists routes (
  id text primary key,
  load_id text not null references loads(id) on delete cascade,
  driver text not null,
  origin text not null,
  destination text not null,
  progress int not null default 0 check (progress between 0 and 100),
  eta timestamptz not null,
  created_at timestamptz default now()
);

create table if not exists warehouses (
  id text primary key,
  name text not null,
  city text not null,
  utilization numeric(5,2) not null,
  inbound int not null,
  outbound int not null,
  onhand int not null,
  status text not null check (status in ('Active','Critical','Maintenance')),
  created_at timestamptz default now()
);

create table if not exists pod_submissions (
  id text primary key,
  load_id text not null references loads(id) on delete cascade,
  customer text not null,
  delivered_at timestamptz not null,
  driver text not null,
  status text not null check (status in ('Pending Upload','Submitted','Approved','Rejected')),
  file_name text,
  created_at timestamptz default now()
);

create table if not exists invoices (
  id text primary key,
  load_id text not null references loads(id) on delete cascade,
  customer text not null,
  amount numeric(12,2) not null,
  due_date date not null,
  status text not null check (status in ('Draft','Sent','Paid','Overdue')),
  created_at timestamptz default now()
);

create table if not exists app_settings (
  id bigint primary key generated always as identity,
  company text not null,
  timezone text not null,
  alerts_enabled boolean not null default true,
  updated_at timestamptz default now()
);
