import { type ReactNode, useEffect, useMemo, useState } from 'react';
import {
  FiBarChart2,
  FiBox,
  FiClipboard,
  FiCpu,
  FiFileText,
  FiGrid,
  FiHome,
  FiMap,
  FiNavigation,
  FiSettings,
  FiTruck,
  FiUser,
} from 'react-icons/fi';
import './App.css';
import { fetchDrivers, fetchFleet, fetchLoads, fetchWarehouses } from './supabase';
import type { DriverRecord, FleetVehicle, LoadRecord, NavItem, Warehouse } from './types';

const navItems: { label: NavItem; icon: ReactNode }[] = [
  { label: 'Dashboard', icon: <FiHome /> },
  { label: 'Orders / Loads', icon: <FiClipboard /> },
  { label: 'Dispatch Board', icon: <FiGrid /> },
  { label: 'Fleet', icon: <FiTruck /> },
  { label: 'Drivers', icon: <FiUser /> },
  { label: 'Routes & Tracking', icon: <FiMap /> },
  { label: 'Warehouses / Hubs', icon: <FiBox /> },
  { label: 'Proof of Delivery', icon: <FiFileText /> },
  { label: 'Billing & Invoices', icon: <FiBarChart2 /> },
  { label: 'Reports', icon: <FiBarChart2 /> },
  { label: 'AI Ops Assistant', icon: <FiCpu /> },
  { label: 'Settings', icon: <FiSettings /> },
];

function App() {
  const [active, setActive] = useState<NavItem>('Dashboard');
  const [loads, setLoads] = useState<LoadRecord[]>([]);
  const [fleet, setFleet] = useState<FleetVehicle[]>([]);
  const [drivers, setDrivers] = useState<DriverRecord[]>([]);
  const [warehouses, setWarehouses] = useState<Warehouse[]>([]);

  useEffect(() => {
    Promise.all([fetchLoads(), fetchFleet(), fetchDrivers(), fetchWarehouses()]).then(
      ([l, f, d, w]) => {
        setLoads(l);
        setFleet(f);
        setDrivers(d);
        setWarehouses(w);
      },
    );
  }, []);

  const stats = useMemo(
    () => [
      { title: 'Active Loads', value: loads.length || 247, accent: 'blue' },
      { title: 'On-time %', value: '94.2%', accent: 'green' },
      { title: 'Trucks Available', value: 89, accent: 'purple' },
      { title: 'Exceptions', value: 12, accent: 'red' },
      { title: 'Fuel Cost (MTD)', value: '$89.2K', accent: 'orange' },
      { title: 'Revenue (MTD)', value: '$1.2M', accent: 'green' },
    ],
    [loads.length],
  );

  return (
    <div className="shell">
      <aside className="sidebar">
        <h1>FleetFlow</h1>
        {navItems.map((item) => (
          <button
            key={item.label}
            className={active === item.label ? 'nav active' : 'nav'}
            onClick={() => setActive(item.label)}
          >
            {item.icon} {item.label}
          </button>
        ))}
      </aside>

      <main className="content">
        <header>
          <input placeholder="Search loads, trucks, drivers..." />
          <select><option>Last 7 days</option></select>
          <select><option>All Locations</option></select>
          <div className="user">Sarah Johnson</div>
        </header>

        <section className="cards">
          {stats.map((s) => (
            <article key={s.title} className={`card ${s.accent}`}>
              <span>{s.title}</span>
              <h2>{s.value}</h2>
            </article>
          ))}
        </section>

        {active === 'Dashboard' && (
          <section className="dashboard-grid">
            <div className="panel map">
              <h3>Live Operations</h3>
              <div className="fake-map">
                <span className="dot d1">FL-4892</span>
                <span className="dot d2">TX-7841</span>
                <span className="dot d3">NY-1847</span>
              </div>
            </div>
            <div className="panel">
              <h3>Today's Dispatch</h3>
              {loads.map((l) => (
                <div key={l.id} className="list-item">
                  <strong>{l.id}</strong>
                  <small>{l.pickup} → {l.dropoff}</small>
                  <span className="pill">{l.status}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {active === 'Orders / Loads' && (
          <section className="panel table">
            <h3>Orders / Loads</h3>
            <table>
              <thead><tr><th>Load ID</th><th>Customer</th><th>Pickup → Drop</th><th>ETA</th><th>Status</th><th>Driver</th><th>Truck</th><th>Rate</th></tr></thead>
              <tbody>
                {loads.map((l) => (
                  <tr key={l.id}><td>{l.id}</td><td>{l.customer}</td><td>{l.pickup} → {l.dropoff}</td><td>{l.eta}</td><td><span className="pill">{l.status}</span></td><td>{l.driver}</td><td>{l.truck}</td><td>{l.rate}</td></tr>
                ))}
              </tbody>
            </table>
          </section>
        )}

        {active === 'Fleet' && (
          <section className="panel table">
            <h3>Fleet – Trucks & Trailers Management</h3>
            <table>
              <thead><tr><th>Plate</th><th>Model</th><th>Status</th><th>Driver</th><th>Location</th><th>Last GPS</th></tr></thead>
              <tbody>
                {fleet.map((v) => (
                  <tr key={v.plate}><td>{v.plate}</td><td>{v.model}</td><td><span className="pill">{v.status}</span></td><td>{v.driver}</td><td>{v.location}</td><td>{v.gps}</td></tr>
                ))}
              </tbody>
            </table>
          </section>
        )}

        {active === 'Drivers' && (
          <section className="panel table">
            <h3>Driver Management</h3>
            <table>
              <thead><tr><th>Name</th><th>Status</th><th>HOS Risk</th><th>Rating</th><th>Current Location</th></tr></thead>
              <tbody>
                {drivers.map((d) => (
                  <tr key={d.name}><td>{d.name}</td><td><span className="pill">{d.status}</span></td><td>{d.hosRisk}</td><td>{d.rating}</td><td>{d.currentLocation}</td></tr>
                ))}
              </tbody>
            </table>
          </section>
        )}

        {active === 'Routes & Tracking' && (
          <section className="panel map">
            <h3>Routes & Tracking</h3>
            <div className="fake-map route"><FiNavigation size={28} /><p>Map placeholder with route markers</p></div>
          </section>
        )}

        {active === 'Warehouses / Hubs' && (
          <section className="warehouse-grid">
            {warehouses.map((w) => (
              <article key={w.name} className="panel">
                <h4>{w.name}</h4>
                <small>{w.city}</small>
                <p>Utilization {w.utilization}%</p>
                <div className="metrics">
                  <span>Inbound {w.inbound}</span><span>Outbound {w.outbound}</span><span>On-hand {w.onHand}</span>
                </div>
                <span className="pill">{w.status}</span>
              </article>
            ))}
          </section>
        )}

        {['Dispatch Board', 'Proof of Delivery', 'Billing & Invoices', 'Reports', 'AI Ops Assistant', 'Settings'].includes(active) && (
          <section className="panel"><h3>{active}</h3><p>This section is scaffolded with the FleetFlow visual system and ready for Supabase-backed workflows.</p></section>
        )}
      </main>
    </div>
  );
}

export default App;
