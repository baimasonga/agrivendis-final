insert into loads (id, customer, pickup, dropoff, eta, status, driver, truck, rate, margin, priority) values
('LD-2024-001847','Walmart Distribution','Chicago, IL','Atlanta, GA','2026-02-28T14:30:00Z','In Transit','Mike Rodriguez','FL-4892',2850,18.5,'High'),
('LD-2024-001848','Target Corporation','Dallas, TX','Phoenix, AZ','2026-02-27T09:15:00Z','Assigned','Jennifer Chen','TX-7841',1950,22.1,'Medium'),
('LD-2024-001849','Amazon Logistics','Los Angeles, CA','Seattle, WA','2026-02-26T22:45:00Z','Loading','David Thompson','CA-3952',3200,15.8,'High'),
('LD-2024-001850','FedEx Ground','Miami, FL','Jacksonville, FL','2026-02-25T16:20:00Z','Delivered','Maria Santos','FL-2847',850,28.2,'Low')
on conflict do nothing;

insert into fleet_vehicles (plate, model, status, driver, location, gps) values
('FL-4892','Freightliner Cascadia','Available','Michael Rodriguez','Chicago, IL','2 minutes ago'),
('TX-7841','Peterbilt 579','In Use','Jennifer Chen','Dallas, TX','5 minutes ago'),
('CA-3952','Volvo VNL 860','Maintenance','Unassigned','Los Angeles, CA','2 hours ago')
on conflict do nothing;

insert into drivers (name, status, hosrisk, rating, currentlocation) values
('Michael Rodriguez','Available','Low',4.9,'Chicago, IL'),
('Jennifer Chen','On Trip','Medium',4.7,'Dallas, TX'),
('David Thompson','Off Duty','High',4.8,'Denver, CO')
on conflict do nothing;

insert into routes (id, load_id, driver, origin, destination, progress, eta) values
('RT-001','LD-2024-001847','Mike Rodriguez','Chicago, IL','Atlanta, GA',58,'2026-02-28T14:30:00Z'),
('RT-002','LD-2024-001848','Jennifer Chen','Dallas, TX','Phoenix, AZ',34,'2026-02-27T09:15:00Z')
on conflict do nothing;

insert into warehouses (id, name, city, utilization, inbound, outbound, onhand, status) values
('WH-001','Chicago Distribution Center','Chicago, IL',87.3,142,238,5847,'Active'),
('WH-002','Atlanta Regional Hub','Atlanta, GA',94.8,89,156,8234,'Critical')
on conflict do nothing;

insert into pod_submissions (id, load_id, customer, delivered_at, driver, status) values
('POD-001','LD-2024-001850','FedEx Ground','2026-02-25T16:30:00Z','Maria Santos','Pending Upload')
on conflict do nothing;

insert into invoices (id, load_id, customer, amount, due_date, status) values
('INV-001','LD-2024-001847','Walmart Distribution',2850,'2026-03-05','Sent'),
('INV-002','LD-2024-001850','FedEx Ground',850,'2026-02-20','Overdue')
on conflict do nothing;

insert into app_settings (company, timezone, alerts_enabled)
values ('FleetFlow Logistics', 'UTC', true)
on conflict do nothing;
