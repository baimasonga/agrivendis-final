create table if not exists loads (
  id text primary key,
  customer text not null,
  pickup text not null,
  dropoff text not null,
  eta text not null,
  status text not null,
  driver text not null,
  truck text not null,
  rate text not null,
  margin text not null
);

create table if not exists fleet (
  plate text primary key,
  model text not null,
  status text not null,
  driver text not null,
  location text not null,
  gps text not null
);

create table if not exists drivers (
  name text primary key,
  status text not null,
  hosrisk text not null,
  rating numeric not null,
  currentlocation text not null
);

create table if not exists warehouses (
  name text primary key,
  city text not null,
  utilization numeric not null,
  inbound int not null,
  outbound int not null,
  onhand int not null,
  status text not null
);
