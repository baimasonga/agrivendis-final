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
  FiSettings,
  FiTruck,
  FiUser,
} from 'react-icons/fi';
import './App.css';
import { api } from './supabase';
import type {
  AiMessage,
  DriverRecord,
  FleetVehicle,
  InvoiceRecord,
  LoadRecord,
  NavItem,
  PodRecord,
  RouteRecord,
  Warehouse,
} from './types';

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

function money(v: number) {
  return `$${v.toLocaleString()}`;
}

function App() {
  const [active, setActive] = useState<NavItem>('Dashboard');
  const [loads, setLoads] = useState<LoadRecord[]>([]);
  const [fleet, setFleet] = useState<FleetVehicle[]>([]);
  const [drivers, setDrivers] = useState<DriverRecord[]>([]);
  const [warehouses, setWarehouses] = useState<Warehouse[]>([]);
  const [routes, setRoutes] = useState<RouteRecord[]>([]);
  const [pods, setPods] = useState<PodRecord[]>([]);
  const [invoices, setInvoices] = useState<InvoiceRecord[]>([]);

  const [loadFilter, setLoadFilter] = useState('All');
  const [dispatchPriority, setDispatchPriority] = useState('All');
  const [fleetFilter, setFleetFilter] = useState('All');
  const [driverFilter, setDriverFilter] = useState('All');
  const [aiInput, setAiInput] = useState('');
  const [aiMessages, setAiMessages] = useState<AiMessage[]>([]);
  const [settings, setSettings] = useState(() => {
    const fromStorage = localStorage.getItem('fleetflow-settings');
    return fromStorage
      ? JSON.parse(fromStorage)
      : { company: 'FleetFlow Logistics', timezone: 'UTC', alerts: true };
  });

  useEffect(() => {
    Promise.all([
      api.fetchLoads(),
      api.fetchFleet(),
      api.fetchDrivers(),
      api.fetchWarehouses(),
      api.fetchRoutes(),
      api.fetchPods(),
      api.fetchInvoices(),
    ]).then(([l, f, d, w, r, p, i]) => {
      setLoads(l);
      setFleet(f);
      setDrivers(d);
      setWarehouses(w);
      setRoutes(r);
      setPods(p);
      setInvoices(i);
    });
  }, []);

  useEffect(() => {
    localStorage.setItem('fleetflow-settings', JSON.stringify(settings));
  }, [settings]);

  const filteredLoads = useMemo(
    () =>
      loads.filter((l) => (loadFilter === 'All' ? true : l.status === loadFilter)),
    [loadFilter, loads],
  );

  const dispatchColumns = useMemo(
    () => ['Unassigned', 'Assigned', 'In Transit', 'Delivered'].map((status) => ({
      status,
      items: loads.filter(
        (l) => l.status === status && (dispatchPriority === 'All' || l.priority === dispatchPriority),
      ),
    })),
    [dispatchPriority, loads],
  );

  const report = useMemo(() => {
    const delivered = loads.filter((l) => l.status === 'Delivered').length;
    const totalRevenue = invoices.filter((i) => i.status === 'Paid' || i.status === 'Sent').reduce((sum, i) => sum + i.amount, 0);
    const overdue = invoices.filter((i) => i.status === 'Overdue').length;
    return { delivered, totalRevenue, overdue };
  }, [invoices, loads]);

  return (
    <div className="shell">
      <aside className="sidebar">
        <h1>FleetFlow</h1>
        {navItems.map((item) => (
          <button key={item.label} className={active === item.label ? 'nav active' : 'nav'} onClick={() => setActive(item.label)}>
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
          <article className="card blue"><span>Active Loads</span><h2>{loads.length}</h2></article>
          <article className="card green"><span>Drivers Available</span><h2>{drivers.filter((d) => d.status === 'Available').length}</h2></article>
          <article className="card purple"><span>Trucks Available</span><h2>{fleet.filter((f) => f.status === 'Available').length}</h2></article>
          <article className="card red"><span>Critical Alerts</span><h2>{fleet.filter((f) => f.status === 'Critical').length}</h2></article>
          <article className="card orange"><span>Invoices Overdue</span><h2>{report.overdue}</h2></article>
          <article className="card green"><span>Revenue (Open)</span><h2>{money(report.totalRevenue)}</h2></article>
        </section>

        {active === 'Dashboard' && (
          <section className="dashboard-grid">
            <div className="panel map"><h3>Live Operations</h3><div className="fake-map" /></div>
            <div className="panel"><h3>Today's Dispatch</h3>{loads.map((l) => <div key={l.id} className="list-item"><strong>{l.id}</strong><small>{l.pickup} → {l.dropoff}</small><span className="pill">{l.status}</span></div>)}</div>
          </section>
        )}

        {active === 'Orders / Loads' && (
          <section className="panel table">
            <div className="toolbar"><h3>Orders / Loads</h3><select value={loadFilter} onChange={(e) => setLoadFilter(e.target.value)}><option>All</option><option>Assigned</option><option>In Transit</option><option>Loading</option><option>Delivered</option><option>Unassigned</option></select><button onClick={() => setLoads((prev) => [{ id: `LD-${Date.now()}`, customer: 'New Customer', pickup: 'Houston, TX', dropoff: 'New Orleans, LA', eta: new Date().toISOString(), status: 'Unassigned', driver: 'Not assigned', truck: '-', rate: 1400, margin: 16, priority: 'Medium' }, ...prev])}>+ Create Load</button></div>
            <table><thead><tr><th>Load ID</th><th>Customer</th><th>Lane</th><th>Status</th><th>Driver</th><th>Rate</th><th>Priority</th></tr></thead><tbody>{filteredLoads.map((l) => <tr key={l.id}><td>{l.id}</td><td>{l.customer}</td><td>{l.pickup} → {l.dropoff}</td><td><span className="pill">{l.status}</span></td><td>{l.driver}</td><td>{money(l.rate)}</td><td>{l.priority}</td></tr>)}</tbody></table>
          </section>
        )}

        {active === 'Dispatch Board' && (
          <section className="dispatch-grid">
            <div className="toolbar panel"><h3>Dispatch Board</h3><select value={dispatchPriority} onChange={(e) => setDispatchPriority(e.target.value)}><option>All</option><option>High</option><option>Medium</option><option>Low</option></select></div>
            {dispatchColumns.map((col) => <article key={col.status} className="panel"><h4>{col.status}</h4>{col.items.map((l) => <div key={l.id} className="list-item"><strong>{l.id}</strong><small>{l.pickup} → {l.dropoff}</small><select value={l.status} onChange={(e) => setLoads((prev) => prev.map((item) => item.id === l.id ? { ...item, status: e.target.value as LoadRecord['status'] } : item))}><option>Unassigned</option><option>Assigned</option><option>In Transit</option><option>Delivered</option></select></div>)}</article>)}
          </section>
        )}

        {active === 'Fleet' && (
          <section className="panel table">
            <div className="toolbar"><h3>Fleet</h3><select value={fleetFilter} onChange={(e) => setFleetFilter(e.target.value)}><option>All</option><option>Available</option><option>In Use</option><option>Maintenance</option><option>Critical</option></select></div>
            <table><thead><tr><th>Plate</th><th>Model</th><th>Status</th><th>Driver</th><th>Location</th><th>Action</th></tr></thead><tbody>{fleet.filter((f) => fleetFilter === 'All' || f.status === fleetFilter).map((f) => <tr key={f.plate}><td>{f.plate}</td><td>{f.model}</td><td><span className="pill">{f.status}</span></td><td>{f.driver}</td><td>{f.location}</td><td><button onClick={() => setFleet((prev) => prev.map((v) => v.plate === f.plate ? { ...v, status: v.status === 'Maintenance' ? 'Available' : 'Maintenance' } : v))}>Toggle Maintenance</button></td></tr>)}</tbody></table>
          </section>
        )}

        {active === 'Drivers' && (
          <section className="panel table">
            <div className="toolbar"><h3>Driver Management</h3><select value={driverFilter} onChange={(e) => setDriverFilter(e.target.value)}><option>All</option><option>Available</option><option>On Trip</option><option>Off Duty</option></select></div>
            <table><thead><tr><th>Name</th><th>Status</th><th>HOS Risk</th><th>Rating</th><th>Location</th><th>Action</th></tr></thead><tbody>{drivers.filter((d) => driverFilter === 'All' || d.status === driverFilter).map((d) => <tr key={d.name}><td>{d.name}</td><td><span className="pill">{d.status}</span></td><td>{d.hosRisk}</td><td>{d.rating}</td><td>{d.currentLocation}</td><td><button onClick={() => setDrivers((prev) => prev.map((x) => x.name === d.name ? { ...x, status: x.status === 'Available' ? 'On Trip' : 'Available' } : x))}>Assign/Release</button></td></tr>)}</tbody></table>
          </section>
        )}

        {active === 'Routes & Tracking' && (
          <section className="panel table">
            <h3>Routes & Tracking</h3>
            <table><thead><tr><th>Route</th><th>Load</th><th>Driver</th><th>Lane</th><th>Progress</th><th>Action</th></tr></thead><tbody>{routes.map((r) => <tr key={r.id}><td>{r.id}</td><td>{r.loadId}</td><td>{r.driver}</td><td>{r.origin} → {r.destination}</td><td>{r.progress}%</td><td><button onClick={() => setRoutes((prev) => prev.map((x) => x.id === r.id ? { ...x, progress: Math.min(x.progress + 10, 100) } : x))}>+10%</button></td></tr>)}</tbody></table>
          </section>
        )}

        {active === 'Warehouses / Hubs' && (
          <section className="warehouse-grid">{warehouses.map((w) => <article key={w.id} className="panel"><h4>{w.name}</h4><small>{w.city}</small><p>Utilization: {w.utilization}%</p><div className="metrics"><span>Inbound {w.inbound}</span><span>Outbound {w.outbound}</span><span>On-hand {w.onHand}</span></div><button onClick={() => setWarehouses((prev) => prev.map((x) => x.id === w.id ? { ...x, utilization: Math.min(100, +(x.utilization + 1).toFixed(1)) } : x))}>Increase Utilization</button></article>)}</section>
        )}

        {active === 'Proof of Delivery' && (
          <section className="panel table"><h3>Proof of Delivery</h3><table><thead><tr><th>POD</th><th>Load</th><th>Customer</th><th>Status</th><th>Upload</th></tr></thead><tbody>{pods.map((p) => <tr key={p.id}><td>{p.id}</td><td>{p.loadId}</td><td>{p.customer}</td><td><span className="pill">{p.status}</span></td><td><input type="file" onChange={(e) => setPods((prev) => prev.map((x) => x.id === p.id ? { ...x, fileName: e.target.files?.[0]?.name, status: 'Submitted' } : x))} /></td></tr>)}</tbody></table></section>
        )}

        {active === 'Billing & Invoices' && (
          <section className="panel table"><h3>Billing & Invoices</h3><table><thead><tr><th>Invoice</th><th>Load</th><th>Customer</th><th>Amount</th><th>Status</th><th>Action</th></tr></thead><tbody>{invoices.map((i) => <tr key={i.id}><td>{i.id}</td><td>{i.loadId}</td><td>{i.customer}</td><td>{money(i.amount)}</td><td><span className="pill">{i.status}</span></td><td><button onClick={() => setInvoices((prev) => prev.map((x) => x.id === i.id ? { ...x, status: 'Paid' } : x))}>Mark Paid</button></td></tr>)}</tbody></table></section>
        )}

        {active === 'Reports' && (
          <section className="panel">
            <h3>Reports</h3>
            <p>Delivered Loads: {report.delivered}</p>
            <p>Open Revenue: {money(report.totalRevenue)}</p>
            <p>Overdue Invoices: {report.overdue}</p>
          </section>
        )}

        {active === 'AI Ops Assistant' && (
          <section className="panel">
            <h3>AI Ops Assistant</h3>
            <div className="chat">{aiMessages.map((m, i) => <p key={i}><strong>{m.role}:</strong> {m.text}</p>)}</div>
            <div className="toolbar"><input value={aiInput} onChange={(e) => setAiInput(e.target.value)} placeholder="Ask about delays, utilization, costs..." /><button onClick={() => { if (!aiInput) return; const userMsg = { role: 'user', text: aiInput } as AiMessage; const reply = { role: 'assistant', text: `Recommendation: prioritize high-risk loads and review ${report.overdue} overdue invoice(s).` } as AiMessage; setAiMessages((prev) => [...prev, userMsg, reply]); setAiInput(''); }}>Send</button></div>
          </section>
        )}

        {active === 'Settings' && (
          <section className="panel">
            <h3>Settings</h3>
            <div className="settings-grid">
              <label>Company Name <input value={settings.company} onChange={(e) => setSettings((s: typeof settings) => ({ ...s, company: e.target.value }))} /></label>
              <label>Timezone <input value={settings.timezone} onChange={(e) => setSettings((s: typeof settings) => ({ ...s, timezone: e.target.value }))} /></label>
              <label><input type="checkbox" checked={settings.alerts} onChange={(e) => setSettings((s: typeof settings) => ({ ...s, alerts: e.target.checked }))} /> Enable alerts</label>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

export default App;
